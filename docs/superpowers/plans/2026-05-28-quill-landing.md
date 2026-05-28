# Quill Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 `pages/quill-landing/` demo，品牌 Quill（AI 寫作工具），白底 teal 配色，含首頁 + 功能/定價/關於 3 個子頁，並整合至 DesignVault 主頁和下載系統。

**Architecture:** 沿用 DesignVault 靜態架構（Bootstrap 5.3.3 CDN + custom.css），在 `pages/quill-landing/` 新建完整 demo。CSS 以 `--ql-*` 自訂屬性為核心；子頁面以 `../custom.css` 引用。`.dv-bar` 作為 DesignVault 返回連結（`cleanHtml()` 已支援）。

**Tech Stack:** Bootstrap 5.3.3 (CDN), Google Fonts Inter, 純 HTML/CSS，無 JS 框架。

> **注意：** Task 6 修改 `js/main.js` 和 `index.html`，請在 ORBITAL 計劃全部完成後再執行 Task 6，以避免 merge conflict。

---

## File Map

| Action | File |
|---|---|
| Create | `pages/quill-landing/custom.css` |
| Create | `pages/quill-landing/index.html` |
| Create | `pages/quill-landing/features/index.html` |
| Create | `pages/quill-landing/pricing/index.html` |
| Create | `pages/quill-landing/about/index.html` |
| Modify | `js/main.js` (新增 quill-landing 條目) |
| Modify | `index.html` (新增第 5 張卡片，"四種" → "五種") |
| Modify | `CLAUDE.md` (新增 quill-landing 區段) |

---

### Task 1: 建立 `pages/quill-landing/custom.css`

**Files:**
- Create: `pages/quill-landing/custom.css`

- [ ] **Step 1: 建立目錄並寫入 custom.css**

```bash
mkdir -p pages/quill-landing/features pages/quill-landing/pricing pages/quill-landing/about
```

然後建立 `pages/quill-landing/custom.css`，內容如下：

