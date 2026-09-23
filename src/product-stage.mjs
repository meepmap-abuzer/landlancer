import {icon} from './agency-shared.mjs';
const labels={maverick:['QR-код','Награды','Задания','Магазин'],'gift-roulette':['Кейсы','Мины','Апгрейд','Краш'],tailcare:['Главная','Каталог','Помощь'],loyalty:['Карта','Задания','Магазин','Кабинет']};
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const previewCopy={maverick:['Покупка. Баллы. Награда.',['QR-активация','Магазин мерча']],loyalty:['Участники и бизнес — в одной системе.',['Mini App','Кабинет лояльности']],'gift-roulette':['Четыре игровых сценария. Один Mini App.',['Мины и кейсы','Апгрейд и краш']],tailcare:['Помогаем питомцам найти дом.',['Каталог','Поиск рядом']]};
export function projectPreview(slug,name,img,device){const [title,tags]=previewCopy[slug];return `<div class="project-preview"><div class="preview-toolbar"><span>${icon('layers')} ${name}</span><small>${device==='phone'?'Telegram Mini App':'Веб-платформа'}</small></div><div class="preview-body"><div class="preview-context"><h4>${title}</h4><div>${tags.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="preview-canvas ${device==='browser'?'preview-wide':''}"><img src="/assets/screenshots/${slug==='gift-roulette'?'gift-home-current.webp':img}" alt="Интерфейс ${name}" loading="lazy"></div></div></div>`}
export function productStage(p){
 const features=p.theme==='gift'?[['Все игры в одном месте','Выбор игрового режима, быстрый доступ к профилю и единая навигация.','Четыре сценария внутри Telegram','gift-home-current.webp','grid'],...p.features.slice(1)]:p.features;
 const [title,description,caption,file]=features[0];
 const wide=p.theme==='tailcare'||file.includes('dashboard');
 return `<div class="product-stage glass" data-stage>
 <div class="stage-toolbar"><span class="stage-brand">${icon('layers')} ${p.name}</span><span class="stage-type">${p.type}</span><span class="stage-status"><i class="status-dot"></i> Обзор продукта</span></div>
 <div class="stage-tabs" role="tablist" aria-label="Экраны ${p.name}">${features.map(([title,description,caption,file],i)=>`<button type="button" role="tab" id="stage-tab-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" aria-controls="stage-panel" data-stage-src="${file}" data-stage-title="${escape(title)}" data-stage-description="${escape(description)}" data-stage-caption="${escape(caption)}" data-stage-wide="${p.theme==='tailcare'||file.includes('dashboard')}">${p.theme==='gift'&&i===0?'Все игры':labels[p.slug][i]}</button>`).join('')}</div>
 <div class="stage-body ${wide?'is-wide':''}" role="tabpanel" id="stage-panel" aria-labelledby="stage-tab-0">
 <div class="stage-context"><span class="eyebrow">Сценарий продукта</span><h3 data-stage-heading>${title}</h3><p data-stage-copy>${description}</p><div class="stage-detail"><span class="status-dot"></span><span data-stage-note>${caption}</span></div><span class="stage-hint">Нажмите на экран,<br>чтобы рассмотреть детали ${icon('arrow')}</span></div>
 <div class="stage-canvas"><button type="button" class="stage-capture" data-zoom="/assets/screenshots/${file}" data-caption="${p.name}: ${title}" aria-label="Увеличить экран ${p.name}"><img src="/assets/screenshots/${file}" alt="${p.name}: ${title}" fetchpriority="high"></button></div>
 </div></div>`;
}
