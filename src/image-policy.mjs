import {readFileSync} from 'node:fs';
const images=JSON.parse(readFileSync(new URL('../assets/responsive/manifest.json',import.meta.url),'utf8'));
// Real src remains in static HTML, including when JavaScript is unavailable.
export function imagePolicy(html){return html.replace(/<img\b[^>]*>/g,tag=>{
 const src=tag.match(/\bsrc="([^"]+)"/)?.[1];if(!src)return tag;
 let extra='';
 if(!/\bdecoding=/.test(tag))extra+=' decoding="async"';
 if(!/\bloading=/.test(tag))extra+=src.includes('/brand/')?' loading="eager"':' loading="lazy"';
 const variant=images[src];
 if(variant&&!/\bsrcset=/.test(tag)){
  const fallback=src.includes('/services/')?'(max-width:540px) 93vw, (max-width:900px) 45vw, 30vw':src.includes('/covers/')?'(max-width:700px) 93vw, 46vw':'(max-width:750px) 92vw, 56vw';
  extra+=` srcset="${variant.small} ${variant.width}w, ${src} ${variant.sourceWidth}w" sizes="auto, ${fallback}"`;
 }
 return tag.slice(0,-1)+extra+'>';
});}
