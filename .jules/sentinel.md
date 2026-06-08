## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-06-08 - [DOM-based XSS in Component Initialization]
**Vulnerability:** Core UI components (`ToastManager`, `PromptDialog`) used `.innerHTML` with string interpolation to render user-controlled input (e.g., messages, titles), leading to DOM-based Cross-Site Scripting (XSS).
**Learning:** Even shared utility scripts and frontend overlays are attack vectors if they assume inputs are safe. Using string interpolation inside `.innerHTML` circumvents browser defenses and executes arbitrary HTML/JS.
**Prevention:** Always use safe DOM APIs like `document.createElement()`, `document.createTextNode()`, or `.textContent` instead of `.innerHTML` when dynamically constructing elements that handle variable data.
