<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  createStackState,
  placeMovingBlock,
  trajectoryPositionMilli,
  type StackClientState,
} from '@/app/stackEngine'
import type { StackRules } from '@/app/types'
import { russianCountForm } from '@/app/view-model'
import { StackScene2D } from './stack/StackScene2D'
import {
  StackScene3D,
  type StackScene,
  type StackSceneFrame,
} from './stack/StackScene3D'

const props = defineProps<{
  rules: StackRules
  runId: string | null
  seed: number
  running: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  place: [state: StackClientState]
  ended: [state: StackClientState]
  timeout: []
}>()

const stage = ref<HTMLElement | null>(null)
const webglCanvas = ref<HTMLCanvasElement | null>(null)
const fallbackCanvas = ref<HTMLCanvasElement | null>(null)
const state = ref(createStackState(props.rules))
const reducedMotion = ref(false)
const usingFallback = ref(false)
let scene: StackScene | null = null
let resizeObserver: ResizeObserver | null = null
let mediaQuery: MediaQueryList | null = null
let runStartedAt = 0
let pausedAt = 0
let pausedDuration = 0
let currentPosition = -props.rules.movementRangeMilli
let lastRunId: string | null = null
let effectUntil = 0
let placementDeadlineTimer: ReturnType<typeof globalThis.setTimeout> | null = null
let localTimedOut = false

const placedCount = computed(() => state.value.events.length)
const placedCountLabel = computed(
  () => `${placedCount.value} ${russianCountForm(placedCount.value, 'блок', 'блока', 'блоков')}`,
)

watch(() => props.runId, (runId) => {
  if (!runId || runId === lastRunId) return
  lastRunId = runId
  beginRun(props.rules)
})

watch(() => props.rules, (rules) => {
  if (props.running && props.runId) beginRun(rules)
  else if (!lastRunId) reset(rules)
}, { deep: true })

watch(() => props.running, (running) => {
  if (running && state.value.status !== 'ENDED') {
    startLoop()
    schedulePlacementDeadline()
  }
  else if (effectUntil > performance.now()) startLoop()
  else {
    clearPlacementDeadline()
    scene?.stop()
    render(performance.now(), 0)
  }
})

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mediaQuery.matches
  mediaQuery.addEventListener?.('change', onMotionChange)
  initializeScene()
  resizeObserver = new ResizeObserver(resizeScene)
  if (stage.value) resizeObserver.observe(stage.value)
  resizeScene()
  document.addEventListener('visibilitychange', onVisibilityChange)
  void nextTick(() => render(performance.now(), 0))
})

