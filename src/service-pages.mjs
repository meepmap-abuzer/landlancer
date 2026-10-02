import {head,icon,cta,studioHeader} from './agency-shared.mjs';
import {studioFooter,serviceCards} from './studio-sections.mjs';
import {projectCover} from './project-cover.mjs';
import {services,site} from './seo-data.mjs';
import {breadcrumbs,escapeHtml} from './seo.mjs';
import {serviceRoadmap} from './service-visuals.mjs';
import {serviceContextVisual} from './service-stories.mjs';
import {asciiMotif} from './ascii-motif.mjs';
import {serviceSignal} from './digital-visuals.mjs';

export const money=amount=>`от ${new Intl.NumberFormat('ru-RU').format(amount)} ₽`;
const names={maverick:'Maverick',loyalty:'12К · Программа лояльности','gift-roulette':'Gift Roulette',tailcare:'TailCare'};
const symbols=['layers','grid','bolt','shield'];
const includedCopy={
 "websites": [
  "Согласуем страницы, содержание и путь посетителя к заявке.",
  "Макеты под ваш стиль, понятные на телефоне и большом экране.",
  "Формы, проверки и доставка заявок в Telegram, CRM или сервер.",
  "Доступный поиску HTML, метатеги, канонические адреса и sitemap. Аналитика — по согласованию."
 ],
 "telegram-mini-apps": [
  "Навигация и адаптив внутри Telegram, загрузка, ошибки и возвращение к действию.",
  "Бот, вход и уведомления. Данные Telegram и права проверяет сервер.",
  "QR-карта, история, задания и награды — по согласованным правилам начислений.",
  "База, API и управление. Платёжный сценарий и провайдер — по отдельному согласованию."
 ],
 "crm": [
  "Заявки, статусы и действия команды. Первая версия под конкретный процесс.",
  "Раздельные доступы сотрудников с проверкой разрешений на сервере.",
  "Нужные показатели, фильтры, детали операций и история изменений.",
  "Связь с сайтом и Mini App по доступным API, повторы и восстановление после сбоев."
 ],
 "automation": [
  "Заявка в рабочей системе и уведомление в Telegram — независимые каналы доставки.",
  "Авторизация, лимиты API, формат событий, повторная обработка и защита запросов.",
  "Один согласованный источник данных и правила синхронизации между сервисами.",
  "Журнал событий, ошибки и повторы, чтобы восстановить обработку после сбоя."
 ]
};
function shell(title,description,path){return head(title,description,path).replace('class="theme-blue"','class="theme-blue lancer-site service-editorial"')+studioHeader('service');}
const footer=()=>studioFooter().replace('<span>ЕСТЬ ИДЕЯ?</span>','').replaceAll('href="#','href="/#');

