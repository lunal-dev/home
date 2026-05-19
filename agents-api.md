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

Spin up a private, isolated environment for your AI agent in under 15 seconds. Each instance comes preloaded with an agent runtime and inference, ready over SSH — and is completely invisible to everyone except you, including us.

## Up and running in under 15 seconds

Call the API and you're SSH'd into a ready environment in under fifteen seconds. No waiting, no manual provisioning. Treat agent environments as disposable — spin one up for every task, run it, throw it away.

## Completely private, even from us

Each instance runs inside a Confidential VM with hardware-enforced memory encryption. The code, data, and agent state inside are invisible to us, to other customers, and to the infrastructure operators we run on. You hold the SSH key; we have no way to look inside.

## OpenClaw, preloaded

Every instance launches with the OpenClaw agent runtime installed and ready to go. Additional agents available on request.

## Confidential inference, included

Each instance can call a bundled OpenAI-compatible inference gateway that serves open-weight models from the TEE pool — your agent gets attested inference out of the box, with no separate setup. See [Confidential Inference](/cloud.md#confidential-inference) for the model lineup.

## How it works

1. `POST /v1/instances` with your SSH public key.
2. Poll `GET /v1/instances/{name}` until `status` is `ready`.
3. `ssh <name>.<organization>.confidential.ai` — run your workload inside the TEE.
4. `DELETE /v1/instances/{name}` when done.

## Get access

API keys are issued per organization. [Contact us](mailto:hello@confidential.ai) to request access, and see the [Agents API reference](/docs/confidential-agents-api) for the full endpoint surface.
