---
name: antigravity-engineering-framework
description: "Universal Staff-Engineer framework for /debug (zero-defect code generation, systematic root-cause diagnostics, landing page UI templates), /push (branch-protected git delivery, pre-flight gatekeeper, conventional commits), and /teamwork-preview (multi-agent prompt synthesis, team topologies, and autonomous delegation)."
---

# Universal Staff-Engineering Protocols: `/debug`, `/push`, & `/teamwork-preview`

## 🧭 Master Command Routing & Intent Trigger Matrix

| User Trigger / Intent | Active Pillar | Primary Protocol & Workflow | Reference Manual |
| :--- | :--- | :--- | :--- |
| `/debug`, compiler red lines, type errors, bug reports, feature implementation, UI component creation | **Pillar 1: `/debug`** | 5-Phase Diagnostic Workflow, 4 Laws of Pristine Code Generation, Landing Page UI Patterns | [references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)<br>[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)<br>[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md) |
| `/push`, git commit, branch creation, pull request delivery, pre-flight check, release delivery | **Pillar 2: `/push`** | 5-Step Delivery Workflow, Branch Protection Check, Atomic Conventional Commits | [references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md)<br>[references/BRANCH_AND_COMMIT_CONVENTIONS.md](references/BRANCH_AND_COMMIT_CONVENTIONS.md)<br>[.github/pull_request_template.md](.github/pull_request_template.md) |
| `/teamwork-preview`, multi-agent planning, complex refactor, team delegation, swarm synthesis | **Pillar 3: `/teamwork-preview`** | 9-Step Prompt Synthesis, Topology Selection, Live Artifact Lifecycle, Integrity Modes | [references/TEAMWORK_ORCHESTRATION.md](references/TEAMWORK_ORCHESTRATION.md)<br>[references/MULTI_AGENT_PATTERNS.md](references/MULTI_AGENT_PATTERNS.md) |

---

## 🚦 Traffic Light Safety Restrictions (Unified Framework)

To protect codebases from accidental damage and prevent swarm coordination failures, all agents adhere strictly to unified traffic light safety boundaries:

| Status | Action | Agent Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Pushing directly to `main`, `master`, or `develop` | **Hard Blocked**: Automatically creates a `feat/*`, `fix/*`, or `ui/*` branch following the branch taxonomy. |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets, tokens, credentials, or private keys | **Hard Blocked**: Stops immediately, audits `.gitignore`, and cleans staged files. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive resets (`git reset --hard`) | **Hard Blocked**: Never overwrites remote branch history or discards unstaged user work. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing compiler red lines or type errors with `@ts-ignore`, `any`, empty catches, or dummy delays | **Hard Blocked**: Must identify and resolve root-cause type mismatches and runtime exceptions. |
| 🔴 **STRICTLY PROHIBITED** | Modifying source code directly when operating in read-only / explorer / verifier / auditor roles | **Hard Blocked**: Explorers and auditors write findings exclusively to `.agents/<agent_folder>/`. |
| 🔴 **STRICTLY PROHIBITED** | Placing agent metadata, progress logs, or scratch files into project source directories | **Hard Blocked**: All agent metadata MUST live strictly inside `.agents/<agent_folder>/`. |
| 🔴 **STRICTLY PROHIBITED** | Spawning subagents exceeding 16 spawns without executing soft succession | **Hard Blocked**: Executes soft handoff to successor orchestrator to prevent context overflow. |
| 🔴 **STRICTLY PROHIBITED** | Bypassing pre-flight health scan before commit or pull request delivery | **Hard Blocked**: Must execute `node scripts/diagnose.js --strict` (or Python equivalent) with 0 errors. |
| 🟡 **REQUIRES CONFIRMATION** | Refactoring code outside requested task scope | **Asks User First**: *"I noticed X could be cleaned up. Would you like me to do that?"* |
| 🟡 **REQUIRES CONFIRMATION** | Installing brand-new third-party packages or modifying package manifests | **Asks User First**: Verifies if an existing dependency or zero-dependency utility already solves it. |
| 🟡 **REQUIRES CONFIRMATION** | Modifying database schemas, running destructive migrations, or deleting files | **Asks User First**: Confirms data safety and backup state before destructive operations. |
| 🟡 **REQUIRES CONFIRMATION** | Switching integrity modes (e.g., from `development` to `demo` or `benchmark`) | **Asks User First**: Confirms execution mode constraints with the user before proceeding. |
| 🟡 **REQUIRES CONFIRMATION** | Initiating full swarm (>6 agents) without prior user topology approval | **Asks User First**: Confirms swarm architecture and resource allocation via `/teamwork-preview`. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running diagnostic health checks (`node scripts/diagnose.js`, `python scripts/diagnose.py`) | **Runs Automatically**: Scans for red lines, broken imports, missing dependencies, and environment health. |
| 🟢 **AUTOMATICALLY ALLOWED** | Creating safe feature/fix/ui branches following the standard taxonomy | **Runs Automatically**: Enforces standardized naming (`feat/landing-hero`, `fix/navbar-types`). |
| 🟢 **AUTOMATICALLY ALLOWED** | Generating structured `/teamwork-preview` plans and multi-agent prompt synthesis | **Runs Automatically**: Prepares execution plans, topology matrices, and delegation briefs. |
| 🟢 **AUTOMATICALLY ALLOWED** | Managing agent-local workspace artifacts (`BRIEFING.md`, `DISPATCH.md`, `progress.md`, `handoff.md`) | **Runs Automatically**: Maintains persistent memory and liveness heartbeats in `.agents/<agent_folder>/`. |
| 🟢 **AUTOMATICALLY ALLOWED** | Recommending `/learn` summaries upon successful bug resolution or push delivery | **Runs Automatically**: Persists lessons learned into Antigravity project memory. |

