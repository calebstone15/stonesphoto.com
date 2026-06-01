## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.

## 2025-05-18 - ESLint Modern JavaScript Parsing Error
**Learning:** The project's `.eslintrc.js` enforces `ecmaVersion: 2018`, meaning modern JavaScript features like optional chaining (`?.`) will throw ESLint parsing errors.
**Action:** When updating vanilla JS files in this repo, strictly avoid using features added after ES2018 (like optional chaining) or accept that it's a known constraint of the testing pipeline.
## 2025-05-18 - Avoid Redundant Parsing in Data Processing Loops
**Learning:** Redundantly mapping an array of objects to parse strings to numbers inside performance-sensitive loops (`getColumnData` and `getFilteredNumericColumn`) created significant main-thread blocking overhead.
**Action:** Always fetch cached pre-parsed arrays (e.g., via `ctx.getNumericColumn`) directly from `AnalyzerContext` when retrieving numerical dataset vectors.
