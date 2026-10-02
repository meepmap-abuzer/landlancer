// Each surface has its own entrance; native scrolling owns scroll-linked depth.
export function setupStudioMotion(reduced){
 const animations=new Set();
 const play=(element,frames,options={})=>{
  if(!element||reduced.matches||document.hidden)return;
  const animation=element.animate(frames,{duration:800,easing:'cubic-bezier(.16,1,.3,1)',...options});
  animations.add(animation);animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
 };
 const jobs=new Map();
 const add=(selector,run)=>document.querySelectorAll(selector).forEach(element=>jobs.set(element,run));
 add('.hero-copy,.service-hero-copy,.case-opening-copy',element=>{
  [...element.children].forEach((child,i)=>play(child,[{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:900,delay:Math.min(i,2)*65}));
 });
 add('.mascot-hero>.mascot',element=>play(element,[{opacity:.55,clipPath:'inset(0 0 18% 0)',transform:'translateY(10px)'},{opacity:1,clipPath:'inset(0)',transform:'none'}],{duration:1100}));
 add('.section-heading h2,.service-page section h2,.case-editorial section h2,.faq-intro h2',element=>play(element,[{clipPath:'inset(0 0 35% 0)',transform:'translateY(9px)'},{clipPath:'inset(0)',transform:'none'}],{duration:850}));
 add('.studio-project',element=>{
  const index=[...element.parentElement.children].indexOf(element);
  play(element,[{opacity:.25,transform:'perspective(1000px) translateY(64px) rotateX(4deg) scale(.96)'},{opacity:1,transform:'none'}],{duration:1100,delay:index%2*140,fill:'backwards'});
 });
 add('.service-case-card .project-photo,.case-related a',element=>play(element,[{clipPath:'inset(7% 0 0 round 16px)',opacity:.8},{clipPath:'inset(0 round 16px)',opacity:1}],{duration:1000}));
 add('.service-list .digital-signal,.service-hero-art .digital-signal,.service-system>.frost',element=>play(element,[{opacity:.45,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:1000}));
 add('.included-grid article,.ai-example-grid article,.case-capability-grid article',element=>play(element,[{clipPath:'inset(0 0 12% 0)',opacity:.7},{clipPath:'inset(0)',opacity:1}],{duration:750}));
 add('.service-roadmap,.studio-process,.service-pricing,.service-questions,.case-story',element=>{
  const children=[...element.children].filter(child=>child.tagName!=='H2');
  children.forEach((child,i)=>play(child,[{opacity:.6,transform:`translateX(${i%2?8:-8}px)`},{opacity:1,transform:'none'}],{duration:800,delay:i*45}));
 });
 add('.end-contact',element=>[...element.children].forEach((child,i)=>play(child,[{opacity:.6,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:950,delay:i*80})));
 add('.end-wordmark',element=>play(element,[{clipPath:'inset(0 0 55% 0)'},{clipPath:'inset(0)'}],{duration:1200}));
 const observer=new IntersectionObserver(entries=>{
  entries.filter(entry=>entry.isIntersecting).forEach(({target})=>{jobs.get(target)?.(target);observer.unobserve(target);});
 },{threshold:.12});
 if(!reduced.matches)jobs.forEach((_,element)=>observer.observe(element));
 function settle(){if(reduced.matches||document.hidden){animations.forEach(a=>a.finish());if(reduced.matches)observer.disconnect();}}
 reduced.addEventListener('change',settle);document.addEventListener('visibilitychange',settle);
}