---

## 🤝 Antigravity Non-Interference & Precedence Rules

When conflicting constraints or instructions arise, resolve them using this strict hierarchical precedence:

1. **User's Explicit Instruction** (Always highest priority).
2. **Project Profile Facts** (`project-profile/PROJECT_PROFILE.md`).
3. **Antigravity Built-in Tool Calling & Safety Guardrails**.
4. **Existing Codebase Conventions & Invariants**.
5. **This Protocol Framework**.

---

# 🛠️ SECTION 1: The `/debug` & Code Generation Protocol

### 🏗️ The 4 Laws of Pristine Code Generation

1. **Context Ingestion Before Generation**: Inspect existing project imports, path aliases, shared utilities, and data models before writing code.
2. **"Parse, Don't Validate" (Boundary Hardening)**: Parse external inputs into validated domain types at boundaries.
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

# 🚀 SECTION 2: The `/push` & Branching Protocol

When the user or agent is ready to commit and deliver changes to GitHub (see full runbook in **[references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md)**):

### 🛑 The 3 Golden Rules of `/push`

1. **NO PUSH ON BROKEN CODE**: Run `node scripts/diagnose.js --strict` (or `python scripts/diagnose.py --strict`) before staging.
2. **NO DIRECT PUSH TO MAIN**: If on `main`/`master`/`develop`, automatically switch to a branch using the **[Branch Naming Taxonomy](references/BRANCH_AND_COMMIT_CONVENTIONS.md)** (`feat/landing-hero`, `ui/landing-navbar`, `fix/navbar-types`).
3. **ATOMIC CONVENTIONAL COMMITS**: Commit with standard prefixes (`feat:`, `ui:`, `fix:`, `refactor:`, `chore:`).

### 📋 5-Step Delivery Workflow

1. **Pre-Flight Health Scan**: Execute health scanner (`node scripts/diagnose.js --strict --check-git` or `python scripts/diagnose.py --strict --check-git`) $\rightarrow$ Confirm **100% HEALTHY (0 errors)**.
2. **Secrets & Ignore Audit**: Check `git status` to ensure `.env`, tokens, credentials, and scratch files are ignored by `.gitignore`.
3. **Branch Protection Check**: If on `main`/`master`/`develop`, create a dedicated branch: `git checkout -b <category>/<domain>-<short-description>`.
4. **Conventional Commit**: Stage files and commit: `git commit -m "type(scope): message"`.
5. **Safe Remote Push**: Push branch: `git push -u origin <branch-name>` and format the PR body using **[.github/pull_request_template.md](.github/pull_request_template.md)**.

---

# 👥 SECTION 3: The `/teamwork-preview` & Multi-Agent Orchestration Protocol

When invoked with `/teamwork-preview` or when coordinating complex multi-agent engineering workflows:

### 🌟 Core Mission of `/teamwork-preview`

To analyze complex engineering goals, decompose them into orthogonal milestones, select optimal multi-agent topologies, and synthesize structured execution prompts and artifact contracts before executing changes.

### 🏗️ The 4 Pillars of `/teamwork-preview`

