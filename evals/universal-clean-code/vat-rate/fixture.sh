#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/model.js <<'JS'
export class Address {
  constructor(street, city, country) {
    this.street = street
    this.city = city
    this.country = country
  }
}

export class Customer {
  constructor(name, address) {
    this.name = name
    this.address = address
  }
}

export class Order {
  constructor(customer, lines) {
    this.customer = customer
    this.lines = lines
  }
}
JS
cat > src/vat.js <<'JS'
export const EU_COUNTRIES = ['IT', 'DE', 'FR', 'ES', 'AT', 'NL']
JS
