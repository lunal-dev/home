<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Confidential Cloud

Run AI workloads on TEE-backed infrastructure with end-to-end attestations of hardware-enforced integrity, privacy and verifiability. No code changes. No TEE expertise required.

If you'd rather deploy on your own infrastructure, see [Components](/components.md). For detailed rates, see [Pricing](/pricing.md). For licensed on-prem deployments, see [Enterprise](/enterprise.md).

### Table of Contents

- [Confidential Inference](#confidential-inference)
- [Confidential VMs](#confidential-vms)
- [Attestable Builds](#attestable-builds)

## Confidential Inference

Private inference as an API. Pay per token.

Send requests to open-weight models running inside TEEs on our cloud. Your prompts, responses, and model interactions are never visible to us or our infrastructure. Every response includes an attestation proof.

OpenAI-compatible API. Drop-in replacement for existing inference providers. Switch your base URL and get hardware-enforced privacy with no other code changes.

| Model | Best for |
|---|---|
| GLM 5.1 | Reasoning, multilingual |
| Qwen 3.5 35B | General purpose |
| Qwen3.6 27B | General purpose |
| DeepSeek V4-Flash | General purpose, coding, long context |
| DeepSeek V4-Pro | Reasoning, coding, long context |

See [inference pricing](/pricing.md#confidential-inference) for per-token rates. Model requests: [founders@confidential.ai](mailto:founders@confidential.ai). Confidential inference vs non-confidential inference: 5-7% lower token throughput, negligible impact on Time to First Token (TTFT).


## Confidential VMs

Dedicated VMs on our cloud, running inside TEEs. You rent the VM, we run the infrastructure.

**GPU VMs.** Single-GPU and multi-GPU configurations for inference, training, fine-tuning, and containers.

| GPU | VRAM | Host CPU TEE | Best for |
|---|---|---|---|
| RTX PRO 6000 | 96 GB GDDR7 | AMD SEV-SNP | Large-model inference, high VRAM capacity |
| H100 | 80 GB HBM3 | AMD SEV-SNP or Intel TDX | Training, fine-tuning, latency-sensitive inference |
| B200 | 192 GB HBM3e | Intel TDX | Frontier training, maximum performance |

Configurations: Three confidential computing deployment modes are available, depending on GPU and workload. Single GPU pass-through attaches one GPU to one Confidential VM and is supported on all listed GPUs. Protected PCIe lets multiple GPUs share one confidential domain over PCIe, though GPU-GPU traffic over NVLink and NVSwitch is not encrypted. This mode is supported on H100 only. Multi-GPU pass-through attaches multiple independently attested GPUs to one VM with encrypted NVLink between them. This mode is supported on B200 only.

**CPU VMs.** TEE-backed vCPUs for general-purpose confidential workloads. AMD SEV-SNP and Intel TDX available.

See [Confidential VM pricing](/pricing.md#confidential-vms) for per-GPU-hour and per-core-hour rates.


## Attestable Builds

Cryptographic proof of what was built and from which source. Kettle, our attestable build service, runs your build process inside a TEE and emits a signed [attestable build](/docs/attestable-builds/) linking the git commit to the final artifact — no deterministic compilers required.

Every build produces a verifiable, tamper-evident chain of custody: signed attestation of the build environment, provenance for every input, and a hardware-rooted measurement of the output. Downstream consumers can verify the artifact came from the claimed source, built with the claimed toolchain, without needing to trust anyone.

Hardware enforcement of the build pipeline: MAC policies, seccomp filters, and process isolation keep the build environment unchanged between source checkout and artifact emission. Achieves SLSA Build L3.

Connects to your GitHub repo. On every commit: checkout, build inside TEE, signed provenance.

See [build pricing](/pricing.md#attestable-builds) for per-minute rates.
