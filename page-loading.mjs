// Loading feedback never hides the document or waits for below-the-fold assets.
const progress=document.querySelector('.page-loader');
function finishPage(){if(progress){progress.classList.add('is-finished');setTimeout(()=>{progress.hidden=true;},200);}}
if(progress){progress.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(finishPage));}
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');if(!link||link.target||link.hasAttribute('download')||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
 const url=new URL(link.href);if(progress&&url.origin===location.origin&&(url.pathname!==location.pathname||url.search!==location.search)){progress.classList.remove('is-finished');progress.hidden=false;}
});
addEventListener('pageshow',event=>{if(event.persisted)finishPage();});
for(const image of document.images){
 let spinner;
 const host=image.parentElement;
 if(host.matches('.project-photo,.service-illustration,.generated-device,.phone,.desktop-screen')){
  spinner=document.createElement('span');spinner.className='image-loading-spinner';spinner.setAttribute('aria-hidden','true');spinner.hidden=true;host.append(spinner);
 }
 const settle=()=>{image.dataset.loadState=image.naturalWidth?'ready':'error';if(spinner)spinner.hidden=true;};
 const loaded=async()=>{const src=image.src;try{await image.decode();}catch{}if(src===image.src)settle();};
 const begin=()=>{if(!image.getAttribute('src'))return;if(image.complete){settle();return;}image.dataset.loadState='pending';if(spinner)spinner.hidden=false;};
 image.addEventListener('load',loaded);image.addEventListener('error',settle);begin();
 new MutationObserver(begin).observe(image,{attributes:true,attributeFilter:['src','srcset']});
}
const stage=document.querySelector('.lunar-stage'),sceneLoader=stage?.querySelector('.scene-loader');
if(sceneLoader){const sync=()=>{sceneLoader.hidden=!!stage.dataset.sceneReady;};sync();new MutationObserver(sync).observe(stage,{attributes:true,attributeFilter:['data-scene-ready']});}
// Local QA only: expose measured network results through DOM for browser review.
if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname))setTimeout(()=>{
 const resources=performance.getEntriesByType('resource');
 document.documentElement.dataset.loadingAudit=JSON.stringify({resources:resources.length,transferred:resources.reduce((sum,r)=>sum+r.transferSize,0),scene:resources.filter(r=>r.name.includes('/sculpture/scene.js')).map(r=>({bytes:r.transferSize,ms:Math.round(r.duration)})),demoEntry:resources.some(r=>r.name.includes('/demos/interactive.js'))});
},2200);
