<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Authentication

All endpoints require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer confai_live_<32 url-safe random bytes>
```

## Obtaining credentials

Tenants and API keys are provisioned by Confidential. To request access, [contact us](mailto:founders@confidential.ai). Self-service signup through the public API is not currently available.

When your tenant is created, you receive:

- A **tenant slug** (e.g. `acme`), which is used in your per-tenant subdomain (`{instance-name}.acme.confidential.ai`).
- One or more **API keys** of the form `confai_live_<random>`. Treat these as secrets — anyone with the key can provision and delete instances against your tenant.

## Errors

A missing, malformed, or unknown token returns:

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "error": {
    "code": "unauthenticated",
    "message": "missing or invalid Bearer token"
  }
}
```

A valid token used against a tenant or resource it is not authorized for returns `forbidden` (`403`). See [Conventions](conventions.md#error-codes) for the full list.
