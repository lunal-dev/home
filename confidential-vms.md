<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Confidential VMs

Dedicated VMs on our cloud, running inside TEEs. You rent the VM, we run the infrastructure.

**GPU VMs.** Single-GPU and multi-GPU configurations for inference, training, fine-tuning, and containers.

| GPU | VRAM | Host CPU TEE | Best for |
|---|---|---|---|
| RTX PRO 6000 | 96 GB GDDR7 | AMD SEV-SNP | Low cost, high performance for single GPU models |
| H100 | 80 GB HBM3 | AMD SEV-SNP or Intel TDX | Training, fine-tuning, latency-sensitive inference |
| B200 | 192 GB HBM3e | Intel TDX | Frontier training, maximum performance |

Configurations: Three confidential computing deployment modes are available, depending on GPU and workload. Single GPU pass-through attaches one GPU to one Confidential VM and is supported on all listed GPUs. Protected PCIe lets multiple GPUs share one confidential domain over PCIe, though GPU-GPU traffic over NVLink and NVSwitch is not encrypted. This mode is supported on H100 only. Multi-GPU pass-through attaches multiple independently attested GPUs to one VM with encrypted NVLink between them. This mode is supported on B200 only.

**CPU VMs.** TEE-backed vCPUs for general-purpose confidential workloads. AMD SEV-SNP and Intel TDX available.

See [Confidential VM pricing](/pricing.md#confidential-vms) for per-GPU-hour and per-core-hour rates.
