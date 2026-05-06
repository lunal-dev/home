<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Delete Instance

```http
DELETE /v1/instances/{name}
```

Tears down the CVM and removes its DNS record. The database row is retained with a terminal status, and the name remains reserved for at least 30 days.

Returns `202 Accepted`. Teardown may complete synchronously, in which case the response shows `status: "terminated"`. In other cases the instance briefly reports `terminating` and reaches `terminated` on subsequent retrieval.

## Path parameters

| Parameter | Description |
| --- | --- |
| `name` | The 8-character generated instance name, e.g. `4k9p2xq7`. |

## Response — `202 Accepted`

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "data": {
    "name": "4k9p2xq7",
    "status": "terminated",
    "terminated_reason": "deleted_via_api",
    "terminated_at": "2026-05-01T20:24:22Z"
  }
}
```

## Errors

| Code | HTTP | When |
| --- | --- | --- |
| `not_found` | `404` | Instance does not exist or belongs to another tenant. |
| `unauthenticated` | `401` | Missing or invalid Bearer token. |
