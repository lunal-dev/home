<div align="center">
  <img src="./assets/logo.png" alt="Lunal Logo" width="200" height="200">
</div>

<br>

<div align="center">
  <nav>
    <a href="/">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/enterprise.md">Enterprise</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>&nbsp;&nbsp;
    <a href="/blog/">Blog</a>&nbsp;&nbsp;
    <a href="/careers/">Careers</a>
  </nav>
</div>

# Lunal

Lunal is the AI confidential compute platform. We run your AI workloads (inference, training, agents) inside hardware-encrypted environments called Trusted Execution Environments (TEEs). Your data and code stay private while being processed. Your code can't be tampered with. You can cryptographically verify both claims without trusting us.

You deploy your code as-is unchanged. You get end-to-end privacy, enhanced security, and full verifiability with negligible performance overhead.


[Say hi](mailto:ansgar@lunal.dev). See [enterprise](/enterprise.md) for licensed deployments, [components](/components.md) for our stack breakdown, or the [docs](/docs/) for technical depth.

## Example Use Cases

* You are an **AI inference provider** who needs to guarantee data privacy during inference. You use Lunal to offer an end-to-end private inference product where customer data is never visible to you or your infrastructure.
* You are an **AI lab** that needs to train on highly sensitive data and prove to customers exactly what data was used during training. You use Lunal to set up fully confidential training workloads, enabling customers to cryptographically verify training data provenance.
* You are an **AI lab** that needs to protect proprietary weights from extraction during inference or fine-tuning. You use Lunal to ensure weights never leave hardware-enforced secure enclaves.
* You are an **inference provider** serving third-party models and regulators require proof that the audited model is what's actually running in production. You use Lunal to provide verifiable attestation of model integrity.
* You are an **AI agent company** whose agents handle credentials and API keys that must never be exposed in plaintext. You use Lunal to enforce hardware-level isolation so secrets never exist outside the TEE.
* You are building **multi-agent systems** and agents need to verify each other's identity and code before establishing trust. You use Lunal to provide cryptographic attestation between agents.


## What We Solve

Confidential computing protects data while it's being processed, not just at rest or in transit. The core technology is Trusted Execution Environments (TEEs), a hardware feature built into modern CPUs and GPUs. TEEs turn existing VMs into fully encrypted, hardened, tamper-proof compute environments.

A TEE by itself is just a primitive. Running production workloads inside TEEs and scaling them is a serious engineering challenge. You have to solve attestation, key management, build verifiability, networking, autoscaling, and logging, among others.

Lunal solves all of these. We built a set of independent components that each address a specific problem. Use them all together or integrate individual pieces into your existing stack. Lunal is confidential computing that just works, without building the infrastructure yourself.

See the [complete component catalogue](/components.md).

## How To Use Lunal

### Enterprise / Licensed

**For AI labs, infrastructure providers, and large organizations with existing hardware/infrastructure.**

Lunal's software stack deploys on your infrastructure. Components are modular: use the full platform or integrate specific pieces into your existing architecture.

Start with a pilot to map components onto your stack. Components work end-to-end or individually. On-prem, bare metal, all major clouds.

We explain how we work with enterprises in depth [here](/enterprise.md) or [contact us](mailto:ansgar@lunal.dev).

### Hosted Platform

**For teams that want to run workloads privately without managing TEE infrastructure.**

Bring your workload: inference, training, fine-tuning, any application. Lunal runs it on TEE-backed infrastructure. You get an endpoint with attestation built in.

No code changes required. Your existing applications, containers, and models work as-is. The full platform is included: attestation, key management, autoscaling, private networking, CI/CD, encrypted logging. Global deployment.

[Contact us](mailto:ansgar@lunal.dev).

### AI Agents

**For teams building AI agents that need access to credentials, tools, and external services.**

Agents run inside TEEs with hardware-enforced credential isolation. Tokens and API keys never exist in plaintext outside the TEE. Multi-agent systems verify each other through attestation. Each agent proves what code it's running before others trust it.

[Contact us](mailto:ansgar@lunal.dev).

## Get Started

[Say hi](mailto:ansgar@lunal.dev). See [enterprise](/enterprise.md) for licensed deployments, [components](/components.md) for our stack breakdown, or the [docs](/docs/) for technical depth.