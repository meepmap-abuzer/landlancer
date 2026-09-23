const STACK_COLORS = [0x0062c4, 0x1478c9, 0xe9e9e9, 0x4d4d4d] as const

export function easeInOutCubic(progress: number): number {
  const value = Math.min(Math.max(progress, 0), 1)
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

export function placedStackColor(level: number): number {
  const safeLevel = Math.max(Math.trunc(level), 1)
  return STACK_COLORS[safeLevel % STACK_COLORS.length]!
}

export function movingStackColor(placedCount: number): number {
  return placedStackColor(Math.max(Math.trunc(placedCount), 0) + 1)
}
