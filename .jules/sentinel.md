## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2025-10-27 - [Stored XSS via innerHTML DOM Generation]
**Vulnerability:** Constructing DOM elements by interpolating variable data (like parsed CSV headers) into template strings and assigning to `.innerHTML` exposes the application to DOM-based Stored XSS if the external data is malformed (e.g., `<script>alert(1)</script>`).
**Learning:** `innerHTML` executes embedded script tags and applies styles unconditionally when parsing strings into the DOM.
**Prevention:** Always use safe programmatic DOM APIs like `document.createElement()`, `element.textContent = data`, and `element.replaceChildren()` when rendering arbitrary user or external input into UI elements.
