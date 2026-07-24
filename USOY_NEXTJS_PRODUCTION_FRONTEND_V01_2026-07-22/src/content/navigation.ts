export type NavigationItem = { label: string; href: string; children?: readonly NavigationItem[] };
export const serviceNavigation = [
  { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
  { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" },
  { label: "Valaisimien korjaus", href: "/valaisimien-korjaus" },
  { label: "Taloyhtiöille ja yrityksille", href: "/taloyhtioille-ja-yrityksille" }
] as const satisfies readonly NavigationItem[];
export const siteNavigation = [
  { label: "Palvelut", href: "/#palvelut", children: serviceNavigation },
  { label: "Myymälä", href: "/myymala" },
  { label: "Meistä", href: "/meista" },
  { label: "Yhteystiedot", href: "/yhteystiedot" }
] as const satisfies readonly NavigationItem[];
