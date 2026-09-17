import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { gallery, businessCabinet, lightbox } from "./screenshots.mjs";
const root = resolve(import.meta.dirname, "..");
const arrow =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const right =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const diamond =
  '<img class="crystal" src="/assets/crystal.svg" alt="" width="220" height="220">';
const qr =
  '<svg class="qr" viewBox="0 0 100 100" aria-hidden="true"><path d="M5 5h28v28H5zm62 0h28v28H67zM5 67h28v28H5z" fill="none" stroke="currentColor" stroke-width="6"/><path fill="currentColor" d="M13 13h12v12H13zm62 0h12v12H75zM13 75h12v12H13zM43 5h9v20h-9zm0 29h17v9H43zM5 43h20v9H5zm28 9h10v10H33zm20 0h15v15H53zm24-9h18v10H77zM43 72h10v23H43zm19 3h10v10H62zm16-14h17v12H78zm0 24h17v10H78zM62 89h8v6h-8z"/></svg>';
const nav = (isCase = false) =>
  `<a class="skip" href="#main">К содержанию</a><header class="header"><a class="brand" href="/" aria-label="LandLancer — главная"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M9 7h5v16h11v5H9z"/></svg></span>landlancer<span class="brand-period">.</span></a><nav aria-label="Основная навигация"><a href="/#works">Проекты <sup>04</sup></a><a href="/#approach">Подход</a><a href="/#contact">Контакт</a></nav><a class="nav-cta" href="https://t.me/landlancer" target="_blank" rel="noopener noreferrer">Обсудить проект ${arrow}</a><button class="menu-toggle" aria-expanded="false" aria-label="Открыть меню"><span></span><span></span></button></header>${isCase ? '<div class="reading-progress" aria-hidden="true"></div>' : ""}`;
const footer = () =>
  `<section class="contact container" id="contact"><div class="contact-top"><span class="availability"><i></i> На связи в Telegram</span><span></span></div><a class="contact-link" href="https://t.me/landlancer" target="_blank" rel="noopener noreferrer"><span>Есть задача?<br><em>Напишите мне.</em></span><span class="contact-arrow">${arrow}</span></a><div class="contact-bottom"><p>Расскажите, что хотите создать.<br>Обсудим задачу и с чего лучше начать.</p><a href="https://t.me/landlancer" target="_blank" rel="noopener noreferrer">@landlancer ${arrow}</a></div></section><footer class="footer container"><a class="brand" href="/">landlancer.</a><span>Веб-сервисы и Telegram-приложения</span><span>© 2026</span><a href="#top">Наверх ↑</a></footer>`;
