# Test Strategy — meu-portfolio

## Pyramid shape: inverted-thin (E2E-heavy, unit-light)
This is a marketing/portfolio site: almost no business logic, one real side-effecting flow (contact form), and the main risk is "does it render and can visitors reach me" — not computation correctness. A classic unit-heavy pyramid would test getters and JSX composition, which is waste.

- **E2E smoke (majority of the budget):** page loads, nav scroll-links work, contact form happy + error path, GitHub graph renders/degrades, SEO routes (`/sitemap.xml`, `/robots.txt`, `opengraph-image`) return valid output.
- **Unit tests (minimal, targeted):** only for `src/lib/github.ts` (data shaping/error handling has real branching) and any future non-trivial pure function in `src/content/*`. Skip unit tests for presentational components — they have no logic to break.
- **Visual regression (optional, one baseline):** `BackgroundStars.tsx` canvas — this already broke once (banding regression, see project history) and a rendering bug there is invisible to functional tests.
- **No integration tier** — nothing here talks to a database or internal service; EmailJS and GitHub's API are the only externals, both covered by mocking at the E2E boundary.

## Tools
- **Playwright** (`playwright-automation` skill) for E2E — free, fast, first-party Next.js support, no existing test infra to conflict with.
- Keep **Jest/Vitest out** until `src/lib/github.ts` or similar actually grows branching logic worth unit-testing. Adding a unit runner today for zero unit tests is dead weight (ponytail: yagni).
- **Playwright's built-in trace/screenshot** covers visual-diff needs; no dedicated visual-testing tool (e.g. Chromatic) until the site has more than one page needing that check.

## Environments covered
- Local dev + Vercel preview deploy (per-PR) as the E2E target. Production (`master`) gets a post-deploy smoke run only, not full suite.

## Quality gates
- **PR to `hml`:** `npm run lint` + `next build` (type-check) must pass. No test gate yet — add once the first Playwright smoke test exists.
- **PR `hml` → `master`:** same, plus (once written) the Playwright smoke suite must pass against the preview URL.
- No CI currently wired (`.github/workflows` absent) — this is the first gap to close; see plan.

## Entry / exit criteria
- **Entry (start testing a change):** change touches `Contacts.tsx`, `lib/github.ts`, `BackgroundStars.tsx`, or SEO/meta files → smoke test required before merge to `master`.
- **Exit (safe to ship):** lint clean, build clean, contact-form smoke test green. Everything else (cross-browser polish, animation timing) is manual/eyeball, not a gate.
