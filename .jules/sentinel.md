## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.
## 2024-05-24 - DOM-based XSS Prevention
**Vulnerability:** Found multiple instances of unescaped HTML assignments via `innerHTML` within `EAA Web Version/js/app.js` (e.g. `ToastManager` and `PromptDialog`).
**Learning:** Building components using string interpolation and assigning them to `innerHTML` introduces a high risk of DOM-based XSS when data variables are parsed directly as HTML instead of strings.
**Prevention:** Always utilize safe DOM methods (`document.createElement`, `textContent`, `appendChild`) for generating dynamic application UI. This guarantees that user input or application state is properly treated as text rather than executable markup.
