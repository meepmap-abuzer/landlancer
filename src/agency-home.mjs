import {serviceShowcase,studioFooter} from './studio-sections.mjs';
import {faqBlock} from './seo.mjs';
import {projectSceneCard} from './project-scene.mjs';
import {head,cta,studioHeader} from './agency-shared.mjs';
import {makerStage} from './pixel-maker.mjs';

const projects=[['loyalty','12К'],['maverick','Maverick'],['tailcare','TailCare'],['gift-roulette','Gift Roulette']];
const phases=[
 ['Задача','Разбираем пользователей, сценарии и ограничения. Отделяем первую версию от идей на будущее.','Согласованный состав работ'],
 ['Интерфейс','Проектируем логику экранов и визуальный язык. Проходим основной сценарий в прототипе до разработки.','Макеты и состояния интерфейса'],
 ['Разработка','Соединяем интерфейс, сервер и интеграции. Показываем законченные сценарии по мере готовности.','Работающая версия для проверки'],
 ['Запуск','Проверяем формы, доступы и мобильные экраны. Публикуем продукт, передаём код и инструкции.','Опубликованный продукт и документация']
];
function process(){return `<section class="studio-process" id="approach"><div class="section-heading"><h2>Процесс</h2><p>От идеи до работающего продукта.</p></div><ol class="process-roadmap">${phases.map(([title,text],i)=>`<li><span class="process-step">0${i+1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol></section>`;}
export function home(){return head('Сайты и цифровые продукты','Разрабатываем сайты, Telegram Mini Apps, веб-сервисы и AI-интеграции. Дизайн, серверная логика и запуск — Lancer Agency.').replace('class="theme-blue"','class="theme-blue lancer-site studio-home"')+studioHeader()+`
<main id="main" class="studio-main"><section class="studio-hero pixel-hero" id="about">${makerStage()}<div class="hero-copy"><h1>Идеи становятся продуктами.</h1><p>Создаём сайты, Mini Apps и системы для бизнеса.</p><div class="hero-actions">${cta()}<a class="text-action" href="#works">Смотреть работы</a></div></div></section>
<section class="studio-works" id="works"><div class="section-heading"><h2>Работы</h2><p>Реальные проекты.<br>Настоящие задачи. Живые интерфейсы.</p></div><div class="studio-projects">${projects.map(([slug])=>`<article class="studio-project" id="project-${slug}">${projectSceneCard(slug)}</article>`).join('')}</div></section>
${serviceShowcase()}${process()}${faqBlock()}</main>`+studioFooter();}
