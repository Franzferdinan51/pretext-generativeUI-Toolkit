---
name: generative-ui
description: Generate real UI websites and components on-the-fly using AI. Input a description → Get a complete website with Nav, Hero, Features, Pricing, FAQ, CTA, Footer. Powered by Pretext + A2UI + GenerativeUI patterns.
metadata: {"openclaw": {"emoji": "🎨", "requires": {"bins": ["node"]}}}
---

# Generative UI Skill

Generate complete, production-ready websites and UI components using AI.

## What This Skill Does

Transforms natural language descriptions into fully functional websites with:
- Navigation, Hero, Features, Stats, Pricing, FAQ, CTA, Footer
- Responsive design with dark mode styling
- A2UI declarative JSON output
- Pretext layout engine integration

## Usage

### CLI Command
```bash
generative-ui "Build a landing page for my AI startup"
generative-ui "E-commerce site for selling candles"
generative-ui "Portfolio for a freelance developer"
```

### Programmatic API
```javascript
import { generateUI } from './backend/generative-ui.js'

const result = await generateUI({
  description: "SaaS landing page for a developer tool",
  model: "MiniMax-M2.7",
  sections: ["nav", "hero", "features", "pricing", "faq", "cta", "footer"]
})

console.log(result.spec)     // A2UI JSON spec
console.log(result.html)     // Rendered HTML
console.log(result.components) // Component count
```

## Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Yes | What to build |
| `model` | string | No | AI model (default: MiniMax-M2.7) |
| `sections` | string[] | No | Which sections to include |
| `style` | string | No | Design style (dark/light) |
| `brand` | string | No | Brand name/logo |

## Output Schema

```typescript
interface GenerationResult {
  spec: A2UISpec           // Declarative JSON spec
  html: string             // Rendered HTML
  components: number        // Count of components
  sections: string[]        // Sections generated
  metadata: {
    model: string
    generationTime: number // ms
    tokenUsage: number
  }
}
```

## Supported Sections

| Section | Description |
|---------|-------------|
| `nav` | Navigation with logo + links |
| `hero` | Hero with headline + CTAs |
| `features` | 6 feature cards grid |
| `stats` | 4 metrics with trends |
| `pricing` | 3 pricing tiers |
| `faq` | 5 Q&A items |
| `cta` | Call-to-action |
| `footer` | Link categories |

## Examples

### Generate Full Website
```bash
generative-ui "Modern SaaS landing page"
```

### Generate Specific Sections
```bash
generative-ui --sections hero,features,pricing "Developer tool landing"
```

### With Brand
```bash
generative-ui --brand "Acme Corp" "Enterprise dashboard"
```

## Architecture

```
User Input → AI Agent Pipeline → A2UI Spec → React/HTML Output
                ↓
         MiniMax M2.7
                ↓
    ┌────────────┼────────────┐
    ↓            ↓            ↓
  Pretext    Skills     Generative
  Layout     System     UI Types
```

## MCP Server

This skill also provides an MCP server for agent integration:

```bash
# Start MCP server
generative-ui --mcp

# Or use the standalone MCP
node backend/mcp-server.js
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `generate_ui` | Generate UI from description |
| `render_spec` | Render A2UI spec to HTML |
| `list_components` | List available components |
| `preview` | Generate preview URL |

## Troubleshooting

**Empty output?**
- Check API key is set
- Verify network connectivity
- Try shorter description

**Bad quality?**
- Add more detail to description
- Specify sections explicitly
- Include competitor/reference URLs

**Slow generation?**
- Use smaller model (MiniMax-M2.7 is fast)
- Generate fewer sections
- Check API rate limits

## Files

- `{baseDir}/SKILL.md` - This file
- `{baseDir}/../backend/generative-ui.js` - Main API
- `{baseDir}/../backend/mcp-server.js` - MCP server
- `{baseDir}/../backend/cli.js` - CLI tool
- `{baseDir}/../AGENTS.md` - Agent configuration
