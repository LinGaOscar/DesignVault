# API Guide Toolbar Design

## Goal

Add a fixed bottom toolbar to each demo template so developers who download a template can immediately see which API endpoints the page's UI components require.

## Architecture

Each demo gets one `api-guide.js` in its root directory. This file is responsible for:
1. Injecting all toolbar DOM and scoped inline styles (no dependency on the demo's `custom.css`)
2. Reading `window.API_ENDPOINTS` declared by the host page
3. Rendering the collapsed bar and toggling the expanded panel on click

Each participating HTML page declares its endpoints before loading the script:

```html
<!-- homepage -->
<script>
window.API_ENDPOINTS = [
  { method: 'GET', path: '/api/products/featured' },
  { method: 'GET', path: '/api/categories' },
];
</script>
<script src="api-guide.js"></script>

<!-- subpage (one level deeper) -->
<script>
window.API_ENDPOINTS = [
  { method: 'GET', path: '/api/users' },
];
</script>
<script src="../api-guide.js"></script>
```

Pages that are purely static content (no data fetching) do not include the toolbar.

---

## Toolbar UI

### Collapsed state (default)

A full-width fixed bar at the bottom of the viewport, height ~40px.

```
┌──────────────────────────────────────────────────────────┐
│  🔌  API 對接點 (3)                                    ▲  │
└──────────────────────────────────────────────────────────┘
```

### Expanded state (after click)

Panel slides upward from the bar, listing each endpoint as one row.

```
┌──────────────────────────────────────────────────────────┐
│  GET     /api/dashboard/stats                            │
│  GET     /api/orders/recent                              │
│  PATCH   /api/orders/:id/status                          │
├──────────────────────────────────────────────────────────┤
│  🔌  API 對接點 (3)                                    ▼  │
└──────────────────────────────────────────────────────────┘
```

Click the bar again to collapse.

### Visual style

| Property | Value |
|---|---|
| Background | `#1e293b` (neutral dark, works across all demo themes) |
| Text | `#f1f5f9` |
| `GET` badge | `#22c55e` (green) |
| `POST` badge | `#3b82f6` (blue) |
| `PATCH` badge | `#f97316` (orange) |
| `DELETE` badge | `#ef4444` (red) |
| z-index | `9999` |
| Font | `'Courier New', monospace` (neutral, doesn't inherit demo font) |

---

## Files Changed

### New files (5)

| File | Purpose |
|---|---|
| `pages/saas-dashboard/api-guide.js` | Toolbar for SaaS Dashboard demo |
| `pages/fashion-ecommerce/api-guide.js` | Toolbar for Fashion E-Commerce demo |
| `pages/boutique-brand/api-guide.js` | Toolbar for Boutique Brand demo |
| `pages/space-scifi/api-guide.js` | Toolbar for ORBITAL demo |
| `pages/quill-landing/api-guide.js` | Toolbar for Quill Landing demo |

All five files are identical in logic — only the file path differs for `src` resolution. A single source of truth is maintained by keeping the implementation simple enough to copy without abstraction overhead.

### Modified HTML pages (13)

**SaaS Dashboard** (3 pages)

| Page | Endpoints |
|---|---|
| `index.html` | `GET /api/dashboard/stats`, `GET /api/orders/recent` |
| `users/index.html` | `GET /api/users`, `PATCH /api/users/:id`, `DELETE /api/users/:id` |
| `orders/index.html` | `GET /api/orders`, `PATCH /api/orders/:id/status` |

**Fashion E-Commerce** (2 pages)

| Page | Endpoints |
|---|---|
| `index.html` | `GET /api/products/featured`, `GET /api/categories` |
| `womens/index.html` | `GET /api/products?category=womens` |

**Boutique Brand** (3 pages)

| Page | Endpoints |
|---|---|
| `index.html` | `GET /api/works/featured` |
| `works/index.html` | `GET /api/works` |
| `contact/index.html` | `POST /api/contact` |

**ORBITAL** (3 pages)

| Page | Endpoints |
|---|---|
| `index.html` | `GET /api/rooms/featured`, `GET /api/experiences/featured` |
| `rooms/index.html` | `GET /api/rooms` |
| `book/index.html` | `GET /api/rooms`, `POST /api/bookings` |

**Quill Landing** (2 pages)

| Page | Endpoints |
|---|---|
| `index.html` | `GET /api/stats` |
| `pricing/index.html` | `GET /api/plans` |

---

## api-guide.js Implementation Contract

The script must:

1. **Be self-contained** — inject its own `<style>` block with a unique prefix (`.ag-`) to avoid collision with any demo CSS
2. **Read `window.API_ENDPOINTS`** — array of `{ method: string, path: string }` objects, declared by the host page before this script loads
3. **Render collapsed bar on DOMContentLoaded** — bar is always visible; count badge shows total number of endpoints
4. **Toggle on bar click** — expanded panel slides up; chevron rotates; second click collapses
5. **No external dependencies** — pure vanilla JS, no fetch calls, no frameworks

### DOM structure (injected)

```html
<div class="ag-bar" id="ag-bar">
  <span class="ag-label">🔌 API 對接點 (<span id="ag-count">N</span>)</span>
  <span class="ag-chevron" id="ag-chevron">▲</span>
</div>
<div class="ag-panel" id="ag-panel">
  <!-- one .ag-row per endpoint -->
  <div class="ag-row">
    <span class="ag-method ag-get">GET</span>
    <span class="ag-path">/api/users</span>
  </div>
</div>
```

---

## What This Does NOT Do

- Does not make real API calls
- Does not highlight UI components when an endpoint is clicked
- Does not appear in the DesignVault index page iframes (toolbar is part of the demo pages, not the portfolio wrapper)
- Does not get stripped by `cleanHtml()` — the toolbar is intentionally kept in the downloaded ZIP so developers see it immediately
