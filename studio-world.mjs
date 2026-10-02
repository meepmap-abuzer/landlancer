import {setupDisclosures} from '/disclosures.mjs?v=1';
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
 if(!reduced.matches)panel.animate([{opacity:.7,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.16,1,.3,1)'});
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
// Content is never hidden while waiting for an entrance.
if(!reduced.matches){
 const scene=document.querySelector('.hero-signal');
 const copy=document.querySelector('.hero-copy');
 const preview=document.querySelector('.hero-project');
 const weaveFields=[...scene?.querySelectorAll('.weave-field')||[]];
 weaveFields.forEach((field,i)=>field.animate([{opacity:.25,transform:`translate(${(i-1)*32}px,${(i-1)*28}px) scale(.9)`,filter:'blur(2px)'},{opacity:1,transform:'none',filter:'none'}],{duration:1600,delay:i*100,easing:'cubic-bezier(.16,1,.3,1)'}));
 copy?.animate([{opacity:.7,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:900,easing:'cubic-bezier(.16,1,.3,1)'});
 preview?.animate([{opacity:.75,transform:'translateY(20px)',backdropFilter:'blur(8px)'},{opacity:1,transform:'none',backdropFilter:'blur(22px)'}],{duration:1100,easing:'cubic-bezier(.16,1,.3,1)'});
 const panels=[...document.querySelectorAll('.studio-project,.service-list>a,.service-system,.case-story')];
 const entrance=new IntersectionObserver(entries=>{
  const arriving=entries.filter(e=>e.isIntersecting);
  arriving.forEach(({target},i)=>{
   target.animate([{opacity:.72,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:650,delay:Math.min(i,2)*75,easing:'cubic-bezier(.16,1,.3,1)'});
   entrance.unobserve(target);
  });
 },{threshold:.08});
 panels.forEach(p=>entrance.observe(p));
 reduced.addEventListener('change',()=>{if(reduced.matches){entrance.disconnect();[scene,copy,preview,...weaveFields,...panels].filter(Boolean).forEach(p=>p.getAnimations().forEach(a=>a.finish()));}});
}
