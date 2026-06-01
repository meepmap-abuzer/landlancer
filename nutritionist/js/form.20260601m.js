'use strict';

const form = document.getElementById('contactForm');
if (!form) throw new Error('Form not found');

const fields = {
  name:    document.getElementById('fieldName'),
  phone:   document.getElementById('fieldPhone'),
  email:   document.getElementById('fieldEmail'),
  service: document.getElementById('fieldService'),
  source:  document.getElementById('fieldSource'),
  message: document.getElementById('fieldMessage'),
  consent: document.getElementById('fieldConsent'),
};
const errors = {
  name:    document.getElementById('errorName'),
  phone:   document.getElementById('errorPhone'),
  email:   document.getElementById('errorEmail'),
  consent: document.getElementById('errorConsent'),
};
const submitBtn  = document.getElementById('formSubmit');
const successBox = document.getElementById('formSuccess');
const errorGlobal = document.getElementById('formErrorGlobal');

// ===== PHONE MASK =====
fields.phone.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.startsWith('8')) val = '7' + val.slice(1);
  if (val.startsWith('7')) val = val.slice(0, 11);
  else val = val.slice(0, 11);

  let formatted = '';
  if (val.length > 0) formatted = '+7';
  if (val.length > 1) formatted += ' (' + val.slice(1, 4);
  if (val.length > 4) formatted += ') ' + val.slice(4, 7);
  if (val.length > 7) formatted += '-' + val.slice(7, 9);
  if (val.length > 9) formatted += '-' + val.slice(9, 11);

  e.target.value = formatted;
});

// ===== VALIDATION =====
function validateName(val) {
  if (!val.trim()) return 'Введите ваше имя';
  if (val.trim().length < 2) return 'Имя слишком короткое';
  return '';
}
function validatePhone(val) {
  const digits = val.replace(/\D/g, '');
  if (!val.trim()) return 'Введите номер телефона';
  if (digits.length !== 11) return 'Введите корректный номер (11 цифр)';
  return '';
}
function validateEmail(val) {
  if (!val.trim()) return 'Введите email';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(val)) return 'Введите корректный email';
  return '';
}

function showError(field, errorEl, msg) {
  errorEl.textContent = msg;
  if (msg) field.classList.add('error');
  else field.classList.remove('error');
}

// Live validation on blur
fields.name.addEventListener('blur', () => showError(fields.name, errors.name, validateName(fields.name.value)));
fields.phone.addEventListener('blur', () => showError(fields.phone, errors.phone, validatePhone(fields.phone.value)));
fields.email.addEventListener('blur', () => showError(fields.email, errors.email, validateEmail(fields.email.value)));

// Clear error on input
fields.name.addEventListener('input', () => { if (errors.name.textContent) showError(fields.name, errors.name, validateName(fields.name.value)); });
fields.email.addEventListener('input', () => { if (errors.email.textContent) showError(fields.email, errors.email, validateEmail(fields.email.value)); });

function validateAll() {
  const nameErr    = validateName(fields.name.value);
  const phoneErr   = validatePhone(fields.phone.value);
  const emailErr   = validateEmail(fields.email.value);
  const consentErr = fields.consent.checked ? '' : 'Необходимо согласие на обработку данных';

  showError(fields.name,    errors.name,    nameErr);
  showError(fields.phone,   errors.phone,   phoneErr);
  showError(fields.email,   errors.email,   emailErr);
  showError(fields.consent, errors.consent, consentErr);

  return !nameErr && !phoneErr && !emailErr && !consentErr;
}

// ===== SUBMIT =====
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorGlobal.hidden = true;

  if (!validateAll()) {
    const firstError = form.querySelector('.form__input.error, .form__select.error');
    firstError?.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add('loading');

  const payload = {
    name:    fields.name.value.trim(),
    phone:   fields.phone.value.trim(),
    email:   fields.email.value.trim(),
    service: fields.service.value || 'Не выбрано',
    source:  fields.source.value || 'Не указано',
    message: fields.message.value.trim(),
  };

  try {
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      form.hidden = true;
      successBox.hidden = false;
      successBox.style.opacity = '0';
      successBox.style.transition = 'opacity 0.4s';
      requestAnimationFrame(() => { successBox.style.opacity = '1'; });
    }, 300);
  } catch (err) {
    errorGlobal.textContent = err.message || '????????? ??????. ??????????, ?????????? ?????.';
    errorGlobal.hidden = false;
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  }
});
