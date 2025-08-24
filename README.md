# Lunal - The Trusted Compute Company

<div align="center" style="margin: 2em 0;">
  <img src="./assets/logo.png" alt="Lunal Logo" width="200" height="200">
</div>


<div align="center" style="margin: 2em 0;">
  <nav style="font-size: 1.5em; font-weight: 600;">
    <a href="/README.md" style="text-decoration: none; margin: 0 2em; color: #2563eb; transition: color 0.3s ease;">Home</a>
    <a href="/pricing.md" style="text-decoration: none; margin: 0 2em; color: #2563eb; transition: color 0.3s ease;">Pricing</a>
    <a href="/docs/README.md" style="text-decoration: none; margin: 0 2em; color: #2563eb; transition: color 0.3s ease;">Docs</a>
  </nav>
</div>


Lunal is the fastest way to deploy software in Trusted Execution Environments (TEEs) with zero configuration, guaranteed privacy, full verifiability, and automatic scaling.

Ready to get started or curious? [Say hi](mailto:ansgar@lunal.dev) and join us for a hot cup of TEE. 🫖

## Latest News

- 📣 [Partnership with Impulse AI for Private Training, Fine-Tuning, and Inference](/blog/impulse-ai-partnership.md)
- 📣 [Partnership with Reppo for Confidential AI](/blog/reppo-partnership.md)
- 📣 [Partnership with Nexus for zkVM Privacy](/blog/nexus-partnership.md)

---

## Why Lunal?

TEEs provide a never-possible-before combination of privacy, performance, and verifiability. For the first time ever, you can now compute on encrypted data with end-to-end verification of the running software. But TEEs are tricky.

First, privacy doesn't stop at the TEE: all surrounding software and systems must also preserve privacy. And to be verifiable, everything in TEEs must be measurable, attestable, and reproducible.

Getting this right is hard. Getting it right at scale, with best-in-class security and zero downtime? Even harder. That's why we built Lunal: unified software and infrastructure that make TEEs simple, usable, and scalable.

Here are problems Lunal solves that make using TEEs easier:

### Key Features

- **Drop-in compatibility** Deploy and scale your existing applications in TEEs as-is, with zero changes.

- **Seamless CI/CD:** Connect Lunal to your GitHub repo. On every commit, Lunal checks out your code, reproducibly builds it, and deploys it.

- **Verifiability and trust:** Lunal automatically staples a TEE attestation to every HTTP response in an HTTP response header. These attestations affirm the TEE is uncompromised and attest to all software inside - from the exact git commit of your code down to the firmware.

  You, and any third party, can independently verify these attestations. Attestations are signed by Intel, AMD, and/or NVIDIA.

- **Automatic scaling:** Global, automatic scaling based on CPU usage, GPU usage, memory pressure, and/or request/response latency. Scaling metrics are privately measured in the TEE.

- **Application services:** Privacy-preserving rate limiting, load balancing, routing, DDoS protection, and caching. Lunal's services run in TEEs themselves; Lunal can't see any passthrough or cached data.

- **Security:** TEE keys are automatically rotated. Uploaded data can only be decrypted in Lunal TEEs. Hardened OS and language runtimes, reproducible builds, and policy-enforced further reduce the attack surface.

- **SDKs:** Client and server SDKs encrypt data for upload to Lunal and verify the TEE attestations in responses.

- **Logging:** All telemetry and logs are recorded privately in the TEE. Additionally, they're encrypted with your public key; only you can read them.



[Ansgar](https://github.com/gruns), [Amean](https://github.com/AmeanAsad), and the merry band of misfits at Lunal
