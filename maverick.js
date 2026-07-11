document.documentElement.classList.add("mav-js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector(".mav-header");
const heroVisual = document.querySelector(".mav-hero-visual");
const navLinks = [...document.querySelectorAll(".mav-nav a")];

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (heroVisual && !reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
  const resetTilt = () => {
    heroVisual.style.setProperty("--mav-tilt-x", "0deg");
    heroVisual.style.setProperty("--mav-tilt-y", "0deg");
  };

  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.setProperty("--mav-tilt-x", `${(-y * 2.8).toFixed(2)}deg`);
    heroVisual.style.setProperty("--mav-tilt-y", `${(x * 3.6).toFixed(2)}deg`);
  });
  heroVisual.addEventListener("pointerleave", resetTilt);
}

const animateItems = (items, keyframes, options = {}) => {
  items.forEach((item, index) => {
    const animation = item.animate(keyframes(index), {
      duration: options.duration ?? 720,
      delay: Math.min(index, options.delayCap ?? 8) * (options.stagger ?? 65),
      easing: options.easing ?? "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "both",
    });
    animation.finished.then(() => animation.cancel()).catch(() => {});
  });
};

const revealElement = (element) => {
  if (element.classList.contains("is-visible")) return;
  element.classList.add("is-visible");

  if (reducedMotion.matches) return;

  if (element.matches(".mav-loop-intro, .mav-product-heading, .mav-games-heading, .mav-admin-heading, .mav-backend-heading")) {
    animateItems(
      [...element.children],
      () => [
        { opacity: 0, transform: "translateY(34px)", filter: "blur(7px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
      ],
      { duration: 760, stagger: 90 },
    );
    return;
  }

  if (element.matches(".mav-loop-path")) {
    animateItems(
      [...element.children],
      (index) => [
        { opacity: 0, transform: `translateY(${24 + index * 3}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 620, stagger: 75 },
    );
    return;
  }

  if (element.matches(".mav-product-stage")) {
    animateItems(
      [...element.querySelectorAll(".mav-showcase-phone")],
      (index) => [
        { opacity: 0, translate: `0 ${90 + index * 12}px`, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, translate: "0 0", scale: 1, filter: "blur(0)" },
      ],
      { duration: 880, stagger: 95 },
    );
    return;
  }

  if (element.matches(".mav-game-world")) {
    element.animate(
      [
        { opacity: 0, clipPath: "inset(0 0 18% 0)", transform: "translateY(28px)" },
        { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
      ],
      { duration: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
    );
    return;
  }

  if (element.matches(".mav-admin-dashboard")) {
    element.animate(
      [
        { opacity: 0, transform: "perspective(1200px) rotateX(5deg) translateY(42px) scale(0.97)", filter: "blur(8px)" },
        { opacity: 1, transform: "perspective(1200px) rotateX(0) translateY(0) scale(1)", filter: "blur(0)" },
      ],
      { duration: 950, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
    );
    return;
  }

  if (element.matches(".mav-admin-mosaic, .mav-product-notes, .mav-invariants")) {
    animateItems(
      [...element.children],
      (index) => [
        { opacity: 0, transform: `translateY(${28 + (index % 2) * 14}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 690, stagger: 85 },
    );
    return;
  }

  if (element.matches(".mav-system-map")) {
    animateItems(
      [...element.querySelectorAll(".mav-system-node, .mav-system-core")],
      () => [
        { opacity: 0, scale: 0.92, filter: "blur(6px)" },
        { opacity: 1, scale: 1, filter: "blur(0)" },
      ],
      { duration: 720, stagger: 90 },
    );
    element.querySelectorAll(".mav-system-lines path").forEach((path, index) => {
      path.animate(
        [{ strokeDashoffset: 120 }, { strokeDashoffset: 0 }],
        { duration: 1100, delay: 220 + index * 90, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
      );
    });
    return;
  }

  element.animate(
    [
      { opacity: 0, transform: "translateY(26px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 680, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
  );
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealElement(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6%" },
);

document.querySelectorAll(".mav-reveal").forEach((element) => revealObserver.observe(element));

const trackedSections = [...document.querySelectorAll("#loop, #miniapp, #games, #admin")];
let navFrame = 0;

const updateActiveNav = () => {
  navFrame = 0;
  const marker = window.innerHeight * 0.36;
  const activeSection = trackedSections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  });
  navLinks.forEach((link) => {
    const isActive = Boolean(activeSection && link.hash === `#${activeSection.id}`);
    link.classList.toggle("is-active", isActive);
  });
};

const requestNavUpdate = () => {
  if (navFrame) return;
  navFrame = requestAnimationFrame(updateActiveNav);
};

updateActiveNav();
window.addEventListener("scroll", requestNavUpdate, { passive: true });
window.addEventListener("resize", requestNavUpdate);
