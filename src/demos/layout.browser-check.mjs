// Run through the in-app Browser Node session with its existing tab and viewport.
// This checks rendered geometry, including the site's global CSS cascade.
import assert from 'node:assert/strict';
async function settleStage(tab){
 let stable=0;
 for(let attempt=0;attempt<120;attempt++){
  const ready=await tab.playwright.evaluate(()=>{
   const stage=document.querySelector('.interactive-stage');
   return !!stage&&!document.querySelector('[data-product-demo][aria-busy]')&&getComputedStyle(stage).translate==='none'&&!document.documentElement.classList.contains('lenis-scrolling');
  });
  stable=ready?stable+1:0;if(stable===3)return;
  // Poll the known entrance/anchor animation until the controls stop moving.
  await new Promise(resolve=>setTimeout(resolve,50));
 }
 throw new Error('Product stage did not finish its entrance');
}
export async function verifyDemoLayout({tab,viewport,widths=[320,390,1280]}){
 const results=[];
 for(const width of widths){
  await viewport.set({width,height:900});
  await tab.goto('http://127.0.0.1:4173/cases/gift-roulette/');
  await tab.playwright.getByRole('link',{name:'Попробовать',exact:true}).click();
  await settleStage(tab);
  await tab.playwright.getByRole('button',{name:'Апгрейд',exact:true}).click();
  const wheel=await tab.playwright.evaluate(()=>{
   const r=document.querySelector('.upgrade-wheel svg').getBoundingClientRect();
   return {width:r.width,height:r.height};
  });
  assert.ok(wheel.height>=130&&Math.abs(wheel.width-wheel.height)<2,`Upgrade wheel collapsed at ${width}: ${JSON.stringify(wheel)}`);
  await tab.playwright.getByRole('button',{name:'Краш',exact:true}).click();
  for(let i=0;i<6;i++){
   await tab.playwright.getByRole('button',{name:'Запустить краш',exact:true}).click();
   await tab.playwright.getByRole('button',{name:'Остановить полёт',exact:true}).click();
  }
  const history=await tab.playwright.evaluate(()=>{
   const row=document.querySelector('.history-bar'),r=row.getBoundingClientRect();
   const badges=[...row.querySelectorAll('.history-badge')];
   return {count:badges.length,contained:badges.every(e=>{const b=e.getBoundingClientRect();return e.scrollHeight<=e.clientHeight&&b.top>=r.top-1&&b.bottom<=r.bottom+1&&b.left>=r.left-1&&b.right<=r.right+1}),overflow:row.scrollHeight>row.clientHeight||row.scrollWidth>row.clientWidth};
  });
  assert.ok(history.count===6&&history.contained&&!history.overflow,`Crash history clipped at ${width}: ${JSON.stringify(history)}`);
  await tab.goto('http://127.0.0.1:4173/cases/loyalty/');
  await tab.playwright.getByRole('link',{name:'Попробовать',exact:true}).click();
  await settleStage(tab);
  await tab.playwright.getByRole('button',{name:'Повернуть карту и показать QR-код',exact:true}).click();
  for(let attempt=0;attempt<80;attempt++){
   const flipped=await tab.playwright.evaluate(()=>{const card=document.querySelector('.loyalty-card');return card?.classList.contains('is-flipped')&&!card.classList.contains('is-transitioning')});
   if(flipped)break;
   await new Promise(resolve=>setTimeout(resolve,50));
  }
  await tab.playwright.getByRole('button',{name:'Открыть QR-код на весь экран',exact:true}).click();
  const qr=await tab.playwright.evaluate(()=>{
   const r=document.querySelector('.qr-expanded .qr-code svg').getBoundingClientRect();
   return {width:r.width,height:r.height,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.ok(qr.width>=150&&Math.abs(qr.width-qr.height)<2&&!qr.overflow,`Expanded QR collapsed at ${width}: ${JSON.stringify(qr)}`);
  results.push({viewport:width,wheel,history,qr});
 }
 return results;
}
