# 🎯 Universal Project Profile (Codebase Facts, Multi-Agent Schema & Invariants)

> 💡 **Purpose**: This document is the authoritative single source of truth for repository facts, multi-agent orchestration schemas, tool permissions, and verification invariants that generic skill instructions intentionally leave open. All AI agents, orchestrators, and workers operating within this repository must adhere to the rules defined herein.

---

## 1. 🛠️ Tech Stack & Version Pinning

Explicit version pinning prevents the AI from proposing deprecated APIs, unsupported language features, or incompatible library signatures:

* **Primary Languages & Runtimes**:
  * **TypeScript**: `5.5+` (Strict mode enabled, `noImplicitAny: true`, `strictNullChecks: true`)
  * **Node.js**: `20 LTS+` (ESM and CommonJS interop, Node native test runner / Jest / Vitest)
  * **Python**: `3.12+` (Type hints enabled, standard library + `mypy`, `pytest`, `ruff`, `flake8`)
  * **Go**: `1.22+` (Standard toolchain, `go vet`, `go test`)
  * **Rust**: `2021 Edition / 1.78+` (`cargo check`, `cargo test`, `clippy`)
* **Package Managers**:
  * Node.js: `npm`, `pnpm` (lockfile enforcement `npm ci` / `pnpm install --frozen-lockfile`)
  * Python: `uv`, `pip`, `pipenv` (isolated virtual environments `.venv`)
  * Rust: `cargo` (`Cargo.lock` checked in)
  * Go: `go mod` (`go.mod` and `go.sum` pinned)
* **Core Frameworks & UI**:
  * Web / SSR: Next.js `15` (App Router architecture) / React `19`
  * Styling: Tailwind CSS `v3.4+` / `v4`
  * UI Component Primitives: Radix UI / Shadcn UI (accessible, headless, mobile-first)
  * Icons: Lucide Icons (`lucide-react`)
* **Database & ORM**:
  * Database: PostgreSQL `16+` / SQLite (in-memory or local test fixtures)
  * ORM / Query Builders: Prisma `5.x+` / Drizzle ORM `0.30+`
* **State Management & Data Fetching**:
  * Client State: Zustand `4.5+` / React Context
  * Server State & Caching: TanStack Query (React Query) `v5+`

---

## 2. 🤖 Multi-Agent Orchestration & Integrity Modes

### 2.1 Integrity Mode Configuration
Antigravity operates under three distinct execution modes. Every `/teamwork-preview` plan and worker assignment explicitly binds to one of these modes:

| Mode | Semantics & Execution Constraints |
| :--- | :--- |
| **`development`** *(Default)* | Standard production-grade engineering workflow. Full access to installed dependencies, live compilers (`tsc`, `mypy`, `go vet`, `cargo check`), automated test execution, and pre-flight scanners. Requires 100% test pass and zero compiler red lines. |
| **`demo`** | Speed and visual fidelity prioritized for interactive UI mockups and prototypes. In-memory stubs and mock fixtures permitted when external services are offline. Smoke tests and visual rendering checks required. |
| **`benchmark`** | Strict, deterministic evaluation mode. Zero external dependencies (pure standard library or scratch implementations), frozen sandboxes, deterministic seed data, hard resource limits, and automated metric scoring. |

* **Mode Invariant**: In the absence of an explicit directive, the system executes in `development` mode. Switching modes requires explicit user confirmation.

### 2.2 Subagent Spawn Quota & Succession Protocol (16-Spawn Limit)
To prevent context exhaustion and hallucination in deep swarms:
* **Spawn Threshold**: An active orchestrator is limited to a maximum of **16 spawned subagents** across its lifecycle.
* **Succession Trigger**: Upon reaching 16 spawns, the orchestrator consolidates execution state into `.agents/orchestrator/orchestrator_handoff.md` and executes a soft handoff to a `successor_orchestrator`.
* **Parent Passthrough**: The successor inherits the original caller's conversation ID to ensure seamless user updates.

### 2.3 Supported Team Topologies & Routing Bindings
Orchestrators select from five standard topologies based on problem complexity:

