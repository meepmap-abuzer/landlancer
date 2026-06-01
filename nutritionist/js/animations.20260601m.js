'use strict';

const isCoarseReveal = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
function getRevealThreshold() {
  return isCoarseReveal ? 0.08 : 0.18;
}
function getRevealRootMargin() {
  return isCoarseReveal ? "0px 0px -8% 0px" : "0px 0px -18% 0px";
}
function requestRevealClass(target, className) {
  if (target.classList.contains(className)) return;
  requestAnimationFrame(() => target.classList.add(className));
}
function isRevealReady(target) {
  const rect = target.getBoundingClientRect();
  return rect.top < window.innerHeight * (isCoarseReveal ? 0.9 : 0.78) && rect.bottom > (isCoarseReveal ? 32 : 64);
}

document.documentElement.classList.add('anim-ready');

const revealItems = document.querySelectorAll('.reveal, .reveal-card');
revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 95}ms`);
});

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains('visible')) return;
    const rect = item.getBoundingClientRect();
    if (isRevealReady(item)) {
      requestRevealClass(item, "visible");
    }
  });
}

if (!('IntersectionObserver' in window)) {
  revealItems.forEach((item) => requestRevealClass(item, "visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      requestRevealClass(entry.target, "visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: getRevealThreshold(), rootMargin: getRevealRootMargin() });

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
    requestRevealClass(stats, "visible");
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

