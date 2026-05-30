/* ============================================================
   APEX GYM — JS
   ============================================================ */

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.25, rootMargin: '0px 0px -26% 0px' });

// Stagger children within grids
document.querySelectorAll('.features__grid, .trainers__grid, .plans__grid, .hero__stats').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 130;
  });
});

reveals.forEach(el => revealObserver.observe(el));

function revealVisibleNow() {
  reveals.forEach((el) => {
    if (el.classList.contains('visible')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.72 && rect.bottom > 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('load', () => window.setTimeout(revealVisibleNow, 120));
window.addEventListener('scroll', revealVisibleNow, { passive: true });
window.addEventListener('resize', revealVisibleNow);

// ── Counter animation ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOut(progress) * target);
    el.textContent = value.toLocaleString('ru-RU');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('ru-RU');
  }
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll('.stat__num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// ── Plan toggle ──
const toggleBtns = document.querySelectorAll('.toggle-btn');
const amounts = document.querySelectorAll('.plan-card__amount');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const period = btn.dataset.period;

    amounts.forEach(amount => {
      amount.style.opacity = '0';
      amount.style.transform = 'translateY(8px)';
      setTimeout(() => {
        amount.textContent = parseInt(amount.dataset[period] || amount.dataset.month, 10).toLocaleString('ru-RU');
        amount.style.opacity = '1';
        amount.style.transform = 'translateY(0)';
      }, 180);
    });

    amounts.forEach(el => {
      el.style.transition = 'opacity .18s ease, transform .18s ease';
    });
  });
});

// ── Smooth nav links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Parallax glow on hero ──
const heroBg = document.querySelector('.hero');
if (heroBg) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const g1 = heroBg.querySelector('.hero__glow--1');
    const g2 = heroBg.querySelector('.hero__glow--2');
    if (g1) g1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    if (g2) g2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  }, { passive: true });
}

// ── Card pointer light ──
document.querySelectorAll('.feature-card, .schedule-card, .plan-card, .testi-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, { passive: true });
});

// ── Modal ──
const overlay      = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalForm    = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');
const modalPlanTag  = document.getElementById('modalPlanTag');
const modalTitle    = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const successDetails = document.getElementById('successDetails');

let selectedPlan  = null;
let selectedPrice = null;

// ── Plan selector inside modal ──
document.querySelectorAll('.plan-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.plan-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    selectedPlan  = opt.dataset.plan;
    selectedPrice = opt.dataset.price;
    opt.closest('.form-group').classList.remove('has-error');
  });
});

function preselectPlan(plan) {
  selectedPlan = null; selectedPrice = null;
  document.querySelectorAll('.plan-option').forEach(opt => {
    opt.classList.remove('selected');
    if (opt.dataset.plan === plan) {
      opt.classList.add('selected');
      selectedPlan  = opt.dataset.plan;
      selectedPrice = opt.dataset.price;
    }
  });
}

function openModal(plan) {
  const isFree = plan === 'Пробная неделя';
  modalPlanTag.textContent  = isFree ? 'Пробный доступ' : 'Запись на абонемент';
  modalTitle.textContent    = isFree ? 'Первая неделя бесплатно' : 'Оформление абонемента';
  modalSubtitle.textContent = 'Оставьте заявку — менеджер свяжется в течение 15 минут';

  preselectPlan(plan);
  modalForm.reset();
  modalForm.hidden    = false;
  modalSuccess.hidden = true;
  clearErrors();
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('fieldName').focus(), 320);
}

