## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-05-18 - [Stored XSS via innerHTML]
**Vulnerability:** Usage of .innerHTML across the application exposes it to DOM-based XSS when parsing potentially malicious inputs, such as user messages in ToastManager or titles in PromptDialog.
**Learning:** .innerHTML is inherently unsafe for interpolating arbitrary user data or external data. The application relied heavily on it for UI updates, introducing security risks.
**Prevention:** Use DOM parsing or targeted `textContent` assignments to safely construct and update the DOM elements instead of raw string interpolation with `.innerHTML`.
