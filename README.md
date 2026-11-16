# WWAW Challenge

**WWAW Challenge** is our team's independent entry in the [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/):
an open agentic website built to the
[Minimum Viable Specification for a Worldwide Agentic Web (MVP Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md).

> [!NOTE]
> This is an independent project built by a two-person team. "WWAW" here is only our project's short name. It is not affiliated with or endorsed by the
> challenge sponsor, its partners, or the World Wide Agentic Web initiative. Product and
> organization names are used only to refer to their public specifications and tools.

## Status

**Pre-implementation.** The repository holds the project's grounding documents and hygiene
tooling. No agent network, runtime or website has been published yet. This section will link the
live site and demo video once they exist.

## What the challenge asks for

From the [Official Rules](https://cognizant-agenticweb.devpost.com/rules): a publicly accessible
open agentic website that contains a conforming `.json` agent network definition, a browser
`runtime` that runs it, and an interface for users or agents to interact with it. The agent network
must interact with the website. An LLM/key settings interface and links to other agentic websites
are optional.

The specification defines three tenets:

1. **Common multi-agent representation (§2).** Agent networks are published as resolved, data-only
   definitions that follow the
   [Neuro SAN HOCON data model](https://github.com/cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md),
   serialized as JSON for browser loading.
2. **Browser execution and site composition (§3).** A JavaScript runtime in a normal web page runs
   the network. It calls registered site actions and MCP tools, and with the visitor's approval
   loads a named network from another site to run locally.
3. **Pluggable inference (§4).** The agent graph is independent of the inference service. A site
   publishes a default router and model, and may also let visitors bring their own key (BYOK).

## Repository guide

| Path | Purpose |
| --- | --- |
| [docs/GROUND_TRUTH.md](docs/GROUND_TRUTH.md) | Verified facts about the challenge and the spec, with sources, pinned versions and known conflicts |
| [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md) | Requirement-by-requirement target checklist with evidence-based status |
| [scripts/check_hygiene.mjs](scripts/check_hygiene.mjs) | Blocks committed `.env` files, common credential formats, local paths and unresolved decision markers; checks JSON syntax |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | Runs the hygiene self-test and scan on every push and pull request |
| [SECURITY.md](SECURITY.md) | Security requirements and how to report a vulnerability |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution policy during the competition |

## Hygiene check

Requires Node.js 22 or newer (the version CI uses).

```bash
node scripts/check_hygiene.mjs --self-test
node scripts/check_hygiene.mjs
```

The hygiene check does not validate specification conformance. Conformance will be checked with
the upstream reference tooling, as described in
[docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md).

## References

- [Open Agentic Web Challenge: Official Rules](https://cognizant-agenticweb.devpost.com/rules)
- [cognizant-ai-labs/agentic-web](https://github.com/cognizant-ai-labs/agentic-web): specification, examples and the `agentify-website` skill
- [World Wide Agentic Web initiative](https://worldwideagenticweb.org/)

## License

[Apache License 2.0](LICENSE)
