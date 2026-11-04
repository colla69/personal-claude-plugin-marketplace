#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
cat > docs/setup.md <<'EOF_FIXTURE'
# Instalation

Install Node 14 or newer, then run:

    npm install
    npm start

TODO: add a screenshot of the start page here

## Configuraton

Copy `.env.example` to `.env` and set `API_URL`. See [the API guide](api-guide.md).
EOF_FIXTURE
