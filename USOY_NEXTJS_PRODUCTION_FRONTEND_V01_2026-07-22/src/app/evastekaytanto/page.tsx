import type { Metadata } from "next";
import { LegalStatusPage } from "@/components/pages/LegalStatusPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.cookies);
export default function Page() { return <LegalStatusPage title="Evästekäytäntö" href={seoPages.cookies.path} description="Lopullinen sisältö määräytyy tuotannossa käytettävien analytiikka-, kartta- ja muiden kolmannen osapuolen palveluiden perusteella." />; }
