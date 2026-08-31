---
name: antigravity-engineering-framework
description: "Universal Staff-Engineer framework for /debug (zero-defect pristine code generation, 5-phase systematic root-cause diagnostics), /design (UI/UX design systems, accessible Tailwind/React component architecture), and /push (fast, safe Git staging, conventional commits, and remote syncing)."
---

# Universal Staff-Engineering Protocols: `/debug`, `/design` & `/push`

## 🧭 Master Command Routing & Intent Trigger Matrix

| User Trigger / Intent | Active Protocol | Primary Workflow & Standards | Reference Manual |
| :--- | :--- | :--- | :--- |
| `/debug`, compiler red lines, type errors, bug reports, logic defects, memory leaks, performance bottlenecks | **`/debug`** | 5-Phase Diagnostic Workflow, 4 Laws of Pristine Code Generation, Surgical Root-Cause Isolation | [references/DEBUG_UTILITIES.md](references/DEBUG_UTILITIES.md)<br>[references/COMMON_BUG_PATTERNS.md](references/COMMON_BUG_PATTERNS.md)<br>[references/CLI_CHEAT_SHEET.md](references/CLI_CHEAT_SHEET.md) |
| `/design`, UI components, landing pages, design systems, color palettes, responsive layouts, dark mode | **`/design`** | 5 Pillars of Impeccable Design, Semantic Tokens, WCAG 2.1 AA Accessibility, Staggered Motion | [references/DESIGN_SYSTEM_GUIDELINES.md](references/DESIGN_SYSTEM_GUIDELINES.md)<br>[references/COLOR_AND_CONTAINER_ENGINE.md](references/COLOR_AND_CONTAINER_ENGINE.md)<br>[references/COMPONENT_LIBRARY.md](references/COMPONENT_LIBRARY.md)<br>[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)<br>[references/UX_PSYCHOLOGY_AND_HEURISTICS.md](references/UX_PSYCHOLOGY_AND_HEURISTICS.md)<br>[references/ACCESSIBILITY_WCAG_GUIDE.md](references/ACCESSIBILITY_WCAG_GUIDE.md) |
| `/push`, git commit, git push, sync to github, publish changes, deploy code | **`/push`** | 3-Step Pre-Flight Audit, Conventional Commits Formatting, Safe Atomic Remote Sync | [references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md) |

---

## 🚦 Traffic Light Safety Restrictions

To protect codebases from accidental damage and prevent broken builds:

| Status | Action | Agent Behavior |
| :--- | :--- | :--- |
| 🔴 **STRICTLY PROHIBITED** | Committing `.env` secrets, tokens, credentials, or private keys | **Hard Blocked**: Stops immediately, audits `.gitignore`, and keeps secrets uncommitted. |
| 🔴 **STRICTLY PROHIBITED** | Force pushing (`git push --force`) or destructive resets (`git reset --hard`) | **Hard Blocked**: Never overwrites remote branch history or discards unstaged user work. |
| 🔴 **STRICTLY PROHIBITED** | Suppressing compiler red lines or type errors with `@ts-ignore`, `any`, empty catches, or dummy delays | **Hard Blocked**: Must identify and resolve root-cause type mismatches and runtime exceptions. |
| 🟡 **REQUIRES CONFIRMATION** | Refactoring code outside requested task scope | **Asks User First**: *"I noticed X could be cleaned up. Would you like me to do that?"* |
| 🟡 **REQUIRES CONFIRMATION** | Installing brand-new third-party packages or modifying package manifests | **Asks User First**: Verifies if an existing dependency or zero-dependency utility already solves it. |
| 🟡 **REQUIRES CONFIRMATION** | Modifying database schemas, running destructive migrations, or deleting files | **Asks User First**: Confirms data safety and backup state before destructive operations. |
| 🟢 **AUTOMATICALLY ALLOWED** | Running diagnostic compiler & test commands (`tsc`, `mypy`, `npm test`, `cargo check`) | **Runs Automatically**: Scans for red lines, broken imports, and type discrepancies. |
| 🟢 **AUTOMATICALLY ALLOWED** | Generating accessible, responsive UI landing pages & design system components | **Runs Automatically**: Applies pre-tested patterns from `references/DESIGN_SYSTEM_GUIDELINES.md`, `references/COLOR_AND_CONTAINER_ENGINE.md`, and `references/LANDING_PAGE_PATTERNS.md`. |
| 🟢 **AUTOMATICALLY ALLOWED** | Recommending `/learn` summaries upon successful bug resolution or UI completion | **Runs Automatically**: Persists lessons learned into Antigravity project memory. |

---

## 🤝 Antigravity Non-Interference & Precedence Rules

When conflicting constraints or instructions arise, resolve them using this strict hierarchical precedence:

1. **User's Explicit Instruction** (Always highest priority).
2. **Project Profile Facts** (`project-profile/PROJECT_PROFILE.md`).
3. **Pristine Code & Impeccable Design Invariants** (This document).
4. **General Pre-training Defaults** (Lowest priority).

---

# 🔬 SECTION 1: The `/debug` Protocol

When diagnosing defects, fixing compiler red lines, resolving exceptions, or hardening type systems:

### 🏗️ The 4 Laws of Pristine Code Generation

1. **Context Ingestion Before Generation**: Inspect existing project imports, path aliases (`@/*`), shared utilities, and data models before writing code.
2. **"Parse, Don't Validate" (Boundary Hardening)**: Parse external inputs into validated domain types at system boundaries.
3. **Make Illegal States Unrepresentable**: Use Discriminated Unions / Tagged Variants instead of loose boolean/nullable bags.
4. **No Placeholders or TODO Stubs**: Implement complete, functional, type-safe logic from the start.

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

