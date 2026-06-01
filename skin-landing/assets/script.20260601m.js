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

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navBurger = document.querySelector('.nav__burger');

function closeMenu() {
  navBurger?.classList.remove('active');
  navLinks?.classList.remove('open');
  document.body.classList.remove('nav-open');
  navBurger?.setAttribute('aria-expanded', 'false');
}

navBurger?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  navBurger.classList.toggle('active', Boolean(open));
  document.body.classList.toggle('nav-open', Boolean(open));
  navBurger.setAttribute('aria-expanded', String(Boolean(open)));
});

document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const revealItems = document.querySelectorAll('.reveal, .reveal-card');
revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 95}ms`);
});

const supportsIntersectionObserver = typeof window.IntersectionObserver === 'function';

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains('visible')) return;
    const rect = item.getBoundingClientRect();
    if (isRevealReady(item)) {
      requestRevealClass(item, "visible");
    }
  });
}

if (!supportsIntersectionObserver) {
  revealItems.forEach((item) => requestRevealClass(item, "visible"));
} else {
  document.documentElement.classList.add('anim-ready');

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
  const duration = 820;
  const start = performance.now();

  function easeOut(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(progress) * target).toLocaleString('ru-RU') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const stats = document.querySelector('.hero__stats');
const statCounters = stats ? stats.querySelectorAll('[data-count]') : document.querySelectorAll('[data-count]');
statCounters.forEach((el) => {
  const suffix = el.dataset.suffix || '';
  el.textContent = `0${suffix}`;
});

let counted = false;
function startStats() {
  if (counted) return;
  counted = true;
  stats?.classList.add('stats-ready');
  window.setTimeout(() => {
    statCounters.forEach(animateCounter);
  }, 140);
}

if (stats && supportsIntersectionObserver) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || counted) return;
    startStats();
    counterObserver.disconnect();
  }, { threshold: 0.18, rootMargin: '0px 0px -4% 0px' });
  counterObserver.observe(stats);

  function startStatsIfVisible() {
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startStats();
    }
  }

  window.setTimeout(startStatsIfVisible, 260);
  window.addEventListener('load', () => window.setTimeout(startStatsIfVisible, 320));
} else {
  startStats();
}

const sections = document.querySelectorAll('section[id]');
const activeLinks = document.querySelectorAll('.nav__link');

if (supportsIntersectionObserver) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      activeLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.36 });

  sections.forEach((section) => activeObserver.observe(section));
}

document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const body = item?.querySelector('.accordion__body');
    const open = !item?.classList.contains('open');

    document.querySelectorAll('.accordion__item').forEach((accordionItem) => {
      accordionItem.classList.remove('open');
      accordionItem.querySelector('.accordion__body')?.classList.remove('open');
      accordionItem.querySelector('.accordion__trigger')?.setAttribute('aria-expanded', 'false');
    });

    if (open) {
      item?.classList.add('open');
      body?.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelectorAll('.magnetic, .btn').forEach((el) => {
  el.addEventListener('mousemove', (event) => {
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  });

  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  });
});

const appForm = document.getElementById('appForm');
const formWrap = document.getElementById('formWrap');
const successWrap = document.getElementById('successWrap');
const formError = document.getElementById('formError');
const submitButton = document.getElementById('subBtn');

function setFieldError(field, hasError) {
  document.querySelector(`[data-field="${field}"]`)?.classList.toggle('error', hasError);
}

function normalizeTelegram(value) {
  return value.replace(/^@+/, '').trim();
}

appForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
  const age = document.getElementById('fAge')?.value.trim() || '';
  const problem = document.getElementById('fProb')?.value.trim() || '';
  const telegram = normalizeTelegram(document.getElementById('fTg')?.value || '');

  const errors = {
    gender: !gender,
    age: !age || Number(age) < 10 || Number(age) > 99,
    problem: problem.length < 8,
    telegram: telegram.length < 2
  };

  Object.entries(errors).forEach(([field, hasError]) => setFieldError(field, hasError));
  formError?.classList.toggle('show', Object.values(errors).some(Boolean));

  if (Object.values(errors).some(Boolean)) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляем...';

  formWrap.style.display = 'none';
  successWrap.classList.add('show');
});

