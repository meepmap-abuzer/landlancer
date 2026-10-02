import {icon} from './agency-shared.mjs';
const covers={maverick:['Telegram Mini App','Покупки, баллы и награды в одном приложении'],loyalty:['Mini App + CRM','Программа лояльности и кабинет бизнеса'],'gift-roulette':['Telegram Mini App','Игровые сценарии внутри Telegram'],tailcare:['Веб-платформа','Помогаем питомцам найти дом']};
export const projectScreens={maverick:['club-home.webp',390,844],loyalty:['12k-dashboard.webp',1425,869],'gift-roulette':['gift-home-current.webp',430,865],tailcare:['pets-home.webp',1425,792]};
export function projectCover(slug,name,{illustrated=false}={}){
 const [type,description]=covers[slug],[file,width,height]=illustrated?[`${slug}-mono-v2.webp`,1536,1024]:projectScreens[slug];
 const mobile=['maverick','gift-roulette'].includes(slug);
 const style=illustrated?'project-render':`project-interface ${mobile?'project-interface-mobile':''}`;
 const src=illustrated?`/assets/covers/${file}`:`/assets/screenshots/${file}`;
 const alt=illustrated?`${name}: визуализация интерфейса на устройстве`:`${name}: интерфейс продукта`;
 return `<a class="portfolio-cover-link" href="/cases/${slug}/"><div class="project-photo ${style}"><img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy"><span class="studio-label">${type}</span></div><div class="portfolio-description"><div><h3>${name}</h3><p>${description}</p></div><span class="portfolio-arrow">${icon('arrow')}</span></div></a>`;
}
