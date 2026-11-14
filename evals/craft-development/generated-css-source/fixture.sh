#!/usr/bin/env bash
set -euo pipefail
mkdir -p styles public
cat > package.json <<'JSON'
{ "name": "shop-site", "private": true, "type": "module",
  "scripts": { "build:css": "node build-css.mjs" } }
JSON
cat > build-css.mjs <<'JS'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
const parts = readdirSync('styles').filter(f => f.endsWith('.css')).sort()
  .map(f => readFileSync(`styles/${f}`, 'utf8'))
writeFileSync('public/app.css', parts.join('\n'))
JS
cat > styles/base.css <<'CSS'
body { font-family: sans-serif; margin: 0; }
CSS
cat > styles/buttons.css <<'CSS'
.btn { padding: 4px 8px; border-radius: 4px; }
CSS
node build-css.mjs
cat > public/index.html <<'HTML'
<link rel="stylesheet" href="app.css"><button class="btn">Buy</button>
HTML
