import type { Metadata } from "next";
import { company } from "@/content/company";
import type { SeoPage } from "@/content/seo";
import { siteUrl } from "@/lib/seo/site-url";
export function buildMetadata(page: SeoPage): Metadata {
  const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name} – sähkö- ja valaisinpalvelut Helsingissä` };
  return {
    metadataBase: siteUrl,
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { type: "website", locale: "fi_FI", url: page.path, siteName: company.name, title: page.title, description: page.description, images: [socialImage] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/twitter-image"] },
    robots: page.indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } }
  };
}
