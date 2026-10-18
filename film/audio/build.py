"""Audio build: beat analysis -> timing.json, VO line placement, ducked music, SFX, -14 LUFS master.

usage:
  python3 audio/build.py analyze <music>    # print tempo/beats/drop, write audio/beats.json
  python3 audio/build.py mix <music> <vo>   # write out/mix.wav, out/music_only.wav
All times come from timing.json (vo[].at, sfx[].at, musicOffset).
"""
import json, sys, os
import numpy as np, librosa, soundfile as sf, pyloudnorm as pyln

SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = json.load(open(os.path.join(ROOT, 'timing.json')))
SRC = os.path.join(ROOT, 'audio', 'src')


def load(name):
    y, _ = librosa.load(os.path.join(SRC, name + '.mp3'), sr=SR, mono=False)
    if y.ndim == 1:
        y = np.stack([y, y])
    return y


def analyze(music):
    y = load(music).mean(0)
    tempo, beats = librosa.beat.beat_track(y=y, sr=SR, units='time')
    onset = librosa.onset.onset_strength(y=y, sr=SR)
    rms = librosa.feature.rms(y=y)[0]
    t_rms = librosa.times_like(rms, sr=SR)
    # the drop = largest rise in smoothed loudness
    sm = np.convolve(rms, np.ones(20) / 20, 'same')
    rise = np.diff(sm, prepend=sm[0])
    drop = float(t_rms[np.argmax(rise[: int(len(rise) * 0.6)])])
    out = {'music': music, 'tempo': float(np.atleast_1d(tempo)[0]), 'beats': [round(float(b), 3) for b in beats],
           'drop': round(drop, 3), 'duration': round(len(y) / SR, 3)}
    json.dump(out, open(os.path.join(ROOT, 'audio', 'beats.json'), 'w'), indent=1)
    print(json.dumps({k: v for k, v in out.items() if k != 'beats'}), 'first beats', out['beats'][:8])


def place(buf, clip, t, gain_db=0.0):
    i = int(round(t * SR))
    if i >= buf.shape[1]:
        return
    clip = clip[:, : buf.shape[1] - i] * (10 ** (gain_db / 20))
    buf[:, i: i + clip.shape[1]] += clip


def vo_lines(vo):
    y = load(vo)
    lines = json.load(open(os.path.join(ROOT, 'audio', 'vo_lines.json')))['lines']
    out = {}
    for k, (a, b) in lines.items():
        seg = y[:, int(a * SR): int(b * SR)]
        _, (s, e) = librosa.effects.trim(seg.mean(0), top_db=38)
        seg = seg[:, max(0, s - int(0.03 * SR)): e + int(0.12 * SR)]
        fade = int(0.02 * SR)
        seg[:, :fade] *= np.linspace(0, 1, fade)
        seg[:, -fade:] *= np.linspace(1, 0, fade)
        out[k] = seg
    return out


def env_follow(x, attack=0.03, release=0.35):
    """Smoothed loudness envelope of a mono signal (for ducking)."""
    a = np.exp(-1 / (attack * SR)); r = np.exp(-1 / (release * SR))
    env = np.zeros_like(x); e = 0.0
    ax = np.abs(x)
    for i in range(0, len(x), 64):  # block-wise for speed
        v = ax[i:i + 64].max()
        e = a * e + (1 - a) * v if v > e else r * e + (1 - r) * v
        env[i:i + 64] = e
    return env


def master(x, target=-14.0, tp=-1.0):
    meter = pyln.Meter(SR)
    lufs = meter.integrated_loudness(x.T)
    x = x * 10 ** ((target - lufs) / 20)
    # true-peak safety: 4x oversampled peak, soft-limit by gain if needed
    up = librosa.resample(x, orig_sr=SR, target_sr=SR * 4)
    peak = 20 * np.log10(np.abs(up).max() + 1e-9)
    if peak > tp:
        # simple look-ahead-free soft clipper on overs, then re-measure
        lim = 10 ** (tp / 20) * 0.98
        x = np.tanh(x / lim) * lim
        x = x * 10 ** ((target - meter.integrated_loudness(x.T)) / 20)
        up = librosa.resample(x, orig_sr=SR, target_sr=SR * 4)
        peak = 20 * np.log10(np.abs(up).max() + 1e-9)
        if peak > tp:
            x = x * 10 ** ((tp - peak - 0.1) / 20)
    return x, meter.integrated_loudness(x.T), 20 * np.log10(np.abs(librosa.resample(x, orig_sr=SR, target_sr=SR * 4)).max())


def mix(music, vo):
    N = int(T['duration'] * SR)
    m = load(music)
    off = int(T.get('musicOffset', 0) * SR)  # >0: trim music start
    m = m[:, off: off + N] if off >= 0 else np.pad(m, ((0, 0), (-off, 0)))[:, :N]
    m = np.pad(m, ((0, 0), (0, max(0, N - m.shape[1]))))
    # end: fade the last 0.6 s so the final chord resolves on the cut
    f = int(0.6 * SR); m[:, -f:] *= np.linspace(1, 0, f) ** 2
    voice = np.zeros((2, N))
    for line in T['vo']:
        place(voice, VO[line['id']], line['at'])
    sfx = np.zeros((2, N))
    for s in T['sfx']:
        place(sfx, load(s['name']), s['at'], s['gain'])
    # duck music under voice: -9 dB at full speech
    env = env_follow(voice.mean(0))
    env = env / (env.max() + 1e-9)
    duck = 10 ** (-9 * np.clip(env * 3, 0, 1) / 20)
    music_bed = m * 10 ** (-6 / 20)
    full = music_bed * duck + voice + sfx * 10 ** (-2 / 20)
    full, lufs, tp = master(full)
    sf.write(os.path.join(ROOT, 'out', 'mix.wav'), full.T, SR, subtype='PCM_24')
    mo, lufs2, tp2 = master(m.copy())
    sf.write(os.path.join(ROOT, 'out', 'music_only.wav'), mo.T, SR, subtype='PCM_24')
    # stem levels for the report
    meter = pyln.Meter(SR)
    def lu(x):
        return round(meter.integrated_loudness(x.T), 1) if np.abs(x).max() > 0 else None
    rep = {'mix_lufs': round(lufs, 2), 'mix_truepeak_dbtp': round(tp, 2), 'music_only_lufs': round(lufs2, 2),
           'music_only_truepeak_dbtp': round(tp2, 2), 'stem_lufs_pre_master': {'music_ducked': lu(music_bed * duck),
           'voice': lu(voice), 'sfx': lu(sfx * 10 ** (-2 / 20))}}
    json.dump(rep, open(os.path.join(ROOT, 'out', 'audio_report.json'), 'w'), indent=1)
    print(json.dumps(rep))


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'analyze':
        analyze(sys.argv[2])
    elif cmd == 'mix':
        VO = vo_lines(sys.argv[3])
        mix(sys.argv[2], sys.argv[3])
