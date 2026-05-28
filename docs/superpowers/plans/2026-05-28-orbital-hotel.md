# ORBITAL Hotel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `pages/space-scifi/` from NEXUS VOID space command center to ORBITAL space-themed hotel, keeping the full dark sci-fi visual aesthetic while replacing all content and brand to travel/hotel vocabulary.

**Architecture:** Rewrite `pages/space-scifi/index.html` and delete the four old subpages (missions, fleet, telemetry, signal), then create four new subpages (rooms, experiences, book, about). All CSS variables (`--nv-*`) and `custom.css` stay unchanged — only HTML content changes. Update `js/main.js` DEMOS manifest and root `index.html` card.

**Tech Stack:** Bootstrap 5.3.3 (CDN), existing `pages/space-scifi/custom.css` (unchanged), no Google Fonts (monospace throughout), `.designvault-back` class retained.

---

## File Map

| Action | File |
|---|---|
| Rewrite | `pages/space-scifi/index.html` |
| Delete | `pages/space-scifi/missions/` (entire folder) |
| Delete | `pages/space-scifi/fleet/` (entire folder) |
| Delete | `pages/space-scifi/telemetry/` (entire folder) |
| Delete | `pages/space-scifi/signal/` (entire folder) |
| Create | `pages/space-scifi/rooms/index.html` |
| Create | `pages/space-scifi/experiences/index.html` |
| Create | `pages/space-scifi/book/index.html` |
| Create | `pages/space-scifi/about/index.html` |
| Modify | `js/main.js` (space-scifi files array) |
| Modify | `index.html` (space-scifi card text) |
| Modify | `CLAUDE.md` (space-scifi demo description) |

---

### Task 1: Rewrite `pages/space-scifi/index.html`

**Files:**
- Modify: `pages/space-scifi/index.html`

