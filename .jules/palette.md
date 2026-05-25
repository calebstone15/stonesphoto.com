## 2026-05-25 - Replace Hidden Layout Text with Semantic Margins
**Learning:** Found instances where `<p style="visibility: hidden">Invisible Text</p>` was being used purely for visual spacing in layout. This pollutes screen reader output.
**Action:** When adjusting layouts or spacing, always replace invisible structural text with semantic CSS layout properties (like `margin-top` or `margin-bottom`) on valid structural elements to maintain screen reader accessibility without sacrificing visual design.
