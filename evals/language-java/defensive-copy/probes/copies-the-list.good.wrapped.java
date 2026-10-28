class Customer {
  Customer(String n, List<String> tags) { this.tags = Collections.unmodifiableList(new ArrayList<>(tags)); }
}
