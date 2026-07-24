import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site-url";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/kiitos"] }], sitemap: new URL("/sitemap.xml", siteUrl).toString(), host: siteUrl.origin }; }
