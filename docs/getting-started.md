# Getting started

## Install the steward

Each person installs the steward once, on their machine:

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

Then run `/reload-plugins`, or start a new session.

## Dock a project

Create a branch, open a session in the project and say "dock this project". The steward
asks a few questions, such as which marketplaces the project may draw standards from and
whether the project writes Conventional Commits.

It then does the rest:

- writes a short `CLAUDE.md`;
- merges `.claude/settings.json`;
- installs `marketplace-base` and the standards the project shows a need for, at project
  scope;
- removes rules from an existing setup that a standard already states.

It reports every file it wrote. Read the diff, commit it, and run `/reload-plugins` or
start a new session.

## Work in it

You work as before. In every session of a docked project:

- **The index** lists every standard, so Claude can say when one exists for the task in
  front of it, even if the project doesn't have it yet.
- **The guard** runs the project's check command before Claude stops, if a file
  changed. A failure keeps Claude working.
- **The collector** notes when you correct Claude, and files the corrections as an
  issue on this repo at the next session start. It needs `gh` signed in. It sends the
  conversation text to Haiku, and the issues are public, like this repo.
  `"STEWARD_COLLECT": "off"` under `env` in the settings turns it off.
- **The reviewer** reviews the work when you ask for a review.

## Keep it current

Claude Code updates the marketplace by itself. When a standard is added that the
project was never weighed for, or a plugin it uses is renamed, Claude says the setup
needs an update at the start of a session; say "refresh the setup". To check a project
at any time, say "is my setup current?". To see what the setup costs per session, say "why is my setup slow?".

## When something doesn't load

- **On another machine:** each machine needs the plugins installed. The steward's report
  ends with the install lines to run there.
- **After a plugin is renamed:** say "dock this project" again. The steward removes the
  old name and installs the new one.
