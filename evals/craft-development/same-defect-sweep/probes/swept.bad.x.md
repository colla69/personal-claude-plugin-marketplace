Fixed the off-by-one in `ordersPage` (`src/orders.js:3`): the slice ended at `start + size - 1`, so each page lost its last order. It now ends at `start + size`.
