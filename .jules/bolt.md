## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - Scroll Event Listeners vs. IntersectionObserver
**Learning:** Using synchronous `scroll` event listeners to check element visibility via `getBoundingClientRect()` forces layout recalculations, causing layout thrashing and main thread blocking. Also, manually implementing lazy loading via JS is redundant and wastes cycles when native `loading="lazy"` attributes are already correctly applied to images in the DOM.
**Action:** Always prefer `IntersectionObserver` over bound `scroll` handlers for visibility detection and animation triggers. Remove custom JS lazy loading scripts if `loading="lazy"` is supported natively in HTML.
