<div align="center">
  <nav>
    <a href="/README.md">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/cloud.md">Cloud</a>&nbsp;&nbsp;
    <a href="/pricing.md">Pricing</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>
  </nav>
</div>

# Verify OpenClaw over SSH

Once an instance is `ready`, SSH into it with the private key matching the `public_key` supplied at creation time.

```bash
ssh <hostname>
```

Then run a short OpenClaw prompt from a temporary directory:

```bash
cd "$(mktemp -d)"
OPENCLAW_NO_ONBOARD=1 openclaw agent --local --agent main \
  -m "Reply with exactly: openclaw ok" \
  --thinking off
```

A healthy instance prints `openclaw ok`.

For an interactive check, start the local OpenClaw TUI:

```bash
OPENCLAW_NO_ONBOARD=1 openclaw --local
```

The TUI should report that the config is valid, show the configured model, and connect to the local gateway. For custom inference instances, the model should match the `custom_inference_model_name` supplied to `POST /v1/instances`.

## Troubleshooting

If SSH fails, confirm the instance status is `ready` and that you are using the private key matching the `public_key` in the create request.

If OpenClaw starts but the prompt fails, retrieve the instance and confirm:

- `inference_mode` is the value you expected.
- `inference_model` matches the model you intended.
- `custom_inference_endpoint` is present for custom inference instances.

Do not paste provider API keys into support tickets. Quote the API `request_id` instead.
