import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/ServicePage";
import { services } from "@/content/services";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.electrical);
export default function Page() { return <ServicePage content={services.electrical} seo={seoPages.electrical} serviceType="Sähköasennukset ja sähkövikojen selvitys" />; }
