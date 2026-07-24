import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.contact);
export default function Page() { return <ContactPage />; }
