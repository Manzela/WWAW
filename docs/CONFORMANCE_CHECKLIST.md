# Conformance Checklist: Worldwide Agentic Web MVP Profile 0.2

This is the target checklist. **Nothing below is implemented yet.** Update a row's status only
when there is evidence: a test, a recorded browser check, or a deployed URL. Spec references point
to the MVP specification at upstream commit
[`e4a8727`](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md).
See [GROUND_TRUTH.md](GROUND_TRUTH.md) for sources and known conflicts.

Status values: `Not started` · `In progress` · `Done (evidence: …)` · `Not applicable (reason: …)`

## A. Stage One gate (Official Rules §4 and §6)

| # | Requirement | Status |
| --- | --- | --- |
| A1 | A public URL serves the open agentic website over HTTPS | Not started |
| A2 | A publicly accessible, conforming `.json` agent network definition | Not started |
| A3 | A `runtime` file that runs the network in the browser | Not started |
| A4 | An interface for users or agents to interact with the network | Not started |
| A5 | The agent network interacts with the website | Not started |
| A6 | Optional: an LLM/key configuration interface (see GROUND_TRUTH C1) | Not started |
| A7 | Optional: calls other agentic websites and/or is callable by them | Not started |
| A8 | Free, unrestricted judge access until 2027-01-18 17:00 PT (see GROUND_TRUTH C2) | Not started |

## B. MVP interoperability checks (spec §6)

| # | Check | Status |
| --- | --- | --- |
| B1 | Publish a two-agent HOCON network and a manifest from an ordinary HTTPS host | Not started |
| B2 | Run it in a browser with the site's published default router and model; if BYOK is offered, also show the user-selected path | Not started |
| B3 | Call an internal agent and at least one grounded capability (MCP or a registered local site action) | Not started |
| B4 | After user approval, load an exact named network from a second origin and run it locally | Not started |
| B5 | With a user key active, the second site never receives the key and cannot change the caller's router | Not started |
| B6 | Private context is absent at the peer unless a named field is explicitly allowed | Not started |
| B7 | An invalid network, a composition cycle, an over-budget request and a denied origin each stop with a visible error | Not started |

## C. Public files (spec §3.3, §3.4)

| # | Requirement | Status |
| --- | --- | --- |
| C1 | `agent-manifest.json` lists each network with `name`, `front_man` and `hocon` | Not started |
| C2 | `agent-manifest.json` includes top-site LLM router metadata and peer policy (required content, not optional) | Not started |
| C3 | The resolved network definition is data only: no local includes, environment substitutions or publisher-only paths (§2, §2.2) | Not started |
| C4 | `links.json` maps symbolic peer references to concrete network URLs | Not started |
| C5 | Public artifacts allow cross-origin GET (CORS), and their requests carry no private credentials (§3.4) | Not started |
| C6 | Optional coded-tool bundle: declared in the manifest, run only in an isolated Web Worker, SRI checked when a digest is supplied | Not applicable unless used |

## D. Runtime behavior (spec §3.1, §3.2)

| # | Requirement | Status |
| --- | --- | --- |
| D1 | Reject a malformed network, duplicate or missing agent references, an invalid front agent and unsupported executable definitions before any model call | Not started |
| D2 | Agent loop with streaming, tool calls, delegation, error propagation and bounded history | Not started |
| D3 | Ask for approval before discovering or calling a third-party MCP service | Not started |
| D4 | Local site actions: name, purpose, JSON Schema, effect, handler; validate arguments; show destination and arguments before a write or irreversible operation | Not started |
| D5 | Report a timeout or disconnect after a write starts as an unknown outcome; never repeat such a write | Not started |
| D6 | Finite limits on composition depth, agent invocations, remote calls, concurrency and elapsed time | Not started |
| D7 | Peer resolution by exact network name from `<site base>/agent-manifest.json`; fail if there is no exact match | Not started |
| D8 | Every additional peer or MCP hop repeats the origin-policy and consent checks | Not started |

## E. Inference and credentials (spec §4)

| # | Requirement | Status |
| --- | --- | --- |
| E1 | A published default router and model run the network | Not started |
| E2 | If BYOK is offered: the user can set the router base URL, model and credential, and delete stored profiles | Not started |
| E3 | The key appears in no URL, manifest, network definition, prompt, action argument, trace, analytics event or peer-site request | Not started |
| E4 | A peer inherits the caller's router; peer router metadata never overrides it | Not started |
| E5 | A missing required key stops the model call with a clear setup error | Not started |

## F. Security and privacy (spec §5)

| # | Requirement | Status |
| --- | --- | --- |
| F1 | Peer network definitions are treated as untrusted model input | Not started |
| F2 | Consent names the destination origin and the purpose; a cross-origin redirect counts as a new destination | Not started |
| F3 | A remembered approval is scoped to the destination origin, for the current session | Not started |
| F4 | Private context crosses an invocation only through named fields under an allow rule | Not started |
| F5 | MCP credentials stay separate from the LLM key and are never transferred automatically | Not started |
| F6 | Fail closed: invocations that cannot be validated, resolved or authorized never start and are never reported as successful | Not started |
| F7 | User-owned writes: the executed action is bound to the reviewed proposal (action, origin, arguments, request ID, receipt) | Not started |
| F8 | SHOULD: expose the router, contacted origins, agent and tool calls, consent decisions, errors and receipts without secrets | Not started |
| F9 | SHOULD: minimize third-party scripts and send a restrictive Content Security Policy (§4) | Not started |

## Notes

- Upstream's reference runtime documents gaps against D4/F7 and an unbounded partner-file fetch (no timeout). See GROUND_TRUTH §7 and C8. Reusing it unchanged inherits these gaps.
- `scripts/check_hygiene.mjs` checks repository hygiene only. It does not test anything in this checklist.
