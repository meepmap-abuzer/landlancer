import {writeFile,mkdir} from 'node:fs/promises';
import {home} from './agency-home.mjs';
import {cases,casePage} from './agency-cases.mjs';
import {head,nav,cta,footer} from './agency-shared.mjs';
await writeFile(new URL('../index.html',import.meta.url),home());
for(const p of cases){await mkdir(new URL(`../cases/${p.slug}/`,import.meta.url),{recursive:true});await writeFile(new URL(`../cases/${p.slug}/index.html`,import.meta.url),casePage(p));}
await writeFile(new URL('../404.html',import.meta.url),head('Страница не найдена','Перейдите к проектам Lancer Agency.')+nav()+`<main id="main" class="pending-page wrap"><span class="eyebrow">404</span><h1>Кажется, вы<br>свернули с маршрута.</h1><p>Вернитесь на главную — все проекты там.</p><a class="button primary" href="/">На главную ↗</a></main>`+footer(true));
await writeFile(new URL('../sitemap.xml',import.meta.url),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/',...cases.map(p=>`/cases/${p.slug}/`)].map(path=>`<url><loc>https://landlancer.ru${path}</loc></url>`).join('')}</urlset>`);
console.log('Agency homepage, four case studies and compatibility pages built');
