## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-27 - [DOM XSS via Unsafe innerHTML Assignment]
**Vulnerability:** Widespread use of `innerHTML` to render user-provided or externally sourced data (e.g., CSV headers, custom plot titles, prompt inputs) created severe DOM-based Cross-Site Scripting (XSS) vulnerabilities.
**Learning:** Constructing complex HTML strings that include dynamic values and assigning them directly to `innerHTML` bypasses browser sanitization, allowing malicious scripts embedded in the data to execute.
**Prevention:** Always construct DOM elements dynamically using `document.createElement()` and securely assign data using `textContent`. Reserve `innerHTML` strictly for statically defined, trusted markup.
