---
type: llm
---
After the uploads and before any live file is replaced, the script compares the size or checksum of every uploaded file with the local file, and stops on a mismatch. A script with no such check, or with the check after the swap, fails.
