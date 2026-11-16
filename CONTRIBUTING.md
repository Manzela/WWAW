# Contributing

## During the competition

This repository is an entry in the Open Agentic Web Challenge. The
[Official Rules](https://cognizant-agenticweb.devpost.com/rules) require that a submission be
"solely owned by the Entrant … with no other person or entity having any right or interest in it".

So, until the Judging Period ends (2027-01-18, 17:00 Pacific Time):

- **Issues are welcome:** bug reports, questions and feedback.
- **Pull requests from people outside the entrant team cannot be merged.** Please open an issue instead.

After judging ends, this policy will be revisited.

## Team workflow

1. Branch from `main` with a short, descriptive name, such as `feat/site-actions` or `docs/ground-truth`.
2. Base every factual statement on a source listed in [docs/GROUND_TRUTH.md](docs/GROUND_TRUTH.md). Add new sources there first.
3. Update [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md) only with evidence.
4. Run the hygiene check before pushing:
   ```bash
   node scripts/check_hygiene.mjs --self-test
   node scripts/check_hygiene.mjs
   ```
5. Write short, factual commit messages. Commit history is public and permanent.

## Public-content rules

- No API keys, tokens, `.env` files, personal data or local machine paths.
- No unpublished business plans, private conversations, or third-party material without permission.
- Describe only what exists. Mark planned work as planned.
- Use sponsor and partner names only to refer to their public specifications and tools. Do not use their logos.
