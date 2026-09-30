const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const garden = document.querySelector('.lunar-garden');
const beetle = document.querySelector('.garden-beetle');
const pause = document.querySelector('.garden-motion');
let paused = false;
let moving = false;
let perch = false;
let pendingPointer = 0;
const allowed = () => !paused && !reduced.matches;
const animations = new Set();
function animate(element, frames, options) {
  const animation = element.animate(frames, options);
  animations.add(animation);
  animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  return animation;
}
function scuttle() {
  if (!beetle || moving || !allowed()) return;
  moving = true;
  perch = !perch;
  beetle.style.left = perch ? '36%' : '70%';
  beetle.style.top = perch ? '62%' : '45%';
  const run = animate(beetle.querySelector('img'), [
    {transform:'rotate(0deg)'},{transform:'rotate(-12deg) translateY(-3px)',offset:.2},
    {transform:'rotate(-7deg) translateY(0)',offset:.5},{transform:'rotate(-15deg)',offset:.8},
    {transform:'rotate(0deg)'}
  ], {duration:1100,easing:'ease-in-out'});
  run.finished.catch(() => {}).finally(() => { moving = false; });
  document.querySelector('.garden-status').textContent = perch ? 'Жук перебрался на другой камень.' : 'Жук вернулся на свой камень.';
}
beetle?.addEventListener('pointerenter', event => { if(event.pointerType === 'mouse') scuttle(); });
beetle?.addEventListener('click', scuttle);
garden?.addEventListener('pointermove', event => {
  if (!allowed() || event.pointerType !== 'mouse' || pendingPointer) return;
  pendingPointer = requestAnimationFrame(() => {
    const rect = garden.getBoundingClientRect();
    garden.style.setProperty('--garden-x', `${((event.clientX-rect.left)/rect.width-.5)*10}px`);
    garden.style.setProperty('--garden-y', `${((event.clientY-rect.top)/rect.height-.5)*6}px`);
    pendingPointer = 0;
  });
});
garden?.addEventListener('pointerleave', () => {
  garden.style.setProperty('--garden-x','0px');
  garden.style.setProperty('--garden-y','0px');
});
function syncMotion() {
  document.body.classList.toggle('motion-paused', !allowed());
  if(!allowed()) animations.forEach(animation => animation.cancel());
  pause?.setAttribute('aria-pressed', String(paused));
  if(pause) pause.textContent = paused ? 'Включить анимацию' : 'Пауза анимации';
}
pause?.addEventListener('click', () => { paused = !paused; syncMotion(); });
reduced.addEventListener('change', syncMotion);
syncMotion();
const visible = new IntersectionObserver(entries => {
  for(const {target,isIntersecting} of entries) target.classList.toggle('is-visible',isIntersecting && !document.hidden);
}, {threshold:.05});
[ garden, document.querySelector('.end-art') ].filter(Boolean).forEach(element => visible.observe(element));
document.addEventListener('visibilitychange', () => {
  [garden,document.querySelector('.end-art')].filter(Boolean).forEach(element => {
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
document.querySelectorAll('.studio-project,.service-tile,.industry-card,.new-section-heading,.studio-process,.seo-faq,.end-contact,.end-columns').forEach(element => reveal.observe(element));
const track = document.querySelector('.industry-track');
const controls = [...document.querySelectorAll('[data-industry-direction]')];
function updateControls(){
  controls.forEach(button => button.disabled = Number(button.dataset.industryDirection)<0 ? track.scrollLeft<2 : track.scrollLeft+track.clientWidth>=track.scrollWidth-2);
}
controls.forEach(button => button.addEventListener('click', () => track.scrollBy({left:Number(button.dataset.industryDirection)*(track.querySelector('.industry-card').offsetWidth+18),behavior:allowed()?'smooth':'instant'})));
track?.addEventListener('scroll',updateControls,{passive:true});
if(track){new ResizeObserver(updateControls).observe(track);updateControls();}
