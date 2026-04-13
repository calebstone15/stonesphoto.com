## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.
## 2026-04-13 - [Semantic Spacing over Hidden Elements]
**Learning:** Using hidden elements (like `<p style="visibility: hidden">Invisible Text</p>`) to achieve visual layout spacing pollutes screen reader output and degrades the accessibility experience.
**Action:** Always utilize semantic CSS properties (`margin`, `padding`, `gap`) on layout containers or elements rather than injecting invisible text.
