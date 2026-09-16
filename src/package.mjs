import { cp, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "..", "landlancer-ready");
const files = [
  "index.html",
  "404.html",
  "site.css",
  "responsive.css",
  "site.js",
  "favicon.svg",
  "site.webmanifest",
  "sitemap.xml",
  "robots.txt",
  "CNAME",
  ".nojekyll",
  "assets",
  "cases/gift-roulette/index.html",
  "cases/tailcare/index.html",
  "cases/maverick/index.html",
  "cases/loyalty/index.html",
  "portfolio-assets/fonts/manrope-cyrillic-v20.woff2",
  "portfolio-assets/fonts/manrope-latin-v20.woff2",
];
await mkdir(output, { recursive: true });
for (const file of files) {
  const destination = resolve(output, file);
  await mkdir(resolve(destination, ".."), { recursive: true });
  await cp(resolve(root, file), destination, { recursive: true });
}
await writeFile(
  resolve(output, "README.txt"),
  "Готовая статическая версия LandLancer. Разместите содержимое папки в корне домена. Сайт не требует серверного приложения.",
);
console.log(`Static release: ${output}`);
