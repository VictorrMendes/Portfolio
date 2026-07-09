# Fase 3 — Acessibilidade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the accessibility violations found by the `web-design-guidelines` audit: keyboard-operable menu and clickable tiles/cards, a properly-trapped and labeled Modal, a skip link, dark `color-scheme`, and `prefers-reduced-motion` support.

**Architecture:** `Modal.tsx` (built in Fase 2) gains `role="dialog"`/`aria-modal` and a focus trap via `focus-trap-react`. `TileGrid.tsx` and `Projects.tsx`'s clickable elements become `motion.button`. `Navbar.tsx`'s `<li onClick>` items become real buttons. `layout.tsx` gains a skip link, dark `color-scheme`, and a `MotionConfig` wrapper for reduced motion.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, `focus-trap-react` (new dependency).

## Global Constraints

- No automated test suite exists — verification is `npm run build` per task plus one final manual/Playwright browser pass (keyboard navigation + reduced motion).
- **No git commits this session** — explicit user instruction. Skip all commit steps.
- Zero intended visual regression — all changes are behavioral/semantic (button vs div, ARIA attributes) or additive (focus rings only visible on keyboard focus, skip link only visible on focus).
- Focus ring color: `focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f]` — reused verbatim everywhere a ring is added.

---

### Task 1: Install `focus-trap-react`

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install**

Run: `npm install focus-trap-react@^12`
Expected: added to `dependencies` in `package.json`, no peer dependency warnings (package supports React 18/19).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 2: `Modal.tsx` — dialog semantics, focus trap, overscroll containment

**Files:**
- Modify: `src/components/ui/Modal.tsx` (full rewrite)

**Interfaces:**
- Consumes: `focus-trap-react` default export `FocusTrap`.
- Produces: same `ModalProps` as before (`open`, `onClose`, `children`, `panelClassName`) — no signature change, so `Skills.tsx`, `Softskills.tsx`, `Projects.tsx` (Fase 2 consumers) need no changes.

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/ui/Modal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
};

