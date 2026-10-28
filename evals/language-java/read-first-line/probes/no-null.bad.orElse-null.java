class FirstLine { static String of(Path p) { return Files.lines(p).findFirst().orElse(null); } }
