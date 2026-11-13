NSEvent.addLocalMonitorForEvents(matching: .keyDown) { event in
  if event.modifierFlags.contains(.command) { return event }
  if event.keyCode == 49 && !event.isARepeat { self.bump() }
  return nil
}
