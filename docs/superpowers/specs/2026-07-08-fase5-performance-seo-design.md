# Fase 5 — Performance & SEO

## Contexto

Quinta fase do plano de melhoria do portfólio (ver Fases 1-4). Pontos
identificados na análise inicial e confirmados durante os testes das
fases anteriores (avisos do `next build`/console do navegador):

- `metadataBase` não definido — Next usa `http://localhost:3000` como
  base para resolver as URLs de Open Graph/Twitter em produção.
- Duas imagens (`bg-pixel.png` de fundo e `avatar.png` do Hero) com
  `priority` + `quality={100}` simultaneamente — competem pelo maior
  elemento pintado (LCP) e `100` não está no allowlist `images.qualities`
  do Next 16 (aviso no console).
- Todas as imagens com `fill` (avatar, 6 imagens de projetos, card +
  modal) sem prop `sizes` — Next avisa e serve a imagem em resolução
  cheia independente do tamanho real renderizado, desperdiçando banda.
- Sem dados estruturados (JSON-LD) apesar do foco recente em SEO
  (commits "Implementando análise SEO").
- URL do site (`https://www.vmstorm.com.br`) hardcoded em múltiplos
  lugares (`layout.tsx` openGraph, `sitemap.ts`, `robots.ts`) — mesma
  categoria de duplicação já resolvida para outros dados na Fase 2.

## Escopo

### 1. `src/content/site.ts`

Adiciona `url: "https://www.vmstorm.com.br"` e
`jobTitle: "Desenvolvedor Front-End"`.

### 2. `next.config.ts`

Adiciona `images: { qualities: [50, 75, 90] }` — cobre os três valores
de qualidade usados no projeto após esta fase (fundo decorativo em 50,
avatar em 90, imagens de projeto no padrão 75 implícito).

### 3. `src/app/layout.tsx`

- `metadata.metadataBase = new URL(SITE.url)`.
- `metadata.openGraph.url` passa a usar `SITE.url` em vez do literal
  hardcoded.
- Renderiza `<PersonJsonLd />` (novo componente, ver item 5).

### 4. Imagens

- `HomePage.tsx` — imagem de fundo (`bg-pixel.png`, decorativa,
  `opacity-15`): remove `priority`, `quality={100}` → `quality={50}`,
  adiciona `sizes="100vw"`.
- `Hero.tsx` — avatar: mantém `priority`, `quality={100}` → `quality={90}`,
  adiciona `sizes="(max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"`
  (bate com as classes `h-60 w-60 md:h-72 md:w-72 lg:h-80 lg:w-80`).
- `Projects.tsx` — imagem do card (grid 1/2/3 colunas):
  `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`.
  Imagem do modal de detalhe (painel `max-w-5xl` ≈ 1024px):
  `sizes="(max-width: 1024px) 100vw, 1024px"`.

### 5. `src/components/PersonJsonLd.tsx` (novo)

Server Component sem props que renderiza um `<script type="application/ld+json">`
com schema.org `Person`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Victor Mendes de Souza",
  "jobTitle": "Desenvolvedor Front-End",
  "url": "https://www.vmstorm.com.br",
  "sameAs": [
    "https://github.com/VictorrMendes",
    "https://www.linkedin.com/in/victor-mendes-de-souza-728270234/"
  ]
}
```

Valores vêm de `SITE` (`site.ts`), sem duplicar literais. **Sem e-mail**
no schema (decisão explícita para não expor o endereço a scrapers em
formato máquina-legível).

## Fora de escopo

- Sitemap/robots já corretos estruturalmente — só passam a referenciar
  `SITE.url` em vez do literal (ajuste mecânico, incluído por já tocar
  o mesmo dado, sem mudança de comportamento).
- Web Vitals monitoring / Lighthouse CI — não solicitado.
- Otimizações de fonte (`next/font` já em uso corretamente).

## Validação

- `npm run build` sem o aviso de `metadataBase` e sem avisos de
  qualidade de imagem fora do allowlist.
- Verificação manual: abrir o site, checar no DevTools → Network que as
  imagens de projeto carregam em resoluções proporcionais ao card (não
  a imagem original em full-size); inspecionar `<head>` e confirmar
  `<script type="application/ld+json">` presente com o Person schema;
  validar o JSON-LD colando no
  [Rich Results Test do Google](https://search.google.com/test/rich-results)
  ou similar, se o usuário quiser confirmar externamente (fora do escopo
  desta verificação automatizada).
