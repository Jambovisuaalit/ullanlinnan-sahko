import { company } from "@/content/company";
import type { SeoPage } from "@/content/seo";
import { absoluteUrl } from "@/lib/seo/site-url";
export type JsonLd = string | number | boolean | null | JsonLd[] | { [key: string]: JsonLd };
export type BreadcrumbItem = { name: string; href: string };
export type SchemaFaqItem = { id: string; question: string; answer: string };
export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org", "@type": "LocalBusiness", "@id": absoluteUrl("/#localbusiness"),
    name: company.name, legalName: company.legalName, url: absoluteUrl("/"), telephone: company.phoneE164, email: company.email,
    address: { "@type": "PostalAddress", streetAddress: company.address.street, postalCode: company.address.postalCode, addressLocality: company.address.city, addressCountry: company.address.countryCode },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: company.openingHours.dayOfWeek, opens: company.openingHours.opens, closes: company.openingHours.closes }]
  };
}
export function websiteSchema(): JsonLd { return { "@context": "https://schema.org", "@type": "WebSite", "@id": absoluteUrl("/#website"), name: company.name, url: absoluteUrl("/"), inLanguage: "fi-FI", publisher: { "@id": absoluteUrl("/#localbusiness") } }; }
export function serviceSchema(page: SeoPage, name: string, serviceType: string): JsonLd { return { "@context": "https://schema.org", "@type": "Service", "@id": absoluteUrl(`${page.path}#service`), name, serviceType, description: page.description, url: absoluteUrl(page.path), provider: { "@id": absoluteUrl("/#localbusiness") }, mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(page.path) } }; }
export function breadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLd { return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.href) })) }; }
export function faqSchema(items: readonly SchemaFaqItem[]): JsonLd { return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }; }
