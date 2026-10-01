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
[document.querySelector('.end-art')].filter(Boolean).forEach(element => visible.observe(element));
document.addEventListener('visibilitychange', () => {
  [document.querySelector('.end-art')].filter(Boolean).forEach(element => {
    const rect = element.getBoundingClientRect();
    element.classList.toggle('is-visible',!document.hidden && rect.bottom>0 && rect.top<innerHeight);
  });
  if(document.hidden) animations.forEach(animation => animation.cancel());
});
const reveal = new IntersectionObserver(entries => {
  entries.filter(entry => entry.isIntersecting).forEach(({target},index) => {
    if(allowed()) animate(target,[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:700,delay:Math.min(index,2)*70,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    reveal.unobserve(target);
  });
},{threshold:.08});
document.querySelectorAll('.case-story,.case-capability-grid,.case-related,.studio-project,.service-tile,.industry-card,.new-section-heading,.studio-process,.seo-faq,.end-contact,.end-columns').forEach(element => reveal.observe(element));
const track = document.querySelector('.industry-track');
const controls = [...document.querySelectorAll('[data-industry-direction]')];
function updateControls(){
  controls.forEach(button => button.disabled = Number(button.dataset.industryDirection)<0 ? track.scrollLeft<2 : track.scrollLeft+track.clientWidth>=track.scrollWidth-2);
}
controls.forEach(button => button.addEventListener('click', () => track.scrollBy({left:Number(button.dataset.industryDirection)*(track.querySelector('.industry-card').offsetWidth+18),behavior:allowed()?'smooth':'instant'})));
track?.addEventListener('scroll',updateControls,{passive:true});
if(track){new ResizeObserver(updateControls).observe(track);updateControls();}

if(document.querySelector('.lunar-stage')) import('/sculpture/scene.js?v=lunar-1').catch(()=>{document.querySelector('.lunar-hint').textContent='Не удалось загрузить сад. Обновите страницу.'});
