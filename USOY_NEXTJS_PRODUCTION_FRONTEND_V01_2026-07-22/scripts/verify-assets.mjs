import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const required = [
  "public/brand/icons/USOY_ICON_SPRITE.svg",
  "public/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg",
  "public/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico",
  "public/brand/USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_192X192.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_512X512.png",
];

const approvedSha256 = new Map([
  ["public/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg", "85f907e30351680690ed6a88dda39ea4e92811657812ca89c95555fd21754ed0"],
  ["public/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg", "a782f5ce8ac77c4f6a8974f23e9d830590e9fd2c2b60203d7e45b8fa0be3bf34"],
  ["public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg", "a5ca94e85acf31302a2c65b0ef56b80bb9126664f0a6b127a05991f1a7920990"],
  ["public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico", "8c9eb4ee4be8eaa45075c8aba6503871cca05c69d56d954ba75628e66f862423"],
  ["public/brand/USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png", "50d397ca617f34ac4c232f757c69ecf7a6277d5fcffddec10f6df253a0b822c4"],
  ["public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_192X192.png", "0e767b9875690feb02b3f5a4fa41ee3624a990e3db4d980879ed4a53d19f4221"],
  ["public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_512X512.png", "de45f05ad7f5c1e1dab1628de33ad36d3d895bc4ace8684f7806e885014dfa37"],
]);

const missing = [];
const integrityFailures = [];

for (const relative of required) {
  const absolute = path.resolve(relative);
  try {
    await access(absolute);
  } catch {
    missing.push(relative);
    continue;
  }

  const expected = approvedSha256.get(relative);
  if (!expected) continue;

  const content = await readFile(absolute);
  const actual = createHash("sha256").update(content).digest("hex");
  if (actual !== expected) {
    integrityFailures.push(`${relative} (expected ${expected}, received ${actual})`);
  }
}

if (!missing.length && !integrityFailures.length) {
  console.log("Brand asset verification passed, including V04 SHA-256 integrity checks.");
  process.exit(0);
}

const message = [
  missing.length ? "Approved brand and icon assets are missing:" : null,
  ...missing.map((item) => `- ${item}`),
  integrityFailures.length ? "Approved V04 assets failed SHA-256 verification:" : null,
  ...integrityFailures.map((item) => `- ${item}`),
  "Do not redraw or silently replace the approved V04 logo assets.",
]
  .filter(Boolean)
  .join("\n");

if (process.env.ALLOW_MISSING_BRAND_ASSETS === "true" && !integrityFailures.length) {
  console.warn(`${message}\nCI override accepted; production release remains blocked.`);
  process.exit(0);
}

console.error(message);
process.exit(1);
