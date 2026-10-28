---
type: regex
target: { source: file, path: src/main/java/com/example/Customer.java }
pattern: '(?<![\s\S])(?![\s\S]*(\brecord\s+Customer|\bvar\s+\w+\s*=|\b(List|Set|Map)\.(of|copyOf)\(|\.toList\(\)))[\s\S]*class Customer'
---
The file declares a class and uses no feature from after Java 8: no record, no `var`,
no `List.of`.
