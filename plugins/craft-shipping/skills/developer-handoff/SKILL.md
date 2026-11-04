---
name: developer-handoff
description: How to write a handoff for a developer who takes over an app, often one built with AI — mark every statement as ran, read in a file, or told, and give environment variables by name and purpose, never their values. Use whenever the user wants to hand a project to a developer, onboard an engineer, or says "write a handoff" or "document this for the next developer".
---

# Developer handoff

The next developer trusts the handoff until it is wrong once. After that, they read
the code instead, and the handoff was wasted.

## Mark where each statement comes from

Mark every statement as **ran** (you executed it), **read** (you read it in a file) or
**told** (the user said it). A command copied from the README and never executed is
read, not ran. This is what separates a handoff from a plausible story.

## Names, never values

Give each environment variable by name and purpose. Never copy a value, even from an
example file: example files often hold real keys and passwords.

## Where this yields

- **To the project's own docs.** Link to them instead of repeating them.
- **To the user** on what the developer should work on first.
