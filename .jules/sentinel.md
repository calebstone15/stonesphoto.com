## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2023-10-27 - [DOM XSS via Template Literals in innerHTML]
**Vulnerability:** Core UI components (`ToastManager` and `PromptDialog` in `app.js`) utilized `innerHTML` combined with template literals to construct UI elements dynamically, blindly interpolating user inputs (`message`, `title`, `defaultValue`). This allowed Stored or Reflected DOM-based Cross-Site Scripting (XSS).
**Learning:** Widespread usage of template literals directly assigned to `.innerHTML` for DOM construction is an anti-pattern in vanilla JS codebases without sanitizers. It bypasses any browser-level protection against malicious payloads.
**Prevention:** Construct UI components exclusively using `document.createElement()` and assign user-provided variables via `.textContent`, which guarantees that the browser processes the payload as text and not an executable HTML/script node.
