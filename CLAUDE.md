# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview (DesignVault)

DesignVault is a **static front-end portfolio** showcasing five web design demos. There is no build process, no backend, and no package manager. Pages use **Bootstrap 5.3.3** (loaded via CDN) plus a per-demo `custom.css` for brand-specific overrides.

The Chinese tagline "精選網頁設計作品展示" means "Premium Web Design Portfolio Showcase".

---

## Repository Structure

```
DesignVault/
├── index.html                        # Landing page — lists all five demos
├── css/
│   └── style.css                     # Global styles for index.html only
├── js/
│   └── main.js                       # Download-ZIP logic + cleanHtml() strips DV navigation
└── pages/
    ├── fashion-ecommerce/
    │   ├── custom.css                # MAISON NOIR brand overrides
    │   ├── api-guide.js              # API toolbar (see below)
    │   ├── index.html
    │   ├── womens/ mens/ accessories/ about/
    ├── saas-dashboard/
    │   ├── custom.css                # NexusFlow Enterprise brand overrides
    │   ├── api-guide.js
    │   ├── index.html
    │   ├── analytics/ users/ orders/ settings/
    ├── boutique-brand/
    │   ├── custom.css                # AURÈLE brand overrides
    │   ├── api-guide.js
    │   ├── index.html
    │   ├── story/ collections/ works/ contact/
    ├── space-scifi/
    │   ├── custom.css                # ORBITAL brand overrides
    │   ├── api-guide.js
    │   ├── index.html
    │   ├── rooms/ experiences/ book/ about/
    └── quill-landing/
        ├── custom.css                # Quill brand overrides
        ├── api-guide.js
        ├── index.html
        ├── features/ pricing/ about/
```

Each demo's homepage loads `custom.css`; subpages load `../custom.css`.

---

## Technology Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| CSS framework | Bootstrap 5.3.3 via jsDelivr CDN |
| Brand styles | Per-demo `custom.css` (CSS custom properties + brand overrides) |
| Scripting | Vanilla JavaScript (no frameworks) |
| Fonts | Google Fonts (loaded via `<link>`) |
| Build | None — open the file directly in a browser |
| Dependencies | None — no `package.json` or lock files |

---

## Running the Project

**Live site:** Deployed on GitHub Pages at the repo's GitHub Pages URL.

Open any HTML file directly in a browser, or spin up a local HTTP server for accurate relative-path and font behaviour:

```bash
# Python (simplest)
python3 -m http.server 8080

# Node (npx, no install needed)
npx serve .
```

Then visit `http://localhost:8080` for the landing page, or navigate directly to a demo:

- `http://localhost:8080/pages/fashion-ecommerce/`
- `http://localhost:8080/pages/saas-dashboard/`
- `http://localhost:8080/pages/boutique-brand/`
- `http://localhost:8080/pages/space-scifi/`
- `http://localhost:8080/pages/quill-landing/`

---

## Bootstrap Integration Pattern

### Head order (every page)

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Google Fonts (if needed by this demo) -->
<link href="..." rel="stylesheet">
<!-- Brand overrides last -->
<link rel="stylesheet" href="custom.css">          <!-- homepage -->
<link rel="stylesheet" href="../custom.css">       <!-- subpages -->
```

### Body end

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- demo-specific inline JS if any -->
```

### custom.css structure

Each `custom.css` follows this order:
1. `:root { }` — brand CSS variables + Bootstrap token overrides (`--bs-body-bg`, `--bs-border-radius`, etc.)
2. Layout / structural classes unique to this demo
3. Component overrides (navbar, cards, buttons, forms)
4. Animation keyframes
5. `@media` breakpoints for custom classes only (Bootstrap handles grid breakpoints)

---

## Design System & CSS Conventions

### CSS Custom Properties

**Global variables (index.html / css/style.css):**
```css
--bg: #ffffff
--text: #1a1a1a
--accent: #2563eb
--border: #e5e7eb
--radius: 12px
```

