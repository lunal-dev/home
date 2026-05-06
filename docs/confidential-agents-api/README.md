<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Confidential Agents API

The Confidential Agents API provisions and manages per-tenant confidential VM (CVM) instances that run packaged agents such as OpenClaw. Each instance is a hardware-isolated workload running inside a Trusted Execution Environment, addressable over SSH and uniquely named under your tenant subdomain.

## Quick Start

This walkthrough creates an instance, waits until it is ready, reads its instance record, and deletes it. The examples use `curl` and `jq`.

### 1. Obtain credentials

Tenants and API keys are provisioned by Confidential. To request access, [contact us](mailto:founders@confidential.ai).

When your tenant is created, you receive:

- A tenant slug, used in instance hostnames such as `{instance-name}.{tenant-slug}.confidential.ai`.
- An API key, used as a Bearer token for API requests.

Export both values before running the examples:

```bash
export API_BASE="https://api.confidential.ai"
export TENANT_SLUG="acme"
export CA_API_KEY="confai_live_replace_with_your_key"
```

### 2. Test your API key

Call the usage endpoint. A successful response returns a `data.pricing` object and a `data.usage` object for the current billing cycle.

```bash
curl -sS "$API_BASE/v1/usage" \
  -H "Authorization: Bearer $CA_API_KEY" \
  | jq .
```

### 3. Create an instance

Use an ed25519 or ecdsa SSH public key. `ssh-rsa` keys are rejected.

```bash
export SSH_PUBLIC_KEY="$(cat ~/.ssh/id_ed25519.pub)"
export IDEMPOTENCY_KEY="$(uuidgen)"

CREATE_RESPONSE="$(
  curl -sS -X POST "$API_BASE/v1/instances" \
    -H "Authorization: Bearer $CA_API_KEY" \
    -H "Content-Type: application/json" \
    -H "Idempotency-Key: $IDEMPOTENCY_KEY" \
    --data "$(jq -n --arg public_key "$SSH_PUBLIC_KEY" '{
      public_key: $public_key,
      agent: "openclaw",
      inference_mode: "default_gateway"
    }')"
)"

echo "$CREATE_RESPONSE" | jq .

export INSTANCE_NAME="$(echo "$CREATE_RESPONSE" | jq -r '.data.name')"
export INSTANCE_HOSTNAME="$(echo "$CREATE_RESPONSE" | jq -r '.data.hostname')"
```

The create response is `202 Accepted`. The instance starts in `provisioning`.

### 4. Get instance info

```bash
curl -sS "$API_BASE/v1/instances/$INSTANCE_NAME" \
  -H "Authorization: Bearer $CA_API_KEY" \
  | jq .
```

The response includes fields such as `name`, `status`, `agent`, `hostname`, `inference_mode`, `created_at`, and `ready_at`.

### 5. Poll until the instance is ready

There are no webhooks for instance state changes. Poll `GET /v1/instances/{name}` until `status` becomes `ready`.

```bash
while true; do
  INSTANCE_RESPONSE="$(
    curl -sS "$API_BASE/v1/instances/$INSTANCE_NAME" \
      -H "Authorization: Bearer $CA_API_KEY"
  )"

  STATUS="$(echo "$INSTANCE_RESPONSE" | jq -r '.data.status')"
  echo "status=$STATUS"

  if [ "$STATUS" = "ready" ]; then
    export INSTANCE_HOSTNAME="$(echo "$INSTANCE_RESPONSE" | jq -r '.data.hostname')"
    break
  fi

  if [ "$STATUS" = "failed" ]; then
    echo "$INSTANCE_RESPONSE" | jq .
    exit 1
  fi

  sleep 15
done

echo "Instance is ready: $INSTANCE_HOSTNAME"
```

Once the instance is ready, connect over SSH with the private key that matches the public key from the create request:

```bash
ssh -i ~/.ssh/id_ed25519 "$INSTANCE_HOSTNAME"
```

### 6. Delete the instance

When you are done, delete the instance. The response is `202 Accepted`; teardown may complete immediately with `status: "terminated"` or briefly report `terminating`.

```bash
curl -sS -X DELETE "$API_BASE/v1/instances/$INSTANCE_NAME" \
  -H "Authorization: Bearer $CA_API_KEY" \
  | jq .
```

## Base URL

```
https://api.confidential.ai
```

All endpoints are versioned under `/v1`.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/v1/instances` | [Create Instance](create-instance.md) — provision a new CVM. |
| `GET` | `/v1/instances` | [List Instances](list-instances.md) — return all instances for your tenant. |
| `GET` | `/v1/instances/{name}` | [Retrieve Instance](retrieve-instance.md) — fetch a single instance by name. |
| `DELETE` | `/v1/instances/{name}` | [Delete Instance](delete-instance.md) — tear down a CVM and release its DNS. |
| `GET` | `/v1/usage` | [Get Usage](get-usage.md) — current billing-cycle consumption for your tenant. |

## Need help?

[Contact us](mailto:founders@confidential.ai) for access, support, or feature requests.
