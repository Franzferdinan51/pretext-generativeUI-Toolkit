# Pretext + GenerativeUI Toolkit

<p align="center">
  <strong>🎨 Generate Real Websites On-The-Fly with AI</strong>
</p>

<p align="center">
  For OpenClaw agents • CLI • MCP • SKILL.md
</p>

---

## 🚀 Quick Start

### Web UI
```bash
npm install
npm run dev
# → http://localhost:3456
```

### CLI (Generate from terminal)
```bash
npm run cli -- "SaaS landing page"
npm run cli -- --sections nav,hero,pricing "Developer tool"
npm run cli -- --brand "Acme" "E-commerce site"
```

### MCP Server (For AI agents)
```bash
npm run mcp
# → http://localhost:3457
```

### OpenClaw Skill
```bash
# Skill is at: .agents/skills/generative-ui/SKILL.md
# OpenClaw will auto-discover it
```

---

## 🎯 What This Does

Transforms **natural language descriptions** into **complete websites**:

```
"SaaS landing page for developer tools"
    ↓
[AI Generation Pipeline]
    ↓
{A2UI JSON Spec}
    ↓
{Rendered HTML + Components}
```

### What Gets Generated:
| Section | Content |
|---------|---------|
| `nav` | Logo + navigation links |
| `hero` | Headline + subtitle + CTAs |
| `features` | 6 feature cards |
| `stats` | 4 metrics with trends |
| `pricing` | 3 tiers (Free/Pro/Enterprise) |
| `faq` | 5 Q&A items |
| `cta` | Call-to-action |
| `footer` | Link categories |

---

## 🤖 OpenClaw Integration

### SKILL.md
Located at: `.agents/skills/generative-ui/SKILL.md`

OpenClaw agents can use this as a tool:

```
Agent: "Build a landing page for my AI startup"
→ generative-ui skill executes
→ Returns complete website
```

### MCP Server
AI agents can call via MCP protocol:

```javascript
// MCP tool call
{
  name: "generate_ui",
  arguments: {
    description: "E-commerce site for candles",
    brand: "Lumière",
    sections: ["nav", "hero", "features", "pricing", "footer"]
  }
}
```

### CLI for Agents
```bash
# Via exec tool
generative-ui "Portfolio for freelancer"
generative-ui --output html "SaaS dashboard"
```

---

## 📦 CLI Usage

### Generate Website
```bash
generative-ui "Modern SaaS landing page"
```

### Options
```bash
--sections <list>   Sections (nav,hero,features,pricing,faq,cta,footer)
--brand <name>      Brand name
--style <style>     dark or light
--output <format>    json, spec, or html
```

### Examples
```bash
# Full website
generative-ui "AI startup landing page"

# Specific sections
generative-ui --sections nav,hero,pricing "Developer tool"

# With brand
generative-ui --brand "Acme Corp" "E-commerce"

# HTML output
generative-ui --output html "Portfolio"
```

---

## 🔧 MCP Server

### Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/tools` | GET | List available tools |
| `/mcp` | POST | MCP protocol |

### Tools Available
```javascript
generate_ui({ description, sections, brand, style })
render_spec({ spec })
list_components()
preview({ spec, port })
```

### Connect to LM Studio
```json
{
  "mcpServers": {
    "generative-ui": {
      "command": "node",
      "args": ["/path/to/backend/mcp-server.js"]
    }
  }
}
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User / Agent                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  Interface (pick one)                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │   CLI   │  │   MCP   │  │   SKILL │  │   REST  │  │
│  │   🖥️   │  │   🤖   │  │   📝   │  │   🌐   │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  │
└───────┼─────────────┼─────────────┼─────────────┼───────┘
        ↓             ↓             ↓             ↓
┌─────────────────────────────────────────────────────────┐
│              generative-ui.js (Core API)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  generateUI │  │ renderSpec  │  │listComponents│     │
│  └──────┬──────┘  └─────────────┘  └─────────────┘     │
│         ↓                                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │              MiniMax M2.7 API                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    A2UI Output                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  JSON    │  │   HTML   │  │  React   │            │
│  │  Spec    │  │ Render   │  │  Comps   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── README.md                    # This file
├── package.json                # npm config + CLI bin
├── src/
│   └── webui/
│       └── App.tsx            # Web UI (React)
├── backend/
│   ├── generative-ui.js       # Core API
│   ├── cli.js                 # CLI tool
│   └── mcp-server.js          # MCP server
└── .agents/
    └── skills/
        └── generative-ui/
            └── SKILL.md       # OpenClaw skill
```

---

## 🔌 OpenClaw Config

Add to `~/.openclaw/openclaw.json`:

```json
{
  "skills": {
    "entries": {
      "generative-ui": {
        "enabled": true
      }
    }
  }
}
```

Or in workspace `openclaw.json`:

```json
{
  "skills": {
    "load": {
      "extraDirs": [".agents/skills"]
    }
  }
}
```

---

## 🌐 Resources

| Resource | Link |
|----------|------|
| **OpenClaw Docs** | https://docs.openclaw.ai |
| **Skills Guide** | https://docs.openclaw.ai/tools/skills |
| **CopilotKit** | https://github.com/CopilotKit/OpenGenerativeUI |
| **renderify** | https://github.com/webllm/renderify |
| **A2UI** | https://github.com/google/A2UI |
| **Pretext** | https://github.com/chenglou/pretext |

---

<p align="center">
  🎨 Generative UI • 🤖 For Agents • ⚡ On-The-Fly
</p>
