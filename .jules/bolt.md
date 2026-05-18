## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.
## $(date +%Y-%m-%d) - Optimization of Hotfire Charting Data Fetching
**Learning:** In applications utilizing custom data caching architectures like `AnalyzerContext`'s `numericCache`, replacing global iteration structures (`getFilteredData()`) with direct, cached column lookups significantly mitigates redundant parsing (`Utils.parseNumber`). However, refactoring these data paths requires strictly preserving implicit state updates; `getFilteredData()` inherently refreshed the `dataMask`, which necessitated explicit `updateDataMask()` calls before direct column lookups to avoid decoupling UI state (like the Extra Data slider) from the rendered plot data.
**Action:** When migrating complex computational functions from sequential full-row parsing to columnar caching, explicitly audit the legacy method for essential side-effects (like state or mask generation) and guarantee those side-effects are extracted and invoked independently prior to data access.
