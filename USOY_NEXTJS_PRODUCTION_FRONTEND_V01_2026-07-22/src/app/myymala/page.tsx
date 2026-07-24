import type { Metadata } from "next";
import { StorePage } from "@/components/pages/StorePage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.store);
export default function Page() { return <StorePage />; }
