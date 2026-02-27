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

# Secure AI Needs TEEs

AI security standards are being developed in real-time as the technology scales from research labs to billions of users. As these models take on more consequential roles in software systems in terms of delegating, making decisions, and acting on our behalf, questions remain about how to effectively secure these systems. In addition, frontier models are increasingly viewed as strategic national assets that require protection from sophisticated threat actors. The intersection of this rapid technological advancement, the scale of deployment, and this new complex threat landscape necessitates an equivalently accelerated effort to develop practical security standards and implement them at production scale.

A core component of these emerging security standards and their implementations is Trusted Execution Environments (TEEs), often referred to as Confidential Computing. TEEs are already referenced in multiple AI security and safety standards. Notably, RAND's ["Securing AI Model Weights"](https://www.rand.org/pubs/research_reports/RRA2849-1.html) report identifies TEEs as essential infrastructure for securing modern AI systems. Anthropic has [started exploring](https://www.anthropic.com/research/confidential-inference-trusted-vms) confidential inference built on top of TEEs. Meta is [evaluating using TEEs](https://ai.meta.com/static-resource/private-processing-technical-whitepaper) to bring private AI processing to WhatsApp. Yet the tooling to make practical use of TEEs for AI infrastructure is nowhere near ready, let alone scalable and production-grade. Lunal exists to solve that problem: building the tooling and infrastructure that makes deploying secure AI using TEEs easy.

## TEE Fundamentals

A Trusted Execution Environment (TEE) is a tamper-proof isolated computing environment that maintains data confidentiality and allows verifiability of its running workloads. TEEs have recently been implemented in modern CPU and GPU hardware. Intel and AMD have provided CPU-based TEEs for several years. More critically for AI workloads, NVIDIA introduced TEE capabilities in their GPUs starting 2024.

### Core Security Properties

A TEE provides four critical security properties:

**Integrity**: Once software is initialized in a TEE, it becomes tamper-proof. An attacker with root access to the host system cannot modify the running AI model or inference logic without detection.

**Confidentiality**: Data within the TEE is encrypted at the hardware level in memory pages. Model weights, user queries, and processing results remain private even from privileged system administrators.

**Verifiability**: The TEE cryptographically measures exactly what software is running. Clients can verify they're communicating with the specific software they expect.

**Attestation**: The TEE produces signed attestation reports that provide cryptographic proof of all the above properties. These attestations are signed by hardware manufacturers (Intel, AMD, NVIDIA) and cannot be forged.

### The HTTPS Analogy

A useful analogy is the transition from HTTP to HTTPS. With HTTP you sent your data in plaintext, and you could not confirm who you're talking to. HTTPS allows you to confirm who you're talking to and encrypt your data in transit. TEE attestation goes a step further and allows you to prove that your data is encrypted during computation, letting you verify not just who you're talking to, but also what software they're running. All of this, like HTTPS, is available at a negligible performance cost.

### How TEEs Work in Practice

Here's how this works in practice: A user wants to submit a sensitive query to a large language model running on a remote server. They require that their query and the model's response remain confidential from all parties, including the server operator, and they need cryptographic proof that only the specified model version processed their data without any unauthorized access.

The server runs the LLM inside a TEE. When the user sends their query, it gets encrypted with the TEE's public key before transmission. Inside the TEE, the model processes the encrypted query using weights that remain encrypted in memory and are never accessible in plaintext to any software outside the enclave. The model returns an encrypted response along with a cryptographic attestation that proves exactly which model version and code processed the query and verifies that no other software could access the user's data or the model weights.

Without a TEE, this interaction would expose the user's query in plaintext during processing, allow system administrators and other processes to access both the query and model weights in memory, enable potential interception by malicious software on the host system, and provide no verifiable guarantee about which software actually processed the request. The TEE provides hardware-backed isolation and cryptographic verification that creates a secure computation environment even on untrusted infrastructure.

## Why TEEs Matter for AI

### Model Weight and IP Protection

TEEs significantly improve secure model storage and distribution. Model weights can now be encrypted at rest, in transit, and during compute where they can only be decrypted within verified TEEs. When AI systems span multiple components, this enables a zero trust architecture where each component itself runs inside a TEE and can verify the others' attestations before sharing model weights or derived data. This ensures that even within your own infrastructure, no component inherently trusts another and every interaction requires cryptographic verification of TEE integrity. Google is now deploying Gemini as part of its on premise Google Cloud Platform stack, with the condition that the weights are protected by a TEE.

### Confidential Inference

Confidential inference allows AI service providers to run inference and guarantee that user data remains private by utilizing GPU TEEs. This is a new unlock for regulated industries such as healthcare, government, and finance. These industries have specific requirements and compliance standards for handling user data such as PII and PHI. These industries can now use external AI services while maintaining cryptographic proof that their sensitive data was never accessible to the service provider.

