import type { StackEvent, StackRules } from './types'

export type StackClientRules = StackRules

export interface StackFootprint {
  centerXMilli: number
  centerZMilli: number
  sizeXMilli: number
  sizeZMilli: number
}

export interface StackBlock {
  axis: 'X' | 'Z'
  centerMilli: number
  sizeMilli: number
  overlapMilli: number
  isPerfect: boolean
  isMiss: boolean
  placed: StackFootprint | null
  overhang: StackFootprint | null
}

export interface StackClientState {
  status: 'READY' | 'PLAYING' | 'ENDED'
  rules: StackClientRules
  blocks: StackBlock[]
  events: StackEvent[]
  centres: { X: number; Z: number }
  sizes: { X: number; Z: number }
}

export function createStackState(rules: StackClientRules): StackClientState {
  return {
    status: 'READY',
    rules,
    blocks: [],
    events: [],
    centres: { X: 0, Z: 0 },
    sizes: { X: rules.baseSizeMilli, Z: rules.baseSizeMilli },
  }
}

export function movingPositionMilli(
  elapsedMs: number,
  speedMilliPerSecond: number,
  movementRangeMilli: number,
  phaseMilli = 0,
): number {
  const travel = Math.floor(elapsedMs * speedMilliPerSecond / 1000)
  const span = movementRangeMilli * 2
  const wrapped = (((phaseMilli + travel) % (span * 2)) + span * 2) % (span * 2)
  const offset = wrapped <= span ? wrapped : span * 2 - wrapped
  return -movementRangeMilli + offset
}

export function trajectoryPositionMilli(
  rules: StackClientRules,
  seed: number,
  ordinal: number,
  intervalMs: number,
): number {
  const cycle = rules.movementRangeMilli * 4
  const phase = seedPhase(seed, ordinal, cycle)
  return movingPositionMilli(
    intervalMs,
    speedForLevel(rules, ordinal - 1),
    rules.movementRangeMilli,
    phase,
  )
}

function seedPhase(seed: number, ordinal: number, cycle: number): number {
  let mixed = (seed >>> 0) ^ (Math.imul(ordinal, 0x9e3779b9) >>> 0)
  mixed = (mixed ^ (mixed >>> 16)) >>> 0
  mixed = Math.imul(mixed, 0x85ebca6b) >>> 0
  mixed = (mixed ^ (mixed >>> 13)) >>> 0
  mixed = Math.imul(mixed, 0xc2b2ae35) >>> 0
  mixed = (mixed ^ (mixed >>> 16)) >>> 0
  return mixed % cycle
}

export function speedForLevel(rules: StackClientRules, level: number): number {
  return Math.min(
    rules.initialSpeedMilliPerSecond + level * rules.speedStepMilliPerSecond,
    rules.maxSpeedMilliPerSecond,
  )
}

export function placeMovingBlock(
  state: StackClientState,
  positionMilli: number,
  elapsedMs: number,
): StackClientState {
  if (state.status === 'ENDED' || state.events.length >= state.rules.maxEvents) return state
  const ordinal = state.events.length + 1
  const axis = ordinal % 2 ? 'X' : 'Z'
  const offset = positionMilli - state.centres[axis]
  const overlapMilli = Math.max(state.sizes[axis] - Math.abs(offset), 0)
  const isMiss = overlapMilli < state.rules.minOverlapMilli
  const isPerfect = !isMiss && Math.abs(offset) <= state.rules.perfectToleranceMilli
  const nextCentres = { ...state.centres }
  const nextSizes = { ...state.sizes }
  const movingFootprint: StackFootprint = {
    centerXMilli: axis === 'X' ? positionMilli : state.centres.X,
    centerZMilli: axis === 'Z' ? positionMilli : state.centres.Z,
    sizeXMilli: state.sizes.X,
    sizeZMilli: state.sizes.Z,
  }
  if (!isMiss && !isPerfect) {
    nextSizes[axis] = overlapMilli
    nextCentres[axis] = Math.trunc((state.centres[axis] + positionMilli) / 2)
  }
  const placed: StackFootprint | null = isMiss ? null : {
    centerXMilli: nextCentres.X,
    centerZMilli: nextCentres.Z,
    sizeXMilli: nextSizes.X,
    sizeZMilli: nextSizes.Z,
  }
  const overhang = isMiss
    ? movingFootprint
    : isPerfect
      ? null
      : overhangFootprint(movingFootprint, axis, offset, overlapMilli)
  return {
    ...state,
    status: isMiss || ordinal >= state.rules.maxEvents ? 'ENDED' : 'PLAYING',
    centres: nextCentres,
    sizes: nextSizes,
    events: [
      ...state.events,
      { ordinal, elapsedMs, axis, position: positionToWire(positionMilli) },
    ],
    blocks: [
      ...state.blocks,
      {
        axis,
        centerMilli: positionMilli,
        sizeMilli: state.sizes[axis],
        overlapMilli,
        isPerfect,
        isMiss,
        placed,
        overhang,
      },
    ],
  }
}

function overhangFootprint(
  moving: StackFootprint,
  axis: 'X' | 'Z',
  offset: number,
  overlapMilli: number,
): StackFootprint {
  const result = { ...moving }
  const sign = offset < 0 ? -1 : 1
  if (axis === 'X') {
    result.centerXMilli = Math.trunc(moving.centerXMilli + sign * overlapMilli / 2)
    result.sizeXMilli = moving.sizeXMilli - overlapMilli
  } else {
    result.centerZMilli = Math.trunc(moving.centerZMilli + sign * overlapMilli / 2)
    result.sizeZMilli = moving.sizeZMilli - overlapMilli
  }
  return result
}

export function positionToWire(value: number): string {
  const sign = value < 0 ? '-' : ''
  const absolute = Math.abs(Math.trunc(value))
  return `${sign}${Math.floor(absolute / 1000)}.${String(absolute % 1000).padStart(3, '0')}`
}
