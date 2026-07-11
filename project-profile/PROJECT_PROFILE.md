# Project Profile

> **This is the one file in this skill set that is NOT portable.** It captures concrete facts about *this specific codebase* that the generic guides (Implementation/, Quality/, ui/) intentionally leave out. If you're adapting this skill set to a different project, delete or rewrite this file first -- everything else can stay as-is.

## Stack

- React 19, Vite, TypeScript, Tailwind CSS
- Routing: `react-router-dom`
- Animation: `motion/react` (Framer Motion)
- Class merging: `cn()` utility at `src/lib/utils.ts` (`clsx` + `tailwind-merge`)

## Access Control

- Roles: `admin`, `adviser`, `student`
- Route-level gating via `ProtectedRoute` (checks an `allowedRole` prop against the current session)
- Phase-level gating via `PhaseGuard` (OJT/practicum phase-dependent components)

## Authentication

- Prototype-stage: session stored in `localStorage` under the key `practicum_session`
- **Not production-hardened** -- flag any request to ship this as-is to production rather than assuming it's fine because it's already in place.

## Testing

- No automated test framework installed (no Vitest/Jest) as of this writing
- `npm run lint` runs `tsc --noEmit` -- this is the only automated check currently available
- Manual verification in the browser preview is the primary QA method

## Backend / API

- No confirmed backend/API/database beyond the client-side prototype as of this writing -- status is unresolved (not yet decided whether one will be added).
- Don't assume a backend exists, and don't build out speculative guidance for API versioning, database migrations, or logging/observability until one is actually in place -- add a dedicated reference file for those at that point, following the same pattern as the rest of this skill set.

## Known Fragile Areas

- Print/PDF layout: the `.doc-preview-paper` class controls print margins/padding. Verify `box-sizing: border-box` is respected, and that `window.print()` hides interactive elements (e.g. edit buttons) and removes backgrounds for ink-saving.

## Debugging Shortcuts

- Auth/routing failures: check `ProtectedRoute.tsx` and the `practicum_session` key in `localStorage`; simulate a login to reset session state if needed.
- Styling conflicts: confirm `cn()` is actually being used rather than direct string concatenation of classes.
