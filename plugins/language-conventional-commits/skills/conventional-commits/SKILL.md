---
name: conventional-commits
description: Write commit messages in the Conventional Commits format — a type, an optional scope, a `!` for a breaking change, a short imperative description, a body that says why, and footers such as `BREAKING CHANGE:`. Use whenever writing, amending, squashing or reviewing a commit message, committing a change, or when the user mentions conventional commits, commitlint, semantic-release, a changelog generated from commits, or a `feat:` or `fix:` prefix. Also use when writing a pull request title in a project that squash-merges, since the title becomes the commit message, and when deciding which version a set of commits releases.
---

# Conventional Commits

Two readers read a commit message in this format: a person who searches the history,
and a tool that turns the history into a version number and a changelog. The person
forgives a vague message. The tool does not: a wrong type releases the wrong
version, and nobody notices until a caller breaks.

These rules follow the Conventional Commits 1.0.0 specification, with the type list
that most projects take from the Angular convention.

## The shape

```
<type>[(<scope>)][!]: <description>

[<body>]

[<footer>: <value>]
```

- The header is one line.
- Write the type and the scope in lowercase. The specification accepts any case, but
  the common linter rejects anything else.

## Choose the type

Choose the type by what the change does for a user of the software, not by which files
it touches.

| Type | Use it for | Release, with the common presets |
|---|---|---|
| `feat` | A new capability a user can see or call | Minor |
| `fix` | A bug a user can see, now corrected | Patch |
| `perf` | The same behavior, faster or with less memory | Patch |
| `refactor` | A change to the structure, with no change to behavior | None |
| `docs` | Documentation only | None |
| `test` | Tests only | None |
| `build` | The build system or the dependencies | None |
| `ci` | The CI configuration | None |
| `style` | Formatting only: whitespace, semicolons, quotes | None |
| `chore` | Other work that changes no source or test file | None |
| `revert` | The undo of an earlier commit | Patch |

If no single type fits, the commit holds two changes. Split it into two commits. A
`feat` that also fixes a bug hides the fix from the changelog.

Do not use `chore` for a change that has a better type. It is the type that says
nothing, so a history full of it is a history nobody can filter.

## Write the scope

The scope names the part of the project that changed: `fix(parser): …`.

- Use a scope the project already uses. Read the recent history and the linter's scope
  list first. A new scope for every commit filters nothing.
- Leave the scope out when the change spans the project. A wrong scope sends the reader
  to the wrong part.

## Write the description

- Write it in the imperative, as an instruction to the code: `fix: keep the session
  after a token refresh`, not `fixed session bug` or `fixes`.
- Start it in lowercase and end it without a period.
- Say what changes in behavior, not what you did to the files. `fix: update auth.js`
  names a file that the diff already shows, and says nothing a reader can search for.
- Keep the whole header to 72 characters, or to the limit the project's linter sets.
  Most views of the history cut off a longer header.

## Write the body and the footers

- The body says why the change was needed and what it does not do. The diff already
  says what changed. Wrap it at 72 characters.
- Write the body in the natural language the project uses, under that language's
  skill. Inside this format, its rules apply where the format leaves room.
- Footers follow the git trailer format: `Token: value`, with `-` in place of spaces in
  the token, as in `Reviewed-by:` or `Refs: #123`. `BREAKING CHANGE` is the one token
  with a space. Put every footer after the last blank line, and do not put a blank line
  between two footers.
- A revert has the header `revert: <the reverted header>` and a `Refs:` footer with the
  hash of the reverted commit.

## Squash merges

Where a project squash-merges its pull requests, the pull request title becomes the
commit header, and the commits on the branch leave the history. Then the title follows
every rule above, and the type covers the whole pull request. A branch whose commits
have three types is three pull requests, or one with the most significant type: `feat`
over `fix` over the others, and a breaking change marked whatever its type.

## Check before you commit

If the project has a commit linter, run it on the message before you commit. A commit
hook rejects the message later anyway, and a check on a squash title fails after the
review. Then read the header once more and ask the question the tool cannot: does this
type release the version a user would expect?

## Where this yields

- **To the project's own configuration.** Its linter configuration or contributing
  guide sets the types, the scopes, the case and the length. Where it differs from
  this skill, it wins.
- **To another format the project names.** Where the project's instructions name a
  different commit format, that format wins and this skill does not apply. An older
  history in another form does not count: a project that enabled this skill chose the
  format from then on.
- **To the release tool.** Where a project's release tool maps types to versions in
  its own way, its mapping wins over the table above.
