/* DeedFlow — exit-intent popup
   Fires once per browser session when the cursor leaves toward the
   top of the viewport (the classic "reaching for the tab/back button"
   signal), after a short delay so it never interrupts someone who
   just landed. Self-contained: no dependency on runtime.js or any
   page's Component, so it survives page re-renders untouched. */
(function () {
  'use strict';

  var STORAGE_KEY = 'df_exit_shown';
  var ARM_DELAY_MS = 8000;

  if (sessionStorage.getItem(STORAGE_KEY)) return;

  var armed = false;
  var shown = false;
  setTimeout(function () { armed = true; }, ARM_DELAY_MS);

  function markShown() {
    shown = true;
    sessionStorage.setItem(STORAGE_KEY, '1');
    document.removeEventListener('mouseout', onMouseOut);
  }

  function onMouseOut(e) {
    if (!armed || shown) return;
    if (e.clientY > 0) return;
    if (e.relatedTarget) return;
    openModal();
  }

  document.addEventListener('mouseout', onMouseOut);

  var style = document.createElement('style');
  style.textContent = [
    '#df-exit-backdrop{position:fixed;inset:0;background:rgba(10,22,40,.55);display:flex;align-items:center;justify-content:center;padding:24px;z-index:9999;opacity:0;transition:opacity .2s ease;box-sizing:border-box}',
    '#df-exit-backdrop.on{opacity:1}',
    '#df-exit-card{background:#ffffff;border-radius:20px;max-width:420px;width:100%;padding:32px;box-shadow:0 1px 2px rgba(10,22,40,.06),0 30px 60px -20px rgba(10,22,40,.45);position:relative;transform:translateY(10px) scale(.98);transition:transform .2s ease;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;box-sizing:border-box}',
    '#df-exit-backdrop.on #df-exit-card{transform:translateY(0) scale(1)}',
    '#df-exit-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:10px;border:1px solid #e4e8ee;background:#ffffff;color:#0a1628;display:flex;align-items:center;justify-content:center;cursor:pointer}',
    '#df-exit-close:hover{border-color:#0a1628}',
    '#df-exit-eyebrow{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#c24700;display:block;margin-bottom:14px}',
    '#df-exit-title{font-size:24px;font-weight:800;letter-spacing:-.02em;color:#0a1628;margin:0 0 10px;line-height:1.2}',
    '#df-exit-body{font-size:15px;line-height:1.55;color:#475467;margin:0 0 24px}',
    '#df-exit-actions{display:flex;flex-direction:column;gap:10px}',
    '#df-exit-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#ff5f00;color:#0a1628;font-weight:700;font-size:15px;text-decoration:none;border:0;border-radius:12px;padding:13px 20px;min-height:44px;box-sizing:border-box;cursor:pointer;font-family:inherit}',
    '#df-exit-secondary{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:#475467;font-weight:600;font-size:14px;border:0;cursor:pointer;padding:6px;font-family:inherit}',
    '#df-exit-secondary:hover{color:#0a1628}'
  ].join('\n');
  document.head.appendChild(style);

  var backdrop = document.createElement('div');
  backdrop.id = 'df-exit-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'df-exit-title');
  backdrop.style.display = 'none';
  backdrop.innerHTML =
    '<div id="df-exit-card">' +
      '<button id="df-exit-close" aria-label="Close">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>' +
      '</button>' +
      '<span id="df-exit-eyebrow">Before you go</span>' +
      '<h2 id="df-exit-title">See it on your own inventory?</h2>' +
      '<p id="df-exit-body">Skip the self-serve trial — get a 15-minute walkthrough on your own towers, payment plan and partner slabs.</p>' +
      '<div id="df-exit-actions">' +
        '<a id="df-exit-primary" href="company.html#demo">Book a 15-min demo</a>' +
        '<button id="df-exit-secondary">No thanks, continue browsing</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);

  function openModal() {
    markShown();
    backdrop.style.display = 'flex';
    requestAnimationFrame(function () { backdrop.classList.add('on'); });
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    backdrop.classList.remove('on');
    document.removeEventListener('keydown', onKeydown);
    setTimeout(function () { backdrop.style.display = 'none'; }, 200);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });
  backdrop.querySelector('#df-exit-close').addEventListener('click', closeModal);
  backdrop.querySelector('#df-exit-secondary').addEventListener('click', closeModal);
})();
