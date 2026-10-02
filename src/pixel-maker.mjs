// Four separately drawn game frames; the idle and guide share the same character.
export function pixelMaker(pose='idle',{eager=false}={}){
 const file=pose==='guide'?'maker-guide-v1':'maker-idle-v1';
 return `<span class="pixel-maker pixel-${pose}" data-digital-scene aria-hidden="true"><img class="pixel-sheet" src="/assets/pixel/${file}.webp" alt="" width="288" height="288" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''}></span>`;
}
export function makerStage(){return `<div class="maker-stage" aria-hidden="true"><span class="maker-note note-left">Хорошие идеи<br>начинаются здесь.</span><div class="maker-browser"><div><i></i><i></i><i></i><span>lancer.agency</span></div></div>${pixelMaker('idle',{eager:true})}<span class="maker-note note-right">Больше, чем<br>просто сайты.</span></div>`;}
