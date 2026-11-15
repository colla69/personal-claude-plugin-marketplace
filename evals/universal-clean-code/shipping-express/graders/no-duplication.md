---
type: llm
---
Judge the final `src/shipping.js` shown in the reply.
The subtotal of the order is computed in one place only. The express code reuses `standardShipping` or a shared subtotal helper rather than repeating the reduce over the items.
