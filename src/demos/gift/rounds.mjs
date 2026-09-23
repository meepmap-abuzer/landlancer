export function createMinefield(count=3,random=Math.random){
 const pool=Array.from({length:25},(_,i)=>i);
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 return new Set(pool.slice(0,count));
}
export function revealMine(state,index){
 if(state.status!=='playing'||index<0||index>=25||state.open.has(index))return state;
 const open=new Set(state.open);open.add(index);
 return {...state,open,status:state.mines.has(index)?'lost':open.size===25-state.mines.size?'won':'playing'};
}
export const multiplierFor=opened=>Number((1+opened*.18).toFixed(2));
export const crashMultiplier=elapsed=>Math.exp(Math.max(0,elapsed)/5500);
export const upgradeWins=(angle,chance)=>((angle%360)+360)%360<chance*3.6;
