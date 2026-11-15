#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "web-app", "private": true, "type": "module" }' > package.json
