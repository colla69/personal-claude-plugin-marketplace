# Verdicts

One reading per skill, from the lines in `results.jsonl`. The reading is a number and
a plain statement. The decision to keep, rework or retire is taken in the pull request,
by a curator.

Rule: keep when the mean Δ is above the noise floor and the lower end of the 90%
interval is above 0. Otherwise rework once, then retire.

| Plugin | Suite line | Mean Δ | Reading | Open |
|---|---|---|---|---|
| `language-conventional-commits` | line 1 | +0.67 (3 runs) | The skill makes the model use the format. The prompt never asks for the format, so this shows less than it seems. | A second case where the prompt asks for the format |
| `language-java` | not stored | 0.00 on seven cases | No lift: the model passed the cases without the skill. The skill loaded in 0 of 25 runs on plain prompts. | The description never fires; rework it, then measure the rules the model gets wrong |
| `language-javascript` | line 2 | +0.10 (5 runs) | Two cases kept after nine were dropped for passing at 0.87 to 1.00 without the skill. Logging through the project logger: Δ +0.27, interval 0.00 to +0.53. Skipping bad input quietly: Δ −0.07, interval −0.20 to +0.07, and its baseline moved from 0.73 to 0.93 between runs. | One rule shows a lift. The module, export and async rules show none. Rework or retire is for the pull request |