const Modal = ({ open, onClose, children, panelClassName = "" }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 [overscroll-behavior:contain]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <FocusTrap
            focusTrapOptions={{
              initialFocus: false,
              escapeDeactivates: false,
              fallbackFocus: '[role="dialog"]',
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative z-10 [overscroll-behavior:contain] ${panelClassName}`}
              tabIndex={-1}
            >
              {children}
            </motion.div>
          </FocusTrap>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
```

Notes:
- `escapeDeactivates: false` because `Esc` is already handled by the existing `handleKeyDown` effect (which calls the same `onClose`); letting the trap also handle it would double-fire but is harmless — set to `false` to keep a single source of truth for the Escape behavior.
- `initialFocus: false` + `fallbackFocus: '[role="dialog"]'` + `tabIndex={-1}` on the panel: since modal content varies (some have a close `<button>` first, some don't), falling back to focusing the panel itself is the safest default — it still moves focus inside the dialog and lets `Tab` reach the first real focusable child next.
- Focus-trap-react restores focus to the previously focused element automatically on unmount (`returnFocusOnDeactivate` defaults to `true`).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds, no TypeScript errors from `focus-trap-react` types.

---

### Task 3: `TileGrid.tsx` — button + focus ring

**Files:**
- Modify: `src/components/ui/TileGrid.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/ui/TileGrid.tsx
"use client";

import { motion } from "framer-motion";

export type Tile = {
  key: string;
  icon: React.ReactNode;
  label: string;
  colorClassName?: string;
};

type TileGridProps = {
  tiles: Tile[];
  onSelect: (key: string) => void;
  columns?: string;
};

const TileGrid = ({ tiles, onSelect, columns = "grid-cols-4" }: TileGridProps) => (
  <div className={`grid gap-4 ${columns}`}>
    {tiles.map((tile) => (
      <motion.button
        key={tile.key}
        type="button"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(tile.key)}
        className="neon-border pixel-corners flex aspect-square cursor-pointer flex-col items-center justify-center bg-[#150a21]/60 p-2 backdrop-blur-sm transition-colors hover:bg-purple-900/40 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none"
      >
        <div className={tile.colorClassName}>{tile.icon}</div>
        <span className="mt-2 text-center font-pixel text-[8px] text-gray-300">{tile.label}</span>
      </motion.button>
    ))}
  </div>
);

export default TileGrid;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 4: `Projects.tsx` — card as button + focus ring

**Files:**
- Modify: `src/components/home/sections/Projects.tsx:21-26` (project card element only)

- [ ] **Step 1: Replace the card wrapper**

Replace:

```tsx
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="neon-border pixel-corners group flex flex-col bg-[#150a21]/80 backdrop-blur-sm cursor-pointer hover:bg-purple-900/20 transition-all overflow-hidden h-full"
            >
```

with:

```tsx
            <motion.button
              key={project.title}
              type="button"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="neon-border pixel-corners group flex w-full flex-col text-left bg-[#150a21]/80 backdrop-blur-sm cursor-pointer hover:bg-purple-900/20 transition-all overflow-hidden h-full focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none"
            >
```

And close it with `</motion.button>` instead of `</motion.div>` (the closing tag right before `))}` at the end of the `.map()` callback).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 5: `Navbar.tsx` — keyboard-operable menu

**Files:**
- Modify: `src/components/home/sections/Navbar.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/Navbar.tsx
"use client";

import { useState } from "react";
import { SITE } from "@/content/site";

const NAV_ITEMS = [
  { id: "home", label: "[ HOME ]" },
  { id: "sobre", label: "SOBRE" },
  { id: "skills", label: "SKILLS" },
  { id: "projetos", label: "PROJETOS" },
  { id: "rota", label: "ROTA" },
];

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f] focus:outline-none rounded-sm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl font-pixel text-[9px] text-purple-300 md:top-6 lg:left-20 lg:right-20">
      <div className="neon-border pixel-corners flex items-center justify-between bg-[#150a21]/80 p-3 backdrop-blur-lg shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-purple-500 animate-pulse"></span>
          <span className="text-white text-xs md:text-sm neon-text tracking-wider">VICTOR MENDES</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-5 border-r border-purple-900 pr-6 py-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors ${FOCUS_RING}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-white text-xs">
            <a href={SITE.github} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[GITHUB]</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[LINKEDIN]</a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[WHATSAPP]</a>
          </div>
        </div>

        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            className={`text-white hover:text-purple-400 transition-colors ${FOCUS_RING}`}
          >
            {isOpen ? "[ X ]" : "[ MENU ]"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="menu-mobile"
          className="md:hidden mt-2 flex flex-col items-center gap-4 neon-border pixel-corners bg-[#150a21]/95 p-5 backdrop-blur-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-top-2"
        >
          <ul className="flex flex-col items-center space-y-5 w-full border-b border-purple-900 pb-5 text-[10px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer text-purple-400 hover:text-white hover:neon-text transition-colors ${FOCUS_RING}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-6 text-white text-[10px] w-full pt-1">
            <a href={SITE.github} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[GITHUB]</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[LINKEDIN]</a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`hover:text-purple-400 hover:neon-text transition-colors ${FOCUS_RING}`}>[WHATSAPP]</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
```

Note: introduced a `NAV_ITEMS` array to avoid repeating the same 5 `<li>` blocks twice (desktop + mobile) with slightly different styling logic than before — this is a mechanical dedup, not a new abstraction; the rendered output (text, order, first-item highlight styling) is unchanged. The first item (`[ HOME ]`) keeps its distinct `text-purple-400` styling baked into its `label`/shared classes exactly as before (both desktop and mobile already used the same classes for the first item, so no visual change).

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 6: `HomePage.tsx` — decorative image + main landmark id

**Files:**
- Modify: `src/components/home/HomePage.tsx:14-16`

- [ ] **Step 1: Edit**

Replace:

```tsx
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-12 lg:px-20">
      <div className="pixelated absolute inset-0 z-0 opacity-15">
        <Image src="/bg-pixel.png" alt="Background" fill quality={100} priority className="object-cover object-top" />
```

with:

```tsx
    <main id="conteudo-principal" className="relative min-h-screen overflow-hidden px-4 py-6 md:px-12 lg:px-20">
      <div aria-hidden="true" className="pixelated absolute inset-0 z-0 opacity-15">
        <Image src="/bg-pixel.png" alt="" fill quality={100} priority className="object-cover object-top" />
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 7: `layout.tsx` — skip link, dark color-scheme, theme-color, reduced motion

