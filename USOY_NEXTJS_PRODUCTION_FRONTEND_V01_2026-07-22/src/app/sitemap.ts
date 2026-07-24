import type { MetadataRoute } from "next";
import { seoPageList } from "@/content/seo";
import { absoluteUrl } from "@/lib/seo/site-url";
export default function sitemap(): MetadataRoute.Sitemap { return seoPageList.filter((page) => page.includeInSitemap).map((page) => ({ url: absoluteUrl(page.path), changeFrequency: page.key === "home" ? "monthly" : "yearly", priority: page.key === "home" ? 1 : page.key === "contact" || page.key === "store" ? 0.8 : 0.7 })); }
