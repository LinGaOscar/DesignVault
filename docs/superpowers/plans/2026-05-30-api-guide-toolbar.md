# API Guide Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed collapsible bottom toolbar to 13 HTML pages across all 5 demo templates, showing developers which API endpoints each page requires.

**Architecture:** Each demo root gets one `api-guide.js` (identical logic, scoped `.ag-*` CSS, no external deps). Each participating HTML page declares `window.API_ENDPOINTS = [...]` immediately before its `<script src="api-guide.js">` tag. Task 6 adds each `api-guide.js` to the ZIP download manifest in `js/main.js`.

**Tech Stack:** Vanilla JavaScript, inline `<style>` injection, Bootstrap 5.3.3 (already on page — no interaction needed), no build tools.

---

## File Map

**Create (5):**
- `pages/saas-dashboard/api-guide.js`
- `pages/fashion-ecommerce/api-guide.js`
- `pages/boutique-brand/api-guide.js`
- `pages/space-scifi/api-guide.js`
- `pages/quill-landing/api-guide.js`

**Modify (14):**
- `pages/saas-dashboard/index.html` (line 197)
- `pages/saas-dashboard/users/index.html` (line 247)
- `pages/saas-dashboard/orders/index.html` (line 150)
- `pages/fashion-ecommerce/index.html` (line 157)
- `pages/fashion-ecommerce/womens/index.html` (line 87)
- `pages/boutique-brand/index.html` (line 193)
- `pages/boutique-brand/works/index.html` (line 99)
- `pages/boutique-brand/contact/index.html` (line 88)
- `pages/space-scifi/index.html` (line 190)
- `pages/space-scifi/rooms/index.html` (line 116)
- `pages/space-scifi/book/index.html` (line 112)
- `pages/quill-landing/index.html` (line 260)
- `pages/quill-landing/pricing/index.html` (line 228)
- `js/main.js` (add `api-guide.js` to each demo's files array)

---

## Task 1: Create api-guide.js + wire SaaS Dashboard

**Files:**
- Create: `pages/saas-dashboard/api-guide.js`
- Modify: `pages/saas-dashboard/index.html`
- Modify: `pages/saas-dashboard/users/index.html`
- Modify: `pages/saas-dashboard/orders/index.html`

- [ ] **Step 1: Create `pages/saas-dashboard/api-guide.js`**

```javascript
(function () {
  var endpoints = window.API_ENDPOINTS || [];

  var style = document.createElement('style');
  style.textContent = [
    '.ag-bar{position:fixed;bottom:0;left:0;right:0;height:40px;background:#1e293b;color:#f1f5f9;display:flex;align-items:center;justify-content:space-between;padding:0 16px;cursor:pointer;z-index:9999;font-family:"Courier New",monospace;font-size:13px;user-select:none;border-top:1px solid #334155;}',
    '.ag-panel{position:fixed;bottom:40px;left:0;right:0;background:#1e293b;z-index:9998;display:none;max-height:240px;overflow-y:auto;border-top:1px solid #334155;}',
    '.ag-panel.ag-open{display:block;}',
    '.ag-row{display:flex;align-items:center;gap:12px;padding:8px 16px;border-bottom:1px solid #334155;font-family:"Courier New",monospace;font-size:13px;}',
    '.ag-method{display:inline-block;width:56px;text-align:center;padding:2px 6px;border-radius:4px;font-weight:700;font-size:11px;flex-shrink:0;}',
    '.ag-get{background:#166534;color:#22c55e;}',
    '.ag-post{background:#1e3a5f;color:#3b82f6;}',
    '.ag-patch{background:#7c2d12;color:#f97316;}',
    '.ag-delete{background:#7f1d1d;color:#ef4444;}',
    '.ag-path{color:#94a3b8;}',
    '.ag-chevron{font-size:10px;transition:transform 0.2s;}',
    '.ag-chevron.ag-flipped{transform:rotate(180deg);}'
  ].join('');
  document.head.appendChild(style);

  var panel = document.createElement('div');
  panel.className = 'ag-panel';
  endpoints.forEach(function (ep) {
    var row = document.createElement('div');
    row.className = 'ag-row';
    var m = ep.method.toLowerCase();
    row.innerHTML =
      '<span class="ag-method ag-' + m + '">' + ep.method + '</span>' +
      '<span class="ag-path">' + ep.path + '</span>';
    panel.appendChild(row);
  });

  var chevron = document.createElement('span');
  chevron.className = 'ag-chevron';
  chevron.textContent = '▲';

  var bar = document.createElement('div');
  bar.className = 'ag-bar';
  var label = document.createElement('span');
  label.textContent = '🔌 API 對接點 (' + endpoints.length + ')';
  bar.appendChild(label);
  bar.appendChild(chevron);

  bar.addEventListener('click', function () {
    var open = panel.classList.toggle('ag-open');
    chevron.classList.toggle('ag-flipped', open);
  });

  document.body.appendChild(panel);
  document.body.appendChild(bar);
}());
```

- [ ] **Step 2: Add endpoints to `pages/saas-dashboard/index.html`**

Use the Edit tool. Find this exact string at the end of the file:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/dashboard/stats' },
      { method: 'GET', path: '/api/orders/recent' },
    ];
    </script>
    <script src="api-guide.js"></script>
