# Frontend QA -tarkistuslista

## 1. Brändi ja visuaalinen vastaavuus

- [ ] V04 Header Compact -SVG on kopioitu muuttamattomana `public/brand`-hakemistoon.
- [ ] Logo säilyttää kuvasuhteen, minimikoon ja 0,5x suoja-alueen.
- [ ] Värit ovat täsmälleen `#1A1A1A`, `#FBF9F5`, `#D4A359`, `#4A554A`.
- [ ] Kulta ei kanna normaalia tekstiä Warm Paper -taustalla.
- [ ] Otsikko- ja leipätekstihierarkia vastaa hyväksyttyä referenssiä.
- [ ] Aidot kuvat on rajattu määriteltyihin 4:3-, 16:10- ja 4:5-kuvasuhteisiin.
- [ ] Kuvien alt-tekstit kuvaavat todellisen sisällön, eivät sisällä hakusanojen luetteloa.

## 2. Layout ja responsiivisuus

- [ ] 390 px: yksi sarake, koko leveät CTA:t, mobile action bar.
- [ ] 768 px: 6 sarakkeen logiikka ja hallittu pinoutuminen.
- [ ] 1024 px: 8 sarakkeen logiikka; desktop-navigaatio ei aktivoidu liian aikaisin.
- [ ] 1440 px: 12 sarakkeen layout, pääcontainer enintään 1280 px.
- [ ] Pitkä tekstipalsta enintään 720 px.
- [ ] Lomake enintään 640 px.
- [ ] 200 % zoom ei aiheuta tavallisen sisällön vaakavieritystä.
- [ ] Sticky-elementit eivät peitä otsikoita tai ankkurikohteita.

## 3. Semantiikka ja saavutettavuus

- [ ] Yksi H1 jokaisella sivulla.
- [ ] Otsikkotasot etenevät loogisesti.
- [ ] Landmarkit: header, nav, main, footer.
- [ ] Skip-link toimii ja fokus näkyy.
- [ ] Desktop-dropdown toimii näppäimistöllä ja Escapella.
- [ ] Mobile drawer lukitsee fokuksen ja palauttaa fokuksen valikkopainikkeeseen.
- [ ] Aktiivinen sivu käyttää `aria-current="page"`-attribuuttia ja muuta kuin pelkkää väriä.
- [ ] Kaikki toimintopinnat ovat vähintään 44 × 44 px.
- [ ] Accordion toimii näppäimistöllä ja sisältö on DOMissa.
- [ ] `prefers-reduced-motion` huomioitu.

## 4. Lomake

- [ ] Sama Zod-skeema selaimessa ja palvelimella.
- [ ] Label jokaiselle kentälle; placeholder ei korvaa labelia.
- [ ] Kenttävirhe yhdistyy kenttään `aria-describedby`-attribuutilla.
- [ ] Virheyhteenveto saa fokuksen epäonnistuneessa lähetyksessä.
- [ ] Loading estää kaksoislähetyksen.
- [ ] Onnistumistila ilmoitetaan `role="status"`-alueella.
- [ ] Ehdollinen osoitekenttä toimii sähkö- ja B2B-aiheilla.
- [ ] Tiedostomäärä, koko ja MIME-tyyppi validoidaan molemmissa päissä.
- [ ] Honeypot ja vähimmäistäyttöaika toimivat.
- [ ] `CONTACT_FORM_WEBHOOK_URL` on määritetty ja vastaanottava palvelu testattu.

## 5. SEO ja sisältö

- [ ] Lopullinen HTTPS-domain on asetettu.
- [ ] Title, description, canonical ja Open Graph tarkistettu kaikilla indeksoitavilla sivuilla.
- [ ] robots.txt ja sitemap.xml vastaavat julkaistuja reittejä.
- [ ] LocalBusiness sisältää vain vahvistetut tiedot.
- [ ] FAQPage syntyy vain näkyvästä FAQ-sisällöstä.
- [ ] Lakisivujen noindex poistetaan vasta hyväksytyllä sisällöllä.
- [ ] Vanhoja osoitteita tai puhelinnumeroita ei esiinny.
- [ ] Hinta-, päivystys-, arvio- tai saatavuuslupauksia ei ole keksitty.

## 6. Julkaisukomennot

```bash
npm install
npm run check
npm run build
```

Tuotantojulkaisu hylätään, jos `npm run verify:assets` epäonnistuu.
