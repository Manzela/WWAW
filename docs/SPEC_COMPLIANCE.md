# WWAW MVP Profile 0.2 Compliance Reference

This document details how components in this repository align with the [Minimum Viable Specification for a Worldwide Agentic Web (MVP Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/main/docs/worldwide_agentic_web_mvp_spec.md) and the evaluation criteria of the [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/).

## 1. Conformance Matrix

### Tenet 1: Common Multi-Agent Representation

| Requirement | Implementation Standard |
| --- | --- |
| Canonical Data Model | Follows the [Neuro SAN HOCON Reference](https://github.com/cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md), serialized as resolved JSON (`*.network.json`) for browser loading. |
| Resolved Artifact | Zero local file `include` directives, zero environment variable substitutions (`${...}`), and zero server-local file paths. |
| Agent Schema | Top-level `tools` array with unique `name`, `function.description`, JSON Schema `function.parameters`, grounded `instructions`, and explicit downstream `tools`. |
| Private Context (`sly_data`) | Deny-by-default across agent-site boundaries; only explicitly allow-listed fields pass upstream or downstream. |

### Tenet 2: Browser Execution & Site Composition

| Requirement | Implementation Standard |
| --- | --- |
| Browser Container | Executes purely in standard browser JavaScript (ES modules) without requiring a proprietary server-side agent runtime. |
| Parse & Validate | Rejects malformed definitions, missing front agents, duplicate names, and broken tool references prior to model invocation. |
| Bounded Execution | Enforces finite limits on composition depth, agent invocations, remote calls, concurrency, and elapsed wall-clock time. |
| Same-Origin Site Actions | Registered with name, purpose, JSON Schema input, effect classification, and handler; write/irreversible actions require explicit user confirmation. |
| Cross-Origin Peer Loading | Resolves peer URLs (`<site-base>/<network-name>`) via `<site-base>/agent-manifest.json` with exact network-name matching, CORS compliance, and explicit user consent before contact. |
| Outcome Accuracy | Distinguishes HTTP/tool transport responses from verified business outcomes; reports mid-write timeouts or disconnects as unknown without blind client-side retries. |

### Tenet 3: Pluggable Inference (BYOK)

| Requirement | Implementation Standard |
| --- | --- |
| Inference Independence | Agent definitions remain completely decoupled from inference funding and provider routing. |
| Visitor Control | When BYOK is enabled, users configure router base URL, model identifier, and API key directly in the browser (supporting Mozilla Otari, OpenAI-compatible routers, OpenRouter, or local Ollama). |
| Credential Hygiene | Keys reside in origin-scoped browser `localStorage`, are attached only to selected router requests, and are never forwarded to peer sites, prompts, manifests, or logs. |
| Caller Precedence | A loaded peer network inherits the caller's active router, model policy, and execution limits; peer manifests cannot override the active router. |

### Cross-Cutting Security & Privacy

| Requirement | Implementation Standard |
| --- | --- |
| Untrusted Peer Prompting | Peer network instructions are treated as untrusted model input and cannot bypass caller policies or consent boundaries. |
| Optional Coded-Tool Bundles | When declared, coded-tool bundles execute strictly inside isolated Web Workers with restrictive CSP and SRI digest verification when provided. |
| Explicit Consent Destinations | Consent prompts surface the target origin and purpose; redirects to a new origin re-trigger consent evaluation. |

---

## 2. Required Public Artifacts

When publishing a live open agentic website from this repository, the public bundle must expose the following static HTTP(S) resources with appropriate CORS headers for cross-origin interoperability:

1. **`agent-manifest.json`**
   - Maps each published network to `name`, `front_man` (public entry agent), and `hocon` (path or URL to the resolved `*.network.json` file).
   - Declares `peer_policy` / `allowed_peers` and optional `actions`, `brand`, or `router` metadata.
2. **`<network>.network.json`**
   - Resolved, data-only Neuro SAN network graph fetched from the path declared in `agent-manifest.json`.
3. **`links.json`**
   - Publisher-owned default map resolving symbolic peer-network names to concrete HTTPS peer URLs (`version` + `networks`). Caller overrides are persisted only in browser storage.
4. **Browser `runtime/` & Interactive UI**
   - Provides conversational interaction, live agent activity visibility, confirmation gates for site actions, and visitor-accessible AI model/BYOK configuration.

---

## 3. Hackathon Evaluation Alignment

The Open Agentic Web Challenge evaluates entries across four criteria:

- **Technological Implementation:** Clean adherence to WWAW MVP Profile 0.2, schema-validated site actions, consent-gated cross-origin peer composition, and automated validation (`scripts/validate_wwaw.mjs`).
- **Design:** Coherent end-to-end browser UX combining site workflows, interactive agent chat, transparent activity traces, and frictionless BYOK controls.
- **Potential Impact:** Practical real-world problem solving coupled with reusable open-source tooling and clear documentation that other builders can adopt immediately.
- **Quality of the Idea:** Purposeful, non-obvious application of decentralized browser-executed agent networks collaborating across open web origins.
