<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# C8s: Kubernetes, Made Confidential

Today we're publishing the C8s architecture whitepaper. C8s is confidential computing for Kubernetes.

[Read the paper](/docs/c8s-whitepaper.md)

## The problem

Running sensitive workloads on third-party infrastructure is a three-sided trust problem.

Artifact owners ship model weights, datasets, and code onto infrastructure they do not control. Compute providers run workloads they cannot prove are private to their customers. End users send queries that are visible to every layer of the stack.

Today, all three sides rely on contracts. Licensing agreements, compliance certifications, access controls. None of it is cryptographically rooted. A privileged insider with hypervisor access can read memory, intercept traffic, and exfiltrate weights from storage.

Encryption at rest and in transit closes part of the gap. Data in memory during computation is still plaintext.

## What C8s does

C8s is built on hardware Trusted Execution Environments. AMD SEV-SNP, Intel TDX, NVIDIA Confidential Computing on H100 and later. Memory is encrypted with keys the hypervisor never holds. The hardware signs an attestation report that proves what code is running on what silicon.
 
C8s composes that hardware foundation up the stack. Every pod runs inside its own confidential VM. Every connection between pods is mutually authenticated based on what code each side is running. Sensitive artifacts like model weights stay encrypted at rest and only decrypt inside a pod that proves what it is. External clients can verify the cluster's entry point before sending data.
 
The control plane stays outside the trust boundary. That's what makes C8s deployable on AKS, EKS, and GKE without modification.

## What you get

Three groups gain guarantees they did not have before.

* Artifact owners can deploy weights, datasets, and proprietary code on third-party infrastructure without exfiltration risk.
* Compute providers can host sensitive workloads without seeing them.
* End users can submit queries opaque to every party except the attested TEE processing them.

All three are cryptographically provable to any independent verifier.

## Read the paper

The full architecture is in the paper. Threat model, trust boundary, component design, request lifecycle, configurable boundaries.

[C8s: A Confidential Kubernetes Architecture](/docs/c8s-whitepaper.md)

If you want to run private inference, protect model weights, train on sensitive data, or deploy private agents, this is the substrate.

[Get in touch](mailto:founders@confidential.ai).

