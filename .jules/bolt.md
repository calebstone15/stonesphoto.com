## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2026-03-09 - Holey Arrays vs Float64Array
**Learning:** Using `[]` and repeatedly pushing values in a loop that handles numerical data (especially with `NaN` checking) forces V8 to treat it as a "holey array," imposing severe memory and performance penalties (e.g. ~967ms for 1M iterations).
**Action:** Always pre-allocate numerical arrays using typed arrays like `Float64Array` and assign values by index. Chart.js natively accepts typed arrays without performance degradation.
