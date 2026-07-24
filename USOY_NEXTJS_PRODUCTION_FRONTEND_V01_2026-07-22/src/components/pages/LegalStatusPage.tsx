import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
export function LegalStatusPage({ title, description, href }: { title: string; description: string; href: string }) {
  return <main id="main-content"><Breadcrumbs items={[{ name: "Etusivu", href: "/" }, { name: title, href }]}/><article className="section legal-page container"><p className="eyebrow"><span aria-hidden="true"/>Julkaisuportti</p><h1>{title}</h1><p className="hero-lead">{description}</p><div className="safety-notice"><strong>Sisältö vaatii vahvistuksen ennen tuotantojulkaisua.</strong><p>Sivu on oletuksena noindex-tilassa. Julkaise vasta, kun toteutuksen todelliset palvelut, käsittelytavat ja arviointitulokset on dokumentoitu.</p></div></article></main>;
}
