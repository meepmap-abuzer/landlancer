import {createApp} from 'vue';
import './shared.css';
const loaders={maverick:()=>import('./maverick/Maverick.vue'),loyalty:()=>import('./loyalty/Loyalty.vue'),'gift-roulette':()=>import('./gift/Gift.vue'),tailcare:()=>import('./tailcare/TailCare.vue')};
async function mount(el){
 try{const {default:component}=await loaders[el.dataset.productDemo]();createApp(component,{compact:el.dataset.compact==='true'}).mount(el);el.removeAttribute('aria-busy')}
 catch{el.innerHTML='<p>Демо не загрузилось. Обновите страницу, чтобы попробовать ещё раз.</p>';el.removeAttribute('aria-busy')}
}
const observer=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>{observer.unobserve(e.target);mount(e.target)})},{rootMargin:'300px'});
document.querySelectorAll('[data-product-demo]').forEach(el=>observer.observe(el));
