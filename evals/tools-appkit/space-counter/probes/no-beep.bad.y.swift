NSEvent.addLocalMonitorForEvents(matching: .keyDown) { event in
  if event.keyCode == 49 { self.bump(); return nil }
  return event
}