</body>
```

- [ ] **Step 3: Add endpoints to `pages/saas-dashboard/users/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET',    path: '/api/users' },
      { method: 'PATCH',  path: '/api/users/:id' },
      { method: 'DELETE', path: '/api/users/:id' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 4: Add endpoints to `pages/saas-dashboard/orders/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET',   path: '/api/orders' },
      { method: 'PATCH', path: '/api/orders/:id/status' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 5: Verify in browser**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/pages/saas-dashboard/` and confirm:
- Bottom bar shows `🔌 API 對接點 (2)`
- Click → panel expands upward with `GET /api/dashboard/stats` (green badge) and `GET /api/orders/recent` (green badge)
- Click again → collapses

Open `http://localhost:8080/pages/saas-dashboard/users/` and confirm:
- Bar shows `🔌 API 對接點 (3)`
- Panel shows GET (green), PATCH (orange), DELETE (red)

- [ ] **Step 6: Commit**

```bash
git add pages/saas-dashboard/api-guide.js pages/saas-dashboard/index.html pages/saas-dashboard/users/index.html pages/saas-dashboard/orders/index.html
git commit -m "feat: add API guide toolbar to saas-dashboard"
```

---

## Task 2: Copy api-guide.js + wire Fashion E-Commerce

**Files:**
- Create: `pages/fashion-ecommerce/api-guide.js`
- Modify: `pages/fashion-ecommerce/index.html`
- Modify: `pages/fashion-ecommerce/womens/index.html`

- [ ] **Step 1: Copy api-guide.js**

```bash
cp pages/saas-dashboard/api-guide.js pages/fashion-ecommerce/api-guide.js
```

- [ ] **Step 2: Add endpoints to `pages/fashion-ecommerce/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/products/featured' },
      { method: 'GET', path: '/api/categories' },
    ];
    </script>
    <script src="api-guide.js"></script>
</body>
```

- [ ] **Step 3: Add endpoints to `pages/fashion-ecommerce/womens/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/products?category=womens' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/pages/fashion-ecommerce/` and confirm:
- Bar shows `🔌 API 對接點 (2)`
- Panel shows `GET /api/products/featured` and `GET /api/categories` (both green)

Open `http://localhost:8080/pages/fashion-ecommerce/womens/` and confirm:
- Bar shows `🔌 API 對接點 (1)`
- Panel shows `GET /api/products?category=womens`

- [ ] **Step 5: Commit**

```bash
git add pages/fashion-ecommerce/api-guide.js pages/fashion-ecommerce/index.html pages/fashion-ecommerce/womens/index.html
git commit -m "feat: add API guide toolbar to fashion-ecommerce"
```

---

## Task 3: Copy api-guide.js + wire Boutique Brand

**Files:**
- Create: `pages/boutique-brand/api-guide.js`
- Modify: `pages/boutique-brand/index.html`
- Modify: `pages/boutique-brand/works/index.html`
- Modify: `pages/boutique-brand/contact/index.html`

- [ ] **Step 1: Copy api-guide.js**

```bash
cp pages/saas-dashboard/api-guide.js pages/boutique-brand/api-guide.js
```

- [ ] **Step 2: Add endpoints to `pages/boutique-brand/index.html`**

Find (the closing `</script>` + `</body>` at lines 193–194):

```
    </script>
</body>
```

Replace with:

```
    </script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/works/featured' },
    ];
    </script>
    <script src="api-guide.js"></script>
</body>
```

- [ ] **Step 3: Add endpoints to `pages/boutique-brand/works/index.html`**

The file ends with an inline scroll listener on line 99. Find:

```
    <script>window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50);});</script>
</body>
```

Replace with:

```
    <script>window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50);});</script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/works' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 4: Add endpoints to `pages/boutique-brand/contact/index.html`**

Find:

```
    <script>window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50);});</script>
