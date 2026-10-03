import {setupDisclosures} from '/disclosures.mjs?v=1';
import {setupStudioMotion} from '/studio-motion.mjs?v=pixel-1';
import {setupStudioScroll} from '/studio-scroll.mjs?v=demo-wheel-1';
// Shared disclosures preserve their native no-JS behavior.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
setupDisclosures({reduced,allowed:()=>!reduced.matches});
const tabs=[...document.querySelectorAll('.process-tabs [role="tab"]')];
function selectTab(tab,focus=false){
 tabs.forEach(item=>{
  const selected=item===tab;
  item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;
  document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;
 });
 if(focus)tab.focus();
 const panel=document.getElementById(tab.getAttribute('aria-controls'));
 tabs.forEach(item=>document.getElementById(item.getAttribute('aria-controls')).getAnimations({subtree:true}).forEach(a=>a.cancel()));
 if(!reduced.matches)[...panel.children].forEach((child,i)=>child.animate([{opacity:.2,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:460,delay:i*35,easing:'cubic-bezier(.16,1,.3,1)'}));
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectTab(tab));
 tab.addEventListener('keydown',event=>{
  let target;
  if(event.key==='ArrowRight')target=tabs[(index+1)%tabs.length];
  if(event.key==='ArrowLeft')target=tabs[(index+tabs.length-1)%tabs.length];
  if(event.key==='Home')target=tabs[0];
  if(event.key==='End')target=tabs.at(-1);
  if(target){event.preventDefault();selectTab(target,true);}
 });
});
function settleTabMotion(){if(reduced.matches||document.hidden)tabs.forEach(tab=>document.getElementById(tab.getAttribute('aria-controls')).getAnimations({subtree:true}).forEach(a=>a.finish()));}
reduced.addEventListener('change',settleTabMotion);document.addEventListener('visibilitychange',settleTabMotion);
const object=document.querySelector('.brand-object');
if(object){
 let loaded=false;
 const load=()=>{if(loaded)return;loaded=true;import('/sculpture/scene.js?v=object-1').catch(()=>object.dataset.objectState='fallback');};
 const objectObserver=new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting)){
   objectObserver.disconnect();
   if('requestIdleCallback' in window)requestIdleCallback(load,{timeout:1000});else requestAnimationFrame(load);
  }
 },{rootMargin:'100px'});
 objectObserver.observe(object);
}
// The interface diagram is visible without JS. Pause decorative loops offscreen.
const digitalScenes=[...document.querySelectorAll('[data-digital-scene]')];
const sceneVisibility=new Map(digitalScenes.map(scene=>[scene,false]));
function syncScenes(){digitalScenes.forEach(scene=>scene.classList.toggle('digital-running',sceneVisibility.get(scene)&&!reduced.matches&&!document.hidden));}
const sceneObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>sceneVisibility.set(entry.target,entry.isIntersecting));syncScenes();},{threshold:.05});
digitalScenes.forEach(scene=>sceneObserver.observe(scene));
document.addEventListener('visibilitychange',syncScenes);reduced.addEventListener('change',syncScenes);
setupStudioMotion(reduced);
setupStudioScroll(reduced);
// Side branding leaves the scrolled view; the frosted navigation remains readable.
const floatingHeader=document.querySelector('.lancer-site .studio-nav');
if(floatingHeader){const syncHeader=()=>floatingHeader.toggleAttribute('data-scrolled',scrollY>90);addEventListener('scroll',syncHeader,{passive:true});syncHeader();}
