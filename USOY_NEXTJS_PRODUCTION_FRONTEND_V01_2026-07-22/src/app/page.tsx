import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.home);
export default function Page() { return <HomePage />; }
