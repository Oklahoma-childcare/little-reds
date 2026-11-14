(() => {
  function closeMenu() {
    const nav = document.querySelector('[data-menu-panel]');
    const btn = document.querySelector('[data-menu-toggle]');
    nav?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
  document.addEventListener('click', e => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest('[data-menu-toggle]');
    if (btn) {
      const nav = document.querySelector('[data-menu-panel]');
      const opened = !nav?.classList.contains('open');
      nav?.classList.toggle('open', opened);
      btn.setAttribute('aria-expanded', String(opened));
      document.body.classList.toggle('menu-open', opened);
      return;
    }
    if (t.closest('a[href]') || !t.closest('[data-menu-panel]')) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
  document.addEventListener('error', e => {
    const t = e.target;
    if (t instanceof HTMLImageElement && t.closest('.image-holder')) {
      t.hidden = true;
      t.closest('.image-holder')?.classList.add('missing-image');
    }
  }, true);
})();
