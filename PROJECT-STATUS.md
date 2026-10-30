# Stan projektu — kaminskakatarzyna.com

Ostatnia aktualizacja: 2026-10-30

Strona wizytówka Katarzyny Kamińskiej, autoryzowanej przedstawicielki Thermomix® (Trójmiasto + prezentacje online).

## Etap

**Wdrożone i działające na produkcji.** Strona jest publicznie dostępna, DNS i HTTPS skonfigurowane dla apex i www, podgląd linków w social media działa. Prace nad treścią i funkcjami skończyły się w lutym 2026. Od tego czasu projekt jest w trybie utrzymania.

## Infrastruktura

| Element | Gdzie | Szczegóły |
|---|---|---|
| Rejestrator domeny | Cloudflare Registrar | kupiona 2026-02-20, wygasa 2027-02-20, auto-renew sprawdzić w panelu |
| DNS | Cloudflare | nameservery adel/merlin.ns.cloudflare.com, tryb DNS-only (szara chmurka) |
| Hosting | Vercel (plan Hobby) | projekt `kaminskakatarzyna-website`, team `sendmailtokamil-9632s-projects` |
| Deploy | GitHub → Vercel | auto-deploy po każdym pushu na `main`, ok. 30 s |
| Repo | github.com/Vistechnologie/kaminskakatarzyna-website | publiczne |
| Poczta | Cloudflare Email Routing | kontakt@kaminskakatarzyna.com → przekierowanie, SPF i DKIM ustawione |
| Konta | sendmailtokamil@gmail.com | to samo konto w Cloudflare i Vercel |

### Rekordy DNS (stan 2026-10-30)

| Typ | Nazwa | Wartość | Proxy |
|---|---|---|---|
| A | @ | 216.198.79.1 (Vercel) | DNS only |
| CNAME | www | c4d799f5142613d5.vercel-dns-017.com | DNS only |
| MX ×3 | @ | route1/2/3.mx.cloudflare.net | DNS only |
| TXT | @ | SPF: `v=spf1 include:_spf.mx.cloudflare.net ~all` | — |
| TXT | cf2024-1._domainkey | DKIM Cloudflare | — |
| TXT | @ | google-site-verification (Search Console) | — |
| TXT | _vercel | weryfikacja domeny Vercel | — |

### Domeny w projekcie Vercel

- `kaminskakatarzyna.com` — Production, adres kanoniczny
- `www.kaminskakatarzyna.com` — 308 redirect → apex, osobny certyfikat SSL (auto-odnawiany)
- `kaminskakatarzyna-website.vercel.app` — adres zapasowy

Każdy wariant (http/https, www/bez) kończy na `https://kaminskakatarzyna.com/`.

## Stack

- React 18 + Vite 5, cała aplikacja w jednym pliku `src/App.jsx` (ok. 1080 linii), style inline.
- Brak backendu. Formularz rezerwacji składa wiadomość i otwiera WhatsApp.
- Dane kontaktowe i treści w obiekcie `CONFIG` na górze `src/App.jsx`.
- Promocje w liście `PROMOTIONS` tamże, z datami `start`/`end`. Strona sama pokazuje i chowa pasek, sekcję i popup.
- SEO: meta tagi, Open Graph, Twitter Card, Schema.org LocalBusiness (18 miast) i Product w `index.html`; `robots.txt` i `sitemap.xml` w `public/`.
- Katalog marki: `public/brand-catalog.html` oraz interaktywny `public/brand-catalog-interactive.html` (v2.0).

Uruchomienie lokalne: `npm install`, `npm run dev`, http://localhost:5173.

## Historia prac

### 2026-10-30 (dzisiaj)

1. Przegląd projektu i ustalenie, gdzie stoi domena i hosting (patrz wyżej).
2. Dodano domenę `www.kaminskakatarzyna.com` w projekcie Vercel z przekierowaniem 308 na apex.
3. Dodano rekord CNAME `www` w Cloudflare. Vercel wystawił certyfikat, www działa po HTTPS.
4. Wygenerowano brakujący `public/og-image.jpg` (1200×630, podgląd linku w social media). Wcześniej meta tagi wskazywały na plik, którego nie było (404). Commit `966dc16`, zweryfikowane na produkcji.
5. Spisano ten dokument.

### 2026-02-20 → 2026-02-24 (budowa strony)

- Luksusowy redesign (złoto, ciemna zieleń, krem, Playfair Display + DM Sans).
- v3: galeria, opinie, formularz zamiast Google Calendar, układ dwukolumnowy rezerwacji.
- Promo popup i rotujący pasek ofert, poprawki mobile.
- Zdjęcia Kasi, usunięcie bloku nagród, "pokaz" → "prezentacja".
- Automatyczny system promocji z datami, SEO z 18 miastami w Schema.org.
- Favicony, apple-touch-icon, robots.txt, sitemap.xml.
- Brand catalog v2.0 i fix przycisków w nim (ostatni commit z tej serii: `eb89205`).

## Otwarte sprawy

- **Brak aktywnych promocji.** Obie w `PROMOTIONS` wygasły (28.02 i 31.03.2026). Strona nie pokazuje paska ani popupu. Jeśli Kasia ma nową ofertę, dopisać blok wg szablonu w komentarzu w `src/App.jsx`.
- **Opinie** w sekcji testimoniali to placeholdery do podmiany na prawdziwe.
- **Facebook Sharing Debugger**: po dodaniu og-image warto wymusić odświeżenie cache podglądu linku (developers.facebook.com/tools/debug), bo Facebook mógł zapamiętać brak obrazka.
- **DMARC**: Cloudflare sugeruje dodanie rekordu DMARC dla domeny (ochrona przed podszywaniem się pod adres kontakt@).
- **Pusty folder `-p`** w katalogu projektu, pozostałość po `mkdir -p` na Windows. Nie jest śledzony przez git, można usunąć.
- Opcjonalnie: dodać `www` do `sitemap.xml`? Nie, sitemap ma tylko apex i tak ma zostać (adres kanoniczny).

## Uwagi operacyjne

- Lokalnie nie ma Vercel CLI ani tokenów API Cloudflare/Vercel. Zmiany w DNS i domenach robi się przez panele WWW.
- Pliki z `public/` są serwowane z katalogu głównego domeny (np. `public/og-image.jpg` → `/og-image.jpg`).
- Po pushu na `main` deploy pojawia się w ok. 30 s. Vercel cache'uje odpowiedzi, przy sprawdzaniu nowego pliku dodać parametr do URL.
