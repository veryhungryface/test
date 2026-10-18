#!/bin/bash
# One-shot audio finish: download generated audio, align music to the 120 BPM grid,
# mix VO + music + SFX to -14 LUFS / -1 dBTP, and mux onto the silent masters.
# usage: ./make_final.sh [musicA|musicB] [vo_chaewon_s50|vo_chaewon_s40|vo_hana_s50|vo_hana_s40]
set -euo pipefail
cd "$(dirname "$0")"
MUSIC=${1:-musicA}; VO=${2:-vo_chaewon_s50}
./audio/fetch.sh
python3 audio/build.py analyze "$MUSIC"
# shift the music so its beats land on the 0.5 s grid that every hit in timing.json uses
python3 - "$MUSIC" <<'EOF'
import json, sys, numpy as np
b = json.load(open('audio/beats.json')); t = json.load(open('timing.json'))
beats = np.array(b['beats']); period = 60 / b['tempo']
phase = float(np.median(beats % period))
t['musicOffset'] = round(phase, 3)
if abs(b['tempo'] - 120) > 3:
    print(f"WARNING: tempo {b['tempo']:.1f} BPM is not ~120; hits will drift off the beat — re-time timing.json hits to audio/beats.json")
json.dump(t, open('timing.json', 'w'), indent=2, ensure_ascii=False)
print('musicOffset', t['musicOffset'], 'tempo', round(b['tempo'], 1))
EOF
python3 audio/build.py mix "$MUSIC" "$VO"
mkdir -p deliver
for f in 169 916; do
  name=$([ $f = 169 ] && echo 16x9 || echo 9x16)
  ffmpeg -loglevel error -y -i out/silent_$f.mp4 -i out/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -ar 48000 -t 30 -movflags +faststart deliver/PRISM_30s_${name}.mp4
done
ffmpeg -loglevel error -y -i out/music_only.wav -c:a aac -b:a 256k deliver/PRISM_30s_music_only.m4a
cp out/music_only.wav deliver/PRISM_30s_music_only.wav
echo "--- loudness check (ffmpeg ebur128) ---"
ffmpeg -nostats -i deliver/PRISM_30s_16x9.mp4 -filter_complex ebur128=peak=true -f null - 2>&1 | grep -A12 Summary
cat out/audio_report.json
