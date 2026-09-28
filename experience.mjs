const reduced=matchMedia('(prefers-reduced-motion: reduce)');
// Native scrolling stays on the browser compositor; no wheel interception or perpetual RAF.
// The navigation belongs to the viewport, outside clipped scene backgrounds.
const notch=document.querySelector('.nav-notch');
const rail=document.querySelector('.side-nav');
if(notch)document.body.append(notch);
if(rail)document.body.append(rail);
const nav=notch?.querySelector('.top-nav');
if(nav){
 const links=[...nav.querySelectorAll('a')];
 const indicator=document.createElement('span');indicator.className='nav-indicator';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);
 let active=(location.pathname.startsWith('/services/')?links.find(link=>new URL(link.href).hash==='#services'):undefined)||links[0],hovered;
 const sections=links.filter(link=>new URL(link.href).pathname===location.pathname).map(link=>({link,element:document.getElementById(new URL(link.href).hash.slice(1))})).filter(item=>item.element);
 if(location.pathname.startsWith('/services/'))active.setAttribute('aria-current','page');
 function move(link){links.forEach(item=>item.classList.toggle('is-highlighted',item===link));indicator.style.width=`${link.offsetWidth}px`;indicator.style.transform=`translateX(${link.offsetLeft}px)`}
 function setActive(link){
  if(!link||link===active)return;
  active=link;
  links.forEach(item=>{if(item===active)item.setAttribute('aria-current','location');else item.removeAttribute('aria-current')});
  if(!hovered)move(active);
 }
 // Observer callbacks run only when a section crosses the reading line.
 const sectionObserver=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting)setActive(sections.find(item=>item.element===entry.target)?.link);
 },{rootMargin:'-15% 0px -65% 0px',threshold:0});
 sections.forEach(({element})=>sectionObserver.observe(element));
 links.forEach(link=>{
  link.addEventListener('pointerenter',()=>{hovered=link;move(link)});
  link.addEventListener('focus',()=>move(link));
 });
 nav.addEventListener('pointerleave',()=>{hovered=undefined;move(active)});
 nav.addEventListener('focusout',()=>move(active));
 new ResizeObserver(()=>move(hovered||active)).observe(nav);
 document.fonts.ready.then(()=>move(active));move(active);
}

// Each piece arrives separately. Content remains visible if JS is unavailable.
if(!reduced.matches){
 const selectors='.service h3,.case-function h3,.contact-copy h2';
 // Keep the primary heading visible immediately; opacity reveals delay LCP.
 const elements=[...document.querySelectorAll(selectors)].filter(element=>element.tagName!=='H1');
 const observer=new IntersectionObserver(entries=>{
  const entering=entries.filter(entry=>entry.isIntersecting);
  entering.forEach(({target},i)=>{
   target.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,delay:Math.min(i,3)*60,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'});
   observer.unobserve(target);
  });
 },{threshold:.12});
 elements.forEach(el=>observer.observe(el));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();elements.forEach(el=>el.getAnimations().forEach(a=>a.finish()))}},{once:true});
}
