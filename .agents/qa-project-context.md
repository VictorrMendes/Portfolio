# QA Project Context — meu-portfolio

## Tech stack
- Next.js 16.2.3 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4
- Single-page personal portfolio: Hero, About, Skills, Softskills, Timeline, Projects, GithubGraph, Contacts, Footer — all client sections composed in `src/components/home/HomePage.tsx`
- External integrations: EmailJS (contact form, `Contacts.tsx`), GitHub API (`src/lib/github.ts`, contribution graph), Vercel Analytics + Microsoft Clarity

## Test frameworks
- **None installed.** No Jest/Vitest/Playwright/Cypress in `package.json`, no `*.test.*`/`*.spec.*` files in the repo.
- Only quality gate today: `eslint` (`npm run lint`) and `next build` (type-checks via `tsc` as part of build).

## CI/CD pipeline
- No `.github/workflows`, no `vercel.json`. Deploys appear to be Vercel's git integration (push-to-deploy), not a scripted pipeline.
- Branch flow: `hml` (staging) → PR → `master` (production). `main` exists but is not the deploy target — see project memory.

## Environments
- Local dev (`next dev`), Vercel preview deploys per branch/PR, Vercel production on `master`.
- No staging test environment beyond Vercel's preview URLs.

## Team structure
- Solo developer (personal portfolio site), no dedicated QA role.

## Risk areas (ranked)
1. **Contact form (`Contacts.tsx`)** — only flow with real side effects (sends email via EmailJS). Silent failure = lost job/business leads. Highest business risk on the site despite being simple.
2. **`src/lib/github.ts` / `GithubGraph.tsx`** — depends on GitHub's public API; no visible error/empty-state handling verified.
3. **`BackgroundStars.tsx` (canvas)** — previously broke visually (see project memory: banding regression, gradient fix); canvas code has no visual regression coverage.
4. **Cross-browser/responsive rendering** — heavy custom CSS (pixel/neon theme), animation via Framer Motion; no visual or cross-browser check exists.
5. **SEO/meta surface** — `opengraph-image.tsx`, `sitemap.ts`, `robots.tsx`, `PersonJsonLd.tsx`, `llms.txt` route — static correctness only verifiable by hitting the routes.

## Coverage goals
- No formal target. Given solo-maintainer + portfolio (not transactional) context, the proportionate goal is: smoke-test the page loads and the contact form's happy + failure path, not exhaustive unit coverage.
