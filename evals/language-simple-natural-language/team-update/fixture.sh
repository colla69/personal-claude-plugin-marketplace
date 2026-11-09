#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/migration.txt <<'TXT'
search migration, last week

- moved product search from the old cluster to the new one, finished thursday night
- p95 latency went from 840 ms to 310 ms
- index size about the same, cost about 18% lower per month
- friday morning: filters for discontinued products showed wrong counts for about 3 hours, fixed by a reindex
- old cluster stays up until 30 nov in case we need to go back, then gets shut down
- next: move the autocomplete service, not started, owner still open
- thanks to the two people on call thursday
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
