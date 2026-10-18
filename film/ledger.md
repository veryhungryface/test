# Ledger — critic rounds

## Round 0 → 1 (first full silent render, v1)
Critics (fresh, no build context): director 16:9, sound-off reader, 9:16 format critic. All three: **one more pass**.

| issue (ranked) | before (v1) | fix in v2 |
|---|---|---|
| Prism section a still slide | near-frozen 7.58–13.88 s (6.3 s); rays 1.1 s apart, 1.7 s stub hold | rays + cards in one burst (0.5 s apart, 9.4–10.9 s); "왜 틀렸을까?" question at 7.7 s; refracted beam inside the glass; camera pushes into the 오개념 card 11.6–13.9 s while the others dim |
| Original problem never resolved | no 9/20 anywhere | 5 amber twentieths lift into the 14 blue ones and cancel (20.9 s); 7/10 − 1/4 = 9/20 lands in green (21.5 s) |
| Pink slab transition (14.0 s) | text vanished, featureless salmon rect, near-blank frame 14.45–14.58 s | the card grows with its words; "분모가 다른 채로 뺌" travels to become the next page's headline; page already populated when it settles |
| Circle collides with chip and "=" ; chip crosses 6/6 | overlap 3.0–5.6 s | circle sized to the 6/6 only, operator spacing .32→.45 em, chip moved below-right, flight path dips under the work |
| Muddy crossfades 18.0 s and 22.5 s | equation/bars and bars/card semi-transparent overlaps | strictly sequential: old content exits (0.3–0.35 s) before new content enters |
| Frame 0 unfinished | half-drawn 6, no chip | full work + chip on frame 0; the pen only lands the last stroke |
| Circle didn't read as "wrong" | ambiguous highlight | 6/6 turns coral and shakes as the circle closes |
| Type too small | card labels 22 px, values 36 px, red notes ~58 px Gaegu, contrast 3.7:1 | labels 30 px, values 44–46 px, notes 72–80 px in `#C4373D` (≥4.5:1 on paper) |
| End card | stray ▷, near-blank 26.3–26.5 s, tagline before wordmark, rays from wrong face, static 28.2–30 s | spectrum edge of the card becomes the underline; wordmark rises out of it; glyph rays leave the right face; whole card drifts 3 % to the last frame; CTA pulses |
| 정답 box empty in product shot | empty | holds the child's 6/6 |
| 9:16 = landscape in a portrait frame | content in y 650–1300; cards and circle in right 140 px; header in top 250 px; 4 chips in one row at 24 px | content column x 60–940; header pushed below 300 px; 2×2 confidence chips at 26 px one-line; full-width cards with rays falling behind them; paper scenes re-centred; CTA full width 820×124 |
| Prism read as a play button (9:16) | rotated 90° | always apex-up |

Sound-off rating v1: **3 / 5** (reader could not explain the prism or the pink block).

## Round 2 → 3 (v2 silent renders, one fresh critic on both formats) — verdict: one more pass
| issue | v2 measurement | fix in v3 |
|---|---|---|
| Red **circle** reads as 정답 to Korean parents | 2.4–4.0 s contradicts "왜 틀렸을까?" | wrong = red 빗금 (slash) through 6/6; the circle is saved for the correct 1/10 (24.1 s) — also dropped the ✓ badge (✓ can mean wrong on Korean tests) |
| Black-flash pulse on bars | pixel (700,360) → (0,0,0) at 19.117 and 19.85 (diff ×40) | brightness tween now from 1 → 1.3 (was from the CSS default 0) |
| Dead opening, no human | 0–2.4 s identical cells; no hand | stylus writes 6/6 on camera 0–0.6 s; chip springs in 0.7; tap 1.3 with press + 150 px ripple; stylus also writes 1/10 |
| Grey-slab muddle 13.9–14.35 | headline 1.5:1 on mid-grey | card stays dark while growing; page flips to paper in one frame at 14.4; label exits separately |
| 5/20 removal pops; orphan sliver; labels stale | 1-frame vanish at 21.35; sliver 21.45–22.3 | 300 ms cross-dissolve, chunk hard-hidden after; 14/20 → 9/20 (green), 5/20 dimmed |
| Card ghosting over wordmark 26.03–26.33; sliced glyphs | card at 30 % over PRISM | card cleared by 25.8; lockup rises as one move (opacity + y) after the line lands |
| Near-empty dip 22.37–22.42; overlap muddle | 3–4 empty frames | opaque card slides over the leaving page (starts 22.28) |
| 9/20 green contrast | 2.6:1 | #157A55 (≥4.5:1) |
| 9:16 rays stab cards / circle in right zone | rays visible between cards; x 974 | rays run down the left gutter like fibre and turn into each accent bar; cards x 130–940; slash replaces circle |
| Consistency | serif 7/10 next to handwritten 6/6; logo ray order ≠ card order | the moves scene is in the child's handwriting; logo rays and spectrum gradient ordered blue → coral → green → amber like the cards |
| Prism hold still | 7.87–9.28 s near-frozen | glass turns 3°, glow breathes; focus push 1.1 → 1.18 |
| Sound-off read | 3 / 5 | (re-measured in round 3) |

