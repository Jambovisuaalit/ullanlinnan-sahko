import type { Metadata } from "next";
import { LegalStatusPage } from "@/components/pages/LegalStatusPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.accessibility);
export default function Page() { return <LegalStatusPage title="Saavutettavuusseloste" href={seoPages.accessibility.path} description="Lopullinen seloste julkaistaan vasta tuotantototeutuksen saavutettavuusarvioinnin, testitulosten ja palautekanavan vahvistamisen jälkeen." />; }
