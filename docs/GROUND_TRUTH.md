# Ground Truth Register

This file is our single source of truth for facts about the Open Agentic Web Challenge and the Worldwide Agentic Web specification. Every entry cites a public primary source. If a claim isn't listed here with a source, treat it as unverified until you check it yourself.

**Last verified:** 2026-11-17. Because the upstream repository notes that it "is actively evolving and its content changes frequently," re-check upstream `HEAD` before each build milestone.

## 1. Primary sources

| Source | Location | Pinned state |
| --- | --- | --- |
| Official Rules (these take precedence over every other source, per §11) | https://cognizant-agenticweb.devpost.com/rules | Read in full on 2026-11-16 |
| Devpost overview | https://cognizant-agenticweb.devpost.com/ | Read in full on 2026-11-16 |
| Devpost resources and FAQ | https://cognizant-agenticweb.devpost.com/resources | Read in full on 2026-11-16 |
| Upstream repository | https://github.com/cognizant-ai-labs/agentic-web | Commit `e4a8727` was the last commit before the Submission Period opened. Commit `63a956c` was `HEAD` on 2026-11-16. |
| MVP specification | [`docs/worldwide_agentic_web_mvp_spec.md`](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md) | "MVP Profile 0.2, 6 November 2026" (518 lines). Last modified in upstream commit `fd872b9` (2026-11-10) and unchanged between `e4a8727` and `63a956c`. |
| Neuro SAN HOCON reference (named normative by Spec §2 and §8) | https://github.com/cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md | Public reference on `main` |
| Initiative website | https://worldwideagenticweb.org/ | Read in full on 2026-11-16 |

**Conformance target.** Section 4 of the Official Rules requires conformance to the specification "published at https://github.com/cognizant-ai-labs/agentic-web as of the start of the Submission Period." That pins our normative specification target to upstream commit `e4a8727`.

## 2. Competition timeline (Official Rules §1)

| Event | Date and time (Pacific Time) |
| --- | --- |
| Submission Period | Wed 2026-11-11 20:00 → Mon 2027-01-11 08:00 |
| Judging Period | Mon 2027-01-11 10:00 → Mon 2027-01-18 17:00 |
| Winners announced | On or around Tue 2027-01-19 08:00 |

## 3. What a valid submission must contain (Official Rules §4)

We must submit the public URL of an open agentic website that includes:

- a publicly accessible, conforming `.json` file that describes an agent network and its capabilities;
- a `runtime` file that runs the agent network in the visitor's browser;
- an interface that lets people or agents interact with the agent network;
- *optionally*, an interface that lets visitors configure LLMs and API keys; and
- an agent network that interacts with the website itself (calling other agentic websites, or being called by them, is optional under the Rules, though required to demonstrate Spec §6 checks `B4–B6`).

Our Devpost submission package must also include:

- A clear text description of the project's features and how it works.
- A public YouTube demo video under 2 minutes showing the project running in a browser. While the Official Rules say the video "should include the Entrant explaining the Project," the Devpost overview states it "must include the Entrant explaining the Project (not AI generated)." We follow the stricter rule: record real human narration, and never include third-party trademarks, logos, or copyrighted music without permission.
- One or more screenshots of the working application.
- If we use Otari: the email address on our Otari account, plus one or two sentences describing a problem we ran into with Otari and how it could be improved (per the Devpost overview).
- All submission materials in English.

**Judge testing access (Official Rules §4, "Testing").** The live site must remain available "free of charge and without any restriction" for testing by the Sponsor, Administrator, and Judges until the Judging Period ends on `2027-01-18 17:00 PT`. Note that judges may also evaluate the submission from the text description, screenshots, and video alone.

**New vs. existing work.** Submissions must either be newly created during the Submission Period or significantly updated after the Submission Period opened, with a clear explanation of what changed.

## 4. How submissions are judged (Official Rules §6)

- **Stage One (Pass/Fail):** Does the submission provide a working, conforming open agentic website that meets the §4 Submission Requirements?
- **Stage Two (Scored Criteria):** Projects that pass Stage One are scored across four equally weighted criteria (25% each). If there is a tie, the criteria are compared in this exact order:
  1. **Technological Implementation:** How well the software is engineered and how effectively it uses the Worldwide Agentic Web specification.
  2. **Design:** Whether the project delivers a complete, coherent product experience rather than a bare technical proof of concept.
  3. **Potential Impact:** Whether the project makes a credible, concrete case for solving a real problem for a real audience—including reusable tools or services built and shared with the community along the way.
  4. **Quality of the Idea:** Whether the project shows a creative, non-obvious use of open agentic websites and a genuine grasp of the problem space.
- The Rules note that judging "may utilize expert panels, peer review, automated AI-driven analysis, or any combination thereof."

## 5. Eligibility, IP ownership, and third-party components (Official Rules §3, §4, §7, §11)

