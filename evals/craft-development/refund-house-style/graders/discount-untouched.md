---
type: regex
target: { source: file, path: src/orders.js }
pattern: 'function discount \(order,percent\)\{\n    if\(percent<0\|\|percent>100\) throw new OrderError\("BAD_PERCENT","percent must be 0 to 100"\)\n    var total=order\.total\*\(1-percent/100\)'
---
The badly formatted `discount`, which the task does not touch, is left as it was.
