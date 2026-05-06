<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Create Instance

```http
POST /v1/instances
```

Provisions a new confidential VM under your tenant. Returns `202 Accepted` with the generated instance `name`. Provisioning typically completes within a few minutes; poll [Retrieve Instance](retrieve-instance.md) until `status` flips from `provisioning` to `ready`.

## Headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | yes | `Bearer <api-key>`. See [Authentication](authentication.md). |
| `Idempotency-Key` | recommended | Prevents duplicate provisioning on retry. See below. |
| `X-Correlation-ID` | optional | Client-supplied tag echoed back on the response. |

### Idempotency-Key

`Idempotency-Key` prevents duplicate side effects when retrying `POST /v1/instances`. It is **not** a request ID and **not** a correlation ID — each retry still receives a fresh `request_id`.

- A duplicate request within 24 hours returns the original result and does **not** provision a second CVM.
- The response body is the original API result, but `request_id` and `correlation_id` reflect the current attempt.
- Reusing the same `Idempotency-Key` with a different request body returns `409 conflict`.

## Request body

```json
{
  "public_key": "ssh-ed25519 AAAAC3... user@example",
  "agent": "openclaw",
  "inference_mode": "default_gateway",
  "inference_model": "<model-id>"
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `public_key` | string | yes | OpenSSH-formatted public key. Must be `ssh-ed25519` or `ecdsa-sha2-*`. `ssh-rsa` is rejected. |
| `agent` | string | no | Packaged agent to install. Defaults to `openclaw`. Currently `openclaw` is the only supported value. |
| `inference_mode` | string | no | Inference routing mode. Defaults to `default_gateway`. Currently `default_gateway` is the only supported value. |
| `inference_model` | string | no | Model identifier to use through the default inference gateway. Defaults to the configured platform default. |

## Response — `202 Accepted`

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "data": {
    "name": "4k9p2xq7",
    "status": "provisioning",
    "agent": "openclaw",
    "claim_path": "cold",
    "hostname": "4k9p2xq7.acme.confidential.ai",
    "public_key": "ssh-ed25519 AAAAC3... user@example",
    "inference_mode": "default_gateway",
    "inference_model": "<model-id>",
    "egress_limit_bytes": 5368709120,
    "created_at": "2026-05-01T20:14:22Z"
  }
}
```

Once `status` reaches `ready`, connect over SSH:

```bash
ssh <hostname>
```

If your SSH client requires an explicit user or key path:

```bash
ssh -i <private-key-path> azureuser@<hostname>
```

## Errors

| Code | HTTP | When |
| --- | --- | --- |
| `invalid_request` | `400` | `public_key` is missing or not an ed25519/ecdsa OpenSSH key, or an unsupported `agent` or `inference_mode` was supplied. |
| `unauthenticated` | `401` | Missing or invalid Bearer token. |
| `conflict` | `409` | The same `Idempotency-Key` was reused with a different request body. |
