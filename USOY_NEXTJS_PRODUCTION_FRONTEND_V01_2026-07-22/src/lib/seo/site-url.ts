const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = new URL(raw && /^https?:\/\//.test(raw) ? raw : "http://localhost:3000");
export function absoluteUrl(path: string) { return new URL(path, siteUrl).toString(); }
