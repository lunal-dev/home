<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Conventions

## Response envelope

Every JSON response is wrapped in a consistent envelope. On success:

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": "venice-job-2026-05-03-001",
  "data": { }
}
```

On error:

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "error": {
    "code": "invalid_request",
    "message": "public_key must be an ed25519 or ecdsa OpenSSH public key",
    "param": "public_key"
  }
}
```

- `request_id` — server-generated identifier for this HTTP request. Always present. Quote it when contacting support.
- `correlation_id` — the value of the `X-Correlation-ID` request header if you sent one, otherwise `null`.
- `error.param` — present when the error maps cleanly to a single request field.
- `error.message` — safe to surface to end users.

The same `request_id` is mirrored in the `X-Request-ID` response header. If you supplied an `X-Correlation-ID`, it is echoed back in `X-Correlation-ID` on the response.

## Request IDs and Correlation IDs

The API generates the canonical `request_id` for every request. Clients cannot choose it. If you send `X-Request-ID`, it is ignored and a fresh server-side ID is generated.

To tag requests for your own tracking, send `X-Correlation-ID`:

```http
X-Correlation-ID: venice-job-2026-05-03-001
```

Correlation IDs are not required to be unique and the server does not enforce a format.

## Error codes

| Code | HTTP | Meaning |
| --- | --- | --- |
| `invalid_request` | `400` | Malformed or invalid input. |
| `unauthenticated` | `401` | Missing or invalid Bearer token. |
| `forbidden` | `403` | Token is valid but not allowed for this tenant or resource. |
| `not_found` | `404` | Resource does not exist, or belongs to another tenant. |
| `conflict` | `409` | State or idempotency conflict. |
| `internal_error` | `500` | Unexpected server error. Quote `request_id` when reporting. |

## Per-tenant subdomain

Each tenant is assigned a slug at onboarding and gets a dedicated subdomain:

```
{customer-slug}.confidential.ai
```

All instances are addressable as:

```
{instance-name}.{customer-slug}.confidential.ai
```

Example:

```
4k9p2xq7.acme.confidential.ai
```

## Instance names

Instances are identified by an auto-generated `name` scoped to your tenant.

- **Format:** 8-character lowercase alphanumeric string (e.g. `4k9p2xq7`).
- **Uniqueness:** Names are unique within a tenant.
- **Reuse:** Names are not reused for at least 30 days after termination, so a stored reference cannot silently point at a different instance.
- **Custom names:** Customer-supplied instance names are not currently supported.
