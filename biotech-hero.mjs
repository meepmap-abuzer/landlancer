const stage = document.querySelector('.biotech-stage');
if (stage) {
  const mount = stage.querySelector('.biotech-mount');
  const toggle = stage.querySelector('.biotech-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let disabled = reduced.matches;
  let visible = false;
  // Removing the embed releases its renderer while offscreen or paused.
  function sync() {
    const active = visible && !disabled && !document.hidden;
    if (active && !mount.firstChild) {
      const frame = document.createElement('iframe');
      frame.src = 'https://my.spline.design/biotech-OpiuGUCa88h9CbZq8RTMNfkg/';
      frame.title = 'Интерактивная 3D-сцена BioTech';
      frame.allow = 'fullscreen';
      mount.append(frame);
    } else if (!active) mount.replaceChildren();
    toggle.textContent = disabled ? 'Включить 3D' : 'Отключить 3D';
    toggle.setAttribute('aria-pressed', String(disabled));
  }
  toggle.addEventListener('click', () => { disabled = !disabled; sync(); });
  reduced.addEventListener('change', () => { disabled = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {rootMargin:'80px'}).observe(stage);
  sync();
}
