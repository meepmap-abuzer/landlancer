import {mkdir,writeFile} from 'node:fs/promises';
import {fitnessPage} from './fitness-page.mjs';
import {homesPage} from './homes-page.mjs';
import {detailingPage} from './detailing-page.mjs';
import {galleryPage} from './gallery-page.mjs';
for(const [slug,render] of [['fitness',fitnessPage],['homes',homesPage],['detailing',detailingPage],['',galleryPage]]){
  const folder=new URL(`../../concepts/${slug?slug+'/':''}`,import.meta.url);await mkdir(folder,{recursive:true});await writeFile(new URL('index.html',folder),render());
}
console.log('Three concept landing pages and gallery built. Local preview: http://127.0.0.1:4173/concepts/');
