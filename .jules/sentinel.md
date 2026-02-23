## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-27 - [Unsafe DOM Manipulation in Data Tools]
**Vulnerability:** Widespread use of `innerHTML` to render dynamic content derived from user-supplied files (CSV headers) and inputs in `hotfire-analyzer.js`.
**Learning:** Tools ported from desktop environments (like Tkinter mentioned in comments) to Web often miss web-specific attack vectors like XSS. Developers might assume local files are "safe", but malicious CSVs can exploit the browser context.
**Prevention:** Always use `textContent` or `document.createElement` when rendering data from external files, even if the file is loaded locally by the user.
