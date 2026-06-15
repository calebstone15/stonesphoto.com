## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.
## 2026-06-15 - IntersectionObserver vs Scroll Event Listeners for Native Lazy Loading
**Learning:** Attaching heavy UI queries (like `getBoundingClientRect()`) to synchronous `scroll` and `resize` event listeners for elements that can natively be lazy loaded using `loading="lazy"` creates severe performance and layout thrashing issues on the main thread. Implementing `IntersectionObserver` drastically improves performance. However, removing custom JS-based lazy loading logic without applying the native HTML attribute means elements won't lazy-load at all.
**Action:** When replacing custom JS scroll listeners with `IntersectionObserver` or removing them entirely, always ensure that either the `IntersectionObserver` handles the lazy loading correctly (e.g., dynamically setting `src` from `data-src`) or that the elements in the HTML correctly utilize the native `loading="lazy"` attribute, as to not break functionality.
