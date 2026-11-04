# Verdicts

One reading per skill, from the lines in `results.jsonl`. The reading is a number and
a plain statement. The decision to keep, rework or retire is taken in the pull request,
by a curator.

Rule: keep when the mean Δ is above the noise floor and the lower end of the 90%
interval is above 0. Otherwise rework once, then retire.

| Plugin | Suite line | Mean Δ | Reading | Open |
|---|---|---|---|---|
| `language-conventional-commits` | line 1 | +0.67 (3 runs) | The skill makes the model use the format. The prompt never asks for the format, so this shows less than it seems. | A second case where the prompt asks for the format |
| `language-java` | not stored | 0.00 on seven cases | No lift: the model passed the cases without the skill. The skill loaded in 0 of 25 runs on plain prompts. | Removed on 2026-11-04 (D84) |
| `language-javascript` | line 2 | +0.10 (5 runs) | Two cases kept after nine were dropped for passing at 0.87 to 1.00 without the skill. Logging through the project logger: Δ +0.27, interval 0.00 to +0.53. Skipping bad input quietly: Δ −0.07, interval −0.20 to +0.07, and its baseline moved from 0.73 to 0.93 between runs. | Removed on 2026-11-04 (D84) |
| `language-typescript` | line 3 | −0.03 (5 runs) | No lift on three cases (`readonly` lists, `readonly` fields with `type`, no unchecked index), after four of seven drafted cases were dropped for passing at 0.90 to 1.00 without the skill. In the one case checked by hand, the skill did not load on a plain prompt, so with and without are the same run. | Removed on 2026-11-04 (D84) |
| `universal-clean-code` | line 5 | +0.05 (5 runs) | The skill loaded in 3 of 20 runs, all in one case. There it cut five parameters to one object: 0.90 with the skill, 0.50 without. In the other three cases (commented-out code, error messages that name the remedy, one source for a shared rule) it never loaded, so they measured nothing. The model kept commented-out code in every run of both arms. | Cut to the parameter rule on 2026-11-04 (D83). The trimmed skill, line 6: 1.00 with, 0.50 without, in every run (Δ +0.50, interval +0.50 to +0.50). Keep |
| `language-swift` | line 4 | +0.05 (5 runs) | No lift on two cases (no force unwrap on a value the caller guarantees, a counter shared by many tasks), after nine of eleven drafted cases were dropped for passing at 0.90 to 1.00 without the skill. Whether the skill loaded was not checked. | Removed on 2026-11-04 (D84) |
