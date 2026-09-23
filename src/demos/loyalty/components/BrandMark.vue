<script setup lang="ts">
import markUrl from '@/assets/brand/12k-mark.png'
</script>

<template>
  <span class="brand-mark" role="img" aria-label="12K">
    <svg viewBox="0 0 720 362" aria-hidden="true" focusable="false">
      <filter id="brand-alpha-clean" color-interpolation-filters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="1 0" />
          <feFuncG type="table" tableValues="1 0" />
          <feFuncB type="table" tableValues="1 0" />
          <feFuncA type="linear" slope="1.08" intercept="-.05" />
        </feComponentTransfer>
      </filter>
      <image :href="markUrl" width="720" height="362" filter="url(#brand-alpha-clean)" />
    </svg>
  </span>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  width: 54px;
  height: 28px;
  align-items: center;
  color: var(--color-ink);
}

.brand-mark svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
