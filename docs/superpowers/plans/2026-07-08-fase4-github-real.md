# Fase 4 — GithubGraph com dado real Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `Math.random()`-generated contribution heatmap and hardcoded StatusBar numbers with real data fetched server-side from the GitHub GraphQL API, with a graceful `null` fallback when no token is configured.

**Architecture:** A new server-only `src/lib/github.ts` module owns the GraphQL query, auth, error handling, and level-bucketing. `src/app/page.tsx` becomes an async Server Component that fetches once (ISR, revalidate hourly) and passes the result down as props through `HomePage` → `StatusBar` → `GithubGraph`.

**Tech Stack:** Next.js 16 Server Components, GitHub GraphQL API v4, native `fetch` with `next.revalidate`.

## Global Constraints

- No automated test suite — verification is `npm run build` plus manual browser check of the fallback path (no `GITHUB_TOKEN` available in this environment).
- **No git commits this session.**
- `GITHUB_TOKEN` must never reach client-side code — only read inside `src/lib/github.ts`, which is only ever called from the Server Component `src/app/page.tsx`.
- `getGithubStats` must never throw — always resolves to `GithubStats | null`.

---

### Task 1: `src/content/site.ts` — add `githubUsername`

**Files:**
- Modify: `src/content/site.ts`

- [ ] **Step 1: Edit**

Add `githubUsername: "VictorrMendes",` as a new field in the `SITE` object (alongside the existing `github` URL field).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 2: `src/lib/github.ts` — data module

**Files:**
- Create: `src/lib/github.ts`

**Interfaces:**
- Produces: `type ContributionDay = { date: string; count: number; level: 0|1|2|3|4 }`, `type GithubStats = { totalContributions: number; publicRepos: number; followers: number; following: number; weeks: ContributionDay[][] }`, `async function getGithubStats(login: string): Promise<GithubStats | null>`.

- [ ] **Step 1: Create the file**

