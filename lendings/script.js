const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25, rootMargin: "0px 0px -26% 0px" }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 120}ms`;
  revealObserver.observe(item);
});

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return;
    const rect = item.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.72 && rect.bottom > 80;
    if (isInView) item.classList.add("is-visible");
  });
}

window.addEventListener("load", () => window.setTimeout(revealVisibleNow, 120));
window.addEventListener("hashchange", () => window.setTimeout(revealVisibleNow, 120));

let revealTicking = false;
function requestRevealCheck() {
  if (revealTicking) return;
  revealTicking = true;
  requestAnimationFrame(() => {
    revealTicking = false;
    revealVisibleNow();
  });
}

window.addEventListener("scroll", requestRevealCheck, { passive: true });
window.addEventListener("resize", requestRevealCheck);

const comparison = document.querySelector("[data-comparison]");
const comparisonRange = document.querySelector("[data-comparison-range]");

function setComparison(value) {
  const safeValue = Math.max(4, Math.min(96, Number(value)));
  comparison.style.setProperty("--split", `${safeValue}%`);
  comparison.style.setProperty("--split-num", safeValue);
  comparison.style.setProperty("--before-width", `${10000 / safeValue}%`);
}

if (comparison && comparisonRange) {
  setComparison(comparisonRange.value);
  comparisonRange.addEventListener("input", (event) => setComparison(event.target.value));
}

document.querySelectorAll("[data-parallax-card]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${x * 4}deg`);
    card.style.setProperty("--tilt-y", `${y * -4}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

const areaInput = document.querySelector("[data-area]");
const areaOutput = document.querySelector("[data-area-output]");
const estimateTotal = document.querySelector("[data-estimate-total]");
const estimateForm = document.querySelector("[data-estimate-form]");

function formatRub(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function updateEstimate() {
  const area = Number(areaInput.value);
  const checkedType = estimateForm.querySelector('input[name="type"]:checked');
  const rate = Number(checkedType.value);
  const minimum = rate > 170 ? 9800 : 4400;
  const total = Math.max(minimum, Math.round((area * rate) / 100) * 100);
  areaOutput.textContent = `${area} м2`;
  estimateTotal.textContent = formatRub(total);
}

if (estimateForm) {
  estimateForm.addEventListener("input", updateEstimate);
  updateEstimate();
}

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item").forEach((other) => other.classList.remove("is-open"));
    if (!wasOpen) item.classList.add("is-open");
  });
});

const requestForm = document.querySelector("[data-request-form]");
const statusNode = document.querySelector("[data-form-status]");
const API_BASE_URL = "";

function setError(form, name, message) {
  const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
  const error = form.querySelector(`[data-error-for="${name}"]`);
  if (!field || !error) return;
  field.classList.toggle("has-error", Boolean(message));
  error.textContent = message;
}

function validateRequest(form) {
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());
  const errors = {};

  if (!String(values.name || "").trim()) errors.name = "Укажите имя";
  if (!/^@?[a-zA-Z0-9_]{5,}$/.test(String(values.telegram || "").trim())) {
    errors.telegram = "Укажите Telegram от 5 символов";
  }
  if (!/^\+?[0-9\s()-]{10,}$/.test(String(values.phone || "").trim())) {
    errors.phone = "Укажите корректный телефон";
  }
  if (String(values.message || "").trim().length < 12) {
    errors.message = "Опишите задачу чуть подробнее";
  }

  ["name", "telegram", "phone", "message"].forEach((name) => setError(form, name, errors[name] || ""));
  return Object.keys(errors).length === 0;
}

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusNode.textContent = "";

    if (!validateRequest(requestForm)) {
      statusNode.textContent = "Проверьте поля с подсказками выше.";
      return;
    }

    const submitButton = requestForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Отправляем";

    const payload = Object.fromEntries(new FormData(requestForm).entries());

    try {
      statusNode.textContent = `?????? ??????????. ????? ? ???? ????????.`;
      requestForm.reset();
    } catch (error) {
      statusNode.textContent = `?????? ??????????. ????? ? ???? ????????.`;
      requestForm.reset();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Отправить заявку";
    }
  });
}
