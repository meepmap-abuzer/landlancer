// Authored interface geometry, not product screenshots or performance claims.
import {mascot} from './mascot.mjs';
const rect=(x,y,w,h,r=8,cls='signal-panel')=>`<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
const line=(x,y,w,cls='signal-line')=>`<path class="${cls}" d="M${x} ${y}h${w}"/>`;
const text=(x,y,label)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${label}</text>`;
const window=(x,y,w,h)=>rect(x,y,w,h,14)+line(x,y+34,w,'signal-divider')+`<g class="signal-dots"><circle cx="${x+16}" cy="${y+17}" r="2"/><circle cx="${x+25}" cy="${y+17}" r="2"/><circle cx="${x+34}" cy="${y+17}" r="2"/></g>`;
const view=body=>`<svg class="digital-signal" viewBox="0 0 600 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

export function studioSignal(){
 return mascot();
}

const graphics={
 websites:window(124,60,351,258)+rect(144,114,173,115,7,'signal-block')+line(333,136,100)+line(333,156,82)+rect(333,182,101,31,7,'signal-bright')+line(145,266,151)+line(145,283,278),
 'web-apps':window(118,67,365,256)+rect(134,115,68,186,6,'signal-block')+line(219,131,95)+rect(219,155,245,65,7,'signal-block')+[0,1,2].map(i=>line(232,171+i*16,200)).join('')+rect(219,237,116,65,7,'signal-block')+rect(348,237,116,65,7,'signal-block'),
 'telegram-mini-apps':rect(224,42,151,299,23)+rect(238,83,123,173,9,'signal-block')+rect(270,55,59,7,4,'signal-bright')+line(253,111,65)+line(253,128,87)+rect(250,153,101,54,6,'signal-bright')+line(253,226,82)+rect(250,274,101,31,7,'signal-bright')+`<path class="signal-route" d="M224 162H160V229H119M375 219H445V147H481"/>`+rect(82,203,82,54)+rect(437,115,82,54),
 crm:window(89,65,420,253)+[0,1,2].map(i=>rect(110+i*128,133,111,162,6,'signal-block')+line(127+i*128,116,76)+rect(124+i*128,149,83,46,5)+line(137+i*128,165,49)+line(137+i*128,178,32)+rect(124+i*128,208,83,46,5)).join(''),
 automation:`<path class="signal-route" d="M128 186H221M377 186H472M301 125V76H473"/>`+rect(61,151,110,70,12)+text(116,186,'Данные')+rect(225,124,148,124,22)+text(299,186,'AI / API')+rect(429,42,108,68,12)+text(483,76,'Проверка')+rect(429,151,108,70,12)+text(483,186,'Действие')+`<path class="signal-trace" d="M128 186H225"/><path class="signal-trace signal-trace-late" d="M373 186H429"/>`,
 mvp:rect(180,43,235,296,18)+rect(198,64,200,38,7,'signal-block')+rect(198,118,200,116,7,'signal-block')+line(215,143,104)+line(215,162,157)+rect(198,250,120,33,6,'signal-bright')+line(198,313,143)+`<path class="signal-route" d="M119 114H163M430 274H481"/>`+rect(75,93,42,42,10)+rect(481,253,42,42,10)
};
export function serviceSignal(slug){return `<div class="service-signal" data-digital-scene>${view(graphics[slug]||graphics.websites)}</div>`;}
