const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 65, 360)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".category-card, .promo, .review-grid article").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--spot-x", `${x}%`);
    card.style.setProperty("--spot-y", `${y}%`);
  });
});

const form = document.querySelector("[data-subscribe-form]");
const status = document.querySelector("[data-form-status]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  const email = input.value.trim();
  const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  status.classList.toggle("error", !isValid);
  status.textContent = isValid ? "Готово. Новинки и предложения придут на вашу почту." : "Введите корректный e-mail.";

  if (isValid) input.value = "";
});
