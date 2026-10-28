# Work in a docked project

What changes day to day once a project is docked: the standards come up by themselves,
the build stays green, a review is there when you ask, and your corrections reach the
curators. You don't have to learn anything new to use it.

**Not yet tried on real projects.** This guide follows the base plugin's files; the
first trials will show where it behaves otherwise.

## Just work

Type what you want, as before. Each session starts with an index of every standard in
the marketplace, so when your request falls under one that isn't installed here, Claude
says so in one line and offers to add it. Say yes, and the steward installs it.

## Plan the hard parts

The project's model is `opusplan`: Opus while you are in plan mode, Sonnet otherwise.
For hard, open-ended work, switch to plan mode with Shift+Tab, agree a plan, and leave
plan mode to carry it out. `/model` changes the model for a session.

A session compacts when its context reaches 180k tokens (`autoCompactWindow` in
`.claude/settings.json`), so a long session stays well inside the model's limit.
`/autocompact` changes the window for a model on your machine.

## When the check fails

If Claude changed a file, it runs the project's check command before it stops. When the
build or the tests fail, it keeps working on the failure. After three failures in a row
it stops and tells you, because something may need you. The command is `STEWARD_CHECK`
in `.claude/settings.json`; change it there, or remove it.

## Ask for a review

Say "review this", "review my changes" or "review this document". The `reviewer` agent
reads the work on Opus, by the project's standards, and reports only findings worth
fixing. Nothing is reviewed unless you ask.

For a long test run, Claude may hand it to the `test-runner` agent, on Haiku, which
reports only the failures.

## Ask the steward

| Ask | You get |
|---|---|
| "Is there a standard for this?" | The standard, installed here or not, and what it says |
| "Add the standard for X" | It installed, at project scope |
| "Why isn't this skill loading?" | The cause, and the fix to make on your yes |
| "What does this setup cost?" | The tokens it adds to every session, and what could be cheaper |

## Correct Claude

When Claude does something the wrong way, say so, and say how it is done here: "no,
our titles start with the ticket number". At the end of the session, the base plugin
files the corrections that look like a standard as an issue for the curators. You don't
have to do anything else. When a correction is only true for this project, also ask
Claude to put it in `CLAUDE.md`, so the next session knows it now. When a project's
corrections must not leave it, set `"STEWARD_COLLECT": "off"` under `env` in its
settings.

[The base](../reference/the-base.md) lists what each part reads, writes and sends.
