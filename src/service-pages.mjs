import {head,icon,cta} from './agency-shared.mjs';
import {studioFooter} from './studio-sections.mjs';
import {projectCover} from './project-cover.mjs';
import {services,site} from './seo-data.mjs';
import {breadcrumbs,escapeHtml} from './seo.mjs';
import {serviceRoadmap} from './service-visuals.mjs';
import {serviceContextVisual} from './service-stories.mjs';
import {asciiMotif} from './ascii-motif.mjs';

export const money=amount=>`от ${new Intl.NumberFormat('ru-RU').format(amount)} ₽`;
const names={maverick:'Maverick',loyalty:'12К · Программа лояльности','gift-roulette':'Gift Roulette',tailcare:'TailCare'};
const symbols=['layers','grid','bolt','shield'];
function header(){return `<header class="case-header"><a class="case-brand" href="/">${icon('layers')} Lancer Agency</a><nav aria-label="Основная навигация"><a href="/services/">Все услуги</a><a href="/#works">Кейсы</a></nav>${cta()}</header>`;}
function shell(title,description,path){return head(title,description,path).replace('class="theme-blue"','class="theme-blue service-editorial"')+header();}
const footer=()=>studioFooter().replace('<span>ЕСТЬ ИДЕЯ?</span>','').replaceAll('href="#','href="/#');

