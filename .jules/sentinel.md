## 2026-02-02 - Centralized EmailJS Config & Reverse Tabnabbing
**Vulnerability:** Hardcoded third-party service keys (EmailJS) scattered across multiple files, and external links with `target="_blank"` missing `rel="noopener noreferrer"`.
**Learning:** Hardcoding keys in multiple places leads to configuration drift and makes rotation difficult. Even public keys should be managed centrally. External links without `noopener` expose users to reverse tabnabbing attacks.
**Prevention:** Use a centralized configuration object/module for all third-party services. Lint for `target="_blank"` without `rel="noopener noreferrer"`.
