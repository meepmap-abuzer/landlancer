<script setup>
import {computed,onBeforeUnmount,onMounted,ref} from 'vue';
import {crashMultiplier} from './rounds.mjs';
const status=ref('ready'),value=ref(1),history=ref([]);let frame=0,started=0,limit=2;
const path=computed(()=>{const prog=Math.min((value.value-1)/3,1);return Array.from({length:51},(_,i)=>{const t=i/50*prog;return `${i?'L':'M'}${50+Math.pow(t,.41)*320},${250-Math.pow(Math.max(0,(t-.1)/.9),2)*200}`}).join(' ')});
function finish(next){cancelAnimationFrame(frame);status.value=next;history.value=[value.value,...history.value].slice(0,6)}
function tick(now){value.value=Math.min(crashMultiplier(now-started),limit);if(value.value>=limit)finish('crashed');else frame=requestAnimationFrame(tick)}
function start(){if(status.value==='running')return;value.value=1;status.value='running';limit=1.5+Math.random()*3;started=performance.now();frame=requestAnimationFrame(tick)}
function visibility(){if(document.hidden&&status.value==='running')finish('paused')}
onMounted(()=>document.addEventListener('visibilitychange',visibility));onBeforeUnmount(()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility)});
</script>
<template><div class="crash-demo"><div class="game-container"><svg class="graph-svg" viewBox="0 0 400 280" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="demo-crash-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff0e"/></pattern></defs><rect width="400" height="280" fill="url(#demo-crash-grid)"/><path :d="path" fill="none" :stroke="status==='crashed'?'#f87171':'#9aff27'" stroke-width="4" stroke-linecap="round"/></svg><div class="multiplier-display" :class="{crashed:status==='crashed'}">×{{value.toFixed(2)}}</div></div><div class="history-bar"><span class="history-badge" v-for="(n,i) in history" :key="i">×{{n.toFixed(2)}}</span></div><button class="demo-action" @click="status==='running'?finish('collected'):start()">{{status==='running'?'Остановить полёт':'Запустить краш'}}</button><p class="demo-status" role="status">{{status==='crashed'?'Краш! Запустите новый полёт.':status==='collected'?`Остановлено на ×${value.toFixed(2)}`:status==='paused'?'Раунд остановлен при уходе со страницы.':'Успейте остановиться до завершения полёта.'}}</p></div></template>
<style scoped src="./Jet.css"></style>
<style scoped>.crash-demo{width:min(100%,500px);margin:auto}.game-container{height:310px;min-height:0;margin:0;background:#181c16}.multiplier-display{font-size:52px}.demo-action{width:100%;color:#152308}.history-bar{height:30px;margin:12px 0}.history-badge{font-size:11px}</style>
