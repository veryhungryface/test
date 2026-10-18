# Style bible — PRISM 분수 진단 film

## Colour (6 core, all sampled from assets/diagnostic-ref.png except Amber/Coral, which deepen the screenshot's confidence tints)
| token | hex | where it comes from | use |
|---|---|---|---|
| Prism Blue | `#3059D8` | title, 제출하기, pen border | brand, the child's ink, CTA |
| Ink | `#1A2233` | 정답 box border, body text | text, dark-scene base (`#141A2C`→`#0E1220`) |
| Paper | `#F5F7FB` | page background | light scenes |
| Green | `#1D9A6C` | live dot, 확신해요 option border family | correct, confidence |
| Amber | `#E39A2D` | deepened from `#F1DAA5` (아마 맞을 것 같아요) | 1/4 bar, thinking-level ray |
| Coral | `#E0565B` | deepened from `#F0C4C4` / `#DAACAE` | grading circle, misconception |
Tints (not extra colours): Sky `#769EFD` (progress bar end), Blue tint `#EAF0FF`, grid `#EEF2FB`, line `#E3E8F2`. On the dark field the rays use lifted versions for contrast: `#769EFD`, `#F07479`, `#2FBF8A`, `#F2B04D`.

## Type (all local, pinned via npm)
- **Pretendard** 500–900 (`pretendard` npm) — UI and titles; matches the live site's Korean sans.
- **Gaegu 700** (`@fontsource/gaegu`) — the child's handwriting. One hand for the whole film: 6/6, the arrow sums, 1/10.
- **KaTeX Main** (`katex` npm) — printed maths, as the live problem text uses.

## Texture
Grid paper (68 px, `#EEF2FB`) from the live canvas; a 4 % white grid on the dark field so the two worlds rhyme. No noise, no gradients for decoration — the only gradient is the spectrum, and it is the product's name.

## Motion vocabulary
- Arrive: `power3.out` / `expo.out` 0.5–0.8 s; leave: `power3.in` 0.25–0.45 s.
- Taps: anticipation squash to 0.93, then `elastic.out(1,0.45)`; a ripple ring is the visible result.
- Handwriting: per-stroke clip reveal, numerator → bar → denominator, ~0.5 s per fraction.
- Light: anticipation (the 6/6 leans back), stretch to a beam (`expo.in`), prism takes the hit with a squash and `elastic` settle.
- Camera: one real move (macro → full screen, `expo.inOut` 0.8 s with a 2.4 px blur at peak speed) and a slow push-in in each held scene.
- Holds: sine float 6–8 px, never fully still.

## Style frames
Rendered from the film code itself (out/k/*.png, out/kv/*.png): t=1.6 (confident), t=13.5 (spectrum), t=29.5 (end mark).
