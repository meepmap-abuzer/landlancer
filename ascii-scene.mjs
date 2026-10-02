import {ASCII_WIDTH,ASCII_HEIGHT,ASCII_COLORS,ribbonFrame} from './ascii-geometry.mjs?v=ascii-1';

export function mountAscii(scene,reduced){
 const canvas=scene.querySelector('canvas'),context=canvas.getContext('2d',{alpha:true});
 if(!context)return;
 const dpr=Math.min(devicePixelRatio||1,1.5);
 canvas.width=ASCII_WIDTH*dpr;canvas.height=ASCII_HEIGHT*dpr;
 context.setTransform(dpr,0,0,dpr,0,0);context.font='10px monospace';
 let visible=false,frame=0,last=0,previous=0,phase=0,x=0,y=0,targetX=0,targetY=0;
 function draw(){
  const start=performance.now();
  context.clearRect(0,0,ASCII_WIDTH,ASCII_HEIGHT);
  const cells=ribbonFrame(phase,x,y);
  for(let shade=0;shade<ASCII_COLORS.length;shade++){
   context.fillStyle=ASCII_COLORS[shade];
   for(const cell of cells)if(cell.shade===shade)context.fillText(cell.char,cell.x,cell.y);
  }
  scene.dataset.renderMs=(performance.now()-start).toFixed(1);
 }
 function tick(now){
  frame=0;
  if(!visible||document.hidden||reduced.matches)return;
  const dt=Math.min((now-previous)/1000,.05),blend=1-Math.exp(-dt*5.5);previous=now;
  phase+=dt*.42;x+=(targetX-x)*blend;y+=(targetY-y)*blend;
  if(now-last>=1000/60-.5){
   last=now;draw();
  }
  frame=requestAnimationFrame(tick);
 }
 function sync(){
  cancelAnimationFrame(frame);frame=0;
  const running=visible&&!document.hidden&&!reduced.matches;
  scene.dataset.asciiState=running?'running':'rest';
  if(running){previous=last=performance.now();frame=requestAnimationFrame(tick);}
 }
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05});
 observer.observe(scene);
 scene.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const box=scene.getBoundingClientRect();
  targetX=(event.clientX-box.left)/box.width*2-1;targetY=(event.clientY-box.top)/box.height*2-1;
 },{passive:true});
 scene.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 draw();scene.dataset.asciiReady='true';sync();
}