# 🎨 SECTION 2: The `/design` Protocol

When designing user interfaces, creating component libraries, or styling landing pages:

### 🏛️ The 5 Pillars of Impeccable Design & Craftsmanship

1. **Minimalism & Visual Restraint**: Zero visual noise. Use clean whitespace, subtle borders (`border-border/60`), and soft ambient gradients instead of cluttered heavy ornaments.
2. **Smooth Motion & Staggered Delays**: Implement fluid spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) and cascading entry delays (`delay-75`, `delay-150`, `delay-200`) for butter-smooth 60fps transitions.
3. **Effortless Navigation & Scannable Icons**: Position high-contrast, recognizable Lucide icons with optical padding and clear affordance so navigation is instant and intuitive.
4. **Pixel-Perfect Spatial Math**: Strict adherence to the 8-point grid, height ladders (`h-9`, `h-11`, `h-13`), padding balance (`px-3 py-1.5` to `px-7 py-3.5`), and optical baseline alignment.
5. **Accessible by Default (WCAG 2.1 AA)**: Contrast ratios $\ge 4.5:1$, visible focus rings (`focus-visible:ring-2`), semantic HTML tags, and screen-reader `aria-*` labels.

### 🔄 The Law of Adaptive Brand Ingestion & Migration (New & Existing Sites)

* **Preserve Existing Brand Soul**: If the project contains existing logos (`public/logo.*`, SVG assets), colors, or typography, **NEVER** replace them with generic defaults. Preserve the semantic meaning of user branding.
* **Intelligent Enhancement**: Audit existing colors for WCAG AA compliance ($\ge 4.5:1$ contrast) and dark mode pairs. If contrast is low or dark mode is missing, recommend and inject harmonious accessible companion tokens.
* **Universal Drop-In Migration**: Ensure components use standard CSS variables and non-destructive `cn(...)` class merging so they drop into any web framework (Next.js, Vite, Astro, Remix, Vue, Svelte, or plain HTML) with **0 breaking changes**.

### 📦 The Law of Container Determination & Color Restraint

* **The 80/15/5 Color Rule**: Confine accent colors strictly to **4 approved spots** (Active CTA buttons, Semantic status dots, Hero focal gradient words, Ambient top aura). $80\%$ remains neutral canvas.
* **The Container Determination Rule**: Only use boxed card containers for dense tables, modals, and code blocks. Go **containerless** for headings, text blocks, FAQs (`divide-y`), and footers—using whitespace and proximity as structure.
* **Zero-Horizontal-Overflow Invariant**: Enforce `overflow-x-clip` on root containers, ban `w-screen` with scrollbars, and eliminate uncontained negative margins.

### 🚫 The Anti-AI-Slop Design Invariant

* **NO Generic Tacky Gradients**: Ban giant purple/cyan radial blur blobs and rainbow borders. Use crisp neutral darks (`#09090b`) with intentional single-hue accents.
* **NO Marketing Buzzword Fluff**: Ban fake stock testimonials ("Alex R., Staff Architect") and empty buzzwords. Build **real functional product UI** (Spotlight `⌘K` bars, live deployment tables, macOS code previews).
* **High Data Density**: Use authentic monospace IDs (`dep_994a`), tabular numerals, pulsing operational status dots, and hairline borders (`border-white/[0.08]`).

### 🎯 Anti-Hallucination & Deterministic Generation Rules

* **No Fabricated Package Imports**: Verify `package.json` before importing third-party libraries. If `lucide-react` is not installed, render clean inline SVGs.
* **No Imaginary CSS Utilities**: Use only standard, verified Tailwind classes. Never hallucinate non-existent utility classes (e.g. `bg-glass-blur-super`).
* **Flat Component Depth**: Ban excessive wrapper divs ("DOM soup"). Group elements using whitespace and the Law of Proximity rather than nesting 4+ levels of boxes.

*(Detailed token maps, animations, and templates live in **[references/DESIGN_SYSTEM_GUIDELINES.md](references/DESIGN_SYSTEM_GUIDELINES.md)**, **[references/COLOR_AND_CONTAINER_ENGINE.md](references/COLOR_AND_CONTAINER_ENGINE.md)**, **[references/COMPONENT_LIBRARY.md](references/COMPONENT_LIBRARY.md)**, and **[references/LANDING_PAGE_PATTERNS.md](references/LANDING_PAGE_PATTERNS.md)**).*

---

# 🚀 SECTION 3: The `/push` Protocol

When committing, staging, or syncing changes to remote repositories:

### 🛡️ The 3 Steps of Safe Git Delivery

1. **Pre-Flight Status & Secret Audit**: Run `git status`, verify clean working tree, and ensure `.env`, tokens, and credentials are never staged.
2. **Conventional Commit Crafting**: Generate meaningful, scoped conventional commit messages (`feat(scope): ...`, `fix(scope): ...`).
3. **Atomic Remote Sync**: Push cleanly to the active branch (`git push origin <branch>`) and report the remote sync link to the user.

*(Detailed commit conventions and procedures live in **[references/PUSH_PROTOCOL.md](references/PUSH_PROTOCOL.md)**).*

---

## 💡 Post-Success `/learn` Reminder

> [!IMPORTANT]
> **RULE FOR THE AGENT:**
> Every time you successfully resolve a bug, clear compiler errors, or implement a UI design pattern, you **MUST** end your response with an actionable reminder prompting the user to execute `/learn`.

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
