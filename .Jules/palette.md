## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2024-05-24 - [Avoid Hidden Text for Visual Layout Spacing]
**Learning:** Using elements like `<p style="visibility: hidden">Invisible Text</p>` solely to create vertical space pollutes the screen reader output, creating confusion for visually impaired users by announcing nonsensical content.
**Action:** When adjusting visual layouts or adding space between sections, always use semantic CSS like `margin` or `padding` instead of inserting hidden DOM nodes.
