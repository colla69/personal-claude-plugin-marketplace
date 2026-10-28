---
type: regex
target: { source: file, path: src/main/java/com/example/FirstLine.java }
pattern: 'try \(|Files\.(readAllLines|readString)\('
---
The reader is closed by `try`-with-resources, or the code uses a `Files` method that
closes the file itself. `Files.lines` does not: its stream holds the file open.
