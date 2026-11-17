#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "notify", "private": true, "type": "module" }' > package.json
cat > src/notifiers.js <<'JS'
export class EmailNotifier {
  constructor(transport) {
    this.transport = transport
    this.sent = []
  }

  log(message) {
    this.sent.push({ at: new Date(), message })
    console.log(`[notify] ${message}`)
  }

  async notify(user, message) {
    this.log(message)
    await this.transport.send({ to: user.email, subject: 'Notice', body: message })
  }
}
JS
