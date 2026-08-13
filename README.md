# DesignVault

精選網頁設計作品展示 — 純靜態前端作品集，包含五個網頁設計 Demo，無任何框架或建置流程。

## 作品列表

| Demo | 品牌名稱 | 主題風格 |
|---|---|---|
| [Fashion E-Commerce](pages/fashion-ecommerce/) | MAISON NOIR | 時尚電商，暖色調 |
| [SaaS Dashboard](pages/saas-dashboard/) | NexusFlow Enterprise | 深色系分析儀表板 |
| [Boutique Brand](pages/boutique-brand/) | AURÈLE | 極簡奢華品牌形象 |
| [Space Hotel](pages/space-scifi/) | ORBITAL | 太空主題豪華飯店 |
| [AI Writing Tool](pages/quill-landing/) | Quill | SaaS 行銷落地頁 |

## 專案結構

```
DesignVault/
├── index.html                  # 首頁，列出所有 Demo
├── css/
│   └── style.css               # index.html 全域樣式
├── js/
│   └── main.js                 # ZIP 下載邏輯
└── pages/
    ├── fashion-ecommerce/      # MAISON NOIR（womens / mens / accessories / about）
    ├── saas-dashboard/         # NexusFlow（analytics / users / orders / settings）
    ├── boutique-brand/         # AURÈLE（story / collections / works / contact）
    ├── space-scifi/            # ORBITAL（rooms / experiences / book / about）
    └── quill-landing/          # Quill（features / pricing / about）
```

每個 Demo 包含一個 `custom.css`（品牌 CSS 變數）與各子頁 HTML，使用 Bootstrap 5.3.3 CDN。

## 功能

- 首頁每張卡片可**下載模板**：點擊後由 `js/main.js` 用 JSZip 即時打包該 Demo 的 HTML/CSS/圖片為 `.zip`，並自動移除 DesignVault 專屬導覽元素（如返回連結），下載即為可獨立使用的靜態模板。
- 每個 Demo 的部分頁面內建 `api-guide.js` 工具列，列出該頁面預期串接的 API endpoints，供下載模板後接後端的開發者參考（此工具列不會被下載時的清理流程移除）。

## 部署

push 到 `main` 分支會經由 `.github/workflows/deploy.yml` 自動部署到 GitHub Pages。

## 技術棧

- **HTML5 / CSS3 / Vanilla JavaScript**（無框架、無套件管理器）
- Bootstrap 5.3.3（CDN）
- Google Fonts（各 Demo 各自載入所需字型）

## 本地開啟

```bash
python3 -m http.server 8080
```

瀏覽 `http://localhost:8080` 即可看到首頁。
