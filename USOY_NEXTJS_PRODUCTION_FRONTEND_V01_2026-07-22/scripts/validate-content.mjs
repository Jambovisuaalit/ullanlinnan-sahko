import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
const forbidden = ["Tehtaankatu", "662653", "Pietatinkatu", "markkinoiden paras", "päivystys 24/7"];
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(ts|tsx|md|mdx)$/.test(entry.name)) files.push(full);
  }
}
for (const dir of ["src/content", "src/components/pages"]) await walk(dir);
const findings = [];
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const token of forbidden) if (text.includes(token)) findings.push(`${file}: forbidden token ${token}`);
}
if (findings.length) { console.error(findings.join("\n")); process.exit(1); }
console.log(`Content validation passed for ${files.length} files.`);
