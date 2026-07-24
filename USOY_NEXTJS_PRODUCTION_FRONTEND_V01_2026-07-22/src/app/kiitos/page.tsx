import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildMetadata(seoPages.thankYou);
export default function Page() { return <main id="main-content"><section className="service-hero service-hero--compact"><div className="container"><p className="eyebrow"><span aria-hidden="true" />Yhteydenotto</p><h1>Kiitos yhteydenotosta</h1><p className="hero-lead">Yhteydenotto on vastaanotettu.</p><ButtonLink href="/">Palaa etusivulle</ButtonLink></div></section></main>; }
