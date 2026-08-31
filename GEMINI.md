# ⚡ Antigravity Engineering Framework Workspace Rules

This repository is governed by the **Antigravity Engineering Framework** defined in **[`SKILL.md`](./SKILL.md)**.

## 🧭 Slash Command Triggers & Protocols

When the user enters any of the following slash commands or intents, execute the corresponding protocol from [`SKILL.md`](./SKILL.md):

* **`/design` (or UI / Landing Page Requests)**:
  * Ingest existing brand tokens, SVGs, and colors with zero breaking changes.
  * Dynamically inject the user's workspace brand name, logo SVG, custom icons, and copy into unbranded templates ([`templates/`](./templates)).
  * Enforce the **80/15/5 Color Restraint Rule** (4 approved accent spots).
  * Enforce the **Unified Surface & Lighting Standard** (`bg-zinc-950` canvas, `bg-zinc-900/60` cards, hairline `divide-zinc-800/80` dividers, top ambient radial light aura).
  * Enforce the **Inverse Tracking Law** (tight negative tracking on big headlines `tracking-[-0.035em]`, wide positive on micro uppercase `tracking-[0.12em]`) and **Inverse Leading Law** (`leading-[1.08]` on headlines).
  * Autonomously synthesize complete, multi-section craft layouts from [`references/LANDING_PAGE_PATTERNS.md`](./references/LANDING_PAGE_PATTERNS.md) (Navbar, Hero, Bento, Media, Pricing, FAQ, Footer) even on vague user prompts with zero placeholders.

* **`/debug` (or Compiler Red Lines / Bug Reports)**:
  * Execute the **5-Phase Diagnostic Workflow** and **4 Laws of Pristine Code Generation**.
  * Never silence errors with `@ts-ignore`, `any`, empty catches, or dummy delays.

* **`/push` (or Git Commits / Sync Requests)**:
  * Execute the **3-Step Safe Git Delivery** (pre-flight secret audit, conventional commit formatting, atomic push).
