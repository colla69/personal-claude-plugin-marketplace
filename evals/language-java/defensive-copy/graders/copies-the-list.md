---
type: regex
target: { source: file, path: src/main/java/com/example/Customer.java }
pattern: '(?<![\s\S])(?![\s\S]*this\.tags\s*=\s*tags\s*;)[\s\S]*(new (ArrayList|LinkedList)\b|Collectors\.toList\(\))'
---
The constructor copies the list it is given and does not store the caller's list.
`Collections.unmodifiableList(tags)` alone is a view of the caller's list, not a copy.
