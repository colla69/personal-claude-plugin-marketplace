function discount(order, percent) {
  if (percent < 0 || percent > 100) throw new OrderError("BAD_PERCENT", "percent must be 0 to 100")
}
