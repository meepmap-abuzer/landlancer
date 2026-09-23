(() => {
  const dialog = document.querySelector('.lightbox');
  let returnFocus;
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-zoom]');
    if (!button) return;
    if (!dialog) return;
    returnFocus = button;
    dialog.querySelector('img').src = button.dataset.zoom;
    dialog.querySelector('img').alt = button.dataset.caption;
    dialog.querySelector('p').textContent = button.dataset.caption;
    dialog.showModal();
  });
  if (dialog) {
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => returnFocus?.focus());
  }
  const tabs = [...document.querySelectorAll('[data-filter]')];
  const panel = document.getElementById('crm-rows');
  function selectTab(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel?.setAttribute('aria-labelledby', tab.id);
    document.querySelectorAll('.crm-row').forEach(row => { row.hidden = tab.dataset.filter !== 'all' && row.dataset.state !== tab.dataset.filter; });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs.at(-1);
      if (next) { event.preventDefault(); selectTab(next); next.focus(); }
    });
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const send = document.getElementById('run-flow');
  let timer;
  send?.addEventListener('click', () => {
    clearTimeout(timer);
    send.disabled = true;
    const cards = [...document.querySelectorAll('.flow-card')];
    const caption = document.querySelector('.flow-caption');
    const messages = ['Заявка отправлена', 'Заявка добавлена в CRM', 'Менеджер получил уведомление', 'Готово: весь путь заявки виден в системе'];
    let step = 0;
    function advance() {
      cards.forEach((card, i) => card.classList.toggle('is-active', i === step));
      caption.textContent = messages[step];
      if (step < cards.length - 1) { step++; timer = setTimeout(advance, reduced.matches ? 0 : 850); }
      else { send.disabled = false; send.textContent = 'Повторить'; }
    }
    advance();
  });
})();
