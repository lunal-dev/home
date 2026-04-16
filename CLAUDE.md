# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Public-facing content and website for **Confidential AI** (formerly Lunal), an AI confidential compute platform. The repo has two layers: markdown content files at the root, and a Next.js website in `website/` that renders them.

## Commands

```bash
# Development (from website/)
cd website && npm run dev       # Start dev server at localhost:3000
cd website && npm run build     # Production build (also validates all pages render)
cd website && npm run lint      # ESLint

# No test suite exists.
```

## Architecture

### Content Layer (repo root)

Markdown files at the repo root are the source of truth for all page content. The website reads these files at build time.

- Top-level `.md` files: `README.md` (home), `components.md`, `cloud.md`, `pricing.md`, `enterprise.md`, `team.md`
- `docs/` — Technical documentation, nested directories use `README.md` as index pages
- `blog/` — Blog posts
- `careers/` — Careers page

### Website (`website/`)

Next.js 16 + React 19 + Tailwind 4 app that renders the markdown content.

**Content pipeline:** `lib/markdown.ts` reads `.md` files from the repo root (`..` relative to `website/`), strips the GitHub HTML nav header, rewrites internal links (`.md` extensions to routes, relative to absolute), and fixes asset paths. The processed markdown string is passed to `components/markdown-page.tsx` which renders it with `react-markdown` (remark-gfm, rehype-raw, rehype-slug). Internal links become Next.js `<Link>` components.

**Routing:** Each top-level page has a dedicated `app/<name>/page.tsx` that calls `getMarkdownContent("<name>.md")`. Docs use a catch-all route (`app/docs/[...slug]/page.tsx`) that walks `docs/` to resolve slugs to files or `README.md` indexes. Blog uses the same pattern.

**Navigation:** `components/navbar.tsx` defines `NAV_ITEMS` (top bar: components, cloud, pricing, docs) and `BOTTOM_NAV_ITEMS` (used in mobile menu). Footer links (enterprise, blog, team, careers) live in `app/layout.tsx` alongside social icons.

### Adding a New Page

1. Create `<name>.md` at the repo root with the standard nav header
2. Create `website/app/<name>/page.tsx` following the pattern of existing pages (call `getMarkdownContent`, render `MarkdownPage`)
3. Add to `NAV_ITEMS` or `BOTTOM_NAV_ITEMS` in `website/components/navbar.tsx`

## TEE Content Reading Path

Docs are structured as a progressive reading path for TEE knowledge:
1. `docs/intro-to-tees.md` — Accessible high-level introduction
2. `blog/secure-ai-needs-tees.md` — AI-specific argument (links to intro for general background)
3. `docs/confidential-computing-primer/` — Deep technical series (assumes virtualization and cryptography knowledge)

General TEE education lives in `docs/intro-to-tees.md`. AI-specific TEE content lives in the blog. Avoid duplicating TEE fundamentals across both — link instead.

## Formatting Conventions

**Markdown nav header:** Every `.md` file starts with a centered HTML nav block: Home, Components, Cloud, Pricing, Docs. Footer items (Enterprise, Blog, Team, Careers) are handled by the website layout, not the markdown nav.

**Internal links:** Use root-relative paths (`/docs/`, `/components.md`). Keep link text concise (WCAG/SEO).

**Email links:** Use linkified text like `[Contact us](mailto:founders@confidential.ai)`, not bare addresses.

**Headings:** H1 for page title, H2 for major sections, H3 for subsections.

## Commit Message Style

Lowercase, descriptive, action-oriented. Examples:
- `add cloud and pricing pages to website navbar`
- `move careers and team to footer alongside social icons`
