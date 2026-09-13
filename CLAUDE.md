# AGS Stones and Cabinets — Identificação do Projeto

**Leia antes de qualquer ação.**

Este repositório é o **"AGS Stones and Cabinets"** (site agsstonefabricators.com).

Remote esperado: `https://github.com/diguinddtank-code/AGS-Stones-and-Cabinets.git`

Antes de fazer **QUALQUER** commit, push ou alteração: rode `git remote -v` e `pwd`
e confirme que o remote bate com o esperado acima. Se for outro repo
(ex: BISA, Hendrick, ou qualquer outro projeto do Rodrigo), **PARE e avise** —
não faça push em hipótese nenhuma até confirmação explícita.

> Nota (2026-09-13): esta pasta de trabalho ainda não é um repositório git
> (`git status` retorna "not a git repository"). Não há remote configurado
> ainda. Antes do primeiro `git init`/push, confirme com o usuário que o
> remote acima é o correto e que este é de fato o diretório certo.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Cores: primary `#0f172a` (navy), secondary `#ca8a04` (dourado)
- Fontes: sans = Inter, serif (títulos) = Playfair Display
- Ícones: `lucide-react`. Animações: `framer-motion`
- `next.config.js` já libera `i.imgur.com` (e outros hosts) em `remotePatterns`

## Padrões do projeto

- Páginas em `app/**/page.tsx` costumam ser Server Components magros: só
  `metadata` + JSON-LD (`Script`) + render do client component correspondente.
- A UI de fato mora em `components/*Client.tsx` (ex.: `FaqClient.tsx`,
  `AboutClient.tsx`), que importam `Header` e `Footer` diretamente e montam
  `<div className="min-h-screen flex flex-col font-sans"><Header/><main>...</main><Footer/></div>`.
- Links de navegação: array `navLinks` em `components/Header.tsx` e lista
  "Navigation" em `components/Footer.tsx`.
- `app/sitemap.ts` mantém `staticPages` com as rotas estáticas do site.
