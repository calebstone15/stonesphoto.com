## 2024-05-22 - Replacing Native Alerts with Accessible Inline Feedback
**Learning:** Native `alert()` calls are intrusive and offer poor accessibility. They block the main thread and don't integrate well with screen readers compared to inline feedback.
**Action:** When modernizing forms, always replace `alert()` with a container using `role="alert"` or `aria-live="polite"` to provide non-blocking, accessible status updates.
