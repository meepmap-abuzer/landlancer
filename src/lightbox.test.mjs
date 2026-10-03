import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const root=new URL('../',import.meta.url);
const source=await readFile(new URL('agency.js',root),'utf8');
const attrs=text=>new Map([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(([,key,value])=>[key,value]));
function image(attributes){
 return {
  get src(){return attributes.get('src')||'';},set src(value){attributes.set('src',value);},
  get srcset(){return attributes.get('srcset')||'';},set srcset(value){attributes.set('srcset',value);},
  getAttribute(name){return attributes.get(name)??null;},
  removeAttribute(name){attributes.delete(name);}
 };
}
for(const slug of ['loyalty','maverick','gift-roulette','tailcare'])test(`${slug}: repeated gallery clicks never retain another image's responsive candidates`,async()=>{
 const page=await readFile(new URL(`cases/${slug}/index.html`,root),'utf8');
 const previews=[...page.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].flatMap(([,tag,content])=>{
  const attributes=attrs(tag);if(!attributes.has('data-zoom'))return [];
  const preview=image(attrs(content.match(/<img\b([^>]*)>/)[1]));
  return [{dataset:{zoom:attributes.get('data-zoom'),caption:attributes.get('data-caption')},querySelector:()=>preview,focus(){}}];
 });
 assert.equal(previews.length,2,'exercise both actual story images');
 const enlarged=image(attrs(page.match(/<dialog class="lightbox"[^>]*>[\s\S]*?<img\b([^>]*)>/)[1]));
 // Exercise an already populated viewer, including HTML cached before the placeholder fix.
 enlarged.src=previews[0].dataset.zoom;
 enlarged.srcset=previews[0].querySelector('img').srcset;
 const events=new Map(),caption={textContent:''},closeButton={addEventListener(){}},dialog={
  querySelector(selector){return selector==='img'?enlarged:selector==='p'?caption:closeButton;},
  addEventListener(){},showModal(){this.open=true;}
 };
 const document={querySelector:()=>dialog,querySelectorAll:()=>[],getElementById:()=>null,addEventListener(name,fn){events.set(name,fn);}};
 vm.runInNewContext(source,{document,matchMedia:()=>({matches:true})});
 for(const button of [previews[0],previews[1],previews[0],previews[1]]){
  events.get('click')({target:{closest:()=>button}});
  assert.equal(enlarged.src,button.dataset.zoom,'full-size source follows the selected preview');
  const selectedCandidates=new Set([button.dataset.zoom,...button.querySelector('img').srcset.split(',').map(candidate=>candidate.trim().split(/\s+/)[0])]);
  for(const candidate of enlarged.srcset.split(',').filter(Boolean))assert.ok(selectedCandidates.has(candidate.trim().split(/\s+/)[0]),`viewer retained unrelated candidate ${candidate}`);
  assert.equal(caption.textContent,button.dataset.caption);
  assert.equal(enlarged.alt,button.dataset.caption);
  assert.equal(dialog.open,true);
 }
});
