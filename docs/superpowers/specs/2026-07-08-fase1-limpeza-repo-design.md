# Fase 1 — Limpeza do repositório legado

## Contexto

O portfólio foi migrado de um site estático (HTML/CSS/JS puro) para Next.js
16 / React 19. Os arquivos do site antigo continuam na raiz do repositório,
sem uso pelo app atual, aumentando o ruído e o tamanho do repositório.

Esta é a Fase 1 de um plano de melhoria maior do portfólio, decomposto em 6
frentes independentes:

1. **Limpeza de repo** (este documento)
2. Arquitetura & conteúdo (extração de dados + Modal reutilizável + ícones)
3. Acessibilidade (teclado, foco, ARIA)
4. GithubGraph (dado real vs. decorativo)
5. Performance & SEO (imagens, metadataBase, JSON-LD)
6. Credenciais (EmailJS em variáveis de ambiente)

## Escopo

Remover os seguintes arquivos/pastas, órfãos e não referenciados por `src/`
ou `public/` (confirmado via busca por `imagem/` e `estilos/` em `src/`):

- `index.html`
- `script.js`
- `style.css`
- `estilos/` (`keyframe.css`, `media_query.css`)
- `imagem/` (~25 arquivos de imagem/ícone do site antigo)
- `image.png`, `image-1.png` (soltos na raiz)

Fora de escopo: qualquer arquivo dentro de `src/`, `public/`, `documents/`
ou arquivos de configuração do Next.js/TypeScript/ESLint.

## Abordagem

Remover via `git rm` (não `rm` direto), para que a remoção fique registrada
como um commit e o conteúdo permaneça recuperável pelo histórico do git.

## Validação

Após a remoção, rodar `npm run build` para confirmar que o Next.js
continua buildando sem erros — nenhuma dependência desses arquivos era
esperada, mas serve como rede de segurança.

## Riscos

Nenhum. Arquivos confirmados como não referenciados pelo código atual.
