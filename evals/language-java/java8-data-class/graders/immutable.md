---
type: regex
target: { source: file, path: src/main/java/com/example/Customer.java }
pattern: 'private final String \w+;[\s\S]*private final String \w+;'
---
Both fields are `private final`, set in the constructor.
