## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-27 - [DOM-based XSS via innerHTML]
**Vulnerability:** Constructing DOM elements by directly interpolating dynamic properties (like `title`, `message`) into `.innerHTML` templates in `EAA Web Version/js/app.js` (e.g., `ToastManager` and `PromptDialog`).
**Learning:** Even internal UI utilities like a toast notification or prompt dialog are susceptible to DOM-based XSS if they accept user-supplied or dynamic input that isn't properly sanitized. Using `.innerHTML` allows attackers to inject malicious HTML/JS.
**Prevention:** Avoid `.innerHTML` entirely for dynamically constructed content. Always use safer DOM APIs such as `document.createElement()` along with `.textContent` to safely assign dynamic data without interpreting it as markup.
