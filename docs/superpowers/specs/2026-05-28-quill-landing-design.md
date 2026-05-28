# Quill — AI 寫作工具 Landing Page 設計文件

## Goal

在 `pages/quill-landing/` 新增一個 SaaS 產品行銷頁 demo，品牌為 Quill（AI 寫作助理），採白底清爽 teal 配色，包含 index.html 與 3 個子頁面，符合 DesignVault 現有 Bootstrap 5.3.3 + custom.css 架構。

## Architecture

新資料夾 `pages/quill-landing/`，結構與其他 demo 相同：首頁 + 4 個子頁面，共用 `custom.css`。`js/main.js` DEMOS manifest 新增此 demo 的 `files` 陣列。`index.html` landing page 卡片新增 Quill 項目。

## Tech Stack

- Bootstrap 5.3.3 (CDN)
- `pages/quill-landing/custom.css`（新建，`--ql-*` CSS 變數）
- Google Fonts：Inter（與 saas-dashboard 共用）
- `.dv-bar` class（DesignVault 返回連結，`cleanHtml()` 已支援）

## CSS 變數

```css
--ql-bg: #ffffff
--ql-bg-alt: #f0fdfa
--ql-bg-dark: #0f172a
--ql-text: #0f172a
--ql-muted: #64748b
--ql-teal: #0d9488
--ql-blue: #0ea5e9
--ql-border: #e2e8f0
--ql-radius: 12px
--bs-body-bg: var(--ql-bg)
--bs-body-color: var(--ql-text)
--bs-border-radius: var(--ql-radius)
--bs-body-font-family: 'Inter', sans-serif
```

---

## 頁面規格

### index.html（首頁 Landing Page）

**Navbar**（`navbar-expand-lg sticky-top`，白底，底部 border）：
- 品牌：`Quill`（Inter，font-weight 600）
- 連結：功能、定價、關於
- 右側 CTA：「免費試用」（`.btn-ql` teal 實心按鈕）

**Hero 區塊**（`py-5`，中心對齊，`bg-white`）：
- 上方 badge：「✦ AI 驅動 · 中英雙語」
- 標題（`clamp(2.5rem, 5vw, 4rem)`）：「寫作，從此有了夥伴」
- 副標：「Quill 結合 AI 語意理解與即時建議，讓每一個字都精準到位。」
- 按鈕組：「免費開始」（`.btn-ql`）+ 「觀看示範」（`.btn-ql-outline`）
- Hero 下方：模擬編輯器 UI（純 HTML/CSS，dark card，含假文字 + AI 建議 tooltip）

**社群證明橫條**（`bg-alt`，數字居中）：
- 3 組數字：`50,000+` 用戶 / `4.9 ★` 評分 / `200M+` 字數生成

**功能預覽**（`py-5`，3欄 `col-12 col-md-4`）：
1. AI 即時建議 — 輸入同時給出改寫選項
2. 多語言支援 — 中英日韓無縫切換
3. 團隊協作 — 即時共編，留言與版本記錄

**How it Works**（`bg-alt`，3步驟橫排）：
1. 輸入主題或草稿
2. Quill AI 分析語意與風格
3. 選擇建議，一鍵套用

**定價預覽**（3方案卡片，`col-12 col-md-4`）：

| 方案 | 價格 | 特色 |
|---|---|---|
| Free | NT$ 0 / 月 | 每月 5,000 字，基本建議 |
| Pro | NT$ 290 / 月 | 無限字數，進階風格分析 |
| Team | NT$ 890 / 月 | 最多 10 人，協作 + 管理後台 |

Pro 方案加 `border: 2px solid var(--ql-teal)` 視覺強調。

**Testimonials**（3則，`col-12 col-md-4`）：
- 卡片含：引言文字、姓名、職稱

**最終 CTA 區塊**（`bg-dark` 深色背景 `--ql-bg-dark`，白字）：
- 標題：「立即體驗 Quill」
- 副標：「免費方案無需信用卡，30 秒完成註冊。」
- 按鈕：「免費開始」（白色按鈕）

