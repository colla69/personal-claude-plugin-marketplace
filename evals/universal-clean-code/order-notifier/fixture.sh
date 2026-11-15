#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/smtp.js <<'JS'
export class SmtpClient {
  constructor({ host, port }) { this.host = host; this.port = port }
  async send({ to, subject, text }) { /* talks to the mail server */ }
}
JS
cat > src/orders.js <<'JS'
export class OrderService {
  constructor(repository) { this.repository = repository }
  async placeOrder(order) {
    const saved = await this.repository.save({ ...order, status: 'placed' })
    return saved
  }
}
JS
cat > src/main.js <<'JS'
import { OrderService } from './orders.js'
import { InMemoryRepository } from './repository.js'

const orders = new OrderService(new InMemoryRepository())
export { orders }
JS
echo 'export class InMemoryRepository { async save(o) { return o } }' > src/repository.js
