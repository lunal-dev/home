<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Attestable Builds

This is a four-part series on attestable builds: what they are, how they work, how they fit into existing supply chain standards, and what security guarantees they actually provide.

We assume familiarity with git, package managers, and the concept of cryptographic hashes.

## The Documents

### [01. What Are Attestable Builds?](what-are-attestable-builds.md)

Explains what attestable builds are, why they matter, and how they solve the software verification problem. Covers the core insight behind attestable builds, why reproducible builds remain elusive in practice, and why Trusted Execution Environments make a different approach possible now.

### [02. How It Works](how-it-works.md)

Walks through the architecture and mechanics of attestable builds end to end. Explains each phase of the build process, how cryptographic binding works at every step, and how verification closes the loop from source to running code, using Kettle (Confidential's implementation) as the reference.

### [03. Provenance & Standards](provenance-standards.md)

Explains how attestable builds produce verifiable claims about software and how those claims fit into the broader supply chain security ecosystem. Covers what SLSA and in-toto are, why standards matter for interoperability, what artifacts Kettle produces, and how to interpret provenance documents.

### [04. Threat Model and Security Boundaries](threat-model.md)

Draws the line between what attestable builds protect against and what they don't. Covers where the trust boundaries lie, what specific attacks are prevented, and which assumptions you're still making.

## Reading Order

Read in order. Document 1 introduces the concept, document 2 shows how it actually works, document 3 connects it to existing standards, and document 4 is the security analysis that depends on the previous three.
