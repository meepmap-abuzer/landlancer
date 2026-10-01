import {setupDisclosures} from '/disclosures.mjs?v=1';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
const pause = document.querySelector('.garden-motion');
const allowed = () => !paused && !reduced.matches;
const animations = new Set();
function animate(element, frames, options) {
 const a=element.animate(frames,options);animations.add(a);
 a.finished.catch(()=>{}).finally(()=>animations.delete(a));return a;
}
function syncMotion() {
  document.body.classList.toggle('motion-paused', !allowed());
  if(!allowed()) animations.forEach(animation => animation.cancel());
  pause?.setAttribute('aria-pressed', String(paused));
  if(pause) pause.textContent = paused ? 'Включить анимацию' : 'Пауза анимации';
}
pause?.addEventListener('click', () => { paused = !paused; syncMotion(); });
reduced.addEventListener('change', syncMotion);
document.addEventListener('lancer:motion', ({detail}) => { paused = detail.paused; syncMotion(); });
syncMotion();
const visible = new IntersectionObserver(entries => {
  for(const {target,isIntersecting} of entries) target.classList.toggle('is-visible',isIntersecting && !document.hidden);
}, {threshold:.05});
const animatedSurfaces=[document.querySelector('.end-art'),...document.querySelectorAll('.service-schematic')].filter(Boolean);
animatedSurfaces.forEach(element => visible.observe(element));
document.addEventListener('visibilitychange', () => {
  animatedSurfaces.forEach(element => {
    const rect = element.getBoundingClientRect();
    element.classList.toggle('is-visible',!document.hidden && rect.bottom>0 && rect.top<innerHeight);
  });
  if(document.hidden) animations.forEach(animation => animation.cancel());
});
const reveal = new IntersectionObserver(entries => {
  entries.filter(entry => entry.isIntersecting).forEach(({target},index) => {
    if(allowed()) animate(target,[{opacity:0,transform:'translateY(32px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:850,delay:Math.min(index,3)*85,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    reveal.unobserve(target);
  });
},{threshold:.08});
document.querySelectorAll('.case-opening-copy,.case-story,.case-capability-grid,.case-related,.studio-project,.service-tile,.industry-card,.new-section-heading,.studio-process,.seo-faq,.end-contact,.end-columns,.service-roadmap,.service-schematic,.service-intro,.service-context,.service-scope article,.service-examples,.service-related').forEach(element => reveal.observe(element));
setupDisclosures({reduced,allowed});
// A few moving ASCII pixels, only while the small motif is in view.
const motifs=[...document.querySelectorAll('[data-motif]')].map(element=>({element,original:element.textContent,visible:false}));
let motifFrame=0,motifLast=0,motifStep=0;
function motifTick(now){motifFrame=0;if(!allowed()||document.hidden||!motifs.some(m=>m.visible))return;
 if(now-motifLast>480){motifLast=now;motifStep++;motifs.forEach(m=>{if(!m.visible)return;let dot=0;m.element.textContent=m.original.replace(/[.+]/g,c=>(dot++===motifStep%6?'*':c));});}
 motifFrame=requestAnimationFrame(motifTick);
}
function syncMotifs(){cancelAnimationFrame(motifFrame);motifFrame=0;if(allowed()&&!document.hidden&&motifs.some(m=>m.visible))motifFrame=requestAnimationFrame(motifTick);else motifs.forEach(m=>m.element.textContent=m.original);}
const motifObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{const m=motifs.find(m=>m.element===e.target);m.visible=e.isIntersecting;m.element.toggleAttribute('data-active',m.visible);});syncMotifs();},{threshold:.1});
motifs.forEach(m=>motifObserver.observe(m.element));
document.addEventListener('visibilitychange',syncMotifs);reduced.addEventListener('change',syncMotifs);document.addEventListener('lancer:motion',syncMotifs);
const track = document.querySelector('.industry-track');
const controls = [...document.querySelectorAll('[data-industry-direction]')];
function updateControls(){
  controls.forEach(button => button.disabled = Number(button.dataset.industryDirection)<0 ? track.scrollLeft<2 : track.scrollLeft+track.clientWidth>=track.scrollWidth-2);
}
controls.forEach(button => button.addEventListener('click', () => track.scrollBy({left:Number(button.dataset.industryDirection)*(track.querySelector('.industry-card').offsetWidth+18),behavior:allowed()?'smooth':'instant'})));
track?.addEventListener('scroll',updateControls,{passive:true});
if(track){new ResizeObserver(updateControls).observe(track);updateControls();}

const garden=document.querySelector('.lunar-stage');
if(garden){
 const loadGarden=()=>{const rect=garden.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight+150){gardenObserver.observe(garden);return;}import('/sculpture/scene.js?v=lunar-8').catch(()=>{garden.dataset.sceneReady='failed';garden.querySelector('.lunar-status').textContent='Не удалось загрузить сад. Обновите страницу.';});};
 const gardenObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){gardenObserver.disconnect();requestAnimationFrame(()=>requestAnimationFrame(()=>{if('requestIdleCallback' in window)requestIdleCallback(loadGarden,{timeout:1500});else setTimeout(loadGarden,80);}));}},{rootMargin:'150px'});
 gardenObserver.observe(garden);
}
