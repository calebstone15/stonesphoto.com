## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.
## 2026-04-20 - Prevent XSS with DocumentFragment
**Vulnerability:** User input values were directly interpolated into DOM elements using `.innerHTML` inside `ToastManager` and `PromptDialog`, exposing the application to DOM-based Cross-Site Scripting (XSS).
**Learning:** Constructing complex HTML structures with template literals and `.innerHTML` is convenient but introduces severe security risks when dynamic input is involved, even for seemingly benign utilities like modals and toasts.
**Prevention:** Utilize safe DOM building methods such as `document.createElement()` and `.textContent` to ensure that any inserted content is strictly parsed as text, preventing script execution.
