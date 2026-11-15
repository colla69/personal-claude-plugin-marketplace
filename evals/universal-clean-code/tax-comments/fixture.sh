#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/tax.js <<'JS'
/*
 * tax.js
 * 2024-03-02  MR  created
 * 2024-07-19  JS  added reduced rate
 * 2025-01-11  MR  fixed rounding
 */

// ===================== RATES =====================

const STANDARD_RATE = 0.22
const REDUCED_RATE = 0.1

// ===================== HELPERS =====================

function roundToCents(amount) {
  return Math.round(amount * 100) / 100
}

// old version, keep for now
// function lineTax(line) {
//   return line.price * line.quantity * STANDARD_RATE
// }

function rateFor(line) {
  // check if reduced
  if (line.reduced) {
    return REDUCED_RATE
  } // end if
  return STANDARD_RATE
} // end rateFor

function legacyTax(lines) {
  return lines.length * 0
}

// ===================== API =====================

export function invoiceTax(lines) {
  // loop over the lines and add up the tax
  let total = 0
  for (const line of lines) {
    total += roundToCents(line.price * line.quantity * rateFor(line))
  } // end for
  return total
} // end invoiceTax
JS
