import sys

content = """## 2024-05-23 - [Inline Form Validation]
**Learning:** Adding `aria-describedby`, `aria-invalid`, and `role="alert"` to form inputs and error messages significantly improves accessibility for screen reader users by programmatically linking errors to their fields and announcing them immediately.
**Action:** When implementing form validation, always ensure error messages are unused but present in the DOM (hidden) with unique IDs, and toggle their visibility and the `aria-invalid` state of the input based on validation logic. Use `blur` for initial check and `input` for real-time correction.

## 2024-05-24 - [Semantic Visual Spacing]
**Learning:** Using hidden elements (e.g., `<p style="visibility: hidden">Invisible Text</p>`) purely for visual layout spacing pollutes screen reader output by still being read by some screen readers or messing with focus order, despite being invisible to sighted users.
**Action:** Always use semantic CSS margins or padding (e.g., `padding-bottom`, `margin-top`) on semantic container elements to create visual spacing instead of polluting the DOM with invisible content.
"""

with open('.Jules/palette.md', 'w') as f:
    f.write(content)
