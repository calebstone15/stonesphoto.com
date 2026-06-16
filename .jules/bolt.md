## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - Fast Numeric Operations with Pre-allocated Arrays
**Learning:** For continuous numeric operations on potentially sparse data with NaNs like moving averages (`Utils.smooth`), dynamic array population (`result.push()`) is much slower than using a pre-allocated array via `new Array(len)` and index assignments. Although `Float64Array` is even faster, replacing an API that returns a standard array with a typed array risks corrupting nulls (coercing them to 0) and breaking methods like `.push()`.
**Action:** Always prefer `new Array(len)` over `[]` and `push()` when working with large continuous blocks of numeric data, especially when lengths are known up-front. Only use `Float64Array` when explicitly supported and safe for the data types (no nulls).
