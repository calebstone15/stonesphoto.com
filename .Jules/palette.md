## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2025-01-22 - [Avoid Hidden Text for Visual Spacing]
**Learning:** Do not use hidden elements (e.g., `<p style='visibility: hidden'>Invisible Text</p>`) purely for visual layout spacing, as this pollutes screen reader output and causes confusion.
**Action:** Always use semantic CSS margins or padding (e.g., `margin-bottom`, `padding-bottom`) on structural elements (like `<main>` or headers) to achieve the desired visual layout spacing without degrading accessibility.
