import {serviceShowcase,studioFooter} from './studio-sections.mjs';
import {faqBlock} from './seo.mjs';
import {projectCover} from './project-cover.mjs';
import {head,icon,cta,studioHeader} from './agency-shared.mjs';

const projects=[['loyalty','12К'],['maverick','Maverick'],['tailcare','TailCare'],['gift-roulette','Gift Roulette']];
const phases=[
 ['Задача','Разбираем пользователей, сценарии и ограничения. Отделяем первую версию от идей на будущее.','Согласованный состав работ'],
 ['Интерфейс','Проектируем логику экранов и визуальный язык. Проходим основной сценарий в прототипе до разработки.','Макеты и состояния интерфейса'],
 ['Разработка','Соединяем интерфейс, сервер и интеграции. Показываем законченные сценарии по мере готовности.','Работающая версия для проверки'],
 ['Запуск','Проверяем формы, доступы и мобильные экраны. Публикуем продукт, передаём код и инструкции.','Опубликованный продукт и документация']
];
function process(){return `<section class="studio-process" id="approach"><div class="section-heading"><h2>Как идёт работа</h2><p>От понятной задачи до продукта,<br> которым можно пользоваться.</p></div><div class="process-tabs" role="tablist" aria-label="Этапы работы">${phases.map(([title],i)=>`<button type="button" id="phase-${i}" role="tab" aria-selected="${i===0}" aria-controls="phase-panel-${i}" tabindex="${i===0?0:-1}">${title}<span aria-hidden="true">${icon('arrow')}</span></button>`).join('')}</div><div class="process-panels">${phases.map(([title,text,result],i)=>`<article id="phase-panel-${i}" role="tabpanel" aria-labelledby="phase-${i}" ${i?'hidden':''}><h3>${title}</h3><p>${text}</p><div><span>Результат этапа</span><strong>${result}</strong></div></article>`).join('')}<pre class="process-ascii" data-motif aria-hidden="true">      .────────.
     /        /│
    .────────. │
    │        │ .
    │        │/
    '────────'</pre></div></section>`;}
export function home(){return head('Сайты и цифровые продукты','Разрабатываем сайты, Telegram Mini Apps, веб-сервисы и AI-интеграции. Дизайн, серверная логика и запуск — Lancer Agency.').replace('class="theme-blue"','class="theme-blue lancer-site studio-home"')+studioHeader()+`
<main id="main" class="studio-main"><section class="studio-hero" id="about"><div class="hero-copy"><h1>Создаём цифровые<br>продукты.</h1><p>Сайты, Mini Apps и системы для бизнеса.<br>От дизайна до работающего сервиса.</p><div class="hero-actions">${cta()}<a class="text-action" href="#works">Смотреть работы ${icon('arrow')}</a></div></div><div class="brand-object" role="img" aria-label="Три объёмных слоя знака Lancer, плавно реагирующие на курсор"><div class="object-fallback" aria-hidden="true">${icon('layers')}</div><div class="object-canvas" aria-hidden="true"></div></div><div class="hero-scope"><span>Дизайн интерфейса</span><span>Разработка</span><span>Интеграции</span></div></section>
<section class="studio-works" id="works"><div class="section-heading"><h2>Работы</h2><p>Четыре продукта.<br> Разные задачи, внимание к деталям.</p></div><div class="studio-projects">${projects.map(([slug,name])=>`<article class="studio-project" id="project-${slug}">${projectCover(slug,name)}</article>`).join('')}</div></section>
${serviceShowcase()}${process()}${faqBlock()}</main>`+studioFooter();}
