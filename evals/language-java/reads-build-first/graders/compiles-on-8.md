---
type: regex
target: { source: file, path: src/main/java/com/example/Money.java }
pattern: '(?<![\s\S])(?![\s\S]*(\brecord\s+Money|\bvar\s+\w+\s*=|\b(List|Set|Map)\.(of|copyOf)\(|\.toList\(\)|\.isBlank\(\)|\.strip\(\)))[\s\S]*class Money'
---
The file declares a class and uses no feature from after Java 8.
