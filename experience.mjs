const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let scroll,scrollRequest=0;
async function configureScroll(){
 const token=++scrollRequest;
 scroll?.destroy();scroll=undefined;
 if(reduced.matches)return;
 try{
  const {default:Lenis}=await import('./vendor/lenis.mjs');
  if(token!==scrollRequest||reduced.matches)return;
  scroll=new Lenis({autoRaf:true,lerp:.075,smoothWheel:true,syncTouch:false,anchors:{offset:-105},stopInertiaOnNavigate:true,prevent:el=>!!el.closest('dialog,[data-lenis-prevent]')});
  if(document.querySelector('dialog[open]'))scroll.stop();
 }catch{/* Native scrolling remains available if the enhancement cannot load. */}
}
configureScroll();reduced.addEventListener('change',configureScroll);
const dialog=document.querySelector('.lightbox');
if(dialog)new MutationObserver(()=>{if(dialog.open)scroll?.stop();else scroll?.start()}).observe(dialog,{attributes:true,attributeFilter:['open']});

// The navigation belongs to the viewport, outside clipped scene backgrounds.
const notch=document.querySelector('.nav-notch');
const rail=document.querySelector('.side-nav');
if(notch)document.body.append(notch);
if(rail)document.body.append(rail);
const nav=notch?.querySelector('.top-nav');
if(nav){
 const links=[...nav.querySelectorAll('a')];
 const indicator=document.createElement('span');indicator.className='nav-indicator';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);
 let active=links[0],hovered;
 const sections=links.map(link=>({link,element:document.getElementById(new URL(link.href).hash.slice(1))})).filter(item=>item.element);
 function move(link){indicator.style.width=`${link.offsetWidth}px`;indicator.style.transform=`translateX(${link.offsetLeft}px)`}
 function track(){
  notch.classList.toggle('is-scrolled',scrollY>70);
  let current=sections[0];
  for(const section of [...sections].sort((a,b)=>a.element.offsetTop-b.element.offsetTop))if(section.element.getBoundingClientRect().top<innerHeight*.38)current=section;
  if(current){active=current.link;links.forEach(link=>{if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
  if(!hovered)move(active);
 }
 let queued=false;
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;track()})}},{passive:true});
 links.forEach(link=>{
  link.addEventListener('pointerenter',()=>{hovered=link;move(link)});
  link.addEventListener('focus',()=>move(link));
 });
 nav.addEventListener('pointerleave',()=>{hovered=undefined;move(active)});
 nav.addEventListener('focusout',()=>move(active));
 new ResizeObserver(()=>move(hovered||active)).observe(nav);
 document.fonts.ready.then(track);track();
}

// Each piece arrives separately. Content remains visible if JS is unavailable.
if(!reduced.matches){
 const selectors='.hero-copy h1,.hero-copy p,.crm-sidebar,.crm-projects,.crm-inbox,.hero-invite,.hero-business,.hero-explore,.case-intro>* ,.interactive-stage,.service,.custom-copy,.custom-steps,.stack-layer,.flow-card,.project-card,.team-card,.orbit-card,.case-function,.contact-copy>*';
 const elements=[...document.querySelectorAll(selectors)];
 const observer=new IntersectionObserver(entries=>{
  const entering=entries.filter(entry=>entry.isIntersecting);
  entering.forEach(({target},i)=>{
   target.animate([{opacity:0,translate:'0 32px'},{opacity:1,translate:'0 0'}],{duration:1150,delay:Math.min(i,4)*110,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'});
   observer.unobserve(target);
  });
 },{threshold:.12});
 elements.forEach(el=>observer.observe(el));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();elements.forEach(el=>el.getAnimations().forEach(a=>a.finish()))}},{once:true});
}
