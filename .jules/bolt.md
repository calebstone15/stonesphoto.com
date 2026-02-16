## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - TypedArray vs Array Performance
**Learning:** For large numeric datasets (1M+ items), pre-allocated `Float64Array` significantly outperforms standard `Array.push()` (measured ~7x faster: 42ms vs 312ms). Standard arrays incur heavy reallocation and garbage collection overhead during growth.
**Action:** When processing large numeric data columns (e.g., in `smooth` or `downsample`), always prefer `new Float64Array(len)` with index assignment over `[]` with `push()`.
