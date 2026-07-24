import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
export function HomeAboutSection() { return <section className="section"><div className="container split-layout split-layout--media-first"><div className="feature-copy"><SectionHeader eyebrow="Paikallinen yritys" title="Sähkötyöt, valaisinkorjaus ja myymälä saman toimijan kautta"/><p>Ullanlinnan Sähkö Oy yhdistää sähköalan palvelut, valaisimien korjaamisen ja paikallisen myymäläasioinnin.</p><ButtonLink href="/meista" variant="secondary" icon="arrow">Lue yrityksestä</ButtonLink></div><MediaFrame requirement="Nykyinen ja todenmukainen kuva yrityksestä tai työympäristöstä." ratio="4/3"/></div></section>; }