1. **Document Review Topology**: 1 Lead Synthesizer + $N$ Parallel Specialist Reviewers (for PR audits, RFC reviews, docs verification). Read-only inspection.
2. **Proof Pipeline Topology**: Sequential staged pipeline (`Explorer` $\rightarrow$ `Implementer` $\rightarrow$ `Verifier` $\rightarrow$ `Forensic Auditor`) with binary verification gates. For high-assurance algorithms and critical bug fixes.
3. **Small Focused Team Topology**: 1 Orchestrator + 2–3 Specialist Workers (`Explorer` + `Implementer` + `Verifier`). For targeted features and UI components (3–8 files).
4. **Large-Scale Proof Swarm Topology**: 2-Tier Hierarchical Swarm (`Meta-Orchestrator` $\rightarrow$ Domain Sub-Orchestrators $\rightarrow$ Worker Pools $\rightarrow$ Global Auditor). For monorepos and cross-package refactors (10–30+ files).
5. **Full Swarm (Dual-Track) Topology**: Project Orchestrator coordinating two concurrent, independent tracks:
   - *Implementation Track*: Milestone workers implementing features.
   - *Independent E2E Testing Track*: Test engineers authoring black-box E2E test suites (Tiers 1–4) without inspecting implementation code.
   - *Sentinel Auditor*: Validates final integrated deliverables against 100% E2E test suite pass.

### 2.4 Agent Workspace Boundaries & Isolation
* **Working State Directory**: `.agents/<agent_folder>/`
* **Purity Invariant**: `.agents/` contains **ONLY** agent metadata (`BRIEFING.md`, `DISPATCH.md`, `progress.md`, `handoff.md`, review reports). Placing source code, tests, or application data inside `.agents/` is strictly prohibited.
* **Exclusive File Ownership**: Each worker agent is assigned exclusive ownership of specific source files. Modifying files outside the assigned scope is prohibited.

### 2.5 Inter-Agent Communication Contract
* **Files for Content Delivery**: Reports (`handoff.md`), architecture plans, code diffs.
* **Messages for Coordination**: Short notifications using standard 3-part schema (`**Context**`, `**Content**`, `**Action**`).
* **Heartbeat Invariant**: Each agent maintains `progress.md` with `- Last visited: [ISO Timestamp]`, updated every meaningful step and at least every 5 minutes during long-running builds.

---

## 3. 🚦 Tool Permissions & Safety Guardrails

All agents operate within strict traffic-light safety boundaries to protect code integrity, branch safety, and user secrets:

### 3.1 Traffic-Light Boundary Table

| Category | Action / Tool Command | Enforcement Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Pushing directly to `main`, `master`, or `develop` | **Hard Blocked**: Automatically creates a `feat/*`, `fix/*`, or `ui/*` branch. |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets, tokens, credentials, or private keys | **Hard Blocked**: Scans files, enforces `.gitignore`, halts staging immediately. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive resets (`git reset --hard`) | **Hard Blocked**: Never destroys remote history or discards unstaged user work. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing compiler red lines with `@ts-ignore`, `any`, empty catches, or dummy delays | **Hard Blocked**: Must identify and resolve root-cause type and runtime defects. |
| 🔴 **STRICTLY PROHIBITED** | Modifying source code when operating in read-only / explorer / auditor roles | **Hard Blocked**: Findings written exclusively to `.agents/<agent_folder>/`. |
| 🔴 **STRICTLY PROHIBITED** | Placing agent metadata or logs into project source directories (`src/`, `tests/`) | **Hard Blocked**: Agent metadata strictly confined to `.agents/<agent_folder>/`. |
| 🔴 **STRICTLY PROHIBITED** | Spawning subagents beyond 16 spawns without executing succession | **Hard Blocked**: Executes soft handoff to prevent context exhaustion. |
| 🔴 **STRICTLY PROHIBITED** | Bypassing pre-flight health scan before commit or PR delivery | **Hard Blocked**: Must execute `node scripts/diagnose.js --strict` with 0 errors. |
| 🟡 **REQUIRES CONFIRMATION** | Refactoring code outside requested task scope | **Asks User First**: *"I noticed X could be cleaned up. Would you like me to do that?"* |
| 🟡 **REQUIRES CONFIRMATION** | Installing brand-new third-party packages or changing package manifests | **Asks User First**: Verifies if standard library or existing package can solve it. |
| 🟡 **REQUIRES CONFIRMATION** | Modifying database schemas, running destructive migrations, deleting files | **Asks User First**: Confirms data safety and backup state before execution. |
| 🟡 **REQUIRES CONFIRMATION** | Switching integrity modes (e.g. `development` $\rightarrow$ `demo` or `benchmark`) | **Asks User First**: Confirms constraints and trade-offs with user. |
| 🟡 **REQUIRES CONFIRMATION** | Initiating full swarm (>6 agents) without prior user topology approval | **Asks User First**: Presents `/teamwork-preview` plan for user confirmation. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running diagnostic health checks (`node scripts/diagnose.js`, `python scripts/diagnose.py`) | **Runs Automatically**: Polyglot static checks, stack detection, branch audits. |
| 🟢 **AUTOMATICALLY ALLOWED** | Creating safe feature/fix/ui branches following standard taxonomy | **Runs Automatically**: Enforces standardized naming (`feat/landing-hero`, `fix/navbar-types`). |
| 🟢 **AUTOMATICALLY ALLOWED** | Generating structured `/teamwork-preview` plans & prompt synthesis | **Runs Automatically**: Prepares execution plans, topology matrices, delegation briefs. |
| 🟢 **AUTOMATICALLY ALLOWED** | Managing agent-local workspace artifacts in `.agents/<agent_folder>/` | **Runs Automatically**: Maintains persistent memory and liveness heartbeats. |
| 🟢 **AUTOMATICALLY ALLOWED** | Recommending `/learn` summaries upon successful bug fix or push | **Runs Automatically**: Persists lessons learned into Antigravity project memory. |

