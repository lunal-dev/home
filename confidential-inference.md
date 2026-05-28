# Confidential Inference

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

See [inference pricing](/pricing.md#confidential-inference) for per-token rates. Model requests: [hello@confidential.ai](mailto:hello@confidential.ai). Confidential inference vs non-confidential inference: 4% lower token throughput, negligible impact on Time to First Token (TTFT).