```css
:root {
  --ql-bg: #ffffff;
  --ql-bg-alt: #f0fdfa;
  --ql-bg-dark: #0f172a;
  --ql-text: #0f172a;
  --ql-muted: #64748b;
  --ql-teal: #0d9488;
  --ql-blue: #0ea5e9;
  --ql-border: #e2e8f0;
  --ql-radius: 12px;
  --bs-body-bg: var(--ql-bg);
  --bs-body-color: var(--ql-text);
  --bs-border-radius: var(--ql-radius);
  --bs-body-font-family: 'Inter', sans-serif;
}

/* DesignVault 返回列 */
.dv-bar {
  display: block;
  background: #0f172a;
  color: #94a3b8;
  text-align: center;
  padding: 6px;
  font-size: 0.75rem;
  text-decoration: none;
  letter-spacing: 0.5px;
}
.dv-bar:hover { color: #fff; }

/* Navbar */
.ql-navbar { background: #fff; border-bottom: 1px solid var(--ql-border); }
.ql-navbar .navbar-brand { font-weight: 600; color: var(--ql-text); font-size: 1.2rem; }
.ql-navbar .nav-link { color: var(--ql-muted); font-size: 0.875rem; }
.ql-navbar .nav-link:hover,
.ql-navbar .nav-link.active { color: var(--ql-teal); }

/* Buttons */
.btn-ql {
  background: var(--ql-teal);
  color: #fff;
  border: none;
  border-radius: var(--ql-radius);
  padding: 10px 22px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s;
  cursor: pointer;
  font-family: inherit;
}
.btn-ql:hover { background: #0f766e; color: #fff; }

.btn-ql-outline {
  background: transparent;
  color: var(--ql-teal);
  border: 1.5px solid var(--ql-teal);
  border-radius: var(--ql-radius);
  padding: 10px 22px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  font-family: inherit;
}
.btn-ql-outline:hover { background: var(--ql-teal); color: #fff; }

.btn-ql-white {
  background: #fff;
  color: var(--ql-text);
  border: none;
  border-radius: var(--ql-radius);
  padding: 10px 22px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s;
  cursor: pointer;
  font-family: inherit;
}
.btn-ql-white:hover { background: var(--ql-bg-alt); color: var(--ql-text); }

/* Cards */
.feature-card {
  background: #fff;
  border: 1px solid var(--ql-border);
  border-radius: var(--ql-radius);
  padding: 1.5rem;
  height: 100%;
  transition: box-shadow 0.2s, transform 0.2s;
}
.feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }

.pricing-card {
  background: #fff;
  border: 1px solid var(--ql-border);
  border-radius: var(--ql-radius);
  padding: 2rem;
  height: 100%;
  transition: box-shadow 0.2s;
}
.pricing-card.featured { border: 2px solid var(--ql-teal); }
.pricing-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

.testimonial-card {
  background: #fff;
  border: 1px solid var(--ql-border);
  border-radius: var(--ql-radius);
  padding: 1.5rem;
  border-left: 4px solid var(--ql-teal);
  height: 100%;
}

/* Editor mockup */
.ql-editor-mock {
  background: #1e293b;
  border-radius: var(--ql-radius);
  padding: 1.5rem;
  color: #e2e8f0;
  font-size: 0.875rem;
  line-height: 1.7;
}
.mock-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.mock-toolbar span {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.75rem;
  color: #94a3b8;
}
.ql-ai-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(13,148,136,0.15);
  color: var(--ql-teal);
  border: 1px solid rgba(13,148,136,0.3);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.75rem;
}

/* Sections */
.ql-section-hero { background: var(--ql-bg); padding: 5rem 0; }
.ql-section-alt { background: var(--ql-bg-alt); padding: 4rem 0; }
.ql-section-dark { background: var(--ql-bg-dark); padding: 5rem 0; }

/* Hero */
.ql-hero-badge {
  display: inline-flex;
  align-items: center;
  background: var(--ql-bg-alt);
  border: 1px solid rgba(13,148,136,0.2);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 0.8rem;
  color: var(--ql-teal);
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.ql-hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ql-text);
}

/* Stats */
.ql-stat-number { font-size: 2rem; font-weight: 700; color: var(--ql-teal); display: block; }

/* Step */
.ql-step-number {
  width: 40px;
  height: 40px;
  background: var(--ql-teal);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 auto 1rem;
}

/* Page header */
.ql-page-header {
  background: var(--ql-bg-alt);
  padding: 4rem 0 3rem;
  text-align: center;
  border-bottom: 1px solid var(--ql-border);
}

/* Pricing */
.pricing-badge {
  background: var(--ql-teal);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 0.75rem;
}

/* Check list */
.ql-check-list { list-style: none; padding: 0; margin: 0; }
.ql-check-list li { padding: 0.35rem 0; font-size: 0.875rem; color: var(--ql-muted); }
.ql-check-list li::before { content: '✓ '; color: var(--ql-teal); font-weight: 600; }

/* Comparison table */
.ql-compare-table th { background: var(--ql-bg-alt); color: var(--ql-text); font-weight: 600; }
.ql-compare-table td,
.ql-compare-table th { vertical-align: middle; }

/* Accordion override */
.accordion-button:not(.collapsed) { color: var(--ql-teal); background: var(--ql-bg-alt); box-shadow: none; }
.accordion-button:focus { box-shadow: none; }

/* Footer */
.ql-footer { background: var(--ql-bg-dark); padding: 4rem 0 2rem; color: #94a3b8; }
.ql-footer h6 { color: #fff; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1rem; }
.ql-footer a { color: #94a3b8; text-decoration: none; font-size: 0.875rem; display: block; margin-bottom: 0.5rem; }
.ql-footer a:hover { color: var(--ql-teal); }

@media (max-width: 768px) {
  .ql-section-hero { padding: 3rem 0; }
  .ql-section-alt { padding: 2.5rem 0; }
  .ql-section-dark { padding: 3rem 0; }
  .ql-page-header { padding: 3rem 0 2rem; }
}
```

- [ ] **Step 2: Commit**

```bash
git add pages/quill-landing/custom.css
git commit -m "feat: add Quill landing page CSS with --ql-* variables and components"
```

---

### Task 2: 建立 `pages/quill-landing/index.html`

**Files:**
- Create: `pages/quill-landing/index.html`

