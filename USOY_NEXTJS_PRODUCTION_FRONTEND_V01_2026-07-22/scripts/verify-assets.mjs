import { access } from "node:fs/promises";
import path from "node:path";

const required = [
  "public/brand/icons/USOY_ICON_SPRITE.svg",
  "public/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg",
  "public/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico",
  "public/brand/USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_192X192.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_512X512.png"
];
const missing = [];
for (const relative of required) {
  try { await access(path.resolve(relative)); } catch { missing.push(relative); }
}
if (!missing.length) {
  console.log("Brand asset verification passed.");
  process.exit(0);
}
const message = [
  "Approved brand and icon assets are missing:",
  ...missing.map((item) => `- ${item}`),
  "Do not recreate the logo or icons. Copy the exact approved exports."
].join("\n");
if (process.env.ALLOW_MISSING_BRAND_ASSETS === "true") {
  console.warn(`${message}\nCI override accepted; production release remains blocked.`);
  process.exit(0);
}
console.error(message);
process.exit(1);
