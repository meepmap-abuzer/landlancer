// Four fixed atlas crops cross-switch in stepped time; only redrawn pixels animate.
export function pixelMaker(pose='idle',{eager=false}={}){
 const file=pose==='guide'?'maker-guide-v5':'maker-idle-v5';
 return `<span class="pixel-maker pixel-${pose}" data-digital-scene aria-hidden="true">${[0,1,2,3].map(frame=>`<span class="sprite-frame frame-${frame}"><img class="pixel-sheet" src="/assets/pixel/${file}.png" alt="" width="240" height="240" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''}></span>`).join('')}</span>`;
}
export function makerStage(){return `<div class="maker-stage" aria-hidden="true"><span class="maker-note note-left">Хорошие идеи<br>начинаются здесь.</span><div class="maker-browser"><div><i></i><i></i><i></i><span>lancer.agency</span></div></div>${pixelMaker('idle',{eager:true})}<span class="maker-note note-right">Больше, чем<br>просто сайты.</span></div>`;}
