function refund(order, amount) {
  if (amount <= 0) throw new OrderError("BAD_AMOUNT", "x")
}
