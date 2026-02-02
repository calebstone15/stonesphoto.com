## 2026-02-02 - Form Validation Pattern
**Learning:** Native `alert()` calls are disruptive and inaccessible. Screen readers often miss them or they block the UI.
**Action:** Replace all `alert()` usage in forms with an inline container `<div role="alert" aria-live="polite">`. Use `novalidate` on the form to disable browser defaults, and toggle `aria-invalid`/`aria-describedby` on inputs for field-level errors.
