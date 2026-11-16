---
title: Olá, mundo! Bem-vindo ao meu blog
description: O primeiro post do blog — por que criei este espaço e o que você vai encontrar por aqui.
tags: [pessoal, nextjs]
cover: ./capa.svg
---

Depois de muito tempo adiando, finalmente tirei o blog do papel! 🎉

Aqui vou escrever sobre **desenvolvimento web**, **carreira** e os **livros** que estou lendo.

## Como este blog funciona

Cada post fica em uma pasta seguindo a estrutura `contents/ano/mes/dia/numero-slug`:

```txt title="estrutura"
contents/
└── 2026/
    └── 11/
        └── 16/
            └── 001-ola-mundo/
                ├── index.md      ← português (padrão)
                ├── index.en.md   ← inglês
                └── capa.svg      ← imagens relativas funcionam!
```

E o código ganha syntax highlighting:

```ts showLineNumbers {2}
export function saudacao(nome: string) {
  return `Olá, ${nome}!`;
}
```

> Escrever é a melhor forma de aprender. Bora? 🚀

| Recurso   | Suporte |
| --------- | ------- |
| Markdown  | ✅      |
| Idiomas   | ✅      |
| RSS       | ✅      |
