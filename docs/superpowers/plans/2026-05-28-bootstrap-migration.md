# Bootstrap Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all 21 HTML pages to Bootstrap 5, preserving original visual designs via per-demo custom CSS overrides.

**Architecture:** Bootstrap 5.3 via CDN handles grid/components/utilities. Each demo directory gets one `custom.css` for brand-specific overrides (colors, fonts, effects). Pages are no longer self-contained — they reference Bootstrap CDN + their demo's `custom.css`.

**Tech Stack:** Bootstrap 5.3.3 (jsDelivr CDN), vanilla JS, Google Fonts

---

## File Structure

```
index.html                              modified — Bootstrap grid + btn classes
css/style.css                           modified — Bootstrap overrides, remove custom grid
js/main.js                              modified — DEMOS manifest includes custom.css

pages/fashion-ecommerce/
  custom.css                            NEW — Playfair Display, warm palette overrides
  index.html                            modified — Bootstrap navbar/grid/cards
  womens/index.html                     modified
  mens/index.html                       modified
  accessories/index.html               modified
  about/index.html                     modified

pages/saas-dashboard/
  custom.css                            NEW — Inter, dark theme overrides
  index.html                            modified — d-flex sidebar layout
  analytics/index.html                  modified
  users/index.html                      modified
  orders/index.html                     modified
  settings/index.html                   modified

pages/boutique-brand/
  custom.css                            NEW — Cormorant Garamond, luxury overrides
  index.html                            modified — navbar fixed-top, scroll JS
  story/index.html                      modified
  collections/index.html               modified
  works/index.html                      modified
  contact/index.html                   modified

pages/space-scifi/
  custom.css                            NEW — dark space palette, neon glow effects
  index.html                            modified — navbar-dark overrides
  missions/index.html                   modified
  fleet/index.html                      modified
  telemetry/index.html                  modified
  signal/index.html                     modified
```

---

## Shared Bootstrap Head Pattern

Every page uses this exact `<head>` structure (adjust `custom.css` path depth):

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Google Fonts (per-demo) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
<!-- Brand overrides -->
<link rel="stylesheet" href="custom.css">        <!-- or ../custom.css for subpages -->
<!-- Bootstrap JS bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

Bootstrap JS goes at the **end of `<body>`**, not in `<head>`.

---

## Bootstrap Class Reference Card

| Purpose | Bootstrap classes |
|---|---|
| Page wrapper | `container`, `container-fluid` |
| Responsive grid | `row`, `col-12`, `col-md-6`, `col-lg-4` |
| Flex utilities | `d-flex`, `flex-grow-1`, `flex-shrink-0`, `align-items-center`, `justify-content-between` |
| Spacing | `p-3`, `px-4`, `py-5`, `mb-3`, `mt-4`, `gap-2` |
| Navbar | `navbar navbar-expand-lg`, `navbar-brand`, `navbar-toggler`, `collapse navbar-collapse`, `nav navbar-nav`, `nav-link` |
| Cards | `card`, `card-body`, `card-title`, `card-text`, `card-img-top`, `h-100` |
| Buttons | `btn btn-dark`, `btn btn-outline-dark`, `btn btn-sm` |
| Badges | `badge`, `rounded-pill` |
| Tables | `table`, `table-hover`, `table-striped`, `table-responsive` |
| Forms | `form-control`, `form-label`, `form-select`, `mb-3` |
| Filter tabs | `nav nav-pills`, `nav-item`, `nav-link active` |
| Progress | `progress`, `progress-bar` |
| Display | `d-none`, `d-md-block`, `d-lg-flex` |
| Text | `text-muted`, `fw-bold`, `fs-6`, `text-uppercase`, `small` |
| Colors | `bg-dark`, `text-white`, `bg-body-secondary` |

---

