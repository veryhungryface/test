# Brief — PRISM 분수 진단, product film

| field | value | decided by / reason |
|---|---|---|
| mode | product | user ("1번 영상") |
| subject | PRISM 분수 진단 (go.prism-math.kr) | user |
| viewer | 초4~중3 자녀를 둔 학부모 | Claude — the person who decides to try a diagnostic for their child |
| end state | "우리 아이가 *왜* 틀리는지 알 수 있겠다" → go.prism-math.kr 에서 진단 시작 | Claude — the soul of the service is "reason, not score" |
| length | 30 s, 16:9 (1920×1080) + 9:16 (1080×1920) | user |
| frame rate | 60 fps | default for UI/product |
| brand | Colours sampled from the user's screenshot; no logo exists, so a simple wordmark + prism glyph was drawn (user: "로고는 없어 적당히") | user + Claude |
| facts | facts.json — the user's screenshot of the live diagnostic and the user's own description of the three engines | only sources available; site blocked by network policy |
| assets | assets/diagnostic-ref.png (user screenshot). UI rebuilt as live HTML from it | live capture impossible (network) |
| style | blank → "light through a prism": the answer becomes light, the diagnosis is its spectrum | Claude — the product's own name is the metaphor |
| sound | voice (Korean, female) + music + sfx | Claude — parents; voice carries the "why" |
| autonomy | unattended (user asked only at the credit gate) | Claude |
| toolchain | HTML + GSAP, Playwright frame capture, ffmpeg | Claude — already proven in this container |
| sign-off | PRISM wordmark · "답 너머의 생각까지" · go.prism-math.kr · [진단 시작하기] | Claude |

## Concept directions
1. **Prism (chosen).** One wrong answer, written with confidence, becomes a beam of light; PRISM splits it into four colours (where, why, how sure, thinking level), then folds them back into one problem made for this child. The name *is* the mechanism.
2. Red pen vs. magnifier — a traditional red X dissolves; a lens finds the reason. Rejected: red-pen imagery is negative and generic.
3. Two children, same wrong answer, two different reasons. Rejected: needs 2× the screen time; too dense for 30 s.

## Signature moments (no effect names)
1. A smiling "I'm sure" sits next to a wrong answer — the moment the viewer feels the dissonance.
2. The wrong answer turns into light and opens into four honest colours.
3. The colours fold back into one new problem, and the same handwriting gets it right.
