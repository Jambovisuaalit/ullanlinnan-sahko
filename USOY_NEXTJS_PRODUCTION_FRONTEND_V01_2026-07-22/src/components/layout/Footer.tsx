import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { company, contactLinks } from "@/content/company";
import { serviceNavigation } from "@/content/navigation";
export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><BrandLogo inverse /><p>Paikallinen sähkö- ja valaistusalan yritys Helsingissä.</p></div><nav aria-label="Palvelut"><h2>Palvelut</h2>{serviceNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><nav aria-label="Sivuston tiedot"><h2>Sivusto</h2><Link href="/myymala">Myymälä</Link><Link href="/meista">Meistä</Link><Link href="/yhteystiedot">Yhteystiedot</Link><Link href="/tietosuojaseloste">Tietosuojaseloste</Link><Link href="/evastekaytanto">Evästekäytäntö</Link><Link href="/saavutettavuusseloste">Saavutettavuusseloste</Link></nav><div><h2>Yhteystiedot</h2><address><a href={contactLinks.phone}>{company.phoneDisplay}</a><a href={contactLinks.email}>{company.email}</a><span>{company.address.street}<br />{company.address.postalCode} {company.address.city}</span><span>{company.openingHours.display}</span></address></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.name}</span><span>Y-tunnus {company.businessId}</span></div></footer>;
}
