import {asciiMotif} from './ascii-motif.mjs';

const stories={
 websites:{title:'Структура под сценарий посетителя',caption:'Пример связей между страницами. Для одного предложения путь может быть короче.',body:`<div class="site-map"><div class="map-root">Главная</div><div class="map-branches"><span>Предложение</span><span>Каталог</span><span>О компании</span></div><div class="map-action">Заявка <span aria-hidden="true">↗</span></div></div>`,labels:['Сайт','Исходный код','Описание интеграций'],note:'Интерфейс и материалы остаются у вас.'},
 'telegram-mini-apps':{title:'Общение и интерфейс связаны',caption:'Пример: бот сообщает о событии, Mini App даёт экран для действия, сервер обрабатывает данные.',body:`<div class="telegram-map"><div class="telegram-core">Telegram</div><div class="telegram-pair"><div><span class="diagram-symbol" aria-hidden="true">↗</span><strong>Бот</strong><span>Команды · сообщения</span></div><div><span class="diagram-symbol" aria-hidden="true">▦</span><strong>Mini App</strong><span>Экраны · действия</span></div></div><div class="telegram-server">Сервер <span>Данные и правила продукта</span></div></div>`,labels:['Mini App','Бот','Сервер'],note:'Три части работают как один продукт.'},
 crm:{title:'Процесс виден на одном экране',caption:'Пример рабочих статусов. Названия, переходы и права определяем под вашу команду.',body:`<div class="crm-board"><div><h4><i></i>Новая</h4><div class="board-record"><span>Обращение</span><b></b><b></b></div></div><div><h4><i></i>В работе</h4><div class="board-record"><span>Ответственный</span><b></b><small>Следующее действие</small></div></div><div><h4><i></i>Завершена</h4><div class="board-record"><span>Результат</span><b></b><small>История сохранена</small></div></div></div><div class="board-trail"><span>Роль</span><span aria-hidden="true">→</span><span>Доступ</span><span aria-hidden="true">→</span><span>Действие</span></div>`,labels:['Кабинет','Серверные методы','Документация'],note:'Рабочий процесс вместе с описанием запуска.'},
 automation:{title:'Учитываем оба пути события',caption:'Пример логики интеграции: успешная обработка и отдельный путь при ошибке.',body:`<div class="automation-map"><div class="automation-input">Событие</div><div class="automation-check">Проверка условий</div><div class="automation-branches"><div><i></i><strong>Успех</strong><span>Обновить данные<br>Отправить уведомление</span></div><div><i></i><strong>Ошибка</strong><span>Записать причину<br>Повторить по правилу</span></div></div></div>`,labels:['Сценарий','Интеграции','Правила обработки'],note:'Связи между сервисами с понятной логикой.'}
};

export function serviceContextVisual(slug){
 const s=stories[slug];
 return `<figure class="service-context-visual" data-service-visual="${slug}"><figcaption>${s.title}</figcaption>${s.body}<p class="diagram-caption">${s.caption}</p></figure>`;
}

export function serviceResultVisual(slug){
 const s=stories[slug];
 return `<figure class="service-delivery"><div class="delivery-art">${asciiMotif(slug)}<span>${s.note}</span></div><figcaption>Передача проекта</figcaption><ul>${s.labels.map(label=>`<li><span aria-hidden="true">↳</span>${label}</li>`).join('')}</ul></figure>`;
}
