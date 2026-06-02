## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2026-02-09 - Holey Array Performance
**Learning:** Pre-allocating standard Arrays (`new Array(len)`) and assigning values can lead to 'holey' array structures in V8 if `NaN` or mixed types are involved, which degrades performance significantly compared to `push`. However, `Float64Array` avoids this issue entirely and provides consistently high performance (up to 9x faster) for numeric data processing, even with `NaN` values.
**Action:** Prefer `Float64Array` (or other TypedArrays) over standard Arrays for heavy numeric processing tasks like signal smoothing or data filtering.
