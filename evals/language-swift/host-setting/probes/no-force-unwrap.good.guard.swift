func host(from s: [String: String]) -> String {
  guard let h = s["host"] else { fatalError("host missing: the loader guarantees it") }
  return h
}
