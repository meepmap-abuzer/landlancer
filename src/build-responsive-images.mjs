import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
// Optional module path supports a bundled image runtime without an app dependency.
const sharp=require(process.argv[2]||'sharp');
await fs.mkdir('assets/responsive',{recursive:true});
const manifest={};let originalBytes=0,responsiveBytes=0;
for(const folder of ['covers','services','case-visuals'])for(const name of await fs.readdir('assets/'+folder)){
 if(!name.endsWith('.webp'))continue;
 const original='assets/'+folder+'/'+name,output='assets/responsive/'+folder+'-'+name.replace('.webp','-768.webp');
 const metadata=await sharp(original).metadata();
 await sharp(original).resize({width:768,withoutEnlargement:true}).webp({quality:83,effort:5}).toFile(output);
 const variant=await sharp(output).metadata();
 manifest['/'+original]={sourceWidth:metadata.width,small:'/'+output,width:variant.width};
 originalBytes+=(await fs.stat(original)).size;responsiveBytes+=(await fs.stat(output)).size;
}
await fs.writeFile('assets/responsive/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({images:Object.keys(manifest).length,originalBytes,responsiveBytes,reduction:Math.round((1-responsiveBytes/originalBytes)*100)+'%'}));
