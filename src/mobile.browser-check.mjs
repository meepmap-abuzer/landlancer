// Run using the existing in-app Browser tab and viewport capability.
import assert from 'node:assert/strict';

export async function verifyMobileLayout({tab, viewport, base='http://127.0.0.1:4173', widths=[320,390,430,768,1440]}) {
  const results=[];
  for (const width of widths) {
    await viewport.set({width,height:844});
    for (const path of ['/', '/cases/maverick/', '/cases/gift-roulette/', '/cases/tailcare/', '/cases/loyalty/']) {
      await tab.goto(base+path);
      if (path !== '/') {
        await tab.playwright.getByRole('link',{name:'Попробовать',exact:true}).click();
        let ready=false;
        for (let attempt=0;attempt<100;attempt++) {
          ready=await tab.playwright.evaluate(()=>!!document.querySelector('[data-product-demo] button')&&!document.querySelector('[data-product-demo][aria-busy]')&&getComputedStyle(document.querySelector('.interactive-stage')).translate==='none'&&!document.documentElement.classList.contains('lenis-scrolling'));
          if(ready) break;
          await new Promise(resolve=>setTimeout(resolve,50));
        }
        assert.ok(ready,`Demo did not mount: ${path}`);
      }
      const geometry=await tab.playwright.evaluate(()=>{
        const selectors='h1,h2,h3,.flow-card,.team-card,.orbit-card,.custom-copy,.custom-steps,.case-function,.tech-item,.demo-tabs,.stage-invitation';
        const overflow=[...document.querySelectorAll(selectors)].filter(e=>e.clientWidth>0&&e.scrollWidth>e.clientWidth+2).map(e=>({selector:e.className||e.tagName,width:e.clientWidth,scroll:e.scrollWidth}));
        const overlap=[['.custom-copy','.custom-steps'],['.team-grid','.progress-pill']].filter(([a,b])=>{
          const first=document.querySelector(a),second=document.querySelector(b);
          if(!first||!second||innerWidth>760)return false;
          return first.getBoundingClientRect().bottom>second.getBoundingClientRect().top+2;
        });
        return {overflow,overlap,pageOverflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert.ok(!geometry.overflow.length&&!geometry.overlap.length&&!geometry.pageOverflow,`${width}px ${path}: ${JSON.stringify(geometry)}`);
      if(path.includes('maverick')) {
        await tab.playwright.getByRole('button',{name:'Профиль участника',exact:true}).click();
        const fits=await tab.playwright.evaluate(()=>{const e=document.querySelector('.member-profile');return e.scrollWidth<=e.clientWidth});
        assert.ok(fits,`Maverick profile clipped at ${width}px`);
      }
      results.push({width,path,passed:true});
    }
  }
  return results;
}
