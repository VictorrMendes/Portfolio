# Fase 2 — Arquitetura & Conteúdo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract hardcoded content (projects, skills, soft skills, timeline, site-wide links) out of presentation components into `src/content/`, and deduplicate the 3 near-identical modal implementations and 2 near-identical tile grids into shared `src/components/ui/` components.

**Architecture:** New `src/content/*.ts` files hold typed data arrays consumed by existing section components. New `src/components/ui/Modal.tsx` (generic overlay mechanics: mount/unmount, backdrop click, Escape key, scroll lock) and `src/components/ui/TileGrid.tsx` (clickable icon-tile grid) replace duplicated logic in `Skills.tsx`, `Softskills.tsx`, `Projects.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion.

## Global Constraints

- No automated test suite exists in this repo (confirmed: no Jest/Vitest/Playwright config, no `test` script in `package.json`). Replace "write failing test / run test" steps with `npm run build` (runs `tsc` + Next build) after each task, plus a final manual browser verification pass in the last task.
- **No git commits this session** — explicit user instruction ("sem commits no momento"). Skip all commit steps. Leave changes unstaged/uncommitted for the user to review and commit manually.
- Zero intended visual regression. The only intentional new behavior: all 3 modals close on `Esc` (previously none did).
- Follow existing code conventions: functional components, no semicolons-heavy style changes, Tailwind utility classes as already used, `"use client"` only on components that need it (state/effects/interactivity).

---

### Task 1: `src/content/site.ts`

**Files:**
- Create: `src/content/site.ts`

**Interfaces:**
- Produces: `SITE` object with fields `name`, `tagline`, `email`, `whatsapp` (full `wa.me` URL), `github` (profile URL), `linkedin` (profile URL), `resumeUrl`.

- [ ] **Step 1: Create the file**

```typescript
// src/content/site.ts
export const SITE = {
  name: "Victor Mendes",
  tagline: "Transformando lógica em experiências digitais.",
  email: "victo.mendes.souza@gmail.com",
  whatsapp: "https://wa.me/5531998186472",
  github: "https://github.com/VictorrMendes",
  linkedin: "https://www.linkedin.com/in/victor-mendes-de-souza-728270234/",
  resumeUrl: "/Currculo_Victor_Mendes_Desenvolvedor.pdf",
} as const;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (new file isn't imported yet, so this just confirms no syntax error breaks the build).

---

### Task 2: `src/content/skills.ts`

**Files:**
- Create: `src/content/skills.ts`

**Interfaces:**
- Produces: `type Skill = { t: string; s: string; c: string; desc: string }`, `skills: Skill[]` (12 items, verbatim from current `Skills.tsx`).

- [ ] **Step 1: Create the file**

```typescript
// src/content/skills.ts
export type Skill = {
  t: string;
  s: string;
  c: string;
  desc: string;
};

export const skills: Skill[] = [
  { t: "⚛", s: "React", c: "text-cyan-400", desc: "Biblioteca principal. Cria interfaces de usuário dinâmicas e baseadas em componentes reutilizáveis." },
  { t: "JS", s: "JavaScript", c: "text-yellow-400", desc: "A linguagem base que dá vida e lógica às interações da web moderna." },
  { t: "TS", s: "TypeScript", c: "text-blue-500", desc: "Superconjunto de JS que adiciona tipagem estática, garantindo um código mais seguro e escalável." },
  { t: "N", s: "Next.js", c: "text-white", desc: "Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos de alta performance." },
  { t: "PY", s: "Python", c: "text-yellow-500", desc: "Linguagem versátil focada em legibilidade, muito usada em automações, IA e backends robustos." },
  { t: "dj", s: "Django", c: "text-green-600", desc: "Framework web Python de alto nível que incentiva o desenvolvimento rápido e um design limpo." },
  { t: "🐧", s: "Linux", c: "text-white", desc: "Sistema operacional base para servidores, essencial para gerenciamento de infraestrutura e Home Labs." },
  { t: "🐳", s: "Docker", c: "text-blue-400", desc: "Plataforma de containerização para empacotar, distribuir e rodar aplicações em qualquer ambiente." },
  { t: "Fg", s: "Figma", c: "text-pink-400", desc: "Ferramenta de design e prototipagem colaborativa focada na criação de interfaces UI/UX." },
  { t: "UI", s: "Responsive", c: "text-purple-300", desc: "Arquitetura CSS fluida garantindo que a aplicação funcione e pareça perfeita em qualquer tamanho de tela." },
  { t: "Git", s: "Version", c: "text-orange-500", desc: "Sistema de controle de versão distribuído para rastrear alterações de código em equipe." },
  { t: "n8n", s: "Orquestração", c: "text-green-400", desc: "Ferramenta de automação de fluxo de trabalho baseada em nós, conectando APIs e serviços perfeitamente." },
];
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 3: `src/content/soft-skills.ts`

**Files:**
- Create: `src/content/soft-skills.ts`

**Interfaces:**
- Produces: `type SoftSkill = { Icon: React.ElementType; s: string; c: string; desc: string }`, `softSkills: SoftSkill[]` (4 items, verbatim from current `Softskills.tsx`).

- [ ] **Step 1: Create the file**

```typescript
// src/content/soft-skills.ts
import type { ElementType } from "react";
import { Users, Rocket, Target, MessageSquare } from "lucide-react";

export type SoftSkill = {
  Icon: ElementType;
  s: string;
  c: string;
  desc: string;
};

export const softSkills: SoftSkill[] = [
  {
    Icon: Users,
    s: "Equipe",
    c: "text-pink-400",
    desc: "Trabalho bem em equipe, valorizando a colaboração e o respeito mútuo para alcançar objetivos comuns.",
  },
  {
    Icon: Rocket,
    s: "Proativo",
    c: "text-purple-300",
    desc: "Sempre tomo a iniciativa para antecipar problemas, buscar soluções e assumir responsabilidades sem precisar de microgerenciamento.",
  },
  {
    Icon: Target,
    s: "Dedicado",
    c: "text-orange-500",
    desc: "Alto nível de foco e comprometimento com as entregas, buscando sempre a excelência e a qualidade no código.",
  },
  {
    Icon: MessageSquare,
    s: "Comunicativo",
    c: "text-green-400",
    desc: "Habilidade de expressar ideias técnicas de forma clara, ouvir ativamente e manter o alinhamento com stakeholders.",
  },
];
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 4: `src/content/timeline.ts`

**Files:**
- Create: `src/content/timeline.ts`

**Interfaces:**
- Produces: `type TimelineItem = { category: string; year: string; title: string; subtitle: string; list: { name: string; date: string }[] }`, `timeline: TimelineItem[]` (5 items, verbatim from current `Timeline.tsx`).

- [ ] **Step 1: Create the file**

```typescript
// src/content/timeline.ts
export type TimelineItem = {
  category: string;
  year: string;
  title: string;
  subtitle: string;
  list: { name: string; date: string }[];
};

export const timeline: TimelineItem[] = [
  {
    category: "Educação",
    year: "2024 - 2028",
    title: "Ciência da Computação",
    subtitle: "Universidade Anhembi Morumbi",
    list: [],
  },
  {
    category: "Certificações",
    year: "2025",
    title: "",
    subtitle: "",
    list: [
      { name: "React / JavaScript", date: "2025" },
      { name: "Python / Django", date: "2025" },
      { name: "Linux Professional", date: "2025" },
      { name: "Git e GitHub", date: "2025" },
      { name: "Arquitetura de Redes", date: "2025" },
    ],
  },
  {
    category: "Experiência",
    year: "2024 - Atual",
    title: "Analista de Operações",
    subtitle: "Next Rental (Frotas)",
    list: [
      { name: "Automação com Python", date: "" },
      { name: "Gestão de Frotas", date: "" },
    ],
  },
  {
    category: "Experiência",
    year: "2023 - Atual",
    title: "Dev. Freelancer",
    subtitle: "Autônomo",
    list: [
      { name: "Desenvolvimento React", date: "" },
      { name: "Portfólios e E-commerces", date: "" },
      { name: "Infraestrutura Web", date: "" },
    ],
  },
  {
    category: "Experiência",
    year: "05/2022 - 10/2024",
    title: "Auxiliar Logístico",
    subtitle: "Palácio Dos Leilões",
    list: [
      { name: "Coordenação de Setor", date: "" },
      { name: "Relacionamento B2B", date: "" },
    ],
  },
];
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 5: `src/content/projects.ts`

**Files:**
- Create: `src/content/projects.ts`

**Interfaces:**
- Produces: `type Project = { title: string; shortDesc: string; tech: string[]; image: string; link: string; content: ReactNode }`, `projects: Project[]` (6 items, verbatim `content` JSX from current `Projects.tsx`).

- [ ] **Step 1: Create the file**

```typescript
// src/content/projects.ts
import type { ReactNode } from "react";

export type Project = {
  title: string;
  shortDesc: string;
  tech: string[];
  image: string;
  link: string;
  content: ReactNode;
};

export const projects: Project[] = [
  {
    title: "VMSERVER: Home Lab",
    shortDesc: "Transformando um notebook Celeron no cérebro de uma casa inteligente. Arquitetura 100% Self-Hosted.",
    tech: ["Docker", "Linux", "n8n", "Llama 3", "Tailscale"],
    image: "/projects/servidor.png",
    link: "https://github.com/VictorrMendes/HomeLab",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Transformando um notebook Positivo (com processador Celeron) no cérebro de uma casa inteligente. Uma arquitetura 100% Self-Hosted, orquestrada por fluxos automatizados e Inteligência Artificial.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">💡 A Filosofia</h4>
        <p>Sempre fui fascinado por filmes futuristas com casas inteligente (como o J.A.R.V.I.S.). Resolvi trazer isso para o mundo real usando um hardware encostado. O objetivo foi criar um Assistente Pessoal capaz de gerenciar infraestrutura, salvar anotações e controlar a casa via linguagem natural, rodando 100% localmente sem depender das nuvens das Big Techs.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🛠️ Arquitetura Inteligente</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Interceptação Segura:</strong> Webhook do n8n exposto via Cloudflare Tunnels validando estritamente meu Chat ID do Telegram.</li>
          <li><strong className="text-white">Intent Routing (LLM):</strong> A mensagem bruta vai para a API Groq (Llama 3), classificando a intenção em milissegundos.</li>
          <li><strong className="text-white">Microsserviços:</strong> Integrações nativas via HTTP e SSH para gerenciar Home Assistant, SO Linux e Blinko (Segundo Cérebro).</li>
        </ul>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">💻 Stack e Otimização</h4>
        <p>Sistema otimizado com ZRAM para suportar dezenas de containers no Celeron. Rodando Nginx Proxy Manager, Grafana, InfluxDB, Portainer, Homarr e Tailscale (Zero Trust Network).</p>
      </div>
    ),
  },
  {
    title: "FinanceVM (PWA)",
    shortDesc: "App de gestão financeira pessoal estilo Private Bank. Instalável com gráficos dinâmicos.",
    tech: ["Next.js 15", "TypeScript", "Tailwind v4", "Django"],
    image: "/projects/financeVM.png",
    link: "https://myfinances-self.vercel.app",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Um aplicativo web progressivo (PWA) moderno e responsivo para gestão financeira pessoal. Controle total de receitas, despesas, cartões e investimentos com uma interface estilo Fintech.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Funcionalidades Principais</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Autenticação Private Bank:</strong> Login seguro com JWT e Refresh Tokens via Backend Python.</li>
          <li><strong className="text-white">Dashboard de Ativos:</strong> Visão consolidada de liquidez, reserva e patrimônio.</li>
          <li><strong className="text-white">Análise Gráfica:</strong> Distribuição de gastos por categoria usando Recharts.</li>
          <li><strong className="text-white">PWA Nativo:</strong> Utilização de Workbox Service Workers para instalação direta no Android e iOS.</li>
        </ul>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🚀 O Código</h4>
        <p>Desenvolvido com foco em mobile-first e alta performance. O Frontend utiliza Next.js com App Router e Tailwind CSS, consumindo uma API REST privada e segura construída em Django.</p>
      </div>
    ),
  },
  {
    title: "LeituraXP",
    shortDesc: "Buscador de livros com autenticação e consumo de APIs externas de literatura.",
    tech: ["Next.js", "React", "Tailwind", "shadcn/ui"],
    image: "/projects/leituraxp.png",
    link: "https://leitura-xp.vercel.app",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Um buscador de livros que permite acessar detalhes e sinopses de diversas obras, consumindo a Google Books API. Desenvolvido para unir minhas paixões por leitura e programação.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">⚙️ Detalhes Técnicos</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Gerenciamento de Estado:</strong> Uso da Context API do React para gerenciar o estado global de autenticação com persistência no LocalStorage.</li>
          <li><strong className="text-white">Rotas Protegidas:</strong> Implementação de Next.js Middleware para bloquear acesso a áreas internas sem sessão ativa.</li>
          <li><strong className="text-white">Consumo de Dados Avançado:</strong> Controle manual de estados (`isLoading`, `isError`, `data`) nativamente via Fetch e useEffect, sem bibliotecas de terceiros.</li>
          <li><strong className="text-white">UI/UX:</strong> Componentização moderna baseada no shadcn/ui.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "EventoHub 🚀",
    shortDesc: "Plataforma de eventos moderna e performática com foco em SSG, ISR e Server Actions.",
    tech: ["Next.js", "Zod", "Hook Form", "Jest"],
    image: "/projects/eventohub.png",
    link: "https://eventohub.vercel.app",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Uma plataforma moderna para a divulgação e criação de eventos de tecnologia. Este projeto foi desenvolvido como um case prático para demonstrar proficiência em tecnologias front-end modernas, com foco em performance, SEO e qualidade de código.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">🎯 Conceitos Arquiteturais Aplicados</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">SSG & ISR:</strong> A listagem de eventos é gerada estaticamente com revalidação em segundo plano a cada 60 segundos (ISR), garantindo carregamento instantâneo.</li>
          <li><strong className="text-white">Server Actions:</strong> Manipulação de dados e persistência (criação de eventos) de forma segura diretamente no back-end.</li>
          <li><strong className="text-white">Formulários Robustos:</strong> Uso do React Hook Form integrado com Zod para validação em tempo real de esquemas estritos.</li>
          <li><strong className="text-white">Testes Automatizados:</strong> Ambiente coberto por testes unitários e de componente usando Jest e React Testing Library.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Predserv Engenharia",
    shortDesc: "Landing page corporativa focada em conversão, portfólio de obras e alta velocidade.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    image: "/projects/predserv.png",
    link: "https://predservengenharia.com.br/",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Site Empresarial desenvolvido para cliente real (Predserv Engenharia & Reformas Civis), com foco em apresentação de serviços, prova social e captação de contatos.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Visão Geral do Projeto</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">Foco em Conversão:</strong> Estrutura de UX desenhada para transmitir credibilidade e facilitar a solicitação de orçamentos (Leads).</li>
          <li><strong className="text-white">Conteúdo Desacoplado:</strong> Arquitetura orientada para manutenção onde todo o conteúdo (textos, depoimentos, serviços) fica centralizado em um arquivo isolado (`content.ts`), permitindo atualizações fáceis sem alterar os componentes.</li>
          <li><strong className="text-white">Vanguarda Técnica:</strong> Utilizando as versões mais recentes das ferramentas web (Next.js 16 App Router e React 19).</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Amazonas Films",
    shortDesc: "Landing page Empresarial em React com formulário de orçamento dinâmico.",
    tech: ["React 17", "Bootstrap", "EmailJS", "Slick"],
    image: "/projects/amazonasfilms.png",
    link: "https://amazonas-films.com/",
    content: (
      <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed">
        <p>Landing page Empresarial da Amazonas Filmes e Adesivos, desenvolvida em React, com foco em apresentação de serviços, galeria de projetos, depoimentos e formulário de contato para solicitação de orçamentos.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">📌 Visão Geral do Projeto</h4>
        <p>O projeto é uma SPA (Single Page Application) com navegação por rolagem suave entre seções. Os textos e dados principais ficam centralizados em um arquivo JSON, facilitando a manutenção futura.</p>

        <h4 className="text-purple-400 font-pixel text-base md:text-2xl lg:text-3xl mt-8 md:mt-12 mb-3 md:mb-5">⚙️ Funcionalidades e Integrações</h4>
        <ul className="list-disc pl-5 space-y-2 md:space-y-3">
          <li><strong className="text-white">EmailJS:</strong> Integração direta no front-end para envio de e-mails de orçamento sem necessidade de um backend próprio.</li>
          <li><strong className="text-white">Carrossel Interativo:</strong> Utilização do React Slick e Yet Another React Lightbox para uma galeria de portfólio imersiva.</li>
          <li><strong className="text-white">Estilização Híbrida:</strong> Combinação de CSS Customizado com a base sólida do Bootstrap e ícones do Font Awesome.</li>
        </ul>
      </div>
    ),
  },
];
```

Note: this file needs `.tsx` extension (not `.ts`), since it contains JSX. Create it as `src/content/projects.tsx`.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 6: `src/components/ui/Modal.tsx`

**Files:**
- Create: `src/components/ui/Modal.tsx`

**Interfaces:**
- Produces: `function Modal({ open, onClose, children, panelClassName }: ModalProps)`.
  - `open: boolean` — controls mount via `AnimatePresence`.
  - `onClose: () => void` — called on backdrop click and `Esc` keydown.
  - `children: ReactNode` — the panel content (consumer owns internal layout, including its own close button).
  - `panelClassName?: string` — merged onto the panel wrapper for sizing/positioning per use site.
- Consumes: `framer-motion` (`motion`, `AnimatePresence`), already a project dependency.

- [ ] **Step 1: Create the file**

```typescript
// src/components/ui/Modal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative z-10 ${panelClassName}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (component not wired up yet, just checks it compiles standalone).

