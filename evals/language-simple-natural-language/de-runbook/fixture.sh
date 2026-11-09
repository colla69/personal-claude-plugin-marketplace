#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/wiederherstellung.txt <<'TXT'
orders-DB wiederherstellen - grobe Notizen

- du solltest zuerst orders-api stoppen, sonst schreibt die weiter (z.B. der Retry-Worker)
- Backups liegen in s3://beispiel-backups/orders/, nimm das von letzter Nacht, der Name ist das Datum
- Download: aws s3 cp s3://beispiel-backups/orders/2026-11-03.dump /tmp/orders.dump
- Wiederherstellen mit pg_restore --clean -d orders /tmp/orders.dump, dauert ca. 20 Min, muss nicht abgebrochen werden
- scripts/smoke.sh laufen lassen, falls pg_restore Warnungen ausgegeben hat
- orders-api wieder starten, Dashboard prüfen, die Fehlerrate sollte wieder unter 1 % gehen
- NIEMALS gegen orders-replica laufen lassen, das macht die Replikation kaputt und der Neuaufbau dauert Stunden
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
