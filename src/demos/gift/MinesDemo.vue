<script setup>
import {computed,ref} from 'vue';
import {Star,Bomb} from 'lucide-vue-next';
import {createMinefield,revealMine,multiplierFor} from './rounds.mjs';
defineProps({compact:Boolean});
const count=ref(3),state=ref({status:'ready',mines:new Set(),open:new Set()});
const multiplier=computed(()=>multiplierFor([...state.value.open].filter(i=>!state.value.mines.has(i)).length));
const message=computed(()=>state.value.status==='lost'?'Мина! Попробуйте ещё раз.':state.value.status==='won'?`Раунд завершён · ×${multiplier.value.toFixed(2)}`:state.value.status==='playing'?'Открывайте клетки или завершите раунд.':'Найдите звёзды на поле 5 × 5.');
function start(){state.value={status:'playing',mines:createMinefield(count.value),open:new Set()}}
function reveal(index){state.value=revealMine(state.value,index)}
</script>
<template><div class="mines-demo">
 <div class="mine-summary"><span>МИНЫ</span><strong>×{{multiplier.toFixed(2)}}</strong><div class="mine-options"><button v-for="n in [3,5,7]" :key="n" :aria-pressed="count===n" :disabled="state.status==='playing'" @click="count=n">{{n}}</button></div></div>
 <div class="game-field"><button v-for="i in 25" :key="i" class="cell" :class="{revealed:state.open.has(i-1),mine:state.open.has(i-1)&&state.mines.has(i-1),safe:state.open.has(i-1)&&!state.mines.has(i-1)}" :aria-label="`Клетка ${i}${state.open.has(i-1)?state.mines.has(i-1)?': мина':': звезда':''}`" :disabled="state.status!=='playing'||state.open.has(i-1)" @click="reveal(i-1)"><Bomb v-if="state.open.has(i-1)&&state.mines.has(i-1)"/><Star v-else-if="state.open.has(i-1)" fill="currentColor"/><span v-else class="cell-hidden">?</span></button></div>
 <button v-if="state.status!=='playing'" class="demo-action" @click="start">{{state.status==='ready'?'Играть в мины':'Ещё раунд'}}</button><button v-else class="demo-action" :disabled="!state.open.size" @click="state.status='won'">Завершить · ×{{multiplier.toFixed(2)}}</button>
 <p class="demo-status" role="status">{{message}}</p>
</div></template>
<style scoped src="./Mines.css"></style>
<style scoped>
.mines-demo{width:min(100%,360px);margin:auto}.game-field{width:100%;max-width:330px;margin:16px auto;padding:8px;gap:6px}.cell{aspect-ratio:1;border:1px solid #ffffff12;min-height:0;padding:0;color:#9aff27}.cell:disabled{opacity:1}.cell svg{width:24px;height:24px}.cell.mine{color:#ff7373}.mine-summary{display:flex;justify-content:space-between;align-items:center;gap:15px}.mine-summary>span{font-size:11px;letter-spacing:.12em;color:#b4b6af}.mine-summary strong{font-size:23px;color:#9aff27}.mine-options{display:flex;gap:5px}.mine-options button{background:#ffffff0a;border:1px solid #ffffff25;color:#fff;padding:4px 10px;border-radius:5px;font-size:11px}.mine-options button[aria-pressed=true]{border-color:#9aff27;color:#9aff27}.demo-action{width:100%;color:#152308}.cell:hover:not(:disabled){transform:translateY(-2px);background:#9aff2722}
.compact .game-field{max-width:200px;padding:5px;gap:4px;margin:10px auto}.compact .cell svg{width:17px;height:17px}.compact .mine-summary strong{font-size:18px}.compact .cell-hidden{font-size:14px}
</style>
