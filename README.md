# 🛠️ Antigravity Engineering Skill (`/debug`)

[![CI Quality Gate](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/s5condlast-cmd/Antigravityskill/actions/workflows/quality-gate.yml)
[![Node.js](https://img.shields.io/badge/node-20%2B-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5%2B-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/python-3.12%2B-blue.svg)](https://www.python.org/)
[![Go](https://img.shields.io/badge/go-1.22%2B-blue.svg)](https://go.dev/)
[![Rust](https://img.shields.io/badge/rust-2021%20edition-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A lightweight, production-grade **Antigravity Slash Skill** that equips AI agents with strict type-safety rules, systematic root-cause debugging workflows, accessible UI component templates, and anti-hallucination guardrails.

---

## ✨ Features at a Glance

| Feature | Description |
| :--- | :--- |
| 🎯 **Pristine Code Generation** | Enforces the 4 Laws: context ingestion first, boundary parsing, unrepresentable illegal states, and zero placeholder TODOs. |
| 🔬 **5-Phase Systematic Debugging** | Diagnoses and isolates root causes instead of applying symptom-masking hacks (`@ts-ignore`, empty `catch`, dummy `setTimeout`). |
| 🎨 **Accessible Landing Page UI** | Battle-tested React + Tailwind component patterns for Hero sections, Glassmorphic Navbars, Pricing matrices, and FAQ accordions. |
| 🧠 **Continuous Learning (`/learn`)** | Automatically prompts you to persist architectural conventions and bug fixes into Antigravity project memory. |
| 🚦 **Safety Guardrails** | Strict traffic-light boundaries preventing accidental secrets leaks, destructive resets, or out-of-scope edits. |

---

## 🚀 Quick Start & Installation

### Option 1: Global Install (Works in All Projects)

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

### Option 2: Project-Level Install (For Team Repositories)

```bash
# Copy skill into your workspace
mkdir -p .gemini/skills
cp -r /path/to/Antigravityskill .gemini/skills/antigravityskill

# Copy project facts profile
mkdir -p project-profile
cp .gemini/skills/antigravityskill/project-profile/PROJECT_PROFILE.md project-profile/
```

---

## 💡 How to Use

Simply invoke `/debug` or ask Antigravity to build, debug, or refactor code:

* **Fix compiler errors**:
  > *"/debug fix the TypeScript red lines in `src/components/Navbar.tsx`"*
* **Build accessible landing page UI**:
  > *"/debug build a modern Hero section with gradient text and CTA buttons"*
* **Investigate a tricky bug**:
  > *"/debug investigate why user session tokens expire prematurely"*

---

## 🔬 The 4 Laws of Pristine Code

1. **Context Ingestion First**: Check existing types, schemas, and utils before writing code.
2. **"Parse, Don't Validate"**: Convert external input into validated domain types at boundaries.
3. **Make Illegal States Unrepresentable**: Use Discriminated Unions / Tagged Variants instead of loose nullable flags.
4. **No Placeholders or TODOs**: Always generate complete, fully implemented, type-checked logic.

---

## 📚 Included Reference Guides

All reference guides are organized inside the `references/` folder:

| Document | What's Inside |
| :--- | :--- |
| **[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)** | Production-ready React + Tailwind templates for Hero, Navbar, Pricing, and FAQs. |
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
│   ├── LANDING_PAGE_PATTERNS.md           # Accessible UI patterns
│   ├── DEBUG_UTILITIES.md                 # Type guards & Result types
│   ├── COMMON_BUG_PATTERNS.md             # Common AI bug patterns & fixes
│   └── CLI_CHEAT_SHEET.md                 # Diagnostic CLI cheat sheet
├── SKILL.md                               # Master /debug skill definition
├── README.md                              # This documentation
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