- [ ] **Step 1: 建立首頁**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quill — AI 寫作工具</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="custom.css">
</head>
<body>
    <a href="../../index.html" class="dv-bar">← DesignVault</a>

    <nav class="navbar ql-navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand" href="./">Quill</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#qlNav" aria-controls="qlNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="qlNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="features/">功能</a></li>
                    <li class="nav-item"><a class="nav-link" href="pricing/">定價</a></li>
                    <li class="nav-item"><a class="nav-link" href="about/">關於</a></li>
                </ul>
                <a class="btn-ql ms-3" href="#">免費試用</a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="ql-section-hero text-center">
        <div class="container">
            <div class="ql-hero-badge">✦ AI 驅動 · 中英雙語</div>
            <h1 class="ql-hero-title mb-3">寫作，從此有了夥伴</h1>
            <p class="lead mb-4" style="color:var(--ql-muted);max-width:560px;margin-left:auto;margin-right:auto;">Quill 結合 AI 語意理解與即時建議，讓每一個字都精準到位。</p>
            <div class="d-flex flex-wrap gap-3 justify-content-center mb-5">
                <a href="#" class="btn-ql">免費開始</a>
                <a href="#" class="btn-ql-outline">觀看示範</a>
            </div>
            <div class="ql-editor-mock text-start mx-auto" style="max-width:640px;">
                <div class="mock-toolbar">
                    <span>B</span><span>I</span><span>U</span><span>—</span><span>✓ 自動儲存</span>
                </div>
                <p style="margin:0;">在這個快節奏的時代，每一篇文章都需要清晰的邏輯與感染人心的文字。<span style="background:rgba(14,165,233,0.2);color:#7dd3fc;border-radius:3px;padding:0 2px;">Quill 能夠協助你整理思路</span>，讓讀者在第一句話就被抓住。</p>
                <div class="ql-ai-chip">✦ AI 建議：「嘗試加入具體數據來強化說服力」</div>
            </div>
        </div>
    </section>

    <!-- Stats strip -->
    <section class="ql-section-alt">
        <div class="container">
            <div class="row g-4 text-center">
                <div class="col-12 col-md-4">
                    <span class="ql-stat-number">50,000+</span>
                    <span style="color:var(--ql-muted);font-size:0.875rem;">活躍用戶</span>
                </div>
                <div class="col-12 col-md-4">
                    <span class="ql-stat-number">4.9 ★</span>
                    <span style="color:var(--ql-muted);font-size:0.875rem;">用戶評分</span>
                </div>
                <div class="col-12 col-md-4">
                    <span class="ql-stat-number">200M+</span>
                    <span style="color:var(--ql-muted);font-size:0.875rem;">字數生成</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Features preview -->
    <section class="py-5">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold mb-2">核心功能</h2>
                <p style="color:var(--ql-muted);">專為寫作者打造的每一項工具</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">✍️</div>
                        <h5 class="fw-semibold mb-2">AI 即時建議</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">輸入同時給出改寫選項，幫你找到最精準的表達方式。</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">🌐</div>
                        <h5 class="fw-semibold mb-2">多語言支援</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">中英日韓無縫切換，支援 12 種語言即時翻譯與改寫。</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">👥</div>
                        <h5 class="fw-semibold mb-2">團隊協作</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">即時共編、留言與版本記錄，讓團隊協作不再混亂。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How it Works -->
    <section class="ql-section-alt">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold mb-2">三步驟開始寫作</h2>
                <p style="color:var(--ql-muted);">從靈感到成文，Quill 全程相伴</p>
            </div>
            <div class="row g-4 text-center">
                <div class="col-12 col-md-4">
                    <div class="ql-step-number">1</div>
                    <h6 class="fw-semibold mb-2">輸入主題或草稿</h6>
                    <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">可以是一個關鍵詞、一段想法，或已有的草稿。</p>
                </div>
                <div class="col-12 col-md-4">
                    <div class="ql-step-number">2</div>
                    <h6 class="fw-semibold mb-2">Quill AI 分析語意與風格</h6>
                    <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">自動識別文章風格，生成改寫選項與延伸建議。</p>
                </div>
                <div class="col-12 col-md-4">
                    <div class="ql-step-number">3</div>
                    <h6 class="fw-semibold mb-2">選擇建議，一鍵套用</h6>
                    <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">點選你喜歡的版本即套用，保留完整控制權。</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing preview -->
    <section class="py-5">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold mb-2">簡單透明的定價</h2>
                <p style="color:var(--ql-muted);">依需求選擇，隨時升降級</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="pricing-card">
                        <h5 class="fw-semibold mb-1">Free</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 0</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月</p>
                        <ul class="ql-check-list mb-4">
                            <li>每月 5,000 字</li>
                            <li>基本 AI 建議</li>
                            <li>1 種匯出格式</li>
                        </ul>
                        <a href="#" class="btn-ql-outline d-block text-center">免費開始</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="pricing-card featured">
                        <div class="pricing-badge">推薦</div>
                        <h5 class="fw-semibold mb-1">Pro</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 290</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月</p>
                        <ul class="ql-check-list mb-4">
                            <li>無限字數</li>
                            <li>進階風格分析</li>
                            <li>12 種語言</li>
                            <li>所有匯出格式</li>
                        </ul>
                        <a href="#" class="btn-ql d-block text-center">立即升級</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="pricing-card">
                        <h5 class="fw-semibold mb-1">Team</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 890</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月</p>
                        <ul class="ql-check-list mb-4">
                            <li>最多 10 人</li>
                            <li>即時協作共編</li>
                            <li>版本歷史</li>
                            <li>管理後台</li>
                        </ul>
                        <a href="#" class="btn-ql-outline d-block text-center">聯繫我們</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="ql-section-alt">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="fw-bold mb-2">用戶怎麼說</h2>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="testimonial-card">
                        <p style="color:var(--ql-text);font-size:0.9rem;margin-bottom:1rem;">「Quill 讓我的寫稿效率提升了 3 倍，AI 建議非常貼合我的風格。」</p>
                        <p class="mb-0 fw-semibold" style="font-size:0.875rem;">林雅雯</p>
                        <p class="mb-0" style="color:var(--ql-muted);font-size:0.8rem;">科技媒體主編</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="testimonial-card">
                        <p style="color:var(--ql-text);font-size:0.9rem;margin-bottom:1rem;">「多語言支援超實用，不再需要在不同工具間來回切換了。」</p>
                        <p class="mb-0 fw-semibold" style="font-size:0.875rem;">陳彥廷</p>
                        <p class="mb-0" style="color:var(--ql-muted);font-size:0.8rem;">品牌行銷經理</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="testimonial-card">
                        <p style="color:var(--ql-text);font-size:0.9rem;margin-bottom:1rem;">「團隊協作功能讓我們的內容生產流程更透明，版本控制超讚。」</p>
                        <p class="mb-0 fw-semibold" style="font-size:0.875rem;">王思穎</p>
                        <p class="mb-0" style="color:var(--ql-muted);font-size:0.8rem;">新創公司共同創辦人</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA dark -->
    <section class="ql-section-dark text-center">
        <div class="container">
            <h2 class="fw-bold mb-3" style="color:#fff;">立即體驗 Quill</h2>
            <p class="mb-4" style="color:#94a3b8;">免費方案無需信用卡，30 秒完成註冊。</p>
            <a href="#" class="btn-ql-white">免費開始</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="ql-footer">
        <div class="container">
            <div class="row g-4 mb-4">
                <div class="col-12 col-md-3">
                    <p class="fw-bold mb-2" style="color:#fff;font-size:1.1rem;">Quill</p>
                    <p style="font-size:0.8rem;">AI 驅動的寫作夥伴，讓每一個字都精準到位。</p>
                </div>
                <div class="col-12 col-md-3">
                    <h6>產品</h6>
                    <a href="features/">功能</a>
                    <a href="pricing/">定價</a>
                    <a href="#">更新日誌</a>
                </div>
                <div class="col-12 col-md-3">
                    <h6>資源</h6>
                    <a href="#">說明文件</a>
                    <a href="#">API</a>
                    <a href="#">部落格</a>
                </div>
                <div class="col-12 col-md-3">
                    <h6>法律</h6>
                    <a href="#">隱私政策</a>
                    <a href="#">服務條款</a>
                    <a href="#">Cookie</a>
                </div>
            </div>
            <hr style="border-color:rgba(255,255,255,0.1);">
            <p class="mb-0" style="font-size:0.8rem;">© 2026 Quill. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/quill-landing/index.html
