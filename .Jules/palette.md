## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2026-06-22 - Accessible Mobile Menu Toggles
**Learning:** Mobile menu buttons require `aria-expanded` and `aria-controls` attributes to properly inform screen readers of the menu's state and relationship. Relying on scattered inline scripts prevents consistent accessible state management.
**Action:** Always add `aria-expanded` and `aria-controls` to toggle buttons, and centralize the state toggling logic in a main JavaScript file to ensure the ARIA state accurately reflects the visual state at all times.
