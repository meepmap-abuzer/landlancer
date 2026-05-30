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
    if (rect.top < window.innerHeight * 0.72 && rect.bottom > 80) {
      item.classList.add("is-visible");
    }
  });
}

window.addEventListener("load", () => window.setTimeout(revealVisibleNow, 120));
window.addEventListener("scroll", revealVisibleNow, { passive: true });
window.addEventListener("resize", revealVisibleNow);

const statItems = document.querySelectorAll(".stat-number[data-count]");
const numberFormatter = new Intl.NumberFormat("ru-RU");

function animateStat(node) {
  const target = Number(node.dataset.count || 0);
  const duration = 900;
  const startedAt = performance.now();

  function tick(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = numberFormatter.format(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateStat(entry.target);
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

statItems.forEach((item) => statObserver.observe(item));

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("menu-open") || false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("menu-open");
    menuButton?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const finePointer = window.matchMedia("(pointer: fine)").matches;

if (finePointer) {
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.04}px, ${y * 0.06}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  document.querySelectorAll(".review-card, .artifact-card").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      },
      { passive: true }
    );
  });

  const buildBoard = document.querySelector(".build-board");
  buildBoard?.addEventListener(
    "pointermove",
    (event) => {
      const rect = buildBoard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      buildBoard.style.setProperty("--tilt-y", `${x * 5}deg`);
      buildBoard.style.setProperty("--tilt-x", `${y * -4}deg`);
    },
    { passive: true }
  );

  buildBoard?.addEventListener("pointerleave", () => {
    buildBoard.style.setProperty("--tilt-x", "0deg");
    buildBoard.style.setProperty("--tilt-y", "0deg");
  });
}

const compareTabs = [...document.querySelectorAll("[data-compare-target]")];
const compareStates = [...document.querySelectorAll("[data-compare-state]")];

compareTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.compareTarget;
    compareTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    compareStates.forEach((state) => state.classList.toggle("is-active", state.dataset.compareState === target));
  });
});

const moduleItems = [...document.querySelectorAll("[data-module]")];
const progressOrbit = document.querySelector(".progress-orbit");
const progressNumber = document.querySelector("[data-progress-number]");
const weeksNode = document.querySelector(".program-dashboard [data-weeks]");
const tasksNode = document.querySelector(".program-dashboard [data-tasks]");
const levelNode = document.querySelector(".program-dashboard [data-level]");
const panelText = document.querySelector("[data-panel-text]");
const chartLine = document.querySelector(".chart-line");
const chartPoints = document.querySelector(".chart-points");
const dashTabs = [...document.querySelectorAll(".dash-tab")];

let activeModule = moduleItems.find((item) => item.classList.contains("is-open")) || moduleItems[0];
let activeTab = "overview";

const tabCopy = {
  overview: (module) => {
    const name = module.querySelector(".module-head strong")?.textContent || "модуль";
    return `Сейчас в сборке: ${name.toLowerCase()}. Панель показывает темп, практику и общий прогресс выбранного узла.`;
  },
  skills: (module) => {
    const progress = Number(module.dataset.progress || 0);
    if (progress < 40) return "Собирается фундамент: синтаксис, тесты, инструменты и уверенная работа с Go-проектом.";
    if (progress < 75) return "Подключаются рабочие backend-навыки: архитектура, базы данных, API и контракты.";
    return "Фокус на production-мышлении: окружение, устойчивость, ревью и финальный репозиторий.";
  },
  project: (module) => {
    const progress = Number(module.dataset.progress || 0);
    if (progress < 40) return "Проект начинается с небольших задач, чтобы код был понятным, проверяемым и не расползался.";
    if (progress < 75) return "Проект растет в полноценный API: слои, база данных, Redis, валидация и документация.";
    return "Финальная сборка: Docker-окружение, README, архитектурные решения и подготовка к портфолио.";
  },
};

function animateChart() {
  if (!chartLine || !chartPoints) return;
  chartLine.classList.remove("is-animated");
  chartPoints.classList.remove("is-animated");
  void chartLine.getBoundingClientRect();
  chartLine.classList.add("is-animated");
  chartPoints.classList.add("is-animated");
}

function setDashboard(module) {
  if (!module) return;
  activeModule = module;
  const progress = Number(module.dataset.progress || 0);
  const weeks = module.dataset.weeks || "2";
  const tasks = module.dataset.tasks || "4";
  const level = module.dataset.level || "Junior";

  progressOrbit?.style.setProperty("--progress", progress);
  if (progressNumber) progressNumber.textContent = String(progress);
  if (weeksNode) weeksNode.textContent = weeks;
  if (tasksNode) tasksNode.textContent = tasks;
  if (levelNode) levelNode.textContent = level;
  if (panelText) panelText.textContent = tabCopy[activeTab](module);

  animateChart();
}

moduleItems.forEach((module) => {
  const button = module.querySelector(".module-head");
  button?.addEventListener("click", () => {
    moduleItems.forEach((item) => {
      const isCurrent = item === module;
      item.classList.toggle("is-open", isCurrent);
      item.querySelector(".module-head")?.setAttribute("aria-expanded", String(isCurrent));
    });
    setDashboard(module);
  });
});

dashTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeTab = tab.dataset.tab || "overview";
    dashTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    setDashboard(activeModule);
  });
});

setDashboard(activeModule);

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
    telegram: String(values.telegram || "").trim(),
    phone: String(values.phone || "").trim(),
    goal: String(values.goal || "").trim(),
  };
}

const form = document.querySelector("[data-form]");
const statusNode = document.querySelector("[data-status]");
const API_URL = "";

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!statusNode) return;

  statusNode.textContent = "";
  const values = normalizeFormValues(form);
  if (values.telegram && !values.telegram.startsWith("@")) {
    values.telegram = `@${values.telegram}`;
    const telegramInput = form.querySelector('[name="telegram"]');
    if (telegramInput) telegramInput.value = values.telegram;
  }

  const errors = {};
  if (values.name.length < 2) errors.name = "Укажите имя";
  if (!/^@[a-zA-Z0-9_]{5,32}$/.test(values.telegram)) {
    errors.telegram = "Username должен начинаться с @ и содержать 5-32 символа";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!/^\+?[0-9\s()-]{10,32}$/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Укажите корректный телефон: 10-15 цифр";
  }

  if (values.goal.length < 12) {
    errors.goal = "Опишите цель чуть подробнее";
  }

  ["name", "telegram", "phone", "goal"].forEach((name) => setFieldError(form, name, errors[name]));

  if (Object.keys(errors).length) {
    statusNode.textContent = "Проверьте поля с подсказками выше.";
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const defaultText = button?.dataset.defaultText || "Отправить заявку";
  if (button) {
    button.disabled = true;
    button.textContent = "Отправляем";
  }

  try {
    statusNode.textContent = `?????? ??????????. ?? ????? ???????? ? ????.`;
    form.reset();
  } catch (error) {
    statusNode.textContent = `?????? ??????????. ?? ????? ???????? ? ????.`;
    form.reset();
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = defaultText;
    }
  }
});