git commit -m "feat: add Quill landing page homepage with hero, pricing preview and testimonials"
```

---

### Task 3: 建立 `pages/quill-landing/features/index.html`

**Files:**
- Create: `pages/quill-landing/features/index.html`

- [ ] **Step 1: 建立功能頁**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>功能 — Quill</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="dv-bar">← DesignVault</a>

    <nav class="navbar ql-navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand" href="../">Quill</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#qlNav" aria-controls="qlNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="qlNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link active" href="./">功能</a></li>
                    <li class="nav-item"><a class="nav-link" href="../pricing/">定價</a></li>
                    <li class="nav-item"><a class="nav-link" href="../about/">關於</a></li>
                </ul>
                <a class="btn-ql ms-3" href="#">免費試用</a>
            </div>
        </div>
    </nav>

    <div class="ql-page-header">
        <div class="container">
            <p style="color:var(--ql-teal);font-size:0.8rem;font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.5rem;">Features</p>
            <h1 class="fw-bold mb-2">完整功能</h1>
            <p style="color:var(--ql-muted);margin:0;">Everything You Need to Write Better</p>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">✍️</div>
                        <h5 class="fw-semibold mb-2">AI 即時建議</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">輸入即分析，提供改寫與延伸選項。無論是措辭還是結構，Quill 都能給出精準建議。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">🎭</div>
                        <h5 class="fw-semibold mb-2">風格偵測</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">自動識別正式、輕鬆、學術等文風，並根據文章脈絡調整建議基調。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">🌐</div>
                        <h5 class="fw-semibold mb-2">多語言翻譯</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">一鍵譯為 12 種語言，包含繁中、英、日、韓、法、德等主要語系。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">🕐</div>
                        <h5 class="fw-semibold mb-2">版本歷史</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">每次修改自動存檔，可隨時回溯任一版本，放心大膽地嘗試不同寫法。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">💬</div>
                        <h5 class="fw-semibold mb-2">協作留言</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">即時標記與回覆，團隊成員能在文章內直接討論，無縫溝通不跳平台。</p>
                    </div>
                </div>
                <div class="col">
                    <div class="feature-card">
                        <div class="mb-3" style="font-size:2rem;">📤</div>
                        <h5 class="fw-semibold mb-2">匯出格式</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">支援 PDF、DOCX、Markdown 等多種格式匯出，完美融入你的工作流程。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="ql-section-dark text-center">
        <div class="container">
            <h2 class="fw-bold mb-3" style="color:#fff;">準備好了嗎？</h2>
            <p class="mb-4" style="color:#94a3b8;">免費方案無需信用卡，立即開始你的寫作之旅。</p>
            <a href="../" class="btn-ql-white">免費開始</a>
        </div>
    </section>

    <footer class="ql-footer">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <p class="mb-0 fw-bold" style="color:#fff;">Quill</p>
                <p class="mb-0" style="font-size:0.8rem;">© 2026 Quill. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/quill-landing/features/index.html
git commit -m "feat: add Quill features page with 6 feature cards"
```

