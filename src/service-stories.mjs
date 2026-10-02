import {asciiMotif} from './ascii-motif.mjs';
import {serviceFlow,serviceSequence} from './service-flow.mjs';

const stories={
 'web-apps':{title:'Один продукт, разные роли',caption:'Пример структуры. Интерфейс обращается к API, а сервер проверяет доступ и работает с данными.',body:serviceFlow([
  [{title:'Клиент',detail:'Личный кабинет'},{title:'Команда',detail:'Рабочий интерфейс'}],
  [{title:'Веб-сервис',accent:true}],
  [{title:'Сервер и данные'},{title:'Внешний API'}]
 ])},
 mvp:{title:'Первая версия проверяет главное',caption:'Пример границ MVP: один сценарий проходит путь от входа до результата. Остальное — следующие этапы.',body:serviceFlow([
  [{title:'Главный сценарий'}],
  [{title:'Интерфейс'},{title:'Логика'},{title:'Управление'}],
  [{title:'Рабочая версия',accent:true}]
 ])},
 websites:{title:'Структура под сценарий посетителя',caption:'Пример связей между страницами. Для одного предложения путь может быть короче.',body:serviceFlow([
  [{title:'Главная'}],
  [{title:'Предложение'},{title:'Каталог'},{title:'О компании'}],
  [{title:'Заявка',accent:true}]
 ]),labels:['Сайт','Исходный код','Описание интеграций'],note:'Интерфейс и материалы остаются у вас.'},
 'telegram-mini-apps':{title:'Общение и интерфейс связаны',caption:'Пример: бот сообщает о событии, Mini App даёт экран для действия, сервер обрабатывает данные.',body:serviceFlow([
  [{title:'Telegram'}],
  [{title:'Бот',detail:'Команды и сообщения'},{title:'Mini App',detail:'Экраны и действия'}],
  [{title:'Сервер',detail:'Данные и правила продукта',accent:true}]
 ]),labels:['Mini App','Бот','Сервер'],note:'Три части работают как один продукт.'},
 crm:{title:'Процесс виден на одном экране',caption:'Пример рабочих статусов. Названия, переходы и права определяем под вашу команду.',body:serviceSequence([
  {title:'Новая',detail:'Обращение'},
  {title:'В работе',detail:'Ответственный и следующее действие',accent:true},
  {title:'Завершена',detail:'Результат и история'}
 ]),labels:['Кабинет','Серверные методы','Документация'],note:'Рабочий процесс вместе с описанием запуска.'},
 automation:{title:'Учитываем оба пути события',caption:'Пример логики интеграции: успешная обработка и отдельный путь при ошибке.',body:serviceFlow([
  [{title:'Событие'}],
  [{title:'Проверка условий',accent:true}],
  [{title:'Успех',detail:'Обновить данные и отправить уведомление'},{title:'Ошибка',detail:'Записать причину и повторить по правилу'}]
 ]),labels:['Сценарий','Интеграции','Правила обработки'],note:'Связи между сервисами с понятной логикой.'}
};

export function serviceContextVisual(slug){
 const s=stories[slug];
 return `<figure class="service-context-visual" data-service-visual="${slug}"><figcaption>${s.title}</figcaption>${s.body}<p class="diagram-caption">${s.caption}</p></figure>`;
}

export function serviceResultVisual(slug){
 const s=stories[slug];
 return `<figure class="service-delivery"><div class="delivery-art">${asciiMotif(slug)}<span>${s.note}</span></div><figcaption>Передача проекта</figcaption><ul>${s.labels.map(label=>`<li><span aria-hidden="true">↳</span>${label}</li>`).join('')}</ul></figure>`;
}
