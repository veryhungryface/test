# Quality bar — results (v5, picture final; audio blocked)

| check | target | result | how measured |
|---|---|---|---|
| Duration / size / fps | 30 s, 1920×1080 + 1080×1920, 60 fps | **pass** — both 1800 frames, 30.000 s, 60/1, h264 yuv420p | ffprobe |
| Frame one finished | works as a still | **pass** — full work 7/10 − 1/4 = with the stylus landing 6/6 | critics r3–r5 |
| Frozen time | ≤1 s per 30 s, no still > 0.5 s | **pass** — zero-change runs ≥ 0.1 s: none (both files); no true freeze > 0.17 s | frame-diff scan on final renders |
| Single-frame pops / flashes | none | **pass** — 0 spikes (> 4× neighbour median), 0 near-blank frames | frame-diff scan, critic r5 |
| Text contrast | ≥ 4.5:1 | **pass** — lowest main text 4.98:1 (오개념 eyebrow); headlines 5.1, body 7–16, CTA 6.0 | critic r5 WCAG sampling |
| Collisions / safe margins | none; 5 % (16:9), platform zones (9:16) | **pass with note** — 16:9 full-bleed product shot (4.0–5.85 s) sits 24–30 px from edges by design; 9:16 no text in covered zones | critic r5 |
| Brand colours | match the product | **pass** — #3059D8 / #769EFD / #1A2233 / #F5F7FB / #1D9A6C sampled from the user's screenshot | assets/diagnostic-ref.png |
| Understood with sound off | parent can retell | **pass** — 16:9 4/5, 9:16 4/5 (v1 was 3/5) | blind 2 fps contact-sheet read |
| Cuts/hits within 1 frame of beat | ±1 frame | **pending** — hits are on a 120 BPM grid; needs the music file (make_final.sh aligns + warns) | — |
| Loudness ≈ −14 LUFS, TP ≤ −1 dBTP, FX under music/voice | | **pending** — pipeline tested end-to-end on placeholder tones (−14.0 LUFS, −6.9 dBTP) | audio/build.py |
| Every claim in facts.json, nothing invented | | **pass** — on-screen/voice claims F1–F10; the child's work and card values are a dramatised example (listed in facts.json); no numbers, ratings, prices, testimonials | facts.json |
| Director's judgement | holds up beside references | **ship** from round-5 critic (r1–r4: one more pass) | ledger.md |

## What a human should still check by eye and ear
1. **Claims (F6, F9):** the voice says PRISM "sees the reason, not the score" and makes "the next problem for this child". These come from your engine description, not the live page. Confirm the live service does this before public release, or present it as a vision film.
2. **The four diagnosis values** on the cards (분모 계산 / 분모가 다른 채로 뺌 / 확신함·그런데 오답 / 통분 이해 이전) are written by me as an example; check they match how your diagnostic actually words results.
3. **Logo:** the prism glyph + PRISM wordmark is a placeholder drawn in code (you said there's no logo). Swap in the real mark when it exists.
4. **Voice:** two voices × two takes were generated (Chaewon Baek, Hana Kang). I chose Chaewon s50 on pacing only (29.2 s vs 36 s) — I cannot hear. Listen to all four.
5. **Music:** two takes generated; pick by ear. Check the drop lands near the prism hit (7.3 s).
6. **Mix:** −14 LUFS is measured, but whether the VO sits clearly over music on phone speakers needs ears.
7. **9:16 on a real phone** with the platform UI overlaid.
