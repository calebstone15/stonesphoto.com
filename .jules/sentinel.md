## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-04-06 - [DOM-based XSS in Component Builders]
**Vulnerability:** UI components (`ToastManager` and `PromptDialog` in `EAA Web Version/js/app.js`) utilized template literals injected directly via `innerHTML` with unsanitized user inputs (`message`, `title`). This allows for Stored or Reflected DOM-based XSS when malicious user inputs (e.g., from CSV error parsing) are passed to these components.
**Learning:** Even internal toolings and standalone HTML applications need strict separation of content and structure. String interpolation into `innerHTML` is inherently unsafe when handling data derived from external sources (like uploaded files).
**Prevention:** Always use safe DOM APIs like `document.createElement()` paired with `textContent` or `setAttribute()` to construct dynamic HTML elements. Never use `innerHTML` with interpolated variables.
