import {createApp} from 'vue';
export function mountProduct(el,component){
 createApp(component,{compact:el.dataset.compact==='true'}).mount(el);
}
