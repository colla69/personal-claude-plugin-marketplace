#!/usr/bin/env bash
set -euo pipefail
mkdir -p .claude-plugin plugins/craft-development/.claude-plugin plugins/craft-development/skills/development-standards
cat > .claude-plugin/marketplace.json <<'EOF_FIXTURE'
{ "name": "skills", "owner": { "name": "Skills team" }, "plugins": [
  { "name": "craft-development", "source": "./plugins/craft-development", "description": "How code is changed." } ] }
EOF_FIXTURE
cat > plugins/craft-development/.claude-plugin/plugin.json <<'EOF_FIXTURE'
{ "name": "craft-development", "license": "Apache-2.0" }
EOF_FIXTURE
cat > README.md <<'EOF_FIXTURE'
# Skills marketplace

Our public library of Claude Code skills, one skill per plugin. Open source under Apache-2.0.
EOF_FIXTURE
cat > plugins/craft-development/skills/development-standards/SKILL.md <<'EOF_FIXTURE'
---
name: development-standards
description: For all code, drive each change with a failing test and verify with typecheck, tests and lint in that order. Use whenever writing or modifying application code.
---

# Development standards

## Test first

Where the project has a test runner, a change to behavior starts with a failing test.

## Verify in this order

1. The typecheck or compile step, if the language has one
2. The test suite, or the subset covering what you touched
3. The linter, if the project has one configured
EOF_FIXTURE