- [ ] **Step 1: Replace the entire file with ORBITAL homepage**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ORBITAL — 太空主題飯店</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="custom.css">
</head>
<body>

    <a href="../../index.html" class="designvault-back">← DesignVault</a>

    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="./">ORBITAL</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nvNav" aria-controls="nvNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link active" href="./">首頁</a></li>
                    <li class="nav-item"><a class="nav-link" href="rooms/">客艙</a></li>
                    <li class="nav-item"><a class="nav-link" href="experiences/">體驗</a></li>
                    <li class="nav-item"><a class="nav-link" href="book/">訂房</a></li>
                    <li class="nav-item"><a class="nav-link" href="about/">關於</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="nv-hero">
        <div class="container position-relative">
            <div class="row align-items-center">
                <div class="col-12 col-lg-6">
                    <p class="section-label mb-3"><span class="live-dot me-2"></span>ORBITAL HOTELS · NOW BOOKING</p>
                    <h1 class="nv-hero-title mb-4">
                        超越地平線<br>
                        <span class="line2">Beyond the Horizon</span>
                    </h1>
                    <p class="mb-4" style="color:var(--nv-muted);font-size:0.875rem;line-height:1.8;">距地 408 公里，全球首座軌道豪華飯店。在無垠星空中，重新定義奢華旅宿的邊界。</p>
                    <div class="d-flex gap-3 flex-wrap">
                        <a href="book/" class="btn-nv">立即訂房</a>
                        <a href="rooms/" class="btn-nv-outline">探索客艙</a>
                    </div>
                </div>
                <div class="col-12 col-lg-5 offset-lg-1 d-none d-lg-block">
                    <div class="card p-4 border-glow text-center">
                        <p class="section-label mb-3">ORBITAL STATION STATUS</p>
                        <div class="d-flex justify-content-around">
                            <div>
                                <p class="glow-cyan mb-0" style="font-size:1.5rem;font-weight:700;">408</p>
                                <p class="small mb-0" style="color:var(--nv-muted);">km 高度</p>
                            </div>
                            <div>
                                <p class="mb-0" style="font-size:1.5rem;font-weight:700;color:var(--nv-green);">12</p>
                                <p class="small mb-0" style="color:var(--nv-muted);">可用客艙</p>
                            </div>
                            <div>
                                <p class="mb-0" style="font-size:1.5rem;font-weight:700;color:var(--nv-yellow);">16</p>
                                <p class="small mb-0" style="color:var(--nv-muted);">次/日 日出</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 客艙精選 -->
    <section class="py-5" style="background:var(--nv-surface);">
        <div class="container">
            <p class="section-label mb-2">Accommodations</p>
            <h2 class="h4 fw-normal mb-4" style="color:#fff;">精選客艙</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    <div class="card p-4 h-100">
                        <p class="mb-2" style="font-size:2rem;">🛸</p>
                        <p class="section-label mb-1">Standard</p>
                        <h3 class="h6 fw-normal mb-2" style="color:#fff;">Standard Pod</h3>
                        <p class="small mb-3 flex-grow-1" style="color:var(--nv-muted);">270° 弧形舷窗，雙人太空艙，含早餐與裝備租借。</p>
                        <p class="glow-cyan mb-3" style="font-size:0.875rem;">NT$ 48,000 / 晚</p>
                        <a href="rooms/" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">了解更多</a>
                    </div>
                </div>
                <div class="col">
                    <div class="card p-4 h-100 border-glow">
                        <p class="mb-2" style="font-size:2rem;">🌌</p>
                        <p class="section-label mb-1">Premium</p>
                        <h3 class="h6 fw-normal mb-2" style="color:#fff;">Observatory Suite</h3>
                        <p class="small mb-3 flex-grow-1" style="color:var(--nv-muted);">透明穹頂觀星套房，私人客廳與專屬管家服務。</p>
                        <p class="glow-cyan mb-3" style="font-size:0.875rem;">NT$ 98,000 / 晚</p>
                        <a href="rooms/" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">了解更多</a>
                    </div>
                </div>
                <div class="col">
                    <div class="card p-4 h-100">
                        <p class="mb-2" style="font-size:2rem;">⭐</p>
                        <p class="section-label mb-1">Executive</p>
                        <h3 class="h6 fw-normal mb-2" style="color:#fff;">Executive Sphere</h3>
                        <p class="small mb-3 flex-grow-1" style="color:var(--nv-muted);">環形全景總統套房，私人氣閘與專屬太空漫步。</p>
                        <p class="glow-cyan mb-3" style="font-size:0.875rem;">NT$ 198,000 / 晚</p>
                        <a href="rooms/" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">了解更多</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 體驗亮點 -->
    <section class="py-5">
        <div class="container">
            <p class="section-label mb-2">Experiences</p>
            <h2 class="h4 fw-normal mb-4" style="color:#fff;">獨家體驗</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4 mb-4">
                <div class="col">
                    <div class="card p-4">
                        <p style="font-size:2rem;margin-bottom:0.75rem;">🚶</p>
                        <h3 class="h6 mb-2" style="color:var(--nv-cyan);">太空漫步</h3>
                        <p class="small mb-0" style="color:var(--nv-muted);">在 408km 高空，親身感受宇宙的壯闊。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card p-4">
                        <p style="font-size:2rem;margin-bottom:0.75rem;">🔭</p>
                        <h3 class="h6 mb-2" style="color:var(--nv-cyan);">星空觀景台</h3>
                        <p class="small mb-0" style="color:var(--nv-muted);">全黑暗環境，頂級光學設備，觀測深空星系。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card p-4">
                        <p style="font-size:2rem;margin-bottom:0.75rem;">🌍</p>
                        <h3 class="h6 mb-2" style="color:var(--nv-cyan);">地球俯瞰攝影</h3>
                        <p class="small mb-0" style="color:var(--nv-muted);">專業攝影師陪同，記錄最珍貴的地球弧光。</p>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a href="experiences/" class="btn-nv-outline">查看所有體驗</a>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-5" style="background:var(--nv-surface);border-top:1px solid var(--nv-border);border-bottom:1px solid var(--nv-border);">
        <div class="container text-center py-3">
            <p class="section-label mb-3">BOOK NOW</p>
            <h2 class="h3 fw-normal mb-3" style="color:#fff;">預訂您的太空之旅</h2>
            <p class="mb-4" style="color:var(--nv-muted);font-size:0.875rem;">每月僅開放有限名額，立即確認您的軌道住宿行程。</p>
            <a href="book/" class="btn-nv">立即訂房</a>
        </div>
    </section>

    <!-- Footer -->
    <footer style="background:var(--nv-surface);border-top:1px solid var(--nv-border);padding:32px 0;">
        <div class="container">
            <div class="row g-4 mb-4">
                <div class="col-12 col-md-4">
                    <p class="glow-cyan mb-1" style="font-size:1.1rem;letter-spacing:3px;font-weight:700;">ORBITAL</p>
                    <p class="small" style="color:var(--nv-muted);">全球首座軌道豪華飯店</p>
                </div>
                <div class="col-6 col-md-2">
                    <p class="section-label mb-2">住宿</p>
                    <div class="d-flex flex-column gap-1">
                        <a href="rooms/" style="color:var(--nv-muted);font-size:0.8rem;text-decoration:none;">客艙選擇</a>
                        <a href="experiences/" style="color:var(--nv-muted);font-size:0.8rem;text-decoration:none;">體驗項目</a>
                    </div>
                </div>
                <div class="col-6 col-md-2">
                    <p class="section-label mb-2">資訊</p>
                    <div class="d-flex flex-column gap-1">
                        <a href="about/" style="color:var(--nv-muted);font-size:0.8rem;text-decoration:none;">關於我們</a>
                        <a href="book/" style="color:var(--nv-muted);font-size:0.8rem;text-decoration:none;">立即訂房</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <p class="section-label mb-2">聯絡</p>
                    <p class="small" style="color:var(--nv-muted);">orbital@example.com</p>
                    <p class="small" style="color:var(--nv-muted);">地球聯絡中心 +886 2 0000 4080</p>
                </div>
            </div>
            <div class="border-top pt-3 d-flex justify-content-between small" style="border-color:var(--nv-border)!important;color:var(--nv-muted);">
                <span>© 2026 ORBITAL HOTELS</span>
                <span>All rights reserved</span>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/space-scifi/index.html
