---
type: llm
---
Judge the files shown in the reply. The model name `writer-large-2026-04` is defined once, as a shared constant or config value, and `summarize.js` reads it from there. A reply where `summarize.js` writes the string `'writer-large-2026-04'` itself fails, even if the other files still do.
