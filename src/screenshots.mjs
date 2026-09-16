const collections = {
  "gift-roulette": {
    layout: "phones",
    intro: "Главный экран, открытие кейса и минное поле в самом приложении.",
    images: [
      [
        "gaming-home",
        "Главный экран",
        "Выбор игры и переход к кейсам.",
        750,
        1269,
      ],
      [
        "gaming-case",
        "Открытие кейса",
        "Лента подарков и состав призов.",
        719,
        1280,
      ],
      [
        "gaming-mines",
        "Минное поле",
        "Открытые ячейки и текущий множитель.",
        719,
        1280,
      ],
    ],
  },
  tailcare: {
    layout: "desktop",
    intro:
      "Главная помогает выбрать сценарий, каталог — найти нужное объявление.",
    images: [
      [
        "pets-home",
        "Главная сервиса",
        "Вход в поиск и публикацию объявления.",
        1440,
        1100,
      ],
      [
        "pets-catalog",
        "Каталог животных",
        "Фотографии, категории и фильтры.",
        1440,
        1100,
      ],
    ],
  },
  maverick: {
    layout: "phones two-phones",
    intro: "Экраны программы лояльности: активация покупки и розыгрыш наград.",
    images: [
      [
        "club-home",
        "Главная клуба",
        "QR-сканер, серия посещений и достижения.",
        640,
        1248,
      ],
      [
        "club-roulette",
        "Рулетка наград",
        "Запуск за ключи и список возможных призов.",
        640,
        1248,
      ],
    ],
  },
  loyalty: {
    layout: "mixed",
    intro: "Клиентское приложение и панель управления на тестовых данных.",
    images: [
      [
        "loyalty-home",
        "Приложение покупателя",
        "Карта, бонусы и ежедневная награда.",
        320,
        641,
      ],
      [
        "loyalty-dashboard",
        "Панель управления Mini App",
        "Участники, операции и активность по дням.",
        1280,
        800,
      ],
    ],
  },
};

export function screenshot([file, title, caption, width, height], group) {
  return `<figure class="screen-figure"><a class="screen-image" href="/assets/screenshots/${file}.png" data-lightbox="${group}" data-caption="${title}" aria-label="Увеличить: ${title}"><img src="/assets/screenshots/${file}.png" alt="${title}: ${caption}" width="${width}" height="${height}" loading="lazy" decoding="async"><span class="screen-zoom" aria-hidden="true">+</span></a><figcaption><strong>${title}</strong><span>${caption}</span></figcaption></figure>`;
}

export function gallery(project) {
  const collection = collections[project.slug];
  return `<section class="screenshots container" id="screens"><div class="screenshots-heading"><h2>Экраны проекта</h2><p>${collection.intro}</p></div><div class="screenshots-grid ${collection.layout}">${collection.images.map((image) => screenshot(image, project.slug)).join("")}</div></section>`;
}

export function businessCabinet() {
  return `<div class="cabinet-screen">${screenshot(["loyalty-reports", "Кабинет бизнеса", "Раздел отчётов: формирование выгрузки и история готовых файлов. Тестовые данные.", 1440, 1000], "business")}</div>`;
}

export const lightbox = `<dialog class="lightbox" aria-label="Просмотр скриншота"><div class="lightbox-toolbar"><p class="lightbox-title" aria-live="polite"></p><button class="lightbox-close" aria-label="Закрыть скриншот" autofocus>Закрыть <span aria-hidden="true">×</span></button></div><div class="lightbox-stage"><button class="lightbox-prev" aria-label="Предыдущий скриншот">←</button><img class="lightbox-image" alt=""><button class="lightbox-next" aria-label="Следующий скриншот">→</button></div><div class="lightbox-footer"><span class="lightbox-count" aria-live="polite"></span><a class="lightbox-original" target="_blank" rel="noopener noreferrer">Открыть в полном размере</a></div></dialog>`;
