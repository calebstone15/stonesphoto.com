## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-28 - [DOM-based XSS via innerHTML]
**Vulnerability:** Use of `innerHTML` for DOM manipulation in components like `ToastManager` and `PromptDialog` in `EAA Web Version/js/app.js` can lead to DOM-based Cross-Site Scripting (XSS) if user input is rendered.
**Learning:** Legacy codebase used template literals with `innerHTML` for convenience when building UI components. This is a common anti-pattern that violates the project's strict prohibition on `.innerHTML`.
**Prevention:** Always use safe DOM methods like `document.createElement()`, `textContent`, and `appendChild()` to build UI structures dynamically, even if it requires more verbose code.
