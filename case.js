document.documentElement.classList.add("case-js");

const genericAnimatedItems = document.querySelectorAll(
  [
    ".metric-card",
    ".case-nav",
    ".section-head",
    ".info-card",
    ".feature-card",
    ".flow-card",
    ".shot",
    ".tech-card",
    ".result-card",
    ".case-cta",
  ].join(","),
);

const giftRevealGroups = document.querySelectorAll(
  ".gift-page > .gift-card, .gift-page > .gift-final-cta",
);

const giftChildSelectors = [
  ".gift-problem-copy",
  ".gift-telegram-emblem",
  ".gift-section-head > *",
  ".gift-module-row > *",
  ".gift-game-grid > *",
  ".gift-retention > div",
  ".gift-retention-strip",
  ".gift-admin-copy > *",
  ".gift-admin-render",
  ".gift-tech-grid > *",
  ".gift-tech-stats > *",
  ".gift-result > *",
  ".gift-result-metrics > *",
  ".gift-final-cta > *",
].join(",");

giftRevealGroups.forEach((group) => {
  group.classList.add("gift-reveal");

  group.querySelectorAll(giftChildSelectors).forEach((child, index) => {
    child.classList.add("gift-reveal-child");
    child.style.setProperty("--gift-reveal-index", Math.min(index, 9));
  });
});

const tailRevealGroups = document.querySelectorAll("[data-tail-reveal]");

const tailChildSelectors = [
  ".tail-story-copy",
  ".tail-story-heading > *",
  ".tail-overview-media > *",
  ".tail-role-grid > *",
  ".tail-lifecycle > *",
  ".tail-chat-strip > *",
  ".tail-moderation-stage > *",
  ".tail-architecture > article",
  ".tail-architecture-notes",
  ".tail-final > *",
].join(",");

tailRevealGroups.forEach((group) => {
  group.classList.add("tail-reveal");

  group.querySelectorAll(tailChildSelectors).forEach((child, index) => {
    child.classList.add("tail-reveal-child");
    child.style.setProperty("--tail-reveal-index", Math.min(index, 10));
  });
});

const animatedItems = [
  ...genericAnimatedItems,
  ...giftRevealGroups,
  ...tailRevealGroups,
];

function showItem(item) {
  item.classList.add("is-visible");
}

function revealVisibleNow() {
  animatedItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return;
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
      showItem(item);
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showItem(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7% 0px", threshold: 0.04 },
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach(showItem);
}

requestAnimationFrame(revealVisibleNow);
window.addEventListener("hashchange", () => window.setTimeout(revealVisibleNow, 80));
window.addEventListener("resize", revealVisibleNow, { passive: true });
window.addEventListener("pageshow", revealVisibleNow);
document.addEventListener("visibilitychange", revealVisibleNow);
window.addEventListener("load", () => window.setTimeout(revealVisibleNow, 80));
