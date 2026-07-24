import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeServicesSection } from "@/components/sections/home/HomeServicesSection";
import { HomeFeatureSection } from "@/components/sections/home/HomeFeatureSection";
import { HomeRepairSection } from "@/components/sections/home/HomeRepairSection";
import { HomeStoreSection } from "@/components/sections/home/HomeStoreSection";
import { HomeBusinessSection } from "@/components/sections/home/HomeBusinessSection";
import { HomeAboutSection } from "@/components/sections/home/HomeAboutSection";
import { HomeProcessSection } from "@/components/sections/home/HomeProcessSection";
import { HomeFaqSection } from "@/components/sections/home/HomeFaqSection";
import { HomeContactSection } from "@/components/sections/home/HomeContactSection";
import { HomeLocationSection } from "@/components/sections/home/HomeLocationSection";

export function HomePage() {
  return <main id="main-content">
    <HomeHero />
    <HomeServicesSection />
    <HomeFeatureSection eyebrow="Sähkötyöt" title="Sähkötyöt kotiin ja arjen vikatilanteisiin" text="Tarvitsetko sähköasennuksen tai apua sähkövian selvittämiseen? Kerro kohde, havaittu ongelma ja mahdolliset aiemmat muutokset." href="/sahkoasennukset-ja-vikakorjaukset" cta="Tutustu sähköpalveluihin" ratio="4/3" requirement="Aito sähköasennus- tai mittaustilanne." />
    <HomeFeatureSection mediaFirst warm eyebrow="Valaistus" title="Valaisin ja asennus toimivaksi kokonaisuudeksi" text="Valaisimen, kiinnityspaikan ja olemassa olevan liitännän tiedot auttavat arvioimaan turvallisen asennustavan." href="/valaistus-ja-valaisinasennukset" cta="Tutustu valaisinasennuksiin" ratio="16/10" requirement="Aito valaisimen asennustilanne tai valmis valaistus todellisessa kohteessa." />
    <HomeRepairSection />
    <HomeStoreSection />
    <HomeBusinessSection />
    <HomeAboutSection />
    <HomeProcessSection />
    <HomeFaqSection />
    <HomeContactSection />
    <HomeLocationSection />
  </main>;
}
