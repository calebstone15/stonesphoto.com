## 2025-10-27 - [Hardcoded Configuration Pattern]
**Vulnerability:** Hardcoded API keys and Service IDs (EmailJS) scattered across multiple files (`script.js`, `bookings.html`).
**Learning:** Even "public" keys should be centralized. Scattering them violates DRY and makes rotation/maintenance difficult. It also increases the risk of accidentally committing a real secret if the pattern is followed for other services.
**Prevention:** Use a centralized `config.js` or environment variable injection (if using a bundler) to manage all external service credentials and identifiers.

## 2024-05-18 - XSS Vulnerability Prevention
 **Vulnerability:** Unsafe DOM assignments using `.innerHTML` can lead to Stored XSS vulnerabilities.
 **Learning:** In frontend JS code, when setting innerHTML with user-controlled data or properties from objects, it could be used by an attacker to run malicious JavaScript (XSS).
 **Prevention:** Use safe DOM manipulation methods such as `document.createElement()`, `element.textContent`, and `element.replaceChildren()` instead of concatenating strings and assigning to `.innerHTML`.