---

### Task 7: `src/components/ui/TileGrid.tsx`

**Files:**
- Create: `src/components/ui/TileGrid.tsx`

**Interfaces:**
- Produces: `function TileGrid({ tiles, onSelect, columns }: TileGridProps)`.
  - `tiles: Tile[]` where `Tile = { key: string; icon: ReactNode; label: string; colorClassName?: string }`.
  - `onSelect: (key: string) => void` — called with the tile's `key` on click.
  - `columns?: string` — Tailwind grid-cols classes, defaults to the 4-column layout both current grids use (`"grid-cols-4"` for Skills, callers can override for Softskills' `"grid-cols-2 md:grid-cols-4"`).

- [ ] **Step 1: Create the file**

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
      <motion.div
        key={tile.key}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(tile.key)}
        className="neon-border pixel-corners flex aspect-square cursor-pointer flex-col items-center justify-center bg-[#150a21]/60 p-2 backdrop-blur-sm transition-colors hover:bg-purple-900/40"
      >
        <div className={tile.colorClassName}>{tile.icon}</div>
        <span className="mt-2 text-center font-pixel text-[8px] text-gray-300">{tile.label}</span>
      </motion.div>
    ))}
  </div>
);

export default TileGrid;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 8: Refactor `Skills.tsx`

