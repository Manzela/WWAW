# WWAW Challenge

**WWAW Challenge** is our two-person team's independent entry in the [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/), built to conform to the [Minimum Viable Specification for a Worldwide Agentic Web (MVP Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md).

> [!NOTE]
> This is an independent project by a two-person team. "WWAW" here is just our project's short name. We aren't affiliated with or endorsed by the challenge sponsor, its partners, or the World Wide Agentic Web initiative, and we use product and organization names only to refer to their public specifications and tools.

## Status

**Pre-implementation.** Right now, this branch holds our source-of-truth register, conformance checklist, and repository hygiene checks. We haven't published the agent network, browser runtime, or live website yet. When those are live, we'll link the deployed URL and demo video here.

## What the challenge asks for

Under the [Official Rules](https://cognizant-agenticweb.devpost.com/rules), a submission is a public open agentic website that serves a conforming `.json` agent network definition, a browser `runtime` that executes it, and an interface where visitors or agents can use it. The agent network has to interact with the website itself. Interfaces for configuring LLM keys and links to other agentic websites are optional under the Rules, though the specification's §6 interoperability checks test both.

The specification rests on three tenets and a shared security model:

1. **Common multi-agent representation (§2).** Sites publish agent networks as resolved, data-only JSON files that follow the [Neuro SAN HOCON data model](https://github.com/cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md).
2. **Browser execution and site composition (§3).** A JavaScript runtime in an ordinary web page loads and runs the network. It calls local site actions and MCP tools, and if the visitor approves, it fetches a named network from another origin and runs that peer network locally in the visitor's browser.
3. **Pluggable inference (§4).** The agent graph doesn't depend on a single model provider. Each site publishes a default router and model, and if the site offers bring-your-own-key (BYOK), visitors can switch to their own provider and credentials.
4. **Security and privacy boundaries (§5).** The runtime treats peer networks as untrusted model input. Before it contacts another origin, it shows the visitor the destination and purpose and waits for consent. Private context (`sly_data`) stays on the host origin unless an allow rule names the exact field, and the runtime—not the LLM—confirms every write or irreversible action with the user.

## Repository guide

| Path | What it's for |
| --- | --- |
| [docs/GROUND_TRUTH.md](docs/GROUND_TRUTH.md) | Verified facts about the challenge and specification, with primary sources, pinned commits, and logged conflicts (`C1–C9`) |
| [docs/OPEN_DECISIONS.md](docs/OPEN_DECISIONS.md) | Open (`OD-1..OD-3`) and resolved (`OD-4..OD-7`) project decisions |
| [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md) | Requirement-by-requirement checklist (`A1–F9`) where status changes only when backed by test or deployment evidence |
| [scripts/check_hygiene.mjs](scripts/check_hygiene.mjs) | Scans the repo for `.env` files, API keys, private keys, local machine paths, invalid JSON, and unresolved decision markers |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | Runs the hygiene self-test and repository scan on every push and pull request |
| [SECURITY.md](SECURITY.md) | How to report a vulnerability privately, plus the specification's §3–§5 security requirements |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Why external pull requests are paused during the competition, and how our two-person team works on branches |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Contributor Covenant v2.1 code of conduct (carries the `OD-1` contact placeholder until we merge to `main`) |

## Running the hygiene check

You'll need Node.js 22 or newer (the same version CI runs).

```bash
node scripts/check_hygiene.mjs --self-test
node scripts/check_hygiene.mjs
```

> [!NOTE]
> If you run `check_hygiene.mjs` on a `review/*` or `audit/*` branch (or pass `--audit`), it prints pending decision markers like `OD-1` in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) as deferred pre-merge notices and exits `0`. If you run it on `main`, any unresolved decision marker fails the check with exit code `1`.

The hygiene script only checks repository safety. To check Worldwide Agentic Web specification conformance, we use the upstream reference tooling and the checks tracked in [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md).

## References

- [Open Agentic Web Challenge: Official Rules](https://cognizant-agenticweb.devpost.com/rules)
- [cognizant-ai-labs/agentic-web](https://github.com/cognizant-ai-labs/agentic-web) — specification, reference runtime, examples, and the `agentify-website` skill
- [World Wide Agentic Web initiative](https://worldwideagenticweb.org/)

## License

[Apache License 2.0](LICENSE)
