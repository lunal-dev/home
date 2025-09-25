**A Partnership with VAIL for Verifiable AI**
*September 07, 2025*

We're excited to announce a partnership with VAIL to power their verifiable AI tooling and software with Lunal's Trusted Execution Environment infrastructure.

VAIL is building tooling and software for verifiable AI, creating systems that can identify models through behavioral fingerprinting and verify model properties in real-time across deployment environments.

This partnership leverages Lunal's TEE infrastructure to enable VAIL's verification capabilities:

* **Verifiable execution** where cryptographic attestation provides tamper-proof execution of VAIL's expected fingerprinting code, with no modifications or tampering.
* **Confidential fingerprinting** that operates on models without exposing any information about model weights or proprietary parameters during the verification process.
* **Tamper-evident results** where any modification to the fingerprinting output is cryptographically detectable, ensuring fingerprint integrity throughout its lifecycle.

Model verification typically requires either trusting the verification platform or exposing model details to third parties. TEEs eliminate this tradeoff by providing an environment where fingerprinting can run on encrypted models while generating cryptographic proof of tamper-proof execution of expected code.

VAIL's verification tools can now run with the privacy and attestation guarantees needed for production AI systems.

Learn more about VAIL at https://www.projectvail.com/.
Learn more about Lunal at https://lunal.dev.