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

const revealItems = document.querySelectorAll(".reveal");
const introVideo = document.querySelector(".hero-intro-video");
let introFinished = false;
let introTitleShown = false;

function showIntroTitle() {
  if (introTitleShown) return;
  introTitleShown = true;
  document.body.classList.add("intro-title-visible");
  document.querySelector(".hero-copy")?.classList.add("is-visible");
}

function finishIntro() {
  if (introFinished) return;
  introFinished = true;
  showIntroTitle();
  document.body.classList.add("intro-revealing");
  document.body.classList.remove("intro-playing");
  document.querySelector(".hero-copy")?.classList.add("is-visible");

  window.setTimeout(() => {
    document.body.classList.add("intro-details-visible");
  }, 360);

  window.setTimeout(() => {
    document.body.classList.add("intro-actions-visible");
  }, 1080);

  window.setTimeout(() => {
    document.body.classList.add("intro-facts-visible");
    document.querySelectorAll(".hero [data-count]").forEach(animateCounter);
  }, 1780);

  window.setTimeout(revealVisibleNow, 2200);
}

if (introVideo) {
  const introRate = 2.15;
  let introTimers = [];
  let videoStarted = false;

  function scheduleIntro(delay, callback) {
    const timer = window.setTimeout(callback, delay);
    introTimers.push(timer);
    return timer;
  }

  function clearIntroTimers() {
    introTimers.forEach((timer) => window.clearTimeout(timer));
    introTimers = [];
  }

  function finishWithoutLateVideo() {
    if (introFinished) return;
    document.body.classList.add("video-fallback");
    try {
      introVideo.pause();
      introVideo.removeAttribute("src");
      introVideo.load();
    } catch (error) {
      // The intro can still reveal normally if a browser refuses the video.
    }
    finishIntro();
  }

  introVideo.playbackRate = introRate;
  introVideo.muted = true;
  introVideo.setAttribute("playsinline", "");
  introVideo.preload = "auto";

  introVideo.addEventListener("loadeddata", () => {
    document.body.classList.add("video-ready");
  });

  introVideo.addEventListener("playing", () => {
    videoStarted = true;
    document.body.classList.add("video-ready");
  });

  introVideo.addEventListener("loadedmetadata", () => {
    introVideo.playbackRate = introRate;
    if (Number.isFinite(introVideo.duration) && introVideo.duration > 0) {
      const visibleDuration = (introVideo.duration / introRate) * 1000;
      scheduleIntro(Math.max(900, visibleDuration * 0.68), showIntroTitle);
      scheduleIntro(visibleDuration + 620, finishIntro);
    }
  });

  introVideo.addEventListener("timeupdate", () => {
    if (!Number.isFinite(introVideo.duration) || introVideo.duration <= 0) return;
    if (introVideo.currentTime >= introVideo.duration * 0.68) {
      showIntroTitle();
    }
  });

  introVideo.addEventListener("ended", finishIntro, { once: true });
  introVideo.addEventListener("error", finishWithoutLateVideo, { once: true });

  scheduleIntro(3800, () => {
    if (!introTitleShown && videoStarted) showIntroTitle();
  });

  scheduleIntro(9200, () => {
    if (!introFinished && !videoStarted) finishWithoutLateVideo();
  });

  introVideo.play().catch(() => {
    clearIntroTimers();
    scheduleIntro(900, finishWithoutLateVideo);
  });
} else {
  finishIntro();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      requestRevealClass(entry.target, "is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: getRevealThreshold(), rootMargin: getRevealRootMargin() }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 125}ms`;
  revealObserver.observe(item);
});

