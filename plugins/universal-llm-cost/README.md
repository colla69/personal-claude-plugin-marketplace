# universal-llm-cost

A call to a language model is billed per token, on every request, and a feature that
is cheap in the demo can cost a hundred times more on real input. So every call gets
three bounds when it is written: the smallest model that does the task, a cap on the
output, and a limit on the input.

| | |
|---|---|
| Skill | `llm-cost` |
| Layer | Universal |
| Builds on | nothing |

## Fires when

- Code that calls a language model API, in an app, a script or a tool
- "add AI to", "summarize with Claude", "the API bill is too high"
- A model call that takes user content or a database field as input

## Leaves to others

- Model choice and limits, to the project's own rules, which win.
- Prompt caching and stored results, which the model already does without a rule.

## Install

Docking installs it in any repo that calls a language model API, whether or not it is
an app. By hand:

```bash
claude plugin install universal-llm-cost@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/llm-cost/SKILL.md`](skills/llm-cost/SKILL.md)
