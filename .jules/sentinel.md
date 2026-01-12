# Sentinel's Journal

## 2025-02-14 - Reverse Tabnabbing & Inline Scripts
**Vulnerability:** Found `target="_blank"` links without `rel="noopener noreferrer"` and widespread use of inline JavaScript for UI logic.
**Learning:** `target="_blank"` allows the opened page to access `window.opener` and potentially redirect the original page (Reverse Tabnabbing). Inline scripts prevent the implementation of a strict Content Security Policy (CSP).
**Prevention:** Always use `rel="noopener noreferrer"` with `target="_blank"`. Refactor inline scripts into external JS files to enable `script-src 'self'`.

**Regression Note:** When refactoring mobile menu logic, I initially missed that `portfolio.html` used a different breakpoint (1350px) compared to other pages (700px). This was fixed by checking `window.location.pathname` to apply the correct breakpoint dynamically in `script.js`.

**Enhancement Note:** `galleries.html` still contains complex inline scripts for gallery navigation and lazy loading. Moving these would require significant refactoring of the gallery logic which might be out of scope for a quick fix, so they remain inline for now. However, `bookings.html` form validation was successfully moved to `script.js`.
