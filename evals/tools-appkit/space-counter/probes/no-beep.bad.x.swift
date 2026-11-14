override func keyDown(with event: NSEvent) {
  if event.keyCode == 49 { bump() } else { super.keyDown(with: event) }
}
