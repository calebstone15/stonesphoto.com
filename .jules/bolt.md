## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - Redundant String Parsing in Hot Loops
**Learning:** In hot loops over large datasets (like `getTotalThrust` parsing CSV columns for ~50k rows), parsing raw string values per cell rather than leveraging cached, pre-parsed numeric arrays degrades performance. Parsing operations within an inner loop create an O(N*M) bottleneck.
**Action:** When working with numeric computations on string-based tabular data, ensure string-to-number parsing is cached upfront in single-pass operations O(N) (like `getNumericColumn`), and access the cache during repetitive loops.