### 3.2 Role Permissions Matrix

| Archetype | File System Permissions | Allowed Tool Set | Prohibited Actions |
| :--- | :--- | :--- | :--- |
| **Orchestrator** | Read: Repo<br>Write: `.agents/orchestrator/` | `send_message`, `schedule`, `list_dir`, `view_file`, `write_to_file` (own dir), `manage_task` | Modifying source code; pushing commits |
| **Explorer** | Read: Repo<br>Write: `.agents/<explorer>/` | `list_dir`, `view_file`, `grep_search`, `find_by_name`, `send_message`, `write_to_file` (own dir) | `replace_file_content`, destructive `run_command` |
| **Implementer** | Read/Write: Assigned source files<br>Write: `.agents/<worker>/` | `view_file`, `replace_file_content`, `write_to_file`, `run_command` (local build/test), `send_message` | Modifying unassigned files; pushing directly to `main` |
| **Verifier** | Read: Repo & tests<br>Write: `.agents/<verifier>/` | `view_file`, `run_command` (test runner, diagnostic scanners), `send_message`, `write_to_file` (own dir) | Modifying production implementation code |
| **Forensic Auditor** | Read: Repo & all handoffs<br>Write: `.agents/<auditor>/` | `view_file`, `grep_search`, `run_command` (verification scripts), `send_message`, `write_to_file` (own dir) | Modifying code; suppressing test failures; fake approvals |

---

## 4. 🚫 Prohibited Patterns & Banned Libraries ("What NOT To Do")

Explicitly prevents the AI from introducing deprecated libraries, insecure patterns, or type-safety loopholes:

* ❌ **Forbidden Libraries**:
  * Do **NOT** install `moment` or `moment-timezone` $\rightarrow$ Use native `Intl`, `Date`, or lightweight `date-fns` / `dayjs`.
  * Do **NOT** install `axios` or `request` $\rightarrow$ Use native `fetch` with typed wrapper utilities.
  * Do **NOT** install `lodash` or `underscore` for basic utilities $\rightarrow$ Use modern ES2022+ native array/object methods.
  * Do **NOT** install unmaintained CSS-in-JS libraries $\rightarrow$ Use Tailwind CSS or CSS Modules.
* ❌ **Forbidden TypeScript / Typing Practices**:
  * Do **NOT** use `any` $\rightarrow$ Use `unknown` with type narrowing, Type Guards, or Zod schemas.
  * Do **NOT** use `@ts-ignore` or `@ts-nocheck` $\rightarrow$ Fix underlying type discrepancies.
  * Do **NOT** use the non-null assertion operator `!` on external/API data $\rightarrow$ Check boundaries with narrowing.
  * Do **NOT** use the `Object` or `{}` empty type $\rightarrow$ Use `Record<string, unknown>` or explicit interfaces.
