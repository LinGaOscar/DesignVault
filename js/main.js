const DEMOS = {
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
  'saas-dashboard': {
    folder: 'nexusflow-template',
    files: [
      ['pages/saas-dashboard/custom.css',           'custom.css'],
      ['pages/saas-dashboard/index.html',           'index.html'],
      ['pages/saas-dashboard/analytics/index.html', 'analytics/index.html'],
      ['pages/saas-dashboard/users/index.html',     'users/index.html'],
      ['pages/saas-dashboard/orders/index.html',    'orders/index.html'],
      ['pages/saas-dashboard/settings/index.html',  'settings/index.html'],
    ]
  },
  'boutique-brand': {
    folder: 'aurele-template',
    files: [
      ['pages/boutique-brand/custom.css',             'custom.css'],
      ['pages/boutique-brand/index.html',             'index.html'],
      ['pages/boutique-brand/story/index.html',       'story/index.html'],
      ['pages/boutique-brand/collections/index.html', 'collections/index.html'],
      ['pages/boutique-brand/works/index.html',       'works/index.html'],
      ['pages/boutique-brand/contact/index.html',     'contact/index.html'],
    ]
  },
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
      ['pages/quill-landing/custom.css',            'custom.css'],
      ['pages/quill-landing/index.html',            'index.html'],
      ['pages/quill-landing/features/index.html',   'features/index.html'],
      ['pages/quill-landing/pricing/index.html',    'pricing/index.html'],
      ['pages/quill-landing/about/index.html',      'about/index.html'],
    ]
  }
};

function cleanHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  // 移除 DesignVault 專屬導覽元素
  doc.querySelectorAll('.dv-bar, .dv-back, .designvault-link, .designvault-back').forEach(el => el.remove());
  // 保險起見：移除任何仍指向 DesignVault index 的連結
  doc.querySelectorAll('a[href*="../../index.html"], a[href*="../../../index.html"]').forEach(el => el.remove());
  return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
}

async function downloadTemplate(demoId) {
  const demo = DEMOS[demoId];
  const btn = document.querySelector(`[data-demo="${demoId}"] .btn-dl`);

  btn.textContent = '打包中…';
  btn.disabled = true;

  try {
    const zip = new JSZip();
    const folder = zip.folder(demo.folder);

    await Promise.all(demo.files.map(async ([src, dest]) => {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Failed to fetch ${src}: ${res.status}`);
      const html = await res.text();
      folder.file(dest, cleanHtml(html));
    }));

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: demo.folder + '.zip'
    });
    a.click();
    URL.revokeObjectURL(url);

    btn.textContent = '已下載 ✓';
    setTimeout(() => { btn.textContent = '下載模板'; btn.disabled = false; }, 2500);
  } catch {
    btn.textContent = '下載失敗，請重試';
    btn.disabled = false;
  }
}
