// Used through the connected in-app browser runtime, never a second browser session.
export async function checkLayouts(tab,viewport,widths=[320,390,768,1024,1440,1920]){
  const reports=[];
  for(const width of widths){await viewport.set({width,height:900});for(const page of ['fitness','homes','detailing','']){
    await tab.goto(`http://127.0.0.1:4173/concepts/${page?`${page}/`:''}`);
    for(let i=0;i<40;i++){if(await tab.playwright.evaluate(()=>document.fonts.status==='loaded'))break;await new Promise(r=>setTimeout(r,50));}
    const report=await tab.playwright.evaluate(()=>{
      const viewport=document.documentElement.clientWidth;
      const excluded=['path','circle','defs','stop','g','linearGradient','pattern','ellipse','rect','text'];
      const overflow=[...document.querySelectorAll('main *,header *,footer *')].filter(e=>!excluded.includes(e.tagName)&&!e.closest('svg')&&getComputedStyle(e).position!=='absolute'&&getComputedStyle(e).position!=='fixed'&&e.getBoundingClientRect().width>0).filter(e=>{const r=e.getBoundingClientRect();return r.right>viewport+2||r.left< -2;}).map(e=>({tag:e.tagName,class:e.className,text:e.textContent?.slice(0,65)})).slice(0,10);
      const headings=[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent);
      const broken=[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'));
      const links=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href'));
      return {pageWidth:document.documentElement.scrollWidth,viewport,overflow,headings,broken,links,mainCount:document.querySelectorAll('main').length};
    });
    const errors=await tab.dev.logs({levels:['error'],limit:10});reports.push({width,page,...report,errors});
  }}return reports;
}
