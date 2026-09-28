const roadmap=document.querySelector('.development-roadmap');
if(roadmap){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const links=[...roadmap.querySelectorAll('.roadmap-aside nav a')];
 const stages=[...roadmap.querySelectorAll('.roadmap-stage')];
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;

   if(entry.target.dataset.revealed)continue;
   entry.target.dataset.revealed='true';
   if(!reduced.matches){
    [entry.target.querySelector('.roadmap-node'),entry.target.querySelector('.roadmap-stage-copy'),entry.target.querySelector('.roadmap-widget')].forEach((part,i)=>part.animate([{opacity:0,transform:`translateY(${i===2?24:16}px)`},{opacity:1,transform:'translateY(0)'}],{duration:800,delay:i*90,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
   }
  }
 },{threshold:.12,rootMargin:'-80px 0px -8% 0px'});
 stages.forEach(stage=>observer.observe(stage));
 const readingObserver=new IntersectionObserver(entries=>{
  const current=entries.find(entry=>entry.isIntersecting);
  if(!current)return;
  for(const link of links){if(link.hash===`#${current.target.id}`)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');}
 },{rootMargin:'-20% 0px -75% 0px',threshold:0});
 stages.forEach(stage=>readingObserver.observe(stage));
 reduced.addEventListener('change',()=>{if(reduced.matches)roadmap.getAnimations({subtree:true}).forEach(a=>a.finish());});
 const preview=roadmap.querySelector('[data-design-preview]');
 roadmap.querySelectorAll('[data-design]').forEach(button=>button.addEventListener('click',()=>{
  preview.dataset.designPreview=button.dataset.design;
  roadmap.querySelectorAll('[data-design]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 }));
 let delivery=0;
 const next=roadmap.querySelector('[data-delivery-next]');
 const labels=['Подключаем форму к CRM','Проверяем отправку и ошибки','Сценарий готов к демонстрации'];
 next.addEventListener('click',()=>{
  delivery=(delivery+1)%3;
  roadmap.querySelector('[data-delivery-text]').textContent=labels[delivery];
  roadmap.querySelectorAll('[data-delivery-marker]').forEach((marker,i)=>marker.classList.toggle('current',i===delivery));
  roadmap.querySelector('.delivery-meter i').style.width=`${(delivery+1)/3*100}%`;
  next.firstChild.textContent=delivery===2?'Начать пример заново ':'Показать следующий шаг ';
  roadmap.querySelector('[data-delivery-status]').textContent=['Пример: задача в разработке.','Пример: проверяем работу сценария.','Пример: показываем готовую функцию.'][delivery];
 });
 const checks=[...roadmap.querySelectorAll('[data-roadmap-check]')];
 checks.forEach(check=>check.addEventListener('change',()=>{
  const count=checks.filter(item=>item.checked).length;
  roadmap.querySelector('progress').value=count;
  roadmap.querySelector('[data-check-status]').textContent=`Отмечено ${count} из ${checks.length}`;
 }));
}

