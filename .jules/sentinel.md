## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-05-18 - [Fix DOM XSS in UI Components]
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) via `innerHTML`
**Learning:** Found string interpolation of variables (`title`, `message`, `defaultValue`) into `.innerHTML` for `PromptDialog` and `ToastManager` modals. This allows malicious input to execute arbitrary JavaScript if dynamic user data is passed to these components.
**Prevention:** Avoid `.innerHTML` entirely for dynamically generated UI components. Instead, use safe native DOM manipulation methods like `document.createElement()` and assign content to text nodes via `.textContent`.
