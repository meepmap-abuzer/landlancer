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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const teacherTextSelector = ".teacher-copy h3, .teacher-copy p, .teacher-copy li";

document.querySelectorAll(teacherTextSelector).forEach((node) => {
  const text = node.textContent.replace(/\s+/g, " ").trim();
  node.dataset.typingText = text;
  node.setAttribute("aria-label", text);
  node.textContent = "";
  node.classList.add("typing-text");
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeTeacherNode(node, speed) {
  const text = node.dataset.typingText || "";
  node.classList.add("is-typing");

  for (let index = 1; index <= text.length; index += 1) {
    node.textContent = text.slice(0, index);
    await wait(speed);
  }

  node.classList.remove("is-typing");
  node.classList.add("is-typed");
}

async function playTeacherTyping(root) {
  if (!root.matches?.(".teacher-story") || root.dataset.typed === "true") return;
  root.dataset.typed = "true";

  const nodes = Array.from(root.querySelectorAll(teacherTextSelector));
  if (prefersReducedMotion) {
    nodes.forEach((node) => {
      node.textContent = node.dataset.typingText || "";
      node.classList.add("is-typed");
    });
    return;
  }

  for (const node of nodes) {
    const speed = node.matches("h3") ? 18 : node.matches("li") ? 5 : 5;
    await typeTeacherNode(node, speed);
    await wait(node.matches("p") ? 52 : 28);
  }
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      requestRevealClass(entry.target, "is-visible");
      playTeacherTyping(entry.target);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: getRevealThreshold(), rootMargin: getRevealRootMargin() }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 120}ms`;
  revealObserver.observe(item);
});

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return;
    const rect = item.getBoundingClientRect();
    if (isRevealReady(item)) {
      requestRevealClass(item, "is-visible");
      playTeacherTyping(item);
    }
  });
}

window.addEventListener("load", () => window.setTimeout(revealVisibleNow, 120));
window.addEventListener("scroll", revealVisibleNow, { passive: true });
window.addEventListener("resize", revealVisibleNow);

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("menu-open") || false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a, .header-actions a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("menu-open");
    menuButton?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const numberFormatter = new Intl.NumberFormat("ru-RU");
const counters = document.querySelectorAll("[data-count]");

function animateCounter(node) {
  const target = Number(node.dataset.count || 0);
  const duration = 950;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = numberFormatter.format(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.55 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".button, .nav-cta, .login-link, .price-card button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.035}px, ${y * 0.05}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  const heroScene = document.querySelector(".hero-scene");
  const heroImage = heroScene?.querySelector("img");

  heroScene?.addEventListener("pointermove", (event) => {
    if (!heroImage) return;
    const rect = heroScene.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    heroImage.style.transform = `scale(1.025) translate(${x * -10}px, ${y * -8}px)`;
  });

  heroScene?.addEventListener("pointerleave", () => {
    if (heroImage) heroImage.style.transform = "";
  });
}

const planInput = document.querySelector("[data-plan-input]");

function selectPlan(plan) {
  if (!planInput) return;
  planInput.value = plan || "Консультация";
  document.querySelector("#request")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-plan]").forEach((item) => {
  item.addEventListener("click", () => selectPlan(item.dataset.plan));
});

const billingButtons = document.querySelectorAll("[data-billing]");
const priceCards = document.querySelectorAll(".price-card");
const priceNodes = document.querySelectorAll("[data-price-month]");

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.billing || "month";
    billingButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    priceCards.forEach((card) => {
      card.dataset.billing = mode;
    });
    priceNodes.forEach((node) => {
      node.textContent = mode === "course" ? node.dataset.priceCourse : node.dataset.priceMonth;
    });
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("is-open");
    });
    item?.classList.toggle("is-open");
  });
});

function setFieldError(form, name, message) {
  const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
  const error = form.querySelector(`[data-error-for="${name}"]`);
  if (!field || !error) return;
  field.classList.toggle("has-error", Boolean(message));
  error.textContent = message || "";
}

function normalizeFormValues(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  return {
    name: String(values.name || "").trim(),
    phone: String(values.phone || "").trim(),
    grade: String(values.grade || "").trim(),
    plan: String(values.plan || "").trim(),
  };
}

const form = document.querySelector("[data-lead-form]");
const statusNode = document.querySelector("[data-form-status]");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!statusNode) return;

  statusNode.textContent = "";
  const values = normalizeFormValues(form);
  const phoneDigits = values.phone.replace(/\D/g, "");
  const errors = {};

  if (values.name.length < 2) errors.name = "Укажите имя.";
  if (!/^\+?[0-9\s()-]{10,32}$/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Укажите корректный телефон.";
  }
  if (!values.grade) errors.grade = "Выберите класс.";

  ["name", "phone", "grade"].forEach((name) => setFieldError(form, name, errors[name]));

  if (Object.keys(errors).length) {
    statusNode.textContent = "Проверьте поля с подсказками выше.";
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const defaultText = button?.textContent || "Оставить заявку";
  if (button) {
    button.disabled = true;
    button.textContent = "Отправляем";
  }

  await new Promise((resolve) => setTimeout(resolve, 650));

  statusNode.textContent = `Заявка по формату "${values.plan || "Консультация"}" сохранена в демо-режиме.`;
  form.reset();
  if (planInput) planInput.value = "Консультация";

  if (button) {
    button.disabled = false;
    button.textContent = defaultText;
  }
});

