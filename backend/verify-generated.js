#!/usr/bin/env node

import http from 'http'
import { readFileSync, existsSync, statSync } from 'fs'

async function head(url) {
  const res = await fetch(url, { method: 'HEAD' })
  return { ok: res.ok, status: res.status, contentType: res.headers.get('content-type') }
}

function inspectHtml(file) {
  const html = readFileSync(file, 'utf8')
  const imageRefs = [...html.matchAll(/(?:src=|imageSrc\s*[:=]\s*['"])([^'"\s>]+\.(?:png|jpg|jpeg|gif|webp))/gi)].map((m) => m[1])
  return {
    file,
    bytes: statSync(file).size,
    hasCanvas: html.includes('<canvas'),
    hasScript: html.includes('<script'),
    hasViewport: html.includes('viewport'),
    imageRefs,
  }
}

async function main() {
  const file = process.argv[2]
  const baseUrl = process.argv[3] || 'http://localhost:8080'
  if (!file) {
    console.error('Usage: node backend/verify-generated.js /tmp/file.html [baseUrl]')
    process.exit(1)
  }
  if (!existsSync(file)) {
    console.error(`Missing file: ${file}`)
    process.exit(1)
  }

  const report = inspectHtml(file)
  const failures = []
  if (!report.hasCanvas) failures.push('missing <canvas>')
  if (!report.hasScript) failures.push('missing <script>')
  if (!report.hasViewport) failures.push('missing viewport meta')
  if (report.bytes < 500) failures.push('html too small to be valid output')

  const remote = await head(`${baseUrl}/${file.split('/').pop()}`)
  if (!remote.ok) failures.push(`served html not reachable (${remote.status})`)

  const imageResults = []
  for (const ref of report.imageRefs) {
    const url = ref.startsWith('http') ? ref : `${baseUrl}/${ref.replace(/^\.?\//, '')}`
    const result = await head(url)
    imageResults.push({ ref, ...result })
    if (!result.ok) failures.push(`image not reachable: ${ref}`)
  }

  const output = {
    ok: failures.length === 0,
    file: report.file,
    bytes: report.bytes,
    checks: {
      hasCanvas: report.hasCanvas,
      hasScript: report.hasScript,
      hasViewport: report.hasViewport,
      servedHtmlReachable: remote.ok,
    },
    imageResults,
    failures,
  }

  console.log(JSON.stringify(output, null, 2))
  if (failures.length) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