function head(title, desc, path = "/") {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${title} — LandLancer</title><meta name="description" content="${desc}"><meta name="theme-color" content="#1760ee"><link rel="canonical" href="https://landlancer.ru${path}"><meta property="og:title" content="${title} — LandLancer"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta property="og:url" content="https://landlancer.ru${path}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/responsive.css"><link rel="stylesheet" href="/glass.css?v=2"><script src="/site.js" defer></script></head><body id="top">`;
}
const pill = (text) => `<span class="pill">${text}</span>`;
function roulette() {
  return `<div class="demo roulette-demo" data-demo="roulette"><div class="demo-top"><span class="demo-brand">Игровая платформа</span><span class="demo-label">Интерактивное демо</span></div><div class="game-heading"><span>Коллекция подарков</span><b>Открытие кейса</b><p>Нажмите кнопку, чтобы запустить ленту подарков.</p></div><div class="reel-window"><span class="reel-pointer"></span><div class="reel-track" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<div class="reel-cell"><span class="prize-object prize-${i % 3}">${i % 3 === 0 ? diamond : i % 3 === 1 ? '<span class="gift-box"><i></i></span>' : '<span class="star-object">✦</span>'}</span><small>${["Кристалл", "Подарок", "Звезда"][i % 3]}</small></div>`).join("")}</div></div><div class="demo-bottom"><span class="demo-result" role="status" aria-live="polite">Без ставок и платежей</span><button class="button blue spin-button">Открыть кейс ${right}</button></div></div>`;
}
function pet() {
  return `<div class="demo pet-demo" data-demo="pets"><div class="demo-top"><span class="demo-brand">Рядом с домом</span><span class="demo-label">Демо-каталог</span></div><div class="pet-filters" role="group" aria-label="Категория объявлений"><button class="selected" data-filter="found" aria-pressed="true">Найдены</button><button data-filter="lost" aria-pressed="false">Потерялись</button><button data-filter="home" aria-pressed="false">Ищут дом</button></div><div class="pet-scene"><div class="map-art" aria-label="Схематичная карта, демонстрационные данные"><div class="map-park park-one"></div><div class="map-park park-two"></div><div class="map-river"></div><span class="map-street street-one">Тихая улица</span><span class="map-street street-two">Сквер</span><button class="map-pin pin-one selected" data-pet="0" aria-label="Показать первую собаку">${diamond}</button><button class="map-pin pin-two" data-pet="1" aria-label="Показать вторую собаку">${diamond}</button><button class="map-pin pin-three" data-pet="2" aria-label="Показать третью собаку">${diamond}</button></div><div class="pet-card"><img src="/assets/dog.webp" alt="Иллюстрация собаки в демонстрационном объявлении" width="160" height="160"><span class="pet-status">Найдена собака</span><strong class="pet-name">Узнаёте друга?</strong><span class="pet-info" role="status" aria-live="polite">Тихая улица · у сквера</span></div></div><div class="demo-bottom"><span>Карта + карточки + Telegram</span><span class="hint">Попробуйте фильтры ↑</span></div></div>`;
}
function loyalty() {
  return `<div class="demo loyalty-demo" data-demo="loyalty"><div class="demo-top"><span class="demo-brand">Клуб привилегий</span><span class="demo-label">Интерактивное демо</span></div><div class="loyalty-content"><div class="loyalty-heading"><span>Демонстрационный баланс</span><strong><span class="points">0</span><small>баллов в демо</small></strong></div><div class="loyalty-steps"><span class="active">01 · QR-код</span><span>02 · Баллы</span><span>03 · Награда</span></div><div class="reward-preview"><div class="qr-tile">${qr}</div><div><b class="reward-title">Начнём с покупки</b><p class="reward-description">Активируйте демонстрационный код.</p></div></div><button class="button blue loyalty-action">Активировать QR ${right}</button><p class="loyalty-status" role="status" aria-live="polite">Условный сценарий программы лояльности</p></div></div>`;
}
function card() {
  return `<div class="demo card-demo" data-demo="card"><div class="demo-top"><span class="demo-brand">Карта лояльности</span><span class="demo-label">Демо Mini App</span></div><div class="card-space"><button class="member-card" aria-label="Перевернуть карту и показать демо QR" aria-pressed="false"><span class="card-front"><span class="card-topline"><b>club<span>+</span></b><span>Карта привилегий</span></span><span class="card-balance">2 450<span>бонусных баллов</span></span><span class="card-bottomline"><span>Участник клуба</span><span>↻ Перевернуть</span></span><span class="card-orbit"></span></span><span class="card-back" aria-hidden="true">${qr}<b>Демонстрационный QR</b><small>↻ Вернуться к балансу</small></span></button></div><div class="mini-actions"><span>↗ История покупок</span><span>✦ Награды</span><span>⌖ Магазины</span></div><div class="demo-bottom"><span class="card-status" role="status" aria-live="polite">Нажмите на карту</span><span>Без регистрации</span></div></div>`;
}
const demos = { roulette, pet, loyalty, card };
const projects = [
  {
    slug: "gift-roulette",
    type: "Telegram Mini App",
    title: "Игровая платформа<br>в Telegram",
    short: "Игровая платформа в Telegram",
    intro:
      "Кейсы, апгрейд, мины и краш-игра. В приложении можно играть, собирать подарки и выполнять задания; оператор управляет призами и настройками.",
    tags: ["Игровые механики", "Подарки", "Администрирование"],
    demo: "roulette",
    line: "Игры и подарки<br>внутри Telegram.",
    lead: "Игровое mini app с кейсами, апгрейдом, минами и краш-игрой. За коротким пользовательским действием — баланс, инвентарь, платежи и управление игровой экономикой.",
    challenge:
      "Собрать несколько игр в один понятный продукт. Пользователь должен быстро выбирать механику, видеть результат и находить свои подарки, не теряясь между экранами.",
    solution:
      "Единая навигация связывает игры, задания, рейтинг и профиль. Внутри кейса внимание сосредоточено на ленте подарков: движение замедляется и останавливается на результате.",
    detailTitle: "Как устроено<br>открытие кейса.",
    detail:
      "Открытие кейса адаптировано из сценария приложения: горизонтальная лента, центральный указатель, блокировка повторного запуска и отдельное состояние результата. Здесь можно проверить ощущение от анимации.",
    secondTitle: "Профиль, инвентарь<br>и управление.",
    second:
      "В личном кабинете собраны инвентарь, балансы и реферальная программа. Для оператора предусмотрены управление кейсами и призами, задания, рассылки и статистика.",
    features: [
      [
        "Четыре механики",
        "Кейсы, апгрейд, мины и краш объединены в одной системе.",
      ],
      ["Личный кабинет", "Подарки, история, задания и реферальная программа."],
      [
        "Управление",
        "Настройка кейсов, призов и параметров игровой экономики.",
      ],
    ],
    stack: ["Vue 3", "FastAPI", "PostgreSQL", "aiogram", "WebSocket"],
    closing:
      "В одном mini app собраны четыре игры, коллекция подарков, задания и профиль. Результаты и изменения баланса обрабатывает сервер.",
  },
  {
    slug: "tailcare",
    type: "Веб-сервис + Telegram",
    title: "Поиск питомцев<br>и помощь приютам.",
    short: "Сервис поиска и помощи питомцам",
    intro:
      "Каталог объявлений о потерянных, найденных и ищущих дом животных. С картой, публикацией через Telegram и разделом для волонтёров.",
    tags: ["Поиск на карте", "Каталог", "Telegram-бот"],
    demo: "pet",
    line: "Найти питомца.<br>Или новый дом.",
    lead: "Сервис для людей, которые потеряли питомца, нашли животное или хотят помочь. Публичные объявления, карта и Telegram-бот складываются в один путь к контакту.",
    challenge:
      "В тревожной ситуации человеку нужен конкретный следующий шаг. Важно разделить потерявшихся, найденных и ищущих дом животных, сохранив быстрый доступ к поиску.",
    solution:
      "Вход строится вокруг ситуации человека. Категории, карточки с фотографиями и география помогают сузить поиск. Telegram связывает публикацию и дальнейшее общение.",
    detailTitle: "Каталог связан<br>с картой.",
    detail:
      "Переключите категорию и выберите точку на схематичной карте. Демонстрация показывает связь фильтров и карточки животного. Из проекта использованы иллюстрации сценариев; объявления здесь вымышленные.",
    secondTitle: "Объявления, приюты<br>и волонтёры.",
    second:
      "В сервисе есть отдельные сценарии для приютов и волонтёров, профили и подробные объявления. Публикация проходит через бот и модерацию, а каталог помогает найти нужную карточку.",
    features: [
      ["Сценарии", "Потерял, нашёл, хочу взять питомца или помочь."],
      ["Поиск", "Категории, карточки животных, фильтры и карта."],
      ["Сообщество", "Приюты, волонтёры и связанный Telegram-бот."],
    ],
    stack: ["Vue 3", "TypeScript", "Python", "Telegram Bot", "Карты"],
    closing:
      "Бот, каталог и карта помогают опубликовать объявление, найти животное и связаться с автором.",
  },
  {
    slug: "maverick",
    type: "Программа лояльности",
    title: "Программа лояльности<br>с играми и наградами.",
    short: "Программа лояльности с геймификацией",
    intro:
      "Покупатель сканирует QR на упаковке, получает баллы и обменивает их на мерч. В приложении есть задания, мини-игра и достижения.",
    tags: ["QR-активация", "Геймификация", "Мерч"],
    demo: "loyalty",
    line: "Покупки, баллы<br>и награды в Telegram.",
    lead: "Telegram-приложение связывает физический продукт и цифровую программу лояльности. Участник активирует QR, получает баллы, выполняет задания и выбирает награды.",
    challenge:
      "Связать покупку, участие и награды в понятный цикл. При этом учесть одноразовую активацию QR, баланс, остатки мерча и работу операторов.",
    solution:
      "Mini app показывает участнику следующий шаг, а административная панель объединяет выпуск QR, каталог наград, задания и обработку заказов.",
    detailTitle: "От QR-кода<br>до награды.",
    detail:
      "Пройдите сокращённый сценарий: активируйте код, получите демонстрационные баллы и обменяйте их на награду. В настоящем продукте операции подтверждает сервер, а каждый QR активируется один раз.",
    secondTitle: "Что видит участник<br>и чем управляет команда.",
    second:
      "Игровая часть включает рулетку, мини-игру, задания и достижения. Команда управляет QR-партиями и наградами, видит заказы и использует интеграцию с учётом товарных остатков.",
    features: [
      ["Вход через продукт", "QR-активации и начисление баллов за покупку."],
      ["Вовлечение", "Задания, достижения, игра и таблицы лидеров."],
      [
        "Операционная часть",
        "Мерч, заказы, роли, аудит и интеграция с МойСклад.",
      ],
    ],
    stack: ["Vue 3", "FastAPI", "PostgreSQL", "Redis", "МойСклад"],
    closing:
      "Один связанный путь: от QR на упаковке до награды в руках участника.",
  },
  {
    slug: "loyalty",
    type: "Экосистема для ритейла",
    title: "Система лояльности<br>для розничной сети.",
    short: "Система лояльности для ритейла",
    intro:
      "API лояльности, приложение для кассы ЭВОТОР, кабинет бизнеса и клиентское mini app. Проект ещё в разработке.",
    tags: ["API + касса", "Кабинет бизнеса", "Mini App"],
    demo: "card",
    wip: true,
    line: "Бонусная программа:<br>от кассы до mini app.",
    lead: "Проект в разработке: API лояльности, приложение для кассы ЭВОТОР, кабинет бизнеса и клиентское Telegram mini app. Общая основа для начисления и списания бонусов.",
    challenge:
      "Связать кассу и клиентский интерфейс так, чтобы покупки и баллы оставались согласованными. Бизнесу нужен контроль программы, покупателю — быстрый доступ к карте.",
    solution:
      "API ведёт операции и баланс. Кассовое приложение обслуживает покупку, кабинет помогает настраивать программу, а mini app показывает карту, задания и награды.",
    detailTitle: "Баланс и QR-код<br>на одной карте.",
    detail:
      "Баланс находится на лицевой стороне. Нажатие переворачивает карту и открывает QR. Этот сценарий взят из клиентского mini app и переоформлен для портфолио. Данные и код в демо условные.",
    secondTitle: "Кабинет бизнеса,<br>касса и приложение.",
    second:
      "Бизнес работает с клиентами, точками продаж и настройками программы. Касса — с покупкой. Пользователь — с картой и бонусами. Между ними API, которое сохраняет общую историю операций.",
    features: [
      ["Для покупателя", "Карта, бонусный баланс, задания и каталог наград."],
      ["Для бизнеса", "Клиенты, точки продаж и настройки лояльности."],
      ["Для кассы", "Приложение ЭВОТОР и операции через общий API."],
    ],
    stack: ["Vue 3", "TypeScript", "Python", "REST API", "ЭВОТОР"],
    closing:
      "Проект развивается. Интеграции и готовность отдельных сценариев проверяются поэтапно.",
  },
];
function hero() {
  return `<section class="hero container"><div class="hero-copy"><div class="hero-intro"><span class="availability"><i></i> Независимый разработчик</span></div><h1>Разрабатываю<br>сайты и<br><em>приложения.</em></h1><p>Веб-сервисы, Telegram и системы для бизнеса. Продумываю интерфейс, пишу код и подключаю нужные сервисы.</p><a class="button blue" href="#works">Посмотреть проекты <span>↓</span></a></div><div class="hero-stage" aria-label="Композиция интерфейсов цифровых продуктов"><div class="stage-grid"></div><svg class="hero-orbit" viewBox="0 0 600 600" aria-hidden="true"><ellipse cx="300" cy="300" rx="235" ry="115" transform="rotate(-35 300 300)"/><ellipse cx="300" cy="300" rx="235" ry="115" transform="rotate(35 300 300)"/><circle cx="300" cy="300" r="195"/></svg><div class="hero-screen"><div class="screen-chrome"><span>● ● ●</span><span>mini app</span><span>↗</span></div><div class="hero-screen-inner"><div class="mini-greeting"><b>Личный кабинет</b><br>Ваша карта и бонусы</div><div class="hero-blue-card"><span>Ваша карта привилегий</span><strong>2 450 <small>баллов</small></strong><span>Участник клуба <b>↗</b></span></div><div class="hero-small-grid"><div><span>✦</span>Награды</div><div><span>↗</span>Активность</div></div><div class="mini-activity"><span>Покупка в магазине</span><b>+ 250</b></div><div class="mini-activity"><span>Ежедневное задание</span><b>+ 50</b></div><div class="mini-bottom">⌂ <span>✦</span> ◇ <span>☰</span></div></div></div><div class="hero-float gift-float">${diamond}<span>Подарки<br>в приложении</span></div><div class="hero-float check-float"><span class="check-icon">✓</span><div><b>Покупка засчитана</b><span>+250 бонусных баллов</span></div></div><span class="stage-cross">+</span><a class="stage-cursor" href="/cases/loyalty/#interactive">${arrow}<span>попробовать карту</span></a></div><div class="hero-foot"><span>Веб-разработка · Telegram Mini Apps</span><a href="#works">К проектам ↓</a></div></section>`;
}
function projectRow(p, i) {
  return `<article class="project-row ${i % 2 ? "reverse" : ""}"><div class="project-info"><span class="project-type"><span class="project-number" aria-label="Проект ${i + 1} из 4">${String(i + 1).padStart(2, "0")}</span>${p.type}${p.wip ? ' <span class="wip">В разработке</span>' : ""}</span><h3><a href="/cases/${p.slug}/">${p.title}</a></h3><p>${p.intro}</p><div class="tags">${p.tags.map(pill).join("")}</div><a class="case-link" href="/cases/${p.slug}/">Открыть историю проекта <span>${arrow}</span></a></div><div class="project-visual">${demos[p.demo]()}</div></article>`;
}
const home =
  head(
    "Разработка сайтов и приложений",
    "Разработка веб-сервисов, Telegram mini apps и систем для бизнеса. Четыре подробных интерактивных кейса.",
  ) +
  nav() +
  `<main id="main">${hero()}<section class="works container" id="works"><div class="section-heading"><h2>Несколько проектов.<br><em>Подробно о каждом.</em></h2><p>В каждом кейсе — задача, устройство продукта<br>и демо, которое можно попробовать.</p></div>${projects.map(projectRow).join("")}</section><section class="approach container" id="approach"><div class="approach-title"><span class="availability"><i></i> От идеи до запуска</span><h2>Как я работаю</h2><p>Беру на себя интерфейс и серверную часть. Так проще связать то, что видит пользователь, с тем, что действительно происходит в системе.</p></div><div class="approach-list"><article><span>01</span><div><h3>Разбираюсь в задаче</h3><p>Кто будет пользоваться продуктом, зачем он нужен и что должно происходить после нажатия кнопки.</p></div></article><article><span>02</span><div><h3>Проектирую и показываю</h3><p>Собираю структуру и первые экраны. На них проще обсудить сценарии и внести изменения до разработки.</p></div></article><article><span>03</span><div><h3>Разрабатываю и проверяю</h3><p>Соединяю интерфейс, сервер и интеграции. Проверяю реальные сценарии, состояния и работу на телефоне.</p></div></article></div></section>${footer()}</main>${lightbox}</body></html>`;
