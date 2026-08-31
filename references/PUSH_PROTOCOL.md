# 🚀 Safe Branch-Only Push & Delivery Protocol (`/push`)

A standardized, fail-safe Git workflow protocol to ensure no broken code or secrets are ever pushed to GitHub, and that **direct pushes to `main` / `master` are strictly prevented**.

---

## 🚦 Traffic Light Restrictions & Simple User Alerts

| Signal | What It Means | Action Taken |
| :--- | :--- | :--- |
| 🔴 **Hard Block** | Pushing directly to `main` or committing `.env` secrets | The agent **refuses** and moves your work to a safe feature branch (`feat/*`, `fix/*`). |
| 🟡 **Ask First** | Installing new packages, deleting files, or refactoring unrequested code | The agent **pauses and asks** you simply: *"I noticed X. Would you like me to proceed?"* |
| 🟢 **Automatic** | Running health scans (`diagnose.js`), fixing red lines, creating branches | The agent **handles automatically** and reports a clean summary. |

---

## 🛑 The 3 Golden Rules of `/push`

1. **NO PUSH ON BROKEN CODE**: Never commit or push without running the automated health scanner first.
2. **NO DIRECT PUSH TO MAIN/MASTER**: All changes must be pushed to dedicated feature/fix branches (`feat/**`, `fix/**`, `chore/**`, `ui/**`).
3. **ATOMIC CONVENTIONAL COMMITS**: Every commit must describe *what* changed and *why* using the Conventional Commits format.

---

## 🔬 The 5-Step `/push` Delivery Workflow

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. PRE-FLIGHT QUALITY SCAN                                  │
│ Run diagnose scanner; verify 0 red lines and 0 type errors  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. SECRETS & GITIGNORE AUDIT                                │
│ Verify no .env files, private keys, or tokens are staged    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. BRANCH PROTECTION CHECK (Follow Branch Taxonomy)         │
│ If on main/master -> create feat/*, fix/*, or ui/* branch   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. ATOMIC CONVENTIONAL COMMIT                               │
│ Stage files and commit with feat(...): or fix(...): message │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. SAFE REMOTE PUSH & PR SUMMARY                            │
│ Push branch to origin and generate PR summary               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Step-by-Step Execution Guide

### Step 1: Pre-Flight Quality Scan
Before staging any files, execute the universal health check:
```bash
node scripts/diagnose.js
# Or for Python environments:
python scripts/diagnose.py
```
* **Gate Requirement**: Must report **100% HEALTHY (0 errors)**. If compiler errors exist, stop and run `/debug` first.

---

### Step 2: Secrets & Ignore Audit
Check staged/untracked files to guarantee secrets are protected:
```bash
git status
```
* Verify that `.env`, `.env.local`, `node_modules/`, `.venv/`, and `.gemini/` scratch files are not staged (ensured by `.gitignore`).

---

### Step 3: Branch Protection & Naming Standards
Check your active branch:
```bash
git branch --show-current
```
* 🛑 **If on `main`, `master`, or `develop`**: You must switch to a feature or fix branch before committing.
* Follow the official **[Branch & Commit Taxonomy](file:///c:/Users/johnd/Downloads/Antigravityskill/references/BRANCH_AND_COMMIT_CONVENTIONS.md)**:

```bash
# Landing Page components:
git checkout -b feat/landing-hero-section
git checkout -b ui/landing-responsive-navbar
git checkout -b feat/landing-pricing-matrix

# Auth & User flows:
git checkout -b feat/auth-login-modal

# Bugfixes & Diagnostics:
git checkout -b fix/navbar-type-mismatch

# Performance & SEO:
git checkout -b perf/hero-image-lcp
git checkout -b seo/landing-opengraph-tags
```

---

### Step 4: Atomic Conventional Commit
Stage only the relevant files and commit using the **Conventional Commits** standard (see **[references/BRANCH_AND_COMMIT_CONVENTIONS.md](file:///c:/Users/johnd/Downloads/Antigravityskill/references/BRANCH_AND_COMMIT_CONVENTIONS.md)**):

```bash
git add <files-to-commit>
git commit -m "feat(landing): build responsive hero section with dual CTA buttons"
```

#### Conventional Commit Types:
* `feat`: A new feature or capability (e.g. `feat(landing): build interactive pricing table with billing toggle`)
* `ui`: Visual styling, design tokens, responsiveness (e.g. `ui(nav): add glassmorphic sticky navbar with mobile drawer`)
* `fix`: A bug fix or red-line resolution (e.g. `fix(nav): resolve TypeScript compiler red lines and missing prop types`)
* `refactor`: Code restructuring without changing behavior (e.g. `refactor(db): release connection in finally block`)
* `perf`: Performance optimization (e.g. `perf(images): convert hero banners to WebP format`)
* `chore`: Build tooling, dependency updates, or CI config (e.g. `chore(ci): add polyglot quality gate`)
* `docs`: Documentation, README, or API contract updates (e.g. `docs(readme): add branch naming conventions`)

---

### Step 5: Safe Remote Push & PR Generation
Push your branch to GitHub and set tracking:
```bash
git push -u origin <branch-name>
```

After pushing, output the formatted Pull Request summary using **[.github/pull_request_template.md](file:///c:/Users/johnd/Downloads/Antigravityskill/.github/pull_request_template.md)** so it is ready to paste into GitHub.
