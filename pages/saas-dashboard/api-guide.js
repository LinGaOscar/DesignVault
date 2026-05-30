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
