# 🛠️ Antigravity AI Engineering Skill (`/debug`)

[![CI Quality Gate](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml)
[![Node.js](https://img.shields.io/badge/node-20%2B-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5%2B-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/python-3.12%2B-blue.svg)](https://www.python.org/)
[![Go](https://img.shields.io/badge/go-1.22%2B-blue.svg)](https://go.dev/)
[![Rust](https://img.shields.io/badge/rust-2021%20edition-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A specialized, battle-tested **Antigravity Slash Skill** delivering zero-defect code generation, systematic root-cause debugging across polyglot stacks, accessible UI component patterns, and anti-hallucination guardrails.

---

## 🌟 Architecture & Workflow

```text
                               ┌─────────────────────────────────────────┐
                               │       User Prompt / Slash Command       │
                               │        (/debug, bug report, UI)         │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │       Unified SKILL.md Framework        │
                               │   (Traffic Light Guardrails & Router)   │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │          The /debug Brain               │
                               │  - 5-Phase Systematic Root-Cause Debug  │
                               │  - The 4 Laws of Pristine Code          │
                               │  - Pre-Built Accessible UI Templates    │
                               │  - Polyglot Type Safety & Anti-Patterns │
                               └───────────┬────────┬───────────┬────────┘
                                           │        │           │
                       ┌───────────────────┘        │           └───────────────────┐
                       ▼                            ▼                               ▼
       ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
       │ references/DEBUG_UTILS    │ │ references/COMMON_BUGS    │ │ references/LANDING_PAGE   │
       │ Polyglot Result types &   │ │ Catalog of Top 10 common  │ │ Accessible Hero, Navbar,  │
       │ type narrowing guards     │ │ AI bugs & surgical fixes  │ │ Pricing & FAQ components  │
       └───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │ Polyglot CI Quality Gate (Node/Py/Go/Rs)│
                               │  (.github/workflows/quality-gate.yml)   │
                               └─────────────────────────────────────────┘
```

---

## 🔬 Core Capabilities

### 1. Pristine Code Generation (The 4 Laws)
1. **Context Ingestion Before Generation**: Inspect project models, path aliases (`@/*`), and utilities before writing code.
2. **"Parse, Don't Validate"**: Parse external data into validated domain types at system boundaries.
3. **Make Illegal States Unrepresentable**: Use Discriminated Unions / Tagged Variants instead of loose nullable flags.
4. **No Placeholders or TODO Stubs**: Always write complete, functional, type-safe logic.

### 2. 5-Phase Systematic Root-Cause Debugging
```text
[1. Diagnose & Scan] ──> [2. Delta Isolation] ──> [3. Minimal Surgical Fix] ──> [4. Zero-Red-Line Gate] ──> [5. /learn Post-Mortem]
```
* **Eliminates Compiler Red Lines**: Clears diagnostics across TypeScript (`tsc`), Python (`mypy`), Go (`go vet`), and Rust (`cargo check`).
* **The Iron Law of Debugging**: Never apply speculative fixes or symptom-masking (`@ts-ignore`, `any`, empty `try/catch`, dummy `setTimeout`).

### 3. Pre-Built Landing Page & UI Patterns
Accessible, mobile-first component patterns in `references/LANDING_PAGE_PATTERNS.md`:
* 🌟 **Hero Sections**: Gradient typography, CTA groups, responsive pill badges.
* 🧭 **Glassmorphic Navbars**: Mobile slide-out sheets, keyboard accessibility, blur backdrop.
* 💳 **Pricing Matrices**: Monthly/annual toggle, featured tier highlighting, feature checklists.
* ❓ **FAQ Accordions**: Accessible disclosure widgets, animated transitions, semantic markup.

---

## 📂 Repository Structure

```text
Antigravityskill/
├── .github/
│   ├── workflows/
│   │   └── quality-gate.yml               # 🚦 Polyglot CI Quality Gate (Node, Python, Go, Rust, Meta)
│   └── pull_request_template.md           # 📝 Standardized PR template with quality check list
├── .gitignore                             # 🛡️ Comprehensive ignore file (.env, node_modules, .venv, credentials)
├── LICENSE                                # 📄 MIT Open Source License
├── project-profile/
│   └── PROJECT_PROFILE.md                 # 🎯 Universal facts schema, coding standards & invariants
├── references/
│   ├── LANDING_PAGE_PATTERNS.md           # 🎨 Accessible UI component patterns (Hero, Navbar, Pricing, FAQ)
│   ├── DEBUG_UTILITIES.md                 # 🧰 Polyglot Result types, type guards & anti-hallucination helpers
│   ├── COMMON_BUG_PATTERNS.md             # 🐛 Catalog of Top 10 common AI bug patterns & surgical fixes
│   └── CLI_CHEAT_SHEET.md                 # ⌨️ Cross-platform terminal diagnostic commands
├── SKILL.md                               # 🧭 Master /debug skill definition & routing framework
└── README.md                              # 📖 Comprehensive engineering manual & install guides
```

---

## 📚 References & Guides Matrix

| Reference Document | Purpose & Contents |
| :--- | :--- |
| **[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)** | Pre-built, accessible React + Tailwind UI components: Hero sections, Glassmorphic Navbars, Pricing matrices, and FAQ accordions. |
| **[references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)** | Polyglot `Result<T, E>` types, type narrowing guards, safe boundary parsers, and anti-hallucination helpers. |
| **[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)** | Catalog of top 10 recurring AI anti-patterns (floating promises, stale closures, missing keys) and surgical fixes. |
| **[references/CLI_CHEAT_SHEET.md](references/CLI_CHEAT_SHEET.md)** | Cross-platform commands for TypeScript (`tsc`), Python (`mypy`, `pytest`), Go (`go vet`), and Rust (`cargo check`). |

---

## 🚀 Installation & Setup

### Option 1: Project-Level Installation (Recommended for Teams)

Install the skill suite directly into your repository:

```bash
# 1. Clone or copy Antigravityskill into your project's .gemini/skills directory
mkdir -p .gemini/skills
cp -r /path/to/Antigravityskill .gemini/skills/antigravityskill

# 2. Copy and configure the project profile
mkdir -p project-profile
cp .gemini/skills/antigravityskill/project-profile/PROJECT_PROFILE.md project-profile/
```

### Option 2: Global Installation (Workstation-Wide)

Install globally so that Antigravity loads the skill suite across all local repositories:

* **Windows (PowerShell)**:
  ```powershell
  New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\antigravity\skills"
  Copy-Item -Recurse -Force "Antigravityskill" "$env:USERPROFILE\.gemini\antigravity\skills\antigravityskill"
  ```
* **macOS / Linux**:
  ```bash
  mkdir -p ~/.gemini/antigravity/skills
  cp -r Antigravityskill ~/.gemini/antigravity/skills/antigravityskill
  ```

---

## 🚦 Traffic Light Safety Boundaries & Rules

| Category | Action | System Enforcement |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets or API credentials | Hard blocked; flags unignored secrets and halts staging. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive reset | Hard blocked; remote history and unstaged work protected. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing errors with `@ts-ignore`, `any`, empty catch | Hard blocked; root-cause resolution required. |
| 🟡 **REQUIRES CONFIRMATION** | Out-of-scope code refactoring | Prompts user with proposal before modifying code. |
| 🟡 **REQUIRES CONFIRMATION** | Installing new third-party packages | Prompts user to confirm if native utilities suffice. |
| 🟡 **REQUIRES CONFIRMATION** | Destructive database migrations or schema drops | Prompts user to confirm data safety and backup status. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running compiler & test commands (`tsc`, `mypy`, `npm test`) | Runs automatically across all supported language stacks. |
| 🟢 **AUTOMATICALLY ALLOWED** | Generating accessible, responsive UI landing page components | Runs automatically using pre-tested patterns. |
| 🟢 **AUTOMATICALLY ALLOWED** | Recommending `/learn` summaries on successful fixes | Persists architectural lessons into Antigravity long-term memory. |

---

## 🧠 Continuous Learning (`/learn`) & Circuit Breaker

### The "Rule of Three" Circuit Breaker
If **3 consecutive edit attempts fail**:
1. **STOP modifying code immediately.**
2. Acknowledge that current assumptions about the codebase are flawed.
3. Re-examine interface contracts, verify environment configuration, and formulate a new hypothesis.
4. Report findings to the user or orchestrator rather than looping destructively.

### Mandatory `/learn` Post-Mortem Prompt
Every time an agent resolves a defect, establishes a new pattern, or completes a push delivery, it concludes with:

```markdown
---

### 🧠 Persist This Lesson in Antigravity

To ensure Antigravity remembers this invariant and avoids this issue in future sessions, run:

> **/learn**
> *Lesson*: [1-2 sentences summarizing the specific invariant, pattern, or gotcha discovered]
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
