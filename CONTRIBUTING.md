# Contributing

## During the competition

This repository is our team's entry in the Open Agentic Web Challenge. Section 4 of the [Official Rules](https://cognizant-agenticweb.devpost.com/rules) requires that a submission be "solely owned by the Entrant … with no other person or entity having any right or interest in it".

Because merging outside code could cloud ownership and disqualify the entry, we follow two simple rules until the Judging Period ends on **Monday, 2027-01-18 at 17:00 Pacific Time**:

- **Issues are welcome.** If you spot a bug, have a question, or want to share feedback, please open an issue.
- **Outside pull requests can't be merged.** Only the two registered team members can commit to this repository during the competition. Once judging ends, we'll open the repository to normal community pull requests.

## How our team works

1. Cut a branch from `main` with a short, clear name like `feat/site-actions` or `docs/ground-truth`.
2. If you state a fact about the competition or specification, make sure it's backed by a source in [docs/GROUND_TRUTH.md](docs/GROUND_TRUTH.md). If you find a new primary source or a conflict between sources, log it there first, and record scope or governance decisions in [docs/OPEN_DECISIONS.md](docs/OPEN_DECISIONS.md).
3. Keep rows in [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md) marked `Not started` until you can point to a passing test, a browser trace, or a live URL.
4. Before you push, run the hygiene check:
   ```bash
   node scripts/check_hygiene.mjs --self-test
   node scripts/check_hygiene.mjs
   ```
   *(On `review/*` and `audit/*` branches, `check_hygiene.mjs` reports pending pre-merge markers like `OD-1` in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) as deferred notices and exits `0`. On `main`, any unresolved marker fails with exit code `1`.)*
5. Write short, factual commit messages. Remember that git history on a public repo is permanent.

## What belongs in public commits

- Never commit API keys, tokens, `.env` files, personal data, or local filesystem paths.
- Keep unpublished competitive strategy, private transcripts, and third-party material without permission out of git.
- Describe only what the code actually does today, and label planned work as planned.
- Use sponsor, partner, and third-party names only to cite their public specifications or tools, and never use their logos or trademarks.
