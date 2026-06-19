## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-10-27 - [Moving Average Array Pre-allocation]
**Learning:** In the `smooth` utility, using a dynamically grown array via `result.push(...)` causes performance degradation due to continuous memory reallocation, especially with large datasets in graphing applications.
**Action:** When creating transformed numeric arrays of known lengths, pre-allocate the final array using `new Array(len)` and assign values by index (`result[i] = ...`). Make sure to explicitly ignore `null` values (`val !== null`) alongside `isNaN()` during summation.