* ❌ **Forbidden Runtime Anti-Patterns**:
  * Do **NOT** wrap failing code in empty `try { ... } catch (e) {}` blocks to swallow errors.
  * Do **NOT** insert arbitrary `setTimeout(..., 1000)` delays to "solve" race conditions $\rightarrow$ Await explicit promises/events.
  * Do **NOT** mutate React or Zustand state objects directly $\rightarrow$ Return new immutable state.
  * Do **NOT** bypass boundary validation when consuming external JSON $\rightarrow$ "Parse, don't validate".
* ❌ **Forbidden Architectural Layer Violations**:
  * UI components (`src/components/`, `src/app/`) must **NEVER** execute raw database queries or direct filesystem operations. Always call domain services in `src/services/` or route handlers.

---

## 5. 📂 Architectural Directory Map & Layer Rules

Enforces clean architectural boundaries and predictable file organization:

```text
Antigravityskill/
├── .github/
│   ├── workflows/
│   │   └── quality-gate.yml               # 🚦 Polyglot 6-job CI Quality Gate (Node, Python, Go, Rust, Meta, Scripts)
│   └── pull_request_template.md           # 📝 3-Pillar PR template with multi-agent verification checks
├── .gitignore                             # 🛡️ Comprehensive ignore file (.env, node_modules, .venv, credentials)
├── project-profile/
│   └── PROJECT_PROFILE.md                 # 🎯 Universal facts schema, orchestration rules & invariants (this file)
├── references/
│   ├── PUSH_PROTOCOL.md                   # 🚀 5-Step safe branch push, commit & PR runbook
│   ├── TEAMWORK_ORCHESTRATION.md          # 🤝 9-Step prompt pipeline, artifact schemas & delegation protocol
│   ├── MULTI_AGENT_PATTERNS.md            # 🏛️ 5 Team topologies, integrity modes, role matrix & conflict synthesis
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
├── tests/
│   └── e2e/                               # 🔬 Independent E2E black-box test suite (Tiers 1-4)
├── .agents/                               # 🤖 Runtime agent workspace metadata (strictly non-source)
├── SKILL.md                               # 🧭 Master 3-pillar skill definition & routing framework
├── README.md                              # 📖 Comprehensive engineering manual, diagrams & install guides
├── TEST_INFRA.md                          # 🏗️ Testing infrastructure architecture & execution guide
└── TEST_READY.md                          # 📋 E2E Test Suite Readiness and verification sign-off
```

### Standard Application Layer Map (For Consuming Projects)

```text
src/
├── app/ or pages/        # Route controllers, page layouts, API endpoints (thin orchestration layer)
├── components/
│   ├── ui/               # Headless, reusable primitive design system components (buttons, dialogs, inputs)
│   └── common/           # Shared composite UI widgets (navbar, footer, hero, pricing matrix)
├── features/             # Domain-specific modules (e.g. auth/, billing/, projects/, analytics/)
├── services/             # Core business logic, external API clients, database query repositories
├── types/                # Shared domain schemas, TypeScript interfaces, Discriminated Unions
└── lib/                  # Pure deterministic utility helpers (formatting, math, class merging)
```

* **Path Aliases**: `@/*` maps to `./src/*`
* **Class Merging Standard**: `cn()` utility located at `src/lib/utils.ts` combining `clsx` and `tailwind-merge`.

---

## 6. 🚦 Verification, Pre-Commit & Quality Gate Commands

Every code modification must pass the **Universal Zero-Red-Line Quality Gate** before staging or submission:

### 6.1 Diagnostic Scanners & Test Harnesses (Mandatory Pre-Flight)

* **Node.js Diagnostic Health Scanner**:
  ```bash
  node scripts/diagnose.js --strict --check-git
  node scripts/diagnose.js --json
  node scripts/diagnose.js --help
  ```
* **Python Diagnostic Health Scanner**:
  ```bash
  python scripts/diagnose.py --strict --check-git
  python scripts/diagnose.py --json
  python scripts/diagnose.py --help
  ```
* **Automated Diagnostic Test Harnesses**:
  ```bash
  node scripts/test-diagnose.js
  python scripts/test_diagnose.py
  ```

### 6.2 Polyglot Static Typechecking & Linting

* **TypeScript / Node.js**:
  ```bash
  npx tsc --noEmit                          # Strict typecheck (0 errors)
  npm run lint                              # ESLint verification (0 warnings)
  npm test                                  # Unit / integration test execution
  npm run build                             # Production build verification
  ```
