## 2024-05-22 - [Static Site Performance Patterns]
**Learning:** In a static HTML codebase without a bundler, standard resource hints (`preconnect` for fonts, `preload` for LCP images) are the primary available performance levers. Consistency in pathing (absolute vs relative) is critical when manually injecting these tags across different pages.
**Action:** When working on static sites, verify path resolution strategy (root-relative vs document-relative) before applying global `replace` operations for resource paths.
