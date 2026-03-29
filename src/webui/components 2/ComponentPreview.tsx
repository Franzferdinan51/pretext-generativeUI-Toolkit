import React, { useState, useMemo } from 'react'

// Import all components from the toolkit
import { SmartMessage } from '../../components/SmartMessage'
import { VoteCard } from '../../components/VoteCard'
import { CodeBlock } from '../../components/CodeBlock'
import { ListCard } from '../../components/ListCard'
import { DataTable } from '../../components/DataTable'
import { DataChart } from '../../components/DataChart'
import { SummaryCard } from '../../components/SummaryCard'
import { QuestionBubble } from '../../components/QuestionBubble'
import { StreamingCard } from '../../components/StreamingCard'

import { StreamableText, StreamingCursor } from '../../streaming/StreamableText'
import { LoadingDots, LoadingSpinner, LoadingBars, LoadingPulse, LoadingOrb } from '../../streaming/LoadingStates'

import { ParticleEmitter } from '../../effects/ParticleEmitter'
import { AnimatedGrid } from '../../magicui/AnimatedGrid'
import { OrbitingShapes } from '../../magicui/OrbitingShapes'
import { TextGradient } from '../../magicui/TextGradient'
import { GlowBorder } from '../../effects/GlowBorder'
import { GradientMesh } from '../../effects/GradientMesh'
import { Shimmer } from '../../effects/Shimmer'
import { FadeIn } from '../../magicui/FadeIn'
import { WordRotate } from '../../magicui/WordRotate'
import { BentoGrid } from '../../magicui/BentoGrid'

import { PretextCanvas } from '../../pretext/PretextCanvas'

import { Button } from '../../shadcn/Button'
import { Badge } from '../../shadcn/Badge'
import { Card } from '../../shadcn/Card'
import { Input } from '../../shadcn/Input'

import { LiveWebsiteGenerator } from '../../website/LiveWebsiteGenerator'

