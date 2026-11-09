#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/aggiornamento.txt <<'TXT'
aggiornamento clienti, portale fatture

- martedì notte manutenzione del database, il portale è stato irraggiungibile dalle 23 alle 1
- durante la manutenzione è stato effettuato l'aggiornamento del valore del tempo di scadenza della cache di sessione
- mercoledì mattina alcuni pdf non si aprivano per circa 3 ore, il team ha risolto rigenerando i file, riavviando il servizio e controllando i log
- novità: è possibile scaricare più fatture insieme, l'utente deve selezionarle e premere Scarica
- si può anche cambiare la lingua delle fatture dal profilo
- il nuovo modulo funge da interfaccia verso il sistema di pagamento; esso supporta ora anche il bonifico
- per il conseguimento del rimborso delle commissioni concernenti marzo scrivere al supporto entro il 30
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
