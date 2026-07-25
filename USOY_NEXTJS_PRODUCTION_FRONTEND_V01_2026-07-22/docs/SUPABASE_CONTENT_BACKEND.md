# Ullanlinnan Sähkö Oy — Supabase content backend

## Tila

Migraatiot ja TypeScript-validointi on valmisteltu, mutta niitä ei ole vielä ajettu tuotanto-Supabaseen.

Kohdeprojekti:

- vanha nimi: `Kultaeuroiksi`
- project ref: `plozdcvhftmtwbjwcqad`
- region: `eu-west-1`
- nykytila: `INACTIVE`

Palautus on estynyt Supabase Free -planin aktiivisten projektien enimmäisrajaan. Paint28-projektia ei pauseta tai muuteta tämän käyttöönoton yhteydessä ilman erillistä päätöstä.

## Arkkitehtuuripäätös

Pysyvä sisältö säilyy tyypitetyssä Next.js-koodissa:

- palvelusivut
- normaalit yhteystiedot
- normaalit aukioloajat
- FAQ
- myymälän tuoteryhmät
- sivukohtaiset SEO-metat

Supabase hallitsee vain aidosti muuttuvaa sisältöä:

- poikkeusaukiolot
- ilmoitukset
- second hand -valaisimet
- vaihtuvien kuvien metatiedot ja alt-tekstit
- julkaisu- ja arkistointitilat
- muutoshistoria

Projektissa ei rakenneta vapaata page builderia, verkkokauppaa tai reaaliaikaista varastosaldoa.

## Migraatiot

1. `202607250001_usoy_content_backend.sql`
   - sisältötaulut
   - julkaisutalous
   - RLS-politiikat
   - revisiohistoria
   - Storage-bucket ja -politiikat
   - alt-tekstin ja kuvaoikeuden julkaisuesto
   - `VAHVISTETTAVA`-merkinnän julkaisuesto

2. `202607250002_harden_content_triggers.sql`
   - revisiotriggerin turvallinen palautusarvo
   - triggerifunktioiden suoran kutsuoikeuden poisto
   - vain RLS:ssä tarvittavien roolifunktioiden käyttöoikeudet

## Tietokantataulut

### `opening_hour_exceptions`

Normaalin typed content -aukioloajan ohittavat päivämääräkohtaiset poikkeukset.

### `announcements`

Ajastetut tieto- ja varoitusilmoitukset. Niissä ei saa julkaista vahvistamattomia vasteaika-, hinta- tai saatavuuslupauksia.

### `second_hand_items`

Yksittäiset second hand -valaisimet. Julkinen saatavuusteksti on oletuksena `Saatavuus varmistettava.`. `sold`- ja `archived`-tilat eivät näy julkisesti.

### `media_assets`

Kuvan Storage-polku, mitat, MIME-tyyppi, alt-teksti, koristeellisuus, polttopiste ja käyttöoikeuden vahvistus.

### `content_revisions`

Triggerien kirjoittama muuttumaton sisältösnapshot luonti-, muokkaus-, julkaisu-, arkistointi- ja poistotapahtumista.

## Julkaisutyönkulku

```text
draft
  -> in_review
  -> approved
  -> published
  -> archived
```

Suora `draft -> published` estetään tietokannassa.

Julkaiseminen vaatii:

- hyväksytyn tilan
- hyväksyjän ja hyväksyntäajan
- publisher- tai admin-roolin
- tyhjän `unresolved_fields`-listan
- ei `VAHVISTETTAVA`, `TBD`, `TODO` tai `PLACEHOLDER` -merkintöjä
- kuville vahvistetut käyttöoikeudet
- informatiivisille kuville alt-tekstin

## Admin-roolit

Roolit tallennetaan `private.usoy_admin_users`-tauluun:

- `editor`
- `approver`
- `publisher`
- `admin`

Taulu ei ole suoraan selaimen luettavissa. RLS käyttää `private.is_usoy_admin()`- ja `private.has_usoy_role()`-funktioita.

Ensimmäinen admin lisätään vasta, kun oikea Supabase Auth -käyttäjä ja hyväksytty sähköpostiosoite on vahvistettu.

## Käyttöönottojärjestys

1. Vapauta Supabase Free -projektipaikka tai päivitä organisaation plan.
2. Palauta `plozdcvhftmtwbjwcqad`.
3. Ota ennen poistamista inventaario:
   - public-skeeman taulut
   - funktiot ja triggerit
   - RLS-politiikat
   - Storage-bucketit ja objektimäärät
   - Edge Functions
4. Varmista, ettei vanhaa Kultaeuroiksi-dataa tarvitse säilyttää.
5. Poista vain inventaarion perusteella tunnistetut vanhat resurssit.
6. Aja migraatiot järjestyksessä.
7. Luo Supabase Auth -admin.
8. Lisää admin `private.usoy_admin_users`-tauluun.
9. Generoi TypeScript-tyypit.
10. Lisää Verceliin ympäristömuuttujat:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
11. Kytke Next.js-repositoryt julkisiin read-kyselyihin ja admin Server Actioneihin.
12. Aja security- ja performance-advisorit.
13. Julkaise ensin Vercel Preview -ympäristöön.
14. Tarkista, ettei tuotannossa näy `VAHVISTETTAVA`-tekstiä tai kuvapaikkamerkkejä.
15. Yhdistä tuotantoon vasta hyväksynnän jälkeen.

## Storage

Bucket: `usoy-content-media`

- julkinen lukeminen
- enimmäiskoko 10 MiB
- sallitut muodot: JPEG, PNG, WebP ja AVIF
- kirjoitus, muokkaus ja poisto vain admin-käyttäjille
- bucket ei sovellu henkilötiedoille tai yhteydenottolomakkeen liitteille

Yhteydenottolomakkeiden mahdolliset asiakaskuvat tulee tallentaa erilliseen private bucketiin omilla RLS-säännöillä.

## Vercel

Kohdeprojekti:

- `ullanlinnan-sahko-oy`
- project ID: `prj_1getjVcHlUWFF5WFD7nQb7vpYPY2`
- framework: Next.js
- production-deploy: READY

Supabase-migraatiot eivät itsessään käynnistä production-deployta. Integraatio julkaistaan ensin preview-branchista.
