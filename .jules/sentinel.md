## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-05-24 - [DOM-based XSS in Global UI Components]
**Vulnerability:** Found multiple instances where user-supplied input (toast messages, prompt dialog titles/messages) was unsafely injected into the DOM using `.innerHTML`.
**Learning:** Using string interpolation with `.innerHTML` to insert dynamic data into UI components creates a severe DOM-based XSS vulnerability if any inputs are not properly sanitized.
**Prevention:** Always use safe DOM manipulation methods such as `document.createElement`, `textContent`, and `.appendChild()` when rendering dynamic text or variables in the UI.
