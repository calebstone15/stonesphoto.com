## 2024-01-20 - [Reverse Tabnabbing Mitigation]
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` allow the opened page to access the `window.opener` object, potentially enabling phishing attacks.
**Learning:** Even simple static sites can have security vulnerabilities in their HTML structure.
**Prevention:** Always add `rel="noopener noreferrer"` to any `<a>` tag that opens in a new tab/window (`target="_blank"`).