```typescript
// src/lib/github.ts
export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubStats = {
  totalContributions: number;
  publicRepos: number;
  followers: number;
  following: number;
  weeks: ContributionDay[][];
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, isFork: false) {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

type RawWeek = { contributionDays: { contributionCount: number; date: string }[] };

export async function getGithubStats(login: string): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return null;

    const rawWeeks: RawWeek[] = user.contributionsCollection.contributionCalendar.weeks;

    const maxCount = Math.max(
      0,
      ...rawWeeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount))
    );

    const weeks: ContributionDay[][] = rawWeeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelFor(day.contributionCount, maxCount),
      }))
    );

    return {
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      publicRepos: user.repositories.totalCount,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      weeks,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (module not wired up yet).

---

### Task 3: `.env.example`

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create the file**

```
GITHUB_TOKEN=
```

- [ ] **Step 2: Verify**

Confirm `.env.example` is not covered by the `.env*` rule in `.gitignore` in a way that would hide it from git — check with `git check-ignore -v .env.example`; if it reports the file as ignored, add a `!.env.example` negation line to `.gitignore` right after the existing `.env*` rule.

---

### Task 4: `src/app/page.tsx` — fetch on the server

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/app/page.tsx
import HomePage from "@/components/home/HomePage";
import { getGithubStats } from "@/lib/github";
import { SITE } from "@/content/site";

export default async function Home() {
  const githubStats = await getGithubStats(SITE.githubUsername);

  return <HomePage githubStats={githubStats} />;
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: fails until Task 5 updates `HomePage`'s props — proceed to Task 5 before re-running.

---

### Task 5: `HomePage.tsx` — accept and forward `githubStats`

**Files:**
- Modify: `src/components/home/HomePage.tsx`

- [ ] **Step 1: Edit**

Add the import and prop:

```tsx
import type { GithubStats } from "@/lib/github";
```

Change the component signature from `const HomePage = () => {` to:

```tsx
const HomePage = ({ githubStats }: { githubStats: GithubStats | null }) => {
```

Change `<StatusBar />` to `<StatusBar githubStats={githubStats} />`.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: fails until Task 6 updates `StatusBar`'s props — proceed to Task 6 before re-running.

---

### Task 6: `StatusBar.tsx` — consume real stats, fallback to `—`

**Files:**
- Modify: `src/components/home/sections/StatusBar.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/StatusBar.tsx
import { motion } from "framer-motion";

import GithubGraph from "./GithubGraph";
import { SITE } from "@/content/site";
import type { GithubStats } from "@/lib/github";

type StatusBarProps = {
  githubStats: GithubStats | null;
};

const StatusBar = ({ githubStats }: StatusBarProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="neon-border pixel-corners mt-16 flex w-full flex-col items-start justify-between gap-8 overflow-hidden border-l-4 border-l-purple-500 bg-[#120524]/90 p-5 shadow-lg backdrop-blur-md sm:p-6 xl:flex-row xl:items-center"
  >
    <div className="flex w-full flex-col gap-6 xl:w-auto">
      <a
        href={SITE.github}
        target="_blank"
        rel="noreferrer"
        className="group flex w-max items-center gap-2 font-pixel text-[10px] text-white hover:text-purple-300 hover:neon-text sm:text-xs"
      >
        GITHUB PROFILE <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>

      <div className="flex w-full flex-col items-start gap-6 font-terminal text-lg sm:flex-row sm:items-center sm:gap-8">
        <div className="flex flex-row items-center gap-6 sm:gap-10">
          <div className="flex min-w-max flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-purple-400">Level</span>
              <span className="font-pixel text-2xl text-white sm:text-3xl">{githubStats?.publicRepos ?? "—"}</span>
            </div>
            <span className="mt-1 font-pixel text-[8px] text-gray-500">(Repositórios)</span>
          </div>

          <div className="flex min-w-max flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-purple-400">Exp</span>
              <span className="font-pixel text-2xl text-white sm:text-3xl">{githubStats ? `${githubStats.totalContributions}+` : "—"}</span>
            </div>
            <span className="mt-1 font-pixel text-[8px] text-gray-500">(Contrib.)</span>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between gap-4 border-t border-purple-900/50 pt-4 sm:w-auto sm:flex-col sm:justify-center sm:gap-2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div className="min-w-max text-gray-300">
            Following: <span className="ml-1 font-pixel text-base text-white sm:text-lg">{githubStats?.following ?? "—"}</span>
          </div>
          <div className="min-w-max text-gray-300">
            Followers: <span className="ml-1 font-pixel text-base text-white sm:text-lg">{githubStats?.followers ?? "—"}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full max-w-full overflow-x-auto pb-2 xl:w-auto">
      <GithubGraph weeks={githubStats?.weeks ?? []} />
    </div>
  </motion.div>
);

export default StatusBar;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: fails until Task 7 updates `GithubGraph`'s props — proceed to Task 7 before re-running.

---

### Task 7: `GithubGraph.tsx` — presentational, no random data

**Files:**
- Modify: `src/components/home/sections/GithubGraph.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/GithubGraph.tsx
import { SITE } from "@/content/site";
import type { ContributionDay } from "@/lib/github";

type GithubGraphProps = {
  weeks: ContributionDay[][];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getColor = (level: number) => {
  switch (level) {
    case 0: return "bg-[#161b22]";
    case 1: return "bg-[#0e4429]";
    case 2: return "bg-[#006d32]";
    case 3: return "bg-[#26a641]";
    case 4: return "bg-[#39d353]";
    default: return "bg-[#161b22]";
  }
};

const GithubGraph = ({ weeks }: GithubGraphProps) => (
  <div className="pixel-corners w-max border border-purple-900/50 bg-[#0d1117] p-3 xl:ml-auto">
    <div className="flex w-full justify-between pl-6 font-sans text-[8px] text-gray-400">
      {MONTHS.map((month) => (
        <span key={month}>{month}</span>
      ))}
    </div>

    <div className="mt-1.5 flex gap-0.75">
      <div className="flex h-full flex-col justify-between py-0.75 font-sans text-[7px] text-gray-400">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>

      <div className="flex gap-0.75">
        {weeks.length > 0 ? (
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.75">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} contribui${day.count === 1 ? "ção" : "ções"} em ${day.date}`}
                  className={`h-2 w-2 rounded-[1px] ${getColor(day.level)} cursor-pointer transition-all hover:ring-1 hover:ring-white/80 hover:shadow-[0_0_8px_#39d353]`}
                ></div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex gap-0.75">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-0.75">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="h-2 w-2 rounded-[1px] bg-[#161b22]"></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="mt-2 flex items-center justify-between pl-6 font-sans text-[8px] text-gray-400">
      <a href={SITE.github} target="_blank" rel="noreferrer" className="cursor-pointer transition-colors hover:text-blue-400">Contributions Log</a>
      <div className="flex items-center gap-1">
        <span className="mr-0.5">Less</span>
        <div className="h-2 w-2 rounded-[1px] bg-[#161b22]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#0e4429]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#006d32]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#26a641]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#39d353]"></div>
        <span className="ml-0.5">More</span>
      </div>
    </div>
  </div>
);

export default GithubGraph;
```

Note: dropped `"use client"`, `useState`, `useEffect` — this component is now pure presentation over props, no interactivity beyond CSS `:hover`.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds — full chain (`page.tsx` → `HomePage` → `StatusBar` → `GithubGraph`) now type-checks end to end.

---

### Task 8: Final validation pass

**Files:** none (verification only)

- [ ] **Step 1: Full build without `GITHUB_TOKEN`**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no errors (this environment has no `GITHUB_TOKEN` set, exercising the `null` fallback path at build time).

- [ ] **Step 2: Manual browser check of the fallback path**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the StatusBar and confirm:
- Level/Exp/Following/Followers all show `—`.
- The contribution graph shows the gray skeleton grid (52×7), not random colored squares.
- No console errors.
- "GITHUB PROFILE →" and "Contributions Log" both link to `https://github.com/VictorrMendes`.

- [ ] **Step 3: Stop dev server**

No commit — leave all changes staged/unstaged in the working tree for manual review. Note for the user: real-data verification requires their own `GITHUB_TOKEN` in `.env.local`, which this environment doesn't have.

---

## Self-Review Notes

- **Spec coverage:** `site.ts` username (Task 1), `lib/github.ts` (Task 2), `.env.example` (Task 3), `page.tsx` Server Component (Task 4), prop threading through `HomePage`/`StatusBar`/`GithubGraph` (Tasks 5-7), fallback validation (Task 8) — matches every section of the spec.
- **Placeholder scan:** no TBD/TODO; every step has literal code.
- **Type consistency:** `GithubStats`/`ContributionDay` defined once in `src/lib/github.ts`, imported with `import type` everywhere else (`HomePage`, `StatusBar`, `GithubGraph`) — no redefinition drift. `GithubGraphProps.weeks` matches `GithubStats.weeks` exactly.
