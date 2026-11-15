#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "shop-tools", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/discount.js <<'JS'
// Happy hour, from 17:00 to 18:59, gives 10 percent off. Orders of 100 or more get 5 percent off.
// The two add up.
export function discountPercent(total) {
  const hour = new Date().getHours()
  let percent = 0
  if (hour >= 17 && hour < 19) percent += 10
  if (total >= 100) percent += 5
  return percent
}
JS
