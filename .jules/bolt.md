## 2025-05-18 - Invalid CSS Import Placement
**Learning:** CSS `@import` rules must precede all other rules (except `@charset`). Placing them at the bottom of a CSS file renders them invalid/ignored by browsers, but they still clutter the code.
**Action:** Always check for `@import` statements not at the top of the file and remove or move them. In this case, it was redundant anyway as the font was loaded in HTML.

## 2025-05-18 - Array Search and Allocation Performance
**Learning:** Using `[...arr].reverse().findIndex()` to find the last index is an anti-pattern. It creates a full copy of the array and reverses it, which is O(N) memory and time. Use `arr.lastIndexOf()` instead for primitive types or simple predicates.
**Action:** Scan for usage of `.reverse()` on array copies used solely for finding indices. Replace with `lastIndexOf` or a reverse loop.
## 2026-05-04 - Array Pre-allocation vs Optional Chaining
**Learning:** Replacing `?.` optional chaining with explicit  checks does not offer measurable performance benefits in modern V8 engines and degrades code readability. Avoid micro-optimizing modern syntax unless inside extreme hot paths.
**Action:** Do not regress modern syntax (`?.`) for negligible perceived gains.
## 2026-05-04 - Syntax Optimization Traps
**Learning:** Replacing optional chaining with explicit null checks does not offer measurable performance benefits in modern V8 engines and degrades code readability. Focus on data structures.
**Action:** Do not regress modern syntax for negligible perceived gains.