**Files:**
- Modify: `src/app/layout.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start"
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323"
});

export const metadata: Metadata = {
  title: 'Victor Mendes | Desenvolvedor Front-End & Automação',
  description: 'Portfólio de Victor Mendes de Souza. Desenvolvedor Front-End especializado em React, Next.js, TypeScript, Python e infraestrutura (Docker/n8n).',
  keywords: [
    'Victor Mendes',
    'Victor Mendes de Souza',
    'Desenvolvedor Front-End',
    'React',
    'Next.js',
    'Portfólio Victor Mendes',
    'Desenvolvedor Juatuba',
    'Programador Front-End'
  ],
  authors: [{ name: 'Victor Mendes' }],
  creator: 'Victor Mendes',
  other: {
    'theme-color': '#09030f',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.vmstorm.com.br/',
    title: 'Victor Mendes | Desenvolvedor Front-End',
    description: 'Transformando lógica em experiências digitais. Código limpo, infraestrutura robusta e design imersivo.',
    siteName: 'Victor Mendes Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfólio Victor Mendes',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" style={{ colorScheme: "dark" }}>
      <body className={`${pressStart.variable} ${vt323.variable} antialiased min-h-screen relative`}>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:neon-border focus:pixel-corners focus:bg-[#150a21] focus:px-4 focus:py-2 focus:font-pixel focus:text-xs focus:text-white"
        >
          Pular para o conteúdo
        </a>

        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-15"></div>

        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>

        <Analytics />
      </body>
    </html>
  );
}
```

Note: `other: { 'theme-color': '#09030f' }` on Next's `Metadata` export renders a `<meta name="theme-color" content="#09030f">` tag — Next's dedicated `viewport`/`themeColor` export field is the more idiomatic API, but `metadata.other` avoids introducing a second export just for one tag and produces the identical tag.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds. Confirm in the output HTML (`curl -s http://localhost:3000 | grep theme-color` during Task 8's manual pass) that the meta tag is present.

---

### Task 8: `globals.css` — focus-visible fallback

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append a global focus-visible rule**

Add at the end of the file:

```css
:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 9: Final validation pass

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no new TypeScript/build errors.

- [ ] **Step 2: Keyboard-only navigation pass**

Run: `npm run dev`, open `http://localhost:3000`, and using only `Tab`/`Shift+Tab`/`Enter`/`Esc`:
- First `Tab` press reveals the "Pular para o conteúdo" skip link; `Enter` jumps focus to `#conteudo-principal`.
- Tab through the navbar: each menu item and each social link shows a visible purple focus ring; `Enter` on a menu item scrolls to the right section.
- Tab to a Skills tile, `Enter` opens its modal; focus lands inside the modal; `Tab`/`Shift+Tab` cycle only within the modal (can't reach the page behind it); `Esc` closes it and focus returns to the tile that opened it.
- Repeat for a Softskills tile and a Projects card.
- Toggle the mobile menu button (resize viewport to mobile width first) and confirm `aria-expanded` flips (check via browser devtools accessibility tree or `page.get_attribute`).

- [ ] **Step 3: Reduced motion check**

In Chrome DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion: reduce", reload the page, and confirm entrance animations (fade/slide on scroll) and modal open/close transitions are visibly reduced or instant compared to Step 2.

- [ ] **Step 4: Stop dev server**

No commit — leave all changes staged/unstaged in the working tree for manual review.

---

## Self-Review Notes

- **Spec coverage:** Modal (Task 2), TileGrid (Task 3), Projects card (Task 4), Navbar (Task 5), decorative image + main id (Task 6), layout skip link/color-scheme/theme-color/reduced-motion (Task 7), CSS fallback (Task 8), validation (Task 9) — every finding from the audit has a corresponding task.
- **Placeholder scan:** no TBD/TODO; every step has literal code.
- **Type consistency:** `ModalProps` unchanged, so Fase 2's `Skills.tsx`/`Softskills.tsx`/`Projects.tsx` `<Modal>` usages keep working without edits (verified: none of them pass anything beyond `open`/`onClose`/`children`/`panelClassName`, all still supported).
