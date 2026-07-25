function normalizeSiteUrl(value?: string) {
  const raw = value?.trim();
  if (!raw) return null;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol);
  } catch {
    return null;
  }
}

export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  new URL("http://localhost:3000");

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
