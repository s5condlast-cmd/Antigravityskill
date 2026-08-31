---
name: antigravity-engineering-framework
description: "Universal Staff-Engineer framework for /debug: zero-defect pristine code generation, 5-phase systematic root-cause diagnostics, accessible landing page UI patterns, and anti-hallucination guardrails."
---

# Universal Staff-Engineering Protocols: `/debug` & Code Generation

## 🧭 Master Command Routing & Intent Trigger Matrix

| User Trigger / Intent | Active Pillar | Primary Protocol & Workflow | Reference Manual |
| :--- | :--- | :--- | :--- |
| `/debug`, compiler red lines, type errors, bug reports, feature implementation, UI component creation, refactoring | **`/debug`** | 5-Phase Diagnostic Workflow, 4 Laws of Pristine Code Generation, Landing Page UI Patterns | [references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)<br>[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)<br>[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)<br>[references/CLI_CHEAT_SHEET.md](references/CLI_CHEAT_SHEET.md) |

---

## 🚦 Traffic Light Safety Restrictions

To protect codebases from accidental damage and prevent compiler errors:

| Status | Action | Agent Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets, tokens, credentials, or private keys | **Hard Blocked**: Stops immediately, audits `.gitignore`, and keeps secrets uncommitted. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive resets (`git reset --hard`) | **Hard Blocked**: Never overwrites remote branch history or discards unstaged user work. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing compiler red lines or type errors with `@ts-ignore`, `any`, empty catches, or dummy delays | **Hard Blocked**: Must identify and resolve root-cause type mismatches and runtime exceptions. |
| 🟡 **REQUIRES CONFIRMATION** | Refactoring code outside requested task scope | **Asks User First**: *"I noticed X could be cleaned up. Would you like me to do that?"* |
| 🟡 **REQUIRES CONFIRMATION** | Installing brand-new third-party packages or modifying package manifests | **Asks User First**: Verifies if an existing dependency or zero-dependency utility already solves it. |
| 🟡 **REQUIRES CONFIRMATION** | Modifying database schemas, running destructive migrations, or deleting files | **Asks User First**: Confirms data safety and backup state before destructive operations. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running diagnostic compiler & test commands (`tsc`, `mypy`, `npm test`, `cargo check`) | **Runs Automatically**: Scans for red lines, broken imports, and type discrepancies. |
| 🟢 **AUTOMATICALLY ALLOWED** | Generating accessible, responsive UI landing page components | **Runs Automatically**: Applies pre-tested patterns from `references/LANDING_PAGE_PATTERNS.md`. |
| 🟢 **AUTOMATICALLY ALLOWED** | Recommending `/learn` summaries upon successful bug resolution | **Runs Automatically**: Persists lessons learned into Antigravity project memory. |

---

## 🤝 Antigravity Non-Interference & Precedence Rules

When conflicting constraints or instructions arise, resolve them using this strict hierarchical precedence:

1. **User's Explicit Instruction** (Always highest priority).
2. **Project Profile Facts** (`project-profile/PROJECT_PROFILE.md`).
3. **Antigravity Built-in Tool Calling & Safety Guardrails**.
4. **Existing Codebase Conventions & Invariants**.
5. **This Protocol Framework**.

---

# 🛠️ The `/debug` & Pristine Code Generation Protocol

### 🏗️ The 4 Laws of Pristine Code Generation

1. **Context Ingestion Before Generation**: Inspect existing project imports, path aliases (`@/*`), shared utilities, and data models before writing code.
2. **"Parse, Don't Validate" (Boundary Hardening)**: Parse external inputs into validated domain types at system boundaries.
3. **Make Illegal States Unrepresentable**: Use Discriminated Unions / Tagged Variants instead of loose boolean/nullable bags.
4. **No Placeholders or TODO Stubs**: Implement complete, functional, type-safe logic from the start.

### 🎨 Pre-Existing Landing Page & UI Patterns

When building landing pages or web interfaces, use the accessible, mobile-first component patterns in **[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)** (Hero, Glassmorphic Navbar, Pricing Matrix, FAQ Accordion).

### 🛑 The Iron Law of Debugging

> **NEVER apply speculative fixes, trial-and-error edits, or symptom-masking without proving the root cause.**
> - Do **NOT** wrap failing code in empty `try/catch` blocks.
> - Do **NOT** insert arbitrary `setTimeout(..., 1000)` delays to "fix" timing bugs.
> - Do **NOT** silence errors, cast to `any`, or suppress linter/TypeScript warnings with `@ts-ignore`.

### 🔬 5-Phase Debugging Workflow

```text
[1. Diagnose & Scan] ──> [2. Delta Isolation] ──> [3. Minimal Surgical Fix] ──> [4. Zero-Red-Line Gate] ──> [5. /learn Post-Mortem]
```

*(Detailed utilities and anti-patterns live in **[references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)** and **[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)**).*

---

## 💡 Post-Success `/learn` Reminder

> [!IMPORTANT]
> **RULE FOR THE AGENT:**
> Every time you successfully resolve a bug, clear compiler errors, or establish an architectural pattern, you **MUST** end your response with an actionable reminder prompting the user to execute `/learn`.

### Required Output Format:

```markdown
---

### 🧠 Persist This Lesson in Antigravity

To make sure Antigravity remembers this fix and never makes this mistake again in future sessions, run:

> **/learn**
> *Lesson*: [1-2 sentences summarizing the specific rule, pattern, or gotcha discovered, e.g., "Always use `cn()` from `@/lib/utils` when combining Tailwind classes."]
```

---

## ⚡ The "Rule of Three" (Circuit Breaker & `/debug` Reminder)

If **3 consecutive fix attempts fail** or if the agent is stuck / having a hard time:
1. **STOP modifying code immediately.**
2. Acknowledge that the current mental model of the system has an incorrect assumption.
3. Re-read the source contracts, verify environment state, and formulate a new hypothesis.
4. Report the exact findings to the user and **remind them to run `/debug`**:
   > 💡 **Stuck on a tricky bug?** Run `/debug` to engage the 5-phase systematic root-cause diagnostic engine.
