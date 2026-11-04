#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/restore.txt <<'TXT'
restore orders db - rough notes

- you should stop the orders-api first, otherwise it keeps writing (e.g. the retry worker)
- backups are in s3://acme-backups/orders/, pick last night's, they're named by date
- download: aws s3 cp s3://acme-backups/orders/2026-11-03.dump /tmp/orders.dump
- restore with pg_restore --clean -d orders /tmp/orders.dump, takes ~20 min, don't interrupt it
- run the smoke test (scripts/smoke.sh) if pg_restore printed warnings
- start orders-api again, check the dashboard, error rate should go back under 1% etc.
- NEVER run it against orders-replica, it'll break replication and we have to rebuild it from scratch which takes hours
TXT
