# Contributing to WWAW

Thank you for contributing to **WWAW** and building open, interoperable building blocks for the [World Wide Agentic Web](https://worldwideagenticweb.org/).

## Contribution Principles

- **Open & Portable:** All published agent networks must conform to the [WWAW MVP Specification (Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/main/docs/worldwide_agentic_web_mvp_spec.md).
- **Data-Only Definitions:** Published `*.network.json` artifacts must have all HOCON `include` directives and `${...}` environment substitutions fully resolved before committing.
- **Public-Safe Hygiene:** This is an open-source, public competition repository. Never commit API keys, tokens, `.env` files, personal identifiable information (PII), or local machine paths.

## Workflow

1. **Fork & Branch:** Create a focused feature branch from `main` (e.g., `feat/agent-network`, `fix/action-schema`, `docs/architecture`).
2. **Develop & Document:** Keep code modular, preserve clear docstrings, and keep agent instructions grounded in explicit site state or declared capabilities.
3. **Validate Locally:** Run the repository validation suite before opening a pull request:
   ```bash
   node scripts/validate_wwaw.mjs
   ```
4. **Commit & PR:** Use concise, descriptive commit messages (e.g., `feat: add schema-validated site action bridge`) and summarize what was tested in your pull request description.

## Pre-Submission & PR Checklist

- [ ] `node scripts/validate_wwaw.mjs` passes with exit code `0`.
- [ ] No hardcoded credentials, test keys, personal emails, or absolute local file paths appear in code, configs, or docs.
- [ ] Any `agent-manifest.json` declares `name`, `front_man`, and `hocon` for each network and sets explicit `allowed_peers` / `peer_policy` boundaries.
- [ ] Any `*.network.json` uses valid JSON, defines unique agent `name`s, valid JSON Schema `function.parameters`, grounded `instructions`, and explicit `tools` lists.
- [ ] Browser UI flows work cleanly over static HTTPS/HTTP hosting with CORS compatibility and user-controlled BYOK inference.
