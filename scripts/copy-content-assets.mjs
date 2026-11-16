// Copia imagens e outros arquivos (não-markdown) de /contents para /public/contents,
// permitindo referenciar arquivos relativos dentro dos posts: ![foto](./foto.png)
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "contents");
const DEST = path.join(process.cwd(), "public", "contents");

fs.rmSync(DEST, { recursive: true, force: true });

let count = 0;
function copy(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const from = path.join(dir, entry.name);
    if (entry.isDirectory()) copy(from);
    else if (!entry.name.endsWith(".md")) {
      const to = path.join(DEST, path.relative(SRC, from));
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
      count++;
    }
  }
}
copy(SRC);
console.log(`[content] ${count} arquivo(s) copiado(s) para public/contents`);
