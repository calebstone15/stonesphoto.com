## 2024-05-23 - Accessible Form Validation
**Learning:** Default HTML5 validation popups (`required` attribute) are often inaccessible or inconsistent across browsers. Disabling them with `novalidate` and implementing custom JavaScript validation allows for consistent styling, better accessibility (via `aria-invalid` and `aria-describedby`), and immediate feedback.
**Action:** Always prefer custom validation with ARIA support over default browser validation for public-facing forms. Ensure `aria-describedby` links the input to the error message container.
