# Confidential Agents — Launch Media Assets (handoff)

Picking this up on your Mac? This folder + this README is the self-contained handoff from the remote Claude Code session. Notion is the source of truth; the remote sandbox's files are gone, but everything is reproducible from here.

> Quick start on Mac: open this folder in Claude Code and say *"continue the Confidential Agents launch media — read launch-assets/confidential-agents/README.md."* Then render the flagship image (command below) so you can finally **see** it.

---

## Product / voice / naming rules (obey these)

- Product is **"Confidential Agents"** — NEVER "Confidential Agents API" ("API" was dropped from the name).
- It's the **world's first verifiably private, secure agent runtime**: the agent *and* its inference run inside TEEs; data encrypted **in use** (not just at rest/in transit); **verify with an open-source CLI**; **~4–8% hit to token throughput**.
- **Voice** (from Aamir's edits to the posts): plain and blunt over jargon; **lead with audience + pain** (finance/healthcare/gov stuck with clunky on-prem), then cause (your agent host can read every prompt; a legal agreement isn't enough); **outcome over crypto-plumbing**; **on-prem is the foil** ("more secure than on-prem because no one is trusted — not even us"); warm mission close **"AI should be personal. And personal means private."**; **no hashtags**; one "launch post + API docs" link.
- Don't name OpenAI ("a frontier model provider"); don't write "AMD SEV-SNP"; keep AMD/NVIDIA minimal (attestation root only) — prefer the CLI/outcome framing.
- CTA everywhere: https://forms.gle/QkfCfAjvDcujZLzB6 · Write-up: https://confidential.ai/blog/confidential-agents-launch · X handle: @Confi_AI

## Status of each asset (all in Notion; hub: https://www.notion.so/36e47d37a53d81a585f9edfd8fa6dbe0)

- **Blog** — DONE + LIVE. Shipped to this repo at `blog/confidential-agents-launch.md` (+ index row in `blog/README.md`); PR #40 merged to `main`; live at confidential.ai/blog/confidential-agents-launch. Don't re-edit unless asked.
- **LinkedIn / Hacker News / X thread** — Aamir-edited finals in Notion. Aligned to the voice above.
- **Product Hunt** — rewritten to match: https://www.notion.so/37247d37a53d81638d9fd5766ca04109
- **Launch video** — storyboard + VO script in Notion (page `…8197…`); a video-specific handoff toggle is already on that page.

---

## The media work (in progress)

**Goal:** copy PrivateClaw's launch-media strategy for Confidential Agents — a set of images + a ~60s video for LinkedIn / X / Product Hunt.

**How PrivateClaw's was made:** a dark-terminal **HTML/CSS site** (`github.com/lunal-dev/privateclaw` → `web/index.html`, `web/styles.css`) screenshotted at 1280×720; concept graphics built as HTML/SVG → PNG; the video = screen-recording of those scenes + founder VO, assembled with ffmpeg.

**Aesthetic tokens** (from `privateclaw/web/styles.css`):
`--bg:#09090b · --bg-card:#111113 · --fg:#fafafa · --fg-muted:#a1a1aa · --accent:#3fb950 (green) · --border:#27272a · danger:#f85149` · mono font `'JetBrains Mono','Fira Code', monospace`. Keep green for product-family consistency unless Aamir wants a distinct Confidential Agents accent.

**Render recipe (Mac)** — install Chrome (or `brew install --cask chromium`) and ffmpeg (`brew install ffmpeg`):

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1280,720 --screenshot=mem-comparison.png \
  "file://$(pwd)/mem-comparison.html"
```

(On the remote Linux box this was `chromium-browser` with the same flags; output was 2560×1440 @2x.)

### Done
- **`mem-comparison.html`** — the flagship "money-shot": a host admin's view of agent memory, **plaintext vs encrypted**. Left = standard host (a finance trading-book prompt + broker `sk_live_…` key in plaintext, red "PLAINTEXT — FULLY READABLE"); right = Confidential Agents (encrypted hex, green "HARDWARE-ENCRYPTED"); caption "Encrypted in use — no one can read it. Not even us." Render it with the command above.

### Pending image set (build each as a `scene.html`, same tokens, 1280×720)
1. **Verify-CLI terminal** — the open-source CLI running its checks: ✓ no host access · ✓ inference private · ✓ runs in TEEs · ✓ build matches attestation. ("Don't trust. Verify.")
2. **The "in use" gap** — AT REST ✓ / IN TRANSIT ✓ / IN USE ✗ → sealed.
3. **On-prem vs Confidential Agents** — clunky on-prem (you still trust your own stack) vs hosted CA (no one trusted, not even us).
4. **Hero wordmark** — "Confidential Agents — verifiably private, secure agent runtime" + a terminal prompt. Good as a thumbnail/lead image.

### Video plan (~60s)
Animate the storyboard scenes (CSS keyframes), render to a silent MP4 via ffmpeg, then Aamir records the VO (script on the Launch Video Notion page) and you mux it in:
```
ffmpeg -i visuals.mp4 -i vo.wav -map 0:v -map 1:a -c:v copy -c:a aac -shortest confidential-agents-final.mp4
```
Match the PrivateClaw video's pacing/tone.

---

*This branch (`launch-media-assets-wip`) is scratch — safe to delete after you pull the files. Not meant to be merged into `main`.*
