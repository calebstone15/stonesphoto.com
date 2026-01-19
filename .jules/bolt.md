# Bolt's Journal ⚡

## 2026-01-19 - Manual Font Optimization in Static Site
**Learning:** Lacking a build step/bundler, Google Fonts were loaded via `@import` in CSS, causing render blocking. Optimization required manual updates to `head` in all HTML files to use `preconnect` and combined `<link>` tags.
**Action:** When working on this static site, avoid `@import` for critical resources. Manually manage resource hints in HTML headers.