await writeFile(resolve(root, "index.html"), home);
for (const [i, p] of projects.entries()) {
  const next = projects[(i + 1) % projects.length];
  const highlights = {
    roulette:
      "Результат игры и изменение баланса подтверждает сервер. Анимация показывает этот результат пользователю.",
    pet: "Публикация начинается в Telegram и появляется в общем каталоге после модерации.",
    loyalty:
      "QR активируется один раз. Каждое начисление и списание остаётся в истории.",
    card: "Касса и mini app обращаются к одной системе учёта баллов.",
  };
  const page =
    head(p.short, p.intro, `/cases/${p.slug}/`) +
    nav(true) +
    `<main id="main"><div class="case-breadcrumb container"><a href="/#works">← Все проекты</a><span>${p.type}</span>${p.wip ? '<span class="wip">В разработке</span>' : ""}</div><article><header class="case-hero container"><h1>${p.line}</h1><div class="case-lead"><p>${p.lead}</p><div class="tags">${p.tags.map(pill).join("")}</div></div></header><div class="case-nav container"><a href="#idea">Задача и решение</a><a href="#screens">Экраны</a><a href="#interactive">Попробовать</a><a href="#system">Что внутри</a><a href="#result">Итог</a></div><section class="case-overview container" id="idea"><div><span class="section-label">Задача</span><h2>${p.short}</h2></div><div><p>${p.challenge}</p><p>${p.solution}</p></div></section>${gallery(p)}<section class="story-demo container" id="interactive"><div class="story-text"><h2>${p.detailTitle}</h2><p>${p.detail}</p><span class="demo-note">Демонстрация механики · данные вымышлены</span></div><div class="story-visual">${demos[p.demo]()}</div></section><section class="statement container"><p>${highlights[p.demo]}</p><span class="statement-symbol" aria-hidden="true">↗</span></section><section class="case-system container" id="system"><div class="system-visual">${systemArt(p)}</div><div class="story-text"><span class="section-label">Остальные функции</span><h2>${p.secondTitle}</h2><p>${p.second}</p></div></section><section class="scope container"><h2>Что собрано в проекте</h2><div class="scope-list">${p.features.map(([h, t]) => `<article><h3>${h}</h3><p>${t}</p></article>`).join("")}</div></section><section class="case-result container" id="result"><div><span class="section-label">${p.wip ? "Текущий этап" : "Результат работы"}</span><h2>${p.wip ? "Что ещё в работе" : "Что получилось"}</h2></div><div><p>${p.closing}</p>${p.wip ? "<p>Сейчас связываю части продукта и проверяю сценарии на кассе и в приложении. Здесь показан текущий интерфейс.</p>" : ""}<div class="tags">${p.stack.map(pill).join("")}</div></div></section></article><a class="next-project container" href="/cases/${next.slug}/"><span>Следующий проект</span><strong>${next.short}</strong>${arrow}</a>${footer()}</main>${lightbox}</body></html>`;
  await mkdir(resolve(root, "cases", p.slug), { recursive: true });
  await writeFile(resolve(root, "cases", p.slug, "index.html"), page);
}
function systemArt(p) {
  if (p.slug === "loyalty") return businessCabinet();
  return `<div class="system-window"><div class="demo-top"><span class="demo-brand">Схема работы</span><span>● ● ●</span></div><div class="system-body"><div class="system-sidebar"><span class="system-logomark">L</span><span class="active">Обзор</span><span>Участники</span><span>${p.demo === "pet" ? "Объявления" : "Операции"}</span><span>Настройки</span></div><div class="system-main"><div class="system-caption"><b>${p.demo === "pet" ? "Каталог и модерация" : "Управление продуктом"}</b><span>Демо</span></div><div class="system-flow"><span>Пользователь</span>${right}<span>${p.demo === "pet" ? "Объявление" : "Действие"}</span>${right}<span>Результат</span></div><div class="activity-head">${p.demo === "pet" ? "Сценарии публикации" : "События системы"}</div>${(p.demo === "pet" ? ["Карточка создана", "Проверка модератором", "Опубликовано в каталоге"] : ["Действие подтверждено", "Операция записана", "Результат в приложении"]).map((t, i) => `<div class="system-event"><span class="event-dot"></span><span>${t}</span><span>0${i + 1}</span></div>`).join("")}<div class="system-modules">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div><small class="system-disclaimer">Схема взаимодействия · не рабочая админка</small></div></div></div>`;
}
await writeFile(
  resolve(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", ...projects.map((p) => `/cases/${p.slug}/`)].map((p) => `<url><loc>https://landlancer.ru${p}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  resolve(root, "favicon.svg"),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#1760ee"/><path d="M9 7h5v16h11v5H9z" fill="white"/></svg>',
);
console.log("Built homepage and 4 case studies.");

await writeFile(
  resolve(root, "404.html"),
  head("Страница не найдена", "Вернуться в портфолио LandLancer.") +
    nav() +
    `<main id="main" class="container" style="padding:80px 0 130px"><h1>Такой страницы нет.</h1><p style="margin:30px 0">Возможно, адрес изменился. Все новые кейсы доступны на главной.</p><a class="button blue" href="/">Вернуться на главную ${right}</a></main>${footer()}</body></html>`,
);
