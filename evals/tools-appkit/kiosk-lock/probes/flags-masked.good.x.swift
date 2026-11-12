let flags = event.modifierFlags.intersection(.deviceIndependentFlagsMask)
if flags == [.control, .option, .command] && event.keyCode == 32 { unlock() }
