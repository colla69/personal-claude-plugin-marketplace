#!/usr/bin/env bash
set -euo pipefail
git init -q .
mkdir -p src
cat > package.json <<'J'
{ "name": "helpdesk", "type": "module", "dependencies": { "express": "4.19.2", "@anthropic-ai/sdk": "0.60.0" } }
J
cat > src/tickets.js <<'J'
import { Router } from "express"
export const tickets = Router()
// A ticket: { id, subject, messages: [{ from, body, at }], updatedAt }. Viewed many times a day.
tickets.get("/api/tickets/:id", async (req, res) => {
  const ticket = await req.store.getTicket(req.params.id)
  res.json(ticket)
})
J
