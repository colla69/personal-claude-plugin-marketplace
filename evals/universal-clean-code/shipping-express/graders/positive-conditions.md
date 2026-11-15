---
type: llm
---
Judge the final `src/shipping.js` shown in the reply.
The added conditions are stated positively. It fails on a negated condition where the positive one reads as well, such as `if (!isMember) ... else ...`, `if (!(subtotal < 50))` or a double negative.
