## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.
## 2024-06-15 - [Lightbox Keyboard Accessibility]
**Learning:** Lightbox gallery implementations often use `div` elements instead of native buttons for layout/styling purposes (like maintaining aspect ratios), which breaks keyboard navigation.
**Action:** When adding interaction to non-interactive elements like `div`s (e.g. `gallery-item`), always inject `tabindex="0"`, `role="button"`, and handle both `click` and `keydown` (Enter/Space) events. Additionally, provide global `Escape` key support to close overlays, and add a CSS `:focus-visible` rule so keyboard users have visual feedback.
