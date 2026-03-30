import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

export type SceneTextNode = {
  id: string
  text: string
  font?: string
  color?: string
  x?: number
  y?: number
  maxWidth?: number
  lineHeight?: number
  align?: 'left' | 'center' | 'right'
  opacity?: number
}

export type SceneObstacle = {
  id: string
  x: number
  y: number
  width: number
  height: number
  radius?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  imageSrc?: string
}

export type SceneMotion = {
  kind: 'float' | 'orbit' | 'pulse' | 'drift'
  amplitude?: number
  speed?: number
  phase?: number
  originX?: number
  originY?: number
  radius?: number
}

export type SceneNode = {
  id: string
  kind: 'text' | 'obstacle'
  text?: SceneTextNode
  obstacle?: SceneObstacle
  motion?: SceneMotion
}

export type SceneDefinition = {
  width: number
  height: number
  background?: { top: string; bottom: string }
  nodes: SceneNode[]
}

export type LaidOutTextLine = {
  text: string
  x: number
  y: number
  width: number
}

export function measureSceneText(node: SceneTextNode): LaidOutTextLine[] {
  const font = node.font || '16px Inter'
  const maxWidth = node.maxWidth || 300
  const lineHeight = node.lineHeight || 24
  const prepared = prepareWithSegments(node.text, font)
  const { lines } = layoutWithLines(prepared, maxWidth, lineHeight)
  const baseX = node.x || 0
  const baseY = node.y || 0
  const align = node.align || 'left'

  return lines.map((line) => ({
    text: line.text,
    width: line.width,
    x: align === 'center' ? baseX - line.width / 2 : align === 'right' ? baseX - line.width : baseX,
    y: baseY + line.y,
  }))
}

export function resolveMotion(node: SceneNode, time: number): { dx: number; dy: number; scale: number; opacity: number } {
  const motion = node.motion
  if (!motion) return { dx: 0, dy: 0, scale: 1, opacity: 1 }

  const speed = motion.speed ?? 1
  const phase = motion.phase ?? 0
  const amp = motion.amplitude ?? 8
  const t = time * speed + phase

  switch (motion.kind) {
    case 'float':
      return { dx: 0, dy: Math.sin(t) * amp, scale: 1, opacity: 1 }
    case 'drift':
      return { dx: Math.sin(t * 0.7) * amp, dy: Math.cos(t) * amp * 0.5, scale: 1, opacity: 1 }
    case 'pulse':
      return { dx: 0, dy: 0, scale: 1 + Math.sin(t) * 0.04, opacity: 0.82 + Math.sin(t) * 0.18 }
    case 'orbit': {
      const radius = motion.radius ?? 30
      return { dx: Math.cos(t) * radius, dy: Math.sin(t) * radius, scale: 1, opacity: 1 }
    }
    default:
      return { dx: 0, dy: 0, scale: 1, opacity: 1 }
  }
}

export function sceneTemplates() {
  return {
    weather: {
      width: 500,
      height: 900,
      background: { top: '#1a0a2e', bottom: '#0a0a0f' },
      nodes: [
        { id: 'title', kind: 'text', text: { id: 'title', text: 'Huber Heights, Ohio', font: '24px Inter', x: 250, y: 70, color: '#a78bfa', align: 'center' } },
        { id: 'temp', kind: 'text', text: { id: 'temp', text: '62°', font: 'bold 120px Inter', x: 250, y: 220, color: '#ffffff', align: 'center' }, motion: { kind: 'pulse', speed: 1.8 } },
        { id: 'desc', kind: 'text', text: { id: 'desc', text: 'Overcast', font: 'bold 48px Inter', x: 250, y: 365, color: '#e5e5e5', align: 'center' } },
      ],
    } as SceneDefinition,
    crypto: {
      width: 500,
      height: 900,
      background: { top: '#0a1428', bottom: '#0a0a0f' },
      nodes: [
        { id: 'symbol', kind: 'text', text: { id: 'symbol', text: '₿', font: 'bold 48px Inter', x: 250, y: 60, color: '#f7931a', align: 'center' }, motion: { kind: 'pulse', speed: 2.2 } },
        { id: 'name', kind: 'text', text: { id: 'name', text: 'Bitcoin', font: 'bold 28px Inter', x: 250, y: 100, color: '#ffffff', align: 'center' } },
        { id: 'price', kind: 'text', text: { id: 'price', text: '$67,842', font: 'bold 64px Inter', x: 250, y: 200, color: '#22c55e', align: 'center' } },
      ],
    } as SceneDefinition,
    orbit: {
      width: 500,
      height: 500,
      background: { top: '#0a0a14', bottom: '#05050a' },
      nodes: [
        { id: 'core', kind: 'text', text: { id: 'core', text: 'PRETEXT', font: 'bold 42px Inter', x: 250, y: 250, color: '#ffffff', align: 'center' } },
        { id: 'ring1', kind: 'text', text: { id: 'ring1', text: 'MEASURE', font: '14px Inter', x: 250, y: 250, color: '#a78bfa', align: 'center' }, motion: { kind: 'orbit', speed: 1.1, radius: 90 } },
        { id: 'ring2', kind: 'text', text: { id: 'ring2', text: 'LAYOUT', font: '14px Inter', x: 250, y: 250, color: '#f472b6', align: 'center' }, motion: { kind: 'orbit', speed: -0.8, radius: 120, phase: 1.2 } },
        { id: 'ring3', kind: 'text', text: { id: 'ring3', text: 'CANVAS', font: '14px Inter', x: 250, y: 250, color: '#22c55e', align: 'center' }, motion: { kind: 'orbit', speed: 1.4, radius: 150, phase: 2.4 } },
      ],
    } as SceneDefinition,
  }
}
