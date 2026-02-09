## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2025-02-09 - [Mobile Menu Accessibility]
**Learning:** Mobile menus often lack state information for screen readers. Simply toggling a CSS class (like `.show`) is insufficient.
**Action:** Always implement `aria-expanded` on the toggle button and `aria-controls` pointing to the menu ID. Toggle the `aria-expanded` state (true/false) in JavaScript whenever the menu opens or closes. Ensure this logic is consistent across all pages by consolidating inline scripts into a central `script.js`.
