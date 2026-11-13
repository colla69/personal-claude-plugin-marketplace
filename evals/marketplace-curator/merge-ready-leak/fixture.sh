#!/usr/bin/env bash
set -euo pipefail
mkdir -p .claude-plugin plugins/tools-postgres/.claude-plugin plugins/tools-postgres/skills/postgres-conventions
cat > .claude-plugin/marketplace.json <<'EOF_FIXTURE'
{ "name": "skills", "owner": { "name": "Skills team" }, "plugins": [
  { "name": "tools-postgres", "source": "./plugins/tools-postgres", "description": "Postgres conventions." } ] }
EOF_FIXTURE
cat > README.md <<'EOF_FIXTURE'
# Skills marketplace

Our public library of Claude Code skills, one skill per plugin. Open source under Apache-2.0.
EOF_FIXTURE
cat > plugins/tools-postgres/.claude-plugin/plugin.json <<'EOF_FIXTURE'
{ "name": "tools-postgres", "license": "Apache-2.0" }
EOF_FIXTURE
cat > plugins/tools-postgres/skills/postgres-conventions/SKILL.md <<'EOF_FIXTURE'
---
name: postgres-conventions
description: This skill contains our conventions for working with PostgreSQL databases, covering migrations, indexes and connection settings.
---

# Postgres conventions

- Every migration has a down step.
- Add an index concurrently on a table with live traffic.
- Connect through the pooler at `pgbouncer.ledgerline-prod.internal:6432`, never straight to the primary.
- Set `statement_timeout` on every connection.
EOF_FIXTURE
