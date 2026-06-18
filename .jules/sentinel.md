## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.
## 2026-05-25 - [DOM-based XSS via innerHTML]
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) vulnerability was found in `ToastManager.show` and `PromptDialog.show` where user-provided input was directly interpolated into `.innerHTML`.
**Learning:** Dynamic DOM construction involving potentially untrusted input should never use `.innerHTML` with string interpolation as it allows execution of injected scripts.
**Prevention:** Use safer DOM APIs like `document.createElement`, `textContent`, and safely map attributes rather than interpolating raw strings into `innerHTML`.