**Footer**（深色底，4欄）：品牌 + 產品連結 + 資源 + 法律

---

### features/index.html（功能頁）

**Page Header**：標題「完整功能」，副標 "Everything You Need to Write Better"

**6 項功能**（`row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`）：
1. AI 即時建議 — 輸入即分析，提供改寫與延伸
2. 風格偵測 — 自動識別正式/輕鬆/學術文風
3. 多語言翻譯 — 一鍵譯為 12 種語言
4. 版本歷史 — 每次修改自動存檔，隨時回溯
5. 協作留言 — 即時標記與回覆，無縫溝通
6. 匯出格式 — 支援 PDF、DOCX、Markdown

每項含：icon emoji、標題、2行說明

---

### pricing/index.html（定價頁）

**Page Header**：標題「選擇方案」，副標 "Simple, Transparent Pricing"

**切換器**（年繳/月繳視覺 toggle，Bootstrap form-check，純 CSS 呈現，不需 JS 實際切換價格）

**3方案卡片**（同 index.html 但展開）：各列出完整功能清單（checkmark list），Pro 卡片加推薦標籤

**功能對比表**（`table table-bordered`）：
- 欄：功能名稱 / Free / Pro / Team
- 列：字數限制、AI 建議次數、語言數、協作人數、版本歷史、客服等級

**FAQ**（4 題，Bootstrap accordion）：
1. 免費方案包含什麼？
2. 可以隨時取消嗎？
3. 支援哪些瀏覽器？
4. 資料安全性如何保障？

---

### about/index.html（關於頁）

**Page Header**：標題「關於 Quill」，副標 "Our Story"

**品牌故事**（2段，左側文字 + 右側數字卡）：
- 成立於 2024 年，致力讓每個人都能寫出好文章

**三欄數據**：`50,000+` 用戶 / `12` 支援語言 / `2024` 成立年

**核心價值**（3項，水平排列）：
1. 易用性 — 零學習曲線，開箱即用
2. 隱私 — 內容不用於模型訓練
3. 持續進化 — 每兩週更新一次

**聯絡資訊**：email + 社群連結（假連結）

---

## 自訂 CSS 元件（custom.css）

```css
/* Buttons */
.btn-ql         /* teal 實心，white 文字 */
.btn-ql-outline /* teal 框線，teal 文字，hover 轉實心 */
.btn-ql-white   /* 白色實心，dark 文字，用於深色背景 */

/* Cards */
.feature-card   /* 白底，border，hover 升起 shadow */
.pricing-card   /* 同上，featured 版加 teal border */
.testimonial-card /* 白底，左側 teal border-left accent */

/* Editor mockup */
.ql-editor-mock  /* dark card 模擬編輯器 UI */
.ql-ai-chip      /* AI 建議小 badge */

/* Sections */
.ql-section-hero
.ql-section-alt  /* bg-alt teal 底 */
.ql-section-dark /* bg-dark 深色底 */
```

---

## DesignVault 整合

### index.html 新卡片

```html
<!-- Quill Landing Page -->
<div class="col">
  <div class="dv-preview">
    <iframe src="pages/quill-landing/" title="Quill AI Writing Tool"></iframe>
  </div>
  <div class="dv-info">
    <p class="dv-tag">SaaS Landing Page</p>
    <h2 class="dv-title">Quill</h2>
    <p class="dv-desc">AI 寫作工具行銷頁，白底清爽 teal 配色，含定價、功能、關於子頁。</p>
    <button onclick="downloadTemplate('quill-landing')">下載模板</button>
  </div>
</div>
```

### js/main.js DEMOS 新增

```js
{
  id: 'quill-landing',
  label: 'Quill Landing Page',
  files: [
    ['pages/quill-landing/custom.css', 'custom.css'],
    ['pages/quill-landing/index.html', 'index.html'],
    ['pages/quill-landing/features/index.html', 'features/index.html'],
    ['pages/quill-landing/pricing/index.html', 'pricing/index.html'],
    ['pages/quill-landing/about/index.html', 'about/index.html'],
  ]
}
```
