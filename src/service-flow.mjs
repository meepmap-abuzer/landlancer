import {escapeHtml} from './seo.mjs';

const centers = count => Array.from({length:count}, (_,i) => (i+.5)*600/count);

// The SVG strip and HTML row share the same equal-width columns. Text can wrap
// without moving a connector away from the centre of its node.
function connectors(from, to){
 const source=centers(from), target=centers(to);
 const joined=[...source,...target];
 const stems=source.map(x=>`M${x} 0V18`).join('')+target.map(x=>`M${x} 18V36`).join('');
 const bus=`M${Math.min(...joined)} 18H${Math.max(...joined)}`;
 const arrows=target.map(x=>`M${x-3} 32L${x} 36L${x+3} 32`).join('');
 return `<svg class="flow-connectors" viewBox="0 0 600 36" preserveAspectRatio="none" aria-hidden="true"><path d="${stems}${bus}${arrows}"/></svg>`;
}

const node=({title,detail,accent=false})=>`<div class="flow-node${accent?' flow-node-accent':''}"><strong>${escapeHtml(title)}</strong>${detail?`<span>${escapeHtml(detail)}</span>`:''}</div>`;

export function serviceFlow(rows){
 return `<div class="service-flow">${rows.map((row,i)=>`${i?connectors(rows[i-1].length,row.length):''}<div class="flow-row" data-count="${row.length}" style="--flow-columns:${row.length}">${row.map(item=>`<div class="flow-cell">${node(item)}</div>`).join('')}</div>`).join('')}</div>`;
}

const sequenceArrow='<svg class="flow-sequence-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12H22M17 7L22 12L17 17"/></svg>';

export function serviceSequence(items){
 return `<div class="flow-sequence">${items.map((item,i)=>`${i?sequenceArrow:''}${node(item)}`).join('')}</div>`;
}
