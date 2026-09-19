import {createRefractionMap} from './glass-optics.mjs';
// Other engines keep the CSS material. Never enable an unsupported filter.
if(/Chrome|Chromium|Edg\//.test(navigator.userAgent)&&CSS.supports('backdrop-filter','url(#test)')&&!matchMedia('(prefers-reduced-transparency: reduce)').matches&&!matchMedia('(forced-colors: active)').matches){
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
 const defs=document.createElementNS(ns,'defs');svg.append(defs);document.body.append(svg);
 const targets=[...document.querySelectorAll('.top-nav,.side-nav,.hero-preview,.team-card,.hero-callout')];
 const filters=new WeakMap();let id=0;
 function update(el){
  const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)return;
  let item=filters.get(el);if(item&&Math.abs(item.width-rect.width)<1&&Math.abs(item.height-rect.height)<1)return;
  if(!item){
   const filter=document.createElementNS(ns,'filter');filter.id=`glass-lens-${id++}`;filter.setAttribute('color-interpolation-filters','sRGB');filter.setAttribute('x','0');filter.setAttribute('y','0');filter.setAttribute('width','100%');filter.setAttribute('height','100%');
   const map=document.createElementNS(ns,'feImage');map.setAttribute('result','map');map.setAttribute('preserveAspectRatio','none');map.setAttribute('width','100%');map.setAttribute('height','100%');
   const displacement=document.createElementNS(ns,'feDisplacementMap');displacement.setAttribute('in','SourceGraphic');displacement.setAttribute('in2','map');displacement.setAttribute('scale','16');displacement.setAttribute('xChannelSelector','R');displacement.setAttribute('yChannelSelector','G');
   filter.append(map,displacement);defs.append(filter);item={filter,map};filters.set(el,item);
  }
  const data=createRefractionMap(rect.width,rect.height,parseFloat(getComputedStyle(el).borderRadius)||24);
  const canvas=document.createElement('canvas');canvas.width=data.width;canvas.height=data.height;
  canvas.getContext('2d').putImageData(new ImageData(data.pixels,data.width,data.height),0,0);
  item.map.setAttribute('href',canvas.toDataURL());item.width=rect.width;item.height=rect.height;
  el.style.backdropFilter=`url(#${item.filter.id}) blur(2px) saturate(1.18)`;
  el.classList.add('refractive');
 }
 const resize=new ResizeObserver(entries=>entries.forEach(({target})=>update(target)));
 targets.forEach(el=>resize.observe(el));
}
