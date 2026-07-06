## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2026-07-06 - [DOM-based XSS in Utility UI Components]
**Vulnerability:** Core application utility UI components (ToastManager, PromptDialog) were dynamically constructing user interfaces using `innerHTML` with unsanitized data (e.g., CSV parse errors, unvalidated numeric boundaries).
**Learning:** In vanilla JavaScript, concatenating variables directly into HTML template strings and rendering them via `innerHTML` immediately evaluates script tags or malformed image payloads. Since utility components are globally exposed and receive input from multiple unrelated flows, they become ideal vectors for DOM-based XSS.
**Prevention:** When dynamically building HTML components in vanilla JS, establish standard templates as strings but inject dynamic user data strictly via `textContent`, or construct all elements safely via `document.createElement` and `element.appendChild`.
