export type FaqItem = { id: string; question: string; answer: string };
export const sharedFaq = [
  { id: "work-from-images", question: "Voiko työn tarvetta arvioida kuvien perusteella?", answer: "Kuvat auttavat alustavassa arvioinnissa. Lopullinen työn sisältö voi kuitenkin selvitä vasta kohteessa tai valaisinta tarkasteltaessa." },
  { id: "store-availability", question: "Vastaako verkkosivun valikoima myymälän tämänhetkistä saatavuutta?", answer: "Ei välttämättä. Verkkosivulla esitellään tuoteryhmiä, mutta tietyn tuotteen, varaosan tai valaisimen saatavuus kannattaa varmistaa ennen käyntiä." },
  { id: "repair-all", question: "Voidaanko kaikki valaisimet korjata?", answer: "Ei. Korjattavuus arvioidaan valaisimen rakenteen, kunnon, turvallisen toteutuksen ja varaosien saatavuuden perusteella." },
  { id: "price", question: "Voiko työn hinnan vahvistaa ennen tarkempia lähtötietoja?", answer: "Työn sisältö ja hinnoitteluperuste sovitaan tapauskohtaisesti. Kuvauksen ja kuvien perusteella voidaan pyytää tarvittavat lisätiedot ennen jatkosta sopimista." }
] as const satisfies readonly FaqItem[];
