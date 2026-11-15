---
type: llm
---
Judge the final code shown in the reply.
The business logic of placing an order holds no logging, retry or try-catch plumbing for the email. If sending is made best-effort, that handling sits in a wrapper or the wiring, not in the order rule itself. Code with no logging at all passes.
