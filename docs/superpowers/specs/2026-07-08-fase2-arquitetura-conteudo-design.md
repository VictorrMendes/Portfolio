# Fase 2 — Arquitetura & conteúdo

## Contexto

Segunda fase do plano de melhoria do portfólio (ver Fase 1 —
`2026-07-08-fase1-limpeza-repo-design.md`). Hoje o conteúdo (dados de
projetos, skills, soft skills, timeline, links de contato) está hardcoded
dentro dos componentes de apresentação e duplicado entre Navbar, Footer e
Contacts. Além disso, três componentes (`Skills`, `Softskills`, `Projects`)
reimplementam de forma independente o mesmo padrão de modal (backdrop +
painel animado + botão fechar), e `Skills`/`Softskills` reimplementam o
mesmo grid de tiles clicáveis.

## Escopo

### 1. Camada de conteúdo — `src/content/`

Novos arquivos `.ts` tipados, um por domínio de conteúdo:

- `site.ts` — `SITE` constante com nome, tagline, e-mail, WhatsApp, URLs de
  GitHub/LinkedIn/WhatsApp, caminho do PDF do currículo. Substitui os
  valores hardcoded duplicados em `Navbar.tsx`, `Footer.tsx`, `Contacts.tsx`
  e `Hero.tsx`.
- `projects.ts` — `type Project` + `projects: Project[]`, movido de
  `Projects.tsx`. O campo `content` continua `ReactNode` (JSX embutido,
  sem mudança de estrutura — decisão já tomada nesta fase).
- `skills.ts` — `type Skill` + `skills: Skill[]`, movido de `Skills.tsx`.
- `soft-skills.ts` — `type SoftSkill` + `softSkills: SoftSkill[]`, movido
  de `Softskills.tsx` (mantém `Icon: React.ElementType` do lucide-react).
- `timeline.ts` — `type TimelineItem` + `timeline: TimelineItem[]`, movido
  de `Timeline.tsx`.

Os componentes de seção passam a importar esses dados em vez de
declará-los inline — ficam responsáveis só pela apresentação.

### 2. Componentes de UI compartilhados — `src/components/ui/`

**`Modal.tsx`** — componente controlado genérico:

```
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
};
```

Comportamento centralizado (hoje duplicado e incompleto nos 3 usos atuais):

- Montagem/desmontagem via `AnimatePresence` (fade do backdrop +
  scale/slide do painel).
- Fecha ao clicar no backdrop.
- **Fecha com a tecla `Esc`** — não existe hoje em nenhum dos 3 modais.
- Trava o scroll do `body` enquanto aberto, restaura ao fechar (hoje só
  `Projects.tsx` faz isso).

O conteúdo interno (header, botão fechar, corpo) continua sendo passado
como `children` por cada consumidor — o modal de projeto (grande, com
imagem de capa) e o de skill (pequeno, centralizado) têm layouts
suficientemente diferentes para não valer a pena unificar além do
mecanismo de overlay.

**`TileGrid.tsx`** — grid de tiles clicáveis:

```
type Tile = { key: string; icon: React.ReactNode; label: string; colorClassName?: string };
type TileGridProps = { tiles: Tile[]; onSelect: (key: string) => void; columns?: string };
```

Usado por `Skills.tsx` e `Softskills.tsx`, que hoje reimplementam a mesma
grade `aspect-square` com hover/tap idênticos. `Projects.tsx` **não** usa
`TileGrid` — seu grid de cards (imagem, descrição, tags) é estruturalmente
diferente e ganha pouco sendo forçado na mesma abstração.

### 3. Componentes afetados

- `Skills.tsx`, `Softskills.tsx`: passam a montar `TileGrid` + `Modal`,
  consumindo dados de `src/content/`.
- `Projects.tsx`: passa a montar `Modal` para o overlay de detalhe,
  consumindo `projects` de `src/content/projects.ts`.
- `Navbar.tsx`, `Footer.tsx`, `Contacts.tsx`, `Hero.tsx`: passam a
  consumir `SITE` de `src/content/site.ts` em vez de strings hardcoded.
- `Timeline.tsx`: consome `timeline` de `src/content/timeline.ts`.

## Fora de escopo (fica para fases seguintes)

- ARIA (`role="dialog"`, `aria-modal`, *focus trap*, devolver foco ao
  fechar) — Fase 3 (Acessibilidade), construído em cima do `Modal` criado
  aqui.
- Qualquer mudança visual do menu (`Navbar` continua com labels de texto,
  não ícones).

## Comportamento esperado

Nenhuma mudança visual pretendida. Única diferença de comportamento:
fechar com `Esc` passa a funcionar nos 3 modais (estritamente uma
melhoria, não uma regressão).

## Validação

- `npm run build` sem erros de tipo.
- Verificação manual no navegador: abrir/fechar os 3 modais (clique,
  clique no backdrop, tecla `Esc`), navegar pelo menu, conferir que os
  links de contato (GitHub/LinkedIn/WhatsApp/e-mail) em Navbar, Footer e
  Contacts apontam para os mesmos valores de antes.
