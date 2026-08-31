# 🌿 Branch & Commit Naming Conventions (Standard Taxonomy)

A universal, standardized taxonomy for naming Git branches and writing Conventional Commits across all types of projects, landing pages, dashboards, APIs, and bug fixes.

---

## 🎯 Universal Branch Naming Formula

```text
<category>/<domain-or-page>-<short-description>
```

### Branch Categories:
* `feat/` — New feature or page component
* `ui/` — Visual design, layout, styling, responsiveness, or animation
* `fix/` — Bug fix, compiler error / red line elimination, or logic correction
* `perf/` — Performance optimization, bundle size reduction, or image tuning
* `refactor/` — Code restructuring without behavior changes
* `docs/` — Documentation, README updates, or API contract docs
* `chore/` — Build tooling, CI/CD, dependency updates, or `.gitignore` changes

---

## 📑 Feature & Page-Specific Branch Matrix

| Domain / Page | Branch Name Example | Conventional Commit Example |
| :--- | :--- | :--- |
| **Landing: Hero Section** | `feat/landing-hero-section` | `feat(landing): build responsive hero with CTA buttons and social proof badge` |
| **Landing: Navigation** | `ui/landing-responsive-navbar` | `ui(nav): implement glassmorphic navbar with mobile drawer and theme toggle` |
| **Landing: Feature Grid** | `feat/landing-features-grid` | `feat(landing): add 6-card feature grid with hover glow micro-animations` |
| **Landing: Pricing Table** | `feat/landing-pricing-matrix` | `feat(pricing): build interactive pricing table with monthly/annual toggle` |
| **Landing: FAQ Accordion** | `feat/landing-faq-accordion` | `feat(faq): implement accessible keyboard-navigable FAQ accordion` |
| **Landing: CTA Banner** | `ui/landing-cta-banner` | `ui(landing): add high-conversion bottom CTA banner with email input` |
| **Landing: SEO & OpenGraph**| `seo/landing-opengraph-tags` | `docs(seo): add OpenGraph, Twitter card, and canonical meta tags` |
| **Auth: Login / Signup** | `feat/auth-login-modal` | `feat(auth): implement modal login flow with client-side Zod validation` |
| **Auth: Token Refresh** | `fix/auth-jwt-refresh-timeout`| `fix(auth): add abort controller and exponential backoff to token refresh` |
| **Dashboard: Metrics Cards** | `feat/dashboard-kpi-cards` | `feat(dashboard): add real-time revenue and active users KPI summary cards` |
| **Dashboard: Charts** | `ui/dashboard-chart-analytics` | `ui(charts): render responsive weekly analytics line chart` |
| **Data: Table & Pagination** | `feat/data-table-sorting` | `feat(table): add server-side cursor pagination and column sorting` |
| **Forms: Lead Capture** | `feat/forms-lead-capture` | `feat(forms): build lead capture form with inline error states` |
| **Checkout / Billing** | `feat/billing-stripe-elements`| `feat(billing): integrate Stripe payment element with webhook handler` |
| **Bugfix: Red Lines / Types**| `fix/navbar-type-mismatch` | `fix(nav): resolve TypeScript compiler red lines and missing prop types` |
| **Bugfix: Mobile Overflow** | `fix/landing-mobile-overflow` | `fix(layout): resolve horizontal scroll overflow on iPhone viewports` |
| **Performance: LCP Images** | `perf/hero-image-lcp` | `perf(assets): convert hero images to WebP and enable priority preloading` |
| **CI / Quality Gate** | `chore/ci-polyglot-gate` | `chore(ci): add multi-stack GitHub Actions quality gate workflow` |

---

## 🛠️ Git Branching Commands Cheat Sheet

```bash
# 1. Start a new feature branch from up-to-date main
git checkout main
git pull origin main
git checkout -b feat/landing-hero-section

# 2. Stage and commit with conventional message
git add .
git commit -m "feat(landing): build responsive hero section with dual CTA buttons"

# 3. Push feature branch and set upstream tracking
git push -u origin feat/landing-hero-section

# 4. Delete local branch after PR is merged
git checkout main
git pull origin main
git branch -d feat/landing-hero-section
```

---

## 🚫 Anti-Patterns to Avoid

| ❌ Bad Branch Name | Why It Fails | ✅ Recommended Branch Name |
| :--- | :--- | :--- |
| `update-code` | Vague, lacks category and domain | `feat/landing-hero-section` |
| `john-branch` | Uses developer name instead of task | `feat/auth-login-modal` |
| `FIX-BUG` | All caps, no context on what was fixed | `fix/landing-mobile-overflow` |
| `landing` | Missing intent category prefix | `ui/landing-pricing-matrix` |
| Direct push to `main` | Bypasses CI quality gate & review | Push to `feat/*` $\rightarrow$ Open Pull Request |
