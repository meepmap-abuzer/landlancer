// One fixed drawing owns the silhouette; only local pixel details change.
function pixelDetails(pose){
 const guide=pose==='guide',eyes=guide?[[130,69,18,13],[156,69,13,13]]:[[128,70,18,15],[153,71,14,14]];
 const lids=eyes.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fcc593"/><path d="M${x+2} ${y+7}h3v-2h${w-10}v2h3v2h-3v-1h-${w-10}v1h-3Z" fill="#17191c"/>`).join('');
 const fingers=guide?'':`<g class="maker-type"><rect x="133" y="154" width="3" height="2" fill="#fcc593"/><rect x="137" y="156" width="2" height="2" fill="#17191c"/></g>`;
 return `<svg class="maker-details" viewBox="0 0 256 256" aria-hidden="true" shape-rendering="crispEdges"><g class="maker-blink">${lids}</g>${fingers}</svg>`;
}
export function pixelMaker(pose='idle',{eager=false}={}){
 const file=pose==='guide'?'maker-guide-stable-v6':'maker-idle-stable-v6';
 return `<span class="pixel-maker pixel-${pose}" data-digital-scene aria-hidden="true"><img class="pixel-sheet" src="/assets/pixel/${file}.png" alt="" width="256" height="256" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''}>${pixelDetails(pose)}</span>`;
}
export function makerStage(){return `<div class="maker-stage" aria-hidden="true"><span class="maker-note note-left">Хорошие идеи<br>начинаются здесь.</span><div class="maker-browser"><div><i></i><i></i><i></i><span>lancer.agency</span></div></div>${pixelMaker('idle',{eager:true})}<span class="maker-note note-right">Больше, чем<br>просто сайты.</span></div>`;}
