import type { Metadata } from "next";
import { LegalStatusPage } from "@/components/pages/LegalStatusPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.privacy);
export default function Page() { return <LegalStatusPage title="Tietosuojaseloste" href={seoPages.privacy.path} description="Lopullinen seloste laaditaan vasta, kun lomakkeen vastaanottaja, säilytysajat, alihankkijat ja muut todelliset käsittelytavat on vahvistettu." />; }
