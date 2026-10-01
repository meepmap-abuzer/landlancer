// Keep native details as the no-JS fallback; enhanced transitions can reverse mid-flight.
export function setupDisclosures({reduced,allowed}){
 const states=[...document.querySelectorAll('.process-list details,.faq-answers details,.case-details details')].map(element=>({element,summary:element.querySelector('summary'),group:element.getAttribute('name'),wanted:element.open,timer:0,frame:0}));
 states.forEach(state=>{state.element.removeAttribute('name');state.element.dataset.disclosureState=state.wanted?'open':'closed';});
 function settle(state){
  clearTimeout(state.timer);cancelAnimationFrame(state.frame);
  state.element.open=state.wanted;state.element.style.height='';state.element.style.overflow='';state.element.style.transition='';
  state.element.dataset.disclosureState=state.wanted?'open':'closed';
 }
 function move(state,opening){
  const {element,summary}=state,from=element.getBoundingClientRect().height;
  clearTimeout(state.timer);cancelAnimationFrame(state.frame);state.wanted=opening;
  if(!allowed()||document.hidden){settle(state);return;}
  element.style.transition='none';element.style.height='auto';element.open=true;
  const css=getComputedStyle(element),border=parseFloat(css.borderTopWidth)+parseFloat(css.borderBottomWidth);
  const to=opening?element.getBoundingClientRect().height:summary.getBoundingClientRect().height+border;
  element.style.height=`${from}px`;element.style.overflow='hidden';
  element.getBoundingClientRect();
  element.dataset.disclosureState=opening?'opening':'closing';
  state.frame=requestAnimationFrame(()=>{
   element.style.transition='';element.style.height=`${to}px`;
   state.timer=setTimeout(()=>settle(state),460);
  });
 }
 states.forEach(state=>{
  state.summary.addEventListener('click',event=>{
   event.preventDefault();const opening=!state.wanted;
   if(opening&&state.group)states.filter(other=>other!==state&&other.group===state.group&&other.wanted).forEach(other=>move(other,false));
   move(state,opening);
  });
  state.element.addEventListener('transitionend',event=>{if(event.target===state.element&&event.propertyName==='height')settle(state);});
 });
 const finish=()=>{if(!allowed()||document.hidden)states.forEach(settle);};
 reduced.addEventListener('change',finish);document.addEventListener('visibilitychange',finish);document.addEventListener('lancer:motion',finish);
}
