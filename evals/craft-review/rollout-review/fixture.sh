#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
cat > docs/rollout-plan.md <<'EOF_FIXTURE'
# Rollout plan: new checkout

**Summary:** the new checkout goes live in all three regions in Q2, within the budget
of 4.1M, and each region keeps the old checkout as a fallback for two weeks.

| Region | Go-live | Budget |
|---|---|---|
| EU | April 14 | 1.9M |
| US | May 5 | 1.9M |
| **Total** | | **4.1M** |

## Fallback

The old checkout stays available in each region for two weeks after its go-live. After
that, the old checkout's servers are shut down on May 12 for all regions at once.

## Risks

Payment provider certification takes six weeks and has not started.
EOF_FIXTURE
