<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Get Usage

```http
GET /v1/usage
```

Returns the current billing-cycle consumption summary for your tenant — the same numbers that drive your invoice.

## Response — `200 OK`

```json
{
  "request_id": "4f1f6b6ab27d49bdb1a6a7a21c9f3b42",
  "correlation_id": null,
  "data": {
    "pricing": {
      "period_start": "2026-05-01T00:00:00Z",
      "period_end": "2026-06-01T00:00:00Z",
      "subscription_cost_usd": "200.00",
      "instance_hours_included": 200,
      "overage_per_hour_usd": "0.45",
      "confidential_inference_markup_pct": "0"
    },
    "usage": {
      "instance_hours_used": 142.7,
      "inference_cost_usd": "28.23",
      "egress_bytes": 1048576,
      "egress_limit_bytes": 5368709120,
      "egress_observed_at": "2026-05-01T20:14:22Z",
      "egress_blocked": false,
      "egress_block_applied_at": null
    }
  }
}
```

## Fields

### `pricing`

| Field | Description |
| --- | --- |
| `period_start`, `period_end` | The billing period this summary covers (ISO 8601). |
| `subscription_cost_usd` | Base subscription cost for the period. |
| `instance_hours_included` | Instance-hours included in the base subscription. |
| `overage_per_hour_usd` | Cost per instance-hour beyond the included amount. |
| `confidential_inference_markup_pct` | Markup applied to inference usage routed through the default gateway. |

### `usage`

| Field | Description |
| --- | --- |
| `instance_hours_used` | Total instance-hours consumed this period across all instances. |
| `inference_cost_usd` | Inference spend this period through the default gateway. |
| `egress_bytes` | Most recent observed egress total for the active instance(s). |
| `egress_limit_bytes` | Per-instance hard egress limit. |
| `egress_observed_at` | When the egress total was last sampled. |
| `egress_blocked` | `true` if egress is currently blocked at the firewall. |
| `egress_block_applied_at` | When the block was applied, or `null`. |

Per-day and per-instance usage breakdowns are not currently exposed through the API.
