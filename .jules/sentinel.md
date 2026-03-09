## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2026-03-09 - [DOM-based XSS in Global Utility Components]
**Vulnerability:** `innerHTML` was used in `EAA Web Version/js/app.js` to dynamically construct HTML for `ToastManager` notifications and the `PromptDialog` modal, passing arguments like `message` and `defaultValue` directly into the DOM without sanitization.
**Learning:** Utility components that are exposed globally and accept arbitrary string inputs are prime targets for XSS if they use `innerHTML`. Even if current usages within the app appear safe, they provide an architectural weak point that can be easily exploited in the future or via user-supplied files (like CSV headers in this app).
**Prevention:** Always use safe DOM manipulation methods (`document.createElement`, `textContent`, `appendChild`) or a sanitizer library (like DOMPurify) when building reusable UI components that render variable data.
