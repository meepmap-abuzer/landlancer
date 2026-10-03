<script setup>
import {ref} from 'vue';import MinesDemo from './MinesDemo.vue';import CrashDemo from './CrashDemo.vue';import CaseDemo from './CaseDemo.vue';import UpgradeDemo from './UpgradeDemo.vue';
defineProps({compact:Boolean});const mode=ref('mines'),modes=[['mines','Мины',MinesDemo],['case','Кейсы',CaseDemo],['crash','Краш',CrashDemo],['upgrade','Апгрейд',UpgradeDemo]];
</script>
<template><div class="gift-demo" :class="{compact}"><header class="demo-topbar"><span class="demo-wordmark">Gift Run<span>✳</span></span><small>Интерактивное демо</small></header><nav v-if="!compact" class="demo-tabs" aria-label="Режим игры"><button v-for="[key,label] in modes" :key="key" :aria-pressed="mode===key" @click="mode=key">{{label}}</button></nav><div class="gift-mode-host"><component :is="modes.find(m=>m[0]===mode)[2]" :compact="compact"/></div><p class="demo-note">Демонстрационные раунды · без ставок и реальных призов</p></div></template>
<style scoped>.gift-demo{--demo-accent:#9aff27;color:#f3f6ef;background:#131710;padding:28px 36px;border-radius:24px;min-height:590px}.demo-wordmark span{color:#9aff27;margin-left:10px}.demo-tabs button[aria-pressed=true]{color:#152308}.compact{padding:22px 26px;min-height:0;height:390px}@media(max-width:600px){.gift-demo{padding:22px 16px;min-height:550px}.compact{min-height:0;height:390px}}</style>
<style scoped>
.gift-demo{width:100%;min-width:0}
.gift-demo:not(.compact) .gift-mode-host{width:min(100%,420px);min-height:520px;margin-inline:auto;container:gift-mode / inline-size}
/* Reserve the same body and control positions for every mode and result. */
.gift-demo:not(.compact) .gift-mode-host > :deep(*){width:100%;min-width:0;min-height:520px;display:flex;flex-direction:column}
.gift-demo:not(.compact) .gift-mode-host :deep(.demo-action){margin-top:auto;flex-shrink:0}
.gift-demo:not(.compact) .gift-mode-host :deep(.demo-status){min-height:44px;flex-shrink:0}
@container gift-mode (max-width:240px){
 .gift-demo:not(.compact) .gift-mode-host > :deep(*){min-height:580px}
 .gift-demo:not(.compact) .gift-mode-host :deep(.demo-action){min-height:68px}
 .gift-demo:not(.compact) .gift-mode-host :deep(.demo-status){min-height:72px}
}
@media(max-width:600px){.demo-topbar small{display:none}.demo-wordmark{white-space:nowrap}}
</style>