### Training and Fine-tuning

TEEs extend beyond inference to training workflows that handle sensitive data. Healthcare organizations can train models on patient data without exposing records to cloud providers. Financial institutions can fine-tune models on transaction data while maintaining regulatory compliance.

Federated learning scenarios benefit particularly from TEE guarantees. Instead of trusting participating organizations to honestly report gradient updates, TEEs provide cryptographic proof that computations were performed correctly on specified datasets. Verifiable training provides tamper-proof records of exactly what data was used to train a model.

### Agent Runtime Security

AI agents require access to external services and credentials to be useful. An agent that can read your email, make calendar appointments, or execute financial transactions must be trusted with extremely sensitive access tokens and the corresponding data.

TEEs provide credential isolation that ensures agent access tokens never exist in plaintext outside the secure environment. Even if the host system is compromised, attackers cannot extract the credentials needed to impersonate the agent.

Multi-agent systems create additional trust requirements. Agents can verify each other via TEE attestation prior to sharing data or credentials. This enables new architectural patterns where agents can safely delegate tasks and communicate.

### AI Governance

TEEs enable new approaches to AI governance, grounded in enforceable cryptographic proof rather than aspirational policy promises. Rate limiting becomes verifiable. Organizations can prove to auditors that usage quotas were enforced without the possibility of gaming or bypassing controls.

Content policy enforcement gains similar verifiability. When safety filters are applied within TEEs, the system can provide cryptographic proof that all outputs were processed through specified content policies. This is particularly valuable for organizations that must demonstrate compliance with content regulations.

Model version control becomes tamper-proof when implemented in TEEs. Organizations can prove exactly which model weights were used for specific inferences, creating audit trails that cannot be forged or modified after the fact.

## How TEEs Actually Work

The security guarantees of TEEs emerge from cryptographic primitives built into the silicon itself. Understanding how these guarantees work requires walking through the chain of trust from hardware to application.

### The TEE Module

TEE implementations embed dedicated security modules directly into CPU hardware. These modules introduce new CPU execution modes and partition system resources at the hardware level. The TEE module operates in a privileged mode that sits alongside or above the hypervisor. Memory is divided between secure regions (accessible only to the TEE module) and regular regions. Current TEE module implementations can utilize the full resources of the CPU.

### Hardware Root of Trust

TEE security properties are built from a hardware root of trust. During manufacturing, chip manufacturers fuse unique private keys directly into the chip using specialized one-time programmable memory. The fusing methods are designed so that keys cannot be extracted without destroying the chip. Attempts to read the keys through physical analysis would destroy the chip.

These manufacturer-unique root keys establish the hardware root of trust. Manufacturers then can generate certificates which can be used to verify the authenticity of TEEs. The root keys are never used directly. Instead, TEEs implement key derivation hierarchies where application-specific keys are derived from root keys. This ensures that compromising one derived key doesn't expose others or the root. These derived keys have different use cases, most notably they are used to encrypt and decrypt memory pages for confidentiality guarantees.

### Establishing Confidentiality

To establish confidentiality, clients first verify they're communicating with a legitimate TEE running on genuine hardware. A client receives an attestation report signed with keys that trace back to the hardware root of trust. Once verified, clients can verify that they are speaking with a legitimate TEE module.

Clients can then encrypt their data with keys derived uniquely from the TEE, trusting that only the legitimate TEE can decrypt it. Confidentiality is maintained through memory encryption whenever the data is written to memory. Even privileged system software like hypervisors can only access encrypted data without the corresponding decryption keys.

### Establishing Verifiability

The verifiability guarantee emerges from a process called "measured boot", a cryptographic chain that measures every piece of software before it executes. It begins with the hardware root of trust and builds a chain of confidence, step by step, through the entire system:

1. **Hardware Root Established**: The TEE module's authenticity is verified using the unforgeable hardware keys, establishing the foundation of trust.

2. **Firmware Trust**: Now that we trust the TEE module, it measures and cryptographically signs the firmware before execution. The trusted TEE vouches for the firmware's integrity.

3. **Kernel Trust**: The now-trusted firmware measures and signs the kernel before transferring control, extending the chain of trust.

4. **Application Trust**: The trusted kernel measures each application component before execution, completing the chain.

Each measurement gets cryptographically signed and chained to the previous measurement using keys derived from the hardware root. The result is a tamper-evident record of exactly what software is running, anchored to the hardware root of trust. Any modification to any component in the chain produces a completely different measurement signature.

### The Attestation Proof

TEEs generate attestation reports that can be handed to external parties to verify they are communicating with a legitimate TEE. These reports also contain the complete chain of measured boot with all measurements signed and traceable back to the hardware manufacturer's certificate chain. The client can verify this entire chain independently, confirming they're communicating with the exact software they expect, running with hardware-level confidentiality guarantees.

## TEE Vulnerabilities

