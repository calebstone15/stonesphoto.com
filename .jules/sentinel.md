## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-27 - [DOM-based XSS via innerHTML]
**Vulnerability:** The application was using `.innerHTML` to construct DOM elements like Toast notifications and Prompt Dialogs by interpolating un-sanitized string inputs.
**Learning:** Interpolating un-sanitized dynamic data or user input directly into `.innerHTML` templates exposes the application to Reflected and Stored DOM-based Cross-Site Scripting (XSS).
**Prevention:** Strictly prohibit the use of `.innerHTML` for rendering user-provided or dynamically generated data. Instead, build DOM structures securely using `document.createElement()` and `textContent` to ensure the browser treats all injected content as safe text data rather than executable code.
