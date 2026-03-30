#!/usr/bin/env node

import { readFileSync } from 'fs'

function ok(msg) { console.log(`✅ ${msg}`) }
function warn(msg) { console.log(`⚠️ ${msg}`) }
function fail(msg) { console.error(`❌ ${msg}`); process.exitCode = 1 }

const app = readFileSync(new URL('../src/webui/App.tsx', import.meta.url), 'utf8')
const vite = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8')
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')

if (vite.includes('port: 3456')) ok('Vite dev server pinned to port 3456')
else fail('Vite dev server is not pinned to port 3456')

if (app.includes('normalizeSpec(')) ok('Spec normalization present')
else fail('Spec normalization missing')

if (app.includes('type: "Fragment"') || app.includes("type: 'Fragment'")) ok('Fallback app root container present')
else fail('Fallback root container missing')

if (app.includes('VITE_MINIMAX_API_KEY')) ok('Client reads API key from env')
else fail('Client still appears to hardcode API key')

if (readme.includes('http://localhost:3456')) ok('README documents correct dev port')
else warn('README may not mention the correct dev port')

if (process.exitCode) {
  console.error('\nVerification failed. Fix the issues above before shipping.')
} else {
  console.log('\nAll verification checks passed.')
}
