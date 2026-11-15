---
type: llm
---
Judge the final code shown in the reply.
The added code does not reach through a chain of objects, such as `order.customer.address.country`. It asks the object next to it, through a method on Order or Customer, or takes the country as a parameter.
