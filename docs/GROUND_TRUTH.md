# Ground Truth Register

This file is the project's single reference for facts about the Open Agentic Web Challenge and
the Worldwide Agentic Web specification. Each entry cites a public primary source. If a fact is
not listed here with a source, treat it as unverified.

**Last verified:** 2026-11-16. Re-verify before each milestone. The upstream repository says it
"is actively evolving and its content changes frequently."

## 1. Primary sources

| Source | Location | Pinned state |
| --- | --- | --- |
| Official Rules (these take precedence over every other source) | https://cognizant-agenticweb.devpost.com/rules | Read on 2026-11-16 |
| Devpost overview | https://cognizant-agenticweb.devpost.com/ | Read on 2026-11-16 |
| Devpost resources and FAQ | https://cognizant-agenticweb.devpost.com/resources | Read on 2026-11-16 |
| Upstream repository | https://github.com/cognizant-ai-labs/agentic-web | `e4a8727` was the last commit before the Submission Period started. `63a956c` was HEAD on 2026-11-16. |
| MVP specification | [`docs/worldwide_agentic_web_mvp_spec.md`](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md) | "MVP Profile 0.2, 6 November 2026". Last modified in upstream commit `fd872b9` (2026-11-10). Unchanged between `e4a8727` and `63a956c`. |
| Neuro SAN HOCON reference (named normative by the spec, §2 and §8) | https://github.com/cognizant-ai-lab/neuro-san/blob/main/docs/agent_hocon_reference.md | Not pinned |
| Initiative site | https://worldwideagenticweb.org/ | Read on 2026-11-16 |

**Conformance target.** The Rules require conformance to the specification "published at
https://github.com/cognizant-ai-labs/agentic-web as of the start of the Submission Period". That
means the spec file at upstream commit `e4a8727`.

## 2. Timeline (Official Rules §1)

| Event | Date and time (Pacific Time) |
| --- | --- |
| Submission Period | Wed 2026-11-11 20:00 → Mon 2027-01-11 08:00 |
| Judging Period | Mon 2027-01-11 10:00 → Mon 2027-01-18 17:00 |
| Winners announced | On or around Tue 2027-01-19 08:00 |

## 3. What a submission must contain (Official Rules §4)

The public URL of an open agentic website that contains:

- a publicly accessible, conforming `.json` file that describes an agent network and its capabilities;
- a `runtime` file that can run the agent network in the browser;
- an interface that lets users or agents interact with the agent network;
- *optionally*, an interface that lets users configure LLMs and keys;
- an agent network that can interact with the website. Interacting with other agentic websites, or being called by them, is optional.

Also required:

- A text description of the features and functionality.
- A demo video under 2 minutes. It must be public on YouTube and show the project running in a browser. The Rules say it "should include the Entrant explaining the Project". The Devpost overview is stricter: "must include the Entrant explaining the Project (not AI generated)". Meet the stricter wording. No third-party trademarks, copyrighted music or other material without permission.
- One or more screenshots.
- If the project uses Otari: the email on the Otari account, and one or two sentences on a problem met while using Otari and how it could improve (Devpost overview).
- All materials in English, or with English translations.

**Testing access (Rules §4, "Testing").** The project must be available "free of charge and without
any restriction" for testing by the Sponsor, Administrator and Judges until the Judging Period
ends. Judges may also judge only from the text, images and video.

**New and existing work.** A project must be new, or significantly updated after the Submission
Period starts, with an explanation of the update.

## 4. Judging (Official Rules §6)

- **Stage One:** pass/fail. Is the project a conforming open agentic website, as described in the Submission Requirements?
- **Stage Two:** four criteria with equal weight, in this order (the order also breaks ties):
  1. **Technological Implementation:** how well the project is built, and how effectively it uses the open agentic web specification.
  2. **Design:** a complete, coherent product experience, not just a technical proof of concept.
  3. **Potential Impact:** a credible, specific case for a real problem and a real audience, backed by what is demonstrated. This criterion also covers tools or services built and shared with the community while creating the project.
  4. **Quality of the Idea:** a creative, non-obvious use of an open agentic website, and a genuine understanding of the problem space.
- Evaluation "may utilize expert panels, peer review, automated AI-driven analysis, or any combination thereof."

## 5. Eligibility, ownership and IP (Official Rules §3, §4, §7, §11)

- The submission must be the Entrant's original work and solely owned by the Entrant (individual, Team or Organization), "with no other person or entity having any right or interest in it".
- Open-source components are allowed if their licenses are followed, and only if the submission "creates software that enhances and builds upon" them.
- Third-party SDKs, APIs and data need authorization under their terms.
- A project developed with financial or preferential support from the Sponsor is ineligible. Employees of the Sponsor, Partners and their affiliates may win only the Employee Prize, and may not submit work done as part of their job duties.
- Hackathon trademarks, logos and materials belong to the Sponsor and/or Administrator. Use them in a submission only as the Rules allow.
- Devpost FAQ: any LLM may be used "as long as your project itself is open source". "The agents have to run in the browser but they can leverage backend services."

## 6. Specification facts the project relies on (MVP Profile 0.2)

- **Three tenets:** a common multi-agent representation (§2), browser execution and site composition (§3), and pluggable inference (§4). Cross-cutting security and privacy rules are in §5.
- **Required public files (§3.3):**
  - `agent-manifest.json`: one or more networks with `name`, `front_man` and `hocon`, plus top-site LLM router metadata and peer policy.
  - A resolved network definition, serialized as JSON.
  - `links.json`.
  - A coded-tool bundle is optional.
