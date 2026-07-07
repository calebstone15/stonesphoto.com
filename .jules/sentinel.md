## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-07-07 - Refactoring legacy innerHTML usages to prevent Stored XSS
 **Vulnerability:** Unsafe DOM assignments using `.innerHTML` in `EAA Web Version/js/cda-calculator.js` and `EAA Web Version/js/hotfire-analyzer.js` exposed the application to potential DOM-based/Stored XSS vulnerabilities if column names or plot titles originated from un-sanitized user CSV inputs.
 **Learning:** Direct `.innerHTML` assignments constructed with template strings often interpolate un-sanitized dynamic variables, bypassing browser security mechanisms designed to stop script injections.
 **Prevention:** Use safe DOM manipulation methods like `document.createElement()`, `textContent`, `setAttribute()`, and `appendChild()`/`replaceChildren()` to construct elements programmatically, ensuring text is securely escaped by the browser.
