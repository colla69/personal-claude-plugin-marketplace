Fixed the off-by-one in `ordersPage` (`src/orders.js:3`): the slice ended at `start + size - 1`. The same slice is in `invoicesPage` and `customersPage`, so I fixed both too.
