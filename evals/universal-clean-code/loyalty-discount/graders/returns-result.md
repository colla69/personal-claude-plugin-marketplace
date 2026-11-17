---
type: llm
---
Judge the final `src/loyalty.js` shown in the reply.
The discount is computed by a function that returns it, such as `loyaltyDiscount(total, customer)` returning an amount. Fails if a function in `src/loyalty.js` changes the cart in place, such as `cart.total -= ...`.
