---
type: llm
---
Judge the final `src/customers.js` shown in the reply.
Look only at the added code. Every name it introduces says precisely what it holds. It fails on a vague name such as `count`, `counts`, `data`, `result`, `map`, `list`, `num`, `total`, `x` or `tmp`, or a single letter other than the parameter of a one-line arrow callback. A name such as `cancelledCountByCustomerId` passes.