// Component registry
const componentRegistry: Record<string, { component: React.ComponentType<any>; defaultProps: any; code: string }> = {
  SmartMessage: {
    component: SmartMessage,
    defaultProps: { content: 'This is a smart message with automatic content type detection!' },
    code: `<SmartMessage content="This is a smart message..." />`
  },
  VoteCard: {
    component: VoteCard,
    defaultProps: { content: 'Should we implement this feature?' },
    code: `<VoteCard content="Should we implement this feature?" />`
  },
  CodeBlock: {
    component: CodeBlock,
    defaultProps: { content: 'const hello = "world";\nconsole.log(hello);', language: 'javascript' },
    code: `<CodeBlock content="const hello = 'world';" language="javascript" />`
  },
  ListCard: {
    component: ListCard,
    defaultProps: { content: '- First item\n- Second item\n- Third item' },
    code: `<ListCard content="- First item\\n- Second item" />`
  },
  DataTable: {
    component: DataTable,
    defaultProps: { content: 'Name | Value\nItem 1 | 100\nItem 2 | 200' },
    code: `<DataTable content="Name | Value\\nItem 1 | 100" />`
  },
  DataChart: {
    component: DataChart,
    defaultProps: { content: '[10, 20, 30, 40, 50]', chartType: 'bar' },
    code: `<DataChart content="[10, 20, 30]" chartType="bar" />`
  },
  SummaryCard: {
    component: SummaryCard,
    defaultProps: { content: 'This is a summary of the key points discussed.' },
    code: `<SummaryCard content="This is a summary..." />`
  },
  QuestionBubble: {
    component: QuestionBubble,
    defaultProps: { content: 'What is the meaning of life?' },
    code: `<QuestionBubble content="What is the meaning of life?" />`
  },
  StreamingCard: {
    component: StreamingCard,
    defaultProps: { content: 'Streaming content here...' },
    code: `<StreamingCard content="Streaming content..." />`
  },
  StreamableText: {
    component: StreamableText,
    defaultProps: { content: 'This text streams character by character!', speed: 30 },
    code: `<StreamableText content="This text streams..." speed={30} />`
  },
  StreamingCursor: {
    component: StreamingCursor,
    defaultProps: { char: '▋', blinkSpeed: 500 },
    code: `<StreamingCursor char="▋" blinkSpeed={500} />`
  },
  LoadingDots: {
    component: LoadingDots,
    defaultProps: { count: 3, size: 12, color: '#8b5cf6' },
    code: `<LoadingDots count={3} color="#8b5cf6" />`
  },
  LoadingSpinner: {
    component: LoadingSpinner,
    defaultProps: { size: 40, color: '#8b5cf6' },
    code: `<LoadingSpinner size={40} color="#8b5cf6" />`
  },
  LoadingBars: {
    component: LoadingBars,
    defaultProps: { count: 5, height: 20, color: '#06b6d4' },
    code: `<LoadingBars count={5} color="#06b6d4" />`
  },
  LoadingPulse: {
    component: LoadingPulse,
    defaultProps: { width: 100, height: 20, color: '#ec4899' },
    code: `<LoadingPulse width={100} color="#ec4899" />`
  },
  LoadingOrb: {
    component: LoadingOrb,
    defaultProps: { size: 50, color: '#8b5cf6' },
    code: `<LoadingOrb size={50} color="#8b5cf6" />`
  },
  ParticleEmitter: {
    component: ParticleEmitter,
    defaultProps: { count: 50, colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'], width: 300, height: 200 },
    code: `<ParticleEmitter count={50} colors={['#8b5cf6', '#a78bfa']} />`
  },
  AnimatedGrid: {
    component: AnimatedGrid,
    defaultProps: {},
    code: `<AnimatedGrid />`
  },
  OrbitingShapes: {
    component: OrbitingShapes,
    defaultProps: {},
    code: `<OrbitingShapes />`
  },
  TextGradient: {
    component: ({ children, ...props }: any) => <TextGradient {...props}>{children || 'Gradient Text'}</TextGradient>,
    defaultProps: { children: 'Gradient Text' },
    code: `<TextGradient>Gradient Text</TextGradient>`
  },
  GlowBorder: {
    component: GlowBorder,
    defaultProps: { children: 'Glowing Content' },
    code: `<GlowBorder>Glowing Content</GlowBorder>`
  },
  GradientMesh: {
    component: GradientMesh,
    defaultProps: {},
    code: `<GradientMesh />`
  },
  Shimmer: {
    component: Shimmer,
    defaultProps: { children: 'Shimmer Effect' },
    code: `<Shimmer>Shimmer Effect</Shimmer>`
  },
  FadeIn: {
    component: FadeIn,
    defaultProps: { children: 'Fade In Text' },
    code: `<FadeIn>Fade In Text</FadeIn>`
  },
  WordRotate: {
    component: WordRotate,
    defaultProps: { words: ['Hello', 'World', 'React'] },
    code: `<WordRotate words={['Hello', 'World', 'React']} />`
  },
  BentoGrid: {
    component: BentoGrid,
    defaultProps: {},
    code: `<BentoGrid />`
  },
  PretextCanvas: {
    component: PretextCanvas,
    defaultProps: { text: 'Canvas rendered text', maxWidth: 300 },
    code: `<PretextCanvas text="Canvas text" maxWidth={300} />`
  },
  Button: {
    component: Button,
    defaultProps: { children: 'Click Me', variant: 'default' },
    code: `<Button>Click Me</Button>`
  },
  Badge: {
    component: Badge,
    defaultProps: { children: 'Badge' },
    code: `<Badge>Badge</Badge>`
  },
  Card: {
    component: Card,
    defaultProps: { children: 'Card Content' },
    code: `<Card>Card Content</Card>`
  },
  Input: {
    component: Input,
    defaultProps: { placeholder: 'Enter text...' },
    code: `<Input placeholder="Enter text..." />`
  },
  // AI components
  ContentDetector: {
    component: ({ content }: any) => <div className="text-sm text-gray-400">Content: {content}</div>,
    defaultProps: { content: 'Sample content' },
    code: `<ContentDetector content="Sample" />`
  },
  AIGenerator: {
    component: () => <div className="p-4 bg-purple-500/20 rounded-lg text-purple-400">AI Generator Component</div>,
    defaultProps: {},
    code: `<AIGenerator />`
  },
  ModeSelector: {
    component: () => <div className="p-4 bg-cyan-500/20 rounded-lg text-cyan-400">Mode Selector</div>,
    defaultProps: {},
    code: `<ModeSelector />`
  },
  CouncilorSelector: {
    component: () => <div className="p-4 bg-pink-500/20 rounded-lg text-pink-400">Councilor Selector</div>,
    defaultProps: {},
    code: `<CouncilorSelector />`
  },
  LayoutOptimizer: {
    component: () => <div className="p-4 bg-green-500/20 rounded-lg text-green-400">Layout Optimizer</div>,
    defaultProps: {},
    code: `<LayoutOptimizer />`
  },
  // Core hooks
  useTextMeasurement: {
    component: () => <PretextCanvas text="Hook Demo" maxWidth={200} />,
    defaultProps: {},
    code: `// This is a hook, not a component\nconst measurement = useTextMeasurement(text, font, width);`
  },
  useStreamingText: {
    component: () => <StreamableText content="Hook Demo Text" speed={50} />,
    defaultProps: {},
    code: `// This is a hook, not a component\nconst { displayedText, isStreaming } = useStreamingText(text);`
  },
  // Website Generator
  LiveWebsiteGenerator: {
    component: LiveWebsiteGenerator,
    defaultProps: {},
    code: `<LiveWebsiteGenerator />`
  },
  // Pretext components
  PretextLayout: {
    component: () => <PretextCanvas text="Layout Component" maxWidth={250} />,
    defaultProps: {},
    code: `<PretextLayout text="Layout text" />`
  },
  PretextStream: {
    component: () => <StreamableText content="Pretext Stream Demo" speed={25} />,
    defaultProps: {},
    code: `<PretextStream text="Stream text" />`
  },
}

interface ComponentPreviewProps {
  type: string
  props?: any
}

export default function ComponentPreview({ type, props = {} }: ComponentPreviewProps) {
  const [customProps, setCustomProps] = useState(props)
  const [showCode, setShowCode] = useState(true)
  
  const registryEntry = componentRegistry[type]
  
  if (!registryEntry) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-4">❓</div>
        <p>Component "{type}" not found</p>
      </div>
    )
  }
  
  const { component: Component, code } = registryEntry
  
  // Generate code with current props
  const generatedCode = useMemo(() => {
    const propStrings = Object.entries(customProps)
      .filter(([key]) => !['children'].includes(key))
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`
        if (Array.isArray(value)) return `${key}={${JSON.stringify(value)}}`
        if (typeof value === 'object') return `${key}={${JSON.stringify(value)}}`
        return `${key}={${value}}`
      })
    
    if (propStrings.length > 0) {
      return `<${type} ${propStrings.join(' ')} />`
    }
    return `<${type} />`
  }, [type, customProps])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-purple-400 text-lg">{type}</h4>
          <p className="text-sm text-gray-400">Live preview with interactive props</p>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="btn btn-ghost text-xs"
        >
          {showCode ? '📦 Hide Code' : '📝 Show Code'}
        </button>
      </div>
      
      {/* Render the actual component */}
      <div className="bg-black/50 rounded-lg p-6 min-h-[150px] flex items-center justify-center">
        <Component {...customProps} />
      </div>
      
      {/* Props Editor */}
      {Object.keys(customProps).length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-400 mb-3">Props Editor</h5>
          <div className="space-y-2">
            {Object.entries(customProps).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-xs text-gray-500 w-24">{key}:</label>
                {typeof value === 'string' ? (
                  <input
                    type="text"
                    value={value}
                    onChange={e => setCustomProps(prev => ({ ...prev, [key]: e.target.value }))}
                    className="input text-sm flex-1"
                  />
                ) : typeof value === 'number' ? (
                  <input
                    type="number"
                    value={value}
                    onChange={e => setCustomProps(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                    className="input text-sm w-24"
                  />
                ) : Array.isArray(value) ? (
                  <input
                    type="text"
                    value={JSON.stringify(value)}
                    onChange={e => {
                      try {
                        setCustomProps(prev => ({ ...prev, [key]: JSON.parse(e.target.value) }))
                      } catch {}
                    }}
                    className="input text-sm flex-1"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Code display */}
      {showCode && (
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/10">
            <span className="text-xs text-gray-400">TypeScript / React</span>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="btn btn-ghost text-xs"
            >
              📋 Copy
            </button>
          </div>
          <pre className="p-4 text-sm overflow-x-auto text-gray-300">
            {generatedCode}
          </pre>
        </div>
      )}
      
      {/* Component info */}
      <div className="text-xs text-gray-500">
        <p>Import from: <code className="bg-gray-800 px-1 rounded">@pretext-toolkit/components</code></p>
        <p className="mt-1">Category: <span className="badge badge-purple">{type.match(/^[A-Z]/) ? 'UI' : 'Effects'}</span></p>
      </div>
    </div>
  )
}
