---
type: llm
---
Judge the final `src/checkout.js` shown in the reply.
A `PayLiteError` does not leak out of the module as it is. It is caught and turned into an error type or message of this project, such as `PaymentDeclinedError`.
