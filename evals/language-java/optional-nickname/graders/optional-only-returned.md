---
type: regex
target: { source: file, path: src/main/java/com/example/Customer.java }
pattern: '(?<![\s\S])(?![\s\S]*(Optional<[^>]*>\s+\w+\s*[;=]|[(,]\s*(final\s+)?(java\.util\.)?Optional<))[\s\S]*nickname'
---
`Optional` is not a field (of any visibility) and not a parameter. A getter may return it.
