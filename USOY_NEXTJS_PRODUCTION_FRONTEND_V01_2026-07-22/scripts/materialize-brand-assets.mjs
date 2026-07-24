import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourceDirectory = join(scriptDirectory, "brand-assets");
const outputPath = join(
  scriptDirectory,
  "..",
  "public",
  "brand",
  "USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_512X512.png",
);
const expectedSha256 = "de45f05ad7f5c1e1dab1628de33ad36d3d895bc4ace8684f7806e885014dfa37";

const encoded = ["favicon-512.part0.b64", "favicon-512.part1.b64"]
  .map((name) => readFileSync(join(sourceDirectory, name), "utf8").trim())
  .join("");
const asset = Buffer.from(encoded, "base64");
const sha256 = createHash("sha256").update(asset).digest("hex");

if (sha256 !== expectedSha256) {
  throw new Error(
    `Approved 512 px favicon bytes failed SHA-256 verification: ${sha256}`,
  );
}

if (existsSync(outputPath)) {
  const current = readFileSync(outputPath);
  const currentSha256 = createHash("sha256").update(current).digest("hex");
  if (currentSha256 === expectedSha256) {
    console.log("Approved 512 px favicon already materialized.");
    process.exit(0);
  }
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, asset);
console.log("Approved 512 px favicon materialized and SHA-256 verified.");
