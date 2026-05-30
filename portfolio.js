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
    { threshold: 0.25, rootMargin: "0px 0px -26% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));

  function revealVisibleNow() {
    revealItems.forEach((item) => {
      if (item.classList.contains("visible")) return;
      const rect = item.getBoundingClientRect();
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if ((rect.top < window.innerHeight * 0.72 && rect.bottom > 80) || (nearBottom && rect.top < window.innerHeight + 260)) {
        item.classList.add("visible");
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

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => openPreview(card));
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