**Per-demo brand variables (in each demo's `custom.css :root`):**
- `fashion-ecommerce`: `--mn-bg: #faf8f5`, `--mn-gold: #c9a96e`
- `saas-dashboard`: `--nf-bg: #0d1117`, `--nf-blue: #58a6ff`, `--nf-surface: #161b22`
- `boutique-brand`: `--au-bg: #faf9f7`, `--au-gold: #b8a898`, `--au-bg-alt: #f3f0eb`
- `space-scifi`: `--nv-bg: #060b14`, `--nv-cyan: #00d4ff`, `--nv-surface: #0d1829`
- `quill-landing`: `--ql-bg: #ffffff`, `--ql-teal: #0d9488`, `--ql-blue: #0ea5e9`

### Responsive Approach

Bootstrap's grid utilities (`col-12 col-md-X col-lg-X`, `row-cols-*`) handle layout breakpoints. Custom `@media` blocks in `custom.css` are used only for custom component classes not covered by Bootstrap utilities.

### Typography

| Demo | Display font | Body font |
|---|---|---|
| fashion-ecommerce | Playfair Display | Inter |
| saas-dashboard | Inter only | Inter |
| boutique-brand | Cormorant Garamond | Inter |
| space-scifi | `'Courier New', 'Consolas', monospace` (no Google Fonts) | monospace |
| quill-landing | Inter only | Inter |

---

## API Guide Toolbar (`api-guide.js`)

Each demo has a `pages/<demo>/api-guide.js` that injects a fixed bottom toolbar showing which API endpoints the page requires. This is intentional infrastructure for developers who download the ZIP — `cleanHtml()` does **not** strip it.

**How it works:**

1. The host page declares `window.API_ENDPOINTS` before loading the script:

```html
<script>
window.API_ENDPOINTS = [
  { method: 'GET',  path: '/api/products/featured' },
  { method: 'POST', path: '/api/orders' },
];
</script>
<script src="api-guide.js"></script>        <!-- homepage -->
<script src="../api-guide.js"></script>     <!-- subpages -->
```

2. The script (a self-contained IIFE, no dependencies) injects `.ag-bar` (fixed 40 px bottom strip) and `.ag-panel` (expandable endpoint list). CSS uses the `.ag-` prefix to avoid collision with demo styles.

3. Only pages with data-fetching get the toolbar. Static/editorial pages (e.g. `about/`, `story/`) omit it. Each demo covers at most 3 pages (including `index.html`).

**Do not** add `api-guide.js` entries to `cleanHtml()` — the toolbar must survive the ZIP download.

---

## Demo Pages — Key Details

### 1. Fashion E-Commerce (`pages/fashion-ecommerce/`)

- Brand: **MAISON NOIR** · 4 subpages: womens, mens, accessories, about
- DesignVault back link class: `.dv-bar` (strip target for `cleanHtml()`)
- Nav: Bootstrap `navbar-expand-lg sticky-top` with custom `--mn-*` variables
- Filters on subpages use `nav nav-pills` (not `nav-tabs`) to receive brand pill styling
- No JavaScript beyond Bootstrap collapse

### 2. SaaS Dashboard (`pages/saas-dashboard/`)

- Brand: **NexusFlow Enterprise** · 4 subpages: analytics, users, orders, settings
- DesignVault back link class: `.dv-back` (strip target for `cleanHtml()`)
- Layout: fixed 240 px `.nf-sidebar` (transforms off-screen on mobile, `.open` class toggles it) + `.nf-main`
- Settings page uses Bootstrap JS tab panels (`data-bs-toggle="tab"`)
- No charting library — chart bars are pure CSS

### 3. Boutique Brand (`pages/boutique-brand/`)

- Brand: **AURÈLE** · 4 subpages: story, collections, works, contact
- DesignVault back link class: `.designvault-link` (strip target for `cleanHtml()`)
- Navbar: `fixed-top`, transparent; gains `.scrolled` class via scroll listener
- `au-input` inputs have `display: block` — required for `w-100` to work on them
- `.btn-au-outline-on-dark` variant for buttons on dark backgrounds

### 4. Space Hotel (`pages/space-scifi/`)

- Brand: **ORBITAL** · 4 subpages: rooms, experiences, book, about
- DesignVault back link class: `.designvault-back` (strip target for `cleanHtml()`)
- Monospace font everywhere — no Google Fonts loaded
- `rooms/`: Three cabin tiers (Standard Pod / Observatory Suite / Executive Sphere)
- `book/`: Booking form with date pickers, room select, guest count; all `<label>` have `for` matching `id`
- `.nv-hero` has `padding-top: 72px` to compensate for `fixed-top` navbar

### 5. Quill Landing Page (`pages/quill-landing/`)

- Brand: **Quill** · 3 subpages: features, pricing, about
- DesignVault back link class: `.dv-bar` (strip target for `cleanHtml()`)
- Palette: `--ql-teal: #0d9488`, `--ql-blue: #0ea5e9`, white background (`--ql-bg: #ffffff`)
- Google Fonts: Inter only (loaded in homepage; subpages inherit via `../custom.css`)
- Navbar: `sticky-top` (NOT `fixed-top`) — no padding compensation needed
- `pricing/`: visual billing toggle (pure CSS, no JS), `Pro` card has `.featured` class + `.pricing-badge`
- `pricing/`: Bootstrap accordion FAQ with IDs `faq1`–`faq4`; first item open (`show`) by default
- `.ql-editor-mock`: homepage hero editor mockup with `.mock-toolbar` and `.ql-ai-chip` floating chip

### DesignVault back link classes (critical for `cleanHtml()`)

| Demo | Class |
|---|---|
| fashion-ecommerce | `.dv-bar` |
| saas-dashboard | `.dv-back` |
| boutique-brand | `.designvault-link` |
| space-scifi | `.designvault-back` |
| quill-landing | `.dv-bar` |

`js/main.js` `cleanHtml()` removes elements with these classes before zipping for download. If you change a back link, update `cleanHtml()` to match.

---

## Git Conventions

### Commit Style

Follow the existing convention: `feat:`, `fix:`, `docs:` prefixes with a concise imperative description.

```
feat: add contact form to boutique-brand page
fix: correct nav-pills styling in fashion-ecommerce accessories
docs: update CLAUDE.md with Bootstrap architecture notes
```

### Cache Busting

When modifying `css/style.css` or `js/main.js`, update the version query string in `index.html` (e.g. `?v=20260528`) to force browser cache invalidation.

---

## Editing Conventions for AI Assistants

1. **No build step** — edits to HTML/CSS take effect immediately on refresh. Never suggest running `npm install` or `npm build`.
2. **No `<style>` blocks** — demo pages have no inline `<style>` elements. Brand colours, spacing, and radii belong in `custom.css` as CSS variables. One-off presentational tweaks (e.g. `letter-spacing: 1.2px` on a single label) may use inline `style=""`, but do not scatter brand tokens (colours, radii) as inline values.
3. **Bootstrap utilities first** — use Bootstrap classes (`d-flex`, `gap-2`, `text-muted`, etc.) before writing custom CSS. Add custom CSS only when Bootstrap has no equivalent or brand identity requires it.
4. **CSS variables first** — when changing colours, spacing, or radii in a demo, update the CSS variable in `custom.css :root` rather than scattering literal values.
5. **Global styles** (`css/style.css`) apply only to `index.html`. Do not import it from demo pages.
6. **No JavaScript frameworks** — keep scripts vanilla. A scroll listener or a class toggle is fine; do not reach for React, Vue, Alpine, or similar.
7. **Responsive parity** — Bootstrap grid handles most layout. When adding custom classes, add the matching `@media` blocks in `custom.css` at the same time.
8. **No minification or bundling** — source files stay human-readable.
9. **Chinese copy** — the project mixes Traditional Chinese and English. Preserve the tone and register of existing Chinese text when editing nearby sections.
10. **New demo pages** — go inside `pages/<demo-name>/index.html`. Add the DesignVault back link with the demo's designated class (see table above).

---

## What Does Not Exist (Do Not Assume)

- No `node_modules`, `package.json`, or lock files
- No TypeScript
- No linting or formatting configuration (ESLint, Prettier, Stylelint)
- No test suite
- No server-side code
- No environment variables or `.env` files
- No database or API integrations
- No deployment configuration
