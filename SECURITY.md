# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Use GitHub's private vulnerability
reporting instead: the **Security** tab of this repository, then **Report a vulnerability**.
Include reproduction steps and the impact you observed.

## Security requirements

These are design requirements taken from the
[MVP specification](https://github.com/cognizant-ai-labs/agentic-web/blob/e4a8727d5c6807233b8976f28494bbdac7bc1c6e/docs/worldwide_agentic_web_mvp_spec.md)
(§3–§5). They describe what the project must do, not what is implemented. Implementation status
is tracked in [docs/CONFORMANCE_CHECKLIST.md](docs/CONFORMANCE_CHECKLIST.md).

- **Credentials.** If BYOK is offered, the visitor's key stays in their browser. It is attached only to model requests sent to the selected router, and never placed in URLs, manifests, network definitions, prompts, action arguments, traces, analytics or peer-site requests. Visitors can delete stored profiles. BYOK does not isolate the key from other JavaScript on the same origin (§4), so keep third-party scripts to a minimum and send a restrictive Content Security Policy.
- **Untrusted peers.** Network definitions loaded from other sites are untrusted input to the model. Schema validation and sandboxing do not make them trustworthy.
- **Consent.** Before contacting a third-party origin, the runtime names the origin and the purpose of the request and obtains the visitor's approval. A cross-origin redirect counts as a new destination.
- **Private context.** Private-context fields cross an invocation only when explicitly named under an allow rule. Request text sent to another network is not filtered, so it must never contain names, contact details or booking codes.
- **Writes.** The runtime, not the model, owns confirmation. The visitor sees the destination and the arguments before any write or irreversible operation.
- **Fail closed.** Invocations that cannot be validated, resolved or authorized do not run and are never reported as successful.

## Repository hygiene

- Never commit API keys, tokens, `.env` files, personal data or local machine paths.
- GitHub secret scanning and push protection are enabled for this repository.
- [`scripts/check_hygiene.mjs`](scripts/check_hygiene.mjs) runs in CI on every push and pull request. It is a safety net with a limited pattern set, not a guarantee.
