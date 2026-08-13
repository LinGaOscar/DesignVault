# Dev

本地開發筆記。專案本身無 build/lint/test，這份文件很短。

## 需求

- 無需安裝任何套件（無 `package.json`、無 lock file）
- 只需要能跑靜態檔案伺服器的工具（Python 或 Node 皆可，二選一）

## 本地啟動

```bash
python3 -m http.server 8080
# 或
npx serve .
```

瀏覽 `http://localhost:8080` 看首頁，或直接進單一 Demo：

```
http://localhost:8080/pages/fashion-ecommerce/
http://localhost:8080/pages/saas-dashboard/
http://localhost:8080/pages/boutique-brand/
http://localhost:8080/pages/space-scifi/
http://localhost:8080/pages/quill-landing/
```

用本地伺服器而非直接雙擊開檔案，是因為部分頁面用相對路徑抓資源（`custom.css`、`api-guide.js`），`file://` 開啟在某些瀏覽器下行為不一致。

## 測試

沒有自動化測試。修改後手動在瀏覽器檢查對應頁面（含手機寬度的響應式排版）即可。

## 部署

`.github/workflows/deploy.yml`：push 到 `main` 會自動觸發 GitHub Pages 部署（`actions/deploy-pages`），無需手動操作。

## 修改時的小提醒

- 改 `css/style.css` 或 `js/main.js` 後，記得同步更新 `index.html` 內對應的 `?v=` 版本字串（cache busting）。
- 各 Demo 的品牌色彩/間距集中在該 Demo 的 `custom.css :root`，改動優先動變數而非散落的字面值。
- 更完整的架構與慣例說明見 `CLAUDE.md`。
