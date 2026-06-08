## 2025-02-12 - [Accessible Lightbox/Gallery Interactions]
**Learning:** Found that custom lightbox galleries using `div` elements for images (`.gallery-item`) often lack basic keyboard accessibility and screen-reader context.
**Action:** Always add `tabindex="0"`, `role="button"`, and appropriate `aria-label`s to custom interactive elements. Implement keyboard event listeners for 'Enter', 'Space' (to open), and 'Escape' (to close), alongside visible focus states (`:focus-visible`) for navigation feedback.
