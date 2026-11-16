# devsouza.com.br

Blog pessoal + portfólio feito com **Next.js 16 (App Router)**, **Tailwind CSS 4** e posts em **Markdown multilíngue**.
Todas as páginas são geradas estaticamente (SSG).

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Escrevendo posts

```
contents/
└── 2026/11/16/001-ola-mundo/
    ├── index.md       → /blog/2026/11/16/001-ola-mundo        (português, padrão)
    ├── index.en.md    → /blog/2026/11/16/001-ola-mundo/en     (inglês)
    ├── index.es.md    → /blog/2026/11/16/001-ola-mundo/es     (espanhol)
    └── capa.png       → use como ./capa.png no markdown
```

Frontmatter (todos opcionais, exceto `title`):

```yaml
---
title: Título do post
description: Resumo exibido nos cards, SEO e RSS
date: 2026-11-16T10:00:00-03:00   # padrão: data da pasta
updated: 2026-11-20
tags: [nextjs, carreira]
cover: ./capa.png
draft: true                       # aparece só em `npm run dev`
---
```

- O número no início da pasta (`001-`) ordena posts do mesmo dia.
- Imagens/arquivos dentro da pasta do post são copiados para `public/contents` ao rodar `dev`/`build`
  (reinicie o `dev` ao adicionar imagens novas).
- Blocos de código com destaque: ` ```ts title="arquivo.ts" showLineNumbers {2-3} `.
- Novos idiomas: basta criar `index.<código>.md`; rótulos ficam em `src/lib/i18n.ts`.

## Editando o resto do site

| Conteúdo                         | Arquivo                    | Página             |
| -------------------------------- | -------------------------- | ------------------ |
| Apresentação, redes, skills      | `data/profile.yaml`        | `/` e `/sobre`     |
| Projetos do portfólio            | `data/projects.yaml`       | `/projetos`        |
| Livros (lendo/lido/quero-ler)    | `data/books.yaml`          | `/livros`          |
| Experiência profissional         | `data/experience.yaml`     | `/carreira`        |
| Formação acadêmica               | `data/education.yaml`      | `/carreira`        |
| Certificados                     | `data/certificates.yaml`   | `/carreira`        |
| URL, título, idioma padrão       | `src/site.config.ts`       | —                  |
| Cores do tema                    | `src/app/globals.css`      | —                  |

## Feeds e SEO

- `/rss.xml` — posts no idioma padrão (conteúdo completo)
- `/rss/en.xml`, `/rss/es.xml`… — um feed por idioma existente
- `/sitemap.xml`, `/robots.txt`, `hreflang` entre traduções e JSON-LD nos posts

## Deploy

Funciona direto na Vercel. Para hospedagem estática (GitHub Pages, Netlify, Cloudflare Pages),
descomente `output: "export"` em `next.config.ts` — o site será gerado em `out/`.