</body>
```

Replace with:

```
    <script>window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50);});</script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'POST', path: '/api/contact' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 5: Verify in browser**

Open `http://localhost:8080/pages/boutique-brand/` and confirm:
- Bar shows `🔌 API 對接點 (1)`
- Panel shows `GET /api/works/featured` (green)

Open `http://localhost:8080/pages/boutique-brand/contact/` and confirm:
- Bar shows `🔌 API 對接點 (1)`
- Panel shows `POST /api/contact` (blue badge)

- [ ] **Step 6: Commit**

```bash
git add pages/boutique-brand/api-guide.js pages/boutique-brand/index.html pages/boutique-brand/works/index.html pages/boutique-brand/contact/index.html
git commit -m "feat: add API guide toolbar to boutique-brand"
```

---

## Task 4: Copy api-guide.js + wire ORBITAL

**Files:**
- Create: `pages/space-scifi/api-guide.js`
- Modify: `pages/space-scifi/index.html`
- Modify: `pages/space-scifi/rooms/index.html`
- Modify: `pages/space-scifi/book/index.html`

- [ ] **Step 1: Copy api-guide.js**

```bash
cp pages/saas-dashboard/api-guide.js pages/space-scifi/api-guide.js
```

- [ ] **Step 2: Add endpoints to `pages/space-scifi/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/rooms/featured' },
      { method: 'GET', path: '/api/experiences/featured' },
    ];
    </script>
    <script src="api-guide.js"></script>
</body>
```

