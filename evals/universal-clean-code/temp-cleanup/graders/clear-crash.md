---
type: llm
---
Judge every file shown in the reply. If `.tmpfiles.json` holds invalid JSON, the command does not treat it as an empty list or go on silently. It stops with an error, and the message or the code around it names the file. A plain `JSON.parse` error that reaches the user without the file's name fails.
