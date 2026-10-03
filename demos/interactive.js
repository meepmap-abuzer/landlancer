const a = { maverick: () => import("./Maverick-C3qYXvq5.js"), loyalty: () => import("./Loyalty-OQ_-WDkT.js").then((t) => t.L), "gift-roulette": () => import("./Gift-ortdPX83.js"), tailcare: () => import("./TailCare-DNgvsoAu.js") };
async function i(t) {
  try {
    const [{ mountProduct: r }, { default: o }] = await Promise.all([import("./mount-product-BwY9AtXu.js"), a[t.dataset.productDemo]()]);
    r(t, o), t.removeAttribute("aria-busy");
  } catch {
    t.innerHTML = "<p>Демо не загрузилось. Обновите страницу, чтобы попробовать ещё раз.</p>", t.removeAttribute("aria-busy");
  }
}
const e = new IntersectionObserver((t) => {
  t.filter((r) => r.isIntersecting).forEach((r) => {
    e.unobserve(r.target), i(r.target);
  });
}, { rootMargin: "300px" });
document.querySelectorAll("[data-product-demo]").forEach((t) => e.observe(t));
