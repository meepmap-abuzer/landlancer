// The existing versioned Lenis package is optional; native scrolling is the fallback.
export function setupStudioScroll(reduced){
 let lenis,frame=0,ticking=false,loading=false,disposed=false;
 const setState=state=>document.body.dataset.scrollState=state;
 function tick(now){
  frame=0;
  if(!lenis||document.hidden||reduced.matches)return;
  ticking=true;lenis.raf(now);ticking=false;
  if(lenis.isScrolling==='smooth'){setState('moving');frame=requestAnimationFrame(tick);}
  else setState('rest');
 }
 function kick(){if(lenis&&!frame&&!ticking&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
 function destroy(){cancelAnimationFrame(frame);frame=0;lenis?.destroy();lenis=undefined;setState('native');}
 async function mount(){
  if(lenis||loading||disposed||reduced.matches)return;
  loading=true;
  try{
   const {default:Lenis}=await import('/vendor/lenis.mjs?v=1.3.26');
   if(disposed||reduced.matches)return;
   lenis=new Lenis({lerp:.075,wheelMultiplier:.85,syncTouch:false,autoRaf:false,
    anchors:{offset:-104,onStart:kick},
    prevent:node=>node.matches('dialog,.interactive-stage,.product-demo,[data-lenis-prevent]')});
   lenis.on('virtual-scroll',kick);lenis.on('scroll',kick);setState('rest');
  }catch{setState('native');}finally{loading=false;}
 }
 const sync=()=>reduced.matches?destroy():mount();
 const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;lenis?.stop();setState(lenis?'rest':'native');}else{lenis?.start();kick();}};
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',visibility);
 window.addEventListener('pagehide',()=>{disposed=true;destroy();reduced.removeEventListener('change',sync);document.removeEventListener('visibilitychange',visibility);},{once:true});
 setState('native');mount();
}
