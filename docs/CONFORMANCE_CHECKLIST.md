# Conformance Checklist: Worldwide Agentic Web MVP Profile 0.2

This checklist tracks every requirement in the [Worldwide Agentic Web MVP Specification (Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md) (pinned at upstream commit `e4a8727`) and the [Official Rules](https://cognizant-agenticweb.devpost.com/rules).

**Nothing below is built yet.** Only change a row's status from `Not started` to `Done` when you can link concrete evidence: an automated test, a recorded browser trace, or a deployed URL. For source citations and known specification conflicts (`C1–C9`), see [GROUND_TRUTH.md](GROUND_TRUTH.md).

Allowed status values: `Not started` · `In progress` · `Done (evidence: …)` · `Not applicable (reason: …)`

## A. Stage One pass/fail gate (Official Rules §4 and §6)

| # | Requirement | Status |
| --- | --- | --- |
| A1 | A public URL serves the open agentic website over HTTPS | Not started |
| A2 | A publicly accessible, conforming `.json` agent network definition | Not started |
| A3 | A `runtime` file that runs the network in the visitor's browser | Not started |
| A4 | An interface where visitors or agents can interact with the network | Not started |
| A5 | The agent network interacts with the website itself | Not started |
| A6 | Optional: an interface for configuring LLMs and API keys (see [GROUND_TRUTH.md](GROUND_TRUTH.md) `C1`) | Not started |
| A7 | Optional under Rules §4 (required for Spec §6 `B4–B6`): calls other agentic websites and/or is callable by them | Not started |
| A8 | Free, unrestricted judge access until `2027-01-18 17:00 PT` (see [GROUND_TRUTH.md](GROUND_TRUTH.md) `C2` and [OPEN_DECISIONS.md](OPEN_DECISIONS.md) `OD-2`) | Not started |

## B. MVP interoperability checks (Spec §6)

| # | Check | Status |
| --- | --- | --- |
| B1 | Publish a two-agent HOCON/JSON network and `agent-manifest.json` from an ordinary HTTPS host | Not started |
| B2 | Run the network in a browser with the site's published default router and model; if BYOK is offered, also demonstrate the visitor-selected key path | Not started |
| B3 | Call an internal specialist agent and at least one grounded capability (via MCP or a registered local site action) | Not started |
| B4 | After visitor approval, load an exact named network from a second origin and run it locally in the caller's browser | Not started |
| B5 | With a visitor BYOK key active, prove the second origin never receives the key and cannot override the caller's router | Not started |
| B6 | Prove private context (`sly_data`) is absent at the peer unless an allow rule explicitly names the field | Not started |
| B7 | Stop an invalid network, a composition cycle, an over-budget request, and a denied origin, each with a clear user-visible error | Not started |

## C. Public files and artifacts (Spec §3.3, §3.4)

| # | Requirement | Status |
| --- | --- | --- |
| C1 | `agent-manifest.json` lists each published network with `name`, `front_man`, and `hocon` | Not started |
| C2 | `agent-manifest.json` includes top-site LLM router metadata and peer policy (required by §3.3, not optional) | Not started |
| C3 | Each resolved `.json` network definition is pure data: no local file includes, environment substitutions, or publisher-only filesystem paths (§2, §2.2) | Not started |
| C4 | `links.json` maps symbolic peer references to concrete network URLs | Not started |
| C5 | Public artifacts allow cross-origin `GET` (CORS), and fetching them sends no private credentials (§3.4) | Not started |
| C6 | Optional coded-tool bundle (`coded_tools.bundle`): declared in the manifest, executed only inside an isolated Web Worker (`connect-src 'none'`), and verified with Subresource Integrity (SRI) when a digest is present | Not applicable unless used |
| C7 | Optional local site-actions module (`actions.module`, e.g., `./site-actions.js`) declared in `agent-manifest.json` | Not applicable unless used |
| C8 | Optional iframe action-bridge page (`actions.bridge`, e.g., `./bridge/action-bridge.html`) declared in `agent-manifest.json` (added in upstream `63a956c`) | Not applicable unless used |

## D. Runtime execution behavior (Spec §3.1, §3.2)

| # | Requirement | Status |
| --- | --- | --- |
| D1 | Reject malformed networks, duplicate or missing agent references, an invalid `front_man`, and unsupported executable definitions before making any model call | Not started |
| D2 | Execute the agent loop with streaming, tool calls, internal delegation, error propagation, and bounded conversation history | Not started |
| D3 | Obtain visitor approval before discovering or calling a third-party MCP service | Not started |
| D4 | Register local site actions with `name`, `purpose`, JSON Schema, `effect`, and handler; validate arguments; show destination and arguments before any `write` or `irreversible` operation *(Note: stock upstream `runner.js:356` skips confirmation on `write`—requires our `OD-5` runtime patch; see [GROUND_TRUTH.md](GROUND_TRUTH.md) `C8`)* | Not started |
| D5 | If a write times out or disconnects after starting, report its outcome as `unknown` and never repeat that write automatically | Not started |
| D6 | Enforce finite limits on composition depth, agent invocations, remote calls, concurrency, fetch timeouts, and total elapsed time | Not started |
| D7 | Resolve peers by exact network `name` from `<site base>/agent-manifest.json` and fail closed if there is no exact match | Not started |
| D8 | Repeat origin-policy and visitor-consent checks on every additional peer or MCP hop | Not started |

## E. Inference and credentials (Spec §4)

| # | Requirement | Status |
| --- | --- | --- |
| E1 | Run the network using the site's published default router and model | Not started |
| E2 | If BYOK is offered: let the visitor set the router base URL, model, and credential, and delete stored profiles | Not started |
| E3 | Ensure the credential never appears in a URL, manifest, network definition, prompt, action argument, trace, analytics event, cookie, or peer-site request | Not started |
| E4 | Run peer networks on the caller's router so peer router metadata never overrides the caller's configuration | Not started |
| E5 | If a required credential is missing, stop before the model call with a clear setup error | Not started |

## F. Security and privacy (Spec §5)

| # | Requirement | Status |
| --- | --- | --- |
| F1 | Treat peer network definitions and peer responses as untrusted model input | Not started |
| F2 | Name the destination origin and purpose in the consent prompt, and treat any cross-origin HTTP redirect as a new destination requiring consent | Not started |
| F3 | Scope any remembered approval ("Always allow") to the exact destination origin and session | Not started |
| F4 | Keep private context (`sly_data`) local unless a destination-scoped allow rule explicitly names the field | Not started |
| F5 | Keep MCP credentials separate from the LLM key and never forward caller MCP headers to peers automatically | Not started |
| F6 | Fail closed: if an invocation cannot be validated, resolved, or authorized, never start it and never report it as successful | Not started |
| F7 | Bind every executed `write` or `irreversible` action to the user-reviewed proposal (`action`, `origin`, `arguments`, `requestId`, signed receipt) *(Note: requires patching upstream `runner.js:356` per `OD-5` / `C8`)* | Not started |
| F8 | SHOULD: let the visitor inspect the active router, contacted origins, agent and tool calls, consent decisions, errors, and receipts without exposing secrets | Not started |
| F9 | SHOULD: minimize third-party scripts and serve a restrictive Content Security Policy (§4) | Not started |

## Notes for contributors

- Upstream's reference runtime (`skills/agentify-website/runtime/` at `63a956c`) documents several gaps of its own against this checklist—most notably skipping user confirmation on `write` actions (`D4`/`F7`), omitting fetch timeouts (`D6`), truncating consent cards at 140 characters (`F2`), and mirroring keys into a loopback cookie (`E3`). See [GROUND_TRUTH.md](GROUND_TRUTH.md) §7 and `OD-5` in [OPEN_DECISIONS.md](OPEN_DECISIONS.md).
- [`scripts/check_hygiene.mjs`](../scripts/check_hygiene.mjs) only scans the repository for leaked secrets, `.env` files, local paths, invalid JSON, and unresolved decision markers. It does not test specification conformance.
