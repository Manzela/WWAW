# Security Policy

## Security Architecture & Threat Boundaries

This project adheres to the security, privacy, and trust-boundary requirements of the [Worldwide Agentic Web MVP Specification (Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/main/docs/worldwide_agentic_web_mvp_spec.md):

1. **BYOK Credential Isolation**
   - Visitor-supplied API keys remain strictly in origin-scoped browser `localStorage` and are attached only to model inference requests targeting the user-selected LLM router.
   - Credentials are **never** stored in `agent-manifest.json`, `*.network.json`, `links.json`, URLs, prompts, action arguments, analytics, or peer-site requests.
   - Users must always be able to inspect and delete stored BYOK profiles in the browser UI.

2. **Untrusted Peer Instructions & Origin Consent**
   - Cross-origin peer `*.network.json` definitions are treated as **untrusted input** to the caller's inference model. Schema validation does not imply trust in a peer publisher's instructions.
   - Before any third-party manifest fetch, peer-network resolution, or MCP discovery/invocation, the runtime identifies the destination origin and purpose and enforces explicit user consent.
   - Cross-origin HTTP redirects are evaluated as new destinations under the same origin and consent policies.

3. **Private Context (`sly_data`) & Site Actions**
   - Private context is separate from chat transcripts and is **deny-by-default** across agent-site boundaries. Only explicitly permitted fields may cross boundaries.
   - Local site actions are validated against declared JSON Schemas. Write or irreversible actions require explicit user confirmation showing destination and arguments before execution.
   - Optional coded-tool bundles (when used) are restricted to isolated Web Workers and verified against Subresource Integrity (SRI) digests when declared.

4. **Zero-Secret Public Repository Policy**
   - Never commit `.env` files, API tokens, personal credentials, private keys, or local filesystem paths.
   - Every push and pull request is automatically checked by `scripts/validate_wwaw.mjs` via GitHub Actions.

## Reporting a Vulnerability

If you discover a security vulnerability, credential-exposure risk, or spec-boundary bypass:

- **Do not** disclose the issue publicly in standard GitHub issues or pull requests.
- Use GitHub's **Private Vulnerability Reporting** ("Security" tab → "Report a vulnerability") on this repository to share reproduction steps and impact details securely with the maintainers.

We aim to acknowledge reports promptly and publish fixes transparently once coordinated.
