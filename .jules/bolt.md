## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - Array.filter Overhead on Large Datasets
**Learning:** Using `Array.prototype.filter` within a mapping loop (e.g. `arrays.map(arr => arr.filter((_, i) => mask[i]))`) executes a callback function for every element and dynamically resizes arrays. On large 1M+ point CSV datasets, this creates a significant performance bottleneck due to callback overhead and memory allocations.
**Action:** Replace `filter` callbacks for large data subsets with optimized `for` loops. Pre-calculate the result length from the mask, pre-allocate the target array (`new Array(trueCount)`), and manually assign values. This provides a ~4x speedup.
