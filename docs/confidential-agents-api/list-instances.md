<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# List Instances

```http
GET /v1/instances
```

Returns all instances belonging to your tenant, including terminated instances retained for the 30-day name-reservation window.

## Response — `200 OK`

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "data": {
    "instances": [
      {
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
    ],
    "next_cursor": null
  }
}
```

See [Retrieve Instance](retrieve-instance.md#status-enum) for the full list of `status` values and field semantics.

## Pagination

The response includes `next_cursor`, currently always `null`. Cursor pagination will be activated in a future release; the response shape is stable.