---

### Task 4: 建立 `pages/quill-landing/pricing/index.html`

**Files:**
- Create: `pages/quill-landing/pricing/index.html`

- [ ] **Step 1: 建立定價頁**（含視覺 toggle、方案卡片、功能對比表、FAQ accordion）

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>定價 — Quill</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="dv-bar">← DesignVault</a>

    <nav class="navbar ql-navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand" href="../">Quill</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#qlNav" aria-controls="qlNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="qlNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../features/">功能</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">定價</a></li>
                    <li class="nav-item"><a class="nav-link" href="../about/">關於</a></li>
                </ul>
                <a class="btn-ql ms-3" href="#">免費試用</a>
            </div>
        </div>
    </nav>

    <div class="ql-page-header">
        <div class="container">
            <p style="color:var(--ql-teal);font-size:0.8rem;font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.5rem;">Pricing</p>
            <h1 class="fw-bold mb-2">選擇方案</h1>
            <p style="color:var(--ql-muted);margin-bottom:1.25rem;">Simple, Transparent Pricing</p>
            <div class="d-flex align-items-center justify-content-center gap-3">
                <span style="font-size:0.875rem;color:var(--ql-text);font-weight:500;">月繳</span>
                <div class="form-check form-switch mb-0">
                    <input class="form-check-input" type="checkbox" style="width:2.5rem;height:1.25rem;cursor:pointer;" aria-label="切換年繳月繳">
                </div>
                <span style="font-size:0.875rem;color:var(--ql-muted);">年繳 <span style="background:var(--ql-teal);color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:10px;margin-left:4px;">省 20%</span></span>
            </div>
        </div>
    </div>

    <!-- Pricing cards -->
    <section class="py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="pricing-card">
                        <h5 class="fw-semibold mb-1">Free</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 0</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月，永久免費</p>
                        <ul class="ql-check-list mb-4">
                            <li>每月 5,000 字</li>
                            <li>基本 AI 建議（每日 10 次）</li>
                            <li>1 種語言</li>
                            <li>PDF 匯出</li>
                            <li>社群支援</li>
                        </ul>
                        <a href="#" class="btn-ql-outline d-block text-center">免費開始</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="pricing-card featured">
                        <div class="pricing-badge">推薦</div>
                        <h5 class="fw-semibold mb-1">Pro</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 290</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月</p>
                        <ul class="ql-check-list mb-4">
                            <li>無限字數</li>
                            <li>進階 AI 建議（無限次）</li>
                            <li>12 種語言</li>
                            <li>PDF、DOCX、Markdown 匯出</li>
                            <li>版本歷史（90 天）</li>
                            <li>優先電郵支援</li>
                        </ul>
                        <a href="#" class="btn-ql d-block text-center">立即升級</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="pricing-card">
                        <h5 class="fw-semibold mb-1">Team</h5>
                        <p class="display-6 fw-bold mb-0">NT$ 890</p>
                        <p style="color:var(--ql-muted);font-size:0.8rem;margin-bottom:1.5rem;">/ 月，最多 10 人</p>
                        <ul class="ql-check-list mb-4">
                            <li>所有 Pro 功能</li>
                            <li>最多 10 個成員</li>
                            <li>即時協作共編</li>
                            <li>協作留言</li>
                            <li>無限版本歷史</li>
                            <li>管理後台</li>
                            <li>專屬客服</li>
                        </ul>
                        <a href="#" class="btn-ql-outline d-block text-center">聯繫我們</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Comparison table -->
    <section class="ql-section-alt">
        <div class="container">
            <h2 class="fw-bold text-center mb-4">功能對比</h2>
            <div class="table-responsive">
                <table class="table table-bordered ql-compare-table">
                    <thead>
                        <tr>
                            <th style="width:40%;">功能</th>
                            <th class="text-center">Free</th>
                            <th class="text-center" style="color:var(--ql-teal);">Pro</th>
                            <th class="text-center">Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>字數限制</td>
                            <td class="text-center" style="color:var(--ql-muted);font-size:0.875rem;">5,000 字/月</td>
                            <td class="text-center" style="color:var(--ql-teal);">無限</td>
                            <td class="text-center" style="color:var(--ql-teal);">無限</td>
                        </tr>
                        <tr>
                            <td>AI 建議次數</td>
                            <td class="text-center" style="color:var(--ql-muted);font-size:0.875rem;">10 次/天</td>
                            <td class="text-center" style="color:var(--ql-teal);">無限</td>
                            <td class="text-center" style="color:var(--ql-teal);">無限</td>
                        </tr>
                        <tr>
                            <td>支援語言數</td>
                            <td class="text-center">1</td>
                            <td class="text-center" style="color:var(--ql-teal);">12</td>
                            <td class="text-center" style="color:var(--ql-teal);">12</td>
                        </tr>
                        <tr>
                            <td>協作人數</td>
                            <td class="text-center">—</td>
                            <td class="text-center">—</td>
                            <td class="text-center" style="color:var(--ql-teal);">最多 10 人</td>
                        </tr>
                        <tr>
                            <td>版本歷史</td>
                            <td class="text-center">—</td>
                            <td class="text-center">90 天</td>
                            <td class="text-center" style="color:var(--ql-teal);">無限</td>
                        </tr>
                        <tr>
                            <td>客服等級</td>
                            <td class="text-center" style="font-size:0.875rem;">社群</td>
                            <td class="text-center" style="font-size:0.875rem;">優先電郵</td>
                            <td class="text-center" style="color:var(--ql-teal);font-size:0.875rem;">專屬客服</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-5">
        <div class="container" style="max-width:720px;">
            <h2 class="fw-bold text-center mb-4">常見問題</h2>
            <div class="accordion" id="faqAccordion">
                <div class="accordion-item border mb-3" style="border-radius:var(--ql-radius);overflow:hidden;">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
                            免費方案包含什麼？
                        </button>
                    </h2>
                    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div class="accordion-body" style="color:var(--ql-muted);font-size:0.875rem;">
                            免費方案提供每月 5,000 字的 AI 輔助寫作，基本 AI 建議（每日 10 次），以及 PDF 格式匯出功能，永久免費、無需信用卡。
                        </div>
                    </div>
                </div>
                <div class="accordion-item border mb-3" style="border-radius:var(--ql-radius);overflow:hidden;">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                            可以隨時取消嗎？
                        </button>
                    </h2>
                    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body" style="color:var(--ql-muted);font-size:0.875rem;">
                            可以。你可以在任何時候取消訂閱，當前週期結束後不會再扣款，且不需要填寫任何理由。
                        </div>
                    </div>
                </div>
                <div class="accordion-item border mb-3" style="border-radius:var(--ql-radius);overflow:hidden;">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                            支援哪些瀏覽器？
                        </button>
                    </h2>
                    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body" style="color:var(--ql-muted);font-size:0.875rem;">
                            Quill 支援所有主流現代瀏覽器，包含 Chrome、Firefox、Safari、Edge 的最新版本。建議使用 Chrome 或 Edge 以獲得最佳體驗。
                        </div>
                    </div>
                </div>
                <div class="accordion-item border" style="border-radius:var(--ql-radius);overflow:hidden;">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                            資料安全性如何保障？
                        </button>
                    </h2>
                    <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body" style="color:var(--ql-muted);font-size:0.875rem;">
                            所有傳輸均採用 TLS 加密，靜態資料以 AES-256 加密儲存於符合 SOC 2 認證的伺服器。你的內容不會用於模型訓練。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="ql-footer">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <p class="mb-0 fw-bold" style="color:#fff;">Quill</p>
                <p class="mb-0" style="font-size:0.8rem;">© 2026 Quill. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/quill-landing/pricing/index.html