git commit -m "feat: rewrite space-scifi homepage as ORBITAL hotel"
```

---

### Task 2: Delete old subpages and create `rooms/index.html`

**Files:**
- Delete: `pages/space-scifi/missions/`, `fleet/`, `telemetry/`, `signal/`
- Create: `pages/space-scifi/rooms/index.html`

- [ ] **Step 1: Delete old subpages**

```bash
rm -rf pages/space-scifi/missions pages/space-scifi/fleet pages/space-scifi/telemetry pages/space-scifi/signal
mkdir -p pages/space-scifi/rooms
```

- [ ] **Step 2: Create `pages/space-scifi/rooms/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>客艙 — ORBITAL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="designvault-back">← DesignVault</a>

    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../">ORBITAL</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nvNav" aria-controls="nvNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../">首頁</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">客艙</a></li>
                    <li class="nav-item"><a class="nav-link" href="../experiences/">體驗</a></li>
                    <li class="nav-item"><a class="nav-link" href="../book/">訂房</a></li>
                    <li class="nav-item"><a class="nav-link" href="../about/">關於</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="nv-page-header">
        <div class="container">
            <a href="../" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">← 返回首頁</a>
            <p class="section-label mt-3 mb-1">Accommodations</p>
            <h1 class="h4 fw-normal" style="color:#fff;">客艙選擇</h1>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <!-- Standard Pod -->
            <div class="row g-4 align-items-center mb-5 pb-5" style="border-bottom:1px solid var(--nv-border);">
                <div class="col-12 col-md-5">
                    <div class="card p-5 text-center border-glow" style="font-size:5rem;line-height:1;">🛸</div>
                </div>
                <div class="col-12 col-md-7">
                    <p class="section-label mb-1">Standard</p>
                    <h2 class="h3 fw-normal mb-3" style="color:#fff;">Standard Pod</h2>
                    <p class="mb-4" style="color:var(--nv-muted);line-height:1.8;font-size:0.875rem;">270° 弧形全景舷窗，讓地球與星空盡收眼底。雙人太空艙設計，含早餐套餐、太空裝備租借及基本艙外活動保險。</p>
                    <div class="row g-3 mb-4">
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">面積</p><p class="small mb-0" style="color:#fff;">28 m²</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">床型</p><p class="small mb-0" style="color:#fff;">雙人太空床</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">人數</p><p class="small mb-0" style="color:#fff;">1–2 人</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">舷窗</p><p class="small mb-0" style="color:#fff;">270° 弧形</p></div></div>
                    </div>
                    <div class="d-flex align-items-center gap-4 flex-wrap">
                        <p class="glow-cyan mb-0" style="font-size:1.25rem;font-weight:700;">NT$ 48,000 <span style="font-size:0.75rem;font-weight:400;">/ 晚</span></p>
                        <a href="../book/" class="btn-nv">立即訂房</a>
                    </div>
                </div>
            </div>

            <!-- Observatory Suite -->
            <div class="row g-4 align-items-center mb-5 pb-5" style="border-bottom:1px solid var(--nv-border);">
                <div class="col-12 col-md-5 order-md-2">
                    <div class="card p-5 text-center border-glow" style="font-size:5rem;line-height:1;">🌌</div>
                </div>
                <div class="col-12 col-md-7 order-md-1">
                    <p class="section-label mb-1">Premium</p>
                    <h2 class="h3 fw-normal mb-3" style="color:#fff;">Observatory Suite</h2>
                    <p class="mb-4" style="color:var(--nv-muted);line-height:1.8;font-size:0.875rem;">透明穹頂觀星套房，夜晚可直視銀河。含私人客廳、專屬管家服務、天文學家導覽及無限暢飲太空調酒。</p>
                    <div class="row g-3 mb-4">
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">面積</p><p class="small mb-0" style="color:#fff;">56 m²</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">床型</p><p class="small mb-0" style="color:#fff;">King 軌道床</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">人數</p><p class="small mb-0" style="color:#fff;">1–2 人</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">穹頂</p><p class="small mb-0" style="color:#fff;">360° 透明</p></div></div>
                    </div>
                    <div class="d-flex align-items-center gap-4 flex-wrap">
                        <p class="glow-cyan mb-0" style="font-size:1.25rem;font-weight:700;">NT$ 98,000 <span style="font-size:0.75rem;font-weight:400;">/ 晚</span></p>
                        <a href="../book/" class="btn-nv">立即訂房</a>
                    </div>
                </div>
            </div>

            <!-- Executive Sphere -->
            <div class="row g-4 align-items-center">
                <div class="col-12 col-md-5">
                    <div class="card p-5 text-center border-glow" style="font-size:5rem;line-height:1;">⭐</div>
                </div>
                <div class="col-12 col-md-7">
                    <p class="section-label mb-1">Executive</p>
                    <h2 class="h3 fw-normal mb-3" style="color:#fff;">Executive Sphere</h2>
                    <p class="mb-4" style="color:var(--nv-muted);line-height:1.8;font-size:0.875rem;">環形全景總統套房，含私人氣閘、專屬太空漫步行程及私人廚師。最高規格的軌道住宿體驗。</p>
                    <div class="row g-3 mb-4">
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">面積</p><p class="small mb-0" style="color:#fff;">120 m²</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">床型</p><p class="small mb-0" style="color:#fff;">Emperor 零重力床</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">人數</p><p class="small mb-0" style="color:#fff;">1–4 人</p></div></div>
                        <div class="col-6"><div class="card p-2 text-center"><p class="section-label mb-0">氣閘</p><p class="small mb-0" style="color:#fff;">私人氣閘</p></div></div>
                    </div>
                    <div class="d-flex align-items-center gap-4 flex-wrap">
                        <p class="glow-cyan mb-0" style="font-size:1.25rem;font-weight:700;">NT$ 198,000 <span style="font-size:0.75rem;font-weight:400;">/ 晚</span></p>
                        <a href="../book/" class="btn-nv">立即訂房</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer style="background:var(--nv-surface);border-top:1px solid var(--nv-border);padding:24px 0;">
        <div class="container d-flex justify-content-between small">
            <span class="glow-cyan" style="letter-spacing:2px;">ORBITAL</span>
            <span style="color:var(--nv-muted);">© 2026 ORBITAL HOTELS</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add pages/space-scifi/rooms/
