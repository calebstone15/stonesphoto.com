## 2025-05-24 - [Font Loading Strategy]
**Learning:** This static site was using both CSS `@import` and HTML `<link>` tags for Google Fonts. This double-loading strategy created a sequential request chain (HTML -> CSS -> @import -> Font CSS) which delays text rendering.
**Action:** Always verify if fonts are being loaded redundantly. Moving strictly to `<link rel="preconnect">` + `<link rel="stylesheet">` in HTML eliminates the chain and allows parallel downloading.

## 2025-05-24 - [LCP Optimization on Static Sites]
**Learning:** Background images defined in CSS (e.g., `body { background: url(...) }`) are discovered late by the browser because it must parse the CSSOM first. This often delays the Largest Contentful Paint (LCP).
**Action:** For hero images defined in CSS, adding `<link rel="preload" as="image" href="...">` in the HTML `<head>` significantly improves LCP by telling the browser to fetch the asset immediately.
