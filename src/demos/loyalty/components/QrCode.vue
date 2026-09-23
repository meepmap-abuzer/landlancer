<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

withDefaults(defineProps<{
  value: string
  size?: number
}>(), {
  size: 108,
})
</script>

<template>
  <span class="qr-code" role="img" aria-label="QR-код карты участника">
    <QrcodeVue
      :value="value"
      :size="size"
      level="M"
      render-as="svg"
      :margin="4"
      background="#ffffff"
      foreground="#000000"
    />
  </span>
</template>

<style scoped>
.qr-code {
  display: inline-flex;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
}

.qr-code :deep(svg) {
  display: block;
}
</style>