- **Sole ownership:** The submission must be our team's original work and solely owned by us, "with no other person or entity having any right or interest in it."
- **Open-source libraries:** We can use open-source packages as long as we follow their licenses and build software that meaningfully enhances and builds upon them.
- **Third-party APIs and data:** Any third-party SDK, API, or dataset must be used in compliance with its terms of service.
- **No sponsor funding or employer claims:** Projects built with financial or preferential support from the Sponsor are ineligible, and work done as part of an employer's job duties cannot be submitted.
- **Trademarks:** Hackathon trademarks and logos belong to the Sponsor and Administrator, and third-party corporate trademarks cannot appear in the site or video without permission.
- **LLMs and backend services (Devpost FAQ):** Any LLM is allowed "as long as your project itself is open source," and while "the agents have to run in the browser," they "can leverage backend services."

## 6. Core specification rules we build against (MVP Profile 0.2)

- **Three tenets and security model:** Common multi-agent representation (§2), browser execution and site composition (§3), pluggable inference (§4), and cross-cutting security and privacy rules (§5).
- **Required public files (§3.3):**
  - `agent-manifest.json` declaring one or more networks (`name`, `front_man`, `hocon`), top-site LLM router metadata, and peer policy.
  - A resolved, data-only `.json` network definition (no local file includes, environment variables, or publisher-only filesystem paths).
  - `links.json` mapping symbolic peer references to concrete network URLs.
  - Optional artifacts: a coded-tool bundle (`coded_tools.bundle`, executed in an isolated Web Worker and checked with Subresource Integrity when a digest is present), a local site-actions module (`actions.module`, e.g., `./site-actions.js`), and an iframe action bridge (`actions.bridge`, e.g., `./bridge/action-bridge.html`).
- **Inference (§4, §6):** BYOK is optional. A site conforms when its published default router and model run the network. Spec §6 check 2 runs the network "with the site's published default router and model" and tests BYOK only "if BYOK is offered."
- **Peer loading (§3.2):** A peer reference takes the form `<site base>/<network name>`. After the visitor consents, the runtime fetches `<site base>/agent-manifest.json`, requires an exact match on the network's `name`, and runs the peer network locally in the caller's browser using the caller's router. HTTPS is required everywhere except local development.
- **Private context (§5):** Private-context (`sly_data`) fields never cross to a peer by default. However, "the delegated request text is ordinary input to the destination network and is not filtered as private context," so the caller must keep secrets and personal identifiers out of delegated prompt strings.
- **Writes (§3.1, §5):** Before running any `write` or `irreversible` action, the runtime must show the visitor the destination and arguments and wait for confirmation. If a write times out or disconnects after starting, the runtime reports its outcome as `unknown` and never repeats the write automatically.
- **Tab-scoped execution (§1.1):** Browser execution lives inside the open tab. Background jobs, webhooks, or durable state across sessions require a hosted service.
- **Seven MVP interoperability checks (§6):** Demonstrated without publisher-specific integration glue:
  1. Publish a two-agent HOCON/JSON network and `agent-manifest.json` from an ordinary HTTPS host.
  2. Run it in a browser with the site's default router and model (and show the user-selected path if BYOK is offered).
  3. Call an internal agent and at least one grounded capability via MCP or a registered local site action.
  4. After user approval, load an exact named network from a second origin and run it in the caller's browser.
  5. With a user key active, show that the second site never receives the key and cannot override the caller's router.
  6. Show that private context (`sly_data`) is absent at the peer unless an allow rule explicitly names the field.
  7. Stop an invalid network, a composition cycle, an over-budget request, and a denied origin, each with a visible error.

## 7. Upstream reference runtime facts (`skills/agentify-website` at `63a956c`)

These facts describe the upstream reference runtime in `cognizant-ai-labs/agentic-web`, which we inspected at commit `63a956c`:

- **Origin:** It is a patched copy of the `nsdeploy` browser runtime (Apache-2.0, `nsdeploy` commit `53a787c`), updated after the Submission Period opened (upstream commit `ccb98da`, 2026-11-12).
- **Per-message budgets:** Up to 4 partner calls, 1 call per partner network, 24 total agent calls, 90 seconds elapsed time, and a maximum composition depth of 5. An upstream test measured roughly 2,500 tokens for a single partner call.
- **Partner tool visibility and Action Bridge (`63a956c`):** When a partner network runs in the caller's browser, it receives only the delegated request string—no chat history, no `sly_data`, and no direct `website_*` DOM tools (`runner.js:201` checks `!ctx.isTop`). Upstream commit `63a956c` added `runtime/action-transport.js` and `bridge/action-bridge.html` so a site can bridge local actions over `postMessage` inside an iframe (`actions.bridge`). Crucially, `runner.js:368-383` (`entry.kind === "coded"`) has **no `isTop` check**, which means a peer's `coded_tools.bundle` executes locally inside the caller's isolated `ToolSandbox` Web Worker today.
- **Domain-alias callback loop gotcha (`references/linking.md:44-50`):** If a partner calls back into a site using a hostname alias (such as `www.` vs. bare domain, or `localhost` vs. `127.0.0.1`) that doesn't match the caller's exact origin string, the runtime treats it as an external partner hop and re-runs the network without `website_*` tools.
- **Gaps that upstream documents itself (`SKILL.md`, `runtime/README.md`):**
  - `write` actions run without prompting the visitor first (`runner.js:356-358` checks only `effect === "irreversible"`), which upstream notes "the spec does not allow."
  - The consent card displays only the first 140 characters of the delegated request.
  - Fetching a partner's manifest, network, or bundle has no timeout (`AbortSignal.timeout` is missing).
  - On `localhost` and `127.0.0.1`, `byok.js` mirrors API keys into a browser cookie that any other local port can read.
