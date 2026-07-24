import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.about);
export default function Page() { return <AboutPage />; }