**Files:**
- Modify: `src/components/home/sections/Skills.tsx` (full rewrite)

**Interfaces:**
- Consumes: `skills` from `@/content/skills`, `Skill` type from same, `Modal` (default export) from `@/components/ui/Modal`, `TileGrid` (default export) + `Tile` type from `@/components/ui/TileGrid`.

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/Skills.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, type Skill } from "@/content/skills";
import Modal from "@/components/ui/Modal";
import TileGrid from "@/components/ui/TileGrid";

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const tiles = skills.map((skill) => ({
    key: skill.s,
    icon: <span className={`font-pixel text-2xl md:text-3xl ${skill.c}`}>{skill.t}</span>,
    label: skill.s,
  }));

  return (
    <>
      <motion.div id="skills" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SKILLS / INVENTORY
        </h2>

        <TileGrid
          tiles={tiles}
          onSelect={(key) => setSelectedSkill(skills.find((s) => s.s === key) ?? null)}
        />
      </motion.div>

      <Modal open={selectedSkill !== null} onClose={() => setSelectedSkill(null)} panelClassName="w-full max-w-sm bg-[#150a21] p-6 neon-border pixel-corners shadow-[0_0_30px_rgba(168,85,247,0.5)]">
        {selectedSkill && (
          <>
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 font-pixel text-xs text-gray-400 hover:text-white transition-colors"
            >
              [X]
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <span className={`font-pixel text-5xl mb-4 ${selectedSkill.c}`}>{selectedSkill.t}</span>
              <h3 className="font-pixel text-xl text-white mb-2">{selectedSkill.s}</h3>

              <div className="w-full h-px bg-purple-900/50 my-4 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rotate-45"></div>
              </div>

              <p className="font-terminal text-lg text-gray-300 leading-relaxed">{selectedSkill.desc}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Skills;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds, no TypeScript errors.

---

### Task 9: Refactor `Softskills.tsx`

**Files:**
- Modify: `src/components/home/sections/Softskills.tsx` (full rewrite)

**Interfaces:**
- Consumes: `softSkills` from `@/content/soft-skills`, `SoftSkill` type from same, `Modal` from `@/components/ui/Modal`, `TileGrid` + `Tile` from `@/components/ui/TileGrid`.

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/Softskills.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { softSkills, type SoftSkill } from "@/content/soft-skills";
import Modal from "@/components/ui/Modal";
import TileGrid from "@/components/ui/TileGrid";

const Softskills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SoftSkill | null>(null);

  const tiles = softSkills.map((skill) => ({
    key: skill.s,
    icon: <skill.Icon size={36} strokeWidth={1.5} />,
    label: skill.s,
    colorClassName: `mb-2 ${skill.c}`,
  }));

  return (
    <>
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="mb-6 flex items-center gap-3 font-pixel text-lg text-white">
          <span className="h-5 w-2 bg-purple-600"></span>SOFT SKILLS
        </h2>

        <TileGrid
          tiles={tiles}
          columns="grid-cols-2 md:grid-cols-4"
          onSelect={(key) => setSelectedSkill(softSkills.find((s) => s.s === key) ?? null)}
        />
      </motion.div>

      <Modal open={selectedSkill !== null} onClose={() => setSelectedSkill(null)} panelClassName="w-full max-w-sm bg-[#150a21] p-6 neon-border pixel-corners shadow-[0_0_30px_rgba(168,85,247,0.5)]">
        {selectedSkill && (
          <>
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 font-pixel text-xs text-gray-400 hover:text-white transition-colors"
            >
              [X]
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className={`mb-4 ${selectedSkill.c}`}>
                <selectedSkill.Icon size={64} strokeWidth={1.5} />
              </div>

              <h3 className="font-pixel text-xl text-white mb-2">{selectedSkill.s}</h3>

              <div className="w-full h-px bg-purple-900/50 my-4 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rotate-45"></div>
              </div>

              <p className="font-terminal text-lg text-gray-300 leading-relaxed">{selectedSkill.desc}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Softskills;
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 10: Refactor `Projects.tsx`

**Files:**
- Modify: `src/components/home/sections/Projects.tsx` (full rewrite)

**Interfaces:**
- Consumes: `projects` from `@/content/projects`, `Project` type from same, `Modal` from `@/components/ui/Modal`.

- [ ] **Step 1: Rewrite the file**

```typescript
// src/components/home/sections/Projects.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import Modal from "@/components/ui/Modal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.div id="projetos" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
        <h2 className="mb-8 flex items-center gap-3 font-pixel text-lg md:text-2xl text-white">
          <span className="h-6 md:h-8 w-2 bg-purple-600"></span>QUESTS CONCLUÍDAS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="neon-border pixel-corners group flex flex-col bg-[#150a21]/80 backdrop-blur-sm cursor-pointer hover:bg-purple-900/20 transition-all overflow-hidden h-full"
            >
              <div className="relative w-full h-48 md:h-56 border-b border-purple-900/50 overflow-hidden bg-[#09030f]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150a21]/90 to-transparent"></div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="mb-4 font-pixel text-base md:text-xl lg:text-2xl text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="mb-6 font-terminal text-base md:text-lg lg:text-xl text-gray-400 flex-grow leading-relaxed">{project.shortDesc}</p>

                <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="border border-purple-800 bg-purple-950/50 px-2 py-1.5 md:px-3 md:py-2 font-pixel text-[10px] md:text-xs lg:text-sm text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Modal
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        panelClassName="w-full max-w-5xl max-h-[85vh] bg-[#0d0714] flex flex-col neon-border pixel-corners shadow-[0_0_50px_rgba(168,85,247,0.4)]"
      >
        {selectedProject && (
          <>
            <div className="relative h-32 sm:h-48 lg:h-64 shrink-0 overflow-hidden border-b border-purple-900/50">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover opacity-30 blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714] to-transparent"></div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-purple-900/50 border border-purple-500 text-white font-pixel text-xs md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 hover:bg-purple-600 transition-colors z-20 pixel-corners"
              >
                [ VOLTAR ]
              </button>

              <div className="absolute bottom-5 left-6 sm:left-8 md:bottom-8 md:left-10 z-10">
                <h3 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
              <div className="flex flex-wrap gap-3 mb-8 md:mb-12 border-b border-purple-900/30 pb-6 md:pb-8">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="border border-purple-800 bg-purple-900/30 px-3 py-1.5 md:px-4 md:py-2 font-pixel text-[10px] md:text-sm lg:text-base text-purple-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">{selectedProject.content}</div>

              <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-purple-900/30 text-center sm:text-left">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-pixel text-sm md:text-xl lg:text-2xl px-8 py-4 md:px-10 md:py-5 pixel-corners shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
                >
                  [ INICIAR_SISTEMA / ACESSAR ]
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Projects;
```

Note: the original file's `useEffect` for body scroll lock is now handled by `Modal` itself — dropped here to avoid double scroll-lock logic. Also fixed a pre-existing typo: "QUESTS CONCLUIAS" → "QUESTS CONCLUÍDAS".

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 11: Refactor `Timeline.tsx` to consume content

**Files:**
- Modify: `src/components/home/sections/Timeline.tsx:1-8` (imports and data removal only; JSX body unchanged)

**Interfaces:**
- Consumes: `timeline` from `@/content/timeline`, `TimelineItem` type from same.

- [ ] **Step 1: Replace the top of the file**

Replace lines 1-58 (the imports and the inline `timelineData` array) with:

```typescript
"use client";

import { motion } from "framer-motion";
import Contacts from "./Contacts";
import { timeline } from "@/content/timeline";
```

Then update every remaining reference to `timelineData` in the rest of the file (the `.map` call and its callback) to use `timeline` instead — the JSX body (lines 60-132 in the original) stays otherwise identical.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 12: Refactor `Navbar.tsx`, `Footer.tsx`, `Contacts.tsx`, `Hero.tsx` to consume `SITE`

**Files:**
- Modify: `src/components/home/sections/Navbar.tsx:1-4,34-36,61-63`
- Modify: `src/components/home/sections/Footer.tsx:1-4,51,61,71`
- Modify: `src/components/home/sections/Contacts.tsx:1-6,90,93,96`
- Modify: `src/components/home/sections/Hero.tsx:1-3,24`

**Interfaces:**
- Consumes: `SITE` from `@/content/site` (all four files).

- [ ] **Step 1: `Navbar.tsx`** — add `import { SITE } from "@/content/site";` near the top, then replace both occurrences (desktop menu and mobile menu) of:

```tsx
<a href="https://github.com/VictorrMendes" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[GITHUB]</a>
<a href="https://www.linkedin.com/in/victor-mendes-de-souza-728270234/" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[LINKEDIN]</a>
<a href="https://wa.me/5531998186472" target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[WHATSAPP]</a>
```

with:

```tsx
<a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[GITHUB]</a>
<a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[LINKEDIN]</a>
<a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:neon-text transition-colors">[WHATSAPP]</a>
```

- [ ] **Step 2: `Footer.tsx`** — add `import { SITE } from "@/content/site";` near the top, then replace the three `href` values (`https://github.com/VictorrMendes` → `{SITE.github}`, the LinkedIn URL → `{SITE.linkedin}`, `https://wa.me/5531998186472` → `{SITE.whatsapp}`) on the three social `motion.a` tags.

- [ ] **Step 3: `Contacts.tsx`** — add `import { SITE } from "@/content/site";` near the top, then replace the same three `href` values in the bottom social-links row.

- [ ] **Step 4: `Hero.tsx`** — add `import { SITE } from "@/content/site";` near the top, then replace:

```tsx
href="/Currculo_Victor_Mendes_Desenvolvedor.pdf"
```

with:

```tsx
href={SITE.resumeUrl}
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: succeeds.

---

### Task 13: Final validation pass

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no TypeScript errors, no new warnings beyond the pre-existing `metadataBase` one (owned by Fase 5).

- [ ] **Step 2: Manual browser check**

Run: `npm run dev`, open `http://localhost:3000`, and verify:
- Skills grid: click a tile → modal opens with correct icon/label/description; click backdrop → closes; press `Esc` → closes (new behavior).
- Soft skills grid: same check.
- Projects grid: click a card → detail modal opens with correct image/title/tech/content/link; `Esc` closes it (new behavior).
- Navbar (desktop + mobile menu): GitHub/LinkedIn/WhatsApp links point to the same URLs as before.
- Footer social icons and "SCROLL TO TOP" still work.
- Contacts section social links still point to the same URLs.
- Hero "PRESS START" button still downloads the resume PDF.
- Timeline renders identically to before (all 5 entries, alternating left/right layout).

- [ ] **Step 3: Stop dev server**

No commit — leave all changes staged/unstaged in the working tree for manual review.

---

## Self-Review Notes

- **Spec coverage:** all 5 content files (Task 1-5), Modal (Task 6), TileGrid (Task 7), all 3 modal consumers (Task 8-10), Timeline data wiring (Task 11), SITE wiring across Navbar/Footer/Contacts/Hero (Task 12), and final validation (Task 13) — every section of the Fase 2 spec has a corresponding task.
- **Placeholder scan:** no TBD/TODO; every step has literal code.
- **Type consistency:** `Skill`, `SoftSkill`, `TimelineItem`, `Project` types are defined once in `src/content/` and imported everywhere they're used — no redefinition drift. `Tile`/`TileGridProps` in `TileGrid.tsx` match how `Skills.tsx`/`Softskills.tsx` construct their `tiles` arrays (`key`, `icon`, `label`, optional `colorClassName`).
- **Correction applied during review:** `src/content/projects.ts` must actually be named `src/content/projects.tsx` since it contains JSX (Task 5 step 1 note).
