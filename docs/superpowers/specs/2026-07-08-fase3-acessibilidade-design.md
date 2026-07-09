# Fase 3 — Acessibilidade

## Contexto

Terceira fase do plano de melhoria do portfólio (ver Fase 1 e Fase 2).
Uma auditoria com a skill `web-design-guidelines` (diretrizes de interface
web da Vercel) nos componentes principais encontrou as seguintes
violações:

```
src/components/home/sections/Navbar.tsx:28-32 - <li onClick> → precisa ser <button>, sem suporte a teclado
src/components/home/sections/Navbar.tsx:54-58 - mesmo problema no menu mobile
src/components/home/sections/Navbar.tsx:42-47 - toggle do menu: falta aria-expanded/aria-controls
src/components/home/sections/Navbar.tsx:44 - focus:outline-none sem substituto focus-visible
src/components/ui/Modal.tsx:42-49 - painel sem role="dialog" / aria-modal="true"
src/components/ui/Modal.tsx:13-28 - sem focus trap, sem foco inicial, sem devolver foco ao fechar
src/components/ui/Modal.tsx:33 - falta overscroll-behavior: contain
src/components/ui/Modal.tsx:34-49 - animação não respeita prefers-reduced-motion
src/components/ui/TileGrid.tsx:21-30 - <motion.div onClick> → precisa ser <button>
src/components/home/sections/Projects.tsx:21-26 - card inteiro é <motion.div onClick> → precisa ser <button>
src/components/home/HomePage.tsx:16 - imagem decorativa com alt="Background" → deveria ser alt=""+aria-hidden
src/components/home/HomePage.tsx - falta skip link para o conteúdo principal
src/app/layout.tsx:57 - <html> sem color-scheme: dark
src/app/layout.tsx - falta <meta name="theme-color">
src/app/globals.css - sem :focus-visible global, sem tratamento de prefers-reduced-motion
```

## Escopo

### 1. `src/components/ui/Modal.tsx`

- Nova dependência: `focus-trap-react` (v12, suporta React 19 nativamente).
- Painel ganha `role="dialog"` e `aria-modal="true"`.
- Ao abrir: foco move automaticamente para dentro do painel (primeiro
  elemento focável, via `focus-trap-react`); `Tab`/`Shift+Tab` ficam
  presos dentro do modal enquanto aberto.
- Ao fechar: foco retorna ao elemento que abriu o modal (`returnFocusOnDeactivate`,
  comportamento padrão da lib).
- Backdrop e painel ganham `overscroll-behavior: contain`.

### 2. `src/components/ui/TileGrid.tsx` e `src/components/home/sections/Projects.tsx`

- O tile/card clicável deixa de ser `motion.div onClick` e passa a ser
  `motion.button` (via `motion.create("button")` do Framer Motion, que
  preserva as props de animação atuais) com `type="button"`.
- Adiciona `focus-visible:ring-2 focus-visible:ring-purple-400
  focus-visible:ring-offset-2 focus-visible:ring-offset-[#09030f]` —
  anel neon consistente com a identidade visual do site.

### 3. `src/components/home/sections/Navbar.tsx`

- Cada `<li onClick>` passa a envolver um `<button type="button" onClick={...}>`
  com o mesmo texto, preservando o layout (`<li>` continua existindo para
  a lista semântica `<ul>`, o `<button>` fica por dentro).
- Botão de toggle do menu mobile ganha `aria-expanded={isOpen}` e
  `aria-controls="menu-mobile"` (o `<div>` do menu mobile ganha
  `id="menu-mobile"`).
- Remove `focus:outline-none` sem substituto; todos os itens de menu e
  links ganham o mesmo anel de foco neon do item 2.

### 4. `src/components/home/HomePage.tsx`

- A imagem de fundo (`/bg-pixel.png`) é puramente decorativa: `alt=""` e
  o `<div>` que a envolve ganha `aria-hidden="true"`.

### 5. `src/app/layout.tsx`

- `<html lang="pt-BR" style={{ colorScheme: "dark" }}>`.
- `<meta name="theme-color" content="#09030f" />` adicionado ao `metadata`
  export (`metadata.other` ou campo dedicado do Next `Viewport`).
- `<MotionConfig reducedMotion="user">` envolvendo `{children}` — reduz
  automaticamente as animações do Framer Motion quando o usuário tem
  `prefers-reduced-motion` ativado no SO, sem precisar editar cada uso de
  `motion.*` individualmente.
- Skip link `<a href="#conteudo-principal">Pular para o conteúdo</a>`
  como primeiro elemento focável do `<body>`: classe `sr-only` que vira
  visível (com o mesmo estilo `neon-border pixel-corners` do resto do
  site) em `:focus`. `HomePage.tsx` ganha `id="conteudo-principal"` na
  tag `<main>`.

### 6. `src/app/globals.css`

- Regra `:focus-visible` global de fallback (`outline: 2px solid #a855f7; outline-offset: 2px;`)
  para qualquer elemento interativo que não receba a utility Tailwind
  diretamente (ex.: links de texto simples no Footer/Contacts).

## Fora de escopo

- Contraste de cores (não identificado como violação na auditoria —
  paleta roxo/branco sobre fundo escuro já tem contraste alto).
- Formulário de contato (`Contacts.tsx`) — labels/inputs já usam
  `placeholder` como rótulo visual; ARIA labels explícitos e mensagens de
  erro inline ficam para uma revisão futura de formulário, não incluída
  nesta auditoria (o formulário já tem `required` nativo do HTML).

## Validação

- `npm run build` sem erros.
- Verificação manual: navegar o site inteiro só de teclado (Tab/Shift+Tab/Enter/Esc) —
  abrir/fechar os 3 modais com foco preso dentro e devolvido ao elemento
  de origem ao fechar; menu (desktop e mobile) operável via teclado com
  anel de foco visível; skip link aparece ao apertar Tab a partir do topo
  da página e pula para o conteúdo principal.
- Ativar "reduzir movimento" no SO (ou emular via DevTools →
  `prefers-reduced-motion: reduce`) e confirmar que as animações de
  entrada/hover diminuem ou desaparecem.
