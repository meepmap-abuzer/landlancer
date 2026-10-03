import {pixelMaker} from './pixel-maker.mjs';
import {icon} from './agency-shared.mjs';
const scenes={
 loyalty:{name:'12К',description:'Программа лояльности\nи кабинет бизнеса',file:'12k-dashboard.webp',width:1425,height:869,kind:'desktop',ground:'desk',pose:'guide',second:['12k-home.webp',375,812]},
 maverick:{name:'Maverick',description:'Покупки, баллы и награды\nв одном Mini App',file:'club-home.webp',width:390,height:844,kind:'phone',ground:'fabric',pose:'guide'},
 tailcare:{name:'TailCare',description:'Помогаем питомцам\nнайти дом',file:'pets-home.webp',width:1425,height:792,kind:'desktop',ground:'desk',pose:'guide'},
 'gift-roulette':{name:'Gift Roulette',description:'Игровые сценарии\nи коллекционные подарки',file:'gift-mines-current.webp',width:430,height:865,kind:'phone',ground:'fabric',pose:'idle',second:['gaming-case.webp',719,1280]}
};
export const projectSceneData=scenes;
export function projectScene(slug,{eager=false}={}){
 const s=scenes[slug],file=`/assets/scenes/${slug}-table-v3`;
 return `<div class="project-scene scene-${slug}" aria-label="Проект ${s.name}"><img class="scene-photo" src="${file}.webp" srcset="${file}-768.webp 768w,${file}.webp 1536w" sizes="(max-width:750px) 100vw, (max-width:1450px) 50vw,640px" alt="${s.name}: визуализация интерфейса на устройствах, стоящих на столе" width="1536" height="1024" loading="${eager?'eager':'lazy'}" decoding="async">${pixelMaker(s.pose)}</div>`;
}
export function projectSceneCard(slug){const s=scenes[slug];return `<a class="project-scene-link" href="/cases/${slug}/">${projectScene(slug)}<div class="project-scene-copy"><h3>${s.name}</h3><p>${s.description.replace('\n','<br>')}</p><span class="scene-action">Смотреть проект ${icon('arrow')}</span></div></a>`;}
