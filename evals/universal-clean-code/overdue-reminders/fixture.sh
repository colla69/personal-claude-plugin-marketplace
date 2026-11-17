#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "billing", "private": true, "type": "module" }' > package.json
cat > src/mailer.js <<'JS'
import { createTransport } from './smtp.js'

const transport = createTransport(process.env.SMTP_URL)

export const mailer = {
  send(to, subject, body) {
    return transport.sendMail({ to, subject, text: body })
  },
}
JS
cat > src/invoices.js <<'JS'
import { db } from './db.js'

export function loadInvoices() {
  return db.query('select id, customer_email, due_date, paid from invoices')
}
JS
