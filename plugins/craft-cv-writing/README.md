# craft-cv-writing

A CV has two readers: a keyword search that reads every word literally, and a person who
skims for eight seconds. Every line has to work for both, and every fact has to be one
the owner can defend.

| | |
|---|---|
| Skill | `write-cv` |
| Layer | Craft |
| Builds on | `universal-work-discipline` |

## Fires when

- Writing, sharpening, restructuring or tailoring a CV, résumé or profile
- Preparing a CV for a job ad
- Reviewing a CV — "make my CV ATS-friendly", "rewrite my profile"

## Leaves to others

- **How much to change, and what to say you left.** `work-discipline`, in
  `universal-work-discipline`: change only what was asked.
- **The language the CV is written in.** A Language skill, such as `simple-english` for
  English prose.
- **Reviewing the CV as a piece of work.** `review-work`, in `craft-review`.
- The owner's own wording, and the conventions of the CV's country, which win where they
  differ from this skill.

## Install

Set-up installs it at project scope when the project keeps a CV or résumé as a document
that gets written or tailored there. By hand:

```bash
claude plugin install craft-cv-writing@personal-claude-plugin-marketplace --scope project
```

Project scope only: it is noise in a project with no CV.

## More

- The standard itself:
  [`skills/write-cv/SKILL.md`](skills/write-cv/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
