# ORBITAL Hotel — Space Sci-Fi 改造設計文件

## Goal

將現有 `pages/space-scifi/` demo 從太空指揮中心（NEXUS VOID）改造為太空主題飯店（ORBITAL），保留全部視覺風格，僅替換內容與品牌。

## Architecture

沿用 Bootstrap 5.3.3 + `custom.css` 架構，`--nv-*` CSS 變數保留不動。品牌名稱由 NEXUS VOID 換成 ORBITAL，子頁面從任務/艦隊/遙測/信號換成客艙/體驗/訂房/關於，content layer 全部重寫，component layer 不變。

## Tech Stack

- Bootstrap 5.3.3 (CDN)
- `pages/space-scifi/custom.css`（保留，僅新增或微調必要樣式）
- 無 Google Fonts（維持 monospace）
- `.designvault-back` class 不變（`cleanHtml()` 對應）

---

## 頁面規格

### index.html（首頁）

**Navbar**：`ORBITAL` 品牌 | 客艙 | 體驗 | 訂房 | 關於

**Hero 區塊**：
- 標題：「超越地平線 / Beyond the Horizon」
- 副標：「距地 408 公里，全球首座軌道豪華飯店。即刻啟程。」
- 按鈕：立即訂房（`.btn-nv`）、探索客艙（`.btn-nv-outline`）
- 右側：純 CSS 模擬太空站外觀 card（保留 live-dot 脈動）

**客艙精選**：3 張卡片（Standard Pod、Observatory Suite、Executive Sphere），顯示艙型名、價格、簡短說明，連結至 `rooms/`

**體驗亮點**：3 項水平排列（太空漫步、零重力艙、星空觀景台），icon + 標題 + 一行說明

**訂房 CTA section**：深色背景，標題「預訂您的太空之旅」，CTA 按鈕連結 `book/`

**Footer**：`ORBITAL` brand wordmark、四欄連結（客艙/體驗/訂房/關於）、`© 2026 ORBITAL HOTELS`

---

### rooms/index.html（客艙）

**Page Header**：`nv-page-header`，標題「客艙選擇」，英文副標 "Choose Your Orbit"

**三種艙型卡片**（各一列，左右交錯排版 `col-12 col-md-6`）：

| 艙型 | 說明 | 價格/晚 |
|---|---|---|
| Standard Pod | 雙人太空艙，270° 弧形舷窗 | NT$ 48,000 |
| Observatory Suite | 透明穹頂觀星套房，私人客廳 | NT$ 98,000 |
| Executive Sphere | 環形全景總統套房，私人氣閘 | NT$ 198,000 |

每張卡片含：艙型圖（純 CSS 幾何圖形）、規格標籤（面積/床型/人數）、價格、「了解更多」按鈕

---

### experiences/index.html（體驗）

**Page Header**：標題「體驗項目」，英文副標 "Cosmic Experiences"

**體驗列表**（`list-group` 樣式，4 項）：
1. 太空漫步 Spacewalk — 2小時，專業導引，配備 EVA 太空衣
2. 零重力艙 Zero-G Chamber — 自由飄浮體驗，最多 6 人
3. 星空觀景台 Stargazing Deck — 全黑暗環境，頂級光學望遠鏡
4. 地球俯瞰攝影 Earth Photography — 專業攝影師陪同，成品精印輸出

每項含：英文名稱（`section-label`）、中文說明、時長、費用、badge 狀態（開放/限額）

---

### book/index.html（訂房）

**Page Header**：標題「預訂行程」，英文副標 "Reserve Your Journey"

**兩欄排版**（`col-12 col-lg-4` 說明 + `col-12 col-lg-7` 表單）：

左欄聯絡資訊：地球聯絡中心電話、email、出發梭艙時刻說明

右欄表單欄位（Bootstrap `form-control` + `.form-label`）：
- 入住日期（`type="date"`，`id="book-checkin"`）
- 退房日期（`type="date"`，`id="book-checkout"`）
- 艙型選擇（`form-select`，`id="book-room"`）
- 人數（`type="number"`，`id="book-guests"`）
- 姓名（`type="text"`，`id="book-name"`）
- 電子郵件（`type="email"`，`id="book-email"`）
- 備註（`textarea`，`id="book-notes"`）
- 提交按鈕（`.btn-nv`）

所有 `<label>` 帶 `for` 屬性對應各 `id`。

---

### about/index.html（關於）

**Page Header**：標題「關於 ORBITAL」，英文副標 "About Us"

**品牌故事段落**（2 段，正文 + 引言 blockquote）：
- 創立於 2024 年，全球首座商業軌道飯店
- 安全認證、永續發展承諾

**三欄數據**（`col-4 text-center`）：

| 數字 | 說明 |
|---|---|
| 408 km | 軌道高度 |
| 12 | 可入住客艙 |
| 2024 | 開幕年份 |

---

## 導覽列對照

| 現有 | 改造後 |
|---|---|
| 系統 → `../` | 首頁 → `../` |
| 任務 → `../missions/` | 客艙 → `../rooms/` |
| 艦隊 → `../fleet/` | 體驗 → `../experiences/` |
| 遙測 → `../telemetry/` | 訂房 → `../book/` |
| 信號 → `../signal/` | 關於 → `../about/` |

## 需要刪除的舊頁面

`missions/`、`fleet/`、`telemetry/`、`signal/` — 全部刪除，改建 `rooms/`、`experiences/`、`book/`、`about/`

## js/main.js DEMOS manifest 更新

`space-scifi` 條目的 `files` 陣列須更新子頁面路徑：

```js
// 舊（刪除）
'pages/space-scifi/missions/index.html'
'pages/space-scifi/fleet/index.html'
'pages/space-scifi/telemetry/index.html'
'pages/space-scifi/signal/index.html'

// 新（新增）
'pages/space-scifi/rooms/index.html'
'pages/space-scifi/experiences/index.html'
'pages/space-scifi/book/index.html'
'pages/space-scifi/about/index.html'
```

## DesignVault index.html 更新

`index.html` 的 NEXUS VOID 卡片更新為 ORBITAL，描述改為「太空主題飯店」，縮圖 emoji 改為 🛸。