## Round 3 → 4 (v3) — verdict: one more pass · sound-off 16:9 4/5, 9:16 3/5 (up from 3/5)
| issue | v3 measurement | fix in v4 |
|---|---|---|
| One-frame white flash at 14.40 | frame 864 mean diff 214.8 (neighbours 0.0–0.4) | paper iris from frame centre over 0.45 s (mirrors the ink iris at 5.4); headline colour eases white → red over 0.3 s |
| Payoff line too brief, "정딥" mid-wipe | legible ~0.5 s | opacity + y reveal (no clip mask), held 24.65–25.9 s (1.25 s) |
| Chip doubled over the real option | 4.07–4.50 half-alpha overlap | real option hidden until the chip lands exactly on it |
| Product screen readable ~1 s | settle 4.7–5.0 | pull-back starts 3.5 → settles 4.3; 0.7 s on the full screen before submit; no zoom nudge in 9:16 (crisp, inside x 940) |
| One-frame steps 13.90 / 25.82 | 31–70 k px in a frame | growing card keeps its coral border and eases it out; card shell fades its fill/border over 0.3 s instead of a 0.12 s opacity drop |
| Outro near-empty, ghost PRISM | 25.8–26.5 | spectrum edge stays at full strength and travels into the underline; lockup rises at full opacity |
| Dimmed cards too low | labels 2.0:1, from 11.5 s | dim to 60 % from 12.3 s |
| 9:16 zones | bars to x 964, card stack to y 1490 | bars 200–880 (×1.06 drift ≤ 903), cards up 40 px |
| Holds | 7.0 s (16:9) / 9.7 s (9:16) near-still runs | opening push 7–8 %, prism-scene push 6 % |

## Round 4 → 5 (v4) — verdict: one more pass · sound-off 16:9 4/5, 9:16 3/5
| issue | v4 measurement | fix in v5 |
|---|---|---|
| Pull-back ghosting (9:16) | UI cross-faded at partial alpha 3.60–3.95 | focus bands now open like curtains (move off-frame at full opacity); chip shrinks first, then travels |
| Brand crop in 16:9 | push toward 제출하기 cropped "PRISM" 4.6–5.85 | push removed; UI breathes 1.2 % instead |
| Headline double exposure ~20.22 | old/new line overlapping | new line enters 0.1 s after the old one is gone |
| Card-shell pop 26.25 | 1-frame vanish (diff 2.6 vs 0.04) | card fades over 0.3 s under the travelling spectrum line |
| 9:16 rays read backwards | rays left toward the incoming beam | 9:16 prism scene mirrored: light from the right, dispersion out of the left face into the gutter |
| Dead air | 14.57–14.82, 26.25–26.6 | equation enters as the iris passes (−0.23 s); line travel 0.36 s, lockup −0.1 s |
| Eyebrow contrast | 오류 위치 3.91, 확신도 4.24 | #9DB8FF / #45D19E on #1D2438 |
| Dissolve through empty 17.45 | equation out, then bars in | equation drops out while bars arrive (overlap 0.2 s) |
| Siblings through the growing card | text visible 14.13–14.20 | siblings to 0 before the card grows |
| Submit press flicker | 2 frames | press held 0.2 s |
| Static end | 2.28 s still | glyph rays breathe through the end hold |

## Round 5 (v5) — verdict: **ship** · sound-off 16:9 4/5, 9:16 4/5
10 of 11 round-4 items verified fixed, no regressions. Leftovers fixed after the verdict and re-scanned on the final renders:
- 14.65–14.82 freeze (11 frames) → paper page shown as the iris completes (−0.12 s); final scan: no zero-change run ≥ 0.1 s in either file.
- 17.47–17.63 bar outlines over the fading equation → equation gone 0.1 s before outlines start.
- Rays pointing at emptied card slots 13.90–14.05 → rays fade with their cards.
Final renders: 0 single-frame spikes, 0 near-blank frames (both formats).
