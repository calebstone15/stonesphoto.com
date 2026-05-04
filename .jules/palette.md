## 2024-06-25 - [Add ARIA states to mobile menu]
**Learning:** The mobile menu toggle (`.header-menu-btn`) lacked `aria-expanded` and `aria-controls` attributes, and its state was not synchronized dynamically when toggling the menu, which is critical for screen reader users to understand when the menu opens or closes.
**Action:** Added `aria-controls="header-nav"` and `aria-expanded="false"` to the `.header-menu-btn` elements across all HTML pages. Updated the JS logic in `script.js` and inline scripts to toggle `aria-expanded` dynamically based on the `.header-nav`'s visibility state.