git commit -m "feat: add ORBITAL rooms page, remove old space-scifi subpages"
```

---

### Task 3: Create `experiences/index.html`

**Files:**
- Create: `pages/space-scifi/experiences/index.html`

- [ ] **Step 1: Create the file**

```bash
mkdir -p pages/space-scifi/experiences
```

- [ ] **Step 2: Write `pages/space-scifi/experiences/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>體驗 — ORBITAL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="designvault-back">← DesignVault</a>

    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../">ORBITAL</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nvNav" aria-controls="nvNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../">首頁</a></li>
                    <li class="nav-item"><a class="nav-link" href="../rooms/">客艙</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">體驗</a></li>
                    <li class="nav-item"><a class="nav-link" href="../book/">訂房</a></li>
                    <li class="nav-item"><a class="nav-link" href="../about/">關於</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="nv-page-header">
        <div class="container">
            <a href="../" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">← 返回首頁</a>
            <p class="section-label mt-3 mb-1">Cosmic Experiences</p>
            <h1 class="h4 fw-normal" style="color:#fff;">體驗項目</h1>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <div class="list-group">
                <div class="list-group-item p-4">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <p class="section-label mb-1">Spacewalk</p>
                            <h2 class="h5 fw-normal mb-2" style="color:#fff;">🚶 太空漫步</h2>
                            <p class="small mb-2" style="color:var(--nv-muted);line-height:1.8;">穿著專業 EVA 太空衣，在 408km 高空親身感受宇宙壯闊。由資深太空導引員全程陪同。</p>
                            <div class="d-flex gap-3 small" style="color:var(--nv-muted);">
                                <span>⏱ 2 小時</span><span>👥 限 2 人 / 場</span>
                            </div>
                        </div>
                        <div class="text-end flex-shrink-0">
                            <p class="glow-cyan mb-1" style="font-size:0.875rem;font-weight:700;">NT$ 280,000</p>
                            <span class="badge badge-active-nv">開放預約</span>
                        </div>
                    </div>
                </div>
                <div class="list-group-item p-4">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <p class="section-label mb-1">Zero-G Chamber</p>
                            <h2 class="h5 fw-normal mb-2" style="color:#fff;">🌀 零重力艙</h2>
                            <p class="small mb-2" style="color:var(--nv-muted);line-height:1.8;">在專屬零重力訓練艙內自由飄浮，體驗完全失重狀態，可進行翻滾與空中攝影。</p>
                            <div class="d-flex gap-3 small" style="color:var(--nv-muted);">
                                <span>⏱ 1 小時</span><span>👥 限 6 人 / 場</span>
                            </div>
                        </div>
                        <div class="text-end flex-shrink-0">
                            <p class="glow-cyan mb-1" style="font-size:0.875rem;font-weight:700;">NT$ 48,000</p>
                            <span class="badge badge-active-nv">開放預約</span>
                        </div>
                    </div>
                </div>
                <div class="list-group-item p-4">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <p class="section-label mb-1">Stargazing Deck</p>
                            <h2 class="h5 fw-normal mb-2" style="color:#fff;">🔭 星空觀景台</h2>
                            <p class="small mb-2" style="color:var(--nv-muted);line-height:1.8;">全黑暗環境搭配頂級光學望遠鏡，由天文學家帶領觀測深空星系、行星與星雲。</p>
                            <div class="d-flex gap-3 small" style="color:var(--nv-muted);">
                                <span>⏱ 90 分鐘</span><span>👥 限 8 人 / 場</span>
                            </div>
                        </div>
                        <div class="text-end flex-shrink-0">
                            <p class="glow-cyan mb-1" style="font-size:0.875rem;font-weight:700;">NT$ 18,000</p>
                            <span class="badge badge-active-nv">開放預約</span>
                        </div>
                    </div>
                </div>
                <div class="list-group-item p-4">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <p class="section-label mb-1">Earth Photography</p>
                            <h2 class="h5 fw-normal mb-2" style="color:#fff;">🌍 地球俯瞰攝影</h2>
                            <p class="small mb-2" style="color:var(--nv-muted);line-height:1.8;">由專業太空攝影師陪同，在最佳時機捕捉地球弧光、極光與日出，成品精印裝框。</p>
                            <div class="d-flex gap-3 small" style="color:var(--nv-muted);">
                                <span>⏱ 3 小時</span><span>👥 限 2 人 / 場</span>
                            </div>
                        </div>
                        <div class="text-end flex-shrink-0">
                            <p class="glow-cyan mb-1" style="font-size:0.875rem;font-weight:700;">NT$ 68,000</p>
                            <span class="badge badge-warn">限額中</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <a href="../book/" class="btn-nv">預約體驗</a>
            </div>
        </div>
    </section>

    <footer style="background:var(--nv-surface);border-top:1px solid var(--nv-border);padding:24px 0;">
        <div class="container d-flex justify-content-between small">
            <span class="glow-cyan" style="letter-spacing:2px;">ORBITAL</span>
            <span style="color:var(--nv-muted);">© 2026 ORBITAL HOTELS</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add pages/space-scifi/experiences/
