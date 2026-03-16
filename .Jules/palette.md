## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2025-02-15 - [Mobile Menu Accessibility]
**Learning:** Adding `aria-expanded` and `aria-controls` to mobile menu toggle buttons allows screen readers to correctly announce the state (open/closed) of the menu to visually impaired users.
**Action:** Always include `aria-expanded="false"` and `aria-controls="[menu-id]"` on the menu button, give the menu a matching `id`, and dynamically toggle `aria-expanded` to `"true"` or `"false"` in the JavaScript that handles the menu visibility.
