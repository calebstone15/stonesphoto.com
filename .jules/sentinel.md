## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-05-18 - XSS Vulnerability via `.innerHTML` Assignment
 **Vulnerability:** Unsafe `.innerHTML` assignments in frontend JS components (`app.js`, `cda-calculator.js`, `hotfire-analyzer.js`) were susceptible to Stored XSS if attacker-controlled data (e.g., column names from uploaded CSVs) were rendered without sanitization.
 **Learning:** Utilizing `.innerHTML` for DOM updates is an anti-pattern when rendering dynamic or user-provided content as it bypasses HTML encoding and executes injected scripts.
 **Prevention:** Strictly enforce the use of safe DOM manipulation methods such as `document.createElement()`, `textContent`, `appendChild()`, and `replaceChildren()` for all dynamic content rendering.
