<script setup lang="ts">
import { RotateCw } from 'lucide-vue-next'
import { nextTick, onBeforeUnmount, ref, useId } from 'vue'

import cardTextureUrl from '@/assets/card/12k-card-ice-v2.webp'
import { telegram } from '@/app/telegram'
import type { CustomerProfile, LoyaltyCardData, PointsBalance } from '@/app/types'
import { formatPoints, isPositiveDecimal } from '@/app/view-model'

import BrandMark from './BrandMark.vue'
import QrCode from './QrCode.vue'

defineProps<{
  balance: PointsBalance
  card: LoyaltyCardData
  profile: CustomerProfile
}>()

const emit = defineEmits<{ openQr: [] }>()
const FLIP_FOCUS_FALLBACK_MS = 700
const isFlipped = ref(false)
const isTransitioning = ref(false)
const frontButton = ref<HTMLButtonElement | null>(null)
const backButton = ref<HTMLButtonElement | null>(null)
const qrButton = ref<HTMLButtonElement | null>(null)
const frontSummaryId = useId()
type FocusTarget = typeof frontButton

let focusFallbackTimer: ReturnType<typeof setTimeout> | null = null
let pendingFocus: { flipped: boolean; target: FocusTarget } | null = null
let unmounted = false

async function focusAfterFlip(target: FocusTarget, flipped: boolean): Promise<void> {
  await nextTick()
  if (unmounted || isFlipped.value !== flipped) return
  if (typeof target.value?.focus === 'function') target.value.focus({ preventScroll: true })
}

function clearFocusFallback(): void {
  if (focusFallbackTimer === null) return
  clearTimeout(focusFallbackTimer)
  focusFallbackTimer = null
}

function completeFlip(): void {
  const focus = pendingFocus
  if (!focus) return
  clearFocusFallback()
  pendingFocus = null
  isTransitioning.value = false
  void focusAfterFlip(focus.target, focus.flipped)
}

function scheduleFocus(target: FocusTarget, flipped: boolean): void {
  clearFocusFallback()
  pendingFocus = { flipped, target }
  const reducedMotion = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    completeFlip()
    return
  }
  isTransitioning.value = true
  focusFallbackTimer = setTimeout(completeFlip, FLIP_FOCUS_FALLBACK_MS)
}

function onFlipTransitionEnd(event: TransitionEvent): void {
  if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
  completeFlip()
}

function showQrFace(): void {
  if (isFlipped.value) return
  telegram.impact('light')
  isFlipped.value = true
  scheduleFocus(backButton, true)
}

function showDataFace(): void {
  if (!isFlipped.value) return
  telegram.impact('light')
  isFlipped.value = false
  scheduleFocus(frontButton, false)
}

function openQr(): void {
  telegram.impact('light')
  emit('openQr')
}

onBeforeUnmount(() => {
  unmounted = true
  clearFocusFallback()
  pendingFocus = null
})
</script>

<template>
  <article
    class="loyalty-card"
    :class="{ 'is-flipped': isFlipped, 'is-transitioning': isTransitioning }"
    aria-label="Карта участника 12K"
  >
    <span class="card-ambient" aria-hidden="true" />

    <div class="card-rotator" @transitionend="onFlipTransitionEnd">
      <div
        class="card-face card-face--front"
        :aria-hidden="isFlipped"
        :inert="isFlipped || undefined"
      >
        <button
          ref="frontButton"
          class="card-front-toggle"
          type="button"
          aria-label="Повернуть карту и показать QR-код"
          :aria-describedby="frontSummaryId"
          :tabindex="isFlipped ? -1 : 0"
          @click="showQrFace"
        ></button>
        <span class="card-surface">
          <img class="card-texture" :src="cardTextureUrl" alt="" aria-hidden="true" />
          <span :id="frontSummaryId" class="sr-only">
            Рублёвый кэшбэк {{ formatPoints(balance.available) }} рублей.
            <template v-if="isPositiveDecimal(balance.pending)">Ожидается {{ formatPoints(balance.pending) }} рублей кэшбэка.</template>
            Телефон {{ profile.phoneMasked }}.
          </span>

          <span class="card-content card-content--front">
            <span class="card-topline">
              <BrandMark />
              <span class="tier">{{ card.cardTypeName || 'Карта участника' }}</span>
            </span>

            <span class="balance-copy">
              <span class="balance-label">Кэшбэк с покупок</span>
              <span class="balance-value">{{ formatPoints(balance.available) }} ₽</span>
              <span v-if="isPositiveDecimal(balance.pending)" class="pending">
                +{{ formatPoints(balance.pending) }} скоро
              </span>
            </span>

            <span class="member-row">
              <span class="member-data">
                <span>{{ profile.phoneMasked }}</span>
              </span>
              <span class="flip-hint" aria-hidden="true">
                <RotateCw :size="14" :stroke-width="2" /> QR-код
              </span>
            </span>
          </span>
        </span>
      </div>

      <div
        class="card-face card-face--back"
        role="group"
        aria-label="Показать QR-код на весь экран"
        :aria-hidden="!isFlipped"
        :inert="!isFlipped || undefined"
      >
        <button
          ref="backButton"
          class="card-back-toggle"
          type="button"
          aria-label="Вернуться к данным карты"
          :tabindex="isFlipped ? 0 : -1"
          @click="showDataFace"
        ></button>
        <div class="card-surface">
          <img class="card-texture" :src="cardTextureUrl" alt="" aria-hidden="true" />

          <div class="card-content card-content--back">
            <div class="back-copy">
              <BrandMark />
              <strong>Карта участника</strong>
              <span>Покажите QR-код на кассе</span>
              <span class="flip-back-hint" aria-hidden="true">
                <RotateCw :size="14" :stroke-width="2" />
                Данные
              </span>
            </div>

            <button
              ref="qrButton"
              class="qr-button"
              type="button"
              aria-label="Открыть QR-код на весь экран"
              :tabindex="isFlipped ? undefined : -1"
              @click.stop="openQr"
            >
              <QrCode :value="card.qrValue" :size="116" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.loyalty-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1.586;
  isolation: isolate;
  perspective: 1100px;
}

