## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2026-02-16 - [Unsafe DOM Rendering of CSV Headers]
**Vulnerability:** `innerHTML` was used to render checkboxes for CSV columns in `hotfire-analyzer.js`, exposing the app to Self-XSS via malicious CSV files.
**Learning:** Data from local files (like CSV headers) must be treated as untrusted user input. Maliciously crafted column names can inject arbitrary HTML/JS.
**Prevention:** Use `textContent` and `document.createElement()` when rendering dynamic lists from data sources instead of `innerHTML`.