function closeModal() {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.plan));
});
modalClose.addEventListener('click', closeModal);
document.getElementById('modalSuccessClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Validation ──
const API_URL = '';

function showFormError(msg) {
  let el = document.getElementById('formSubmitError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'formSubmitError';
    el.className = 'form-submit-error';
    modalForm.querySelector('.modal__submit').insertAdjacentElement('beforebegin', el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 8000);
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
}
function setError(el) { el.closest('.form-group').classList.add('has-error'); }

function validatePhone(val) {
  const d = val.replace(/\D/g, '');
  return /^[78]\d{10}$/.test(d);
}
function validateTelegram(val) {
  if (!val) return true;
  return /^[a-zA-Z0-9_]{4,32}$/.test(val.replace(/^@/, ''));
}
function validateEmail(val) {
  if (!val) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
}

// ── Phone mask ──
document.getElementById('fieldPhone').addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '');
  if (!v.length) { this.value = ''; return; }
  if (v[0] === '8') v = '7' + v.slice(1);
  if (v[0] !== '7') v = '7' + v;
  v = v.slice(0, 11);
  let out = '+7';
  if (v.length > 1) out += ' (' + v.slice(1, 4);
  if (v.length >= 4) out += ') ' + v.slice(4, 7);
  if (v.length >= 7) out += '-' + v.slice(7, 9);
  if (v.length >= 9) out += '-' + v.slice(9, 11);
  this.value = out;
});

// ── Telegram mask ──
document.getElementById('fieldTelegram').addEventListener('input', function () {
  this.value = this.value.replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 32);
});

// ── Submit ──
const SEND_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
const SPIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;
document.head.insertAdjacentHTML('beforeend', '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>');

modalForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const nameEl     = document.getElementById('fieldName');
  const phoneEl    = document.getElementById('fieldPhone');
  const telegramEl = document.getElementById('fieldTelegram');
  const emailEl    = document.getElementById('fieldEmail');

  if (nameEl.value.trim().length < 2)       { setError(nameEl);     valid = false; }
  if (!validatePhone(phoneEl.value))         { setError(phoneEl);    valid = false; }
  if (!validateTelegram(telegramEl.value))   { setError(telegramEl); valid = false; }
  if (!validateEmail(emailEl.value))         { setError(emailEl);    valid = false; }
  if (!selectedPlan) {
    document.getElementById('planSelector').closest('.form-group').classList.add('has-error');
    document.getElementById('planSelector').scrollIntoView({ behavior: 'smooth', block: 'center' });
    valid = false;
  }
  if (!valid) return;

  const submitBtn = modalForm.querySelector('.modal__submit');
  submitBtn.innerHTML = SPIN_ICON + ' Отправляем...';
  submitBtn.disabled = true;

  const tg = telegramEl.value.trim();
  const payload = {
    name:     nameEl.value.trim(),
    phone:    phoneEl.value.trim(),
    telegram: tg ? '@' + tg : '',
    email:    emailEl.value.trim(),
    goal:     document.getElementById('fieldGoal').value,
    plan:     selectedPlan,
    price:    selectedPrice,
  };

  let submitOk = false;
  try {
    if (API_URL) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Server error');
      submitOk = true;
    }
  } catch (err) {
    submitOk = false;
  }

  submitBtn.innerHTML = SEND_ICON + ' Отправить заявку';
  submitBtn.disabled = false;

  // Карточка успеха
  const rows = [
    ['Имя',     payload.name],
    ['Телефон', payload.phone],
    payload.telegram ? ['Telegram', payload.telegram] : null,
    payload.email    ? ['Email',    payload.email]    : null,
    ['Тариф',   selectedPlan + ' — ' + selectedPrice],
    payload.goal     ? ['Цель',     payload.goal]     : null,
  ].filter(Boolean);

  successDetails.innerHTML = rows.map(([k, v]) =>
    `<div class="success-detail-row"><span>${k}</span><span>${v}</span></div>`
  ).join('');

  modalForm.hidden    = true;
  modalSuccess.hidden = false;
});

// ── Nav burger (mobile) ──
const burger  = document.getElementById('burger');
const navLinksEl = document.getElementById('navLinks');
if (burger && navLinksEl) {
  burger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.contains('nav__links--open');
    navLinksEl.classList.toggle('nav__links--open', !isOpen);
    burger.setAttribute('aria-expanded', String(!isOpen));
    // Анимируем полоски бургера
    burger.classList.toggle('burger--open', !isOpen);
  });

  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('nav__links--open');
      burger.classList.remove('burger--open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Focus trap в модалке ──
const modal = document.querySelector('.modal');
if (modal) {
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll(
      'button:not([disabled]), input, select, a[href], [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.closest('[hidden]'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

// ── Scroll to top ──
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
