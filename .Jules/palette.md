## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2026-05-11 - [Accessible Form Validation]
**Learning:** The booking form lacked proper ARIA attributes (`aria-describedby`, `role="alert"`, and `aria-invalid`) and relied on native `alert()`s, making errors undiscoverable for screen readers and disrupting the flow.
**Action:** Replaced native `alert()` with an inline ARIA live region and updated form inputs/validation script to dynamically manage `aria-invalid` and correctly map `aria-describedby` attributes.
