import test from 'node:test';
import assert from 'node:assert/strict';
import {mascot,MASCOT_POSES} from './mascot.mjs';
test('every character pose retains its complete visible body and static eyes',()=>{
 for(const pose of MASCOT_POSES){
  const svg=mascot(pose);
  for(const part of ['head','body','leftArm','rightArm','leftBoot','rightBoot','eyes'])assert.ok(svg.includes(`mascot-${part}`));
  const cells=[...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"/g)];
  assert.ok(cells.length>1200);
  for(const [,x,y] of cells)assert.ok(+x>8&&+x<504&&+y>9&&+y<639,'all cells need reserved margins');
 }
});
test('pose selection is bounded and shared art remains intact on smaller companions',()=>{
 assert.equal(mascot('unknown'),mascot('idle'));
 assert.ok(mascot('wave',true).includes('mascot-small'));
 assert.ok(!mascot('idle').includes('class="mascot-packet"'));
 assert.ok(mascot('inspect').includes('class="mascot-packet"'));
});