git commit -m "feat: add Quill pricing page with toggle, comparison table and FAQ accordion"
```

---

### Task 5: 建立 `pages/quill-landing/about/index.html`

**Files:**
- Create: `pages/quill-landing/about/index.html`

- [ ] **Step 1: 建立關於頁**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>關於 — Quill</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../custom.css">
</head>
<body>
    <a href="../../../index.html" class="dv-bar">← DesignVault</a>

    <nav class="navbar ql-navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand" href="../">Quill</a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#qlNav" aria-controls="qlNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="qlNav">
                <ul class="navbar-nav ms-auto gap-2">
                    <li class="nav-item"><a class="nav-link" href="../features/">功能</a></li>
                    <li class="nav-item"><a class="nav-link" href="../pricing/">定價</a></li>
                    <li class="nav-item"><a class="nav-link active" href="./">關於</a></li>
                </ul>
                <a class="btn-ql ms-3" href="#">免費試用</a>
            </div>
        </div>
    </nav>

    <div class="ql-page-header">
        <div class="container">
            <p style="color:var(--ql-teal);font-size:0.8rem;font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.5rem;">About Us</p>
            <h1 class="fw-bold mb-2">關於 Quill</h1>
            <p style="color:var(--ql-muted);margin:0;">Our Story</p>
        </div>
    </div>

    <!-- Brand story -->
    <section class="py-5">
        <div class="container">
            <div class="row g-5 align-items-start">
                <div class="col-12 col-lg-7">
                    <h2 class="fw-bold mb-4">讓每個人都能寫出好文章</h2>
                    <p style="color:var(--ql-muted);line-height:1.8;">Quill 成立於 2024 年，由一群熱愛文字的工程師與設計師組成。我們相信，寫作不應該是少數人的特權。透過 AI 技術，我們希望讓每一個有想法的人，都能把心中所想清晰地表達出來。</p>
                    <p style="color:var(--ql-muted);line-height:1.8;">從部落格到商業提案，從社群貼文到學術報告，Quill 理解每種寫作場景的需求，並在適當的時機給予最貼切的建議，而非取代人類的創造力。</p>
                    <blockquote class="mt-4 ps-4" style="border-left:4px solid var(--ql-teal);color:var(--ql-text);font-style:italic;">
                        「我們不是要替你寫作，而是要讓你寫得更好。」
                    </blockquote>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="feature-card text-center">
                                <span class="ql-stat-number">50,000+</span>
                                <span style="color:var(--ql-muted);font-size:0.8rem;">活躍用戶</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="feature-card text-center">
                                <span class="ql-stat-number">12</span>
                                <span style="color:var(--ql-muted);font-size:0.8rem;">支援語言</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="feature-card text-center">
                                <span class="ql-stat-number">2024</span>
                                <span style="color:var(--ql-muted);font-size:0.8rem;">成立年份</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="feature-card text-center">
                                <span class="ql-stat-number">200M+</span>
                                <span style="color:var(--ql-muted);font-size:0.8rem;">字數生成</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Core values -->
    <section class="ql-section-alt">
        <div class="container">
            <h2 class="fw-bold text-center mb-5">核心價值</h2>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="feature-card text-center">
                        <div class="mb-3" style="font-size:2.5rem;">🎯</div>
                        <h5 class="fw-semibold mb-2">易用性</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">零學習曲線，開箱即用。不需要教學影片，你直覺就會知道怎麼用。</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="feature-card text-center">
                        <div class="mb-3" style="font-size:2.5rem;">🔒</div>
                        <h5 class="fw-semibold mb-2">隱私</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">你的內容永遠屬於你。我們不會將用戶內容用於模型訓練，承諾零數據出售。</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="feature-card text-center">
                        <div class="mb-3" style="font-size:2.5rem;">🚀</div>
                        <h5 class="fw-semibold mb-2">持續進化</h5>
                        <p style="color:var(--ql-muted);font-size:0.875rem;margin:0;">每兩週更新一次，根據用戶回饋持續改進。你的建議直接影響產品方向。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section class="py-5">
        <div class="container text-center">
            <h2 class="fw-bold mb-3">聯繫我們</h2>
            <p style="color:var(--ql-muted);">有任何問題或建議，歡迎與我們聯繫。</p>
            <div class="d-flex flex-wrap gap-3 justify-content-center mt-4">
                <a href="mailto:hello@quill.ai" class="btn-ql-outline">✉️ hello@quill.ai</a>
                <a href="#" class="btn-ql-outline">𝕏 Twitter</a>
                <a href="#" class="btn-ql-outline">💼 LinkedIn</a>
            </div>
        </div>
    </section>

    <footer class="ql-footer">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <p class="mb-0 fw-bold" style="color:#fff;">Quill</p>
                <p class="mb-0" style="font-size:0.8rem;">© 2026 Quill. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/quill-landing/about/index.html
git commit -m "feat: add Quill about page with brand story, stats and core values"
```

