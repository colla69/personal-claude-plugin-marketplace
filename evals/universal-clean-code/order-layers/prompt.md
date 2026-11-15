---
name: order-layers
description: A filter and request tracing added to routes, a service and a repository.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add a status filter to `GET /orders` in `src/routes.js`: `GET /orders?status=open` returns only the orders with that status, and `req.query` holds the query. Also, every call into the repository must log the request's trace id with `console.log`. The trace id arrives as `req.headers['x-trace-id']`.

When you are done, show every file you changed, whole, in your reply.
