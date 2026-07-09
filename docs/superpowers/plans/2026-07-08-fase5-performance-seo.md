# Fase 5 — Performance & SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the `metadataBase` warning, resolve the dual-`priority`/unconfigured-`quality` image conflict, add `sizes` to every `fill` image, and add a JSON-LD Person schema — all sourced from the existing `SITE` content object.

**Architecture:** Extend `SITE` with `url`/`jobTitle`. Configure `next.config.ts` image quality allowlist. Tune `Image` props in `HomePage.tsx`, `Hero.tsx`, `Projects.tsx`. Add a new `PersonJsonLd` Server Component rendered from `layout.tsx`.

**Tech Stack:** Next.js 16 `Metadata`/`Image` APIs, schema.org JSON-LD.

## Global Constraints

- No automated test suite — verification is `npm run build` (checking warnings disappear) plus a manual browser/Network-tab pass.
- **No git commits this session.**
- No visual regression — all changes are metadata/attribute-level (image `quality`/`sizes`/`priority`, `<script type="application/ld+json">`), nothing touches rendered layout.

---

### Task 1: `src/content/site.ts` — add `url` and `jobTitle`

**Files:**
- Modify: `src/content/site.ts`

- [ ] **Step 1: Edit**

Add two fields to the `SITE` object: `url: "https://www.vmstorm.com.br"` and `jobTitle: "Desenvolvedor Front-End"`.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 2: `next.config.ts` — image quality allowlist

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Edit**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [50, 75, 90],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 3: `src/components/PersonJsonLd.tsx` — structured data

**Files:**
- Create: `src/components/PersonJsonLd.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/PersonJsonLd.tsx
import { SITE } from "@/content/site";

const PersonJsonLd = () => {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor Mendes de Souza",
    jobTitle: SITE.jobTitle,
    url: SITE.url,
    sameAs: [SITE.github, SITE.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};

export default PersonJsonLd;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (not wired up yet).

---

### Task 4: `src/app/layout.tsx` — `metadataBase`, OG url, render `PersonJsonLd`

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Edit imports and metadata**

Add imports:

```tsx
import { SITE } from "@/content/site";
import PersonJsonLd from "@/components/PersonJsonLd";
```

In the `metadata` object, add `metadataBase: new URL(SITE.url),` as a top-level field, and change `openGraph.url: 'https://www.vmstorm.com.br/',` to `openGraph.url: SITE.url,`.

- [ ] **Step 2: Render `PersonJsonLd`**

Inside `RootLayout`'s returned JSX, add `<PersonJsonLd />` as the first child of `<body>`, before the skip link.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds, and the `metadataBase` warning is gone from the build output.

---

### Task 5: `HomePage.tsx` — decorative background image

**Files:**
- Modify: `src/components/home/HomePage.tsx`

- [ ] **Step 1: Edit**

Replace:

```tsx
        <Image src="/bg-pixel.png" alt="" fill quality={100} priority className="object-cover object-top" />
```

with:

```tsx
        <Image src="/bg-pixel.png" alt="" fill quality={50} sizes="100vw" className="object-cover object-top" />
```

(drops `priority`, lowers `quality` to `50`, adds `sizes="100vw"`.)

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 6: `Hero.tsx` — avatar image

**Files:**
- Modify: `src/components/home/sections/Hero.tsx`

- [ ] **Step 1: Edit**

Replace:

```tsx
          <Image src="/avatar.png" alt="Victor Mendes" fill priority quality={100} className="object-cover" />
```

with:

```tsx
          <Image
            src="/avatar.png"
            alt="Victor Mendes"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
            className="object-cover"
          />
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 7: `Projects.tsx` — card and modal images

**Files:**
- Modify: `src/components/home/sections/Projects.tsx`

- [ ] **Step 1: Add `sizes` to the card thumbnail**

Replace:

```tsx
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
```

with:

```tsx
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
```

- [ ] **Step 2: Add `sizes` to the modal detail image**

Replace:

```tsx
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover opacity-30 blur-[2px]"
              />
```

with:

```tsx
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover opacity-30 blur-[2px]"
              />
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 8: `src/app/sitemap.ts` and `src/app/robots.tsx` — use `SITE.url`

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.tsx`

- [ ] **Step 1: `sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

- [ ] **Step 2: `robots.tsx`**

```typescript
import { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 9: Final validation pass

**Files:** none (verification only)

- [ ] **Step 1: Full build, check warnings**

Run: `npm run build`
Expected: `✓ Compiled successfully`, **no** `metadataBase` warning, **no** image quality warnings.

- [ ] **Step 2: Manual browser check**

Run: `npm run dev`, open `http://localhost:3000`, and:
- View page source / DevTools Elements and confirm `<script type="application/ld+json">` is present with the Person schema (name, jobTitle, url, sameAs).
- DevTools → Network → Img: confirm project card thumbnails request a scaled-down width (not the original asset's full resolution) and the modal detail image requests a size close to the panel's rendered width.
- Confirm no console warnings about image `quality`/`sizes`.

- [ ] **Step 3: Stop dev server**

No commit — leave all changes staged/unstaged in the working tree for manual review.

---

## Self-Review Notes

- **Spec coverage:** `site.ts` (Task 1), `next.config.ts` (Task 2), `PersonJsonLd` (Task 3), `layout.tsx` wiring (Task 4), background/avatar/project images (Tasks 5-7), sitemap/robots `SITE.url` (Task 8), validation (Task 9) — matches every section of the spec.
- **Placeholder scan:** no TBD/TODO; every step has literal code.
- **Type consistency:** `SITE.url`/`SITE.jobTitle` defined once in Task 1, consumed identically in `PersonJsonLd`, `layout.tsx`, `sitemap.ts`, `robots.tsx`.
