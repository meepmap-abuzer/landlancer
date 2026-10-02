import {pixelMaker} from './pixel-maker.mjs';
import {icon} from './agency-shared.mjs';
const scenes={
 loyalty:{name:'12К',description:'Программа лояльности\nи кабинет бизнеса',file:'12k-dashboard.webp',width:1425,height:869,kind:'desktop',ground:'desk',pose:'guide',second:['12k-home.webp',375,812]},
 maverick:{name:'Maverick',description:'Покупки, баллы и награды\nв одном Mini App',file:'club-home.webp',width:390,height:844,kind:'phone',ground:'fabric',pose:'guide'},
 tailcare:{name:'TailCare',description:'Помогаем питомцам\nнайти дом',file:'pets-home.webp',width:1425,height:792,kind:'desktop',ground:'desk',pose:'guide'},
 'gift-roulette':{name:'Gift Roulette',description:'Игровые сценарии\nи коллекционные подарки',file:'gift-mines-current.webp',width:430,height:865,kind:'phone',ground:'fabric',pose:'idle',second:['gaming-case.webp',719,1280]}
};
export const projectSceneData=scenes;
function device(file,width,height,kind,name,secondary,eager){return `<div class="scene-device device-${kind}${secondary?' device-secondary':''}">${kind==='desktop'?'<div class="device-toolbar" aria-hidden="true"><i></i><i></i><i></i></div>':''}<img src="/assets/screenshots/${file}" alt="${name}: настоящий интерфейс ${secondary?'приложения':'продукта'}" width="${width}" height="${height}" loading="${eager?'eager':'lazy'}"></div>`;}
export function projectScene(slug,{eager=false}={}){
 const s=scenes[slug];
 return `<div class="project-scene scene-${slug}" aria-label="Настоящие экраны ${s.name}"><img class="scene-ground" src="/assets/pixel/studio-${s.ground}-v1.webp" alt="" width="1100" height="733" loading="${eager?'eager':'lazy'}"><div class="scene-shade" aria-hidden="true"></div><div class="scene-devices">${s.second?device(...s.second,'phone',s.name,true,eager):''}${device(s.file,s.width,s.height,s.kind,s.name,false,eager)}</div>${pixelMaker(s.pose)}</div>`;
}
export function projectSceneCard(slug){const s=scenes[slug];return `<a class="project-scene-link" href="/cases/${slug}/">${projectScene(slug)}<div class="project-scene-copy"><h3>${s.name}</h3><p>${s.description.replace('\n','<br>')}</p><span class="scene-action">Смотреть проект ${icon('arrow')}</span></div></a>`;}
