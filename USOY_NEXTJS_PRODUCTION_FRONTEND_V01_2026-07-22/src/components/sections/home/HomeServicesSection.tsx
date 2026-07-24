import Link from "next/link";
import { homeContent } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function HomeServicesSection() {
  return <section id="palvelut" className="section section--secondary"><div className="container"><SectionHeader {...homeContent.serviceIntro}/><div className="service-grid"><ServiceCard number="01" icon="bolt" title="Sähköasennukset ja vikakorjaukset" text="Sähkötyön tai vian tarve arvioidaan kohteen ja annettujen lähtötietojen perusteella." href="/sahkoasennukset-ja-vikakorjaukset"/><ServiceCard number="02" icon="bulb" title="Valaistus ja valaisinasennukset" text="Valaisinasennuksia ja valaistukseen liittyviä sähkötöitä sovitun tarpeen mukaan." href="/valaistus-ja-valaisinasennukset"/><ServiceCard number="03" icon="wrench" title="Valaisimien korjaus" text="Korjattavuus arvioidaan rakenteen, kunnon, turvallisuuden ja varaosien saatavuuden perusteella." href="/valaisimien-korjaus"/></div><div className="service-shortcuts"><Link href="/myymala"><Icon name="store"/><span><strong>Myymälä ja valikoima</strong><small>Valaisimet, varaosat, valonlähteet ja muut sähkötarvikkeet.</small></span><Icon name="arrow"/></Link><Link href="/taloyhtioille-ja-yrityksille"><Icon name="building"/><span><strong>Taloyhtiöille ja yrityksille</strong><small>Sovitut sähkö- ja valaistustyöt nimetyn yhteyshenkilön kanssa.</small></span><Icon name="arrow"/></Link></div></div></section>;
}
