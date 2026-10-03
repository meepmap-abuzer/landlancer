import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

test('wheel scrolling remains smooth across demo surfaces, with explicit native opt-outs preserved', async () => {
 let options;
 class Lenis {constructor(config){options=config;}on(){} destroy(){} stop(){} start(){}}
 const context=vm.createContext({document:{body:{dataset:{}},hidden:false,addEventListener(){},removeEventListener(){}},window:{addEventListener(){}},requestAnimationFrame(){},cancelAnimationFrame(){}});
 const lenisModule=new vm.SyntheticModule(['default'],function(){this.setExport('default',Lenis);},{context});
 await lenisModule.link(()=>{});await lenisModule.evaluate();
 const source=await readFile(new URL('../studio-scroll.mjs',import.meta.url),'utf8');
 const module=new vm.SourceTextModule(source,{context,importModuleDynamically:()=>lenisModule});
 await module.link(()=>{});await module.evaluate();
 module.namespace.setupStudioScroll({matches:false,addEventListener(){},removeEventListener(){}});
 await new Promise(resolve=>setImmediate(resolve));
 const node=selector=>({matches:list=>list.split(',').includes(selector)});
 for(const surface of ['.interactive-stage','.product-demo'])
  assert.equal(options.prevent(node(surface)),false,`${surface} must not mix native wheel input with an active smooth animation`);
 assert.equal(options.prevent(node('dialog')),true,'dialog content keeps native scrolling');
 assert.equal(options.prevent(node('[data-lenis-prevent]')),true,'explicit nested-scroll opt-outs stay supported');
});

test('restarting after an idle pause advances by one frame, not the idle duration', async () => {
 const events=new Map(),frames=new Map(),deltas=[];
 let next=0,instance;
 class Lenis {
  constructor(){instance=this;this.time=0;this.isScrolling=false;this.remaining=0;}
  on(name,fn){events.set(name,fn);}
  raf(time){deltas.push(time-(this.time||time));this.time=time;this.isScrolling=--this.remaining>0?'smooth':false;}
  wheel(){this.remaining=3;this.isScrolling='smooth';events.get('virtual-scroll')();}
  destroy(){} stop(){} start(){}
 }
 const context=vm.createContext({document:{body:{dataset:{}},hidden:false,addEventListener(){},removeEventListener(){}},window:{addEventListener(){}},requestAnimationFrame(fn){frames.set(++next,fn);return next;},cancelAnimationFrame(id){frames.delete(id);}});
 const lenisModule=new vm.SyntheticModule(['default'],function(){this.setExport('default',Lenis);},{context});
 await lenisModule.link(()=>{});await lenisModule.evaluate();
 const source=await readFile(new URL('../studio-scroll.mjs',import.meta.url),'utf8');
 const module=new vm.SourceTextModule(source,{context,importModuleDynamically:()=>lenisModule});
 await module.link(()=>{});await module.evaluate();
 module.namespace.setupStudioScroll({matches:false,addEventListener(){},removeEventListener(){}});
 await new Promise(resolve=>setImmediate(resolve));
 const step=time=>{const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn(time));};
 instance.wheel();step(16);step(32);step(48);
 assert.equal(frames.size,0,'RAF stops when scrolling rests');
 instance.wheel();step(5048);step(5064);step(5080);
 assert.ok(deltas[3]<=20,`resume consumed ${deltas[3]}ms of idle time`);
 assert.equal(frames.size,0,'RAF returns to sleep after the second scroll');
});
