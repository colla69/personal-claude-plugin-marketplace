class Customer {
  Customer(String n, List<String> tags) { this.tags = tags; }
  List<String> getTags() { return new ArrayList<>(tags); }
}
