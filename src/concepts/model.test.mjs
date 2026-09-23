import test from 'node:test';
import assert from 'node:assert/strict';
import {homeQuote,careQuote,membershipPrice,daySchedule} from './model.mjs';

test('House quote accounts for area, facade and removing the terrace without residual cost',()=>{
  assert.equal(homeQuote({area:54,facade:'cedar',terrace:true}).total,4490000);
  const full=homeQuote({area:72,facade:'graphite',terrace:true});
  const bare=homeQuote({area:72,facade:'graphite',terrace:false});
  assert.equal(full.terraceArea,24);assert.equal(full.total-bare.total,720000);
  assert.equal(bare.total,5130000);assert.equal(bare.deck,0);
  assert.throws(()=>homeQuote({area:40}),RangeError);
});
test('Care quote covers deselection, duplicate services, size and full-body film',()=>{
  assert.deepEqual(careQuote({selected:[]}),{total:0,days:0,rows:[]});
  assert.equal(careQuote({selected:['polish','ceramic']}).total,40000);
  assert.equal(careQuote({selected:['polish','polish']}).total,18000);
  const quote=careQuote({size:'L',selected:['film'],zone:'full'});
  assert.equal(quote.total,218400);assert.equal(quote.days,3);
  assert.throws(()=>careQuote({size:'XXL'}),RangeError);
  assert.throws(()=>careQuote({selected:['unknown']}),RangeError);
});
test('Membership total reconciles with monthly display and terms',()=>{
  for(const months of [1,3,6]){const q=membershipPrice(months);assert.equal(q.monthly*months,q.total);}
  assert.ok(membershipPrice(6).monthly<membershipPrice(1).monthly);
  assert.throws(()=>membershipPrice(0),RangeError);
});
test('Schedule changes across weekday and weekend with valid chronology',()=>{
  assert.notEqual(daySchedule(0)[0].time,daySchedule(6)[0].time);
  assert.notDeepEqual(daySchedule(0),daySchedule(1));
  for(let day=0;day<7;day++){const times=daySchedule(day).map(r=>r.time);assert.deepEqual(times,[...times].sort());}
});
