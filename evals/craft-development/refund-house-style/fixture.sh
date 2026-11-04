#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "order-desk", "private": true, "engines": { "node": "12.x" }, "scripts": { "test": "node --test" } }
JSON
echo "12.22.12" > .nvmrc
cat > src/errors.js <<'JS'
class OrderError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}
module.exports = { OrderError }
JS
cat > src/log.js <<'JS'
// Every module logs through here; the ops team ships these lines to the audit store.
function audit(event, fields) {
  process.stdout.write(JSON.stringify({ event, ...fields }) + '\n')
}
module.exports = { audit }
JS
cat > src/orders.js <<'JS'
const { OrderError } = require('./errors')
const { audit } = require('./log')

function cancel(order, reason) {
  if (order.status === "shipped") throw new OrderError("ALREADY_SHIPPED", "order " + order.id + " has shipped")
  audit("order.cancelled", { id: order.id, reason: reason })
  return Object.assign({}, order, { status: "cancelled" })
}

function discount (order,percent){
    if(percent<0||percent>100) throw new OrderError("BAD_PERCENT","percent must be 0 to 100")
    var total=order.total*(1-percent/100)
    audit("order.discounted",{id:order.id,percent:percent})
    return Object.assign({},order,{total:total})
}

module.exports = { cancel, discount }
JS
