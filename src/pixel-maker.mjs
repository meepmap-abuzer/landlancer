// Reuse the approved pixels: face/body stay fixed, lower legs change in discrete poses.
const seatedSource='/assets/pixel/maker-idle-stable-v6.png';
let makerId=0;
const legOffsets=[
 [0,0,0,0,0,0],[1,3,-1,-1,-3,0],[2,5,-2,-2,-5,1],[1,3,-1,-1,-3,0],
 [0,0,0,0,0,0],[-1,-3,0,1,3,-1],[-2,-5,1,2,5,-2],[-1,-3,0,1,3,-1]
];
function seatedMotion(){
 const id=`maker-legs-${++makerId}`;
 const clips=[['left-shin','M0 202H171L169 225H0Z'],['right-shin','M171 202H256V225H169Z'],['left-boot','M0 223H169L181 256H0Z'],['right-boot','M169 223H256V256H181Z']];
 const defs=clips.map(([part,d])=>`<clipPath id="${id}-${part}" clipPathUnits="userSpaceOnUse"><path d="${d}"/></clipPath>`).join('');
 const piece=(part,x,y=0)=>`<g transform="translate(${x} ${y})"><image href="${seatedSource}" width="256" height="256" clip-path="url(#${id}-${part})"/></g>`;
 const legs=legOffsets.map(([ls,lb,ly,rs,rb,ry],frame)=>`<g class="maker-leg-frame leg-frame-${frame}" style="--frame:${frame}">${piece('left-shin',ls)}${piece('right-shin',rs)}${piece('left-boot',lb,ly)}${piece('right-boot',rb,ry)}</g>`).join('');
 // Four finger poses alternate the two key presses; wrist and laptop never move.
 const fingers=[[0,2],[1,0],[2,1],[0,0]].map(([left,right],frame)=>`<g class="maker-type-frame type-frame-${frame}" style="--frame:${frame}"><path d="M132 161v-8h5v1h3v7Z" fill="#fcc593"/><path d="M133 ${153-left}h4v1h2v5h-2v-3h-2v4h-2Z" fill="#17191c"/><path d="M134 ${154-left}h2v4h-2Z" fill="#fcc593"/><path d="M141 ${155-right}h4v1h2v5h-2v-3h-2v3h-2Z" fill="#17191c"/><path d="M142 ${156-right}h2v3h-2Z" fill="#fcc593"/></g>`).join('');
 return `<defs>${defs}</defs>${legs}${fingers}`;
}
function pixelDetails(pose){
 const guide=pose==='guide',eyes=guide?[[130,69,18,13],[156,69,13,13]]:[[128,70,18,15],[153,71,14,14]];
 const lids=eyes.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fcc593"/><path d="M${x+2} ${y+7}h3v-2h${w-10}v2h3v2h-3v-1h-${w-10}v1h-3Z" fill="#17191c"/>`).join('');
 return `<svg class="maker-details" viewBox="0 0 256 256" aria-hidden="true" shape-rendering="crispEdges">${guide?'':seatedMotion()}<g class="maker-blink">${lids}</g></svg>`;
}
export function pixelMaker(pose='idle',{eager=false}={}){
 const file=pose==='guide'?'maker-guide-stable-v6':'maker-idle-stable-v6';
 return `<span class="pixel-maker pixel-${pose}" data-digital-scene aria-hidden="true"><img class="pixel-sheet" src="/assets/pixel/${file}.png" alt="" width="256" height="256" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''}>${pixelDetails(pose)}</span>`;
}
export function makerStage(){return `<div class="maker-stage" aria-hidden="true"><span class="maker-note note-left">Хорошие идеи<br>начинаются здесь.</span><div class="maker-browser"><div><i></i><i></i><i></i><span>lancer.agency</span></div></div>${pixelMaker('idle',{eager:true})}<span class="maker-note note-right">Больше, чем<br>просто сайты.</span></div>`;}
