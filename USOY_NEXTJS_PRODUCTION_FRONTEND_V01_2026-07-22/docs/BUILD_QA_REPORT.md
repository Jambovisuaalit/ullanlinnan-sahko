# Build- ja QA-raportti

**Paketti:** `USOY_NEXTJS_PRODUCTION_FRONTEND_V01_2026-07-22`  
**Tarkistuspäivä:** 23.7.2026

## Läpäisty

- 65 TypeScript-/TSX-tiedoston syntaksitranspilointi: **PASS**
- sisältövalidointi: **PASS**
- frontend-rakennevalidointi: **PASS**
- vaaditut App Router -reitit: **PASS**
- paikalliset `@/`-importit: **PASS**
- suorat `<img>`-elementit lähdekoodissa: **0**
- tavallinen page-layout: Grid/Flex, ei frame-koordinaatteja
- HomePage koostuu erillisistä section-komponenteista
- 4 / 6 / 8 / 12 grid-tokenit: **PASS**
- 1280 / 720 / 640 / 1440 container-tokenit: **PASS**
- kiellettyjen vanhojen yritystietojen sisältövalidointi: **PASS**

## Odotettu tuotantoportti

V04-logoassetit ja hyväksytty ikonispite puuttuvat tästä paketista tarkoituksellisesti. Niitä ei rakennettu uudelleen. `npm run build` pysähtyy, kunnes seuraavat hyväksytyt tiedostot on kopioitu:

- `public/brand/icons/USOY_ICON_SPRITE.svg`
- `USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg`
- `USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg`
- `USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico`
- `USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png`

Lisäksi manifesti odottaa hyväksyttyjä 192 × 192 ja 512 × 512 favicon-PNG-vientejä.

## Ei voitu vahvistaa suoritusympäristössä

`npm install --no-audit --no-fund` ei valmistunut. Sisäinen npm-välityspalvelu palautti `503`-virheen `@fontsource-variable/inter`-paketin haussa. Tämän vuoksi seuraavia ei voitu ajaa luotettavasti:

- `npm run typecheck`
- `npm run lint`
- `npm run build:ci`
- selaimessa renderöity responsive- ja interaktiotesti

Tämä on ympäristörajoite, ei hyväksytty build-tulos. Ensimmäisessä verkkoyhteydellisessä CI-ympäristössä on ajettava:

```bash
npm install
npm run check
ALLOW_MISSING_BRAND_ASSETS=true npm run build:ci
```

Kun hyväksytyt logoassetit on lisätty:

```bash
npm run build
```

## Julkaisua estävät puuttuvat tiedot ja aineistot

1. hyväksytyt V04-logo- ja favicon-assetit
2. aidot yritys- ja palvelukuvat sekä alt-tekstit
3. lopullinen julkinen HTTPS-domain
4. lomakkeen vastaanottava webhook / CRM / sähköpostipalvelu
5. tietosuoja-, eväste- ja saavutettavuusselosteiden todelliseen toteutukseen perustuva sisältö
6. mahdollinen analytiikka- ja suostumuksenhallintapäätös
7. live-Figma-vertailu, kun MCP-kutsuraja on käytettävissä

**Johtopäätös:** lähdekoodi ja rakenne ovat toteutettu ja staattisesti validoitu. Pakettia ei pidä merkitä tuotantojulkaistuksi ennen yllä olevien porttien sulkemista ja varsinaista Next.js-buildia.
