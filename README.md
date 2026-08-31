# 🛠️ Antigravity AI Engineering & Design Skill (`/debug`, `/design` & `/push`)

[![CI Quality Gate](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml)
[![Node.js](https://img.shields.io/badge/node-20%2B-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5%2B-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/python-3.12%2B-blue.svg)](https://www.python.org/)
[![Go](https://img.shields.io/badge/go-1.22%2B-blue.svg)](https://go.dev/)
[![Rust](https://img.shields.io/badge/rust-2021%20edition-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A lightweight, production-grade **Antigravity Slash Skill Suite** that equips AI agents with strict type-safety rules, systematic root-cause debugging workflows (`/debug`), modern UI/UX design systems (`/design`), fast and safe Git delivery (`/push`), and anti-hallucination guardrails.

---

## ✨ Features at a Glance

| Feature | Slash Command | Description |
| :--- | :--- | :--- |
| 🔬 **Systematic Debugging** | `/debug` | 5-Phase diagnostic workflow that eliminates compiler red lines across TS, Python, Go, and Rust without lazy hacks (`@ts-ignore`, empty catches). |
| 🎯 **Pristine Code Invariants** | `/debug` | The 4 Laws: context ingestion first, boundary parsing, unrepresentable illegal states, and zero placeholder TODOs. |
| 🎨 **Design System & Tokens** | `/design` | Semantic color token architecture (light/dark mode with HSL/OKLCH), fluid typography hierarchy, and spacing tokens. |
| 🔄 **Adaptive Brand Ingestion** | `/design` | Ingests and respects existing logos, brand colors, custom SVGs, and fonts; enhances missing contrast and dark mode with 0 breaking changes. |
| 🧩 **Accessible Component Library**| `/design` | Production-ready React + Tailwind components (Hero banners, Navbars, Pricing matrices, Metric cards, FAQs) meeting **WCAG 2.1 AA** standards. |
| 🚀 **Safe Git Delivery** | `/push` | Streamlined 3-step Git staging, secret prevention audit, conventional commit formatting, and atomic remote syncing. |
| 🧠 **Continuous Learning** | `/learn` | Post-success reminder prompting you to persist discovered invariants or architectural conventions into project memory. |
| 🚦 **Safety Guardrails** | Automatic | Strict traffic-light boundaries preventing secrets leaks, destructive resets, or out-of-scope edits. |

---

## 🚀 Quick Start & Installation

### Option 1: Global Install (Works in All Projects)

* **Windows (PowerShell)**:
  ```powershell
  git clone https://github.com/s5condlast-cmd/Antigravityskill.git "$env:USERPROFILE\.gemini\antigravity\skills\antigravityskill"
  ```
* **macOS / Linux**:
  ```bash
  git clone https://github.com/s5condlast-cmd/Antigravityskill.git ~/.gemini/antigravity/skills/antigravityskill
  ```

### Option 2: Project-Level Install (For Team Repositories)

```bash
# Clone skill into your project's workspace
mkdir -p .gemini/skills
git clone https://github.com/s5condlast-cmd/Antigravityskill.git .gemini/skills/antigravityskill
```

---

## 💡 How to Use

### 1. The `/debug` Command (Code Quality & Root-Cause Fixes)
* **Fix compiler red lines**:
  > *"/debug fix the TypeScript type mismatches in `src/components/Navbar.tsx`"*
* **Investigate subtle runtime bugs**:
  > *"/debug investigate why session tokens are prematurely expiring on page refresh"*
* **Enforce clean code invariants**:
  > *"/debug refactor this auth controller to use Discriminated Unions and safe boundary parsing"*

### 2. The `/design` Command (UI/UX, Design Systems & Components)
* **Build modern landing page sections**:
  > *"/design create a modern Hero section with gradient text, CTA buttons, and social proof badges"*
* **Generate design tokens & color palettes**:
  > *"/design create a dark/light semantic color palette for a SaaS analytics dashboard"*
* **Create accessible interactive components**:
  > *"/design build an accessible Pricing comparison matrix with monthly/annual billing toggle"*

### 3. The `/push` Command (Safe & Fast Git Delivery)
* **Stage, commit, and push**:
  > *"/push sync my verified changes to GitHub with a conventional commit message"*
* **Push feature branches safely**:
  > *"/push push this new bento grid component to origin"*

---

## 🔬 The 4 Laws of Pristine Code (`/debug`)

1. **Context Ingestion First**: Inspect existing project types, schemas, and utils before writing code.
2. **"Parse, Don't Validate"**: Convert external input into validated domain types at system boundaries.
3. **Make Illegal States Unrepresentable**: Use Discriminated Unions / Tagged Variants instead of loose nullable flags.
4. **No Placeholders or TODOs**: Always generate complete, fully implemented, type-checked logic.

---

## 🎨 The 5 Pillars of Impeccable Design (`/design`)

1. **Minimalism & Visual Restraint**: Zero visual clutter. Use clean whitespace, subtle borders (`border-border/60`), and soft ambient lighting instead of heavy ornaments.
2. **Smooth Motion & Staggered Cascades**: Fluid spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) and cascading entry delays (`delay-75`, `delay-150`, `delay-200`) for buttery 60fps transitions.
3. **Scannable Icons & Effortless Navigation**: High-contrast, recognizable Lucide icons with optical touch padding ($\ge 44\text{px}$) and predictable placement.
4. **Pixel-Perfect Spatial Math**: Strict adherence to the 8-point grid, height ladders (`h-9`, `h-11`, `h-13`), and balanced padding ratios (`px-3 py-1.5` to `px-7 py-3.5`).
5. **Accessible by Default (WCAG 2.1 AA)**: Contrast ratios $\ge 4.5:1$, visible focus rings (`focus-visible:ring-2`), semantic HTML, and screen-reader ARIA roles.

---

## 📚 Included Reference Guides

All reference manuals are organized inside the `references/` folder:

| Document | What's Inside |
| :--- | :--- |
| **[references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md)** | Fast & safe Git delivery: pre-flight secrets audit, conventional commit standard, and atomic push commands. |
| **[references/COLOR_AND_CONTAINER_ENGINE.md](references/COLOR_AND_CONTAINER_ENGINE.md)** | 80/15/5 color restraint rule, 4 approved accent spots, containerless whitespace guidelines, and zero-overflow rules. |
| **[references/COMPONENT_LIBRARY.md](references/COMPONENT_LIBRARY.md)** | Production React + Tailwind components: Buttons, Inputs, Dropdowns, Modals, Tabs, Badges, Toasts, Skeletons. |
| **[references/DESIGN_SYSTEM_GUIDELINES.md](references/DESIGN_SYSTEM_GUIDELINES.md)** | Semantic color tokens (HSL/OKLCH), typography scales, motion curves, and pixel-perfect spatial math ladders. |
| **[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)** | Complete landing page patterns: Hero banners, Navbars, Bento grids, Pricing matrices, Testimonials, FAQs, Footers. |
| **[references/UX_PSYCHOLOGY_AND_HEURISTICS.md](references/UX_PSYCHOLOGY_AND_HEURISTICS.md)** | The 7 core Laws of UX (Fitts, Hick, Jakob, Miller, Doherty, Gestalt, Peak-End) with practical formulas. |
| **[references/ACCESSIBILITY_WCAG_GUIDE.md](references/ACCESSIBILITY_WCAG_GUIDE.md)** | Complete WCAG 2.1 & 2.2 AA/AAA guide: Contrast formulas, keyboard navigation matrix, focus traps, and ARIA roles. |
| **[references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)** | Type-safe `Result<T, E>` types, type guards, boundary parsers, and anti-hallucination helpers. |
| **[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)** | Catalog of top 10 recurring AI anti-patterns and surgical fixes. |
| **[references/CLI_CHEAT_SHEET.md](references/CLI_CHEAT_SHEET.md)** | Fast terminal cheat sheet for `tsc`, `mypy`, `pytest`, `go vet`, and `cargo check`. |

---

## 📂 Repository Layout

```text
Antigravityskill/
├── .github/
│   ├── workflows/quality-gate.yml         # Polyglot CI workflow (Node, Python, Go, Rust, Meta)
│   └── pull_request_template.md           # Pull request quality template
├── project-profile/
│   └── PROJECT_PROFILE.md                 # Project facts, standards, and invariants
├── references/
│   ├── PUSH_PROTOCOL.md                   # Fast & safe Git delivery protocol
│   ├── COLOR_AND_CONTAINER_ENGINE.md      # Color restraint & container determination engine
│   ├── COMPONENT_LIBRARY.md               # Accessible React + Tailwind application components
│   ├── DESIGN_SYSTEM_GUIDELINES.md        # Design system tokens & spatial math
│   ├── LANDING_PAGE_PATTERNS.md           # Accessible UI landing page patterns (Hero, Bento, Footer)
│   ├── UX_PSYCHOLOGY_AND_HEURISTICS.md    # Cognitive psychology laws & friction reduction
│   ├── ACCESSIBILITY_WCAG_GUIDE.md        # WCAG 2.1/2.2 AA & AAA compliance checklist
│   ├── DEBUG_UTILITIES.md                 # Type guards & Result types
│   ├── COMMON_BUG_PATTERNS.md             # Common AI bug patterns & fixes
│   └── CLI_CHEAT_SHEET.md                 # Diagnostic CLI cheat sheet
├── SKILL.md                               # Master /debug, /design & /push skill definition
├── README.md                              # Comprehensive documentation
├── LICENSE                                # MIT License
└── .gitignore                             # Ignored files (.env, node_modules)
```

---

## 🚦 Safety Guardrails

| Status | Action | Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets or API credentials | Hard blocked; keeps secrets uncommitted. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive reset | Hard blocked; protects user history. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing errors (`@ts-ignore`, `any`, empty catch) | Hard blocked; root-cause fix required. |
| 🟡 **ASK FIRST** | Refactoring outside requested task scope | Pauses and asks for user confirmation. |
| 🟡 **ASK FIRST** | Installing new third-party packages | Checks if standard library / existing tools suffice. |
| 🟢 **AUTOMATIC** | Running compiler & test commands (`tsc`, `npm test`) | Runs static checks automatically. |
| 🟢 **AUTOMATIC** | Using accessible landing page UI patterns | Implements clean, responsive UI automatically. |

---

## 🧠 Continuous Learning (`/learn`) & Circuit Breaker

### 💡 Post-Success Reminder (`/learn`)
Whenever Antigravity **successfully resolves a bug, clears compiler errors, or implements a feature**, it automatically includes a short reminder at the end of its response. This allows you to persist the architectural lesson or invariant into Antigravity's long-term project memory with a single slash command:

```markdown
---

### 🧠 Persist This Lesson in Antigravity

To ensure Antigravity remembers this invariant and avoids this issue in future sessions, run:

> **/learn**
> *Lesson*: [1-2 sentences summarizing the specific invariant, pattern, or gotcha discovered]
```

### ⚡ The "Rule of Three" Circuit Breaker & `/debug` Reminder
If **3 consecutive edit attempts fail** or if the agent is stuck / having a hard time:
1. **STOP modifying code immediately.**
2. Acknowledge that current assumptions about the codebase are flawed.
3. Re-examine interface contracts, verify environment configuration, and formulate a new hypothesis.
4. Report findings to the user and remind them:
   > 💡 **Stuck on a tricky bug?** Run `/debug` to engage the full 5-phase systematic root-cause diagnostic engine.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
