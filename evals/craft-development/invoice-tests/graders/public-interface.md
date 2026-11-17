---
type: llm
---
The tests call only `invoiceTotal`. `roundCents` is not exported from `src/invoice.js` and not tested directly. If the reply doesn't show `src/invoice.js`, it was not changed, which passes.
