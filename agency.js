(() => {
 const dialog=document.querySelector('.lightbox');
 let returnFocus;
 document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  if(!dialog)return; returnFocus=button;
  dialog.querySelector('img').src=button.dataset.zoom;
  dialog.querySelector('img').alt=button.dataset.caption;
  dialog.querySelector('p').textContent=button.dataset.caption;
  dialog.showModal();
 }));
 if(dialog){
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>returnFocus?.focus());
 }
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(!reduced.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.animate([{opacity:.55,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)'});observer.unobserve(entry.target);}
  }),{threshold:.12});
  document.querySelectorAll('.service,.custom,.project-card,.feature-row,.tech-item').forEach(el=>observer.observe(el));
 }
})();
