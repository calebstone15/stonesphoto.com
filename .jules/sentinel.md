## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.
## 2025-10-27 - [DOM-based XSS Prevention via DOM API]
**Vulnerability:** DOM-based XSS using `innerHTML` for dynamic message insertion in `ToastManager` and `PromptDialog` components (`app.js`).
**Learning:** Constructing complex HTML elements via string interpolation with `innerHTML` invites injection vulnerabilities if any variable part (e.g. `title`, `message`) is user-controlled. Also discovered that utilizing `.textContent` blindly to escape UI layout components (like dynamically generated SVG icons) will mistakenly render raw source code text, breaking the UI visually.
**Prevention:** Always use programmatic DOM element creation (`document.createElement()`) and strict text node assignment (`textContent`) for user input, while using `innerHTML` only for strictly controlled, internal, hardcoded components (like predefined SVG icons).
