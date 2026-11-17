#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes
cat > notes/ausfall.txt <<'TXT'
Ausfall Sitzungsdienst, Dienstag

- 14:10 Login-Fehler bei ca. 30 % der Nutzer, Alarm kam automatisch
- Ursache: die Sitzungsspeicherablaufzeit war auf 5 s statt 900 s gesetzt worden
- die vom Cron-Job in der Nacht erzeugte und danach automatisch verteilte Konfigurationsdatei hatte den falschen Wert
- Datenbankverbindungspoolgröße auch zu klein, ist aber nicht die Ursache gewesen
- 14:25 Service gerestartet, hat nichts gebracht
- 14:40 Wert zurückgesetzt, neu gedeployed, damit gefixt
- 14:52 Fehler weg, 42 Minuten insgesamt
- Support-Mail von einem Kunden: "Ich komme seit einer halben Stunde nicht rein."
- das Konfig-Tool fungiert als zentrale Stelle für alle Werte, geprüft hat den Wert vorher niemand
- nächster Schritt: Validierung für den Wert einbauen, Owner noch offen
TXT
cat > CLAUDE.md <<'TXT'
When you write text for people to read, first load any writing skill that is installed.
TXT
