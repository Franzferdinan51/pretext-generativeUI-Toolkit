# Generative UI Skill for OpenClaw

Use this skill when building AI-powered UIs with real-time streaming and auto-healing capabilities.

## Overview

This toolkit provides **AI-controlled generative UI** where the AI is the runtime engine. It generates, controls, and updates the entire UI in real-time with **automatic error recovery**.

## Key Features

- 🔧 **Auto-Healing**: AI automatically detects and fixes errors in real-time
- 🎨 **Generative UI**: AI generates beautiful UI components from prompts
- 📦 **Component Library**: Pre-built components (buttons, cards, text, inputs)
- ⚡ **Streaming**: Real-time UI updates as AI generates
- 🖼️ **Canvas Rendering**: Character-level positioning with Pretext
- 🤖 **Agent-Friendly**: Clean API designed for AI agents

## Quick Start

```typescript
import { useAutoHealingUI, UIErrorBoundary } from './ai/AutoHealingUI'

// Initialize with your LM Studio config
const ui = useAutoHealingUI({
  lmStudioUrl: 'http://100.116.54.125:1234',
  lmStudioKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
  model: 'qwen3.5-27b',
  autoHeal: true,
  maxRetries: 3,
  onError: (error) => console.log('Error:', error),
  onHeal: (fix) => console.log('Fixed:', fix),
  onThinking: (thinking) => console.log('AI:', thinking),
  onComponentUpdate: (components) => console.log('Updated:', components)
})

// Generate UI from a prompt
await ui.generateUI('Create a dashboard with header, stats cards, and a chart')

// Access state
const { components, errors, aiThinking, isHealing, isGenerating } = ui
```

## API Reference

### `useAutoHealingUI(config)`

Main hook for auto-healing generative UI.

#### Configuration

```typescript
interface AutoHealingConfig {
  lmStudioUrl: string      // LM Studio server URL (e.g., 'http://100.116.54.125:1234')
  lmStudioKey: string      // API key for authentication
  model: string           // Model to use (e.g., 'qwen3.5-27b')
  autoHeal: boolean      // Enable auto-healing (default: true)
  maxRetries: number     // Max healing attempts per error (default: 3)
  onError?: (error: ErrorReport) => void   // Error callback
  onHeal?: (fix: string) => void          // Success callback
  onThinking?: (thinking: string) => void // AI thinking callback
  onComponentUpdate?: (components: UIComponent[]) => void // Component update callback
}
```

#### Return Value

```typescript
interface UseAutoHealingUIReturn {
  components: UIComponent[]     // Current UI components
  setComponents: SetStateAction<UIComponent[]>] // Set components directly
  errors: ErrorReport[]           // All reported errors
  aiThinking: string            // Current AI thinking/output
  isHealing: boolean            // True when AI is healing an error
  isGenerating: boolean         // True when AI is generating UI
  generateUI: (prompt: string) => Promise<void>  // Generate UI from prompt
  reportError: (error: ErrorReport) => void      // Manually report an error
  healError: (error: ErrorReport) => void       // Manually trigger healing
  clearComponents: () => void    // Clear all components
  removeComponent: (id: string) => void  // Remove component by ID
  updateComponent: (id: string, changes: Partial<UIComponent>) => void  // Update component
  forceHeal: () => void          // Force heal the last error
}
```

### `UIComponent` Interface

```typescript
interface UIComponent {
  id: string                    // Unique identifier
  type: 'text' | 'button' | 'card' | 'input' | 'header' | 'container' | 'image'
  content: string              // Display content
  x: number                    // X position (pixels from left)
  y: number                    // Y position (pixels from top)
  width: number               // Component width
  height: number              // Component height
  style: Record<string, string>  // CSS-style properties
  onClick?: string            // Click handler ID
  visible: boolean            // Visibility flag
  error?: string             // Error message if any
}
```

### `ErrorReport` Interface

```typescript
interface ErrorReport {
  type: 'react' | 'canvas' | 'network' | 'parse'
  message: string
  stack?: string
  componentId?: string
  timestamp: number
}
```

## Agent Commands

Agents can control the UI with these commands:

| Command | Description |
|---------|-------------|
| `generate <prompt>` | AI generates UI from natural language prompt |
| `heal` | Force auto-heal any existing errors |
| `clear` | Clear all components |
| `add <component>` | Add a new component |
| `remove <id>` | Remove component by ID |
| `update <id> <changes>` | Update component properties |
| `error` | Manually report an error for healing |

## Example Agent Workflow

