import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLdScript } from "@/components/ui/JsonLd";
import type { ServiceContent } from "@/content/services";
import type { SeoPage } from "@/content/seo";
import { faqSchema, serviceSchema } from "@/lib/seo/schema";
import { company, contactLinks } from "@/content/company";

const topics: Record<string, "electrical" | "lamp-repair" | "business" | "other"> = {
  "sahkoasennukset-ja-vikakorjaukset": "electrical",
  "valaisimien-korjaus": "lamp-repair",
  "taloyhtioille-ja-yrityksille": "business",
  "valaistus-ja-valaisinasennukset": "other"
};

export function ServicePage({ content, seo, serviceType }: { content: ServiceContent; seo: SeoPage; serviceType: string }) {
  return <main id="main-content">
    <Breadcrumbs items={[{ name: "Etusivu", href: "/" }, { name: content.title, href: `/${content.slug}` }]}/>
    <section className="service-hero"><div className="container service-hero__layout"><div className="service-hero__copy"><p className="eyebrow"><span aria-hidden="true" />{content.eyebrow}</p><h1>{content.title}</h1><p className="hero-lead">{content.introduction}</p><div className="button-row"><ButtonLink href="#yhteydenotto">{content.primaryCta}</ButtonLink><ButtonLink href={contactLinks.phone} variant="secondary" icon="phone">Soita {company.phoneDisplay}</ButtonLink></div></div><MediaFrame requirement={content.mediaRequirement} ratio={content.mediaRatio} priority /></div></section>
    <nav className="anchor-nav" aria-label="Sivun sisältö"><div className="container"><a href="#tilanteet">Tilanteet</a><a href="#sisalto">Sisältö</a><a href="#prosessi">Prosessi</a><a href="#lahtotiedot">Lähtötiedot</a><a href="#faq">FAQ</a><a href="#yhteydenotto">Yhteydenotto</a></div></nav>

    <section id="tilanteet" className="section"><div className="container content-sidebar-layout"><div><SectionHeader eyebrow="Tarve" title={content.situationsTitle}/><div className="situation-grid">{content.situations.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></div><aside className="sticky-contact-card"><strong>Tarvitsetko arviota?</strong><p>Lähetä kuvaus ja mahdolliset kuvat. Kerromme, mitä seuraavaksi tarvitaan.</p><ButtonLink href="#yhteydenotto" className="button--full">{content.primaryCta}</ButtonLink><a href={contactLinks.phone}>Soita {company.phoneDisplay}</a></aside></div></section>

    <section id="sisalto" className="section section--secondary"><div className="container split-layout"><div className="feature-copy"><SectionHeader eyebrow="Palvelun rajaus" title={content.includedTitle}/><ul className="check-list">{content.included.map((item) => <li key={item}><Icon name="check"/>{item}</li>)}</ul><div className="safety-notice"><strong>Turvallisuus ja rajaus</strong><p>{content.safetyNotice}</p></div></div><MediaFrame requirement={content.mediaRequirement} ratio="16/10"/></div></section>

    <section id="prosessi" className="section"><div className="container"><SectionHeader eyebrow="Toimintatapa" title="Näin asia etenee"/><ol className="process-grid process-grid--light">{content.process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

    <section id="lahtotiedot" className="section section--warm"><div className="container split-layout"><div><SectionHeader eyebrow="Lähtötiedot" title="Nämä tiedot auttavat arvioinnissa"/><ul className="information-list">{content.requiredInformation.map((item) => <li key={item}><Icon name="check"/>{item}</li>)}</ul></div><div className="media-detail-stack"><MediaFrame requirement={content.mediaRequirement} ratio="4/5"/><p className="caption">Kuvan tulee esittää todellista palvelua. Figma määrittää rajauksen, ei yksittäistä asiakastapausta.</p></div></div></section>

    <section id="faq" className="section"><div className="container faq-layout"><SectionHeader eyebrow="Usein kysyttyä" title={`${content.title}: kysymyksiä ja vastauksia`}/><Accordion items={content.faq}/></div><JsonLdScript data={faqSchema(content.faq)}/></section>

    <section id="yhteydenotto" className="contact-section"><div className="container contact-layout"><div className="contact-copy"><SectionHeader eyebrow="Yhteydenotto" title={content.primaryCta}/><p>Kerro tarve, kohde ja mahdolliset havainnot. Liitä kuvat, jos ne auttavat arvioinnissa.</p></div><div className="contact-card"><ContactForm defaultTopic={topics[content.slug]}/></div></div></section>

    <section className="section"><div className="container"><SectionHeader eyebrow="Aiheeseen liittyvät palvelut" title="Jatka sopivaan palveluun"/><div className="related-grid">{content.related.map((item) => <ButtonLink key={item.href} href={item.href} variant="secondary" icon="arrow">{item.label}</ButtonLink>)}</div></div></section>
    <JsonLdScript data={serviceSchema(seo, content.title, serviceType)}/>
  </main>;
}