function heroArt(s){return `<div class="service-hero-art" aria-hidden="true">${serviceSignal(s.slug)}</div>`;}
function included(s){const items=[...s.items.map(([title,text],i)=>[symbols[i%4],title,includedCopy[s.slug]?.[i]||text]),...s.extras];return `<section class="service-includes" id="includes" aria-labelledby="includes-title"><h2 id="includes-title">Что входит</h2><div class="included-grid">${items.map(([symbol,title,text])=>`<article>${icon(symbol)}<h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>`;}
function caseProof(s){return `<section class="service-proof" aria-labelledby="proof-title"><div class="service-section-heading"><h2 id="proof-title">Кейсы</h2><p>${s.slug==='automation'?'Пример интеграции и обмена данными. AI-сценарии ниже — идеи для вашего проекта.':'Интерфейсы, устройство продукта и демонстрации.'}</p></div><div class="service-case-grid" data-count="${s.cases.length}">${s.cases.map(([slug])=>`<article class="service-case-card">${projectCover(slug,names[slug])}</article>`).join('')}${s.cases.length===1?`<div class="service-proof-context"><h3>Посмотрите систему в работе</h3><p>На странице проекта — интерфейсы, устройство продукта и интерактивная демонстрация.</p><a class="text-action" href="/cases/${s.cases[0][0]}/">Открыть проект ${icon('arrow')}</a></div>`:''}</div></section>`;}
function examples(s){if(!s.aiExamples)return '';return `<section class="service-ai" aria-labelledby="ai-title"><div class="service-section-heading"><h2 id="ai-title">Где AI может быть полезен</h2><p>Возможные сценарии. Источники, проверки и права на действия определяем под ваш процесс.</p></div><div class="ai-example-grid">${s.aiExamples.map(example=>`<article>${icon(example.symbol)}<h3>${example.title}</h3><p>${example.text}</p><ol aria-label="Шаги примера">${example.flow.map(step=>`<li>${step}</li>`).join('')}</ol></article>`).join('')}</div></section>`;}
function pricing(s){return `<section class="service-pricing" id="pricing" aria-labelledby="pricing-title"><h2 id="pricing-title">Сколько стоит</h2><div class="pricing-columns"><div><dl class="price-list">${s.prices.map(([title,amount,scope])=>`<div><dt>${title}<span>${scope}</span></dt><dd>${amount?money(amount):'По составу работ'}</dd></div>`).join('')}</dl><p class="pricing-note">Стартовая цена относится к указанному объёму. Итоговую стоимость и границы работ согласуем до разработки. Хостинг, тарифы API и внешних сервисов рассчитываются отдельно.</p></div><aside><h3>Оценка под вашу задачу</h3><p>${s.scope}</p>${cta('Обсудить состав работ')}</aside></div></section>`;}
function questions(s){return `<section class="service-questions" id="faq" aria-labelledby="faq-title"><div><h2 id="faq-title">Вопросы</h2><div class="faq-answers">${s.faq.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span>${escapeHtml(q)}</span><i aria-hidden="true"></i></summary><p>${escapeHtml(a)}</p></details>`).join('')}</div></div><aside class="service-faq-art" aria-label="Обсудить проект">${asciiMotif(s.slug)}<p>Есть своя задача?<br>Разберём её вместе.</p><a href="${site.contact}" target="_blank" rel="noopener noreferrer">Написать в Telegram ${icon('arrow')}</a></aside></section>`;}

export function servicePage(s){const path=`/services/${s.slug}/`,related=services.find(item=>item.slug===s.related);return shell(s.title,s.description,path)+`
<main class="service-page" id="main"><div class="wrap">${breadcrumbs(path,s.name)}
<section class="service-hero"><div class="service-hero-copy"><h1>${s.title}</h1><p>${s.intro}</p><dl class="service-facts"><div><dt>Стоимость</dt><dd>${money(s.startingPrice)}</dd></div><div><dt>Первая версия</dt><dd>${s.format}</dd></div><div><dt>Передача</dt><dd>Код и инструкции</dd></div></dl><div class="service-hero-actions">${cta()}<a href="#pricing">Посмотреть стоимость ${icon('arrow')}</a></div></div>${heroArt(s)}</section>
<section class="service-audience" aria-labelledby="audience-title"><h2 id="audience-title">Кому подходит</h2><div>${s.audience.map(([title,text])=>`<details><summary><span>${title}</span><i aria-hidden="true"></i></summary><p>${text}</p></details>`).join('')}</div></section>
<section class="service-system"><div><h2>От сценария<br>к работающей системе</h2><p>${s.answer}</p></div><div class="frost">${serviceContextVisual(s.slug)}</div></section>
${included(s)}${caseProof(s)}${examples(s)}
${s.cases.length>1?`<section class="service-mechanism"><h2>${s.question}</h2><p>${s.answer}</p></section>`:''}
${serviceRoadmap(s.slug)}
<section class="service-handover"><details><summary><span>Что передаём вместе с продуктом</span><i aria-hidden="true"></i></summary><p>${s.result}</p></details></section>
${pricing(s)}
<a class="service-next" href="/services/${related.slug}/"><span>${s.relatedText}</span><strong>${related.name} ${icon('arrow')}</strong></a>
${questions(s)}
</div></main>`+footer();}

export function serviceDirectory(){return shell('Услуги разработки для бизнеса','Сайты от 30 000 ₽, веб-сервисы, Telegram Mini Apps, CRM, AI-автоматизация и MVP. Выберите задачу, посмотрите примеры и состав работ Lancer Agency.','/services/')+`<main class="service-page" id="main"><div class="wrap">${breadcrumbs('/services/','Услуги')}<section class="directory-intro"><div><h1>От сайта<br>до продукта.</h1><p>Шесть направлений для разных задач.<br> Выберите формат — посмотрите примеры и стоимость.</p></div><div><p>Начнём с вашей идеи.<br> Нужный формат определим вместе.</p>${cta()}</div></section><section class="service-directory" aria-label="Услуги разработки">${serviceCards()}</section></div></main>`+footer();}
