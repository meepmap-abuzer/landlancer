import { cp, mkdir, writeFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "..", "landlancer-ready");
const files = [
  "index.html",
  "404.html",
  "agency.css",
  "agency.js",
  "experience.css",
  "experience.mjs",
  "vendor",
  "glass-lens.mjs",
  "glass-optics.mjs",
  "favicon.svg",
  "site.webmanifest",
  "sitemap.xml",
  "robots.txt",
  "CNAME",
  ".nojekyll",
  "assets/art",
  "cases/gift-roulette/index.html",
  "cases/tailcare/index.html",
  "cases/maverick/index.html",
  "cases/loyalty/index.html",
  "portfolio-assets/fonts/manrope-cyrillic-v20.woff2",
  "portfolio-assets/fonts/manrope-latin-v20.woff2",
];
const screenshots = await readdir(resolve(root, 'assets/screenshots'));
files.push(...screenshots.filter(name=>name.endsWith('.webp')&&!name.startsWith('loyalty-')).map(name=>`assets/screenshots/${name}`));
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
