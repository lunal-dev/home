<div align="center">
  <nav>
    <a href="/lunal-dev/home">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/enterprise.md">Enterprise</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>&nbsp;&nbsp;
    <a href="/blog/">Blog</a>&nbsp;&nbsp;
    <a href="/careers/">Careers</a>
  </nav>
</div>

# Enterprise

This page is dedicated to highlight how we work with large organizations and enterprises. Typically, this is for engagements with AI labs and/or infrastructure providers.

We know your infrastructure is bespoke. It looks different from everyone else's. It may be difficult or impossible to change your deployment target. The stack you've built over years isn't something you're going to rip out easily for a new vendor.

We built Lunal with this in mind. Our platform is a set of modular components. Every component is designed to work standalone. You can license one, a few, or all of them. They compose into a full confidential computing platform, but none of them require the others. If you already have pieces of this puzzle, we fill the gaps.

See the full [component catalogue](/components.md).


## How We Work Together

Every enterprise engagement follows the same three phases: discovery, pilot, production.

### Discovery

Discovery is free and carries no obligation. We meet to understand your architecture and threat model. What does your infrastructure look like? What are you trying to protect, and from whom? Where does sensitive data flow, and which components touch it?

The outcome is a gap analysis: here is your trust boundary today, here are the components required to close it, and here is what a pilot would look like.


### Pilot

The pilot is a paid engagement. The timeline varies depending on the scope but the typical range is 1-4 months. The purpose is to deploy Lunal components on your infrastructure and get a production ready deployment. At the end, you decide whether to license our stack or walk away. No strings attached.

Every pilot typically follows this sequence:

- **Architectural deep dive.** We go through your stack component by component. How workloads are deployed, how traffic flows, where keys are managed, and so on. The outcome is an integration design: which Lunal components map where, what the deployment topology looks like, and where the trust boundaries sit.
- **Design.** We define a fully end-to-end private architecture for your workloads. If closing the trust boundary requires components that don't exist yet, we build them for you during the pilot. The outcome is a complete design with every gap accounted for.
- **Deployment.** Components deploy in your environment running real workloads. We iterate until the trust boundary holds end-to-end. The outcome is a working deployment on your infrastructure.
- **Testing.** We verify the system together. Attestation reports, measurement verification, certificate chain validation. Every claim we make is cryptographically verifiable. You don't take our word for it. The outcome is evidence you can evaluate internally.
- **Decision.** You have a production-ready deployment and the evidence to back it. License the components you need, or walk away no strings attached.

### Production

Full deployment with ongoing support. Licensing includes the components you chose during the pilot + any extra components that were custom built. On-prem, bare metal, all major clouds.


## Deep Dive: What Happens During a Pilot

This section describes in more detail what we work on and deliver for a pilot. This is meant to give some high level overview of our process and work. First, we define a trust boundary to identify which components need to be secured. Then we make those components confidential using our stack. We also identify any bespoke components that need to be built to close the boundary and meet your requirements. Then deployment.

### Drawing the Trust Boundary

Every engagement starts from the same question: where does sensitive data flow, and what touches it? From there, we draw a line around everything that needs protection. Everything inside that line runs in TEEs and is cryptographically verifiable. Everything outside it never sees plaintext. We call that line the **trust boundary**.

Once the boundary is drawn, we make everything inside it confidential. We also identify anything bespoke that is missing. An example of a bespoke component could be that you're using a specific container runtime and we need to implement some attestation gated policy on what containers are allowed to be spun up.

Inference provides a straightforward example of a trust boundary. Your ingress router sees request data and hence is inside the boundary. Worker nodes go inside (they see queries, responses, and model state). The network between them goes inside (it carries inference traffic). The KV cache goes inside. And so on.

Some components can't go inside. They run on hardware that doesn't support trusted execution environments, or they're managed services you don't control. Managed kubernetes is a typical example we run into. Two strategies keep them from becoming liabilities:

**Don't depend on them for confidentiality.** An orchestrator can schedule workloads, but it can't force nodes to run unauthorized ones. Every workload launch is checked against an allow-list at the node. The orchestrator requests. The node decides.

**Encrypt before exposure.** Data that passes through untrusted components is always ciphertext. Storage backends hold encrypted blobs they can't decrypt. Internal traffic is mutually authenticated with attestation-rooted certificates. The untrusted component becomes a conduit for data it can't read.

### Making the Stack Confidential

Once the boundary is drawn, we make each component inside it confidential. This is a repeatable process applied to every layer that handles plaintext. This is where we bring in our components and map them onto your infrastructure as needed.

For each component inside the trust boundary, we do the following:

1. **Encrypt the runtime.** The component must run inside a trusted execution environment on a hardened VM image. All memory is encrypted by the hardware. The hypervisor, host OS, and operators can only see ciphertext.
2. **Measure the code.** The hardware generates a cryptographic fingerprint of exactly what's running: the firmware, kernel, and application. This fingerprint is the foundation of everything that follows. If the code changes, the fingerprint changes.
3. **Bind identity to measurement.** The component only receives credentials if its fingerprint matches a known-good value. A compromised or modified component can't impersonate a legitimate one.
4. **Verify before connecting.** Every other component in the system checks this identity before communicating. No component trusts another until it can verify what that component is running.
5. **Secure the egress.** All outbound traffic is encrypted and authenticated. Nothing leaves the trust boundary destined for an unverified endpoint.

We have components that cover each of these.

### Filling the Gaps

Your infrastructure determines which components you need. In some cases, it requires adding extra components to achieve the required trust model. If closing the trust boundary requires a component that doesn't exist yet, we design and build it during the pilot. Custom integrations, nonstandard deployment targets, internal systems with unique trust requirements. We scope these during discovery and deliver them as part of the pilot.


## Get Started

[Tell us](mailto:ansgar@lunal.dev) about your infrastructure and what you're trying to protect. We'll scope a pilot.


