# Design-to-code mapping

## Foundations

| Figma / handoff | Koodi |
|---|---|
| Brand colors | `src/styles/tokens.css` → `--color-brand-*` |
| Semantic UI colors | `src/styles/tokens.css` → `--color-text-*`, `--color-bg-*`, `--color-border-*` |
| 4 px spacing system | `--space-1` … `--space-32` |
| 4 / 6 / 8 / 12 columns | responsiiviset `--grid-columns`-tokenit |
| Main container 1280 px | `--container-main-max: 80rem` |
| Reading container 720 px | `--container-text-max: 45rem` |
| Form container 640 px | `--container-form-max: 40rem` |
| Media container 1440 px | `--container-media-max: 90rem` |
| Mobile / tablet / desktop references | media queries 48, 64 ja 80 rem; navigaatio 68 rem |
| Heading typography | Libre Baskerville production reference |
| Body / UI typography | Inter Variable |
| Logo | `BrandLogo` käyttää vain hyväksyttyjä V04 assettipolkuja |

## Component mapping

| Design component | React-komponentti | Tilat / props |
|---|---|---|
| Button | `ButtonLink` | `primary`, `secondary`, `inverse`, `text`, disabled button formissa |
| Icon | `Icon` | 24 px outline, `currentColor`, decorative by default |
| Header | `Header` | notice bar + sticky main header |
| Navigation | `SiteNavigation` | active, dropdown open/closed, drawer open/closed |
| Logo | `BrandLogo` | black / paper variant; missing-asset release error |
| Service Card | `ServiceCard` | hover, focus, responsive columns |
| Section Heading | `SectionHeader` | left / center, optional eyebrow and lead |
| Media | `MediaFrame` | 4:3, 16:10, 4:5; warm, olive, dark; missing/approved asset |
| Accordion | `Accordion` | closed / open; native keyboard semantics |
| Breadcrumbs | `Breadcrumbs` | visible trail + BreadcrumbList JSON-LD |
| Contact form | `ContactForm` | default, focus, error, loading, success, conditional address, file errors |
| Mobile action bar | `MobileActionBar` | mobile only |
| Structured data | `JsonLdScript` | LocalBusiness, WebSite, Service, FAQPage, BreadcrumbList |

## Page composition

| Route | Page composition |
|---|---|
| `/` | `HomePage` koostaa 11 uudelleenkäytettävää section-komponenttia |
| palvelureitit | yksi `ServicePage` + typed `ServiceContent` |
| `/myymala` | `StorePage` + typed product categories |
| `/meista` | `AboutPage` |
| `/yhteystiedot` | `ContactPage` + sama `ContactForm` |
| lakisivut | yksi `LegalStatusPage` julkaisuportilla |
| 404 / error / loading | App Routerin omat tilakomponentit |

## Sisältörajapinta

Toistuva tai faktapohjainen sisältö sijaitsee `src/content`-hakemistossa. Komponentit eivät kovakoodaa yrityksen puhelinta, osoitetta, sähköpostia tai aukioloaikaa useaan paikkaan.

## Layout-sääntö

Page-komponentit koostavat osioita. Ne eivät kopioi Figma-framea yhdeksi koordinaattipohjaiseksi komponentiksi. Tavalliset osiot käyttävät normaalia dokumenttivirtaa, Grid-rakenteita ja tokeneita.