- **Browser CORS and Otari model rules (`docs/providers/otari.md`, commit `d955a64`):** Because the browser calls the LLM router directly, the router must allow CORS (hosted Otari, OpenAI, OpenRouter, LiteLLM, and local Ollama do; Anthropic requires specific headers). Upstream commit `d955a64` switched the default reference model to `alibaba/qwen3.8-flash`. On hosted Otari, `alibaba/qwen3-14b` and `alibaba/qwen3-30b-a3b` return HTTP `400` if the request omits `max_tokens` / `max_completion_tokens`.

## 8. Logged conflicts and ambiguities between sources (`C1–C9`)

| # | Topic | What the sources say | Our working position |
| --- | --- | --- | --- |
| C1 | LLM/key configuration UI | Official Rules §4: optional. Upstream README ("What" section): listed without "optional." Spec §4/§6: BYOK is optional; the site's default router is the primary path. | The Official Rules take precedence (§11). Build a working default router path first, and decide BYOK support separately. |
| C2 | Who pays for inference (`OD-2`) | Upstream README: "the site host does not pay for LLM calls." Spec §4: a site MAY publish a publisher-funded default router. Official Rules §4: judges must have access "free of charge and without any restriction." | Tracked as `OD-2` in [OPEN_DECISIONS.md](OPEN_DECISIONS.md). Because requiring judges to supply a key could be read as restricted access, wait for organizer clarification while designing a capped default path. |
| C3 | Demo video narration | Official Rules §4: video "should include the Entrant explaining the Project." Devpost overview: "must include the Entrant explaining the Project (not AI generated)." | Follow the stricter rule: record real human voice narration showing live browser execution under 2 minutes. |
| C4 | Total prize pool | Devpost header: \$10,000 in cash. Initiative FAQ: "\$13,000 builder event." | Both are right: Official Rules §8 break this down as \$10,000 in cash plus \$3,000 in Otari API credits (\$1,500 + \$750 + \$500 + \$250). |
| C5 | Agent `tools` array on leaf agents | Spec §2.1 says each agent has "a list of agents or tools it may call," but the official upstream pizza example omits `tools` on two leaf agents. | Follow upstream reference validator semantics: treat `tools` as optional on leaf agents so valid upstream networks pass. |
| C6 | Private SharePoint links in the spec | Spec §1 and §4 link "Neuro SAN HOCON" and "runtime-supported router" to a private Microsoft SharePoint URL. | Use the public Neuro SAN HOCON reference cited in Spec §2 and §8 (`cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md`). |
| C7 | Future-looking items inside §3.2 and §5 | Spec §3.2 items 3 ("Model compatibility policies") and 8 ("Interactive MCP authentication") read as roadmap items inside the numbered protocol, and §5 "Destination-scoped private-context policies" uses no RFC 2119 `MUST`/`SHOULD` keyword. | Treat §3.2(3) and §3.2(8) as optional extensions unless organizers clarify otherwise, and support destination-scoped private-context rules per §5 `F4`. |
| C8 | Reference runtime vs. spec on `write` confirmation | Spec §3.1 and §5 require user confirmation before both `write` and `irreversible` actions, while upstream `runner.js:356-358` only prompts on `irreversible`. | Reusing the upstream runtime unpatched violates Spec §3.1/§5. Tracked in [OPEN_DECISIONS.md](OPEN_DECISIONS.md) (`OD-5`) so non-read actions require confirmation in our runtime fork. |
| C9 | Tracks vs. single prize pool | The initiative FAQ mentions two tracks (agentifying websites vs. technology components), while the Official Rules define a single prize pool with no tracks. | No track selection is needed. |

Under Official Rules §11, if an entrant finds an ambiguous term, they "must submit a written request for clarification." The Devpost resources page lists two official channels: the Devpost Discussions tab and the issues/discussions on `cognizant-ai-labs/agentic-web`.
