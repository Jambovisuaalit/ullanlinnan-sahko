import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLdScript } from "@/components/ui/JsonLd";
import { sharedFaq } from "@/content/faq";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";
export const metadata: Metadata = buildMetadata(seoPages.faq);
export default function Page() {
  if (process.env.NEXT_PUBLIC_ENABLE_FAQ_PAGE !== "true") notFound();
  return <main id="main-content"><Breadcrumbs items={[{ name: "Etusivu", href: "/" }, { name: "Usein kysytyt kysymykset", href: seoPages.faq.path }]} /><section className="service-hero service-hero--compact"><div className="container"><p className="eyebrow"><span aria-hidden="true" />FAQ</p><h1>Usein kysytyt kysymykset</h1><p className="hero-lead">Vastauksia sivustolla näkyviin ja vahvistettuihin asiointikysymyksiin.</p></div></section><section className="section"><div className="container faq-layout"><div /><Accordion items={sharedFaq} /></div></section><JsonLdScript data={faqSchema(sharedFaq)} /></main>;
}
