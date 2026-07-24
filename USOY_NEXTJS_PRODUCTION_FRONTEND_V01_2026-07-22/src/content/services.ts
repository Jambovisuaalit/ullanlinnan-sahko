import type { FaqItem } from "@/content/faq";

export type ServiceContent = {
  slug: string;
  title: string;
  eyebrow: string;
  introduction: string;
  situationsTitle: string;
  situations: readonly string[];
  includedTitle: string;
  included: readonly string[];
  process: readonly { title: string; text: string }[];
  requiredInformation: readonly string[];
  safetyNotice: string;
  primaryCta: string;
  mediaRequirement: string;
  mediaRatio: "4/3" | "16/10";
  faq: readonly FaqItem[];
  related: readonly { label: string; href: string }[];
};

export const services = {
  electrical: {
    slug: "sahkoasennukset-ja-vikakorjaukset",
    title: "Sähköasennukset ja vikakorjaukset",
    eyebrow: "Sähkötyöt",
    introduction: "Kerro asennustarpeesta tai havaitsemastasi sähköviasta. Arvioimme lähtötietojen perusteella, kuuluuko työ palveluihimme ja mitä tietoja asian eteneminen edellyttää.",
    situationsTitle: "Milloin ottaa yhteyttä?",
    situations: [
      "Tarvitset sovitun sähköasennuksen kotiin, kiinteistöön tai toimitilaan.",
      "Sähkökaluste, valaisin tai osa tilan sähköistä ei toimi odotetusti.",
      "Aiemman asennuksen toiminta tai turvallisuus vaatii ammattilaisen arviota."
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "lähtötietojen ja asiakkaan havaintojen läpikäynnin",
      "kohteen tai vian tutkimisen sovitussa laajuudessa",
      "toteutus- tai korjausvaihtoehdon arvioinnin",
      "sovitun sähkötyön ja toiminnan tarkistamisen"
    ],
    process: [
      { title: "Kuvaile tarve", text: "Kerro kohde, havainto ja työn tarkoitus. Liitä kuvat, jos ne auttavat tilanteen hahmottamista." },
      { title: "Arvioimme lähtötiedot", text: "Selvitämme, kuuluuko työ palveluihimme ja tarvitaanko lisätietoja tai kohdekäynti." },
      { title: "Sovitaan rajaus", text: "Työn sisältö, toteutustapa, aikataulu ja hinnoitteluperuste sovitaan tapauskohtaisesti." },
      { title: "Työ ja tarkistus", text: "Sovittu työ toteutetaan ja olennaiset jatko-ohjeet käydään läpi." }
    ],
    requiredInformation: ["kohteen osoite", "tilan tai rakennuksen tyyppi", "kuvaus asennuksesta tai viasta", "mahdolliset kuvat ja näkyvät merkinnät"],
    safetyNotice: "Jos tilanteeseen liittyy savua, palaneen hajua, kipinöintiä tai muuta välitöntä vaaraa, katkaise virta vain turvallisesti tehtävissä olevalla tavalla ja noudata viranomaisten hätäohjeita.",
    primaryCta: "Kerro sähkötyön tarpeesta",
    mediaRequirement: "Aito sähköasennus- tai vianetsintätilanne. Työtavan ja suojainten tulee vastata todellista tilannetta.",
    mediaRatio: "4/3",
    faq: [
      { id: "electrical-scope", question: "Millaisia sähköasennuksia teette?", answer: "Tarjottavat työt arvioidaan tapauskohtaisesti. Lähetä kuvaus ja mahdolliset kuvat, jotta työn soveltuvuus voidaan selvittää." },
      { id: "same-visit", question: "Korjataanko sähkövika aina samalla käynnillä?", answer: "Ei välttämättä. Vian selvitys ja varsinainen korjaus voivat olla eri työvaiheita." }
    ],
    related: [
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" },
      { label: "Taloyhtiöille ja yrityksille", href: "/taloyhtioille-ja-yrityksille" }
    ]
  },
  lighting: {
    slug: "valaistus-ja-valaisinasennukset",
    title: "Valaistus ja valaisinasennukset",
    eyebrow: "Valaistus",
    introduction: "Autamme valaisimien asennuksissa ja valaistukseen liittyvissä sähkötöissä sovitun tarpeen perusteella.",
    situationsTitle: "Tyypillinen tarve",
    situations: [
      "Valaisin täytyy asentaa tai vaihtaa.",
      "Valaistuksen toiminta vaatii sähköalan arviota.",
      "Valaisimen, liitännän ja kohteen yhteensopivuus on epäselvä."
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "valaisimen ja asennuskohteen lähtötietojen tarkistamisen",
      "asennustavan arvioinnin",
      "sovitun valaisinasennuksen",
      "valaistukseen liittyvän sähkötyön sovitussa laajuudessa"
    ],
    process: [
      { title: "Lähetä lähtötiedot", text: "Kerro tila, valaisin, kiinnityspaikka ja mahdolliset nykyiset liitännät." },
      { title: "Yhteensopivuus arvioidaan", text: "Arvioimme, mitä asennus edellyttää ja tarvitaanko kohdekäynti." },
      { title: "Toteutus sovitaan", text: "Työn rajaus, tarvittavat materiaalit ja aikataulu sovitaan ennen toteutusta." },
      { title: "Asennus tarkistetaan", text: "Sovitun työn toiminta tarkistetaan asianmukaisella tavalla." }
    ],
    requiredInformation: ["valaisimen kuva ja mahdolliset merkinnät", "kuva asennuspaikasta", "tila ja käyttötarkoitus", "tieto olemassa olevasta liitännästä"],
    safetyNotice: "Valaisimen ja asennuskohteen yhteensopivuus sekä turvallinen asennustapa arvioidaan aina ennen toteutusta.",
    primaryCta: "Kysy valaisimen asennuksesta",
    mediaRequirement: "Aito valaisimen asennustilanne tai valmis valaistus ilman kuvapankkimaista lavastusta.",
    mediaRatio: "16/10",
    faq: [
      { id: "own-luminaire", question: "Voiko asiakkaan hankkiman valaisimen asentaa?", answer: "Soveltuvuus arvioidaan valaisimen, kohteen ja asennustavan perusteella." },
      { id: "lighting-design", question: "Sisältyykö palveluun erillinen valaistussuunnittelu?", answer: "Erillistä valaistussuunnittelua ei ole vahvistettu palveluksi. Yhteydenotossa arvioidaan, millaista apua tarpeeseen voidaan tarjota." }
    ],
    related: [
      { label: "Valaisimien korjaus", href: "/valaisimien-korjaus" },
      { label: "Myymälä", href: "/myymala" }
    ]
  },
  lampRepair: {
    slug: "valaisimien-korjaus",
    title: "Valaisimien korjaus",
    eyebrow: "Korjauspalvelu",
    introduction: "Valaisimen vika ei aina tarkoita, että valaisin täytyy vaihtaa. Korjattavuus arvioidaan rakenteen, kunnon, turvallisen toteutuksen ja varaosien saatavuuden perusteella.",
    situationsTitle: "Korjausarvio kannattaa pyytää, kun",
    situations: [
      "valaisin ei syty tai toimii ajoittain",
      "johto, kytkin, kanta tai muu osa vaikuttaa vaurioituneelta",
      "vanhan tai tärkeän valaisimen käyttöikää halutaan jatkaa turvallisesti"
    ],
    includedTitle: "Arvioinnissa huomioidaan",
    included: [
      "valaisimen rakenne ja yleinen kunto",
      "havaittu vika ja sähköosien tila",
      "varaosien saatavuus ja yhteensopivuus",
      "korjauksen turvallinen ja tarkoituksenmukainen toteutus"
    ],
    process: [
      { title: "Lähetä kuvat", text: "Lähetä yleiskuva valaisimesta, kuva viasta ja näkyvistä merkinnöistä." },
      { title: "Alustava arvio", text: "Kerrottujen tietojen perusteella arvioidaan, kannattaako valaisin tuoda tarkasteltavaksi." },
      { title: "Valaisin tutkitaan", text: "Korjattavuus ja tarvittavat toimenpiteet selvitetään valaisimen todellisen kunnon perusteella." },
      { title: "Jatkosta sovitaan", text: "Korjaus tehdään vain sovitun rajauksen ja turvallisen toteutustavan mukaisesti." }
    ],
    requiredInformation: ["yleiskuva valaisimesta", "kuva havaitusta viasta", "kuvat merkinnöistä ja liitännöistä", "lyhyt kuvaus siitä, miten vika ilmenee"],
    safetyNotice: "Älä käytä valaisinta, jos sen johto, liitäntä tai sähköosat ovat vaurioituneet tai niiden turvallisuus on epäselvä.",
    primaryCta: "Kysy valaisimen korjauksesta",
    mediaRequirement: "Aito valaisin korjauspisteellä; työkalut, kädet ja valaisimen osa voivat näkyä. Ei lavastettua ennen–jälkeen-väitettä.",
    mediaRatio: "4/3",
    faq: [
      { id: "all-repairable", question: "Voidaanko kaikki valaisimet korjata?", answer: "Ei. Korjattavuus arvioidaan aina tapauskohtaisesti." },
      { id: "bring-store", question: "Voiko valaisimen tuoda suoraan myymälään?", answer: "Vastaanottokäytäntö kannattaa varmistaa etukäteen puhelimitse tai yhteydenottolomakkeella." }
    ],
    related: [
      { label: "Myymälä ja varaosat", href: "/myymala" },
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" }
    ]
  },
  business: {
    slug: "taloyhtioille-ja-yrityksille",
    title: "Sähkötyöt taloyhtiöille ja yrityksille",
    eyebrow: "B2B-palvelut",
    introduction: "Palvelemme taloyhtiöitä, kiinteistöjen vastuuhenkilöitä ja yrityksiä sovituissa sähkö- ja valaistustöissä.",
    situationsTitle: "Palvelu sopii, kun",
    situations: [
      "taloyhtiössä tai toimitilassa tarvitaan rajattu sähkötyö",
      "sähkövika tai valaistuksen toimintahäiriö vaatii selvitystä",
      "työ edellyttää selkeää yhteyshenkilöä ja käytännön järjestelyjen sopimista"
    ],
    includedTitle: "Yhteistyössä sovitaan",
    included: [
      "työn tavoite ja rajaus",
      "kohteen lähtötiedot ja vastuuhenkilö",
      "aikataulu ja tilojen käyttöön liittyvät järjestelyt",
      "tarvittava yhteydenpito ja työn jälkeiset tiedot"
    ],
    process: [
      { title: "Tarve ja kohde", text: "Kerro kohde, yhteyshenkilö ja työn tai vian kuvaus." },
      { title: "Laajuus arvioidaan", text: "Selvitämme, kuuluuko työ palveluihimme ja mitä lisätietoja tarvitaan." },
      { title: "Järjestelyt sovitaan", text: "Rajaus, aikataulu, kulku ja mahdolliset käyttöjärjestelyt sovitaan nimetyn yhteyshenkilön kanssa." },
      { title: "Työ toteutetaan", text: "Sovittu työ tehdään kohteen todellisten olosuhteiden perusteella." }
    ],
    requiredInformation: ["kohteen osoite ja tilatyyppi", "yhteyshenkilö ja rooli", "kuvaus työstä tai viasta", "toivottu ajankohta ja käyttöjärjestelyt"],
    safetyNotice: "Työn tarkka sisältö, dokumentointi ja mahdolliset käyttökatkot vahvistetaan tapauskohtaisesti ennen toteutusta.",
    primaryCta: "Kerro kohteen tarpeesta",
    mediaRequirement: "Aito taloyhtiön yhteinen tila tai yrityksen toimitila, jossa sähkö- tai valaistustyö on selvästi tunnistettavissa.",
    mediaRatio: "16/10",
    faq: [
      { id: "b2b-contact", question: "Mitä tietoja ensimmäiseen yhteydenottoon tarvitaan?", answer: "Kohteen osoite, tilan tyyppi, työn tai vian kuvaus, yhteyshenkilö ja mahdolliset kuvat auttavat asian arvioinnissa." },
      { id: "b2b-scope", question: "Soveltuuko palvelu laajoihin sähköurakoihin?", answer: "Palvelun laajuus arvioidaan tapauskohtaisesti. Laajaa urakkaa ei luvata ilman erillistä vahvistusta." }
    ],
    related: [
      { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" }
    ]
  }
} as const satisfies Record<string, ServiceContent>;

export const serviceList = Object.values(services);