TEEs remain vulnerable to sophisticated attack vectors that exploit both hardware limitations and implementation flaws. Side-channel attacks represent the most prominent threat, where attackers analyze power consumption, electromagnetic emissions, timing variations, or cache behavior to extract sensitive information from supposedly secure enclaves. Physical access attacks, including fault injection and glitching techniques, can manipulate hardware behavior to bypass security mechanisms or extract cryptographic keys. These attacks typically require specialized equipment and physical proximity to the target system, making them difficult to execute at scale but representing real vulnerabilities that have been demonstrated against commercial TEE implementations in research environments.

Supply chain attacks pose an emerging and particularly concerning threat vector. Malicious actors could compromise TEE hardware during the manufacturing process, embed backdoors in firmware or microcode, or subvert the cryptographic foundations that underpin attestation mechanisms. Nation-state actors with manufacturing capabilities represent the most significant risk in this category. Software vulnerabilities within TEE implementations also create attack surfaces, including bugs in the secure kernel, improper memory management, or flawed cryptographic implementations that could allow privilege escalation or information disclosure.

Additionally, TEEs face architectural limitations that sophisticated adversaries can exploit. Rollback attacks can revert TEE state to previous versions, potentially exposing stale cryptographic material. Denial of service attacks can render TEE services unavailable, and in some implementations, certain classes of speculative execution vulnerabilities can leak information across security boundaries. While these attacks often require significant resources and expertise, they demonstrate that TEEs provide strong but not absolute security guarantees.

## Lunal: Making TEEs Production-Ready

TEEs represent an extremely valuable primitive for securing AI systems. The hardware is already deployed: the latest generation CPUs and GPUs from Intel, AMD, and NVIDIA all ship with TEE capabilities built in, sitting in data centers right now waiting to be leveraged.

Using TEEs doesn't require changing or rebuilding your stack. Your existing applications, inference servers, and training workflows should run in TEE environments using the operational patterns you already use. Same code, same performance, same cost structure. So why isn't this happening? The tooling to make TEE deployment seamless simply doesn't exist yet and building a production TEE deployment stack has substantial technical challenges.

### Key Challenges

**Attestation Complexity**: Attestation workflows become complex when you need to verify not just your application, but every component it depends on, from your code down to the firmware. These attestations must be generated, validated, and distributed in ways that third parties can independently verify. Additionally, TEE attestations have no unified standard, where every implementation you use has very different tooling.

**Build Reproducibility**: Build reproducibility is an essential prerequisite step for TEE verifiability but difficult to achieve with current toolchains. Different compiler versions, dependency resolution order, and build environment variations create inconsistent binaries that break cryptographic verification. Achieving reproducible builds requires rethinking the compilation pipeline around hermetic environments and fixed toolchain versions.

**Key Management at Scale**: There is also the problem of managing keys securely at scale. TEE keys must be automatically rotated while maintaining zero-downtime service. Data encrypted for one TEE instance needs to remain accessible as instances scale up and down. The key management system must independently verify TEE attestations before providing decryption keys, requiring orchestration between attestation verification and key distribution to maintain security guarantees.

**Infrastructure Compatibility**: Standard infrastructure patterns create new security considerations in TEE environments. Middleware components like load balancers and rate limiters typically require plaintext access to requests, which undermines the end-to-end confidentiality that TEEs provide. Auto-scaling systems usually expose resource utilization patterns that can leak information about the workloads running inside TEEs. Observability tools need to collect telemetry without compromising the confidentiality guarantees that make TEEs valuable in the first place. Application services like caching, routing, and DDoS protection require rethinking when deployed alongside TEEs. These services must operate on encrypted data streams while maintaining their effectiveness, or they must run within TEE boundaries themselves. Either approach requires specialized implementation that differs from standard deployment patterns.

There's no cohesive platform that handles the full stack of TEE deployment concerns while maintaining compatibility with existing development workflows.

Lunal exists to solve this. We're building the standards, tooling, and infrastructure necessary to make using TEEs simple and seamless.

## Conclusion

The rapid deployment of AI systems at scale has created an urgent need for the development and implementation of new robust security standards to handle the new threat models that have emerged for these systems. TEEs will be a core building block for these security standards and implementations. The hardware-backed confidentiality, integrity, and verifiability that TEEs provide establish a solid foundation for securing AI systems.

However, the gap between TEE capabilities and production-ready tooling remains substantial. While the underlying hardware is already deployed across modern data centers, the complex requirements around attestation workflows, reproducible builds, key management, and infrastructure compatibility remain unsolved and prevent potential adoption.

Lunal is bridging this gap by building the comprehensive tooling and infrastructure stack needed to make TEE deployment seamless for AI workloads. As AI systems become increasingly critical to business operations and national security, the ability to provide cryptographic guarantees about model security and data privacy will transition from a competitive advantage to a fundamental requirement.