<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Pricing

All prices include hardware-enforced integrity, privacy and verifiability by TEEs.

On-demand usage. Pay for what you use.

Up to 80% cheaper than confidential computing on hyperscaler clouds.

Custom pricing is available for high-volume deals — [get in touch](mailto:founders@confidential.ai).

For enterprise licensing and on-prem deployments, see [Enterprise](/enterprise.md).

## Confidential Inference

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|---|---|---|
| GLM 5.1 | $1.00 | $3.50 |
| Qwen 3.5 35B | $0.25 | $2.00 |
| DeepSeek V3.2 | $0.40 | $0.60 |

Additional models available on request: [founders@confidential.ai](mailto:founders@confidential.ai).

## Confidential VMs

**GPU VMs** — billed per GPU-hour.

| GPU | VRAM | Host CPU TEE | Per GPU-Hour |
|---|---|---|---|
| RTX PRO 6000 | 96 GB GDDR7 | AMD SEV-SNP | $1.50 |
| H100 | 80 GB HBM3 | AMD SEV-SNP or Intel TDX | $2.00 |
| B200 | 192 GB HBM3e | Intel TDX | $5.00 |


**CPU VMs** — billed per vCPU core-hour, plus per GB-hour of RAM.

| TEE Backend | Per Core-Hour | Per GB-Hour (RAM) |
|---|---|---|
| AMD SEV-SNP | $0.05 | $0.012 |
| Intel TDX | $0.05 | $0.012 |

## Attestable Builds

Base rate: $0.008 per vCPU-minute. Runners scale linearly.

| Runner | Specs | Per Minute |
|---|---|---|
| Standard | 2 vCPU, 8 GB | $0.016 |
| Medium | 4 vCPU, 16 GB | $0.032 |
| Large | 8 vCPU, 32 GB | $0.064 |
| XL | 16 vCPU, 64 GB | $0.128 |

## Getting Started

Let us know what you need: [founders@confidential.ai](mailto:founders@confidential.ai).
