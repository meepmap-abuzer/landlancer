import test from 'node:test';
import assert from 'node:assert/strict';
import {createRefractionMap} from '../glass-optics.mjs';
test('flat centre does not distort and opposite edges refract symmetrically',()=>{
 const {pixels,width,height}=createRefractionMap(200,100,24);
 const channel=(x,y,c)=>pixels[(y*width+x)*4+c];
 assert.equal(channel(100,50,0),128);assert.equal(channel(100,50,1),128);
 assert.ok(channel(3,50,0)>128);assert.ok(channel(196,50,0)<128);
 assert.ok(Math.abs(channel(3,50,0)+channel(196,50,0)-256)<=1);
 assert.equal(channel(0,0,0),128);assert.equal(channel(0,0,1),128);
 assert.equal(pixels.length,width*height*4);
});
test('maps stay bounded for small and large responsive controls',()=>{
 for(const dims of [[1,1,50],[32,180,40],[1500,500,52]]){
  const map=createRefractionMap(...dims);
  assert.ok(map.width>0 && map.width<=320);assert.ok(map.height>0 && map.height<=320);
  assert.ok(map.pixels.every(Number.isFinite));
  for(let i=3;i<map.pixels.length;i+=4)assert.equal(map.pixels[i],255);
 }
});
