#!/usr/bin/env bash
set -euo pipefail
mkdir -p logs
cat > logs/outage.log <<'TXT'
2026-11-03T14:02:11Z checkout-api ERROR pool exhausted: 50/50 connections in use
2026-11-03T14:02:40Z checkout-api ERROR 503 rate 9.8%
2026-11-03T14:10:05Z checkout-api ERROR 503 rate 12.1%
2026-11-03T14:24:50Z deploy rollback checkout-api v3.18.0 -> v3.17.2
2026-11-03T14:31:02Z checkout-api INFO 503 rate 0.2%
TXT
cat > logs/oncall-notes.txt <<'TXT'
- v3.18.0 went out at 13:55, it changed the session cache to open a db connection per request
- we've seen pool exhaustion before but never this bad
- some customers may have been charged twice, payments team is checking, no numbers yet
- rolled back at 14:24, recovered by 14:31
- todo: load test the session cache change before re-release, add an alert on pool usage > 80%
TXT
