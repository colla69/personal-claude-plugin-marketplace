#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module" }
JSON
cat > README.md <<'MD'
# shop-tools

    shop init              create a config file at ./shop.config.json
    shop sync              push local changes to the shop
    shop export <file>     write all orders to a file
MD
