import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {services,caseMeta,faq} from './seo-data.mjs';
import {seoHead} from './seo.mjs';
const root=resolve(import.meta.dirname,'..');
const routes=['/',...Object.keys(caseMeta).map(s=>`/cases/${s}/`),...services.map(s=>`/services/${s.slug}/`),'/privacy/','/404.html'];
const fileFor=path=>resolve(root,'.'+path+(path.endsWith('/')?'index.html':''));
const pages=new Map(await Promise.all(routes.map(async path=>[path,await readFile(fileFor(path),'utf8')])));
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))];
const schemas=html=>[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])['@graph']);
test('static pages expose unique SEO metadata, one main and one h1 without rendering JS',()=>{
 const titles=new Set(),descriptions=new Set();
 for(const [path,html] of pages){
  assert.equal(tags(html,'h1').length,1,path);assert.equal(tags(html,'main').length,1,path);
  const title=html.match(/<title>(.*?)<\/title>/)?.[1],description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert.ok(title&&description,path);assert.ok(!titles.has(title),title);assert.ok(!descriptions.has(description),description);titles.add(title);descriptions.add(description);
  assert.ok(html.includes(`rel="canonical" href="https://landlancer.ru${path}"`),path);
  for(const tag of ['og:locale','og:site_name','og:image:width','twitter:card'])assert.ok(html.includes(`"${tag}"`),path+tag);
  assert.ok(html.includes('<html lang="ru">'));assert.ok(!html.includes('BraveHeart'));
 }
});
test('internal links, fragments and static head assets resolve',async()=>{
 for(const [path,html] of pages){
  for(const match of html.matchAll(/(?:href|src)="([^"?]+)(?:\?[^"#]*)?"/g)){
   const href=match[1];if(!href.startsWith('/')&&!href.startsWith('#'))continue;
   const url=new URL(href,'https://landlancer.ru'+path),file=fileFor(url.pathname);
   await stat(file).catch(()=>assert.fail(`${path}: missing ${href}`));
   if(url.hash){const target=await readFile(file,'utf8');assert.ok(target.includes(`id="${url.hash.slice(1)}"`),`${path}: missing anchor ${href}`);}
  }
  for(const img of html.matchAll(/<img\b[^>]*>/g))for(const attr of (/\bsrc=/.test(img[0])?['alt','width','height']:['alt']))assert.match(img[0],new RegExp(`\\b${attr}=`),path+': '+attr);
 }
});
test('structured data corresponds to visible content, actual services and ordered breadcrumbs',()=>{
 for(const [path,html] of pages){const graph=schemas(html);assert.ok(graph.some(n=>n['@type']==='Organization'&&n.name==='Lancer Agency'));
  for(const node of graph.filter(n=>n['@type']==='FAQPage'))for(const q of node.mainEntity){assert.ok(html.includes(q.name));assert.ok(html.includes(q.acceptedAnswer.text));}
  for(const node of graph.filter(n=>n['@type']==='BreadcrumbList'))assert.deepEqual(node.itemListElement.map(i=>i.position),node.itemListElement.map((_,i)=>i+1));
  assert.ok(!graph.some(n=>n.aggregateRating||n.review||n['@type']==='LocalBusiness'));
 }
 assert.equal(schemas(pages.get('/')).filter(n=>n['@type']==='Service').length,services.length);
 assert.equal(schemas(pages.get('/')).find(n=>n['@type']==='FAQPage').mainEntity.length,faq.length);
});
test('sitemap lists canonical public routes and excludes utility and demo pages',async()=>{
 const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert.equal(new Set(urls).size,urls.length);
 for(const path of routes.filter(p=>!['/404.html','/privacy/'].includes(p)))assert.ok(urls.includes('https://landlancer.ru'+path));
 assert.ok(!/concepts|404|privacy|orbit-supply/.test(sitemap));
 for(const url of urls)await stat(fileFor(new URL(url).pathname));
 for(const p of ['/404.html','/privacy/'])assert.match(pages.get(p),/name="robots" content="noindex, follow"/);
 assert.match(await readFile(resolve(root,'robots.txt'),'utf8'),/Sitemap: https:\/\/landlancer.ru\/sitemap.xml/);
 const png=await readFile(resolve(root,'assets/seo/social.png'));assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});
test('metadata escapes HTML and JSON-LD script boundaries',()=>{
 const html=seoHead('Example </script> <img src=x>','" & < >','/example/');
 assert.ok(html.includes('&lt;/script&gt;'));assert.ok(!html.includes('<img src=x>'));
 const graph=schemas(html);assert.ok(graph.some(n=>n.name?.includes('</script>')));
});

test('loading feedback preserves static content and responsive image assets resolve',async()=>{
 for(const [path,html] of pages){
  assert.match(html,/<div class="page-loader" hidden role="status">/,path);
  assert.ok(html.includes('/page-loading.mjs'),path);
  assert.doesNotMatch(html,/<main\b[^>]*(?:\bhidden\b|\binert\b)/,path);
  for(const [tag] of html.matchAll(/<img\b[^>]*\bsrc="[^"]+"[^>]*>/g)){
   assert.match(tag,/decoding="async"/,path);
   assert.match(tag,/loading="(?:lazy|eager)"/,path);
   const srcset=tag.match(/srcset="([^"]+)"/)?.[1];
   if(srcset)for(const candidate of srcset.split(',')){
    const [url,width]=candidate.trim().split(/\s+/);assert.match(width,/^\d+w$/);
    assert.ok((await stat(resolve(root,'.'+url))).size>0,path+': '+url);
   }
  }
 }
 assert.ok(!pages.get('/').includes('/demos/interactive.js'));
 assert.ok(pages.get('/cases/maverick/').includes('/demos/interactive.js'));
});
