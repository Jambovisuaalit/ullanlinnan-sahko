# Figma-määrittelyn avoimet käyttäytymistilanteet

**Tila:** toteutuspäätökset dokumentoitu, ei hiljaisia oletuksia  
**Päiväys:** 23.7.2026

## Lähderajaus

Figma-tiedoston live-rakennetta yritettiin lukea tiedostosta `0GdgcB1W72hhwPb9Nxcth1`, mutta Figma MCP:n Starter-planin kutsuraja esti metadata- ja node-tarkistuksen. Toteutus perustuu projektissa hyväksyttyihin high-fidelity-näkymiin, Figma production structure -handoffiin, grid-/spacing-standardiin, komponenttimäärittelyihin ja sisältödokumentaatioon.

Live-Figmaan liittyvät pixel-level-erot on siksi tarkistettava uudelleen, kun MCP-kutsuraja tai node-kohtainen export on käytettävissä.

## Päätökset

| Avoin kohta | Toteutuspäätös | Peruste / julkaisuportti |
|---|---|---|
| Hyväksytyt ikonit | Icon-komponentti viittaa hyväksytyistä SVG-vienneistä muodostettavaan spriteen. Tässä paketissa ei ole itse piirrettyjä korvaavia ikonipolkuja. | Live-Figman tarkat ikonipolut eivät olleet saatavilla; tuotantobuild estetään, kunnes hyväksytty sprite lisätään. |
| Virallinen logoassetti | Header ja footer viittaavat vain V04 Header Compact -SVG-vienteihin. Tuotantobuild pysähtyy, jos assetit puuttuvat. | Logoa ei piirretä, muunnetta eikä korvata tekstilogolla. Kehitystilassa näytetään selvä virheilmoitus, ei brändikorvike. |
| Otsikkofontin lisenssi | Toteutuksessa käytetään hyväksytyn high-fidelity-referenssin Libre Baskervillea ja leipätekstissä Interiä. | Canela-tyyppinen suunta on dokumentoitu, mutta lisensoitua Canela-tiedostoa ei ole toimitettu. Fontti vaihdetaan vain hyväksytyllä lisensoidulla assetilla. |
| Aidot kuvat | Kaikki kuvapaikat säilyttävät määritellyn kuvasuhteen ja näyttävät tuotantokuvavaatimuksen. | Kuvia tai asiakastapauksia ei keksitä. Julkaisu edellyttää aitoja kuvia ja hyväksyttyjä alt-tekstejä. |
| Desktop-navigaation avautuminen | Palvelut avautuvat painikkeella. Valikko sulkeutuu valinnasta, ulkopuolisesta osoituksesta ja Escape-näppäimestä. | Hover-only-ratkaisua ei käytetä saavutettavuussyistä. |
| Navigaation breakpoint | Täysi desktop-navigaatio aktivoituu vasta 1088 px:stä, kun kaikki linkit ja CTA mahtuvat ilman puristumista. | Handoff ohjaa sisältöperusteiseen breakpoinnin valintaan, ei yhden laitteen leveyden kovakoodaukseen. |
| Mobiilivalikko | Drawer on modaali dialogi: focus trap, Escape, overlay-sulkeminen, fokuksen palautus ja taustavierityksen lukitus. | Figma määrittelee drawerin, mutta selaimen saavutettava käyttäytyminen on tekninen toteutuspäätös. |
| Aktiivinen navigaatiotila | `aria-current="page"`, fonttipaino ja kultainen alaviiva/vasen viiva. | Aktiivisuutta ei ilmaista vain värillä. |
| Hero-infokortti | Desktopissa kortti on kuvan päällä oleva hallittu overlay; pienemmissä näkymissä se pinoutuu kuvan alle. | Absoluuttista sijoittelua käytetään vain designin päällekkäisessä elementissä, ei tavallisessa sivulayoutissa. |
| Section-layout | Tavallinen layout käyttää CSS Grid- ja Flexbox-rakenteita sekä keskitettyjä tokeneita. | Ei frame-kohtaisia absoluuttisia koordinaatteja. |
| Sticky CTA palvelusivulla | Näytetään desktopissa, kun sivupalkille jää riittävä tila. Tabletissa ja mobiilissa poistuu; mobiilissa käytössä on globaali toimintopalkki. | Estää päällekkäiset sticky-elementit ja sisällön peittymisen 200 % zoomissa. |
| Anchor-navigaatio | Vaakasuunnassa vieritettävä pienissä näkymissä. Kohteissa käytetään scroll-marginia. | Figma ei määritä pitkien otsikoiden overflow-käyttäytymistä. |
| Lomakkeen lähetyspalvelu | Frontend käyttää yhtä `/api/contact`-routea ja `CONTACT_FORM_WEBHOOK_URL`-ympäristömuuttujaa. Ilman kuljetusta API palauttaa 503. | Sähköposti-/CRM-toimittajaa ei ole vahvistettu, joten integraatiota ei keksitä. |
| Lomakkeen onnistumistila | Näytetään inline `role="status"` -tila. Erillinen `/kiitos`-reitti on valmiina mahdolliselle myöhemmälle redirect-päätökselle. | Figma määrittää onnistumisen, mutta ei vaadi yhtä tiettyä navigaatiomallia. |
| Lomakkeen virhetilat | Kenttäkohtaiset virheet, yleinen virheyhteenveto, fokuksen siirto yhteenvetoon ja lähetyksen estävä loading-tila. | Saavutettava selainkäyttäytyminen dokumentoitiin handoffissa. |
| Tiedostot | Enintään 3 tiedostoa, 5 Mt/tiedosto; JPG, PNG, WebP tai PDF. | Rajat perustuvat hyväksyttyyn lomakemäärittelyyn. Muutos vaatii palvelin- ja tietosuojapäätöksen. |
| Kartta | Ei automaattisesti ladattavaa iframea. Käyttäjä avaa ulkoisen reittiohjeen. | Karttatoimittajaa ja suostumusmallia ei ole vahvistettu. |
| FAQ-sivu | Erillinen sivu palauttaa 404:n, ellei `NEXT_PUBLIC_ENABLE_FAQ_PAGE=true`. FAQ-schema syntyy vain näkyvästä FAQ-datasta. | MVP-ohje edellyttää riittävää määrää vahvistettuja vastauksia ennen erillistä sivua. |
| Lakisivut | Oletuksena noindex ja näkyvä julkaisuportti. Indeksointi sallitaan vasta `NEXT_PUBLIC_LEGAL_CONTENT_APPROVED=true`. | Sisältö riippuu todellisista integraatioista, säilytysajoista ja auditoinnista. |
| Motion | Vain lyhyet tila- ja hover-siirtymät. `prefers-reduced-motion` poistaa olennaisen liikkeen. | Prototyyppiohje rajaa koristeellisen motionin pois. |
| Loading, error ja 404 | Semanttiset App Router -tilat, selkeä pääotsikko ja palautumistoiminto. | Kaikkia edge case -frameja ei ollut lähdeaineistossa. |
| Pitkä sisältö ja lokalisaatio | Tekstikontaineri 720 px, teksti saa rivittyä ja komponentit kasvavat sisällön mukana. | Kiinteitä frame-korkeuksia ei siirretä tuotantoon. |
| Selain- ja laitetuki | Responsiivisuus testataan vähintään 390, 768, 1024 ja 1440 px leveydellä sekä 200 % zoomilla. | Nämä ovat hyväksytyt referenssileveydet. |

## Absoluuttisen sijoittelun rajaus

Sallittu vain:

- modal drawer ja sen overlay
- desktop-dropdown
- Next Image -komponentin `fill`-kuva kuvakehyksen sisällä
- hero-infokortin määritelty päällekkäinen desktop-versio
- skip-link ja roskapostihoneypot

Muu sivurakenne käyttää normaalia dokumenttivirtaa, Gridiä tai Flexboxia.