onBeforeUnmount(() => {
  clearPlacementDeadline()
  webglCanvas.value?.removeEventListener('webglcontextlost', onContextLost)
  webglCanvas.value?.removeEventListener('webglcontextrestored', onContextRestored)
  scene?.stop()
  scene?.dispose()
  scene = null
  resizeObserver?.disconnect()
  mediaQuery?.removeEventListener?.('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

function initializeScene(forceFallback = false, releaseContext = true): void {
  const primary = webglCanvas.value
  primary?.removeEventListener('webglcontextlost', onContextLost)
  primary?.removeEventListener('webglcontextrestored', onContextRestored)
  scene?.stop()
  scene?.dispose(releaseContext)
  scene = null
  const fallback = fallbackCanvas.value
  if (!forceFallback && primary && StackScene3D.isSupported()) {
    try {
      scene = new StackScene3D(primary)
      usingFallback.value = false
      primary.addEventListener('webglcontextlost', onContextLost)
      primary.addEventListener('webglcontextrestored', onContextRestored)
    } catch {
      scene = null
    }
  }
  if (!scene && fallback) {
    scene = new StackScene2D(fallback)
    usingFallback.value = true
  }
  if (forceFallback && primary) {
    primary.addEventListener('webglcontextrestored', onContextRestored)
  }
  resizeScene()
  if (props.running && !document.hidden) startLoop()
}

function reset(rules = props.rules): void {
  state.value = createStackState(rules)
  currentPosition = -rules.movementRangeMilli
  render(performance.now(), 0)
}

function beginRun(rules: StackRules): void {
  runStartedAt = performance.now()
  pausedAt = document.hidden ? runStartedAt : 0
  pausedDuration = 0
  currentPosition = -rules.movementRangeMilli
  state.value = { ...createStackState(rules), status: 'PLAYING' }
  effectUntil = 0
  localTimedOut = false
  if (props.running) {
    startLoop()
    schedulePlacementDeadline()
  }
  else render(performance.now(), 0)
}

function place(event: PointerEvent | KeyboardEvent): void {
  if (event instanceof PointerEvent && (!event.isPrimary || event.button !== 0)) return
  if (event instanceof KeyboardEvent && event.repeat) return
  if (!props.running || props.disabled || localTimedOut || state.value.status === 'ENDED') return
  const elapsedMs = Math.max(Math.round(activeElapsedMs(performance.now())), 1)
  const previousElapsed = state.value.events.at(-1)?.elapsedMs ?? 0
  const intervalMs = elapsedMs - previousElapsed
  if (intervalMs < props.rules.minEventIntervalMs) return
  if (intervalMs > props.rules.maxEventIntervalMs) {
    onPlacementDeadline()
    return
  }
  currentPosition = trajectoryPositionMilli(
    props.rules,
    props.seed,
    state.value.events.length + 1,
    intervalMs,
  )
  state.value = placeMovingBlock(state.value, currentPosition, elapsedMs)
  emit('place', state.value)
  render(performance.now(), 0)
  if (state.value.status === 'ENDED' || state.value.events.length >= props.rules.maxEvents) {
    clearPlacementDeadline()
    effectUntil = reducedMotion.value ? 0 : performance.now() + 1500
    if (effectUntil) startLoop()
    else scene?.stop()
    emit('ended', state.value)
  } else {
    schedulePlacementDeadline()
  }
}

function onMotionChange(event: MediaQueryListEvent): void {
  reducedMotion.value = event.matches
  render(performance.now(), 0)
}

function onVisibilityChange(): void {
  if (document.hidden) {
    clearPlacementDeadline()
    pausedAt = performance.now()
    scene?.stop()
  } else if (props.running && state.value.status !== 'ENDED') {
    if (pausedAt) pausedDuration += performance.now() - pausedAt
    pausedAt = 0
    startLoop()
    schedulePlacementDeadline()
  } else {
    render(performance.now(), 0)
  }
}

function onContextLost(event: Event): void {
  event.preventDefault()
  initializeScene(true, false)
  render(performance.now(), 0)
}

function onContextRestored(): void {
  initializeScene()
  render(performance.now(), 0)
}

function startLoop(): void {
  if (!scene || document.hidden) return
  scene.start((timestamp, deltaSeconds) => render(timestamp, deltaSeconds))
}

function resizeScene(): void {
  const element = stage.value
  if (!element || !scene) return
  const width = Math.max(element.clientWidth, 1)
  const height = Math.max(element.clientHeight, 1)
  const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
  scene.resize(width, height, ratio)
  render(performance.now(), 0)
}

function render(now: number, deltaSeconds: number): void {
  if (!scene) return
  if (props.running && state.value.status !== 'ENDED') {
    const elapsed = Math.max(activeElapsedMs(now), 0)
    const previousElapsed = state.value.events.at(-1)?.elapsedMs ?? 0
    const intervalMs = Math.max(Math.round(elapsed) - previousElapsed, 0)
    currentPosition = trajectoryPositionMilli(
      props.rules,
      props.seed,
      state.value.events.length + 1,
      intervalMs,
    )
  }
  const frame: StackSceneFrame = {
    rules: props.rules,
    state: state.value,
    movingPositionMilli: currentPosition,
    running: props.running && state.value.status !== 'ENDED',
    reducedMotion: reducedMotion.value,
  }
  scene.render(frame, deltaSeconds)
  if (!props.running && effectUntil && now >= effectUntil) {
    effectUntil = 0
    scene.stop()
  }
}

function activeElapsedMs(now: number): number {
  const currentPause = pausedAt ? now - pausedAt : 0
  return now - runStartedAt - pausedDuration - currentPause
}

function schedulePlacementDeadline(): void {
  clearPlacementDeadline()
  if (!props.running || document.hidden || localTimedOut || state.value.status === 'ENDED') return
  const elapsedMs = Math.max(Math.round(activeElapsedMs(performance.now())), 0)
  const previousElapsed = state.value.events.at(-1)?.elapsedMs ?? 0
  const remaining = props.rules.maxEventIntervalMs - (elapsedMs - previousElapsed)
  if (remaining <= 0) {
    onPlacementDeadline()
    return
  }
  placementDeadlineTimer = globalThis.setTimeout(() => {
    placementDeadlineTimer = null
    schedulePlacementDeadline()
  }, Math.max(remaining + 1, 1))
}

function onPlacementDeadline(): void {
  if (localTimedOut || !props.running || state.value.status === 'ENDED') return
  localTimedOut = true
  clearPlacementDeadline()
  scene?.stop()
  emit('timeout')
}

function clearPlacementDeadline(): void {
  if (placementDeadlineTimer !== null) globalThis.clearTimeout(placementDeadlineTimer)
  placementDeadlineTimer = null
}
</script>

<template>
  <section ref="stage" class="stack-stage" :class="{ 'is-fallback': usingFallback }">
    <canvas ref="webglCanvas" class="stack-scene stack-scene--webgl" aria-hidden="true" />
    <canvas ref="fallbackCanvas" class="stack-scene stack-scene--fallback" aria-hidden="true" />
    <button
      class="stack-input"
      type="button"
      :disabled="disabled || !running"
      aria-label="Игровое поле Stack"
      :aria-describedby="running ? 'stack-control-help' : undefined"
      @pointerdown.prevent="place"
      @keydown.space.prevent="place"
      @keydown.enter.prevent="place"
    >
      <span class="sr-only">Поставить движущийся блок</span>
    </button>
    <span v-if="usingFallback" class="stack-fallback-note">
      Упрощённая графика: 3D недоступно на этом устройстве
    </span>
    <span class="sr-only">{{ placedCountLabel }}</span>
  </section>
</template>

<style scoped>
.stack-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #050505;
  touch-action: none;
  user-select: none;
}

.stack-scene {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.stack-scene--fallback { visibility: hidden; }
.stack-stage.is-fallback .stack-scene--webgl { visibility: hidden; }
.stack-stage.is-fallback .stack-scene--fallback { visibility: visible; }

.stack-input {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  touch-action: none;
}

.stack-input:disabled { cursor: default; }
.stack-input:focus-visible { outline: 3px solid rgb(22 136 221 / 78%); outline-offset: -5px; }

.stack-fallback-note {
  position: absolute;
  z-index: 3;
  right: 12px;
  bottom: calc(68px + max(var(--tg-safe-bottom), env(safe-area-inset-bottom)));
  left: 12px;
  margin: auto;
  max-width: 320px;
  padding: 7px 10px;
  border-radius: 10px;
  background: rgb(10 10 10 / 84%);
  color: #aaa;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  pointer-events: none;
}
</style>