function revealVisibleNow() {
  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return;
    const rect = item.getBoundingClientRect();
    if (isRevealReady(item)) {
      requestRevealClass(item, "is-visible");
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
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a, .header-phone").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const numberFormatter = new Intl.NumberFormat("ru-RU");
const counters = document.querySelectorAll("[data-count]");

function animateCounter(node) {
  if (node.dataset.counted === "true") return;
  node.dataset.counted = "true";
  const target = Number(node.dataset.count || 0);
  const duration = 900;
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

const plans = {
  studio: {
    title: "Студия с нишей под кабинет",
    text: "Для первого жилья или инвестиции: светлая кухня-гостиная, отдельная зона сна и глубокий шкаф у входа.",
    area: "39.4 м²",
    price: "от 9.8 млн",
    floor: "7-12",
    form: "Студия",
    rooms: {
      living: "Кухня-гостиная",
      kitchen: "Ниша кухни",
      bedroom: "Зона сна",
      bath: "Санузел",
      loggia: "Лоджия",
      entry: "Холл",
      extra: "Кабинет",
    },
  },
  one: {
    title: "Евро-двухкомнатная для пары",
    text: "Кухня-гостиная с двумя окнами, спальня во дворе и место под хранение без шкафов в проходах.",
    area: "54.7 м²",
    price: "от 13.6 млн",
    floor: "4-15",
    form: "1 спальня",
    rooms: {
      living: "Гостиная",
      kitchen: "Кухня",
      bedroom: "Спальня",
      bath: "Санузел",
      loggia: "Лоджия",
      entry: "Прихожая",
      extra: "Гардероб",
    },
  },
  two: {
    title: "Семейная квартира на две стороны",
    text: "Две спальни, мастер-санузел и гостиная, где можно собрать большой стол без перепланировки.",
    area: "76.2 м²",
    price: "от 18.9 млн",
    floor: "3-14",
    form: "2 спальни",
    rooms: {
      living: "Кухня-гостиная",
      kitchen: "Кухня",
      bedroom: "Спальня",
      bath: "Санузел",
      loggia: "Балкон",
      entry: "Холл",
      extra: "Детская",
    },
  },
  terrace: {
    title: "Апартамент с террасой",
    text: "Формат для тех, кто хочет собственное открытое пространство, вечерний свет и вид на закрытый сад.",
    area: "92.8 м²",
    price: "от 24.8 млн",
    floor: "15",
    form: "С террасой",
    rooms: {
      living: "Гостиная",
      kitchen: "Кухня",
      bedroom: "Спальня",
      bath: "Ванная",
      loggia: "Терраса",
      entry: "Холл",
      extra: "Мастер",
    },
  },
};

const planButtons = document.querySelectorAll("[data-plan]");
const planMap = document.querySelector("[data-plan-map]");
const planTitle = document.querySelector("[data-plan-title]");
const planText = document.querySelector("[data-plan-text]");
const planArea = document.querySelector("[data-plan-area]");
const planPrice = document.querySelector("[data-plan-price]");
const planFloor = document.querySelector("[data-plan-floor]");
const formPlan = document.querySelector("[data-form-plan]");
const roomNodes = document.querySelectorAll("[data-room]");

function selectPlan(key) {
  const plan = plans[key] || plans.studio;
  planButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.plan === key));
  if (planMap) planMap.dataset.planMap = key;
  if (planTitle) planTitle.textContent = plan.title;
  if (planText) planText.textContent = plan.text;
  if (planArea) planArea.textContent = plan.area;
  if (planPrice) planPrice.textContent = plan.price;
  if (planFloor) planFloor.textContent = plan.floor;
  if (formPlan) formPlan.value = plan.form;
  roomNodes.forEach((room) => {
    room.textContent = plan.rooms?.[room.dataset.room] || room.textContent;
  });
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => selectPlan(button.dataset.plan));
});

