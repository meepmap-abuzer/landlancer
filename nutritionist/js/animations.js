'use strict';

document.documentElement.classList.add('anim-ready');

const revealItems = document.querySelectorAll('.reveal, .reveal-card');
revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 95}ms`);
});

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains('visible')) return;
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.72 && rect.bottom > 80) {
      item.classList.add('visible');
    }
  });
}

if (!('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -26% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

window.addEventListener('load', () => window.setTimeout(revealVisibleNow, 120));
window.addEventListener('scroll', revealVisibleNow, { passive: true });
window.addEventListener('resize', revealVisibleNow);

function animateCounter(el) {
  const target = Number.parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 780;
  const start = performance.now();

  function easeOut(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(progress) * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const stats = document.querySelector('.stats');
if (stats) {
  let counted = false;
  function startStats() {
    if (counted) return;
    counted = true;
    stats.classList.add('visible');
    stats.querySelectorAll('[data-count]').forEach(animateCounter);
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || counted) return;
    startStats();
  }, { threshold: 0.28 });
  observer.observe(stats);

  function startStatsIfVisible() {
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startStats();
    }
  }

  window.setTimeout(startStatsIfVisible, 220);
  window.addEventListener('load', () => window.setTimeout(startStatsIfVisible, 260));
}

const sections = document.querySelectorAll('section[id]');
const activeNavLinks = document.querySelectorAll('.nav__link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    activeNavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.36 });

sections.forEach((section) => activeObserver.observe(section));

const parallaxItems = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const offset = Math.min(window.scrollY * 0.035, 28);
  parallaxItems.forEach((item) => {
    item.style.setProperty('translate', `0 ${offset}px`);
  });
}, { passive: true });
