---
type: regex
target: { source: file, path: Sources/Counter/main.swift }
pattern: '(?<![\s\S])(?=[\s\S]*addLocalMonitorForEvents)(?=[\s\S]*return nil)(?:(?![\s\S]*return (?:event|\$0)\b)|(?=[\s\S]*\.command))|(?<![\s\S])(?![\s\S]*super\.keyDown)[\s\S]*override func keyDown'
---
No key the window gets makes an alert sound: a local monitor returns nil for every key, passing on at most the ones with Command held, or a `keyDown` override never passes a key on to `super`.
