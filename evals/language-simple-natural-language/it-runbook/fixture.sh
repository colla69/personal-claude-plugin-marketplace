#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/ripristino.txt <<'TXT'
ripristino db orders - appunti

- dovresti fermare prima orders-api, altrimenti continua a scrivere (es. il retry worker)
- i backup sono in s3://esempio-backup/orders/, prendi quello di stanotte, il nome è la data
- download: aws s3 cp s3://esempio-backup/orders/2026-11-03.dump /tmp/orders.dump
- ripristino con pg_restore --clean -d orders /tmp/orders.dump, circa 20 min
- lancia scripts/smoke.sh se pg_restore ha stampato avvisi
- riavvia orders-api, controlla la dashboard, il tasso di errore dovrebbe tornare sotto l'1%
- sarebbe meglio non lanciarlo mai su orders-replica, rompe la replica e ricostruirla richiede ore
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
