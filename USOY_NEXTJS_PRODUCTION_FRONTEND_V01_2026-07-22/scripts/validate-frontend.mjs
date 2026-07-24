import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["node_modules", ".next"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) sourceFiles.push(full);
  }
}
await walk(path.join(root, "src"));

const errors = [];
const warnings = [];
const requiredRoutes = [
  "src/app/page.tsx",
  "src/app/sahkoasennukset-ja-vikakorjaukset/page.tsx",
  "src/app/valaistus-ja-valaisinasennukset/page.tsx",
  "src/app/valaisimien-korjaus/page.tsx",
  "src/app/taloyhtioille-ja-yrityksille/page.tsx",
  "src/app/myymala/page.tsx",
  "src/app/meista/page.tsx",
  "src/app/yhteystiedot/page.tsx",
  "src/app/not-found.tsx"
];
for (const relative of requiredRoutes) {
  try { await stat(path.join(root, relative)); } catch { errors.push(`Missing route: ${relative}`); }
}

for (const file of sourceFiles.filter((item) => /\.tsx?$/.test(item))) {
  const text = await readFile(file, "utf8");
  const rel = path.relative(root, file);
  if (/<img\b/.test(text)) errors.push(`${rel}: direct <img> found; use Next Image or an approved asset component.`);
  if (/style=\{\{[^}]*position\s*:/.test(text)) errors.push(`${rel}: inline positional layout style found.`);
  if (/\bany\b/.test(text) && !/company/.test(rel)) warnings.push(`${rel}: review possible explicit any usage.`);
  for (const match of text.matchAll(/from\s+["'](@\/[^"']+)["']/g)) {
    const importPath = match[1].replace("@/", "src/");
    const candidates = [importPath, `${importPath}.ts`, `${importPath}.tsx`, path.join(importPath, "index.ts"), path.join(importPath, "index.tsx")];
    let found = false;
    for (const candidate of candidates) { try { await stat(path.join(root, candidate)); found = true; break; } catch {} }
    if (!found) errors.push(`${rel}: unresolved import ${match[1]}`);
  }
}

const pageComposition = await readFile(path.join(root, "src/components/pages/HomePage.tsx"), "utf8");
if ((pageComposition.match(/<Home[A-Z]/g) ?? []).length < 8) errors.push("HomePage is not composed from reusable section components.");

const css = await readFile(path.join(root, "src/styles/tokens.css"), "utf8");
for (const token of ["--container-main-max: 80rem", "--container-text-max: 45rem", "--container-form-max: 40rem", "--container-media-max: 90rem", "--grid-columns: 4", "--grid-columns: 6", "--grid-columns: 8", "--grid-columns: 12"]) {
  if (!css.includes(token)) errors.push(`Missing design token: ${token}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Frontend validation passed for ${sourceFiles.length} source files.`);
if (warnings.length) console.warn(warnings.join("\n"));
