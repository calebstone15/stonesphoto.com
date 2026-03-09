## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2025-03-09 - [Semantic Layout Instead of Hidden Text]
**Learning:** Using tags with `visibility: hidden` and text like "Invisible Text" to force vertical layout spacing is an accessibility anti-pattern. While visually hidden, screen readers or specific assistive technologies may still encounter it in the DOM, polluting the readout.
**Action:** Replace arbitrary hidden text spacer elements with semantic CSS margins (e.g., `margin-bottom`, `margin-top`) on adjacent legitimate headings or containers.