## Task 1 — Root index.html + css/style.css + js/main.js

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/main.js`

- [ ] **Step 1: Update index.html `<head>`**

Replace existing `<head>` link tags with Bootstrap CDN pattern. Keep DM Serif Display + Inter Google Fonts. Keep `css/style.css` link (after Bootstrap).

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DesignVault — 網頁設計作品集</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Rewrite index.html `<body>` with Bootstrap structure**

```html
<body>
  <header class="dv-header border-bottom py-4">
    <div class="container d-flex align-items-center justify-content-between">
      <a href="/" class="logo">DesignVault</a>
      <span class="small text-muted">精選網頁設計作品展示</span>
    </div>
  </header>

  <main>
    <section class="dv-hero py-5">
      <div class="container">
        <h1 class="dv-hero-title mb-3">探索網頁設計<br><em>的各種可能性</em></h1>
        <p class="small text-muted">四種不同情境，四種獨特風格</p>
      </div>
    </section>

    <section class="dv-projects pb-5">
      <div class="container">
        <div class="row g-0 border" id="projects-grid">

          <div class="col-12 col-md-6 dv-card border-end border-bottom" data-demo="fashion-ecommerce">
            <div class="dv-preview overflow-hidden position-relative">
              <iframe src="pages/fashion-ecommerce/index.html" loading="lazy"
                      scrolling="no" tabindex="-1" aria-hidden="true"
                      class="dv-frame"></iframe>
            </div>
            <div class="p-4 d-flex flex-column">
              <p class="text-uppercase small text-muted mb-2" style="letter-spacing:1.2px;">電商</p>
              <h3 class="fs-6 fw-normal mb-1">時尚電商首頁</h3>
              <p class="small text-muted mb-4">明亮現代風格，大圖視覺與流暢購物體驗</p>
              <div class="d-flex gap-2 mt-auto">
                <a href="pages/fashion-ecommerce/index.html" class="btn btn-outline-dark btn-sm flex-fill">前往範例</a>
                <button class="btn btn-dark btn-sm flex-fill btn-dl" onclick="downloadTemplate('fashion-ecommerce')">下載模板</button>
              </div>
            </div>
          </div>

          <!-- repeat pattern for saas-dashboard, boutique-brand, space-scifi -->
          <!-- saas: col-12 col-md-6 dv-card border-bottom, data-demo="saas-dashboard" -->
          <!-- boutique: col-12 col-md-6 dv-card border-end, data-demo="boutique-brand" -->
          <!-- space: col-12 col-md-6 dv-card, data-demo="space-scifi" -->

        </div>
      </div>
    </section>
  </main>

  <footer class="border-top py-3">
    <div class="container d-flex justify-content-between small">
      <span>DesignVault</span>
      <span class="text-muted">© 2026 LinGaOscar</span>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
  <script src="js/main.js"></script>
</body>
```

Note: add `border-end` to the left card of each row, `border-bottom` to each card in the top row. Last row cards have no `border-bottom`.

- [ ] **Step 3: Rewrite css/style.css — keep only custom rules**

Remove all layout/grid/button CSS that Bootstrap now handles. Keep only brand-specific rules:

```css
/* Bootstrap overrides */
:root {
    --bs-body-font-family: 'Inter', -apple-system, sans-serif;
    --bs-body-font-weight: 300;
    --bs-border-color: #e8e8e8;
    --bs-border-radius: 0;
    --bs-border-radius-sm: 0;
    --bs-border-radius-lg: 0;
    --bs-btn-border-radius: 0;
}

/* Logo */
.logo {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    text-decoration: none;
    color: inherit;
}

