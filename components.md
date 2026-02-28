<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/enterprise.md">Enterprise</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>&nbsp;&nbsp;
    <a href="/blog/">Blog</a>&nbsp;&nbsp;
    <a href="/careers/">Careers</a>
  </nav>
</div>

# Components

Lunal is built as a set of independent components that compose into a complete confidential compute platform. Each component solves a specific problem. Use them all together, or integrate individual pieces into your existing stack.

See how [modular adoption](/enterprise.md) works in practice.

### Table of Contents

- [Component Catalogue](#component-catalogue)
  - [Attestation Service](#attestation-service)
  - [Key Management Service (KMS)](#key-management-service-kms)
  - [Build Pipeline](#build-pipeline)
  - [Networking and Application Services](#networking-and-application-services)
  - [Oblivious HTTP Gateway](#oblivious-http-gateway)
  - [Control Plane](#control-plane)
  - [Hardened VM Image](#hardened-vm-image)
  - [SDKs (Client and Server)](#sdks-client-and-server)
- [Modularity](#modularity)

## Component Catalogue

### Attestation Service

**Problem:** Proving what's running inside a TEE requires verifying cryptographic reports across hardware vendors, firmware versions, and certificate chains.

The attestation service generates and verifies TEE attestation reports. It is the trust anchor for the entire platform. Nothing else works without it.

The service supports AMD SEV-SNP (VCEK/VLEK), Intel TDX, and NVIDIA Confidential Computing attestation formats. Each format has different report structures, signature schemes, and certificate chains. The attestation service normalizes them into a single verification flow.

Verification checks the full chain: the report signature chains to the hardware vendor's root certificate, the launch measurement matches a known-good value, the TCB version meets minimum requirements, and the platform configuration is valid. Continuous re-attestation runs on schedule, with automatic key revocation if a measurement deviates from expected values.

A public verification API and CLI allow independent verification. You don't take our word for it. You check the attestation yourself.


### Key Management Service (KMS)

**Problem:** At scale, TEEs need secrets, encryption keys, identity certificates, and a registry of authorized participants. All of this must be gated on attestation.

The KMS is configurable. At its core, it gates secret and key distribution on attestation: workloads prove what they're running before they receive anything sensitive. Beyond that, you enable the capabilities you need.

**Attestation-gated secrets.** Secrets are released only to workloads that pass attestation. Prove what you're running, then get your secrets. For organizations that maintain their own secret stores (e.g. HashiCorp Vault), the KMS handles the attestation gating while your systems hold the secrets.

**Key distribution.** The KMS distributes encryption keys TEEs use for data in operation. Keys are scoped to specific workloads, rotated on configurable schedules, and revoked immediately on security incidents. Key versioning maintains backward compatibility during rotation.

**Certificate authority (optional).** For deployments where components need to verify each other's identity, the KMS can act as a certificate authority. It issues identity certificates to nodes and workloads that pass attestation. Certificates carry attestation trust forward without requiring re-attestation on every interaction. A typical example is a service mesh in Kubernetes.

**TEE registry (optional).** An authoritative record of all legitimate TEEs in a system. Attestation proves "this is a real TEE running expected code." The registry adds a second check: "this TEE belongs to this tenant and is authorized to participate." This is the ultimate source of truth for which TEEs are part of which system.


### Build Pipeline

**Problem:** TEE attestation proves what code is running, but only if you can tie a build to a measurement. Non-deterministic toolchains and unsigned artifacts break the verification chain.

The build pipeline produces what we call [attestable builds](/docs/attestable-builds/), a new approach to software verification. Instead of requiring bit-for-bit reproducible builds (which most toolchains can't achieve), attestable builds run your build inside a TEE and produce cryptographic proof of what inputs were used, what environment ran the build, and what came out. The result: a verifiable chain from git commit to running code, without needing deterministic compilers.

It connects to your GitHub repo. On every commit: checks out code, builds inside a TEE, produces cryptographically signed provenance. The git commit maps directly to an expected attestation measurement.

After inputs are loaded, networking is disabled. MAC policies, seccomp filters, and full process isolation ensure nothing is injected or exfiltrated during compilation. Together, these controls achieve SLSA Build L3 through hardware enforcement.

The concept is new enough that it's worth reading about in depth. See the [attestable builds docs](/docs/attestable-builds/) for the full architecture, verification flow, and trust model.


### Networking and Application Services

**Problem:** Standard infrastructure (load balancers, firewalls, proxies) runs outside TEEs and sees traffic in plaintext. Your application is private but everything around it isn't.

All networking and application services run inside TEEs. Traffic never leaves the encrypted boundary.

The API gateway handles request validation, client authentication, and routing. The attesting proxy terminates external TLS inside a TEE and binds the TLS session to an attestation report via Exported Keying Material (EKM). Clients verify the EKM against the attestation report to confirm their connection terminates inside a genuine TEE, not at an intermediary. Firewalls, DDoS protection, rate limiting, and load balancing all run inside TEEs.

As an example of what this looks like in practice: internal traffic between components uses mTLS with certificates issued by the KMS. Standard mTLS proves a trusted CA issued a certificate. Ours proves the KMS issued a certificate to a workload that passed attestation. The network only ever sees ciphertext between verified peers.


### Oblivious HTTP Gateway

**Problem:** TLS protects request contents, but infrastructure operators can still observe metadata: which clients connect, when, and how often. For some applications, traffic analysis is itself a privacy concern.

Lunal provides an OHTTP-compatible gateway that runs inside a TEE. It pairs with a third-party relay to separate identity from content.

The client encrypts their request to the attested gateway, then sends it through the relay. The relay sees the client's IP address but cannot read the payload. The gateway decrypts and processes the request but only sees that it came from the relay, not which client sent it. No single party learns both who is asking and what they're asking. Clients verify the gateway's attestation before encrypting requests to it.


### Control Plane

**Problem:** Autoscaling requires system metrics, but hypervisors have limited visibility into TEEs. Orchestration systems see workload metadata. Depending on your deployment, the control plane is part of the attack surface.

The control plane handles orchestration, scheduling, and autoscaling. It runs inside a TEE. Operators interact through APIs but cannot observe or tamper with internal state.

Telemetry is extracted from within the TEE. Scaling decisions are based on CPU, GPU, memory, and request volume measured from within the encrypted boundary. For high-security use cases, zero-knowledge proofs verify that scaling decisions were computed correctly without exposing per-process data. The proof confirms "scaling was triggered because memory exceeded 85%" without revealing which processes consumed that memory. ZK proofs run asynchronously, with generation times on the order of seconds and verification in tens of milliseconds.

The control plane scales across on-prem, bare metal, and cloud — supporting both CPU and GPU workloads.

Not every deployment uses our control plane. For example, many organizations run managed Kubernetes, where the control plane is a service they don't own and can't trust. In those cases, we treat the control plane as untrusted and enforce additional security at the node level to adjust for an untrust control plane.

### Hardened VM Image

**Problem:** TEEs provide hardware isolation, but the software inside still needs to be locked down. A bloated or misconfigured VM image expands the attack surface inside the TEE.

The hardened VM image is the base operating system all Lunal workloads run on. It is minimal, hardened, and measured.

Minimal means only the components needed to run your workload. No unnecessary services, no debugging tools, no package managers in production. Secure SELinux policies enforce mandatory access control. Seccomp filters block dangerous syscalls. Network isolation is enforced at multiple layers.

The image is measured as part of the TEE launch sequence. Because the image is built reproducibly, its measurement is predictable and verifiable. A production mode locks down SSH entirely. A dev mode allows debugging access with the tradeoff clearly marked.


### SDKs (Client and Server)

**Problem:** Implementing attestation verification, encryption, and secure communication from scratch is complex and error-prone.

The client and server SDKs handle encryption, attestation verification, and secure communication so you don't build it yourself.

**Client SDK.** Encrypts data for upload, verifies attestation in responses, handles key negotiation with the KMS. On first connection, the SDK bootstraps trust: fetches reference measurements and the CA certificate from the KMS, then caches them locally. Subsequent connections verify against the cache. Attestation overhead is amortized after the first request. EKM verification binds the TLS session to the attestation report, preventing man-in-the-middle attacks.

**Server SDK.** Generates attestation reports, manages TEE-side encryption, handles the internal mechanics of running inside a TEE.

A verification API and CLI provide programmatic and manual verification. Standard formats mean you can always verify with your own tooling if you prefer.

## Modularity

Components can be adopted individually. Not everyone needs the full stack.

Each component has defined interfaces and integrates with existing infrastructure. If you already have pieces of this puzzle, we fill the gaps. Common adoption patterns:

- **Attestation only.** Attestation service + SDKs. For teams adding TEE verification to existing deployments.
- **Security layer.** Attestation + KMS + build pipeline. For organizations with infrastructure that need the cryptographic verification layer.
- **Full platform.** All components, end to end. Equivalent to the hosted platform, deployed on your infrastructure.

Start with the component that solves the most pressing problem. Expand as you validate. Components are designed to compose, not to create lock-in.

Talk to us about [what fits your stack](mailto:ansgar@lunal.dev) or see how [enterprise engagements](/enterprise.md) work.
