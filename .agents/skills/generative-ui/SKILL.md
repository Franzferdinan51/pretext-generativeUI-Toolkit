---
name: generative-ui
description: Generate UI cards and websites using Pretext + Canvas. Weather, crypto, metrics, plants, any dashboard.
metadata: {"openclaw": {"emoji": "🎨", "requires": {"bins": ["node"]}}}
---

# 🎨 Pretext Canvas Skill

Generate beautiful UI components via **Pretext** (text measurement) + **Canvas** (rendering). AI controls every pixel with pure math.

## Quick Start

### CLI
```bash
# Generate weather card
pretext-canvas weather "72F sunny Dayton Ohio"

# Generate crypto chart
pretext-canvas crypto "Bitcoin $67000 24h up"

# Generate metric card
pretext-canvas metric "99.9% uptime positive"

# Serve on LAN (for phone access)
pretext-canvas serve /tmp/weather.html
```

### MCP Server
```bash
# Start MCP server
node backend/mcp-server.js &

# Call via HTTP
curl -X POST http://localhost:3457 -H "Content-Type: application/json" \
  -d '{"tool":"generate_weather","args":{"temp":"72","location":"Dayton"}}'
```

## Available Types

### 🌤️ Weather Card
```bash
pretext-canvas weather "68F partly cloudy Huber Heights humidity 45 wind 7mph"
```

### 💰 Crypto Chart
```bash
pretext-canvas crypto "Bitcoin $67000 24h change +2.3%"
pretext-canvas crypto "Ethereum $3400 positive"
```

### 📊 Metric Card
```bash
pretext-canvas metric "99.9% uptime positive trend"
pretext-canvas metric "10000 users active"
```

### 🌿 Plant Dashboard
See: `/tmp/plant-check.html`

## MCP Tools

| Tool | Description |
|------|-------------|
| `generate_weather` | Animated weather card |
| `generate_crypto` | Crypto price chart |
| `generate_metric` | Metric/stat card |
| `serve_file` | Get LAN URL |
| `get_template` | Template info |
| `list_generated` | Available types |

## Architecture

```
User Request → Parser (extract data) → Template (Pretext+Canvas) → HTML
     ↓                                    ↓
  Natural                          Canvas draws
  Language                         at exact
     ↓                            Pretext
  "72F"  ──────────────────────→ positions
```

## Files

```
~/.openclaw/workspace/skills/generative-ui/
├── SKILL.md                    ← This file
├── backend/
│   ├── cli.js                  ← CLI tool (pretext-canvas)
│   ├── mcp-server.js           ← MCP server (port 3457)
│   ├── pretext-server.js       ← Pretext measurement API (port 3458)
│   ├── pretext-generator.js     ← Pretext-enhanced generator
│   ├── fast-generator.js       ← Simple HTML generator
│   └── generative-ui.js        ← Full AI generator
└── examples/
    ├── pretext-weather-canvas.html
    └── dragon-whip.html
```

## Live URLs (Tailscale)

- Weather: http://100.68.208.113:8080/pretext-weather-glam.html
- Dragon Whip: http://100.68.208.113:8080/dragon-whip.html
- Plant Check: http://100.68.208.113:8080/plant-check.html

## What Pretext Does

Pretext measures text positions WITHOUT DOM reflow:

```js
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// 1. Pretext measures (fast, cached)
const prepared = prepareWithSegments(text, 'bold 48px Inter')
const { lines } = layoutWithLines(prepared, 400, 32)
// lines = [{text, y, width}] for every line

// 2. Canvas draws at exact positions
ctx.fillText(line.text, 250, y + line.y)
```

**No CSS. No HTML elements. Pure math.**

## Examples Built

| Example | File | Theme |
|---------|------|-------|
| Weather | `/tmp/pretext-weather-glam.html` | Purple aurora |
| Bitcoin | `/tmp/bitcoin.html` | Orange/green |
| Dragon Whip | `/tmp/dragon-whip.html` | Red RPG |
| Plant Health | `/tmp/plant-check.html` | Green grow |
| Metric | `/tmp/metric.html` | Purple glow |

## Duckets' Words

> "I fucking love this new tool we created here this is amazing!"
> "We will use this pretext setup for way more than this, it's so powerful"

**Pretext + Canvas = The future of AI UI** 🎨🦆
