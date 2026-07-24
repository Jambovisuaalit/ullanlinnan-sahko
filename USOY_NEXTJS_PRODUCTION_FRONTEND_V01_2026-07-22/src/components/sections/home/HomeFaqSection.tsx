import { Accordion } from "@/components/ui/Accordion";
import { JsonLdScript } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sharedFaq } from "@/content/faq";
import { faqSchema } from "@/lib/seo/schema";
export function HomeFaqSection() { return <section className="section"><div className="container faq-layout"><SectionHeader eyebrow="Usein kysyttyä" title="Asiointi ennen työn tai myymäläkäynnin sopimista"/><Accordion items={sharedFaq}/></div><JsonLdScript data={faqSchema(sharedFaq)} /></section>; }
