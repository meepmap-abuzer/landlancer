const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header nav");
function closeMenu() {
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "Открыть меню");
  nav?.classList.remove("is-open");
}
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  nav.classList.toggle("is-open", open);
});
nav?.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) closeMenu();
});
const progress = document.querySelector(".reading-progress");
if (progress) {
  let scheduled = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    scheduled = false;
  };
  addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        requestAnimationFrame(update);
        scheduled = true;
      }
    },
    { passive: true },
  );
  addEventListener("resize", update);
  update();
}
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("enter");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".project-visual,.system-visual")
    .forEach((el) => observer.observe(el));
}
document.querySelectorAll('[data-demo="roulette"]').forEach((demo) => {
  const button = demo.querySelector(".spin-button"),
    track = demo.querySelector(".reel-track"),
    status = demo.querySelector(".demo-result");
  let round = 0;
  button.addEventListener("click", () => {
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = "Лента вращается…";
    const chosen = 15 + (round++ % 3),
      offset = chosen * 110 + 50;
    track.style.transition = "none";
    track.style.transform = "translateX(calc(50% - 170px))";
    const duration = reducedMotion.matches ? 0 : 2300;
    const animation = track.animate(
      [
        { transform: "translateX(calc(50% - 170px))" },
        { transform: `translateX(calc(50% - ${offset}px))` },
      ],
      { duration, easing: "cubic-bezier(.12,.75,.18,1)", fill: "forwards" },
    );
    animation.finished
      .then(() => {
        track.style.transform = `translateX(calc(50% - ${offset}px))`;
        animation.cancel();
        status.textContent = `В демо выпал ${["кристалл", "подарок", "звёздный приз"][chosen % 3]}`;
        button.innerHTML = 'Ещё раз <span aria-hidden="true">↻</span>';
        button.disabled = false;
      })
      .catch(() => {
        button.disabled = false;
        status.textContent = "Попробуйте ещё раз";
      });
  });
});
const petCategories = {
  found: {
    label: "Найдена собака",
    names: ["Узнаёте друга?", "Ждёт хозяина", "Поможем вернуться"],
    images: ["dog", "adopt", "lost"],
  },
  lost: {
    label: "Потерялась собака",
    names: ["Ищем Ричи", "Ищем Бусю", "Ищем Барни"],
    images: ["lost", "dog", "adopt"],
  },
  home: {
    label: "Ищет дом",
    names: ["Знакомьтесь, Лаки", "Это Мила", "Знакомьтесь, Бим"],
    images: ["adopt", "lost", "dog"],
  },
};
document.querySelectorAll('[data-demo="pets"]').forEach((demo) => {
  let category = "found";
  const render = (index) => {
    const data = petCategories[category];
    demo.querySelector(".pet-status").textContent = data.label;
    demo.querySelector(".pet-name").textContent = data.names[index];
    demo.querySelector(".pet-card img").src =
      `/assets/${data.images[index]}.webp`;
    demo.querySelector(".pet-info").textContent = [
      "Тихая улица · у сквера",
      "Улица Парковая · у дома",
      "Набережная · рядом с мостом",
    ][index];
    demo.querySelectorAll(".map-pin").forEach((p, i) => {
      p.classList.toggle("selected", i === index);
      p.setAttribute("aria-pressed", String(i === index));
    });
  };
  demo.querySelectorAll("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      demo.querySelectorAll("[data-filter]").forEach((b) => {
        b.classList.toggle("selected", b === button);
        b.setAttribute("aria-pressed", String(b === button));
      });
      render(0);
    }),
  );
  demo
    .querySelectorAll("[data-pet]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        render(Number(button.dataset.pet)),
      ),
    );
  render(0);
});
document.querySelectorAll('[data-demo="loyalty"]').forEach((demo) => {
  let step = 0;
  const button = demo.querySelector(".loyalty-action");
  button.addEventListener("click", () => {
    step = (step + 1) % 3;
    const states = [
      {
        points: "0",
        title: "Начнём с покупки",
        description: "Активируйте демонстрационный код.",
        action: "Активировать QR →",
        status: "Сценарий сброшен. Можно пройти ещё раз.",
      },
      {
        points: "250",
        title: "Покупка засчитана",
        description: "Можно обменять 250 баллов на награду.",
        action: "Обменять на награду →",
        status: "QR активирован. На демо-баланс начислено 250 баллов.",
      },
      {
        points: "0",
        title: "Награда ваша",
        description: "В демо выбран фирменный стикерпак.",
        action: "Пройти ещё раз ↻",
        status: "Списано 250 демо-баллов. Настоящий заказ не создаётся.",
      },
    ];
    const state = states[step];
    demo.querySelector(".points").textContent = state.points;
    demo.querySelector(".reward-title").textContent = state.title;
    demo.querySelector(".reward-description").textContent = state.description;
    button.textContent = state.action;
    demo.querySelector(".loyalty-status").textContent = state.status;
    demo
      .querySelectorAll(".loyalty-steps>span")
      .forEach((el, i) => el.classList.toggle("active", i <= step));
  });
});
document.querySelectorAll('[data-demo="card"]').forEach((demo) => {
  const button = demo.querySelector(".member-card");
  button.addEventListener("click", () => {
    const flipped = button.classList.toggle("is-flipped");
    button.setAttribute("aria-pressed", String(flipped));
    button.setAttribute(
      "aria-label",
      flipped
        ? "Перевернуть карту и показать баланс"
        : "Перевернуть карту и показать демо QR",
    );
    button
      .querySelector(".card-front")
      .setAttribute("aria-hidden", String(flipped));
    button
      .querySelector(".card-back")
      .setAttribute("aria-hidden", String(!flipped));
    demo.querySelector(".card-status").textContent = flipped
      ? "Демо QR — не для оплаты"
      : "Нажмите на карту";
  });
});

const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  let galleryLinks = [];
  let activeIndex = 0;
  let opener = null;
  const picture = lightbox.querySelector(".lightbox-image");
  const previous = lightbox.querySelector(".lightbox-prev");
  const next = lightbox.querySelector(".lightbox-next");

  function showScreen(index) {
    activeIndex = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[activeIndex];
    picture.src = link.href;
    picture.alt = link.querySelector("img").alt;
    lightbox.querySelector(".lightbox-title").textContent =
      link.dataset.caption;
    lightbox.querySelector(".lightbox-count").textContent =
      `${activeIndex + 1} / ${galleryLinks.length}`;
    lightbox.querySelector(".lightbox-original").href = link.href;
    previous.hidden = next.hidden = galleryLinks.length < 2;
  }

  const screenLinks = [...document.querySelectorAll("[data-lightbox]")];
  for (const link of screenLinks) {
    link.addEventListener("click", (event) => {
      // Preserve opening the original image in a new tab with modifier keys.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      opener = link;
      galleryLinks = screenLinks.filter(
        (item) => item.dataset.lightbox === link.dataset.lightbox,
      );
      showScreen(galleryLinks.indexOf(link));
      lightbox.showModal();
    });
  }
  previous.addEventListener("click", () => showScreen(activeIndex - 1));
  next.addEventListener("click", () => showScreen(activeIndex + 1));
  lightbox
    .querySelector(".lightbox-close")
    .addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target !== lightbox) return;
    const bounds = lightbox.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      lightbox.close();
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showScreen(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  lightbox.addEventListener("close", () =>
    opener?.focus({ preventScroll: true }),
  );
}
