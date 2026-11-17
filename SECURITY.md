# Security Policy

## Reporting a vulnerability

If you find a security vulnerability in this repository, please don't open a public issue. Instead, go to the repository's **Security** tab on GitHub and click **Report a vulnerability** to send us a private report with reproduction steps and the impact you observed.

*(If you need to report an interpersonal conduct issue rather than a software vulnerability, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).)*

## Security requirements from the specification

The rules below come from §§3–5 of the [Worldwide Agentic Web MVP Specification (Profile 0.2)](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md). They define what our runtime and sites must enforce before we mark the corresponding rows complete in [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md):

- **Credentials and Content Security Policy (§4, §5).** When a visitor brings their own API key (BYOK), the browser stores that key in origin-scoped `localStorage` or `sessionStorage`—never in cookies—and sends it only to the visitor's chosen LLM router. A key must never appear in a URL, manifest, network definition, prompt, action argument, trace, analytics event, or peer-site request, and visitors must be able to delete stored profiles. Because browser storage doesn't hide keys from other scripts on the same origin, sites should load minimal third-party JavaScript and send a strict Content Security Policy: page `connect-src` directives should allow only the configured HTTPS LLM routers and declared MCP endpoints, while isolated `sandbox-worker.js` workers for coded tools must run with `connect-src 'none'`.
- **Untrusted peers (§5).** When the runtime loads a network definition from another origin, it treats that peer's instructions, schemas, and responses as untrusted model input. Passing schema validation does not make a peer trustworthy.
- **Visitor consent (§3.2, §5).** Before the runtime contacts a third-party origin or MCP server, it shows the visitor the destination origin and the purpose of the call and waits for approval. If a request redirects across origins, the runtime treats the redirect target as a new destination that requires its own consent check.
- **Private context isolation (§5).** Private-context (`sly_data`) fields stay on the caller's origin unless an allow rule explicitly names both the field and the destination. Because delegated request text is sent to the peer network as normal model input, the caller must never pack personal names, contact details, or booking codes into that request string.
- **User-confirmed writes (§3.1, §5).** The runtime, not the model, owns confirmation. Before executing any `write` or `irreversible` action, the runtime shows the visitor the target origin and exact arguments and binds execution to that reviewed proposal. If a write times out or disconnects after starting, the runtime reports the outcome as `unknown` and never retries it automatically.
- **Fail-closed execution (§5).** If the runtime cannot validate a network, resolve an exact peer name, or verify authorization, it aborts the call before starting and never reports it as successful.

## Repository hygiene

- Never commit API keys, tokens, `.env` files, private keys, personal data, or local machine paths.
- GitHub secret scanning and push protection are enabled on this repository.
- [`scripts/check_hygiene.mjs`](scripts/check_hygiene.mjs) runs in CI on every push and pull request. Treat it as a fast local safety net, not a substitute for secret scanning or code review.