function heroArt(s){return `<figure class="service-hero-art" aria-label="${s.artAlt}"><img class="hero-art-back" src="/assets/case-visuals/${s.art[0]}.webp" width="1536" height="1024" alt="${s.artAlt}" loading="lazy"><img class="hero-art-front" src="/assets/services/${s.image}.webp" width="1536" height="1024" alt="Визуализация интерфейса: ${s.name}" loading="eager" fetchpriority="high"><figcaption>Визуализации интерфейсов · точные экраны — в кейсах</figcaption></figure>`;}
function included(s){const items=[...s.items.map(([title,text],i)=>[symbols[i%4],title,text]),...s.extras];return `<section class="service-includes" id="includes" aria-labelledby="includes-title"><h2 id="includes-title">Что входит</h2><div class="included-grid">${items.map(([symbol,title,text])=>`<article>${icon(symbol)}<h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>`;}
function caseProof(s){return `<section class="service-proof" aria-labelledby="proof-title"><div class="service-section-heading"><h2 id="proof-title">Кейсы</h2><p>${s.slug==='automation'?'Пример интеграции и обмена данными. AI-сценарии ниже — идеи для вашего проекта.':'Интерфейсы, устройство продукта и демонстрации.'}</p></div><div class="service-case-grid" data-count="${s.cases.length}">${s.cases.map(([slug])=>`<article class="service-case-card">${projectCover(slug,names[slug])}</article>`).join('')}${s.cases.length===1?`<div class="service-proof-context"><h3>${s.question}</h3><p>${s.answer}</p>${serviceContextVisual(s.slug)}</div>`:''}</div></section>`;}
function examples(s){if(!s.aiExamples)return '';return `<section class="service-ai" aria-labelledby="ai-title"><div class="service-section-heading"><h2 id="ai-title">Где AI может быть полезен</h2><p>Возможные сценарии. Источники, проверки и права на действия определяем под ваш процесс.</p></div><div class="ai-example-grid">${s.aiExamples.map(example=>`<article>${icon(example.symbol)}<h3>${example.title}</h3><p>${example.text}</p><ol aria-label="Шаги примера">${example.flow.map(step=>`<li>${step}</li>`).join('')}</ol></article>`).join('')}</div></section>`;}
function pricing(s){return `<section class="service-pricing" id="pricing" aria-labelledby="pricing-title"><h2 id="pricing-title">Сколько стоит</h2><div class="pricing-columns"><div><dl class="price-list">${s.prices.map(([title,amount,scope])=>`<div><dt>${title}<span>${scope}</span></dt><dd>${amount?money(amount):'По составу работ'}</dd></div>`).join('')}</dl><p class="pricing-note">Стартовая цена относится к указанному объёму. Итоговую стоимость и границы работ согласуем до разработки. Хостинг, тарифы API и внешних сервисов рассчитываются отдельно.</p></div><aside><h3>Оценка под вашу задачу</h3><p>${s.scope}</p>${cta('Обсудить состав работ')}</aside></div></section>`;}
function questions(s){return `<section class="service-questions" id="faq" aria-labelledby="faq-title"><div><h2 id="faq-title">Вопросы</h2><div class="faq-answers">${s.faq.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span>${escapeHtml(q)}</span><i aria-hidden="true"></i></summary><p>${escapeHtml(a)}</p></details>`).join('')}</div></div><aside class="service-faq-art" aria-label="Обсудить проект">${asciiMotif(s.slug)}<p>Есть своя задача?<br>Разберём её вместе.</p><a href="${site.contact}" target="_blank" rel="noopener noreferrer">Написать в Telegram ${icon('arrow')}</a></aside></section>`;}

export function servicePage(s){const path=`/services/${s.slug}/`,related=services.find(item=>item.slug===s.related);return shell(s.title,s.description,path)+`
<main class="service-page" id="main"><div class="wrap">${breadcrumbs(path,s.name)}
<section class="service-hero"><div class="service-hero-copy"><h1>${s.title}</h1><p>${s.intro}</p><dl class="service-facts"><div><dt>Стоимость</dt><dd>${money(s.startingPrice)}</dd></div><div><dt>Первая версия</dt><dd>${s.format}</dd></div><div><dt>Передача</dt><dd>Код и инструкции</dd></div></dl><div class="service-hero-actions">${cta()}<a href="#pricing">Посмотреть стоимость ${icon('arrow')}</a></div></div>${heroArt(s)}</section>
<section class="service-audience" aria-labelledby="audience-title"><h2 id="audience-title">Кому подходит</h2><div>${s.audience.map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
${included(s)}${caseProof(s)}${examples(s)}
${s.cases.length>1?`<section class="service-mechanism"><div><h2>${s.question}</h2><p>${s.answer}</p></div>${serviceContextVisual(s.slug)}</section>`:''}
${serviceRoadmap(s.slug)}
<section class="service-handover"><h2>Что вы получаете</h2><p>${s.result}</p></section>
${pricing(s)}
<a class="service-next" href="/services/${related.slug}/"><span>${s.relatedText}</span><strong>${related.name} ${icon('arrow')}</strong></a>
${questions(s)}
</div></main>`+footer();}

export function serviceDirectory(){return shell('Услуги разработки для бизнеса','Сайты от 30 000 ₽, веб-сервисы, Telegram Mini Apps, CRM, AI-автоматизация и MVP. Выберите задачу, посмотрите примеры и состав работ Lancer Agency.','/services/')+`<main class="service-page" id="main"><div class="wrap">${breadcrumbs('/services/','Услуги')}<section class="directory-intro"><div><h1>Что вы хотите<br>создать?</h1><p>Сайт, продукт или инструмент для команды.<br>Начнём с вашей задачи и нужного результата.</p></div><div><p>От структуры и дизайна до серверной логики, интеграций и запуска.</p>${cta()}</div></section><section class="service-directory" aria-label="Услуги разработки">${services.map(s=>`<a class="directory-service" href="/services/${s.slug}/"><div><h2>${s.name} ${icon('arrow')}</h2><p>${s.short}</p></div><img src="/assets/services/${s.image}.webp" width="1536" height="1024" alt="Визуализация: ${s.name}" loading="lazy"><span class="directory-price">${money(s.startingPrice)}</span></a>`).join('')}</section><section class="directory-help"><h2>Не знаете, с чего начать?</h2><p>Расскажите, кто будет пользоваться продуктом и какую задачу он должен решать. Выделим первую версию и подходящий формат.</p>${cta('Обсудить задачу')}</section></div></main>`+footer();}
