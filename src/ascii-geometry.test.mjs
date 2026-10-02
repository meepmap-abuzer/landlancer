import test from 'node:test';
import assert from 'node:assert/strict';
import {ribbonFrame,ribbonSvg,ASCII_WIDTH,ASCII_HEIGHT} from '../ascii-geometry.mjs';

test('ribbon remains populated and within its reserved frame through motion and pointer tilt',()=>{
 for(const phase of [0,1,4,8,16,32])for(const x of [-1,0,1])for(const y of [-1,1]){
  const cells=ribbonFrame(phase,x,y);
  assert.ok(cells.length>700,'surface must not disappear or become a thin placeholder');
  for(const cell of cells){
   assert.ok(Number.isFinite(cell.x)&&Number.isFinite(cell.y));
   assert.ok(cell.x>0&&cell.x<ASCII_WIDTH-7&&cell.y>9&&cell.y<ASCII_HEIGHT-9,'geometry needs a margin, not a clipped silhouette');
  }
 }
});
test('static HTML provides the actual character surface before canvas initialization',()=>{
 const svg=ribbonSvg();
 assert.equal((svg.match(/<text /g)||[]).length,ribbonFrame().length);
 assert.ok(ribbonFrame().some(cell=>cell.char==='#'));
 assert.notDeepEqual(ribbonFrame(0),ribbonFrame(3),'animation must change the rendered surface');
});
