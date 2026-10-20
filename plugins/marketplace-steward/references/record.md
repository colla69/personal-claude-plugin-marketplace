# The record

`.claude/steward.json` records what the steward did in a project. A later run uses it
to tell apart a file the steward wrote and nobody has touched since, a file the user
has changed, and a file the steward never wrote, and to tell something the user
removed from something that was never there. Without it, a refresh either overwrites
the user's work or never happens at all, and what the user took out comes back.

```json
{
  "steward": "<version, for the report only>",
  "files": {
    ".claude/agents/change-plan.md": {
      "from": "roles/plan.md",
      "template": "<sha256 of roles/plan.md when the file was built>",
      "fill": {
        "TASK": "change",
        "WHAT_THE_TASK_DOES": "<as filled in>",
        "skills": ["universal-clean-code:clean-code"],
        "effort": "high"
      },
      "sha256": "<sha256 of the file as written>"
    },
    "AGENTS.md": { "sha256": "<hash>" }
  },
  "plugins": ["universal-clean-code@personal-claude-plugin-marketplace"],
  "declined": ["<a proposed skill the user said no to, in one line>"],
  "pending": [
    { "path": ".claude/rules/api.md", "rule": "<the rule, quoted>",
      "home": "<plugin:skill>", "pr": "<the pull request>" }
  ]
}
```

- **`steward`** is the `version` of the entry whose `id` starts with
  `marketplace-steward@` in `claude plugin list --json`. It changes on every push to
  the marketplace, so it is for the report only and decides nothing.
- **`files`** holds every file the steward *created*, keyed by its path from the
  project root. A file that existed before the steward came, such as an `AGENTS.md`
  it improved, is never listed: listing it would claim the user's file as the
  steward's.
  - **`sha256`** is the hash of the content exactly as written, from
    `sha256sum <path>`.
  - For a generated agent or run skill, **`from`** names its template in `set-up/`,
    **`template`** is that template's hash when the file was built, and **`fill`** is
    every placeholder value, the `skills:` list and the `effort`, so a rebuild is exact.
- **`plugins`** lists every plugin the steward installed, and **`declined`** every new
  skill the user said no to.
- **`pending`** lists every rule an adoption left where it was because its home is a
  contribution with an open pull request: the file it is in, the rule exactly as it
  stands there, the skill or template it is going to, and the pull request.

## Using it

- **A file whose hash no longer matches was changed by someone else.** It is never
  rebuilt or rewritten whole. A check that names one line in it, such as a skill name
  that no longer resolves, may fix that line. The user's edit outranks a newer
  template.
- **Refresh an entry only when its hash matched before your edit.** Refreshing the
  entry of a file the user changed would make their file look untouched, and the next
  rebuild would overwrite it.
- **What is in the record and gone from the project was removed by the user.** A
  recorded trio whose files are gone, or a recorded plugin whose key is gone, stays
  gone. A declined skill is not proposed again.
- **No record means nothing is rebuilt.** A project set up before the record existed
  has files nobody can tell apart, so they are all treated as the user's.

Write the record last, after the files it describes. It is committed with the rest of
`.claude/`, because it is how the steward on the next machine knows what this one did.
