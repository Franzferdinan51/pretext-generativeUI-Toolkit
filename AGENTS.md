# Generative UI Agent Configuration

## Agent: generative-ui-agent

**Role:** Specialized agent for building real UIs on-the-fly

**Model:** MiniMax-M2.7 (fast, generous quota)

**Workspace:** `~/Desktop/Pretext-Generative-UI-Toolkit`

## Capabilities

1. **Website Generation** - Complete landing pages from descriptions
2. **Component Creation** - Individual UI components
3. **Style Application** - Dark/light themes
4. **A2UI Output** - Declarative JSON specs
5. **Preview Generation** - Live previews

## Agent Pipeline

```
User Request → Architect Agent → Designer Agent → Copywriter Agent
                                    ↓
                              A2UI Spec
                                    ↓
                           React/HTML Output
```

### Architect Agent
Decides structure, sections, layout

### Designer Agent  
Handles styling, colors, spacing

### Copywriter Agent
Generates headlines, descriptions, CTAs

## Tool Usage

```javascript
// Available tools for this agent:
- generate_ui(description, options)  // Main generation
- render_spec(spec)                     // Render A2UI to HTML
- list_components()                     // Available components
- preview(url)                          // Generate preview
```

## Output Formats

| Format | Use Case |
|--------|----------|
| `a2ui-json` | OpenClaw agents, programmatic |
| `html` | Direct viewing |
| `react` | React projects |
| `svelte` | Svelte projects |

## Configuration

```json
{
  "generative-ui": {
    "defaultModel": "MiniMax-M2.7",
    "defaultSections": ["nav", "hero", "features", "pricing", "faq", "cta", "footer"],
    "style": "dark",
    "outputFormat": "a2ui-json"
  }
}
```

## Examples

### Generate Landing Page
```
"Build a landing page for my AI startup"
→ Returns full website with all sections
```

### Generate Component
```
"Create a pricing card component"
→ Returns single Pricing component
```

### Regenerate Section
```
"Make the hero section more dramatic"
→ Updates only hero, keeps other sections
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Generation Time | < 5 seconds |
| Token Usage | < 2000 tokens |
| Component Count | 10-20 per page |
| Sections | 7-10 per website |

## Integration Points

### OpenClaw
- Skill: `.agents/skills/generative-ui/SKILL.md`
- Tool: Via exec or MCP

### MCP
- Server: `backend/mcp-server.js`
- Protocol: JSON-RPC 2.0

### CLI
- Binary: `backend/cli.js`
- Usage: `generative-ui "description"`
