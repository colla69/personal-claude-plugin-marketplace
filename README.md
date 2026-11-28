# personal-claude-plugin-marketplace

Standards for working with Claude Code, written once and reused in every project. Each
standard is a skill, and a skill stays only while a measurement shows that it changes
what the model does.

## Try it

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

Then open a session in a project and say "dock this project". The steward reads the
project, writes a short `CLAUDE.md` and installs the standards the project needs. It
never touches git, so branch first.

## What's inside

| Plugin | What it does |
|---|---|
| `universal-clean-code` | How good code is written: names, functions, comments, boundaries |
| `universal-work-discipline` | How work is done and reported where someone else maintains it |
| `universal-llm-cost` | Every call to a language model bounded by model, output and input |
| `craft-development` | Test first, bugs reproduced before they are fixed, checks before "done" |
| `craft-shipping` | Starting, judging and handing over an app, and replacing files on a live server |
| `language-simple-natural-language` | Plain English, German and Italian that nobody can misread |
| `language-conventional-commits` | Commit messages in the Conventional Commits format |
| `tools-vue` | Vue 3 Composition API conventions |
| `tools-appkit` | AppKit conventions for macOS apps |
| `marketplace-steward` | Docks a project and answers questions about the standards |
| `marketplace-base` | Runs in every docked project: an index of the standards, a build-and-test guard, and a collector for corrections |
| `marketplace-curator` | Turns a lesson into a measured change, for the people who maintain this repo |

## Every rule is measured

Each skill comes with test tasks. They run with the skill and without it, and a rule
stays only when it changes the result. A rule the model already follows costs tokens in
every session and changes nothing, so it goes.

**[How a skill is measured](docs/measuring.md)** explains the method, and
[`measurements/`](measurements/) holds the numbers.

## It learns from use

When you correct Claude in a docked project, the base plugin files the correction as an
issue here. A curator turns it into a measured change, and the merge reaches every
docked project.

## Where it runs

| Project | Written in |
|---|---|
| [CVHost](https://github.com/colla69/CVHost) | Vue |
| [makeMyTaxes](https://github.com/colla69/makeMyTaxes) | Java |
| [PlayCryptoWithAI](https://github.com/colla69/PlayCryptoWithAI) | JavaScript |

## More

- [Getting started](docs/getting-started.md): dock a project and work in it
- [How it works](docs/how-it-works.md): the three plugins, and how the marketplace grows
- [How a skill is measured](docs/measuring.md): cases, lift and the stored runs
- [Contributing](CONTRIBUTING.md): change a standard or add one

## License

Apache License 2.0. See [LICENSE](LICENSE).