* **Python**:
  ```bash
  mypy . --ignore-missing-imports           # Python static type safety
  ruff check .                              # Fast linting and format verification
  flake8 .                                  # Style compliance
  pytest                                    # Python test suite
  ```
* **Go**:
  ```bash
  go vet ./...                              # Go compiler static analysis
  go build ./...                            # Compilation verification
  go test -v ./...                          # Go unit test execution
  ```
* **Rust**:
  ```bash
  cargo check --all-targets                 # Fast Rust compilation check
  cargo clippy -- -D warnings               # Rust linter check
  cargo test                                # Rust test suite execution
  ```

---

## 7. 📡 Data Contracts & Serialization Invariants

Standardized cross-boundary data exchange conventions:

* **ID Format**: `UUIDv4` (e.g. `550e8400-e29b-41d4-a716-446655440000`) or `CUID2` for public identifiers. Auto-increment integers restricted to internal database primary keys.
* **Date & Timestamp Format**: ISO 8601 UTC strings (`YYYY-MM-DDTHH:mm:ss.sssZ`). Millisecond precision required.
* **JSON Serialization Casing**:
  * API Request/Response payloads: `camelCase` (e.g., `userId`, `createdAt`, `workspaceSlug`).
  * Database Columns / SQL Tables: `snake_case` (e.g., `user_id`, `created_at`, `workspace_slug`).
* **Pagination Standards**:
  * *Cursor-based* (preferred for high-frequency or infinite lists): `{ items: T[], cursor: string | null, hasMore: boolean }`.
  * *Offset-based* (for administrative tabular views): `{ items: T[], page: number, pageSize: number, totalCount: number, totalPages: number }`.
* **Error Response Schema**:
  ```json
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "The requested entity was not found.",
      "details": { "id": "123" },
      "timestamp": "2026-08-31T08:00:00.000Z"
    }
  }
  ```

---

## 8. 🔒 Authentication & Access Control

* **Auth Strategy**: Secure, `HttpOnly`, `SameSite=Lax`, `Secure` session cookies (or standard `Bearer <JWT>` tokens).
* **Route Protection**: Edge middleware (`src/middleware.ts`) enforcing authenticated sessions before forwarding to private route handlers.
* **Role Hierarchy**: `admin` > `manager` > `member` > `guest`. Access control evaluated via policy functions (e.g. `canEditResource(user, resource)`).
* **Secret Management**: API keys, signing secrets, and database credentials MUST live in `.env` files, which are strictly gitignored and validated via `scripts/diagnose.js --check-git`.

---

## 9. ⚠️ Known Fragile Areas, Gotchas & `/learn` Triggers

### 9.1 Known Fragile Areas & Architectural Gotchas
* **Stripe / GitHub Webhook Bodies**: Webhook endpoints must consume raw, unparsed request buffers (`req.rawBody` or `buffer()`) for HMAC signature validation. Parsing JSON before signature calculation will invalidate the HMAC check.
* **WebSocket / SSE Lifecycles**: Long-running connections require a 30-second ping/pong heartbeat to prevent cloud load balancers and reverse proxies from dropping idle sockets.
* **SSR / Hydration Invariants**: Avoid referencing `window`, `document`, or `localStorage` during initial server render. Guard with `typeof window !== 'undefined'` or execute inside `useEffect` / `onMounted`.
* **Print / PDF Layouts**: PDF generation stylesheets require explicit `@media print` rules and `box-sizing: border-box` to avoid page-overflow clipping.

### 9.2 The "Rule of Three" (Circuit Breaker)
If **3 consecutive fix attempts fail**:
1. **STOP modifying code immediately.**
2. Recognize that the current mental model or assumption about the codebase is flawed.
3. Re-read the source contracts, verify environment state, and formulate a new evidence-based hypothesis.
4. Escalate to the user or orchestrator with exact findings rather than thrashing in an edit loop.

### 9.3 Mandatory `/learn` Memory Trigger Protocol
Every time an agent resolves a complex bug, uncovers a subtle framework gotcha, or establishes a new repository convention, it MUST prompt the user to persist the lesson into Antigravity long-term memory:

```markdown
---

### 🧠 Persist This Lesson in Antigravity

To ensure Antigravity remembers this invariant and avoids this issue in future sessions, run:

> **/learn**
> *Lesson*: [1-2 sentences summarizing the specific invariant, pattern, or gotcha discovered]
```
