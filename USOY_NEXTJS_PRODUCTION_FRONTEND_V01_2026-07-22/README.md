# Ullanlinnan Sähkö Oy – tuotantofrontend

Next.js App Router-, React- ja TypeScript-toteutus hyväksytyn high-fidelity-designin, Figma-handoffin ja projektin sisältöstandardien pohjalta.

## Toteutettu

- responsiivinen etusivu ja hyväksytyt MVP-reitit
- yksi uudelleenkäytettävä palvelusivupohja neljälle palvelualueelle
- myymälä-, Meistä- ja yhteystietosivut
- 4 / 6 / 8 / 12 sarakkeen responsiivinen järjestelmä
- 1280 px pääcontainer, 720 px teksticontainer, 640 px lomakecontainer ja 1440 px mediacontainer
- keskitetyt väri-, spacing-, typografia-, container- ja interaktiotokenit
- saavutettava desktop-dropdown ja mobiilin modal drawer
- semanttinen HTML, näkyvä fokus, skip-link, reduced motion ja 44 px toimintopinnat
- React Hook Form + Zod -lomake samalla selain- ja palvelinvalidoinnilla
- metatiedot, canonicalit, Open Graph, robots, sitemap, JSON-LD, 404 ja redirectit
- dokumentoidut Figma-tulkinnat ja julkaisuportit

## Rakenne

```text
src/
├── app/                 # App Router -reitit ja tekniset tiedostot
├── components/
│   ├── forms/
│   ├── layout/
│   ├── pages/
│   ├── sections/home/   # Etusivun erilliset osiot
│   └── ui/
├── content/             # Vahvistettu typed content
├── lib/                 # Lomake- ja SEO-logiikka
└── styles/              # Tokenit ja jaetut tyylikerrokset
```

## Käynnistys

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Tarkistukset

```bash
npm run validate:content
npm run validate:frontend
npm run typecheck
npm run lint
npm run build
```

`npm run build` tarkistaa myös hyväksytyt V04-logoassetit. `build:ci` sallii puuttuvat logoassetit vain lähdekoodin teknistä CI-tarkistusta varten; se ei hyväksy julkaisua.

## Tuotantoportit

1. Kopioi täsmälleen hyväksytyt V04-assetit `public/brand/README.md`-ohjeen mukaan.
2. Lisää aidot tuotantokuvat ja hyväksytyt alt-tekstit.
3. Aseta lopullinen HTTPS-domain `NEXT_PUBLIC_SITE_URL`-muuttujaan.
4. Määritä `CONTACT_FORM_WEBHOOK_URL` ja testaa vastaanottava järjestelmä.
5. Viimeistele lakisivut todellisen toteutuksen perusteella.
6. Tee live-Figma-vertailu, kun Figma MCP -kutsuraja on käytettävissä.
7. Aja `npm run check` ja `npm run build` verkkoyhteydellisessä CI-ympäristössä.

## Dokumentaatio

- `docs/FIGMA_UNDEFINED_BEHAVIOR.md`
- `docs/DESIGN_TO_CODE_MAPPING.md`
- `docs/QA_CHECKLIST.md`
- `docs/BUILD_QA_REPORT.md`
- `tests/accessibility/MANUAL_TEST_PLAN.md`