- **Inference (§4, §6):** BYOK is optional. A runtime can conform without it when the site's published default inference path runs the network. The §6 interoperability checks run the network "with the site's published default router and model"; the BYOK path is shown only "if BYOK is offered".
- **Peer loading (§3.2):** a peer URL is `<site base>/<network name>`. The runtime fetches `<site base>/agent-manifest.json`, requires an exact name match, and runs the peer network in the caller's browser on the caller's router. HTTPS is required except during local development.
- **Private context (§5):** private-context (`sly_data`) fields do not cross invocations by default. "The delegated request text is ordinary input to the destination network and is not filtered as private context."
- **Writes (§3.1, §5):** before a write or irreversible operation, the runtime shows the user the destination and arguments. The runtime, not the model, owns confirmation.
- **Execution is tab-scoped (§1.1).** Scheduled, event-driven, background or durable tasks need a hosted runtime or another service.
- **MVP interoperability checks (§6)**, demonstrated "without publisher-specific integration code":
  1. Publish a two-agent HOCON network and a manifest from an ordinary HTTPS web host.
  2. Run it in a browser with the site's default router and model. If BYOK is offered, also show the user-selected path.
  3. Call an internal agent and at least one grounded capability, through MCP or a registered local site action.
  4. After user approval, load an exact named network from a second origin and run it in the caller's browser.
  5. With a user key active, show that the second site never receives the key and cannot change the caller's router.
  6. Show that private context is absent at the peer unless a named field is explicitly allowed.
  7. Stop an invalid network, a composition cycle, an over-budget request and a denied origin, each with a visible error.

## 7. Reference runtime facts (upstream `skills/agentify-website`, at `63a956c`)

These describe the upstream reference runtime, not this repository. Source:
`skills/agentify-website/SKILL.md`, `references/linking.md` and `runtime/README.md`.

- The runtime is a patched copy of the nsdeploy browser runtime (Apache-2.0) at nsdeploy commit `53a787c`. It was updated after the Submission Period started (upstream commit `ccb98da`, 2026-11-12).
- Per-message limits: 4 partner calls, 1 call per partner network, 24 agent calls and 90 s. Calls nest at most 5 deep.
- A partner network runs with the request text only, with no chat history and no `sly_data`. It never gets the caller's or the partner's `website_*` site tools.
- Limitations the upstream documents itself:
  - `write` actions run without showing the visitor first, "which the spec does not allow".
  - The consent card shows only the first 140 characters of a request.
  - The runtime sets no timeout on fetching a partner's files.
  - On `localhost` and `127.0.0.1`, keys are also saved in a cookie that any local site can read.
- An upstream test measured about 2,500 tokens for one partner call.
- Static bundles call the LLM router straight from the browser, so the router must allow CORS. Hosted Otari, OpenAI, OpenRouter, LiteLLM and local Ollama do. Anthropic does with conditions (upstream `docs/providers/`).

## 8. Conflicts and ambiguities between sources

| # | Topic | What the sources say | Working position |
| --- | --- | --- | --- |
| C1 | LLM/key configuration interface | Rules: optional. Upstream README "What" section: listed as a component of an open agentic website, with no "optional" qualifier. Spec: BYOK optional; the default router is the primary path. | The Rules prevail (§11). Build a working default inference path. Decide BYOK separately. |
| C2 | Who pays for inference | Upstream README: "the site host does not pay for LLM calls". Spec §4: a site MAY publish a publisher-funded default router. Rules: judges get access "free of charge and without any restriction". | Open question for the organizers (tracked as OD-2 in [OPEN_DECISIONS.md](OPEN_DECISIONS.md)). A BYOK-only demo may be read as restricted access. |
| C3 | Demo video narration | Rules: "should include the Entrant explaining". Overview: "must include … (not AI generated)". | Follow the stricter wording. |
| C4 | Prize total | Devpost: $10,000 in cash. Initiative FAQ: "$13,000 builder event". | Consistent: $10,000 cash plus $3,000 in Otari credits ($1,500 + $750 + $500 + $250), per Rules §8. |
| C5 | Agent `tools` field | Spec §2.1: each agent has "a list of agents or tools it may call". The official pizza example network omits `tools` on two leaf agents. | Validate with the reference tooling, not with a stricter custom reading. |
| C6 | Private links in the spec | §1 and §4 link "Neuro SAN HOCON" and "runtime-supported router" to a private SharePoint document. | Use the public Neuro SAN HOCON reference (§2, §8). |
| C7 | §3.2 protocol list | Items 3 ("Model compatibility policies") and 8 ("Interactive MCP authentication") read as future work, but sit inside the numbered protocol. §5 "Destination-scoped private-context policies" has no MUST/SHOULD keyword. | Treat as extensions unless the organizers say otherwise. |
| C8 | Reference runtime vs spec on writes | Spec §3.1 and §5 require confirmation before writes. The upstream runtime documents that `write` actions run without it. | Unmodified reuse inherits a documented non-conformance. |
| C9 | Tracks | Initiative FAQ describes two tracks (agentifying websites; technology components). The Rules define one prize pool and no tracks. | No track selection is required. |

The Rules (§11) say that an Entrant who finds a term ambiguous "must submit a written request for
clarification". Channels listed on the Devpost resources page: the Devpost Discussions tab, and the
upstream repository's issues and discussions.