```typescript
// 1. Agent receives user request
const request = "Build a landing page with hero section, features, and CTA"

// 2. Agent generates UI
await ui.generateUI(request)

// 3. Agent monitors for errors
ui.errors.forEach(error => {
  console.log(`Error detected: ${error.type} - ${error.message}`)
  // Error detected → auto-heal triggers automatically
})

// 4. Agent continues with fixed UI
const landingPage = ui.components

// 5. Agent can manually update components
ui.updateComponent('header-1', { content: 'New Title' })
ui.updateComponent('cta-button', { style: { background: '#ff0000' } })

// 6. Agent can add new components
ui.setComponents(prev => [...prev, {
  id: 'new-component',
  type: 'card',
  content: 'Additional Info',
  x: 100, y: 400,
  width: 200, height: 100,
  style: { background: '#2d2d5f' },
  visible: true
}])
```

## Error Types

| Type | Description | Auto-heal |
|------|-------------|-----------|
| `react` | React render error | Yes |
| `canvas` | Canvas draw error | Yes |
| `network` | Network/API error | Yes |
| `parse` | JSON parse error | Yes |

## Streaming Behavior

The UI streams in real-time:

1. **AI generates JSON** - Components generated token by token
2. **Components appear as JSON streams** - Partial JSON is parsed progressively
3. **Canvas renders immediately** - UI updates as components are parsed
4. **Errors detected → AI heals → Re-renders** - Automatic recovery

All without page refresh!

## Integration with OpenClaw

### MCP Server Integration

The toolkit can be controlled via MCP tools:

```json
{
  "mcp_server": "pretext-generative-ui",
  "tools": {
    "generate_ui": {
      "description": "Generate UI from prompt",
      "parameters": {
        "prompt": "Create a dashboard with charts"
      }
    },
    "heal_errors": {
      "description": "Trigger auto-healing"
    },
    "update_component": {
      "description": "Update a component",
      "parameters": {
        "id": "header-1",
        "changes": { "content": "New Header" }
      }
    }
  }
}
```

### LM Studio Configuration

Default configuration uses Duckets' LM Studio setup:

```typescript
const config = {
  lmStudioUrl: 'http://100.116.54.125:1234',
  lmStudioKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
  model: 'qwen3.5-27b'
}
```

## Component Types

| Type | Description | Use Case |
|------|-------------|----------|
| `header` | Large text header | Titles, hero text |
| `text` | Regular text | Body copy, descriptions |
| `button` | Clickable button | CTAs, actions |
| `card` | Card container | Feature cards, content boxes |
| `input` | Text input | Forms, search |
| `container` | Generic container | Layout sections |
| `image` | Image placeholder | Images, media |

## Styling

Components use CSS-style properties:

```typescript
const component = {
  style: {
    background: '#1e1e3f',
    backgroundEnd: '#2d2d5f',  // Gradient end for cards
    color: '#ffffff',
    fontSize: '16',
    borderRadius: '8',
    boxShadow: '#8b5cf6',      // Glow effect for cards
    borderColor: '#4a4a6a'    // For inputs
  }
}
```

## Pretext Integration

The toolkit uses **Pretext** for character-level text measurement without DOM reflow:

```typescript
import { prepare, layout } from '@chenglou/pretext'

// Pretext measures text WITHOUT touching DOM
const prepared = prepare(text, '16px Inter')
const measured = layout(prepared, maxWidth, lineHeight)

// Canvas renders with exact positioning
ctx.fillText(line.text, line.x, line.y)
```

## Best Practices

1. **Use descriptive prompts** - More detail = better UI
2. **Set reasonable bounds** - Keep coordinates within viewport
3. **Monitor errors** - Watch `ui.errors` for issues
4. **Use auto-heal** - Keep `autoHeal: true` for production
5. **Track thinking** - Use `onThinking` for debugging

## Troubleshooting

### "No components rendered"

- Check LM Studio is running
- Verify URL and API key
- Check browser console for errors
- Try a simpler prompt

### "Healing not working"

- Increase `maxRetries` if errors persist
- Check network connectivity
- Verify model is loaded in LM Studio

### "Parse errors"

- Ensure prompt is clear and specific
- AI may need a moment to stabilize output
- Auto-heal will retry automatically

## Files

- `src/ai/AutoHealingUI.tsx` - Core auto-healing engine
- `src/ai/index.ts` - Module exports
- `src/pretext/PretextCanvas.tsx` - Canvas renderer
- `src/components/*` - UI component library
- `src/skills/generative-ui/SKILL.md` - This file

## Credits

Built for [Duckets](https://github.com/DucketsMcquackin) by DuckBot AI
- Pretext by [chenglou](https://github.com/chenglou/pretext)
- Inspired by [Morphic](https://github.com/miurla/morphic), [MagicUI](https://magicui.design/)
