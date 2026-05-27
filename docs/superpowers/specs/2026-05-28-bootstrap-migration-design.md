# Bootstrap Migration Design
Date: 2026-05-28

## Goal
Rebuild all 21 HTML pages in DesignVault using Bootstrap 5 for layout and structure, while preserving the original visual designs (colors, typography, brand identity) via per-demo custom CSS files.

---

## Bootstrap Version
Bootstrap **5.3.x** loaded via CDN (jsDelivr):
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

---

## CSS Architecture

Each demo directory gets one `custom.css` file. All pages (homepage + subpages) share the same file via relative paths.

```
index.html                        → Bootstrap CDN + css/style.css (existing)
css/style.css                     → updated with Bootstrap overrides

pages/fashion-ecommerce/
  custom.css                      → brand overrides
  index.html                      → Bootstrap + custom.css
  womens/index.html               → Bootstrap + ../custom.css
  mens/index.html                 → Bootstrap + ../custom.css
  accessories/index.html          → Bootstrap + ../custom.css
  about/index.html                → Bootstrap + ../custom.css

pages/saas-dashboard/
  custom.css
  index.html + 4 subpages         → same pattern

pages/boutique-brand/
  custom.css
  index.html + 4 subpages

pages/space-scifi/
  custom.css
  index.html + 4 subpages
```

---

## Division of Responsibility

### Bootstrap handles
- Grid layout: `container`, `row`, `col-*` with responsive suffixes (`col-12 col-md-6 col-lg-4`)
- Navbar component: `navbar`, `navbar-toggler`, `nav-link`, `offcanvas` (mobile menu)
- Buttons: `btn`, `btn-outline-*`, `btn-dark`
- Cards: `card`, `card-body`, `card-title`, `card-text`
- Tables: `table`, `table-striped`, `table-hover`
- Badges: `badge`
- Forms: `form-control`, `form-label`, `form-select`
- Utilities: `d-flex`, `gap-*`, `p-*`, `m-*`, `text-*`, `bg-*`, `border-*`, `overflow-hidden`
- Responsive breakpoints via col classes (replaces custom `@media` for grid)

### custom.css handles
- Google Fonts `@import` / `<link>`
- CSS variables for brand colors (`--brand-primary`, `--brand-bg`, etc.)
- Bootstrap variable overrides (`:root { --bs-body-font-family: ...; }`)
- Specific overrides: remove Bootstrap border-radius, change default btn colors, navbar height
- Effects Bootstrap cannot express: sci-fi glow/neon, serif letter-spacing, luxury spacing

---

## Per-Demo Notes

### index.html (portfolio entry)
- Hero section: Bootstrap container + custom typography
- Projects grid: Bootstrap `row` + `col-6` (2-col), `col-12` on mobile
- Buttons inside cards: `btn btn-dark` + `btn btn-outline-dark`
- Footer: Bootstrap `container` utility

### fashion-ecommerce (MAISON NOIR)
- Navbar: `navbar navbar-expand-lg` with custom warm-palette override
- Hero: full-width section, Bootstrap container for content
- Product grid: `row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4`
- Filter tabs: `nav nav-pills` or `nav nav-tabs`
- Membership CTA: Bootstrap `container` + custom background

### saas-dashboard (NexusFlow Enterprise)
- Layout: `d-flex` wrapper — sidebar (`flex-shrink-0`) + main (`flex-grow-1`)
- Sidebar nav: `nav flex-column`
- Topbar: `d-flex align-items-center justify-content-between`
- Stats grid: `row row-cols-2 row-cols-xl-4 g-3`
- Tables: `table table-hover`
- Sidebar toggle on mobile: Bootstrap `offcanvas` component

### boutique-brand (AURÈLE)
- Fixed navbar: `navbar fixed-top` with scroll-triggered background (JS)
- Collections grid: `row row-cols-1 row-cols-md-3 g-4`
- Works masonry: `row g-3` with varying col heights via custom CSS
- Contact form: Bootstrap form components

### space-scifi (NEXUS VOID)
- Navbar: `navbar navbar-dark navbar-expand-lg` with custom dark overrides
- Missions list: Bootstrap `list-group` with custom dark styling
- Fleet table: `table`
- Telemetry grid: `row row-cols-2 row-cols-md-3` with custom sensor card CSS
- Progress bars: `progress` component

---

## Download ZIP Update

`js/main.js` DEMOS manifest updated to include `custom.css` for each demo:

```js
'fashion-ecommerce': {
  files: [
    ['pages/fashion-ecommerce/custom.css', 'custom.css'],
    ['pages/fashion-ecommerce/index.html', 'index.html'],
    ...subpages
  ]
}
```

The `cleanHtml` function already strips DesignVault navigation. Bootstrap CDN links remain (pointing to external CDN), so downloaded templates work out of the box.

---

## Files to Create / Modify

| Action | File |
|---|---|
| Modify | `index.html` |
| Modify | `css/style.css` |
| Modify | `js/main.js` |
| Create + Modify | `pages/fashion-ecommerce/custom.css` + 5 HTML |
| Create + Modify | `pages/saas-dashboard/custom.css` + 5 HTML |
| Create + Modify | `pages/boutique-brand/custom.css` + 5 HTML |
| Create + Modify | `pages/space-scifi/custom.css` + 5 HTML |

Total: 4 new CSS files + 21 modified HTML files + 2 modified support files

---

## Constraints
- No build tools, no npm — Bootstrap loaded via CDN only
- Each page must remain functional as a standalone file
- Visual designs (colors, typography, brand identity) must be preserved
- RWD maintained via Bootstrap breakpoints (sm/md/lg/xl)
- Downloaded ZIP templates must work in browser without additional setup
