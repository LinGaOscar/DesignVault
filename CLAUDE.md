# CLAUDE.md — DesignVault

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DesignVault is a **static front-end portfolio** showcasing three web design demos. There is no build process, no backend, no dependencies, and no package manager. Everything is plain HTML5, CSS3, and vanilla JavaScript.

The Chinese tagline "精選網頁設計作品展示" means "Premium Web Design Portfolio Showcase".

---

## Repository Structure

```
DesignVault/
├── index.html                        # Landing page — lists all three demos
├── css/
│   └── style.css                     # Global styles shared by index.html only
├── js/
│   └── main.js                       # Minimal init script (logs on DOMContentLoaded)
└── pages/
    ├── fashion-ecommerce/
    │   └── index.html                # "MAISON NOIR" e-commerce storefront
    ├── saas-dashboard/
    │   └── index.html                # "NexusFlow Enterprise" analytics dashboard
    └── boutique-brand/
        └── index.html                # "AURÈLE" luxury brand showcase
```

Each demo page is **self-contained**: all CSS lives in a `<style>` block inside the HTML file. There are no separate per-page JS or CSS files.

---

## Technology Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Scripting | Vanilla JavaScript (no frameworks) |
| Fonts | Google Fonts (loaded via `<link>`) |
| Build | None — open the file directly in a browser |
| Dependencies | None — no `package.json` or lock files |
| Testing | None |
| CI/CD | None |

---

## Running the Project

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

---

## Design System & CSS Conventions

### CSS Custom Properties

`index.html` defines global variables in `:root`. Each demo page defines its own variables at the top of its `<style>` block, often overriding or extending the global set.

**Global variables (index.html / style.css):**
```css
--bg: #ffffff
--text: #1a1a1a
--accent: #2563eb
--border: #e5e7eb
--radius: 12px
--shadow: 0 4px 20px rgba(0,0,0,0.08)
```

**Per-page overrides:**
- `fashion-ecommerce`: warm palette — `#faf8f5` background, `#c9a96e` gold accent
- `saas-dashboard`: dark theme — `#0d1117` background, `#58a6ff` blue accent
- `boutique-brand`: minimal luxury — off-white background, serif typography, muted tones

### Responsive Breakpoints

All pages share the same breakpoint ladder (applied via `@media` blocks inside each file's `<style>`):

| Breakpoint | Target |
|---|---|
| `max-width: 1200px` | Large laptops |
| `max-width: 1024px` | Tablets landscape |
| `max-width: 768px` | Tablets portrait / large phones |
| `max-width: 480px` | Small phones |

### Layout Approach

- **CSS Grid** for multi-column sections (product grids, stats, collections).
- **Flexbox** for single-axis alignment (navbars, card interiors, icon rows).
- Mobile-first progressive enhancement: grids collapse from N columns → 2 → 1 as viewport narrows.

### Typography

| Demo | Display font | Body font |
|---|---|---|
| fashion-ecommerce | Playfair Display (Google Fonts) | Inter |
| saas-dashboard | Inter only | Inter |
| boutique-brand | Cormorant Garamond (Google Fonts) | Inter |

---

## Demo Pages — Key Details

### 1. Fashion E-Commerce (`pages/fashion-ecommerce/index.html`)

- Brand name: **MAISON NOIR**
- Sections: sticky nav → full-width hero → category cards → featured products grid (4-col) → membership CTA → footer
- Hover effects on category cards (scale + overlay)
- No JavaScript interactivity beyond standard browser behaviour

### 2. SaaS Dashboard (`pages/saas-dashboard/index.html`)

- Brand name: **NexusFlow Enterprise**
- Layout: fixed 240 px sidebar + scrollable main area
- Sections: sidebar nav groups → sticky topbar (search + notifications + avatar) → KPI stats grid (4-col) → charts area → recent-orders table with coloured status badges
- Dark theme throughout; multiple accent colours for data visualisation
- No charting library — chart visuals are pure CSS shapes

### 3. Boutique Brand (`pages/boutique-brand/index.html`)

- Brand name: **AURÈLE**
- Layout: fixed nav that gains a background on scroll (JS scroll listener)
- Sections: full-height hero → philosophy quote → collections grid (3-col with zoom-on-hover) → brand story → products → contact CTA → dark footer
- Only page with non-trivial JavaScript (scroll event for nav styling)

---

## Git Conventions

### Commit Style

Follow the existing convention: `feat:`, `fix:`, `docs:` prefixes with a concise imperative description.

```
feat: add contact form to boutique-brand page
fix: correct grid collapse on 768px breakpoint in saas-dashboard
docs: update CLAUDE.md with new page conventions
```

### Cache Busting

When modifying `css/style.css` or `js/main.js`, update the version query string in `index.html` (e.g. `?v=20260526`) to force browser cache invalidation.

---

## Editing Conventions for AI Assistants

1. **No build step** — edits to HTML/CSS take effect immediately on refresh. Never suggest running `npm install` or `npm build`.
2. **Self-contained pages** — all styles for a demo page go inside that page's `<style>` block, not in external files.
3. **Global styles** (`css/style.css`) apply only to `index.html`. Do not import it from demo pages.
4. **CSS variables first** — when changing colours, spacing, or radii in a demo, update the variable at the top of the `<style>` block rather than scattering literal values.
5. **No JavaScript frameworks** — keep scripts vanilla. A scroll listener or a class toggle is fine; do not reach for React, Vue, Alpine, or similar.
6. **Responsive parity** — whenever a new section or layout is added, add the matching `@media` blocks at the same time.
7. **No minification or bundling** — source files stay human-readable; there is no output directory to target.
8. **Chinese copy** — the project mixes Traditional Chinese and English. Preserve the tone and register of existing Chinese text when editing nearby sections.
9. **No new top-level files** unless explicitly requested — new demo pages go inside `pages/<demo-name>/index.html`.

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
