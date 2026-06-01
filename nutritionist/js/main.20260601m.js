'use strict';

if (new URLSearchParams(window.location.search).has('shot')) {
  document.body.classList.add('screenshot-mode');
}

const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const progressBar = document.querySelector('.scroll-progress');

function updateScrollState() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  nav?.classList.toggle('scrolled', scrolled > 16);
  if (progressBar) progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

navBurger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navBurger.classList.toggle('active', isOpen);
  navBurger.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navBurger?.classList.remove('active');
    navBurger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('.service-card__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const select = document.getElementById('fieldService');
    const service = btn.dataset.service;
    if (!select || !service) return;

    for (const option of select.options) {
      if (option.value === service) {
        option.selected = true;
        break;
      }
    }
  });
});

document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const body = trigger.nextElementSibling;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion__item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion__trigger')?.setAttribute('aria-expanded', 'false');
      openItem.querySelector('.accordion__body')?.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  });
});

document.querySelectorAll('.magnetic, .btn').forEach((item) => {
  item.addEventListener('mousemove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
    item.style.setProperty('--mx', `${x}px`);
    item.style.setProperty('--my', `${y}px`);
  });

  item.addEventListener('mouseleave', () => {
    item.style.setProperty('--mx', '0px');
    item.style.setProperty('--my', '0px');
  });
});

document.querySelectorAll('[data-tilt]').forEach((item) => {
  item.addEventListener('mousemove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    item.style.setProperty('--ry', `${x * 4}deg`);
    item.style.setProperty('--rx', `${y * -3}deg`);
  });

  item.addEventListener('mouseleave', () => {
    item.style.setProperty('--rx', '0deg');
    item.style.setProperty('--ry', '0deg');
  });
});

const modal = document.getElementById('privacyModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openModal() {
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modalClose?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

document.getElementById('openPrivacy')?.addEventListener('click', openModal);
document.getElementById('openPrivacyFooter')?.addEventListener('click', openModal);
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});