1. **9-Step Prompt Synthesis Pipeline**: A structured methodology transforming high-level goals into hardened subagent instructions (see **[references/TEAMWORK_ORCHESTRATION.md](references/TEAMWORK_ORCHESTRATION.md)**).
2. **Team Topology Decision Matrix**: Selecting the right coordination pattern (Document Review, Proof Pipeline, Small Focused Team, Large-Scale Proof Swarm, Full Swarm) based on task scope (see **[references/MULTI_AGENT_PATTERNS.md](references/MULTI_AGENT_PATTERNS.md)**).
3. **Live Workspace Artifact Management**: Enforcing persistent working memory via `.agents/<agent_folder>/` containing `BRIEFING.md` (under 100 lines with 🔒 append-only sections), `DISPATCH.md` (timestamped instruction history), `progress.md` (liveness heartbeat), and `handoff.md` (5-component handoff).
4. **Integrity Mode Conformance**: Operating strictly according to the designated mode (`development`, `demo`, or `benchmark`).

### 🌐 The 5 Team Topologies Overview

- **1. Document Review**: 1 Lead Synthesizer + N Parallel Specialist Reviewers (for PR audits, RFC reviews, documentation verification).
- **2. Proof Pipeline**: Sequential staged pipeline (Explorer $\rightarrow$ Implementer $\rightarrow$ Verifier $\rightarrow$ Auditor) with strict gates.
- **3. Small Focused Team**: 1 Orchestrator + 2–3 Specialist Workers (Explorer + Implementer + Verifier) for targeted features and components.
- **4. Large-Scale Proof Swarm**: 2-Tier Hierarchical Swarm (Meta-Orchestrator $\rightarrow$ Domain Sub-Orchestrators $\rightarrow$ Worker Pools $\rightarrow$ Global Auditor) for monorepos and cross-package refactors.
- **5. Full Swarm (Dual-Track)**: Project Orchestrator coordinating two concurrent tracks: Implementation Track (milestones R1..Rn) and independent E2E Testing Track (Tiers 1–4 Verifiers), gated by Sentinel / Forensic Auditor.

### 📋 Standardized `/teamwork-preview` Output Plan Schema

Every `/teamwork-preview` generation MUST produce a structured preview artifact formatted as follows:

```markdown
# Teamwork Preview Plan: [Task Title]

## 1. Mission & Scope Definition
- **Objective**: [1-2 sentences summarizing the goal]
- **Target Integrity Mode**: [development | demo | benchmark]
- **Invariants**: [Core rules and constraints that cannot be violated]

## 2. Team Topology & Role Roster
- **Selected Topology**: [Document Review | Proof Pipeline | Small Focused Team | Large-Scale Proof Swarm | Full Swarm]
- **Coordination Rationale**: [Why this topology is selected]
- **Role Assignments**:
  - `orchestrator`: Planning, gating, delegation, synthesis
  - `explorer_1`: [Specific discovery scope]
  - `worker_1`: [Specific implementation scope]
  - `verifier_1`: [Independent verification scope]

## 3. Work Breakdown Structure (DAG)
- [ ] Milestone 1: Discovery & Analysis (Explorer)
- [ ] Milestone 2: Implementation (Worker)
- [ ] Milestone 3: Independent Verification (Verifier)
- [ ] Milestone 4: Final Quality Gate & PR Prep (Orchestrator)

## 4. Live Artifact Hierarchy
- `.agents/orchestrator/` (BRIEFING.md, progress.md)
- `.agents/<subagent_1>/` (BRIEFING.md, DISPATCH.md, progress.md, handoff.md)
- `.agents/<subagent_2>/` (BRIEFING.md, DISPATCH.md, progress.md, handoff.md)

## 5. Verification Gate & Pass/Fail Criteria
- Exact diagnostic command: `node scripts/diagnose.js --strict`
- Automated test command: `npm test` or `pytest`
- Binary Veto Criteria: 0 compiler errors, 0 linter warnings, 100% test assertions pass.
```

---

## 💡 The Mandatory `/learn` Trigger Rule

> [!IMPORTANT]
> **RULE FOR THE AGENT:**
> Every time you resolve a bug, establish an architectural pattern, or complete a `/push` delivery, you **MUST** end your response with an actionable recommendation prompting the user to execute `/learn`.

### Required Output Format:

```markdown
---

### 🧠 Persist This Lesson in Antigravity

To make sure Antigravity remembers this fix and never makes this mistake again in future sessions, run:

> **/learn**
> *Lesson*: [1-2 sentences summarizing the specific rule, pattern, or gotcha discovered, e.g., "Always use `cn()` from `@/lib/utils` when combining Tailwind classes, and follow the standard branch taxonomy `feat/landing-*`."]
```

---

## ⚡ The "Rule of Three" (Circuit Breaker)

If **3 consecutive fix attempts fail**:
1. **STOP modifying code immediately.**
2. Acknowledge that the current mental model of the system has an incorrect assumption.
3. Re-read the source contracts, verify environment state, and formulate a new hypothesis.
4. Report the exact findings to the user rather than loop-thrashing.
