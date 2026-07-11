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

const modal = document.querySelector("[data-modal]");
const modalFrame = document.querySelector("[data-modal-frame]");
const modalTitle = document.querySelector("[data-modal-title]");
const openFull = document.querySelector("[data-open-full]");

function openPreview(card) {
  modalTitle.textContent = card.dataset.title;
  modalFrame.src = card.dataset.url;
  openFull.href = card.dataset.url;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closePreview() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalFrame.src = "about:blank";
  document.body.classList.remove("modal-open");
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("visible"), index * 130);
        observer.unobserve(entry.target);
      });
    },
    { threshold: getRevealThreshold(), rootMargin: getRevealRootMargin() }
  );

  revealItems.forEach((item) => observer.observe(item));

  function revealVisibleNow() {
    revealItems.forEach((item) => {
      if (item.classList.contains("visible")) return;
      const rect = item.getBoundingClientRect();
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if ((isRevealReady(item)) || (nearBottom && rect.top < window.innerHeight + 260)) {
        requestRevealClass(item, "visible");
      }
    });
  }

  window.addEventListener("load", () => window.setTimeout(revealVisibleNow, 120));
  window.addEventListener("scroll", revealVisibleNow, { passive: true });
  window.addEventListener("resize", revealVisibleNow);
}

function setupMagnetic() {
  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
      item.style.setProperty("--mx", `${x}px`);
      item.style.setProperty("--my", `${y}px`);
    });

    item.addEventListener("mouseleave", () => {
      item.style.setProperty("--mx", "0px");
      item.style.setProperty("--my", "0px");
    });
  });
}

function setupTilt() {
  document.querySelectorAll("[data-tilt]").forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      item.style.setProperty("--tilt-x", `${x * 5}deg`);
      item.style.setProperty("--tilt-y", `${y * -4}deg`);
    });

    item.addEventListener("mouseleave", () => {
      item.style.setProperty("--tilt-x", "0deg");
      item.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function setupWorkTabs() {
  const tabs = document.querySelectorAll("[data-work-tab]");
  const panels = document.querySelectorAll("[data-work-panel]");
  if (!tabs.length || !panels.length) return;

  function activate(category) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.workTab === category;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.workPanel === category;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
      if (isActive) {
        panel.querySelectorAll(".reveal").forEach((item, index) => {
          window.setTimeout(() => requestRevealClass(item, "visible"), index * 55);
        });
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.workTab));
  });

  if (window.location.hash === "#work-products") {
    activate("products");
  }
}

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.dataset.url) return;
    window.location.href = card.dataset.url;
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!card.dataset.url) return;
    window.location.href = card.dataset.url;
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", closePreview);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closePreview();
});

setupReveal();
setupMagnetic();
setupTilt();
setupWorkTabs();