document.querySelector("[data-request-plan]")?.addEventListener("click", () => {
  document.querySelector("#request")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

const viewTabs = document.querySelectorAll("[data-view]");
const viewStage = document.querySelector("[data-view-stage]");
const viewImage = document.querySelector("[data-view-image]");
const viewTitle = document.querySelector("[data-view-title]");
const viewText = document.querySelector("[data-view-text]");

const views = {
  morning: {
    title: "Мягкий утренний свет",
    text: "светлые комнаты и спокойный двор без транзитного движения",
    src: "assets/view-morning.webp",
    alt: "Утренний двор и фасад дома Северный сад",
  },
  evening: {
    title: "Теплый вечерний фасад",
    text: "окна подсвечены, дорожки читаются, двор остается камерным",
    src: "assets/view-evening.webp",
    alt: "Вечерний двор и подсвеченный фасад дома Северный сад",
  },
};

viewTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view || "morning";
    viewTabs.forEach((item) => item.classList.toggle("is-active", item === button));
    if (viewStage) viewStage.dataset.viewStage = view;
    if (viewImage) {
      viewImage.src = views[view].src;
      viewImage.alt = views[view].alt;
    }
    if (viewTitle) viewTitle.textContent = views[view].title;
    if (viewText) viewText.textContent = views[view].text;
  });
});

const districtPins = document.querySelectorAll(".pin");

districtPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    districtPins.forEach((item) => item.classList.toggle("is-active", item === pin));
  });
});

const priceRange = document.querySelector("[data-price-range]");
const paymentRange = document.querySelector("[data-payment-range]");
const monthlyNode = document.querySelector("[data-monthly]");
const priceOutput = document.querySelector("[data-price-output]");
const paymentOutput = document.querySelector("[data-payment-output]");

function formatMillions(value) {
  return `${(value / 1000000).toLocaleString("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} млн ₽`;
}

function updateMortgage() {
  if (!priceRange || !paymentRange || !monthlyNode) return;
  const price = Number(priceRange.value);
  const payment = Math.min(Number(paymentRange.value), price - 800000);
  paymentRange.value = String(payment);
  if (priceOutput) priceOutput.textContent = formatMillions(price);
  if (paymentOutput) paymentOutput.textContent = formatMillions(payment);
  const principal = price - payment;
  const annualRate = 0.061;
  const months = 25 * 12;
  const monthlyRate = annualRate / 12;
  const monthly =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  monthlyNode.textContent = `${numberFormatter.format(Math.round(monthly / 100) * 100)} ₽`;
}

priceRange?.addEventListener("input", updateMortgage);
paymentRange?.addEventListener("input", updateMortgage);
updateMortgage();

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".button, .plan-controls button, .view-tabs button, .pin").forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.025}px, ${y * 0.035}px)`;
    });

    node.addEventListener("pointerleave", () => {
      node.style.transform = "";
    });
  });
}

function setError(form, name, message) {
  const error = form.querySelector(`[data-error-for="${name}"]`);
  const input = form.querySelector(`[name="${name}"]`);
  if (!error || !input) return;
  error.textContent = message || "";
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!formStatus) return;

  const values = Object.fromEntries(new FormData(leadForm).entries());
  const name = String(values.name || "").trim();
  const phone = String(values.phone || "").trim();
  const phoneDigits = phone.replace(/\D/g, "");
  const errors = {};

  if (name.length < 2) errors.name = "Укажите имя.";
  if (!/^\+?[0-9\s()-]{10,32}$/.test(phone) || phoneDigits.length < 10) {
    errors.phone = "Укажите корректный телефон.";
  }

  setError(leadForm, "name", errors.name);
  setError(leadForm, "phone", errors.phone);

  if (Object.keys(errors).length) {
    formStatus.textContent = "Проверьте поля выше.";
    return;
  }

  const button = leadForm.querySelector('button[type="submit"]');
  const defaultText = button?.textContent || "Получить подборку";
  if (button) {
    button.disabled = true;
    button.textContent = "Отправляем";
  }

  await new Promise((resolve) => setTimeout(resolve, 650));

  formStatus.textContent = "Заявка сохранена в демо-режиме. Подборка готовится.";
  leadForm.reset();
  if (formPlan) formPlan.value = plans.studio.form;

  if (button) {
    button.disabled = false;
    button.textContent = defaultText;
  }
});

