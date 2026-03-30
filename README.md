# Pretext + GenerativeUI Toolkit

<p align="center">
  <strong>🎨 Generate Real Websites On-The-Fly with AI</strong>
</p>

<p align="center">
  For OpenClaw agents • CLI • MCP • SKILL.md • Real-time UI Generation
</p>

---

## 🚀 Quick Start

### Web UI (Demo)
```bash
npm install
npm run dev
# → http://localhost:3456
```

### CLI (Terminal)
```bash
npm run cli -- "SaaS landing page"
npm run cli -- --sections nav,hero,pricing "Developer tool"
npm run cli -- --brand "Acme" "E-commerce site"
```

### MCP Server (For AI Agents)
```bash
npm run mcp
# → http://localhost:3457
```

---

## 🎯 What This Does

Transforms **natural language** into **complete websites**:

```
"SaaS landing page for developer tools"
    ↓
[AI Generation Pipeline]
    ↓
{A2UI JSON Spec}
    ↓
{Rendered Website}
```

---

## 📦 What Gets Generated

| Section | Content |
|---------|---------|
| `nav` | Logo + navigation links |
| `hero` | Headline + subtitle + CTAs |
| `features` | 6 feature cards with emojis |
| `stats` | 4 metrics with trends |
| `pricing` | 3 tiers (Free/Pro/Enterprise) |
| `faq` | 5 Q&A items |
| `cta` | Call-to-action |
| `footer` | Link categories + copyright |

---

## 🤖 OpenClaw Integration

### SKILL.md
Location: `.agents/skills/generative-ui/SKILL.md`

OpenClaw auto-discovers and teaches agents:

```
Agent: "Build a landing page for my AI startup"
→ generative-ui skill executes
→ Returns complete website (A2UI JSON + HTML)
```

### MCP Server
AI agents connect via JSON-RPC 2.0:

```bash
npm run mcp
# Endpoints:
# GET  /health    - Health check
# GET  /tools     - List tools  
# POST /mcp       - MCP protocol
```

#### MCP Tools
| Tool | Description |
|------|-------------|
| `generate_ui` | Generate website from description |
| `render_spec` | Render A2UI spec to HTML |
| `list_components` | List available components |

#### Connect to OpenClaw
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

### CLI for Exec Tool
```bash
# Via OpenClaw exec tool
generative-ui "Portfolio for freelancer"
generative-ui --output html "SaaS dashboard"
```

---

## 🔧 CLI Usage

```bash
# Full website
generative-ui "Modern SaaS landing page"

# Specific sections
generative-ui --sections nav,hero,pricing "Developer tool"

# With brand
generative-ui --brand "Acme Corp" "E-commerce"

# HTML output
generative-ui --output html "Portfolio"

# List components
generative-ui --list-components
```

### Options
```
--sections <list>    Sections (nav,hero,features,pricing,faq,cta,footer)
--brand <name>      Brand name
--style <style>    dark or light (default: dark)
--output <format>   json, spec, or html (default: json)
--list-components   Show available components
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User / Agent                      │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  Interface (pick one)                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │   CLI   │  │   MCP   │  │  SKILL │  │  REST  │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬───┘ │
└───────┼────────────┼───────────┼────────────┼─────┘
        ↓             ↓           ↓            ↓
┌─────────────────────────────────────────────────────┐
│              generative-ui.js (Core API)             │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ generateUI() │  │ renderSpec() │               │
│  └──────┬───────┘  └──────────────┘               │
│         ↓                                            │
│  ┌──────────────────────────────────────────────┐  │
│  │           MiniMax M2.7 API                   │  │
│  │  JSON-only generation • Fallback on failure   │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    A2UI Output                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  JSON    │  │   HTML   │  │  React  │         │
│  │  Spec    │  │  Render  │  │  Comps  │         │
│  └──────────┘  └──────────┘  └──────────┘         │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── README.md
├── package.json
│
├── src/webui/
│   └── App.tsx              # React web UI
│
├── backend/
│   ├── generative-ui.js      # Core API (ESM)
│   ├── cli.js                # CLI tool
│   └── mcp-server.js         # MCP server
│
├── .agents/skills/
│   └── generative-ui/
│       └── SKILL.md          # OpenClaw skill
│
└── AGENTS.md                # Agent config
```

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|------------|
| **Generation** | MiniMax M2.7 API |
| **Layout** | Pretext (~0.09ms text measurement) |
| **UI Spec** | A2UI JSON |
| **Styling** | Tailwind CSS |
| **Theme** | Dark mode (Stripe/Linear aesthetic) |

---

## 🎨 Features

- **8 UI Components**: Nav, Hero, Card, Metric, Pricing, FAQ, CTA, Footer
- **Responsive Design**: Mobile-first with Tailwind
- **Dark Mode**: Purple/pink gradients on black
- **Real-time Generation**: Progress shown step-by-step
- **Fallback on Failure**: Always produces output
- **JSON-First**: Strict parsing with auto-fix
- **OpenClaw Ready**: SKILL.md + MCP + CLI

---

## 🔌 OpenClaw Config

### Skill Enable
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

### Workspace Skills
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
| **OpenClaw** | https://docs.openclaw.ai |
| **Skills Guide** | https://docs.openclaw.ai/tools/skills |
| **CopilotKit** | https://github.com/CopilotKit/OpenGenerativeUI |
| **renderify** | https://github.com/webllm/renderify |
| **A2UI** | https://github.com/google/A2UI |
| **Pretext** | https://github.com/chenglou/pretext |

---

## 📜 License

MIT

---

<p align="center">
  🎨 Generative UI • 🤖 For Agents • ⚡ On-The-Fly
</p>
