# DesignVault

精選網頁設計作品展示 — 純靜態前端作品集，包含三個網頁設計 Demo，無任何框架或建置流程。

## 作品列表

| Demo | 品牌名稱 | 主題風格 |
|---|---|---|
| [Fashion E-Commerce](pages/fashion-ecommerce/) | MAISON NOIR | 時尚電商，暖色調 |
| [SaaS Dashboard](pages/saas-dashboard/) | NexusFlow Enterprise | 深色系分析儀表板 |
| [Boutique Brand](pages/boutique-brand/) | AURÈLE | 極簡奢華品牌形象 |

## 專案結構

```
DesignVault/
├── index.html                  # 首頁，列出所有 Demo
├── css/
│   └── style.css               # index.html 全域樣式
├── js/
│   └── main.js                 # 初始化腳本
└── pages/
    ├── fashion-ecommerce/
    │   └── index.html
    ├── saas-dashboard/
    │   └── index.html
    └── boutique-brand/
        └── index.html
```

> 每個 Demo 頁面為自包含檔案，CSS 全寫在各自的 `<style>` 區塊內。

## 技術棧

- **HTML5 / CSS3 / Vanilla JavaScript**（無框架、無套件管理器）
- CSS Grid + Flexbox 響應式排版
- Google Fonts（Playfair Display、Cormorant Garamond、Inter）

## 本地開啟

直接用瀏覽器開啟根目錄的 `index.html` 即可。
