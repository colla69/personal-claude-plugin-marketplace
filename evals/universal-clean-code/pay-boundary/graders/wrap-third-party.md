---
type: llm
---
Judge the final `src/checkout.js` shown in the reply.
The PayLite client and its option names, such as `amount_cents` and `idempotency_key`, are used in one small module or function of this project, behind a function with the project’s own terms, such as `charge(order)`. Callers would not need to import `vendor/paylite.js`.