.card-ambient {
  position: absolute;
  z-index: -1;
  inset: 18% 8% -9%;
  border-radius: 44%;
  background: rgb(0 98 196 / 32%);
  filter: blur(28px);
  opacity: .72;
  pointer-events: none;
}

.card-rotator {
  position: absolute;
  inset: 0;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  will-change: transform;
  transition: transform 620ms cubic-bezier(.22, .72, .18, 1);
}

.is-flipped .card-rotator {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: transparent;
  color: #fff;
  opacity: 1;
  visibility: visible;
  will-change: transform;
}

.card-surface {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  border: 1px solid #3d3d3d;
  border-radius: var(--radius-hero);
  background: #0c0c0c;
  box-shadow:
    0 22px 48px rgb(0 0 0 / 38%),
    inset 0 1px 0 rgb(255 255 255 / 6%);
}

.card-face--front {
  pointer-events: auto;
}

.card-face--back {
  transform: rotateY(180deg);
  pointer-events: none;
}

.is-flipped .card-face--front {
  pointer-events: none;
}

.is-flipped .card-face--back {
  pointer-events: auto;
}

.card-front-toggle,
.card-back-toggle {
  position: absolute;
  inset: 0;
  width: 100%;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.card-front-toggle { z-index: 3; }
.card-back-toggle { z-index: 3; }

.card-front-toggle:focus-visible,
.card-back-toggle:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 3px var(--color-accent-strong);
}

.card-texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.card-texture {
  object-fit: cover;
  filter: grayscale(1) brightness(.28) contrast(1.25);
  mix-blend-mode: screen;
  opacity: .28;
}

.card-content {
  position: relative;
  z-index: 1;
  display: grid;
  height: 100%;
  padding: clamp(14px, 4.4vw, 18px);
}

.card-content--front {
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.card-topline,
.member-row {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-topline :deep(.brand-mark),
.back-copy :deep(.brand-mark) {
  color: #fff;
}

.tier {
  padding: 5px 9px;
  border: 1px solid #3f3f3f;
  border-radius: var(--radius-pill);
  background: rgb(255 255 255 / 5%);
  color: #cccccc;
  font-size: 10px;
  font-weight: 750;
}

.balance-copy {
  display: flex;
  min-width: 0;
  align-self: center;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 7px;
}

.balance-label {
  width: 100%;
  color: #999;
  font-size: 11px;
  font-weight: 650;
}

.balance-value {
  max-width: 100%;
  overflow: hidden;
  color: #fff;
  font-size: clamp(29px, 9vw, 38px);
  font-variant-numeric: tabular-nums;
  font-weight: 790;
  line-height: 1.05;
  letter-spacing: -.045em;
  text-overflow: ellipsis;
}

.pending {
  color: #41a4ec;
  font-size: 10px;
  font-weight: 750;
}

.member-data {
  display: grid;
  min-width: 0;
  gap: 2px;
  color: #b4b4b4;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
}

.member-data span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flip-hint {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 5px;
  color: #41a4ec;
  font-size: 10px;
  font-weight: 750;
}

.card-content--back {
  z-index: 4;
  align-items: center;
  gap: clamp(12px, 4vw, 22px);
  grid-template-columns: minmax(0, 1fr) auto;
  pointer-events: none;
}

.back-copy {
  display: grid;
  min-width: 0;
  align-content: center;
  gap: 4px;
}

.back-copy strong {
  margin-top: 10px;
  color: #fff;
  font-size: clamp(14px, 4.5vw, 18px);
  line-height: 1.15;
}

.back-copy > span {
  max-width: 18ch;
  color: #9d9d9d;
  font-size: 10px;
  line-height: 1.35;
}

.flip-back-hint {
  display: inline-flex;
  width: max-content;
  min-height: 44px;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  padding: 0 10px;
  border: 1px solid #3e3e3e;
  border-radius: 11px;
  background: rgb(255 255 255 / 5%);
  color: #41a4ec;
  font-size: 11px;
  font-weight: 760;
  pointer-events: none;
}

.qr-button {
  position: relative;
  z-index: 4;
  display: grid;
  width: clamp(100px, 31vw, 122px);
  height: clamp(100px, 31vw, 122px);
  flex: 0 0 auto;
  padding: 3px;
  place-items: center;
  border: 1px solid #3d3d3d;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 12px 30px rgb(0 0 0 / 35%);
  cursor: zoom-in;
  pointer-events: auto;
  transition: transform 180ms var(--ease-out), box-shadow 180ms var(--ease-out);
}

.qr-button:active { transform: scale(.975); }

.qr-button :deep(.qr-code),
.qr-button :deep(svg) { width: 100%; height: 100%; }

@media (max-width: 350px) {
  .card-content { padding: 13px; }
  .tier { max-width: 112px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .back-copy > span { display: none; }
  .back-copy strong { margin-top: 6px; }
  .flip-back-hint { margin-top: 5px; }
}

@media (prefers-reduced-motion: reduce) {
  .card-rotator {
    transform: none !important;
    transition: none;
  }

  .card-face--back {
    opacity: 0;
    visibility: hidden;
    transform: none;
    pointer-events: none;
  }

  .is-flipped .card-face--front {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .is-flipped .card-face--back {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}
</style>
