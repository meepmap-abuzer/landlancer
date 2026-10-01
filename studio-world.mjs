import {setupDisclosures} from '/disclosures.mjs?v=1';
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
const motifs=[...document.querySelectorAll('[data-motif]')].map(element=>({element,text:element.textContent,visible:false}));
let motifFrame=0,motifLast=0,step=0;
function tick(now){
 motifFrame=0;if(document.hidden||reduced.matches||!motifs.some(m=>m.visible))return;
 if(now-motifLast>700){motifLast=now;step++;motifs.forEach(m=>{if(m.visible){let dot=0;m.element.textContent=m.text.replace(/[.+]/g,c=>dot++===step%8?'*':c);}});}
 motifFrame=requestAnimationFrame(tick);
}
function syncMotifs(){
 cancelAnimationFrame(motifFrame);motifFrame=0;
 if(!reduced.matches&&!document.hidden&&motifs.some(m=>m.visible))motifFrame=requestAnimationFrame(tick);
 else motifs.forEach(m=>m.element.textContent=m.text);
}
const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{const m=motifs.find(m=>m.element===entry.target);m.visible=entry.isIntersecting;});
 syncMotifs();
});
motifs.forEach(m=>observer.observe(m.element));reduced.addEventListener('change',syncMotifs);document.addEventListener('visibilitychange',syncMotifs);
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
