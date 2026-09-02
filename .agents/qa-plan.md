# First Test Plan — meu-portfolio

Scope: get from zero tests to a working safety net for the one flow that can actually cost the site owner something (a missed contact) and the one flow that already broke once (canvas background). Everything else is manual-eyeball for now — writing tests for static marketing copy is waste.

## P0 — write first
| Feature | Test case | Type |
|---|---|---|
| Contact form (`Contacts.tsx`) | Fill name/email/message, submit → success message shown, form resets | Playwright E2E (mock EmailJS network call) |
| Contact form | Submit with EmailJS call failing → error message shown, button re-enabled | Playwright E2E (mock rejected response) |
| Contact form | Submit with empty required fields → browser validation blocks submit (no network call) | Playwright E2E |
| Home page | `/` loads, Hero/About/Skills/Projects/Timeline/Contacts sections all present in DOM | Playwright E2E smoke |

## P1 — next
| Feature | Test case | Type |
|---|---|---|
| `src/lib/github.ts` | Returns expected shape on success; handles non-200 / rate-limit response without throwing | Unit (only unit tests worth writing right now) |
| GithubGraph section | Renders fallback/empty state when GitHub API errors, doesn't crash the page | Playwright E2E |
| SEO routes | `/sitemap.xml`, `/robots.txt` return 200 with expected content-type; `opengraph-image` route returns an image | Playwright E2E (or simple fetch assertions) |
| Navbar | Scroll-link nav actually scrolls to each target section | Playwright E2E |

## P2 — defer until there's a reason
| Feature | Test case | Type |
|---|---|---|
| `BackgroundStars.tsx` canvas | Visual baseline snapshot, catch banding/regression like the prior incident | Playwright screenshot diff |
| Cross-browser | Chromium/WebKit/Firefox pass on P0 suite | Playwright projects matrix |
| Accessibility | Basic axe-core scan on `/` | accessibility-testing skill, later |

## Effort estimate
- P0: ~half a day (4 tests, one page, one mocked network boundary).
- P1: ~half a day.
- P2: pick up opportunistically, not blocking.

## Out of scope for this plan
- Unit-testing presentational components (Hero, About, Skills, Timeline, Footer) — no branching logic, would just re-assert JSX. Skip per ponytail/yagni.
- Load/performance testing — traffic profile doesn't warrant it for a portfolio site.

## Next action
Nothing here is executable yet — `npm install -D @playwright/test` and `playwright-automation` skill to scaffold the runner is the literal next step, then write the P0 rows above as the first test file.
