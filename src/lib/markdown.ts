import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * - Reescreve caminhos relativos (./imagem.png) para /contents/<pasta-do-post>/imagem.png
 * - Abre links externos em nova aba
 * - Lazy loading em imagens
 */
function rehypeAssets(options: { baseDir?: string; absoluteBase?: string }) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      for (const attr of ["src", "href", "poster"]) {
        const value = node.properties?.[attr];
        if (typeof value !== "string") continue;
        let out = value;
        if (options.baseDir && !/^([a-z]+:|\/|#|\?)/i.test(value)) {
          out = `/contents/${options.baseDir}/${value.replace(/^\.\//, "")}`;
        }
        if (options.absoluteBase && out.startsWith("/") && !out.startsWith("//")) {
          out = options.absoluteBase + out;
        }
        node.properties[attr] = out;
      }
      if (node.tagName === "a" && typeof node.properties.href === "string" && /^https?:/.test(node.properties.href)) {
        if (!options.absoluteBase || !node.properties.href.startsWith(options.absoluteBase)) {
          node.properties.target = "_blank";
          node.properties.rel = ["noopener", "noreferrer"];
        }
      }
      if (node.tagName === "img") node.properties.loading = "lazy";
    });
  };
}

/**
 * @param baseDir pasta do post relativa a /contents (para resolver imagens relativas)
 * @param absoluteBase se informado, converte URLs "/..." em absolutas (usado no RSS)
 */
export async function renderMarkdown(markdown: string, baseDir?: string, absoluteBase?: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    // pretty-code antes do rehype-raw: o raw descarta o "meta" dos blocos (title, showLineNumbers...)
    .use(rehypePrettyCode, {
      theme: { dark: "github-dark-dimmed", light: "github-light" },
      keepBackground: false,
    })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeAssets, { baseDir, absoluteBase })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
