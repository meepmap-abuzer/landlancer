import {head,nav,footer,cta,arrow,icon} from './agency-shared.mjs';
import {studioFooter} from './studio-sections.mjs';
import {serviceDiagram,serviceRoadmap} from './service-visuals.mjs';
import {serviceContextVisual,serviceResultVisual} from './service-stories.mjs';
import {services} from './seo-data.mjs';
import {breadcrumbs,faqBlock} from './seo.mjs';
export function servicePage(s){const path=`/services/${s.slug}/`;return head(s.title,s.description,path).replace('class="theme-blue"','class="theme-blue service-editorial"')+`
<header class="case-header"><a class="case-brand" href="/">${icon('layers')} Lancer Agency</a><nav aria-label="Основная навигация"><a href="/#works">Проекты</a><a href="/#services">Услуги</a></nav>${cta()}</header>
<main class="service-page" id="main"><div class="wrap">${breadcrumbs(path,s.name)}
<section class="service-intro"><div><h1>${s.title}</h1><p>${s.intro}</p>${cta('Обсудить задачу')}</div>${serviceDiagram(s.slug)}</section>
<section class="service-context service-context-illustrated"><div class="service-context-copy"><h2>${s.question}</h2><p>${s.answer}</p></div>${serviceContextVisual(s.slug)}</section>
${serviceRoadmap(s.slug)}
<section class="service-scope" aria-labelledby="scope-title"><h2 id="scope-title">Что входит в работу</h2><div>${s.items.map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
<section class="service-context service-context-reverse">${serviceResultVisual(s.slug)}<div class="service-context-copy"><h2>Что будет на выходе</h2><p>${s.result}</p></div></section>
<section class="service-context"><h2>От чего зависят сроки и стоимость</h2><p>${s.scope}</p></section>
<section class="service-examples"><h2>Посмотрите, как это устроено</h2><div>${s.cases.map(([slug,title])=>`<a href="/cases/${slug}/"><span>${title}</span>${arrow}</a>`).join('')}</div></section></div>
${faqBlock(s.faq)}
<section class="service-related wrap"><h2>Связанные услуги</h2><div>${services.filter(item=>item.slug!==s.slug).map(item=>`<a href="/services/${item.slug}/"><span>${item.name}</span>${arrow}</a>`).join('')}</div></section></main>`+studioFooter().replaceAll('href="#','href="/#');}
export function privacyPage(){return head('Конфиденциальность','Как устроены данные и внешние ссылки на сайте Lancer Agency.','/privacy/')+nav()+`<main class="service-page wrap privacy-page" id="main">${breadcrumbs('/privacy/','Конфиденциальность')}<h1>Конфиденциальность</h1><p>Обновлено <time datetime="2026-09-27">27 сентября 2026 года</time>.</p><section><h2>Этот сайт</h2><p>Сайт показывает услуги, кейсы и демонстрационные интерфейсы. На страницах агентства нет формы сбора контактов, рекламных пикселей и подключённых счётчиков аналитики. Интерактивные демо не проводят реальные платежи и не отправляют заявки.</p></section><section><h2>Обращение в Telegram</h2><p>Кнопки обсуждения проекта открывают Telegram. Если вы отправите сообщение, переданные вами сведения будут доступны адресату для ответа и обсуждения проекта. Работа самого Telegram регулируется правилами этого сервиса. Вопросы о сообщениях и их удалении можно направить в <a href="https://t.me/LancerManager" target="_blank" rel="noopener noreferrer">@LancerManager</a>.</p></section><section><h2>Размещение и технические данные</h2><p>Сайт размещён на GitHub Pages. При обращении к серверу хостинг получает технические данные запроса. Сведения о его обработке данных приведены в <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">политике конфиденциальности GitHub</a>.</p></section></main>`+footer(true);}
