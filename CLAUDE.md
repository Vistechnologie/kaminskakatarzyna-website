# CLAUDE.md — Instrukcje projektowe

## O projekcie
Strona internetowa dla **Katarzyny Kamińskiej** — autoryzowanego przedstawiciela Thermomix® w Trójmieście.
Domena: **kaminskakatarzyna.com** (Cloudflare DNS → Vercel hosting)
Repo: github.com/Vistechnologie/kaminskakatarzyna-website

## Stack technologiczny
- **React + Vite** (single-file app w `src/App.jsx`)
- **Hosting:** Vercel (auto-deploy z brancha `main`)
- **Domena:** Cloudflare (DNS only, szara chmurka)
- **Email:** kontakt@kaminskakatarzyna.com (Cloudflare Email Routing → Gmail, do skonfigurowania)

## Estetyka — LUKSUSOWA
Strona ma komunikować **prestiż, luksus i aspirację**. Thermomix TM7 kosztuje 6 669 zł — to produkt premium.

### Paleta kolorów:
- Złoto: #C4A265 (główny akcent)
- Ciemna zieleń: #0D1A0F, #1E3A25 (tła ciemnych sekcji)
- Krem: #FAF6EF (tło jasnych sekcji)
- Biel: #FFFFFF (karty)

### Typografia:
- Nagłówki: **Playfair Display** (elegancki serif)
- Body: **DM Sans** (czysty sans-serif)
- Letterspacing + uppercase na labelach = styl premium

### Styl:
- Ostre rogi (bez border-radius) = nowoczesny luksus
- Złote dividers i złote akcenty
- Naprzemiennie ciemne i jasne sekcje
- Subtelne animacje scroll-reveal
- WhatsApp button: elegancki prostokąt, nie zielone kółko

## Struktura strony (sekcje od góry):
1. Pasek promocji (zamykalny, konfigurowalny w CONFIG)
2. Sticky nawigacja (imię + telefon + CTA "Umów pokaz" — zawsze widoczne)
3. Hero (ciemne tło, złote akcenty, statystyki: 20+ urządzeń, 80k+ przepisów, 1h posiłek)
4. Baner promocji (złote rogi dekoracyjne, limitowana oferta)
5. O mnie — historia Kasi (placeholder na zdjęcie)
6. Co czeka na pokazie (5 elementów na ciemnym tle)
7. Dlaczego Thermomix (6 kart z numeracją 01-06)
8. Kalkulator oszczędności (interaktywne suwaki, ciemny box z wynikiem)
9. Opinie (4 testimoniale na ciemnym tle, do zastąpienia prawdziwymi)
10. FAQ (8 pytań, accordion)
11. Rezerwacja (ciemne tło, CTA do Google Calendar)
12. Kontakt (telefon, WhatsApp, email + social media)
13. Polecenia (kopiuj link + WhatsApp share)
14. Footer
15. Floating WhatsApp (prawy dolny róg)

## CONFIG — dane do edycji
Obiekt CONFIG na górze `src/App.jsx` zawiera wszystkie dane kontaktowe i treści.
Zmiana w CONFIG = automatyczna zmiana na całej stronie.

### Aktualne dane:
- Telefon: 506 507 563
- WhatsApp: 48506507563
- Email: kontakt@kaminskakatarzyna.com
- Domena: kaminskakatarzyna.com
- Region: Trójmiasto + pokazy online w całej Polsce

### Do uzupełnienia (placeholder "#"):
- Instagram: BRAK — wpisać prawdziwy profil
- Facebook: BRAK — wpisać prawdziwy profil
- TikTok: BRAK — wpisać prawdziwy profil
- Google Calendar link: BRAK — Kasia musi założyć Appointment Schedule

### Aktualna promocja:
- TM7 + SodaStream za 49 zł (do 28.02.2026)
- Cena TM7: 6 669 zł

## Profil Kasi (do treści):
- Imię: Katarzyna Kamińska, wszyscy mówią "Kasia"
- Autoryzowany przedstawiciel Thermomix®
- Gotuje codziennie dla dużej rodziny
- Dostała Thermomix w prezencie i była oburzona — potem się zakochała
- Region: Trójmiasto (Gdańsk, Gdynia, Sopot) + pokazy online
- Nie jest typową sprzedawczynią — jest autentyczna, ciepła
- ZERO pokazów zrobionych (dopiero startuje)
- NIE ujawniać na stronie: szczegółów osobistych, liczby dzieci, wykształcenia, homeschoolingu

## Workflow:
- Po każdej zmianie: `git add . && git commit -m "opis" && git push`
- Vercel automatycznie deployuje po pushu (30 sek)
- Strona: kaminskakatarzyna.com
- Lokalny podgląd: `npm run dev` → http://localhost:5173

## Co dalej (roadmapa):
1. ✅ Strona online
2. ✅ Domena podpięta
3. → Poprawki wyglądu (w trakcie — luksusowy redesign)
4. → Uzupełnić social media linki
5. → Podłączyć Google Calendar Appointments
6. → Skonfigurować email routing w Cloudflare
7. → Wizytówki (projekt + QR vCard)
8. → Prawdziwe zdjęcie Kasi (sesja zdjęciowa)
9. → Prawdziwe testimoniale (po pierwszych pokazach)
10. → Blog / SEO (miesiąc 2-3)