- [ ] **Step 3: Add endpoints to `pages/space-scifi/rooms/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/rooms' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 4: Add endpoints to `pages/space-scifi/book/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET',  path: '/api/rooms' },
      { method: 'POST', path: '/api/bookings' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 5: Verify in browser**

Open `http://localhost:8080/pages/space-scifi/` and confirm:
- Bar shows `🔌 API 對接點 (2)`
- Panel shows `GET /api/rooms/featured` and `GET /api/experiences/featured` (both green)

Open `http://localhost:8080/pages/space-scifi/book/` and confirm:
- Bar shows `🔌 API 對接點 (2)`
- Panel shows `GET /api/rooms` (green) and `POST /api/bookings` (blue)

- [ ] **Step 6: Commit**

```bash
git add pages/space-scifi/api-guide.js pages/space-scifi/index.html pages/space-scifi/rooms/index.html pages/space-scifi/book/index.html
git commit -m "feat: add API guide toolbar to space-scifi (ORBITAL)"
```

---

## Task 5: Copy api-guide.js + wire Quill Landing

**Files:**
- Create: `pages/quill-landing/api-guide.js`
- Modify: `pages/quill-landing/index.html`
- Modify: `pages/quill-landing/pricing/index.html`

- [ ] **Step 1: Copy api-guide.js**

```bash
cp pages/saas-dashboard/api-guide.js pages/quill-landing/api-guide.js
```

- [ ] **Step 2: Add endpoints to `pages/quill-landing/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/stats' },
    ];
    </script>
    <script src="api-guide.js"></script>
</body>
```

- [ ] **Step 3: Add endpoints to `pages/quill-landing/pricing/index.html`**

Find:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

Replace with:

```
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    window.API_ENDPOINTS = [
      { method: 'GET', path: '/api/plans' },
    ];
    </script>
    <script src="../api-guide.js"></script>
</body>
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/pages/quill-landing/` and confirm:
- Bar shows `🔌 API 對接點 (1)`
- Panel shows `GET /api/stats` (green)

Open `http://localhost:8080/pages/quill-landing/pricing/` and confirm:
- Bar shows `🔌 API 對接點 (1)`
- Panel shows `GET /api/plans` (green)

- [ ] **Step 5: Commit**

```bash
git add pages/quill-landing/api-guide.js pages/quill-landing/index.html pages/quill-landing/pricing/index.html
git commit -m "feat: add API guide toolbar to quill-landing"
```

---

## Task 6: Update js/main.js to include api-guide.js in ZIP downloads

**Files:**
- Modify: `js/main.js`
- Modify: `index.html` (cache-bust version string)

Add `api-guide.js` as the second entry in each demo's `files` array, immediately after `custom.css`.

- [ ] **Step 1: Update `fashion-ecommerce` entry in `js/main.js`**

Find:

```javascript
  'fashion-ecommerce': {
    folder: 'maison-noir-template',
    files: [
      ['pages/fashion-ecommerce/custom.css',            'custom.css'],
```

Replace with:

```javascript
  'fashion-ecommerce': {
    folder: 'maison-noir-template',
    files: [
      ['pages/fashion-ecommerce/custom.css',            'custom.css'],
      ['pages/fashion-ecommerce/api-guide.js',          'api-guide.js'],
```

- [ ] **Step 2: Update `saas-dashboard` entry in `js/main.js`**

Find:

```javascript
  'saas-dashboard': {
    folder: 'nexusflow-template',
    files: [
      ['pages/saas-dashboard/custom.css',           'custom.css'],
```

Replace with:

```javascript
  'saas-dashboard': {
    folder: 'nexusflow-template',
    files: [
      ['pages/saas-dashboard/custom.css',           'custom.css'],
      ['pages/saas-dashboard/api-guide.js',         'api-guide.js'],
```

- [ ] **Step 3: Update `boutique-brand` entry in `js/main.js`**

Find:

```javascript
  'boutique-brand': {
    folder: 'aurele-template',
    files: [
      ['pages/boutique-brand/custom.css',             'custom.css'],
```

Replace with:

```javascript
  'boutique-brand': {
    folder: 'aurele-template',
    files: [
      ['pages/boutique-brand/custom.css',             'custom.css'],
      ['pages/boutique-brand/api-guide.js',           'api-guide.js'],
```

- [ ] **Step 4: Update `space-scifi` entry in `js/main.js`**

Find:

```javascript
  'space-scifi': {
    folder: 'orbital-template',
    files: [
      ['pages/space-scifi/custom.css',            'custom.css'],
```

Replace with:

```javascript
  'space-scifi': {
    folder: 'orbital-template',
    files: [
      ['pages/space-scifi/custom.css',            'custom.css'],
      ['pages/space-scifi/api-guide.js',          'api-guide.js'],
```

- [ ] **Step 5: Update `quill-landing` entry in `js/main.js`**

Find:

```javascript
  'quill-landing': {
    folder: 'quill-template',
    files: [
      ['pages/quill-landing/custom.css',            'custom.css'],
```

Replace with:

```javascript
  'quill-landing': {
    folder: 'quill-template',
    files: [
      ['pages/quill-landing/custom.css',            'custom.css'],
      ['pages/quill-landing/api-guide.js',          'api-guide.js'],
```

- [ ] **Step 6: Update cache-bust version in `index.html`**

Find:

```html
    <script src="js/main.js?v=20260528"></script>
```

Replace with:

```html
    <script src="js/main.js?v=20260530"></script>
```

- [ ] **Step 7: Verify download includes api-guide.js**

Open `http://localhost:8080/`, click "下載模板" on any demo card.
Unzip the downloaded file and confirm `api-guide.js` is present at the root of the ZIP.

- [ ] **Step 8: Commit**

```bash
git add js/main.js index.html
git commit -m "feat: include api-guide.js in all demo ZIP downloads"
```
