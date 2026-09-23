import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  PointLight,
  Scene,
  Timer,
  WebGLRenderer,
} from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

import type { StackClientState, StackFootprint } from '@/app/stackEngine'
import { easeInOutCubic, movingStackColor, placedStackColor } from '@/app/stackPresentation'
import type { StackRules } from '@/app/types'

export interface StackSceneFrame {
  rules: StackRules
  state: StackClientState
  movingPositionMilli: number
  running: boolean
  reducedMotion: boolean
}

export interface StackScene {
  resize(width: number, height: number, pixelRatio: number): void
  start(callback: (timestamp: number, deltaSeconds: number) => void): void
  stop(): void
  render(frame: StackSceneFrame, deltaSeconds: number): void
  dispose(releaseContext?: boolean): void
}

interface FallingFragment {
  mesh: Mesh<BoxGeometry, MeshStandardMaterial>
  velocityY: number
  spinX: number
  spinZ: number
  age: number
}

const UNIT = 1000
const BLOCK_HEIGHT = 0.52
const CAMERA_OFFSET = 7.2
const CAMERA_LIFT_DURATION_SECONDS = 0.62

export class StackScene3D implements StackScene {
  private readonly scene = new Scene()
  private readonly camera = new OrthographicCamera(-4, 4, 5, -5, 0.1, 80)
  private readonly renderer: WebGLRenderer
  private readonly timer = new Timer()
  private readonly tower = new Group()
  private readonly effects = new Group()
  private readonly boxGeometry = new BoxGeometry(1, 1, 1)
  private readonly groundGeometry = new PlaneGeometry(80, 80)
  private readonly palette = [
    new MeshStandardMaterial({ color: 0x0062c4, roughness: 0.58, metalness: 0.04 }),
    new MeshStandardMaterial({ color: 0x1478c9, roughness: 0.56, metalness: 0.04 }),
    new MeshStandardMaterial({ color: 0xe9e9e9, roughness: 0.62, metalness: 0.02 }),
    new MeshStandardMaterial({ color: 0x4d4d4d, roughness: 0.64, metalness: 0.02 }),
  ]
  private readonly activeMaterial = new MeshStandardMaterial({
    color: 0x1688dd,
    emissive: 0x04223a,
    emissiveIntensity: 0.15,
    roughness: 0.42,
  })
  private readonly groundMaterial = new MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.96,
    metalness: 0,
  })
  private readonly foundation: Mesh<BoxGeometry, MeshStandardMaterial>
  private readonly moving: Mesh<BoxGeometry, MeshStandardMaterial>
  private readonly perfectLight = new PointLight(0xbfe5ff, 0, 7, 1.8)
  private readonly placed: Array<Mesh<BoxGeometry, MeshStandardMaterial>> = []
  private readonly fragments: FallingFragment[] = []
  private processedBlocks = 0
  private firstFrame = true
  private perfectStreak = 0
  private perfectPulseAge = 10
  private cameraTarget = { x: 0, y: 1.3, z: 0 }
  private cameraLiftFromY = 1.3
  private cameraLiftToY = 1.3
  private cameraLiftElapsed = CAMERA_LIFT_DURATION_SECONDS
  private cameraLevel = 0
  private disposed = false

  static isSupported(): boolean {
    return typeof document !== 'undefined' && WebGL.isWebGL2Available()
  }

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    })
    this.renderer.setClearColor(new Color(0x050505), 1)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFShadowMap

    this.scene.background = new Color(0x050505)
    this.scene.fog = new Fog(0x050505, 15, 35)
    this.scene.add(this.tower, this.effects)

    const skyLight = new HemisphereLight(0xf7fbff, 0x10141a, 2.05)
    const keyLight = new DirectionalLight(0xffffff, 2.6)
    keyLight.position.set(-7, 11, 8)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(512, 512)
    keyLight.shadow.camera.left = -8
    keyLight.shadow.camera.right = 8
    keyLight.shadow.camera.top = 12
    keyLight.shadow.camera.bottom = -4
    keyLight.shadow.camera.near = 1
    keyLight.shadow.camera.far = 30
    keyLight.shadow.bias = -0.0004
    this.scene.add(skyLight, keyLight, this.perfectLight)

    const ground = new Mesh(this.groundGeometry, this.groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -BLOCK_HEIGHT / 2 - 0.02
    ground.receiveShadow = true
    this.scene.add(ground)

    this.foundation = this.createMesh(
      { centerXMilli: 0, centerZMilli: 0, sizeXMilli: 3000, sizeZMilli: 3000 },
      0,
      this.palette[0]!,
    )
    this.moving = this.createMesh(
      { centerXMilli: 0, centerZMilli: 0, sizeXMilli: 3000, sizeZMilli: 3000 },
      BLOCK_HEIGHT,
      this.activeMaterial,
    )
    this.moving.visible = false
    this.tower.add(this.foundation, this.moving)

    this.camera.position.set(CAMERA_OFFSET, CAMERA_OFFSET + 1, CAMERA_OFFSET)
    this.camera.lookAt(0, 1, 0)
    this.timer.connect(document)
  }

  resize(width: number, height: number, pixelRatio: number): void {
    if (this.disposed) return
    const safeHeight = Math.max(height, 1)
    const aspect = Math.max(width, 1) / safeHeight
    const minimumHorizontalHalf = 2.45
    const verticalHalf = Math.max(aspect < 0.72 ? 5.2 : 4.4, minimumHorizontalHalf / aspect)
    this.camera.left = -verticalHalf * aspect
    this.camera.right = verticalHalf * aspect
    this.camera.top = verticalHalf
    this.camera.bottom = -verticalHalf
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(Math.max(width, 1), safeHeight, false)
  }

  start(callback: (timestamp: number, deltaSeconds: number) => void): void {
    if (this.disposed) return
    this.renderer.setAnimationLoop((timestamp) => {
      this.timer.update(timestamp)
      callback(timestamp, Math.min(this.timer.getDelta(), 0.05))
    })
  }

  stop(): void {
    if (!this.disposed) this.renderer.setAnimationLoop(null)
  }

  render(frame: StackSceneFrame, deltaSeconds: number): void {
    if (this.disposed) return
    this.syncFoundation(frame.rules)
    this.syncPlacedBlocks(frame, !this.firstFrame)
    this.firstFrame = false
    this.syncMovingBlock(frame)
    this.animateFragments(deltaSeconds, frame.reducedMotion)
    this.animatePerfectEffect(frame, deltaSeconds)
    this.followTower(frame, deltaSeconds)
    this.renderer.render(this.scene, this.camera)
  }

  dispose(releaseContext = true): void {
    if (this.disposed) return
    this.stop()
    this.disposed = true
    this.timer.dispose()
    this.boxGeometry.dispose()
    this.groundGeometry.dispose()
    for (const material of [...this.palette, this.activeMaterial, this.groundMaterial]) {
      material.dispose()
    }
    this.scene.clear()
    this.renderer.renderLists.dispose()
    this.renderer.dispose()
    if (releaseContext) this.renderer.forceContextLoss()
  }

  private syncFoundation(rules: StackRules): void {
    const size = rules.baseSizeMilli / UNIT
    this.foundation.scale.set(size, BLOCK_HEIGHT, size)
  }

  private syncPlacedBlocks(frame: StackSceneFrame, animateNewFragments: boolean): void {
    if (frame.state.blocks.length < this.processedBlocks) this.clearRunMeshes()
    for (let index = this.processedBlocks; index < frame.state.blocks.length; index += 1) {
      const block = frame.state.blocks[index]
      if (!block) continue
      const level = this.placed.length + 1
      const material = this.palette[level % this.palette.length]!
      material.color.setHex(placedStackColor(level))
      if (block.placed) {
        const mesh = this.createMesh(block.placed, level * BLOCK_HEIGHT, material)
        this.placed.push(mesh)
        this.tower.add(mesh)
      }
      if (block.isPerfect && !block.isMiss) {
        this.perfectStreak += 1
        this.perfectPulseAge = 0
      } else {
        this.perfectStreak = 0
      }
      if (block.overhang && animateNewFragments) {
        const fragment = this.createMesh(block.overhang, level * BLOCK_HEIGHT, material)
        this.effects.add(fragment)
        const sign = block.centerMilli >= frame.state.centres[block.axis] ? 1 : -1
        this.fragments.push({
          mesh: fragment,
          velocityY: block.isMiss ? 0.2 : 0.6,
          spinX: block.axis === 'Z' ? 1.8 * sign : 0.55,
          spinZ: block.axis === 'X' ? -1.8 * sign : -0.55,
          age: 0,
        })
      }
    }
    this.processedBlocks = frame.state.blocks.length
  }

  private syncMovingBlock(frame: StackSceneFrame): void {
    this.moving.visible = frame.running
    if (!frame.running) return
    const nextAxis = (frame.state.events.length + 1) % 2 ? 'X' : 'Z'
    const footprint: StackFootprint = {
      centerXMilli: nextAxis === 'X' ? frame.movingPositionMilli : frame.state.centres.X,
      centerZMilli: nextAxis === 'Z' ? frame.movingPositionMilli : frame.state.centres.Z,
      sizeXMilli: frame.state.sizes.X,
      sizeZMilli: frame.state.sizes.Z,
    }
    const color = movingStackColor(this.placed.length)
    this.activeMaterial.color.setHex(color)
    this.activeMaterial.emissive.setHex(color)
    this.applyFootprint(this.moving, footprint, (this.placed.length + 1) * BLOCK_HEIGHT)
  }

  private animateFragments(deltaSeconds: number, reducedMotion: boolean): void {
    for (let index = this.fragments.length - 1; index >= 0; index -= 1) {
      const fragment = this.fragments[index]
      if (!fragment) continue
      fragment.age += deltaSeconds
      if (reducedMotion) fragment.age = 2
      else {
        fragment.velocityY -= 8.8 * deltaSeconds
        fragment.mesh.position.y += fragment.velocityY * deltaSeconds
        fragment.mesh.rotation.x += fragment.spinX * deltaSeconds
        fragment.mesh.rotation.z += fragment.spinZ * deltaSeconds
      }
      if (fragment.age > 1.45 || fragment.mesh.position.y < -4) {
        this.effects.remove(fragment.mesh)
        this.fragments.splice(index, 1)
      }
    }
  }

  private followTower(frame: StackSceneFrame, deltaSeconds: number): void {
    const desired = {
      x: frame.state.centres.X / UNIT,
      y: Math.max(1.25, (this.placed.length + 1) * BLOCK_HEIGHT - 1.25),
      z: frame.state.centres.Z / UNIT,
    }
    if (this.cameraLevel !== this.placed.length) {
      this.cameraLevel = this.placed.length
      this.cameraLiftFromY = this.cameraTarget.y
      this.cameraLiftToY = desired.y
      this.cameraLiftElapsed = 0
    }
    if (frame.reducedMotion || deltaSeconds <= 0) {
      this.cameraLiftElapsed = CAMERA_LIFT_DURATION_SECONDS
      this.cameraTarget.y = desired.y
    } else {
      this.cameraLiftElapsed = Math.min(
        this.cameraLiftElapsed + deltaSeconds,
        CAMERA_LIFT_DURATION_SECONDS,
      )
      const progress = this.cameraLiftElapsed / CAMERA_LIFT_DURATION_SECONDS
      const eased = easeInOutCubic(progress)
      this.cameraTarget.y = this.cameraLiftFromY
        + (this.cameraLiftToY - this.cameraLiftFromY) * eased
    }
    const amount = frame.reducedMotion || deltaSeconds <= 0
      ? 1
      : 1 - Math.exp(-3.2 * deltaSeconds)
    this.cameraTarget.x += (desired.x - this.cameraTarget.x) * amount
    this.cameraTarget.z += (desired.z - this.cameraTarget.z) * amount
    this.camera.position.set(
      this.cameraTarget.x + CAMERA_OFFSET,
      this.cameraTarget.y + CAMERA_OFFSET * 0.9,
      this.cameraTarget.z + CAMERA_OFFSET,
    )
    this.camera.lookAt(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z)
  }

  private animatePerfectEffect(frame: StackSceneFrame, deltaSeconds: number): void {
    this.perfectPulseAge += deltaSeconds
    const duration = frame.reducedMotion ? 0 : 0.72
    const progress = duration > 0 ? Math.min(this.perfectPulseAge / duration, 1) : 1
    const pulse = progress < 1 ? Math.sin(progress * Math.PI) : 0
    const strength = Math.min(this.perfectStreak, 5)
    this.perfectLight.intensity = pulse * (2.4 + strength * 0.8)
    this.perfectLight.position.set(
      frame.state.centres.X / UNIT,
      (this.placed.length + 1) * BLOCK_HEIGHT + 1.2,
      frame.state.centres.Z / UNIT,
    )
    this.activeMaterial.emissiveIntensity = 0.15 + pulse * (0.25 + strength * 0.08)
  }

  private createMesh(
    footprint: StackFootprint,
    y: number,
    material: MeshStandardMaterial,
  ): Mesh<BoxGeometry, MeshStandardMaterial> {
    const mesh = new Mesh(this.boxGeometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.applyFootprint(mesh, footprint, y)
    return mesh
  }

  private applyFootprint(
    mesh: Mesh<BoxGeometry, MeshStandardMaterial>,
    footprint: StackFootprint,
    y: number,
  ): void {
    mesh.position.set(footprint.centerXMilli / UNIT, y, footprint.centerZMilli / UNIT)
    mesh.scale.set(
      Math.max(footprint.sizeXMilli / UNIT, 0.001),
      BLOCK_HEIGHT,
      Math.max(footprint.sizeZMilli / UNIT, 0.001),
    )
  }

  private clearRunMeshes(): void {
    for (const mesh of this.placed) this.tower.remove(mesh)
    for (const fragment of this.fragments) this.effects.remove(fragment.mesh)
    this.placed.length = 0
    this.fragments.length = 0
    this.processedBlocks = 0
    this.perfectStreak = 0
    this.perfectPulseAge = 10
    this.perfectLight.intensity = 0
    this.cameraTarget = { x: 0, y: 1.3, z: 0 }
    this.cameraLiftFromY = 1.3
    this.cameraLiftToY = 1.3
    this.cameraLiftElapsed = CAMERA_LIFT_DURATION_SECONDS
    this.cameraLevel = 0
  }
}
