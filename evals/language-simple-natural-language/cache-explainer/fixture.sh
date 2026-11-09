#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/cache.txt <<'TXT'
session cache notes

- config is in config/cache.yaml, settings get read at startup, so changing the options needs a restart
- cache eviction policy timeout configuration value defaults to 300s
- redis connection pool retry limit is 5, raise this if the worker keeps dropping, it also hits the api though
- ttl 900, can override per tenant in tenant.yaml, those properties win over the config
- stale entries cleared nightly by cron, sessions older than 30 days also deleted then, and the job logs a count to the ops channel
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
