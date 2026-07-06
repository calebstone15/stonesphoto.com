## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - Scroll Event Listeners and Layout Thrashing
**Learning:** Using synchronous `scroll` event listeners to query DOM element geometry with `getBoundingClientRect()` causes forced synchronous layout (layout thrashing) and blocks the main thread, leading to janky scrolling and poor performance, especially on mobile. Additionally, binding functions that simply set `loading="lazy"` attributes on `scroll` and `resize` is redundant and wasteful since modern browsers natively optimize `loading="lazy"` images.
**Action:** Replace synchronous `scroll` event visibility checks with `IntersectionObserver`. Only execute attribute-setting functions once if they rely on native browser features instead of attaching them to high-frequency events.
