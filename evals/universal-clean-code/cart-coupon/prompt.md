---
name: cart-coupon
description: A coupon added to a cart module whose functions return new carts.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/cart.js`, add a way to apply a coupon code to a cart. The valid codes and their percentages are in `COUPONS`. The checkout page needs to apply the code and to tell the shopper when the code is not valid.

When you are done, show every file you changed, whole, in your reply.