git commit -m "feat: add ORBITAL experiences page"
```

---

### Task 4: Create `book/index.html`

**Files:**
- Create: `pages/space-scifi/book/index.html`

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p pages/space-scifi/book
```

- [ ] **Step 2: Write `pages/space-scifi/book/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>訂房 — ORBITAL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="designvault-back">← DesignVault</a>

    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../">ORBITAL</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nvNav" aria-controls="nvNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../">首頁</a></li>
                    <li class="nav-item"><a class="nav-link" href="../rooms/">客艙</a></li>
                    <li class="nav-item"><a class="nav-link" href="../experiences/">體驗</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">訂房</a></li>
                    <li class="nav-item"><a class="nav-link" href="../about/">關於</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="nv-page-header">
        <div class="container">
            <a href="../" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">← 返回首頁</a>
            <p class="section-label mt-3 mb-1">Reserve Your Journey</p>
            <h1 class="h4 fw-normal" style="color:#fff;">預訂行程</h1>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-12 col-lg-4">
                    <p class="section-label mb-3">地球聯絡中心</p>
                    <div class="d-flex flex-column gap-3 small mb-4" style="color:var(--nv-muted);">
                        <div>📍 台北市信義區星際大道 408 號</div>
                        <div>📞 +886 2 0000 4080</div>
                        <div>✉️ orbital@example.com</div>
                        <div>🕐 週一至週五 09:00–18:00</div>
                    </div>
                    <div class="card p-3">
                        <p class="section-label mb-2">出發說明</p>
                        <p class="small mb-0" style="color:var(--nv-muted);line-height:1.8;">梭艙每週二、五從肯亞奈洛比太空港起飛。最短住宿 2 晚，需提前 90 天預訂。</p>
                    </div>
                </div>
                <div class="col-12 col-lg-7 offset-lg-1">
                    <form class="d-flex flex-column gap-4">
                        <div class="row g-3">
                            <div class="col-12 col-sm-6">
                                <label class="form-label" for="book-checkin">入住日期</label>
                                <input type="date" id="book-checkin" class="form-control">
                            </div>
                            <div class="col-12 col-sm-6">
                                <label class="form-label" for="book-checkout">退房日期</label>
                                <input type="date" id="book-checkout" class="form-control">
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-12 col-sm-8">
                                <label class="form-label" for="book-room">艙型選擇</label>
                                <select id="book-room" class="form-select">
                                    <option value="">請選擇艙型</option>
                                    <option>Standard Pod — NT$ 48,000 / 晚</option>
                                    <option>Observatory Suite — NT$ 98,000 / 晚</option>
                                    <option>Executive Sphere — NT$ 198,000 / 晚</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-4">
                                <label class="form-label" for="book-guests">人數</label>
                                <input type="number" id="book-guests" class="form-control" min="1" max="4" placeholder="1">
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-12 col-sm-6">
                                <label class="form-label" for="book-name">姓名</label>
                                <input type="text" id="book-name" class="form-control" placeholder="您的全名">
                            </div>
                            <div class="col-12 col-sm-6">
                                <label class="form-label" for="book-email">電子郵件</label>
                                <input type="email" id="book-email" class="form-control" placeholder="email@example.com">
                            </div>
                        </div>
                        <div>
                            <label class="form-label" for="book-notes">備註 / 特殊需求</label>
                            <textarea id="book-notes" class="form-control" rows="3" placeholder="如有特殊飲食需求或慶祝活動，請在此說明..."></textarea>
                        </div>
                        <div>
                            <button type="submit" class="btn-nv">送出訂房申請</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer style="background:var(--nv-surface);border-top:1px solid var(--nv-border);padding:24px 0;">
        <div class="container d-flex justify-content-between small">
            <span class="glow-cyan" style="letter-spacing:2px;">ORBITAL</span>
            <span style="color:var(--nv-muted);">© 2026 ORBITAL HOTELS</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add pages/space-scifi/book/
git commit -m "feat: add ORBITAL booking page"
```

