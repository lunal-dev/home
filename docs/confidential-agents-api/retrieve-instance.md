<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Retrieve Instance

```http
GET /v1/instances/{name}
```

Returns the full record for one instance. Use this endpoint to poll provisioning status and to read current state.

There are no webhooks for instance state changes — poll this endpoint instead.

## Path parameters

| Parameter | Description |
| --- | --- |
| `name` | The 8-character generated instance name, e.g. `4k9p2xq7`. |

## Response — `200 OK`

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": "venice-job-2026-05-03-001",
  "data": {
    "name": "4k9p2xq7",
    "status": "ready",
    "agent": "openclaw",
    "hostname": "4k9p2xq7.acme.confidential.ai",
    "inference_mode": "default_gateway",
    "inference_model": "<model-id>",
    "custom_inference_endpoint": null,
    "egress_limit_bytes": 5368709120,
    "failure_code": null,
    "failure_message": null,
    "terminated_reason": null,
    "created_at": "2026-05-01T20:14:22Z",
    "ready_at": "2026-05-01T20:18:33Z",
    "terminated_at": null
  }
}
```

## Status enum

| Value | Meaning |
| --- | --- |
| `provisioning` | Instance is being claimed or cold-started. |
| `ready` | SSH is reachable and claim-time setup has completed. Run in-CVM verification to confirm attestation before trusting the workload. |
| `failed` | Provisioning failed terminally. `failure_code` and `failure_message` may be populated. |
| `terminating` | Delete is in progress. |
| `terminated` | Resources have been released. The record and name reservation are retained for at least 30 days. |

## Egress

Each instance has a hard 5 GB egress limit per its lifetime. The platform monitors per-VM network egress and enforces the limit at the instance firewall layer once the threshold is observed. `egress_limit_bytes` is reported on every instance record.

## Inference fields

`inference_mode` is `default_gateway` for Confidential-hosted inference and `custom` for customer-supplied inference. When `inference_mode` is `custom`, `custom_inference_endpoint` contains the configured endpoint URL. Custom API keys are never returned.

## Errors

| Code | HTTP | When |
| --- | --- | --- |
| `not_found` | `404` | Instance does not exist or belongs to another tenant. |
| `unauthenticated` | `401` | Missing or invalid Bearer token. |
