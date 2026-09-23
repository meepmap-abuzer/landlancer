import './shared.css';
export const $=(selector,root=document)=>root.querySelector(selector);
export const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
export function downloadText(filename,content){
  const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function resetFormStatus(form){
  const submit=$('[type=submit]',form);submit.disabled=false;submit.textContent=submit.dataset.label;
  $('.form-result',form).hidden=true;$('[data-save-summary]',form).hidden=true;
  $$('input',form).forEach(input=>input.setCustomValidity(''));
}
export function initCommon({summary=()=>'',confirmation='Ваш вариант готов. В этом концепте заявка остаётся только в браузере.'}={}){
  const menu=$('.menu-toggle'), nav=$('.main-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
    nav.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menu.focus();}});
  }
  $$('[data-book]').forEach(b=>b.addEventListener('click',()=>selectBooking(b.dataset.book)));
  $$('form[data-demo-form]').forEach(form=>{
    const result=$('.form-result',form),submit=$('[type=submit]',form);
    form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form),name=String(data.get('name')).trim();
      if(!name){const field=$('[name=name]',form);field.setCustomValidity('Введите имя.');field.reportValidity();return;}
      const digits=String(data.get('phone')).replace(/\D/g,'');
      if(digits.length<10||digits.length>15){const field=$('[name=phone]',form);field.setCustomValidity('Введите от 10 до 15 цифр телефона.');field.reportValidity();return;}
      result.hidden=false;result.textContent=`${name}, ${confirmation}`;result.focus();
      submit.textContent='Вариант сохранён';submit.disabled=true;
      const receipt=`${document.title}\n${summary()}\n${$('[data-booking-choice]')?.textContent||''}\nДемонстрационный сценарий. Заявка не отправлена.`;
      const save=$('[data-save-summary]',form);save.hidden=false;save.onclick=()=>downloadText('мой-вариант.txt',receipt);
    });
    form.addEventListener('input',()=>resetFormStatus(form));
  });
}
export function selectBooking(text){const target=$('[data-booking-choice]');if(target){target.textContent=text;target.hidden=false;}const contact=$('#contact');const form=contact?.querySelector('form');if(form)resetFormStatus(form);contact?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