---

### Task 5: Create `about/index.html`

**Files:**
- Create: `pages/space-scifi/about/index.html`

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p pages/space-scifi/about
```

- [ ] **Step 2: Write `pages/space-scifi/about/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>關於 — ORBITAL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="designvault-back">← DesignVault</a>

    <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../">ORBITAL</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nvNav" aria-controls="nvNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../">首頁</a></li>
                    <li class="nav-item"><a class="nav-link" href="../rooms/">客艙</a></li>
                    <li class="nav-item"><a class="nav-link" href="../experiences/">體驗</a></li>
                    <li class="nav-item"><a class="nav-link" href="../book/">訂房</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">關於</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="nv-page-header">
        <div class="container">
            <a href="../" class="btn-nv-outline py-1 px-3" style="font-size:0.7rem;">← 返回首頁</a>
            <p class="section-label mt-3 mb-1">About Us</p>
            <h1 class="h4 fw-normal" style="color:#fff;">關於 ORBITAL</h1>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-7">
                    <p class="section-label mb-4">Our Story</p>
                    <p class="mb-4" style="color:var(--nv-muted);line-height:1.9;font-size:0.9375rem;">ORBITAL HOTELS 創立於 2024 年，是全球第一座投入商業運營的軌道豪華飯店。我們相信，太空不只是科學家的領域——它是每一個懷抱夢想的人都值得親身體驗的前沿。</p>
                    <p class="mb-5" style="color:var(--nv-muted);line-height:1.9;font-size:0.9375rem;">我們與全球頂尖航太公司合作，以最嚴格的安全標準與最豪華的服務，讓每一位旅客都能在星空中找到屬於自己的片刻靜謐。</p>
                    <div class="row g-4 border-top pt-4" style="border-color:var(--nv-border)!important;">
                        <div class="col-4 text-center">
                            <p class="glow-cyan mb-1" style="font-size:1.8rem;font-weight:700;">408</p>
                            <p class="small" style="color:var(--nv-muted);">km 軌道高度</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="mb-1" style="font-size:1.8rem;font-weight:700;color:var(--nv-green);">12</p>
                            <p class="small" style="color:var(--nv-muted);">豪華客艙</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="mb-1" style="font-size:1.8rem;font-weight:700;color:var(--nv-yellow);">2024</p>
                            <p class="small" style="color:var(--nv-muted);">開幕年份</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer style="background:var(--nv-surface);border-top:1px solid var(--nv-border);padding:24px 0;">
        <div class="container d-flex justify-content-between small">
            <span class="glow-cyan" style="letter-spacing:2px;">ORBITAL</span>
            <span style="color:var(--nv-muted);">© 2026 ORBITAL HOTELS</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add pages/space-scifi/about/
