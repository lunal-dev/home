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

An API for provisioning isolated, TEE-backed VMs preloaded with an AI agent runtime. Each instance is dedicated to one organization, hardware-attested, and addressable over SSH.

For the full endpoint surface, see the [Agents API reference](/docs/confidential-agents-api). For raw confidential VMs without the agent runtime, see [Cloud](/cloud.md).

## Isolated agent environments

Each instance is a dedicated Confidential VM running on AMD SEV-SNP or Intel TDX. Code, data, and agent state inside the VM are invisible to us and to other organizations on the platform. The instance hostname is unique to your organization and addressable over SSH using a key pair you control.

OpenClaw is the default packaged agent. Additional agents are available on request.

## Warm-pool provisioning

Typical create requests hit a warm pool of pre-attested VMs and return a `ready` instance in around five seconds. When the pool is empty, requests fall back to cold provisioning. Egress is monitored and capped per instance lifetime to enforce isolation guarantees.

## Confidential inference, included

Each instance can call a bundled OpenAI-compatible inference gateway that serves open-weight models from the TEE pool — your agent gets attested inference out of the box, with no separate setup. See [Confidential Inference](/cloud.md#confidential-inference) for the model lineup.

## How it works

1. `POST /v1/instances` with your SSH public key.
2. Poll `GET /v1/instances/{name}` until `status` is `ready`.
3. `ssh <name>.<organization>.confidential.ai` — run your workload inside the TEE.
4. `DELETE /v1/instances/{name}` when done.

## Get access

API keys are issued per organization. [Contact us](mailto:founders@confidential.ai) to request access.
