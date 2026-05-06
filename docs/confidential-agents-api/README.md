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

## Base URL

```
https://api.confidential.ai
```

All endpoints are versioned under `/v1`.

## Getting Started

1. **[Authentication](authentication.md)** — Bearer tokens, key format, and how to obtain credentials.
2. **[Conventions](conventions.md)** — Response envelope, request and correlation IDs, error codes, and tenant subdomain layout.
3. **Create your first instance** — `POST /v1/instances` with an SSH public key. See [Create Instance](create-instance.md).
4. **SSH in** — Once the instance reports `ready`, connect with `ssh <hostname>` using the matching private key.
5. **Verify OpenClaw** — Run a quick in-instance prompt before using the workspace. See [Verify OpenClaw over SSH](openclaw-ssh-testing.md).

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