git commit -m "feat: add ORBITAL about page"
```

---

### Task 6: Update `js/main.js`, root `index.html`, and `CLAUDE.md`

**Files:**
- Modify: `js/main.js` (lines 35–45, space-scifi files array)
- Modify: `index.html` (lines 79–92, space-scifi card text)
- Modify: `CLAUDE.md` (space-scifi demo description)

- [ ] **Step 1: Update `js/main.js` space-scifi files array**

Replace the `space-scifi` entry's `files` array (currently listing missions/fleet/telemetry/signal):

```js
  'space-scifi': {
    folder: 'orbital-template',
    files: [
      ['pages/space-scifi/custom.css',            'custom.css'],
      ['pages/space-scifi/index.html',            'index.html'],
      ['pages/space-scifi/rooms/index.html',      'rooms/index.html'],
      ['pages/space-scifi/experiences/index.html','experiences/index.html'],
      ['pages/space-scifi/book/index.html',       'book/index.html'],
      ['pages/space-scifi/about/index.html',      'about/index.html'],
    ]
  }
```

- [ ] **Step 2: Update root `index.html` space-scifi card**

Replace the space-scifi card block (the `div[data-demo="space-scifi"]`) with:

```html
                    <div class="col-12 col-md-6" data-demo="space-scifi">
                        <div class="dv-preview">
                            <iframe class="dv-frame" src="pages/space-scifi/index.html" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
                        </div>
                        <div class="p-4 d-flex flex-column">
                            <span class="text-uppercase small text-muted mb-2" style="letter-spacing:1.2px">旅遊 / 飯店</span>
                            <h3 class="fs-6 fw-normal mb-2" style="letter-spacing:-0.2px">太空主題飯店</h3>
                            <p class="small text-muted flex-grow-1" style="line-height:1.65">深宇宙暗色調，未來感軌道飯店住宿體驗</p>
                            <div class="d-flex gap-2 mt-auto" style="margin-top:20px">
                                <a href="pages/space-scifi/index.html" class="btn btn-outline-dark btn-sm flex-fill">前往範例</a>
                                <button class="btn btn-dark btn-sm flex-fill btn-dl" onclick="downloadTemplate('space-scifi')">下載模板</button>
                            </div>
                        </div>
                    </div>
```

- [ ] **Step 3: Update `CLAUDE.md` space-scifi demo description**

In the `Demo Pages` section, update Space Sci-Fi entry:

```markdown
### 4. Space Hotel (`pages/space-scifi/`)

- Brand: **ORBITAL** · 4 subpages: rooms, experiences, book, about
- DesignVault back link class: `.designvault-back` (strip target for `cleanHtml()`)
- Monospace font everywhere — no Google Fonts loaded
- `rooms/`: Three cabin tiers (Standard Pod / Observatory Suite / Executive Sphere)
- `book/`: Booking form with date pickers, room select, guest count
- `.nv-hero` has `padding-top: 72px` to compensate for `fixed-top` navbar
```

Also update the hero tagline in `index.html` from "四種不同情境，四種獨特風格" — no change needed since we'll still have 4 demos until Quill is added.

- [ ] **Step 4: Commit**

```bash
git add js/main.js index.html CLAUDE.md
git commit -m "feat: update ORBITAL manifest, index card, and CLAUDE.md"
```
