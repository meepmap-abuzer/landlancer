import type { StackFootprint } from '@/app/stackEngine'
import type { StackScene, StackSceneFrame } from './StackScene3D'

interface ProjectedPoint {
  x: number
  y: number
}

export class StackScene2D implements StackScene {
  private readonly context: CanvasRenderingContext2D
  private width = 1
  private height = 1
  private animationFrame = 0
  private previousTimestamp = 0
  private disposed = false

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d', { alpha: false })
    if (!context) throw new Error('Canvas2D is unavailable')
    this.context = context
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.width = Math.max(width, 1)
    this.height = Math.max(height, 1)
    this.canvas.width = Math.round(this.width * pixelRatio)
    this.canvas.height = Math.round(this.height * pixelRatio)
    this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  }

  start(callback: (timestamp: number, deltaSeconds: number) => void): void {
    this.stop()
    const frame = (timestamp: number): void => {
      if (this.disposed) return
      const delta = this.previousTimestamp
        ? Math.min((timestamp - this.previousTimestamp) / 1000, 0.05)
        : 0
      this.previousTimestamp = timestamp
      callback(timestamp, delta)
      this.animationFrame = requestAnimationFrame(frame)
    }
    this.animationFrame = requestAnimationFrame(frame)
  }

  stop(): void {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
    this.animationFrame = 0
    this.previousTimestamp = 0
  }

  render(frame: StackSceneFrame): void {
    if (this.disposed) return
    const ctx = this.context
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, this.width, this.height)

    const placed = frame.state.blocks.flatMap((block) => block.placed ? [block.placed] : [])
    const firstVisible = Math.max(placed.length - 18, 0)
    const visible = placed.slice(firstVisible)
    const floorY = this.height * 0.72
    const blockHeight = Math.min(Math.max(this.height * 0.035, 16), 28)
    const scale = Math.min(this.width / 10, 44)

    const foundation: StackFootprint = {
      centerXMilli: 0,
      centerZMilli: 0,
      sizeXMilli: frame.rules.baseSizeMilli,
      sizeZMilli: frame.rules.baseSizeMilli,
    }
    this.drawBlock(foundation, floorY + firstVisible * blockHeight, scale, blockHeight, '#0062c4')
    visible.forEach((footprint, index) => {
      const level = firstVisible + index + 1
      this.drawBlock(
        footprint,
        floorY - (index + 1) * blockHeight,
        scale,
        blockHeight,
        level % 3 === 0 ? '#e9e9e9' : level % 2 ? '#1478c9' : '#4d4d4d',
      )
    })

    if (frame.running) {
      const axis = (frame.state.events.length + 1) % 2 ? 'X' : 'Z'
      this.drawBlock({
        centerXMilli: axis === 'X' ? frame.movingPositionMilli : frame.state.centres.X,
        centerZMilli: axis === 'Z' ? frame.movingPositionMilli : frame.state.centres.Z,
        sizeXMilli: frame.state.sizes.X,
        sizeZMilli: frame.state.sizes.Z,
      }, floorY - (visible.length + 1) * blockHeight, scale, blockHeight, '#1688dd')
    }
  }

  dispose(): void {
    if (this.disposed) return
    this.stop()
    this.disposed = true
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private drawBlock(
    footprint: StackFootprint,
    centerY: number,
    scale: number,
    height: number,
    color: string,
  ): void {
    const x = footprint.centerXMilli / 1000
    const z = footprint.centerZMilli / 1000
    const halfX = footprint.sizeXMilli / 2000
    const halfZ = footprint.sizeZMilli / 2000
    const top = [
      this.project(x - halfX, z - halfZ, centerY, scale),
      this.project(x + halfX, z - halfZ, centerY, scale),
      this.project(x + halfX, z + halfZ, centerY, scale),
      this.project(x - halfX, z + halfZ, centerY, scale),
    ]
    const bottom = top.map((point) => ({ x: point.x, y: point.y + height }))
    this.polygon([top[3]!, top[2]!, bottom[2]!, bottom[3]!], shade(color, -24))
    this.polygon([top[1]!, top[2]!, bottom[2]!, bottom[1]!], shade(color, -42))
    this.polygon(top, color)
  }

  private project(x: number, z: number, centerY: number, scale: number): ProjectedPoint {
    return {
      x: this.width / 2 + (x - z) * scale * 0.68,
      y: centerY + (x + z) * scale * 0.28,
    }
  }

  private polygon(points: ProjectedPoint[], fill: string): void {
    const first = points[0]
    if (!first) return
    this.context.beginPath()
    this.context.moveTo(first.x, first.y)
    for (const point of points.slice(1)) this.context.lineTo(point.x, point.y)
    this.context.closePath()
    this.context.fillStyle = fill
    this.context.fill()
  }
}

function shade(hex: string, delta: number): string {
  const raw = Number.parseInt(hex.slice(1), 16)
  const red = Math.max(0, Math.min(255, (raw >> 16) + delta))
  const green = Math.max(0, Math.min(255, ((raw >> 8) & 0xff) + delta))
  const blue = Math.max(0, Math.min(255, (raw & 0xff) + delta))
  return `rgb(${red} ${green} ${blue})`
}
