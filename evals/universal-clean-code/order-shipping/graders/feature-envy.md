---
type: llm
---
The shipping cost, which needs only the order's weight and country, is computed by a method on `Order`, such as `order.shippingCost()`. A function in `checkout.js` that reads `order.weightKg` and `order.country` fails.