/* Hero */
.dv-hero { padding-top: 6rem; padding-bottom: 4rem; }
.dv-hero-title {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: clamp(1.875rem, 5vw, 4rem);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -1.5px;
}
.dv-hero-title em { font-style: italic; color: #c8c8c8; }

/* Card iframe preview */
.dv-preview { height: 280px; background: #f0f0f0; }
.dv-frame {
    position: absolute;
    top: 0; left: 0;
    width: 1280px; height: 900px;
    transform: scale(0.44);
    transform-origin: top left;
    border: none;
    pointer-events: none;
}

/* Responsive iframe scale */
@media (max-width: 768px) {
    .dv-preview { height: 220px; }
    .dv-frame { transform: scale(0.56); }
}
@media (max-width: 480px) {
    .dv-frame { transform: scale(0.34); }
}

/* Buttons */
.btn { letter-spacing: 0.8px; font-size: 0.7rem; padding: 10px 0; }
.btn-dl:disabled { opacity: 0.45; cursor: default; }
```

- [ ] **Step 4: Update js/main.js — add custom.css to DEMOS manifest**

Add `custom.css` as first entry in each demo's `files` array:

```js
'fashion-ecommerce': {
  folder: 'maison-noir-template',
  files: [
    ['pages/fashion-ecommerce/custom.css',            'custom.css'],
    ['pages/fashion-ecommerce/index.html',            'index.html'],
    ['pages/fashion-ecommerce/womens/index.html',     'womens/index.html'],
    ['pages/fashion-ecommerce/mens/index.html',       'mens/index.html'],
    ['pages/fashion-ecommerce/accessories/index.html','accessories/index.html'],
    ['pages/fashion-ecommerce/about/index.html',      'about/index.html'],
  ]
},
// repeat for saas-dashboard, boutique-brand, space-scifi
```

The `cleanHtml` function strips DesignVault nav. Bootstrap CDN URLs stay (they point to CDN, work without changes).

- [ ] **Step 5: Verify index page in browser**

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Check: 2×2 grid renders, iframe previews load, both buttons visible, responsive on mobile.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: migrate index page and support files to Bootstrap 5"
```

---

## Task 2 — fashion-ecommerce (MAISON NOIR)

**Files:**
- Create: `pages/fashion-ecommerce/custom.css`
- Modify: `pages/fashion-ecommerce/index.html` + 4 subpages

**Brand identity:** Warm palette `#faf8f5` bg, `#1a1a1a` text, `#c9a96e` gold accent. Fonts: Playfair Display (display) + Inter (body).

- [ ] **Step 1: Create pages/fashion-ecommerce/custom.css**

```css
/* === MAISON NOIR — Bootstrap Overrides === */
:root {
    --mn-bg: #faf8f5;
    --mn-text: #1a1a1a;
    --mn-gold: #c9a96e;
    --mn-border: #e8e0d5;
    --bs-body-bg: var(--mn-bg);
    --bs-body-color: var(--mn-text);
    --bs-border-color: var(--mn-border);
    --bs-border-radius: 0;
    --bs-border-radius-sm: 0;
    --bs-btn-border-radius: 0;
    --bs-nav-pills-border-radius: 0;
    --bs-body-font-family: 'Inter', sans-serif;
    --bs-body-font-weight: 300;
}

/* Navbar */
.navbar { border-bottom: 1px solid var(--mn-border); background: var(--mn-bg) !important; }
.navbar-brand { font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; letter-spacing: 2px; text-transform: uppercase; }
.nav-link { font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; color: var(--mn-text) !important; }
.nav-link:hover { color: var(--mn-gold) !important; }

/* DesignVault back bar */
.dv-bar { background: #f5f2ee; padding: 8px 0; font-size: 0.7rem; }
.dv-bar a { color: #999; text-decoration: none; letter-spacing: 0.5px; }

/* Back to demo link */
.back-bar { background: var(--mn-bg); padding: 10px 0; border-bottom: 1px solid var(--mn-border); font-size: 0.75rem; }
.back-bar a { color: #999; text-decoration: none; }

/* Hero */
.mn-hero { background: #f5f0ea; min-height: 80vh; display: flex; align-items: center; }
.mn-hero-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 400; line-height: 1.1; }
.mn-hero-img { background: #e8dfd4; display: flex; align-items: center; justify-content: center; min-height: 400px; font-family: 'Playfair Display', serif; font-size: 8rem; color: rgba(0,0,0,0.08); }

/* Section headings */
.section-tag { font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; color: var(--mn-gold); }

/* Product cards */
.product-card { background: var(--mn-bg); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.product-img { background: #ece4d9; aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
.product-name { font-size: 0.875rem; letter-spacing: 0.5px; }
.product-price { color: var(--mn-gold); font-size: 0.875rem; }

/* Buttons */
.btn-mn { background: var(--mn-text); color: #fff; border: none; border-radius: 0; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; padding: 12px 32px; }
.btn-mn:hover { background: var(--mn-gold); color: #fff; }
.btn-mn-outline { background: transparent; color: var(--mn-text); border: 1px solid var(--mn-text); border-radius: 0; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; padding: 12px 32px; }
.btn-mn-outline:hover { background: var(--mn-text); color: #fff; }

/* Nav pills filter */
.nav-pills .nav-link { color: var(--mn-text); background: transparent; border-bottom: 2px solid transparent; padding: 8px 16px; }
.nav-pills .nav-link.active { background: transparent; border-bottom-color: var(--mn-gold); color: var(--mn-gold); }

/* Footer */
.mn-footer { background: var(--mn-text); color: #fff; }
.mn-footer a { color: rgba(255,255,255,0.6); font-size: 0.8rem; text-decoration: none; }
.mn-footer a:hover { color: #fff; }
```

- [ ] **Step 2: Rewrite pages/fashion-ecommerce/index.html with Bootstrap**

Read existing file first. Replace structure using these patterns:

**Navbar:**
```html
<nav class="navbar navbar-expand-lg sticky-top">
  <div class="container">
    <a class="navbar-brand" href="./">MAISON NOIR</a>
    <button class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#mnNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mnNav">
      <ul class="navbar-nav ms-auto gap-2">
        <li class="nav-item"><a class="nav-link" href="./">首頁</a></li>
        <li class="nav-item"><a class="nav-link" href="womens/">女性</a></li>
        <li class="nav-item"><a class="nav-link" href="mens/">男性</a></li>
        <li class="nav-item"><a class="nav-link" href="accessories/">配件</a></li>
        <li class="nav-item"><a class="nav-link" href="about/">關於</a></li>
      </ul>
    </div>
  </div>
</nav>
```

**Categories grid:**
```html
<section class="py-5">
  <div class="container">
    <div class="row g-3">
      <div class="col-12 col-md-4">
        <a href="womens/" class="d-block text-decoration-none">
          <div class="product-img mb-3">👗</div>
          <p class="product-name text-uppercase">女裝</p>
          <p class="small text-muted">128 件商品</p>
        </a>
      </div>
      <!-- repeat for 男裝, 配件 -->
    </div>
  </div>
</section>
```

**Featured products:**
```html
<section class="py-5">
  <div class="container">
    <div class="row row-cols-2 row-cols-md-4 g-4">
      <div class="col">
        <div class="product-card">
          <div class="product-img">M</div>
          <div class="mt-3">
            <p class="product-name mb-1">修身西裝外套</p>
            <p class="product-price mb-0">NT$ 8,800</p>
          </div>
        </div>
      </div>
      <!-- repeat x8 -->
    </div>
  </div>
</section>
```

Keep DesignVault back bar (`.dv-bar`) at top of body.

- [ ] **Step 3: Rewrite womens/index.html**

Same navbar as homepage (nav links point to `../womens/`, `../mens/`, etc.).
Add `.back-bar` with link to `../index.html`.

Filter bar using Bootstrap nav-pills:
```html
<ul class="nav nav-pills mb-4">
  <li class="nav-item"><a class="nav-link active" href="#">全部</a></li>
  <li class="nav-item"><a class="nav-link" href="#">新品</a></li>
  <li class="nav-item"><a class="nav-link" href="#">上衣</a></li>
  <li class="nav-item"><a class="nav-link" href="#">下身</a></li>
  <li class="nav-item"><a class="nav-link" href="#">洋裝</a></li>
  <li class="nav-item"><a class="nav-link" href="#">外套</a></li>
</ul>
```

Product grid: `row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4` with 10 product cards.

- [ ] **Step 4: Rewrite mens/index.html** — same pattern as womens, different filter items (上衣/下身/外套/休閒)

- [ ] **Step 5: Rewrite accessories/index.html** — nav-tabs for 包袋/帽子/珠寶/鞋履, 12 product cards

- [ ] **Step 6: Rewrite about/index.html** — Bootstrap text columns, no grid needed, brand story prose

- [ ] **Step 7: Verify in browser**

```bash
python3 -m http.server 8080
# open http://localhost:8080/pages/fashion-ecommerce/
```

Check: sticky navbar, hamburger works on mobile, product grid RWD, nav-pills active state, back links work, DesignVault bar visible.

- [ ] **Step 8: Commit**

```bash
git add pages/fashion-ecommerce/
git commit -m "feat: migrate fashion-ecommerce to Bootstrap 5"
```

---

## Task 3 — saas-dashboard (NexusFlow Enterprise)

**Files:**
- Create: `pages/saas-dashboard/custom.css`
- Modify: `pages/saas-dashboard/index.html` + 4 subpages

**Brand identity:** Dark theme `#0d1117` bg, `#c9d1d9` text, `#58a6ff` blue accent. Font: Inter only.

- [ ] **Step 1: Create pages/saas-dashboard/custom.css**

```css
/* === NexusFlow Enterprise — Bootstrap Overrides === */
:root {
    --nf-bg: #0d1117;
    --nf-surface: #161b22;
    --nf-border: #30363d;
    --nf-text: #c9d1d9;
    --nf-text-muted: #8b949e;
    --nf-blue: #58a6ff;
    --nf-green: #3fb950;
    --nf-red: #f85149;
    --nf-yellow: #d29922;
    --bs-body-bg: var(--nf-bg);
    --bs-body-color: var(--nf-text);
    --bs-border-color: var(--nf-border);
    --bs-border-radius: 6px;
    --bs-card-bg: var(--nf-surface);
    --bs-body-font-family: 'Inter', sans-serif;
    --bs-body-font-weight: 300;
    --bs-table-bg: transparent;
    --bs-table-striped-bg: rgba(255,255,255,0.02);
    --bs-table-hover-bg: rgba(255,255,255,0.04);
    --bs-table-color: var(--nf-text);
    --bs-table-border-color: var(--nf-border);
}

/* Layout */
body { background: var(--nf-bg); color: var(--nf-text); }
.nf-layout { display: flex; min-height: 100vh; }

/* Sidebar */
.nf-sidebar {
    width: 240px;
    background: var(--nf-surface);
    border-right: 1px solid var(--nf-border);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    position: fixed;
    top: 0; bottom: 0; left: 0;
    overflow-y: auto;
    z-index: 100;
    transition: transform 0.3s;
}
.nf-sidebar.collapsed { transform: translateX(-100%); }
.nf-main { margin-left: 240px; flex: 1; min-height: 100vh; display: flex; flex-direction: column; }

/* DesignVault back */
.dv-back { display: block; padding: 8px 16px; font-size: 0.7rem; color: var(--nf-text-muted); text-decoration: none; border-bottom: 1px solid var(--nf-border); margin-bottom: 8px; }
.dv-back:hover { color: var(--nf-text); }

.sidebar-logo { padding: 4px 20px 16px; font-size: 1rem; font-weight: 500; color: var(--nf-blue); letter-spacing: 1px; }
.nav-group-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--nf-text-muted); padding: 16px 20px 6px; }
.sidebar .nav-link { color: var(--nf-text-muted); font-size: 0.85rem; padding: 8px 20px; border-radius: 0; display: flex; align-items: center; gap: 10px; }
.sidebar .nav-link:hover, .sidebar .nav-link.active { color: var(--nf-text); background: rgba(88,166,255,0.1); }

/* Topbar */
.nf-topbar { background: var(--nf-surface); border-bottom: 1px solid var(--nf-border); padding: 12px 24px; position: sticky; top: 0; z-index: 50; }

/* Cards */
.card { background: var(--nf-surface); border: 1px solid var(--nf-border); border-radius: 6px; }
.stat-value { font-size: 1.75rem; font-weight: 600; color: var(--nf-text); }
.stat-change-up { color: var(--nf-green); font-size: 0.8rem; }
.stat-change-down { color: var(--nf-red); font-size: 0.8rem; }

/* Badges */
.badge-active { background: rgba(63,185,80,0.15); color: var(--nf-green); }
.badge-inactive { background: rgba(139,148,158,0.15); color: var(--nf-text-muted); }
.badge-pending { background: rgba(210,153,34,0.15); color: var(--nf-yellow); }
.badge-critical { background: rgba(248,81,73,0.15); color: var(--nf-red); }

/* Tables */
.table th { color: var(--nf-text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 400; border-color: var(--nf-border); }
.table td { font-size: 0.875rem; vertical-align: middle; border-color: var(--nf-border); }

/* Buttons */
.btn-nf { background: var(--nf-blue); color: #fff; border: none; font-size: 0.8rem; padding: 8px 16px; border-radius: 6px; }
.btn-nf:hover { background: #4895e0; color: #fff; }
.btn-nf-outline { background: transparent; border: 1px solid var(--nf-border); color: var(--nf-text); font-size: 0.8rem; padding: 8px 16px; border-radius: 6px; }
.btn-nf-outline:hover { border-color: var(--nf-blue); color: var(--nf-blue); }

/* Form controls */
.form-control, .form-select { background: var(--nf-bg); border-color: var(--nf-border); color: var(--nf-text); border-radius: 6px; font-size: 0.875rem; }
.form-control:focus, .form-select:focus { background: var(--nf-bg); border-color: var(--nf-blue); color: var(--nf-text); box-shadow: 0 0 0 3px rgba(88,166,255,0.15); }
.form-label { font-size: 0.8rem; color: var(--nf-text-muted); margin-bottom: 4px; }

/* Progress bars */
.progress { background: var(--nf-border); height: 6px; border-radius: 3px; }
.progress-bar { background: var(--nf-blue); border-radius: 3px; }

/* Mobile sidebar */
@media (max-width: 768px) {
    .nf-sidebar { transform: translateX(-100%); }
    .nf-sidebar.open { transform: translateX(0); }
    .nf-main { margin-left: 0; }
}
```

- [ ] **Step 2: Rewrite pages/saas-dashboard/index.html**

Page structure:
```html
<body>
  <div class="nf-layout">
    <aside class="nf-sidebar" id="sidebar">
      <a href="../../index.html" class="dv-back">← DesignVault</a>
      <div class="sidebar-logo">NexusFlow</div>
      <p class="nav-group-title">主頁</p>
      <nav class="nav flex-column">
        <a class="nav-link active" href="./">📊 儀表板</a>
        <a class="nav-link" href="analytics/">📈 分析</a>
      </nav>
      <p class="nav-group-title">管理</p>
      <nav class="nav flex-column">
        <a class="nav-link" href="users/">👥 用戶</a>
        <a class="nav-link" href="orders/">📦 訂單</a>
      </nav>
      <p class="nav-group-title">系統</p>
      <nav class="nav flex-column">
        <a class="nav-link" href="settings/">⚙️ 設定</a>
      </nav>
    </aside>

    <main class="nf-main">
      <header class="nf-topbar d-flex align-items-center justify-content-between">
        <button class="btn p-0 border-0 text-white d-md-none" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
        <div class="d-flex align-items-center gap-3 ms-auto">
          <input type="search" class="form-control form-control-sm" placeholder="搜尋..." style="width:200px;">
          <span>🔔</span>
          <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style="width:32px;height:32px;font-size:0.75rem;">JD</div>
        </div>
      </header>

      <div class="p-4">
        <!-- Stats row -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
          <div class="col">
            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <p class="small text-muted mb-0">總營收</p>
                <span>💰</span>
              </div>
              <p class="stat-value mb-1">NT$2.4M</p>
              <p class="stat-change-up mb-0">↑ 12.5% vs 上月</p>
            </div>
          </div>
          <!-- repeat for 3 more stats -->
        </div>

        <!-- Orders table -->
        <div class="card">
          <div class="card-body">
            <h6 class="mb-3">最近訂單</h6>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>訂單號</th><th>客戶</th><th>金額</th><th>狀態</th><th>日期</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 8 rows -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script>/* mobile sidebar toggle */</script>
</body>
```

- [ ] **Step 3: Rewrite analytics/index.html** — same sidebar, different main content (date picker, CSS bar charts, traffic table)

- [ ] **Step 4: Rewrite users/index.html** — search bar + filter dropdowns, `table table-hover` with 10 user rows, status badges

- [ ] **Step 5: Rewrite orders/index.html** — 4 stat cards row, orders table with 12 rows

- [ ] **Step 6: Rewrite settings/index.html** — Bootstrap tabs (`nav nav-tabs`), form groups, danger zone section

- [ ] **Step 7: Verify in browser**

```bash
python3 -m http.server 8080
# open http://localhost:8080/pages/saas-dashboard/
```

Check: sidebar fixed, collapses on mobile, topbar sticky, tables render, nav active states.

- [ ] **Step 8: Commit**

```bash
git add pages/saas-dashboard/
git commit -m "feat: migrate saas-dashboard to Bootstrap 5"
```

---

## Task 4 — boutique-brand (AURÈLE)

**Files:**
- Create: `pages/boutique-brand/custom.css`
- Modify: `pages/boutique-brand/index.html` + 4 subpages

**Brand identity:** Off-white `#faf9f7` bg, `#1a1a1a` text, muted gold `#b8a898` accent. Fonts: Cormorant Garamond (display) + Inter (body).

- [ ] **Step 1: Create pages/boutique-brand/custom.css**

```css
/* === AURÈLE — Bootstrap Overrides === */
:root {
    --au-bg: #faf9f7;
    --au-text: #1a1a1a;
    --au-muted: #888;
    --au-gold: #b8a898;
    --au-border: rgba(0,0,0,0.08);
    --bs-body-bg: var(--au-bg);
    --bs-body-color: var(--au-text);
    --bs-border-color: var(--au-border);
    --bs-border-radius: 0;
    --bs-btn-border-radius: 0;
    --bs-body-font-family: 'Inter', sans-serif;
    --bs-body-font-weight: 300;
}

/* DesignVault back link */
.designvault-link {
    position: fixed; top: 12px; left: 16px; z-index: 1100;
    font-size: 0.65rem; letter-spacing: 0.5px; color: #bbb;
    text-decoration: none; font-weight: 300;
}
.designvault-link:hover { color: var(--au-text); }

/* Back to demo */
.back-link { font-size: 0.75rem; color: var(--au-muted); text-decoration: none; letter-spacing: 0.5px; }

/* Navbar */
.navbar { background: transparent !important; transition: background 0.3s; }
.navbar.scrolled { background: rgba(250,249,247,0.95) !important; backdrop-filter: blur(8px); border-bottom: 1px solid var(--au-border); }
.navbar-brand { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 400; letter-spacing: 4px; text-transform: uppercase; }
.nav-link { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--au-text) !important; }

/* Hero */
.au-hero { min-height: 100vh; background: var(--au-bg); display: flex; align-items: center; }
.au-hero-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(3rem, 8vw, 7rem); font-weight: 300; line-height: 1.0; letter-spacing: -1px; }
.au-hero-title em { font-style: italic; }
.au-hero-img { background: #ede9e3; min-height: 60vh; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 10rem; color: rgba(0,0,0,0.06); }

/* Section headings */
.section-tag { font-size: 0.6rem; letter-spacing: 3px; text-transform: uppercase; color: var(--au-gold); }
.section-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; }

/* Collection cards */
.collection-card { overflow: hidden; }
.collection-img { aspect-ratio: 3/4; background: #ede9e3; display: flex; align-items: center; justify-content: center; font-size: 3rem; transition: transform 0.4s; }
.collection-card:hover .collection-img { transform: scale(1.04); }

/* Product cards */
.au-product-img { aspect-ratio: 3/4; background: #edeae4; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
.au-product-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1rem; letter-spacing: 1px; }

/* Buttons */
.btn-au { background: var(--au-text); color: #fff; border: none; border-radius: 0; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; padding: 14px 32px; }
.btn-au:hover { background: var(--au-gold); color: #fff; }
.btn-au-outline { background: transparent; border: 1px solid var(--au-text); color: var(--au-text); border-radius: 0; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; padding: 14px 32px; }

/* Philosophy quote */
.philosophy { border-top: 1px solid var(--au-border); border-bottom: 1px solid var(--au-border); padding: 48px 0; }
.philosophy-quote { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 300; font-style: italic; line-height: 1.6; }

/* Footer */
.au-footer { background: #1a1a1a; color: rgba(255,255,255,0.6); }
.au-footer a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.75rem; letter-spacing: 1px; }
.au-footer a:hover { color: #fff; }

/* Forms */
.au-input { background: transparent; border: none; border-bottom: 1px solid var(--au-border); border-radius: 0; padding: 12px 0; font-size: 0.875rem; }
.au-input:focus { box-shadow: none; border-bottom-color: var(--au-text); background: transparent; }

/* Scroll JS target */
```

Navbar scroll effect JS (add to bottom of each page's `<body>`):
```js
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});
```

- [ ] **Step 2: Rewrite pages/boutique-brand/index.html**

Use Bootstrap `navbar fixed-top navbar-expand-lg`. Hero with `row g-0` split. Collections with `row row-cols-1 row-cols-md-3 g-4`.

- [ ] **Step 3: Rewrite story/index.html** — long-form prose with Bootstrap `col-lg-8 mx-auto` for reading width, timeline with Bootstrap utilities

- [ ] **Step 4: Rewrite collections/index.html** — `row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4` collection grid

- [ ] **Step 5: Rewrite works/index.html** — CSS columns masonry (`column-count: 3` in custom.css), Bootstrap filter buttons

- [ ] **Step 6: Rewrite contact/index.html** — Bootstrap form with `.au-input` class override, two-column layout `row g-5`

- [ ] **Step 7: Verify in browser**

```bash
python3 -m http.server 8080
# open http://localhost:8080/pages/boutique-brand/
```

Check: fixed navbar background transition on scroll, hero full-height, hover zoom on collections, form styling, mobile menu.

- [ ] **Step 8: Commit**

```bash
git add pages/boutique-brand/
git commit -m "feat: migrate boutique-brand to Bootstrap 5"
```

---

## Task 5 — space-scifi (NEXUS VOID)

**Files:**
- Create: `pages/space-scifi/custom.css`
- Modify: `pages/space-scifi/index.html` + 4 subpages

**Brand identity:** Space dark `#060b14` bg, `#e0e8f0` text, `#00d4ff` cyan accent, neon glow effects. Font: monospace system font or custom.

- [ ] **Step 1: Create pages/space-scifi/custom.css**

```css
/* === NEXUS VOID — Bootstrap Overrides === */
:root {
    --nv-bg: #060b14;
    --nv-surface: #0d1829;
    --nv-border: rgba(0,212,255,0.15);
    --nv-text: #e0e8f0;
    --nv-muted: #6a8099;
    --nv-cyan: #00d4ff;
    --nv-green: #00ff88;
    --nv-red: #ff4757;
    --nv-yellow: #ffd32a;
    --bs-body-bg: var(--nv-bg);
    --bs-body-color: var(--nv-text);
    --bs-border-color: var(--nv-border);
    --bs-border-radius: 4px;
    --bs-card-bg: var(--nv-surface);
    --bs-body-font-family: 'Courier New', 'Consolas', monospace;
    --bs-table-bg: transparent;
    --bs-table-color: var(--nv-text);
    --bs-table-border-color: var(--nv-border);
}

body { background: var(--nv-bg); color: var(--nv-text); }

/* DesignVault back link */
.designvault-back {
    position: fixed; top: 12px; left: 12px; z-index: 1100;
    font-size: 0.65rem; color: var(--nv-muted); text-decoration: none;
    letter-spacing: 1px; font-family: monospace;
    padding: 4px 8px; border: 1px solid rgba(0,212,255,0.2);
}
.designvault-back:hover { color: var(--nv-cyan); border-color: var(--nv-cyan); }

/* Navbar */
.navbar { background: rgba(6,11,20,0.95) !important; border-bottom: 1px solid var(--nv-border); backdrop-filter: blur(8px); }
.navbar-brand { font-size: 1.1rem; letter-spacing: 3px; text-transform: uppercase; color: var(--nv-cyan) !important; text-shadow: 0 0 10px rgba(0,212,255,0.5); }
.nav-link { color: var(--nv-muted) !important; font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; }
.nav-link:hover, .nav-link.active { color: var(--nv-cyan) !important; }

/* Cards */
.card { background: var(--nv-surface); border: 1px solid var(--nv-border); }
.card:hover { border-color: rgba(0,212,255,0.4); }

/* Badges */
.badge-active-nv { background: rgba(0,255,136,0.15); color: var(--nv-green); }
.badge-standby { background: rgba(0,212,255,0.15); color: var(--nv-cyan); }
.badge-critical { background: rgba(255,71,87,0.15); color: var(--nv-red); }
.badge-warn { background: rgba(255,211,42,0.15); color: var(--nv-yellow); }

/* Tables */
.table th { color: var(--nv-muted); font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; border-color: var(--nv-border); }
.table td { font-size: 0.85rem; border-color: var(--nv-border); vertical-align: middle; }

/* Hero */
.nv-hero { min-height: 100vh; position: relative; display: flex; align-items: center; overflow: hidden; }
.nv-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.08) 0%, transparent 60%); pointer-events: none; }
.nv-hero-title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; letter-spacing: -1px; color: #fff; }
.nv-hero-title .line2 { color: var(--nv-cyan); text-shadow: 0 0 30px rgba(0,212,255,0.6); }

/* Glowing elements */
.glow-cyan { text-shadow: 0 0 10px rgba(0,212,255,0.8); color: var(--nv-cyan); }
.border-glow { border-color: var(--nv-cyan) !important; box-shadow: 0 0 8px rgba(0,212,255,0.2); }

/* Buttons */
.btn-nv { background: var(--nv-cyan); color: var(--nv-bg); border: none; font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 28px; border-radius: 4px; }
.btn-nv:hover { background: #00bbdd; box-shadow: 0 0 20px rgba(0,212,255,0.4); color: var(--nv-bg); }
.btn-nv-outline { background: transparent; border: 1px solid var(--nv-cyan); color: var(--nv-cyan); font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 28px; border-radius: 4px; }
.btn-nv-outline:hover { background: rgba(0,212,255,0.1); }

/* Progress bars */
.progress { background: rgba(0,212,255,0.1); height: 4px; border-radius: 2px; }
.progress-bar { background: var(--nv-cyan); border-radius: 2px; }
.progress-bar.critical { background: var(--nv-red); }

/* Forms */
.form-control, .form-select { background: rgba(255,255,255,0.04); border-color: var(--nv-border); color: var(--nv-text); border-radius: 4px; }
.form-control:focus, .form-select:focus { background: rgba(255,255,255,0.06); border-color: var(--nv-cyan); color: var(--nv-text); box-shadow: 0 0 0 3px rgba(0,212,255,0.15); }

/* Pulse animation for live indicators */
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--nv-green); animation: pulse 2s infinite; display: inline-block; }

/* Waveform animation */
@keyframes wave { 0%,100% { height: 4px; } 50% { height: 20px; } }
.wave-bar { width: 3px; background: var(--nv-cyan); border-radius: 2px; animation: wave 1s ease-in-out infinite; display: inline-block; margin: 0 1px; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; }
```

- [ ] **Step 2: Rewrite pages/space-scifi/index.html** — `navbar navbar-dark navbar-expand-lg`, full-height hero, mission cards, fleet table, telemetry grid, signal section

- [ ] **Step 3: Rewrite missions/index.html** — mission list with Bootstrap `list-group` styled dark, progress bars, status badges

- [ ] **Step 4: Rewrite fleet/index.html** — fleet stats row, filter tabs, `table table-hover` with 10 ships, progress bars for fuel%

- [ ] **Step 5: Rewrite telemetry/index.html** — sensor grid `row row-cols-2 row-cols-md-3 g-3`, wave animations, anomaly alert list

- [ ] **Step 6: Rewrite signal/index.html** — Bootstrap tabs for channels, message list, compose form

- [ ] **Step 7: Verify in browser**

```bash
python3 -m http.server 8080
# open http://localhost:8080/pages/space-scifi/
```

Check: dark theme, cyan glow effects, wave animations, mobile navbar, tables render correctly.

- [ ] **Step 8: Commit**

```bash
git add pages/space-scifi/
git commit -m "feat: migrate space-scifi to Bootstrap 5"
```

---

## Task 6 — Update CLAUDE.md

- [ ] **Step 1: Update architecture section**

Pages are no longer fully self-contained. Each demo has a shared `custom.css`. Add note that Bootstrap 5.3 CDN is required for all pages.

- [ ] **Step 2: Update "Adding a New Design Page" section**

New checklist item: create `pages/<slug>/custom.css` with brand overrides.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Bootstrap architecture"
```

---

## Parallel Execution Note

Tasks 2–5 (one per demo) are fully independent — no shared files. They can be dispatched as parallel agents simultaneously for faster completion. Task 1 (root files) and Task 6 (CLAUDE.md) should run sequentially (Task 1 first, Task 6 last).

Recommended order:
1. Task 1 (root files) — sequential
2. Tasks 2, 3, 4, 5 (four demos) — parallel agents
3. Task 6 (CLAUDE.md) — sequential after all demos complete
