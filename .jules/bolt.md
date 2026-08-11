## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2024-05-18 - Replacing `getBoundingClientRect` with `IntersectionObserver`
**Learning:** Legacy scrolling animations often rely on synchronous DOM reads via `getBoundingClientRect` bound to `window.onscroll`. This causes main thread blocking and layout thrashing, severely degrading scroll performance. Additionally, custom lazy loading scripts are redundant when images natively use `loading="lazy"`.
**Action:** Replace `scroll` event listeners querying bounding rects with `IntersectionObserver` to offload layout calculations from the main thread, and remove redundant lazy loading logic.