---

### Task 6: 整合至 DesignVault 主頁與下載系統

> **前置條件：** 確認 ORBITAL 計劃所有 6 個 tasks 已完成（`js/main.js` 和 `index.html` 無 uncommitted changes）。

**Files:**
- Modify: `js/main.js` (新增 quill-landing 條目)
- Modify: `index.html` (新增 Quill 卡片；更新 boutique-brand 和 space-scifi 為 border-bottom；"四種" → "五種")
- Modify: `CLAUDE.md` (新增 Quill Landing Page 區段)

- [ ] **Step 1: 在 `js/main.js` 的 DEMOS 物件最後一個條目後新增 quill-landing**

在 `space-scifi` 條目結尾的 `}` 後（第 45 行附近），也就是 `};` 的前一行，新增：

```js
  'quill-landing': {
    folder: 'quill-template',
    files: [
      ['pages/quill-landing/custom.css',           'custom.css'],
      ['pages/quill-landing/index.html',            'index.html'],
      ['pages/quill-landing/features/index.html',   'features/index.html'],
      ['pages/quill-landing/pricing/index.html',    'pricing/index.html'],
      ['pages/quill-landing/about/index.html',      'about/index.html'],
    ]
  }
```

修改後 `js/main.js` 的 DEMOS 結尾應該是：

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
  },
  'quill-landing': {
    folder: 'quill-template',
    files: [
      ['pages/quill-landing/custom.css',           'custom.css'],
      ['pages/quill-landing/index.html',            'index.html'],
      ['pages/quill-landing/features/index.html',   'features/index.html'],
      ['pages/quill-landing/pricing/index.html',    'pricing/index.html'],
      ['pages/quill-landing/about/index.html',      'about/index.html'],
    ]
  }
};
```

- [ ] **Step 2: 在 `index.html` 進行三項修改**

**修改 A** — 第 26 行，將 `四種不同情境，四種獨特風格` 改為 `五種不同情境，五種獨特風格`。

**修改 B** — 在 space-scifi card（`data-demo="space-scifi"` 的 div）加上 `border-bottom` class，讓它與下方新增的 Quill 卡片有視覺分隔線：

將：
```html
<div class="col-12 col-md-6" data-demo="space-scifi">
```
改為：
```html
<div class="col-12 col-md-6 border-bottom" data-demo="space-scifi">
```

同時，boutique-brand card 也需要加 `border-bottom`，將：
```html
<div class="col-12 col-md-6 border-end" data-demo="boutique-brand">
```
改為：
```html
<div class="col-12 col-md-6 border-end border-bottom" data-demo="boutique-brand">
```

**修改 C** — 在 space-scifi card 的 `</div>` 後（第 92 行後）加入 Quill 卡片：

```html
                    <div class="col-12 col-md-6 border-end" data-demo="quill-landing">
                        <div class="dv-preview">
                            <iframe class="dv-frame" src="pages/quill-landing/index.html" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
                        </div>
                        <div class="p-4 d-flex flex-column">
                            <span class="text-uppercase small text-muted mb-2" style="letter-spacing:1.2px">Landing Page</span>
                            <h3 class="fs-6 fw-normal mb-2" style="letter-spacing:-0.2px">AI 寫作工具行銷頁</h3>
                            <p class="small text-muted flex-grow-1" style="line-height:1.65">白底清爽 teal 配色，含定價、功能、關於子頁</p>
                            <div class="d-flex gap-2 mt-auto" style="margin-top:20px">
                                <a href="pages/quill-landing/index.html" class="btn btn-outline-dark btn-sm flex-fill">前往範例</a>
                                <button class="btn btn-dark btn-sm flex-fill btn-dl" onclick="downloadTemplate('quill-landing')">下載模板</button>
                            </div>
                        </div>
                    </div>
```

- [ ] **Step 3: 更新 `index.html` 快取版本字串**

將 `js/main.js?v=20260528` 更新為今天日期的版本字串（例如 `js/main.js?v=20260528`，已是最新則不需更改）。

- [ ] **Step 4: 在 `CLAUDE.md` 的 Demo Pages 區段新增 Quill 說明**

在 `### 4. Space Sci-Fi` 段落後新增：

```markdown
### 5. Quill Landing Page (`pages/quill-landing/`)

- Brand: **Quill** · 3 subpages: features, pricing, about
- DesignVault back link class: `.dv-bar` (strip target for `cleanHtml()`)
- Nav: Bootstrap `navbar-expand-lg sticky-top` with `.ql-navbar` class
- Pricing page has a visual billing toggle (pure CSS, no JS price switching)
- Pricing page uses Bootstrap JS accordion for FAQ (`data-bs-toggle="collapse"`)
- CSS variables: `--ql-teal: #0d9488`, `--ql-blue: #0ea5e9`, `--ql-bg-alt: #f0fdfa`
```

- [ ] **Step 5: Commit**

```bash
git add js/main.js index.html CLAUDE.md
git commit -m "feat: integrate Quill landing page into DesignVault index and download system"
```
