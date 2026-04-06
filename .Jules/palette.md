## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2026-04-06 - [Mobile Menu ARIA States]
**Learning:** The mobile menu toggle lacked `aria-expanded` and `aria-controls` attributes, leaving screen reader users unaware of the menu's state and purpose.
**Action:** Always add `aria-expanded="false"` and `aria-controls="[id]"` to mobile menu toggle buttons, and dynamically update `aria-expanded` to "true" or "false" in the corresponding JavaScript logic whenever the menu is opened or closed.
