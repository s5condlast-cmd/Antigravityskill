# 🎯 Universal Project Profile (Codebase Facts, Standards & Invariants)

> 💡 **Purpose**: This document is the authoritative single source of truth for repository facts, tool permissions, coding standards, and verification invariants that generic skill instructions intentionally leave open. All AI agents operating within this repository must adhere to the rules defined herein.

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

## 2. 🚦 Tool Permissions & Safety Guardrails

All agents operate within strict traffic-light safety boundaries to protect code integrity, branch safety, and user secrets:

### 2.1 Traffic-Light Boundary Table

| Category | Action / Tool Command | Enforcement Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets, tokens, credentials, or private keys | **Hard Blocked**: Enforces `.gitignore`, keeps secrets uncommitted. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive resets (`git reset --hard`) | **Hard Blocked**: Never destroys remote history or discards unstaged user work. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing compiler red lines with `@ts-ignore`, `any`, empty catches, or dummy delays | **Hard Blocked**: Must identify and resolve root-cause type and runtime defects. |
| 🟡 **REQUIRES CONFIRMATION** | Refactoring code outside requested task scope | **Asks User First**: *"I noticed X could be cleaned up. Would you like me to do that?"* |
| 🟡 **REQUIRES CONFIRMATION** | Installing brand-new third-party packages or changing package manifests | **Asks User First**: Verifies if standard library or existing package can solve it. |
| 🟡 **REQUIRES CONFIRMATION** | Modifying database schemas, running destructive migrations, deleting files | **Asks User First**: Confirms data safety and backup state before execution. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running compiler & test commands (`npx tsc`, `pytest`, `npm test`) | **Runs Automatically**: Scans for red lines, broken imports, type discrepancies. |
| 🟢 **AUTOMATICALLY ALLOWED** | Applying accessible landing page UI patterns | **Runs Automatically**: Leverages pre-tested patterns from `references/LANDING_PAGE_PATTERNS.md`. |
| 🟢 **AUTOMATICALLY ALLOWED** | Triggering `/learn` summaries on successful fixes | **Runs Automatically**: Persists architectural lessons into Antigravity long-term memory. |

---

## 3. 🏗️ Code Quality & Pristine Code Invariants

1. **Context Ingestion Before Generation**: Always inspect existing types, schemas, and utilities before generating new code.
2. **"Parse, Don't Validate"**: Validate and sanitize external input (API payloads, query parameters, file reads) directly into typed domain models.
3. **Make Illegal States Unrepresentable**: Leverage Discriminated Unions and Tagged Types instead of optional null fields that permit contradictory combinations.
4. **No Placeholders or TODOs**: Every generated function, component, and test must be fully implemented, syntactically complete, and type-checked.
