<div align="center">
<nav>
<a href="/">Home</a>&nbsp;&nbsp;
<a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
<a href="/docs/">Docs</a>&nbsp;&nbsp;
<a href="/careers/">Careers</a>
</nav>
</div>

# A Partnership with Vail to Fingerprint and Verify AI Models

September 07, 2025

We're excited to announce a partnership with [VAIL](https://www.projectvail.com/) to power AI model verification and fingerprinting with Lunal's Trusted Execution Environment (TEE) infrastructure.

VAIL builds software that verifies and identifies AI models through behavioral fingerprints, and this partnership leverages Lunal's TEE infrastructure to enable:

- **Trusted results:** Model identification results are cryptographically signed, ensuring they can't be forged or altered.

- **Confidential fingerprinting:** Models are identified without exposure of their weights, training data, or parameters. VAIL’s process runs inside the enclave and assures developers that no sensitive data leaves the trust boundary.

- **Verifiable evaluation:** Cryptographic attestations protect VAIL’s fingerprinting code against tampering. Any attempt to modify the execution environment or fingerprinting logic is detectable.

Previously, model verification required a tradeoff: trust the platform or reveal model details. TEEs remove this tradeoff: encrypted models can be fingerprinted while encrypted. And the verification results are tamper-proof. In turn, VAIL's verification software can now run with the privacy and attestability guarantees needed for production AI systems.

Learn more about VAIL and Lunal at [https://www.projectvail.com/](https://www.projectvail.com/) and [https://lunal.dev/](/).