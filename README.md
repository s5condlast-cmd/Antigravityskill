# 🛠️ Universal AI Agent Engineering Suite (`/debug` & `/push`)

[![CI Quality Gate](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml)
[![Node.js](https://img.shields.io/badge/node-20%2B-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5%2B-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/python-3.12%2B-blue.svg)](https://www.python.org/)
[![Go](https://img.shields.io/badge/go-1.22%2B-blue.svg)](https://go.dev/)
[![Rust](https://img.shields.io/badge/rust-2021%20edition-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A specialized, battle-tested **Antigravity Slash Skill Suite** delivering zero-defect code generation, safe branch-protected git delivery, polyglot diagnostic scanning, accessible UI component patterns, and deterministic pre-flight quality checks.

---

## 🌟 The Core Skill Pillars

```text
                               ┌─────────────────────────────────────────┐
                               │       User Prompt / Slash Command       │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │       Unified SKILL.md Framework        │
                               │   (Traffic Light Guardrails & Router)   │
                               └──────────────┬───────────┬──────────────┘
                                              │           │
                               ┌──────────────┘           └──────────────┐
                               ▼                                         ▼
               ┌───────────────────────────┐             ┌───────────────────────────┐
               │     Pillar 1: /debug      │             │      Pillar 2: /push      │
               │  - 5-Phase Diagnostics    │             │  - 5-Step Delivery Runbook│
               │  - 4 Laws of Pristine Code│             │  - Pre-flight Gatekeeper  │
               │  - Landing Page UI Toolkit│             │  - Branch Protection      │
               │  - Anti-Hallucination     │             │  - Atomic Commits & PRs   │
               └───────────────┬───────────┘             └──────────────┬────────────┘
                               │                                        │
                               ▼                                        ▼
               ┌───────────────────────────┐             ┌───────────────────────────┐
               │ references/DEBUG_UTILS    │             │ references/PUSH_PROTOCOL  │
               │ references/COMMON_BUGS    │             │ references/BRANCH_COMMITS │
               │ references/LANDING_PAGE   │             │ scripts/diagnose.js / .py │
               └───────────────────────────┘             └───────────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │ Universal CI/CD Quality Gate (6 Jobs)   │
                               │  (.github/workflows/quality-gate.yml)   │
                               └─────────────────────────────────────────┘
```

---

### 🔬 Pillar 1: `/debug` (The Engineering Brain & Pristine Code Generator)

Transforms problem statements into mathematically sound, zero-defect code while eradicating compiler red lines:

* **Eliminates Compiler Red Lines**: Clears diagnostics across TypeScript (`tsc`), Python (`mypy`), Go (`go vet`), and Rust (`cargo check`).
* **The 4 Laws of Pristine Code Generation**:
  1. *Context Ingestion Before Generation*: Inspect project models, path aliases (`@/*`), and utilities before writing code.
  2. *"Parse, Don't Validate"*: Parse external data into validated domain types at system boundaries.
  3. *Make Illegal States Unrepresentable*: Use Discriminated Unions / Tagged Variants instead of loose nullable flags.
  4. *No Placeholders or TODO Stubs*: Always write complete, functional, type-safe logic.
* **Pre-Built Landing Page & UI Patterns**: Accessible, mobile-first component patterns in `references/LANDING_PAGE_PATTERNS.md` (**Hero Sections, Glassmorphic Navbars, Pricing Matrices, and FAQ Accordions**).
* **5-Phase Systematic Root-Cause Debugging**:
  ```text
  [1. Diagnose & Scan] ──> [2. Delta Isolation] ──> [3. Minimal Surgical Fix] ──> [4. Zero-Red-Line Gate] ──> [5. /learn Post-Mortem]
  ```
* **References**: [references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md), [references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md), [references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md).

---

### 🚀 Pillar 2: `/push` (The Safe Delivery Gatekeeper & Branch Protection Engine)

Automates safe git delivery, protects production branches, and enforces conventional commits:

* **The 3 Golden Rules of `/push`**:
  1. *NO PUSH ON BROKEN CODE*: Pre-flight diagnostic scanner must pass with 0 errors.
  2. *NO DIRECT PUSH TO MAIN*: Strictly blocks pushes to `main`/`master`/`develop`; automatically routes to feature branches.
  3. *ATOMIC CONVENTIONAL COMMITS*: Standardized commit taxonomy (`feat:`, `ui:`, `fix:`, `refactor:`, `chore:`, `perf:`).
* **5-Step Delivery Runbook**:
  ```text
  [1. Pre-Flight Health Scan] ──> [2. Secrets Audit] ──> [3. Branch Check] ──> [4. Conventional Commit] ──> [5. Safe Remote Push]
  ```
* **Standard Branch Naming Taxonomy**: Categorized branches (`feat/<domain>-<desc>`, `ui/<component>`, `fix/<issue>`, `perf/<scope>`).
* **Automated PR Body Generation**: Generates comprehensive pull request descriptions conforming to `.github/pull_request_template.md`.
* **References**: [references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md), [references/BRANCH_AND_COMMIT_CONVENTIONS.md](references/BRANCH_AND_COMMIT_CONVENTIONS.md).

---

## 🏗️ Git Delivery & Branch Protection Flow

```text
 ┌───────────────────────────┐
 │ Local Code Modifications  │
 └─────────────┬─────────────┘
               │
               ▼
 ┌───────────────────────────┐      Fail      ┌───────────────────────────┐
 │ Pre-Flight Health Scanner │ ─────────────> │ Run Pillar 1: /debug      │
 │ node scripts/diagnose.js  │                │ Root-cause fix & typecheck│
 └─────────────┬─────────────┘                └───────────────────────────┘
               │ Pass (0 errors)
               ▼
 ┌───────────────────────────┐      main      ┌───────────────────────────┐
 │ Branch Protection Audit   │ ─────────────> │ Auto-switch to feat/*     │
 │ --check-git               │                │ Standard Branch Taxonomy  │
 └─────────────┬─────────────┘                └─────────────┬─────────────┘
               │ Safe Branch                                │
               ▼ <──────────────────────────────────────────┘
 ┌───────────────────────────┐
 │ Atomic Conventional Commit│
 │ feat(scope): message      │
 └─────────────┬─────────────┘
               │
               ▼
 ┌───────────────────────────┐
 │ Remote Push & PR Creation │ ───> Uses .github/pull_request_template.md
 └─────────────┬─────────────┘
               │
               ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                       GitHub Actions: Universal Zero-Red-Line Quality Gate                      │
 │                                                                                                 │
 │ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │
 │ │   meta-gate    │ │diagnostic-gate │ │   node-gate    │ │  python-gate   │ │    go-gate     │ │
 │ │ SKILL frontmat │ │ JS/Py Scanners │ │ tsc --noEmit   │ │ mypy, pytest   │ │ go vet, test   │ │
 │ │ Reference links│ │ Test Harnesses │ │ lint, test     │ │ ruff, flake8   │ │ go build       │ │
 │ └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ │
 └─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Structure

```text
Antigravityskill/
├── .github/
│   ├── workflows/
│   │   └── quality-gate.yml               # 🚦 Polyglot CI Quality Gate (Node, Python, Go, Rust, Meta, Scripts)
│   └── pull_request_template.md           # 📝 Standardized PR template with pre-flight check list
├── .gitignore                             # 🛡️ Comprehensive ignore file (.env, node_modules, .venv, credentials)
├── LICENSE                                # 📄 MIT Open Source License
├── project-profile/
│   └── PROJECT_PROFILE.md                 # 🎯 Universal facts schema, coding standards & invariants
├── references/
│   ├── PUSH_PROTOCOL.md                   # 🚀 5-Step safe branch push, commit & PR runbook
│   ├── BRANCH_AND_COMMIT_CONVENTIONS.md   # 🌿 Branch taxonomy (feat/*, ui/*, fix/*) & Conventional Commits
│   ├── LANDING_PAGE_PATTERNS.md           # 🎨 Accessible UI component patterns (Hero, Navbar, Pricing, FAQ)
│   ├── DEBUG_UTILITIES.md                 # 🧰 Polyglot Result types, type guards & anti-hallucination helpers
│   ├── COMMON_BUG_PATTERNS.md             # 🐛 Catalog of Top 10 common AI bug patterns & surgical fixes
│   └── CLI_CHEAT_SHEET.md                 # ⌨️ Cross-platform terminal diagnostic commands
├── scripts/
│   ├── diagnose.js                        # ⚡ Polyglot Node.js scanner (--strict, --json, --check-git, --help)
│   ├── diagnose.py                        # 🐍 Zero-dependency Python standard library scanner
│   ├── test-diagnose.js                   # 🧪 Node.js automated test harness for diagnostic scanners
│   └── test_diagnose.py                   # 🧪 Python automated test harness for diagnostic scanners
├── SKILL.md                               # 🧭 Master 2-pillar skill definition & routing framework
└── README.md                              # 📖 Comprehensive engineering manual, diagrams & install guides
```

---

## ⚡ Polyglot Diagnostic Scanner & Test Harness

The repository includes dual standalone diagnostic health scanners (`diagnose.js` and `diagnose.py`) requiring **zero external dependencies**:

### CLI Flags Reference

| CLI Flag | Short Flag | Description |
| :--- | :--- | :--- |
| `--strict` | `-s` | Escalates warnings to hard failure exit code `1`. |
| `--json` | `-j` | Emits structured, machine-readable JSON output. |
| `--check-git` | *(none)* | Audits active branch against `main`/`master` and scans for uncommitted secrets. |
| `--dir <path>` | `--cwd` | Specifies custom target directory to scan (defaults to current working directory). |
| `--help` | `-h` | Displays usage manual and exits cleanly with code `0`. |

### Deterministic Exit Codes

* **`0`**: Clean / Pass (100% healthy, zero errors).
* **`1`**: Diagnostic Issues Found (compiler red lines, missing dependencies, uncommitted secrets, strict violations).
* **`2`**: CLI Usage Error (invalid arguments or flags).

### Execution Commands

```bash
# Standard interactive scan
node scripts/diagnose.js
python scripts/diagnose.py

# Strict pre-flight check with git branch safety audit
node scripts/diagnose.js --strict --check-git
python scripts/diagnose.py --strict --check-git

# Structured JSON output for CI pipelines
node scripts/diagnose.js --json
python scripts/diagnose.py --json

# Execute automated diagnostic test harnesses
node scripts/test-diagnose.js
python scripts/test_diagnose.py
```

---

## 🚀 Installation & Setup Workflows

### Option 1: Project-Level Installation (Recommended for Teams)

Install the skill suite directly into your repository so all team members and agents share the exact same protocols:

```bash
# 1. Clone or copy Antigravityskill into your project's .agents directory
mkdir -p .agents/skills
cp -r /path/to/Antigravityskill .agents/skills/antigravityskill

# 2. Copy and configure the project profile
mkdir -p project-profile
cp .agents/skills/antigravityskill/project-profile/PROJECT_PROFILE.md project-profile/

# 3. Verify installation health
node .agents/skills/antigravityskill/scripts/diagnose.js --strict
```

### Option 2: Global Installation (Workstation-Wide)

Install globally so that Antigravity loads the 2-pillar skill suite across all local repositories:

* **Windows**:
  ```powershell
  # Copy to Antigravity global skills directory
  New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\antigravity\skills"
  Copy-Item -Recurse -Force "Antigravityskill" "$env:USERPROFILE\.gemini\antigravity\skills\antigravityskill"
  ```
* **macOS / Linux**:
  ```bash
  # Copy to Antigravity global skills directory
  mkdir -p ~/.gemini/antigravity/skills
  cp -r Antigravityskill ~/.gemini/antigravity/skills/antigravityskill
  ```

### Verification Steps After Installation

```bash
# Verify JS scanner & test harness
node scripts/diagnose.js --help
node scripts/test-diagnose.js

# Verify Python scanner & test harness
python scripts/diagnose.py --help
python scripts/test_diagnose.py
```

---

## 🚦 Traffic Light Safety Boundaries & Rules

| Category | Action | System Enforcement |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Direct commit/push to `main`, `master`, `develop` | Hard blocked; routes to `feat/*`, `fix/*`, `ui/*` branch. |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets or API credentials | Hard blocked; flags unignored secrets and halts staging. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive reset | Hard blocked; remote history and unstaged work protected. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing errors with `@ts-ignore`, `any`, empty catch | Hard blocked; root-cause resolution required. |
| 🔴 **STRICTLY PROHIBITED** | Bypassing pre-flight health scan before commit | Hard blocked; pre-flight check must pass cleanly. |
| 🟡 **REQUIRES CONFIRMATION** | Out-of-scope code refactoring | Prompts user with proposal before modifying code. |
| 🟡 **REQUIRES CONFIRMATION** | Installing new third-party packages | Prompts user to confirm if native utilities suffice. |
| 🟡 **REQUIRES CONFIRMATION** | Destructive database migrations or schema drops | Prompts user to confirm data safety and backup status. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running diagnostic health checks (`diagnose.js`/`py`) | Runs automatically across all supported language stacks. |
| 🟢 **AUTOMATICALLY ALLOWED** | Creating safe branches following standard taxonomy | Runs automatically (`feat/landing-hero`, `fix/navbar-types`). |
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
