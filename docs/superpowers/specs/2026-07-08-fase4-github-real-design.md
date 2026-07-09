# Fase 4 — GithubGraph com dado real

## Contexto

Quarta fase do plano de melhoria do portfólio (ver Fases 1-3). Hoje
`GithubGraph.tsx` gera o heatmap de contribuições com `Math.random()` a
cada carregamento — não reflete atividade real, o que é um problema de
credibilidade num portfólio. `StatusBar.tsx` também mostra números fixos
no código (`Level 54`, `Exp 250+`, `Following 16`, `Followers 4`) que já
podem estar desatualizados.

## Escopo

### 1. `src/lib/github.ts` (novo, server-only)

Função `getGithubStats(login: string): Promise<GithubStats | null>` que:

- Faz uma única query GraphQL autenticada em `https://api.github.com/graphql`
  usando `process.env.GITHUB_TOKEN` (nunca exposto ao cliente — só é lido
  dentro deste módulo, chamado a partir de um Server Component).
- Busca: `contributionsCollection.contributionCalendar` (total anual +
  semanas/dias), `repositories(privacy: PUBLIC, isFork: false).totalCount`,
  `followers.totalCount`, `following.totalCount`.
- Calcula o nível (0-4) de cada dia por quartil relativo ao maior valor
  do próprio usuário no período (`ratio = count / max`; 0 se `count===0`,
  senão 1-4 conforme o quartil) — mesma lógica usada por implementações
  de heatmap de contribuição de código aberto.
- Cache via `fetch(..., { next: { revalidate: 3600 } })` — revalida a
  cada hora, mantendo a página estática (ISR).
- **Nunca lança exceção.** Se `GITHUB_TOKEN` não estiver definido, a
  resposta não for OK, ou o payload não tiver o formato esperado, retorna
  `null`. Isso garante que a falta do token ou uma falha da API do
  GitHub nunca quebra o build nem a página em produção.

### 2. `src/content/site.ts`

Adiciona `githubUsername: "VictorrMendes"` (o login usado na query —
distinto de `github`, que é a URL completa do perfil).

### 3. `src/app/page.tsx`

Vira Server Component assíncrono: chama `getGithubStats(SITE.githubUsername)`
e repassa o resultado como prop `githubStats` para `<HomePage>`.

### 4. `HomePage.tsx` → `StatusBar.tsx` → `GithubGraph.tsx`

O dado passa a fluir por props em vez de ser gerado/hardcoded em cada
componente:

- `HomePage` recebe `githubStats: GithubStats | null` e repassa para
  `StatusBar`.
- `StatusBar` renderiza `Level` = `publicRepos`, `Exp` = `totalContributions`,
  `Following`/`Followers` = os totais reais. Se `githubStats` for `null`,
  cada número mostra `—` em vez de quebrar o layout. (Oportunidade
  aproveitada: o link "GITHUB PROFILE →" nesse arquivo ainda usava a URL
  hardcoded do GitHub — passa a usar `SITE.github`, mesma correção já
  feita em outros componentes na Fase 2.)
- `GithubGraph` deixa de gerar dado aleatório (remove `useState`/`useEffect`/
  `requestAnimationFrame` e a diretiva `"use client"`, que não são mais
  necessários) e passa a receber `weeks: ContributionDay[][]` via prop,
  renderizando o mesmo heatmap visual de sempre. Se `weeks` vier vazio,
  mostra o mesmo esqueleto cinza que já existia como estado de
  carregamento.
- Correção oportunista: o rótulo "Contributions Log" no rodapé do gráfico
  tinha `cursor-pointer` e hover colorido mas nenhuma ação real (link morto
  visualmente enganoso) — vira um `<a href={SITE.github}>` de verdade.

### 5. Configuração local/produção

- `.env.example` (novo, commitado) documentando `GITHUB_TOKEN=`.
- Você precisa criar um Personal Access Token clássico no GitHub (escopo
  mínimo `read:user`) e definir `GITHUB_TOKEN` em `.env.local` (já
  ignorado pelo git) para testar localmente, e nas variáveis de ambiente
  do projeto na Vercel para produção.

## Fora de escopo

- Streak de contribuições consecutivas ou outras métricas além das já
  exibidas hoje (Level/Exp/Following/Followers/heatmap).
- Cache/armazenamento próprio além do `revalidate` nativo do Next.js
  fetch (sem banco de dados, sem KV).

## Limitação conhecida

Este ambiente de desenvolvimento não tem um `GITHUB_TOKEN` real disponível
para testar a chamada autenticada de ponta a ponta. A validação nesta
fase cobre: build limpo, e o caminho de fallback (`GITHUB_TOKEN` ausente
→ `null` → UI com `—`/esqueleto, sem quebrar nada). A chamada real só
pode ser confirmada por você, localmente com seu token, ou observando o
deploy em produção.

## Validação

- `npm run build` sem erros (com e sem `GITHUB_TOKEN` definido localmente).
- Verificação manual: sem `GITHUB_TOKEN`, o StatusBar mostra `—` nos
  números e o heatmap mostra o esqueleto cinza — sem erros no console,
  sem quebra de layout.
- Após você configurar seu `GITHUB_TOKEN` real: confirmar visualmente que
  o heatmap reflete sua atividade real do GitHub e os números batem com
  seu perfil público.
