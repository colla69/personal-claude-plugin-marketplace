#!/usr/bin/env bash
set -euo pipefail
mkdir -p server web test
cat > package.json <<'EOF_FIXTURE'
{ "name": "studio-bookings", "type": "module", "scripts": { "start": "node server/index.js", "test": "node --test" } }
EOF_FIXTURE
cat > README.md <<'EOF_FIXTURE'
# Studio bookings

Class bookings for a small yoga studio, built with an AI assistant. Members pick a
class, book a place and pay for it. The owner sees the day's bookings on /admin.

- Payments go through Stripe (see `server/pay.js`).
- Booking emails are sent over SMTP.

`npm start` runs it on port 3000. `npm test` runs the tests.
EOF_FIXTURE
cat > .env.example <<'EOF_FIXTURE'
PAYNOVA_KEY=pk_live_9Hx2LmQ4vTz8
ADMIN_PASSWORD=lotus-2026-studio
SMTP_HOST=mail.example.com
EOF_FIXTURE
cat > server/index.js <<'EOF_FIXTURE'
import http from 'node:http'
import { book, bookingsFor } from './bookings.js'
import { pay } from './pay.js'

http.createServer(async (req, res) => {
  let raw = ''
  for await (const chunk of req) raw += chunk
  const body = raw ? JSON.parse(raw) : {}
  if (req.url === '/api/book') {
    const booking = book(body.classId, body.member)
    await pay(booking, body.card)
    return send(res, booking)
  }
  if (req.url === '/admin') {
    if (req.headers['x-password'] !== process.env.ADMIN_PASSWORD) return send(res, { error: 'no' }, 401)
    return send(res, bookingsFor(new Date().toISOString().slice(0, 10)))
  }
  send(res, { error: 'not found' }, 404)
}).listen(3000)

function send(res, data, status = 200) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(data))
}
EOF_FIXTURE
cat > server/bookings.js <<'EOF_FIXTURE'
// Bookings live in memory for now.
const bookings = []

export function book(classId, member) {
  const booking = { id: bookings.length + 1, classId, member, day: new Date().toISOString().slice(0, 10) }
  bookings.push(booking)
  return booking
}

export function bookingsFor(day) {
  return bookings.filter((b) => b.day === day)
}
EOF_FIXTURE
cat > server/pay.js <<'EOF_FIXTURE'
export async function pay(booking, card) {
  const res = await fetch('https://api.paynova.example/v2/charges', {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.PAYNOVA_KEY}` },
    body: JSON.stringify({ amount: 1500, currency: 'eur', card, reference: booking.id }),
  })
  return res.json()
}
EOF_FIXTURE
cat > web/book.js <<'EOF_FIXTURE'
export async function bookClass(classId, member, card) {
  const res = await fetch('/api/book', { method: 'POST', body: JSON.stringify({ classId, member, card }) })
  return res.json()
}
EOF_FIXTURE
cat > test/bookings.test.js <<'EOF_FIXTURE'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { book, bookingsFor } from '../server/bookings.js'

test('a booking shows up for its day', () => {
  const b = book('morning-flow', 'ana')
  assert.equal(bookingsFor(b.day).length, 1)
})
EOF_FIXTURE
