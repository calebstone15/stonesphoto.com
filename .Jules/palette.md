## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.
## 2024-06-01 - [Lightbox Accessibility]
**Learning:** Native `<div>` elements used as interactive gallery items are completely invisible to screen readers and keyboard users unless explicitly configured.
**Action:** Always add `tabindex="0"`, `role="button"`, and keyboard event listeners (`Enter` / `Space`) to non-button elements that act as triggers. Ensure lightboxes can be dismissed with the `Escape` key, have an `aria-label` describing the action, and pass `alt` text to the enlarged image.
