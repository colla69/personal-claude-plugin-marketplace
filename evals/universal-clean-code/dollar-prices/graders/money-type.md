---
type: llm
---
An amount and its currency travel together as one small type, such as a `Money` class or a `{ amount, currency }` value with functions that take it. Fails if the code passes a bare number and a separate currency string side by side, such as `lineTotal(price, currency, qty)`.
