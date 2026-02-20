import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// CONFIG — Zmień dane tutaj, reszta strony zaktualizuje się automatycznie
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  brandName: "Katarzyna Kamińska",
  shortName: "Kasia",
  tagline: "Autoryzowany przedstawiciel Thermomix®",
  region: "Trójmiasto · Pokazy online w całej Polsce",
  domain: "kaminskakatarzyna.com",
  phone: "506 507 563",
  phoneFormatted: "+48 506 507 563",
  whatsapp: "48506507563",
  email: "kontakt@kaminskakatarzyna.com",
instagram: "https://www.instagram.com/katarzyna.groszek?utm_source=qr&igsh=MWJicTE0bWt2dGQyMg==",
facebook: "https://www.facebook.com/share/1aeVTjz83u/",
  whatsappDefaultMsg: "Cześć Kasiu! Chciałabym umówić się na pokaz Thermomixa 😊",
  promotion: {
    active: true,
    text: "Thermomix® TM7 + SodaStream za 49 zł — oferta do 28.02.2026",
    emoji: "✦",
    linkText: "Szczegóły",
    linkUrl: "#rezerwacja",
  },
  promoSection: {
    active: true,
    title: "Ekskluzywna oferta limitowana",
    subtitle: "Thermomix® TM7 + SodaStream za 49 zł",
    description: "Zamów nowy Thermomix® TM7 do końca lutego i odbierz elegancki saturator SodaStream w promocyjnej cenie.",
    deadline: "28.02.2026",
    price: "6 669 zł",
    ctaText: "Umów prywatny pokaz",

  },
  promoPopup: true,  // false = wyłącza popup
};

// ═══════════════════════════════════════════════════════════
// TM7 IMAGES — oficjalne CDN Vorwerk
// ═══════════════════════════════════════════════════════════
const TM7 = {
  main: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix_TM7_product-launch_main-device_standalone_66?wid=800&fmt=webp",
  angle: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix_TM7_product-launch_main-device_standalone_1?wid=800&fmt=webp",
  alt: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix_TM7_product-launch_main-device_standalone_66-1?wid=800&fmt=webp",
  side: "https://media.vorwerk.com/is/image/vorwerk/es_thermomix-tm7-lateral?wid=800&fmt=webp",
  varoma: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix-bimby_TM7_product-launch_varoma_standalone_34?wid=600&fmt=webp",
  bowl: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix-bimby_TM7_product-launch_spatula_and_bowl_standalone_2?wid=600&fmt=webp",
  blade: "https://media.vorwerk.com/is/image/vorwerk/int_thermomix-bimby_blade_cover_peeler_standalone_product-launch_04_medium?wid=600&fmt=webp",
  fullSet: "https://media.vorwerk.com/is/image/vorwerk/themomix-tm7_delivery-scope?wid=1000&fmt=webp",
  illustration: "https://media.vorwerk.com/is/image/vorwerk/tm7_illustration?wid=800&fmt=webp",
  kitchen: "https://media.vorwerk.com/is/image/vorwerk/int_master-en_thermomix_tm7-launch_StoryPhotos_DFP_0256_21x9?wid=1200&fmt=webp",
  cooking: "https://media.vorwerk.com/is/image/vorwerk/int_master-en_thermomix_tm7-launch_Story%20Photos_FDAS_0544_4x3?wid=800&fmt=webp",
  family: "https://media.vorwerk.com/is/image/vorwerk/int_master-en_thermomix_tm7-launch_StoryPhotos_KA_1119_4x3?wid=800&fmt=webp",
  hero: "https://media.vorwerk.com/is/image/vorwerk/int_master-en_thermomix_tm7-launch_StoryPhotos_FDAS_0118_21x9?wid=1200&fmt=webp",
  varomaTile: "https://media.vorwerk.com/is/image/vorwerk/01_TM7-varoma?wid=800&fmt=webp",
  awardUx: "https://media.vorwerk.com/is/image/vorwerk/award_UX_Design_Awards_2025_white_TM7?wid=200&fmt=webp",
  awardPxa: "https://media.vorwerk.com/is/image/vorwerk/award_pxa_2025_light_TM7?wid=200&fmt=webp",
  awardGc: "https://media.vorwerk.com/is/image/vorwerk/award_GC_SiegerPokale_2025_Kitchen_TM7?wid=200&fmt=webp",
};

// ═══════════════════════════════════════════════════════════
// LUXURY PALETTE
// ═══════════════════════════════════════════════════════════
const C = {
  gold: "#C4A265",
  goldLight: "#D4B87A",
  goldPale: "#E8D5A8",
  goldGlow: "rgba(196,162,101,0.15)",
  goldBorder: "rgba(196,162,101,0.25)",
  dark: "#0D1A0F",
  darkSoft: "#152118",
  darkCard: "#1A2B1E",
  forest: "#1E3A25",
  forestLight: "#2A5035",
  cream: "#FAF6EF",
  creamDark: "#F0EBE0",
  creamMid: "#E8E0D0",
  white: "#FFFFFF",
  text: "#1A1A18",
  textMed: "#5A5750",
  textLight: "#8A8578",
  textOnDark: "#E8E2D8",
  textOnDarkMed: "rgba(232,226,216,0.65)",
  border: "rgba(26,26,24,0.06)",
};

const fontSans = `'DM Sans', 'Helvetica Neue', sans-serif`;
const fontSerif = `'Playfair Display', Georgia, serif`;

const S = {
  page: { fontFamily: fontSans, color: C.text, background: C.cream, lineHeight: 1.7, margin: 0, WebkitFontSmoothing: "antialiased" },
  h2: { fontFamily: fontSerif, fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 600, color: C.text, marginBottom: 16, lineHeight: 1.15, letterSpacing: "-0.01em" },
  h2Light: { fontFamily: fontSerif, fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 600, color: "#fff", marginBottom: 16, lineHeight: 1.15, letterSpacing: "-0.01em" },
  subtitle: { fontSize: 17, color: C.textMed, marginBottom: 48, maxWidth: 520, lineHeight: 1.7 },
  subtitleLight: { fontSize: 17, color: C.textOnDarkMed, marginBottom: 48, maxWidth: 520, lineHeight: 1.7 },
  btn: { display: "inline-flex", alignItems: "center", gap: 8, background: C.gold, color: C.dark, border: "none", borderRadius: 0, padding: "16px 36px", fontSize: 14, fontWeight: 600, fontFamily: fontSans, cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease", letterSpacing: "0.08em", textTransform: "uppercase" },
  btnOutline: { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: C.text, borderRadius: 0, border: `1.5px solid ${C.text}`, padding: "15px 34px", fontSize: 14, fontWeight: 600, fontFamily: fontSans, cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease", letterSpacing: "0.08em", textTransform: "uppercase" },
  btnLight: { display: "inline-flex", alignItems: "center", gap: 8, background: C.gold, color: C.dark, border: "none", borderRadius: 0, padding: "16px 36px", fontSize: 14, fontWeight: 600, fontFamily: fontSans, cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease", letterSpacing: "0.08em", textTransform: "uppercase" },
  btnOutlineLight: { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: C.textOnDark, borderRadius: 0, border: `1.5px solid rgba(232,226,216,0.3)`, padding: "15px 34px", fontSize: 14, fontWeight: 600, fontFamily: fontSans, cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease", letterSpacing: "0.08em", textTransform: "uppercase" },
  card: { background: C.white, padding: "36px 28px", border: `1px solid ${C.border}`, transition: "all 0.4s ease" },
  divider: { width: 48, height: 1, background: C.gold, margin: "0 auto 20px" },
};

// ═══════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s` }}>{children}</div>
  );
}

function GoldCorners({ size = 24, thickness = 1.5 }) {
  const st = { position: "absolute", width: size, height: size };
  return (<>
    <div style={{ ...st, top: 12, left: 12, borderTop: `${thickness}px solid ${C.gold}`, borderLeft: `${thickness}px solid ${C.gold}` }} />
    <div style={{ ...st, top: 12, right: 12, borderTop: `${thickness}px solid ${C.gold}`, borderRight: `${thickness}px solid ${C.gold}` }} />
    <div style={{ ...st, bottom: 12, left: 12, borderBottom: `${thickness}px solid ${C.gold}`, borderLeft: `${thickness}px solid ${C.gold}` }} />
    <div style={{ ...st, bottom: 12, right: 12, borderBottom: `${thickness}px solid ${C.gold}`, borderRight: `${thickness}px solid ${C.gold}` }} />
  </>);
}

// ═══════════════════════════════════════════════════════════
// PROMO BAR
// ═══════════════════════════════════════════════════════════
function PromoBar({ onClose, onDetails }) {
  const [idx, setIdx] = useState(0);
  const promos = [
    "NOWOŚĆ: 36 rat RRSO 0% + drugie naczynie za 499 zł — do 31.03",
    "Thermomix® TM7 + SodaStream za 49 zł — do 28.02.2026",
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % promos.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: C.dark, color: C.goldPale, padding: "11px 20px", fontSize: 13, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", letterSpacing: "0.06em", fontWeight: 500 }}>
      <span style={{ transition: "opacity 0.4s", cursor: "default" }}>
        <span style={{ color: C.gold, marginRight: 8 }}>✦</span>{promos[idx]}
      </span>
      <a href="#" onClick={(e) => { e.preventDefault(); onDetails(); }} style={{ color: C.gold, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${C.gold}`, paddingBottom: 1, cursor: "pointer" }}>Szczegóły</a>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(232,226,216,0.35)", cursor: "pointer", fontSize: 16, padding: "0 0 0 8px", lineHeight: 1 }}>×</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["O mnie", "TM7", "Korzyści", "Kalkulator", "Opinie", "FAQ", "Kontakt"];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: scrolled ? "rgba(250,246,239,0.92)" : C.cream, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.4s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: fontSerif, fontSize: 18, fontWeight: 600, color: C.text, lineHeight: 1.15, letterSpacing: "0.02em" }}>Katarzyna<br />Kamińska</div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-only">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "")}`} style={{ textDecoration: "none", color: C.textLight, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={`tel:${CONFIG.phoneFormatted}`} style={{ textDecoration: "none", color: C.text, fontWeight: 600, fontSize: 14, letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15 }}>✆</span><span className="phone-text">{CONFIG.phone}</span>
          </a>
          <a href="#rezerwacja" style={{ ...S.btn, padding: "10px 24px", fontSize: 12 }}>Umów pokaz</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: "none", background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.text, padding: 4 }}>☰</button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "8px 24px" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "")}`} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "14px 0", textDecoration: "none", color: C.text, fontWeight: 500, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO — z prawdziwym zdjęciem TM7
// ═══════════════════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkSoft} 40%, ${C.forest} 100%)`, padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.goldGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, borderTop: `1px solid ${C.goldBorder}`, borderLeft: `1px solid ${C.goldBorder}`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, borderBottom: `1px solid ${C.goldBorder}`, borderRight: `1px solid ${C.goldBorder}`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 40, position: "relative" }}>
        {/* Text left */}
        <div style={{ flex: "1 1 400px", minWidth: 300, textAlign: "left" }}>
          <Reveal>
            <div style={{ display: "inline-block", color: C.gold, fontSize: 12, fontWeight: 600, padding: "8px 20px", letterSpacing: "0.18em", textTransform: "uppercase", border: `1px solid ${C.goldBorder}`, marginBottom: 28 }}>{CONFIG.tagline}</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 style={{ fontFamily: fontSerif, fontSize: "clamp(34px, 6vw, 56px)", fontWeight: 600, color: "#fff", lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.01em" }}>
              Odkryj przyjemność<br /><span style={{ color: C.gold }}>doskonałego</span> gotowania
            </h1>
          </Reveal>
          <Reveal delay={0.2}><div style={{ width: 60, height: 1, background: C.gold, marginBottom: 20 }} /></Reveal>
          <Reveal delay={0.25}>
            <p style={{ fontSize: 17, color: C.textOnDarkMed, marginBottom: 32, lineHeight: 1.8, maxWidth: 480 }}>
              Thermomix® TM7 — jedno urządzenie, które odmieni Twoją kuchnię. Oszczędność czasu, smak i elegancja w jednym.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#rezerwacja" style={S.btnLight}>Umów prywatny pokaz</a>
              <a href="#tm7" style={S.btnOutlineLight}>Poznaj TM7</a>
            </div>
          </Reveal>
        </div>

       <Reveal delay={0.45}>
            <div style={{ display: "flex", gap: 20, marginTop: 28, alignItems: "center" }}>
              <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.textOnDarkMed, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", borderBottom: `1px solid rgba(232,226,216,0.2)`, paddingBottom: 2, transition: "color 0.3s" }}>
                Instagram
              </a>
              <span style={{ color: "rgba(232,226,216,0.2)" }}>·</span>
              <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.textOnDarkMed, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", borderBottom: `1px solid rgba(232,226,216,0.2)`, paddingBottom: 2, transition: "color 0.3s" }}>
                Facebook
              </a>
              <span style={{ color: "rgba(232,226,216,0.2)" }}>·</span>
              <span style={{ fontSize: 11, color: "rgba(232,226,216,0.3)", letterSpacing: "0.06em" }}>Rolki & przepisy</span>
            </div>
          </Reveal>

        {/* TM7 image right */}
        <Reveal delay={0.3} style={{ flex: "1 1 320px", minWidth: 280, textAlign: "center" }}>
          <img src={TM7.main} alt="Thermomix TM7" loading="eager" style={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }} />
        </Reveal>
      </div>

      {/* Stats bar */}
      <Reveal delay={0.45}>
        <div style={{ maxWidth: 800, margin: "56px auto 0", display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { num: "20+", label: "Trybów gotowania" },
            { num: "10\"", label: "Ekran dotykowy" },
            { num: "45%", label: "Większa Varoma" },
            { num: "30 dB", label: "Cicha praca" },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 140px", textAlign: "center", padding: "20px 12px", background: "rgba(255,255,255,0.03)", borderTop: `1px solid ${C.goldBorder}` }}>
              <div style={{ fontFamily: fontSerif, fontSize: 26, fontWeight: 600, color: C.gold, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: C.textOnDarkMed, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// PROMO SECTION
// ═══════════════════════════════════════════════════════════
function PromoSection() {
  if (!CONFIG.promoSection.active) return null;
  return (
    <section style={{ background: C.cream, padding: "80px 24px" }}>
      <Reveal>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", background: C.white, padding: "56px 40px", border: `1px solid ${C.goldBorder}`, position: "relative" }}>
          <GoldCorners />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.gold, marginBottom: 16, letterSpacing: "0.2em", textTransform: "uppercase" }}>✦&ensp;Oferta limitowana&ensp;✦</div>
          <h3 style={{ fontFamily: fontSerif, fontSize: "clamp(24px, 4vw, 34px)", color: C.text, marginBottom: 16, fontWeight: 600 }}>{CONFIG.promoSection.subtitle}</h3>
          <div style={{ width: 40, height: 1, background: C.gold, margin: "0 auto 16px" }} />
          <p style={{ fontSize: 16, color: C.textMed, marginBottom: 12, lineHeight: 1.7 }}>{CONFIG.promoSection.description}</p>
          <p style={{ fontSize: 14, color: C.textLight, marginBottom: 28 }}>
            Ważne do <strong style={{ color: C.text }}>{CONFIG.promoSection.deadline}</strong>&ensp;·&ensp;Cena: <strong style={{ color: C.text }}>{CONFIG.promoSection.price}</strong>
          </p>
          <a href="#rezerwacja" style={S.btn}>{CONFIG.promoSection.ctaText}</a>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════
function About() {
  return (
    <section id="omnie" style={{ background: C.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
        <Reveal style={{ flex: "0 0 auto" }}>
          <div style={{ width: 240, height: 300, background: C.creamDark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", border: `1px solid ${C.goldBorder}` }}>
            <span style={{ fontSize: 72, opacity: 0.8 }}>👩‍🍳</span>
            <span style={{ fontSize: 11, color: C.textLight, marginTop: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Zdjęcie wkrótce</span>
            <div style={{ position: "absolute", bottom: -6, right: -6, width: 48, height: 48, borderBottom: `2px solid ${C.gold}`, borderRight: `2px solid ${C.gold}` }} />
            <div style={{ position: "absolute", top: -6, left: -6, width: 48, height: 48, borderTop: `2px solid ${C.gold}`, borderLeft: `2px solid ${C.gold}` }} />
          </div>
        </Reveal>
        <Reveal delay={0.15} style={{ flex: 1, minWidth: 300 }}>
          <div style={{ width: 48, height: 1, background: C.gold, marginBottom: 20 }} />
          <h2 style={{ ...S.h2, marginBottom: 20 }}>Moja historia</h2>
          <div style={{ fontSize: 16, color: C.textMed, lineHeight: 1.9 }}>
            <p style={{ marginBottom: 16 }}>Gotowanie to moja pasja od lat. Gotuję codziennie dla mojej dużej rodziny — i uwielbiam każdą chwilę spędzoną w kuchni. Znajomi mówią, że mam do tego talent, ja mówię, że po prostu kocham dobrze karmić bliskich.</p>
            <p style={{ marginBottom: 16 }}>A Thermomix? Zabawna historia — dostałam go w prezencie i byłam oburzona. <em>„Ja umiem gotować! Po co mi to?!"</em> Ale ciekawość wygrała. I okazało się, że Thermomix nie zastępuje umiejętności — on je wzmacnia.</p>
            <p style={{ marginBottom: 16 }}>Dziś chcę to samo pokazać Tobie. Nie jestem typową sprzedawczynią — jestem osobą, która sama nie wierzyła, a teraz nie wyobraża sobie kuchni bez Thermomixa.</p>
            <p>Przyjadę do Ciebie, ugotuję, porozmawiamy. Zero presji, czysta przyjemność. Pokazy prowadzę w Trójmieście oraz online w całej Polsce.</p>
          </div>
          <div style={{ marginTop: 28, padding: "24px 28px", background: `linear-gradient(135deg, ${C.goldGlow} 0%, transparent 100%)`, borderLeft: `2px solid ${C.gold}` }}>
            <p style={{ fontFamily: fontSerif, fontStyle: "italic", color: C.text, fontSize: 16, lineHeight: 1.8, margin: 0 }}>
              „Dostałam Thermomix w prezencie i byłam pewna, że go nie potrzebuję. Dziś nie wyobrażam sobie bez niego ani jednego dnia w kuchni."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TM7 GALLERY — prawdziwe zdjęcia Vorwerk
// ═══════════════════════════════════════════════════════════
function Gallery() {
  const images = [
    { src: TM7.main, label: "Thermomix® TM7", span: 2 },
    { src: TM7.cooking, label: "Gotowanie z TM7", span: 1 },
    { src: TM7.varoma, label: "Varoma — 45% większa", span: 1 },
    { src: TM7.kitchen, label: "TM7 w nowoczesnej kuchni", span: 2 },
    { src: TM7.bowl, label: "Naczynie + kopystka", span: 1 },
    { src: TM7.family, label: "Gotowanie w rodzinie", span: 2 },
  ];

  return (
    <section id="tm7" style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.forest} 100%)`, padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 32, left: 32, width: 80, height: 80, borderTop: `1px solid ${C.goldBorder}`, borderLeft: `1px solid ${C.goldBorder}`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 32, right: 32, width: 80, height: 80, borderBottom: `1px solid ${C.goldBorder}`, borderRight: `1px solid ${C.goldBorder}`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <Reveal><div style={S.divider} /><h2 style={S.h2Light}>Thermomix® TM7</h2></Reveal>
          <Reveal delay={0.1}><p style={{ ...S.subtitleLight, margin: "0 auto 16px" }}>Poznaj urządzenie, które zmienia zasady gry w kuchni.</p></Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <span style={{ fontSize: 13, color: C.gold, letterSpacing: "0.08em" }}>✦ CENA: {CONFIG.promoSection.price}</span>
              <span style={{ fontSize: 13, color: C.textOnDarkMed }}>|</span>
              <span style={{ fontSize: 13, color: C.goldPale, letterSpacing: "0.08em" }}>RATY OD 185 ZŁ/MIES.</span>
            </div>
          </Reveal>
        </div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "240px", gap: 4 }}>
          {images.map((img, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06} style={{ gridColumn: `span ${img.span}` }}>
              <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", border: `1px solid rgba(196,162,101,0.1)` }}>
                <img src={img.src} alt={img.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(13,26,15,0.85))", padding: "24px 16px 14px" }}>
                  <span style={{ fontSize: 13, color: C.goldPale, fontWeight: 600, letterSpacing: "0.04em" }}>{img.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Awards */}
        <Reveal delay={0.5}>
          <div style={{ textAlign: "center", marginTop: 48, paddingTop: 32, borderTop: `1px solid rgba(196,162,101,0.15)` }}>
            <div style={{ fontSize: 11, color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>✦&ensp;Nagrodzony Thermomix® TM7&ensp;✦</div>
            <div className="awards-row" style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { src: TM7.awardUx, name: "UX Design Awards" },
                { src: TM7.awardPxa, name: "Plus X Award" },
                { src: TM7.awardGc, name: "Goldene Computer" },
              ].map((a, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ background: C.white, padding: 12, marginBottom: 8 }}>
                    <img src={a.src} alt={a.name} loading="lazy" style={{ height: 72, display: "block" }} />
                  </div>
                  <div style={{ fontSize: 10, color: C.textOnDarkMed, letterSpacing: "0.06em" }}>{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SHOWCASE — TM7 features (image + text split)
// ═══════════════════════════════════════════════════════════
function Showcase() {
  const items = [
    { img: TM7.kitchen, tag: "10-calowy ekran dotykowy", title: "Intuicyjna obsługa krok po kroku", text: "Duży, responsywny ekran prowadzi Cię przez każdy przepis. Wystarczy dotknąć — Thermomix zrobi resztę. Ponad 6 000 przepisów w języku polskim dostępnych od razu.", reverse: false },
    { img: TM7.cooking, tag: "Varoma — 45% większa", title: "Gotowanie na parze na nowym poziomie", text: "Nowa Varoma jest o 45% większa niż w TM6. Przygotuj pełny posiłek na parze dla całej rodziny — zdrowo, szybko i bez wysiłku.", reverse: true },
  ];

  return (
    <section style={{ background: C.cream, padding: 0 }}>
      {items.map((it, i) => (
        <Reveal key={i}>
          <div style={{ display: "flex", flexWrap: "wrap", flexDirection: it.reverse ? "row-reverse" : "row", minHeight: 400 }}>
            <div style={{ flex: "1 1 50%", minWidth: 300, minHeight: 340, position: "relative", overflow: "hidden" }}>
              <img src={it.img} alt={it.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: "1 1 50%", minWidth: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 48px", background: i === 0 ? C.white : C.cream }}>
              <div style={{ maxWidth: 420 }}>
                <div style={{ fontSize: 11, color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>✦&ensp;{it.tag}</div>
                <h3 style={{ fontFamily: fontSerif, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>{it.title}</h3>
                <div style={{ width: 40, height: 1, background: C.gold, marginBottom: 16 }} />
                <p style={{ fontSize: 16, color: C.textMed, lineHeight: 1.8 }}>{it.text}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SPECS — co w zestawie + parametry
// ═══════════════════════════════════════════════════════════
function Specs() {
  return (
    <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkSoft} 100%)`, padding: "80px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 10%, ${C.gold}30 50%, transparent 90%)` }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}><Reveal><div style={S.divider} /><h2 style={S.h2Light}>W zestawie</h2></Reveal></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 4 }}>
          {[
            { img: TM7.main, title: "Thermomix® TM7", desc: "Baza z 10\" ekranem dotykowym, naczynie 2,2 l, 20+ trybów gotowania" },
            { img: TM7.varoma, title: "Varoma", desc: "45% większa niż w TM6, gotowanie na parze dla całej rodziny, 6,8 l pojemności" },
            { img: TM7.bowl, title: "Akcesoria", desc: "Kopystka, motylek, koszyczek, pokrywa + 3 mies. Cookidoo® gratis i e-book powitalny" },
          ].map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(196,162,101,0.1)`, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 200, overflow: "hidden", background: C.darkCard }}>
                  <img src={it.img} alt={it.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }} />
                </div>
                <div style={{ padding: "20px 20px 24px", flex: 1 }}>
                  <div style={{ fontFamily: fontSerif, fontSize: 18, color: C.textOnDark, fontWeight: 600, marginBottom: 8 }}>{it.title}</div>
                  <div style={{ fontSize: 14, color: C.textOnDarkMed, lineHeight: 1.6 }}>{it.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="specs-params" style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", marginTop: 32, padding: "24px 0", borderTop: `1px solid rgba(196,162,101,0.15)` }}>
            {[
              { val: "500W", label: "Silnik" },
              { val: "2,2 l", label: "Naczynie" },
              { val: "10\"", label: "Ekran" },
              { val: "30 dB", label: "Głośność" },
              { val: "120°C", label: "Maks. temp." },
              { val: "20+", label: "Trybów" },
            ].map((s, i) => (
              <div key={i} style={{ flex: "1 1 130px", textAlign: "center", padding: "16px 12px", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontFamily: fontSerif, fontSize: 22, color: C.gold, fontWeight: 600, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: C.textOnDarkMed, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// WHAT TO EXPECT
// ═══════════════════════════════════════════════════════════
function WhatToExpect() {
  const items = [
    { icon: "✦", title: "Thermomix w akcji", desc: "Pokaz na żywo — zobaczysz jak działa" },
    { icon: "✦", title: "Wspólne gotowanie", desc: "Przygotujemy pełen posiłek razem" },
    { icon: "✦", title: "Składniki od nas", desc: "Nie musisz niczego przygotowywać" },
    { icon: "✦", title: "Degustacja", desc: "Spróbujesz każdej przygotowanej potrawy" },
    { icon: "✦", title: "Zero zobowiązań", desc: "Bezpłatny pokaz bez presji zakupu" },
  ];
  return (
    <section style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal><div style={S.divider} /><h2 style={S.h2}>Czego się spodziewać na pokazie</h2></Reveal>
        <Reveal delay={0.1}><p style={{ ...S.subtitle, margin: "0 auto 48px" }}>Pokaz to wspólne gotowanie, degustacja i rozmowa. Bez slajdów, bez presji.</p></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08} style={{ flex: "1 1 170px", maxWidth: 210 }}>
              <div style={{ background: C.white, padding: "36px 20px", textAlign: "center", border: `1px solid ${C.border}`, position: "relative" }}>
                <div style={{ color: C.gold, fontSize: 20, marginBottom: 16, fontFamily: fontSerif }}>{it.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 8 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: C.textMed, lineHeight: 1.6 }}>{it.desc}</div>
                <div style={{ position: "absolute", bottom: 0, left: "25%", right: "25%", height: 2, background: C.gold }} />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.6}><a href="#rezerwacja" style={{ ...S.btn, marginTop: 48 }}>Zarezerwuj termin</a></Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// BENEFITS
// ═══════════════════════════════════════════════════════════
function Benefits() {
  const items = [
    { num: "01", title: "Oszczędność czasu", desc: "Pełen obiad w 20–30 minut. Thermomix kroi, miesza, waży, gotuje i gotuje na parze — jednocześnie." },
    { num: "02", title: "Zdrowe jedzenie", desc: "Pełna kontrola nad składnikami. Bez konserwantów, bez sztucznych dodatków. Wiesz co jesz." },
    { num: "03", title: "80 000+ przepisów", desc: "Platforma Cookidoo® prowadzi Cię krok po kroku. Nawet jeśli nigdy nie gotowałeś — dasz radę." },
    { num: "04", title: "1 urządzenie zamiast 20", desc: "Thermomix® zastępuje ponad 20 urządzeń kuchennych. Mniej sprzętów, więcej przestrzeni." },
    { num: "05", title: "Oszczędność pieniędzy", desc: "Gotowanie w domu zamiast jedzenia na mieście. Nawet kilkaset złotych oszczędności miesięcznie." },
    { num: "06", title: "Smaki całego świata", desc: "Kuchnia tajska, indyjska, włoska, francuska — kulinarne podróże bez wychodzenia z domu." },
  ];
  return (
    <section id="korzyści" style={{ background: C.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <Reveal><div style={S.divider} /><h2 style={S.h2}>Dlaczego Thermomix® TM7</h2></Reveal>
          <Reveal delay={0.1}><p style={{ ...S.subtitle, margin: "0 auto 56px" }}>Jedno urządzenie, które zmieni sposób, w jaki myślisz o gotowaniu.</p></Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.05 + i * 0.06}>
              <div style={{ ...S.card, padding: "40px 32px", borderLeft: i % 2 === 0 ? `2px solid ${C.gold}` : `1px solid ${C.border}` }}>
                <div style={{ fontFamily: fontSerif, fontSize: 32, color: C.goldLight, marginBottom: 16, fontWeight: 300 }}>{it.num}</div>
                <div style={{ fontFamily: fontSerif, fontWeight: 600, fontSize: 20, color: C.text, marginBottom: 10 }}>{it.title}</div>
                <div style={{ fontSize: 15, color: C.textMed, lineHeight: 1.75 }}>{it.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CALCULATOR
// ═══════════════════════════════════════════════════════════
function Calculator() {
  const [people, setPeople] = useState(4);
  const [meals, setMeals] = useState(3);
  const savings = people * meals * 4.3 * 23;
  const yearly = savings * 12;
  return (
    <section id="kalkulator" style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
        <Reveal><div style={S.divider} /><h2 style={S.h2}>Kalkulator oszczędności</h2></Reveal>
        <Reveal delay={0.1}><p style={{ ...S.subtitle, margin: "0 auto 40px" }}>Sprawdź, ile możesz zaoszczędzić gotując w domu z Thermomixem.</p></Reveal>
        <Reveal delay={0.2}>
          <div style={{ ...S.card, padding: "44px 36px", textAlign: "left", border: `1px solid ${C.goldBorder}`, position: "relative" }}>
            <GoldCorners size={20} thickness={1} />
            <label style={{ display: "block", marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>Osób w rodzinie</span>
                <span style={{ fontFamily: fontSerif, fontWeight: 600, color: C.gold, fontSize: 24 }}>{people}</span>
              </div>
              <input type="range" min={1} max={8} value={people} onChange={e => setPeople(+e.target.value)} style={{ width: "100%", accentColor: C.gold }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 6 }}><span>1</span><span>8+</span></div>
            </label>
            <label style={{ display: "block", marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>Posiłki na mieście / tydzień</span>
                <span style={{ fontFamily: fontSerif, fontWeight: 600, color: C.gold, fontSize: 24 }}>{meals}</span>
              </div>
              <input type="range" min={0} max={7} value={meals} onChange={e => setMeals(+e.target.value)} style={{ width: "100%", accentColor: C.gold }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 6 }}><span>0</span><span>codziennie</span></div>
            </label>
            <div style={{ background: C.dark, padding: 32, textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 8, left: 8, width: 16, height: 16, borderTop: `1px solid ${C.goldBorder}`, borderLeft: `1px solid ${C.goldBorder}` }} />
              <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16, borderBottom: `1px solid ${C.goldBorder}`, borderRight: `1px solid ${C.goldBorder}` }} />
              <div style={{ fontSize: 12, color: C.textOnDarkMed, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Szacowana oszczędność</div>
              <div style={{ fontFamily: fontSerif, fontSize: 52, fontWeight: 600, color: C.gold, lineHeight: 1 }}>{Math.round(savings)} zł</div>
              <div style={{ fontSize: 13, color: C.textOnDarkMed, marginTop: 6 }}>miesięcznie</div>
              <div style={{ marginTop: 16, fontSize: 15, fontWeight: 600, color: C.textOnDark, borderTop: `1px solid rgba(196,162,101,0.2)`, paddingTop: 16 }}>✦&ensp;{Math.round(yearly).toLocaleString("pl-PL")} zł rocznie&ensp;✦</div>
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}><a href="#rezerwacja" style={S.btn}>Przekonaj się na pokazie</a></div>
            <p style={{ fontSize: 11, color: C.textLight, textAlign: "center", marginTop: 16 }}>Szacunek: posiłek na mieście ~35 zł/os., w domu ~12 zł/os.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS — 6 zróżnicowanych
// ═══════════════════════════════════════════════════════════
function Testimonials() {
  const items = [
    { text: "Nie wierzyłam, że jedno urządzenie może zastąpić tyle sprzętów. Teraz gotuję codziennie w 30 minut — z trójką dzieci to zbawienie.", author: "Mama trójki dzieci", initials: "MT" },
    { text: "Myślałem, że Thermomix to gadżet. Ale mój niedzielny meal prep skrócił się z 4 godzin do półtorej. Rewolucja.", author: "Tata, fan zdrowego jedzenia", initials: "TF" },
    { text: "Gotuję od 30 lat i byłam pewna, że żaden robot mi nie jest potrzebny. Myliłam się — moja zupa krem nigdy nie była lepsza.", author: "Doświadczona kucharka", initials: "DK" },
    { text: "Robię domowe hummusy, pasty curry, mleko roślinne — rzeczy, na które ręcznie potrzebowałam godzin. Jakość nieporównywalna.", author: "Miłośniczka zdrowej kuchni", initials: "MZ" },
    { text: "Kupiłam Thermomix sceptycznie, bo mąż nalegał. Po tygodniu to ja nie chciałam go oddawać. Teraz gotuję z uśmiechem.", author: "Żona sceptyczka", initials: "ŻS" },
    { text: "Jako singiel myślałem, że to sprzęt dla rodzin. Ale gotowanie dla jednego jest jeszcze prostsze — i w końcu jem zdrowo.", author: "Singiel, 32 lata", initials: "S3" },
  ];
  const borders = [
    { borderLeft: `2px solid ${C.gold}` },
    { borderTop: `2px solid ${C.gold}` },
    { borderRight: `2px solid ${C.gold}` },
    { borderBottom: `2px solid ${C.gold}` },
    { border: `1px solid rgba(196,162,101,0.2)` },
    { borderLeft: `2px solid ${C.gold}` },
  ];

  return (
    <section id="opinie" style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkSoft} 100%)`, padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 10%, ${C.gold}30 50%, transparent 90%)` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 10%, ${C.gold}30 50%, transparent 90%)` }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal><div style={S.divider} /><h2 style={S.h2Light}>Opinie użytkowników</h2></Reveal>
        <Reveal delay={0.1}><p style={{ ...S.subtitleLight, margin: "0 auto 48px" }}>Thermomix zmienił sposób gotowania milionów rodzin na świecie.</p></Reveal>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <div style={{
                background: i === 1 || i === 4 ? "rgba(196,162,101,0.06)" : "rgba(255,255,255,0.02)",
                padding: "36px 28px", ...borders[i],
                display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%",
              }}>
                <div style={{ flex: 1 }}>
                  {(i === 0 || i === 3) && <div style={{ fontFamily: fontSerif, fontSize: 64, color: C.gold, lineHeight: 0.6, marginBottom: 12, opacity: 0.4 }}>"</div>}
                  {(i === 1 || i === 4) && <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, marginBottom: 16, textAlign: "center" }}>★ ★ ★ ★ ★</div>}
                  {(i === 2 || i === 5) && <div style={{ color: C.gold, fontSize: 18, marginBottom: 16, textAlign: "right", letterSpacing: 6 }}>✦ ✦ ✦</div>}
                  <p style={{ fontFamily: fontSerif, fontSize: 15, color: C.textOnDark, lineHeight: 1.8, fontStyle: "italic", marginBottom: 20, textAlign: "left" }}>„{it.text}"</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.goldBorder}`, fontSize: 12, color: C.gold, fontWeight: 600, flexShrink: 0 }}>{it.initials}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.goldLight, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "left" }}>{it.author}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "Ile kosztuje Thermomix?", a: "Nowy Thermomix® TM7 kosztuje 6 669 zł. Dostępne są opcje ratalne od 185 zł/mies. oraz regularne promocje." },
    { q: "Czy mogę kupić na raty?", a: "Tak! Oferuję wygodne raty 0% oraz inne formy finansowania. Szczegóły ustalimy na spotkaniu." },
    { q: "Czym różni się od zwykłego robota kuchennego?", a: "Thermomix gotuje! Nie tylko kroi i miesza, ale też podgrzewa, gotuje na parze, waży składniki i prowadzi Cię krok po kroku na 10-calowym ekranie dotykowym. Zastępuje ponad 20 urządzeń." },
    { q: "Jak wygląda pokaz?", a: "Gotuję u Ciebie (lub online) pełny posiłek w ok. 1 godziny. Możesz zaprosić rodzinę i znajomych. Dla gospodarzy prezentacji Vorwerk przygotował specjalny katalog upominków." },
    { q: "Czy pokaz jest naprawdę darmowy?", a: "Tak. Przyjeżdżam, gotuję, rozmawiamy. Nie musisz niczego kupować — zero zobowiązań." },
    { q: "Co jeśli nie umiem gotować?", a: "To idealna sytuacja! Thermomix prowadzi Cię krok po kroku na ekranie. Wystarczy dodawać składniki." },
    { q: "Czy można zamówić pokaz online?", a: "Oczywiście! Prowadzę pokazy na żywo przez internet. Gotuję w swojej kuchni, a Ty oglądasz i inspirujesz się." },
    { q: "Mam starszy model — czy mogę wymienić?", a: "Tak. Vorwerk oferuje program wymiany starszych modeli (TM31/TM5/TM6) na nowy TM7." },
  ];
  return (
    <section id="faq" style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}><Reveal><div style={S.divider} /><h2 style={S.h2}>Najczęstsze pytania</h2></Reveal></div>
        <div style={{ marginTop: 48 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "24px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: fontSans }}>
                  <span style={{ fontWeight: 600, fontSize: 16, color: C.text, paddingRight: 20, lineHeight: 1.4 }}>{it.q}</span>
                  <span style={{ fontSize: 18, color: C.gold, fontWeight: 300, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
                  <p style={{ fontSize: 15, color: C.textMed, lineHeight: 1.8, padding: "0 0 24px", margin: 0 }}>{it.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// BOOKING — formularz + zdjęcie + telefon (dwie kolumny)
// ═══════════════════════════════════════════════════════════
function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    const text = `Cześć Kasiu! Proszę o kontakt.\n\nImię: ${name}\nTelefon: ${phone}${message ? `\nWiadomość: ${message}` : ""}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true); setTimeout(() => setSent(false), 5000);
  };
  const inp = { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)", border: `1px solid rgba(196,162,101,0.2)`, color: C.textOnDark, fontSize: 15, fontFamily: fontSans, outline: "none" };

  return (
    <section id="rezerwacja" style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.forest} 100%)`, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "70%", transform: "translate(-50%, -50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.goldGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Reveal><div style={S.divider} /></Reveal>
          <Reveal delay={0.1}><h2 style={{ ...S.h2Light, marginBottom: 12 }}>Umów się na pokaz</h2></Reveal>
          <Reveal delay={0.15}><p style={{ fontSize: 16, color: C.textOnDarkMed, lineHeight: 1.7 }}>Zostaw dane lub zadzwoń — umówimy wygodny termin.</p></Reveal>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
          {/* FORM */}
          <Reveal delay={0.2} style={{ flex: "1 1 340px", minWidth: 300 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.goldBorder}`, padding: "36px 28px", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
              <GoldCorners size={18} thickness={1} />
              <div style={{ fontSize: 11, color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>✦&ensp;Formularz kontaktowy</div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, color: C.goldLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, textAlign: "left" }}>Imię *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Twoje imię" style={inp} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, color: C.goldLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, textAlign: "left" }}>Telefon *</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Twój numer telefonu" style={inp} />
              </div>
              <div style={{ marginBottom: 24, flex: 1 }}>
                <label style={{ display: "block", fontSize: 11, color: C.goldLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, textAlign: "left" }}>Wiadomość <span style={{ color: C.textOnDarkMed }}>(opcjonalnie)</span></label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Np. preferowany termin, pytania..." rows={3} style={{ ...inp, resize: "vertical" }} />
              </div>
              <button onClick={handleSubmit} disabled={!name.trim() || !phone.trim()} style={{ ...S.btnLight, width: "100%", justifyContent: "center", opacity: (!name.trim() || !phone.trim()) ? 0.5 : 1, cursor: (!name.trim() || !phone.trim()) ? "default" : "pointer" }}>
                {sent ? "✓ Wysłano!" : "Wyślij — oddzwonię"}
              </button>
              <p style={{ fontSize: 11, color: C.textOnDarkMed, marginTop: 12, textAlign: "center" }}>Otworzy WhatsApp z Twoimi danymi</p>
            </div>
          </Reveal>
          {/* PHOTO + PHONE */}
          <Reveal delay={0.3} style={{ flex: "1 1 340px", minWidth: 300 }}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ flex: 1, background: `linear-gradient(135deg, ${C.darkCard} 0%, ${C.forestLight}40 100%)`, border: `1px solid ${C.goldBorder}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", minHeight: 240, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderTop: `1.5px solid ${C.gold}`, borderLeft: `1.5px solid ${C.gold}` }} />
                <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 24, borderBottom: `1.5px solid ${C.gold}`, borderRight: `1.5px solid ${C.gold}` }} />
                <span style={{ fontSize: 64, marginBottom: 8 }}>👩‍🍳</span>
                <div style={{ fontFamily: fontSerif, fontSize: 18, color: C.textOnDark, fontWeight: 600, marginBottom: 4 }}>{CONFIG.shortName} + Thermomix</div>
                <div style={{ fontSize: 12, color: C.textOnDarkMed, letterSpacing: "0.08em", textTransform: "uppercase" }}>Zdjęcie wkrótce</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.goldBorder}`, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>✦&ensp;Wolisz zadzwonić?</div>
                <a href={`tel:${CONFIG.phoneFormatted}`} style={{ fontFamily: fontSerif, fontSize: 32, color: C.gold, textDecoration: "none", fontWeight: 600, display: "block", marginBottom: 12 }}>{CONFIG.phone}</a>
                <p style={{ fontSize: 13, color: C.textOnDarkMed, lineHeight: 1.6, marginBottom: 16 }}>Zadzwoń lub napisz SMS — odezwę się najszybciej jak mogę</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={`tel:${CONFIG.phoneFormatted}`} style={{ ...S.btnOutlineLight, padding: "10px 20px", fontSize: 12 }}>Zadzwoń</a>
                  <a href={`sms:${CONFIG.phoneFormatted}`} style={{ ...S.btnOutlineLight, padding: "10px 20px", fontSize: 12 }}>SMS</a>
                  <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappDefaultMsg)}`} target="_blank" rel="noopener noreferrer" style={{ ...S.btnOutlineLight, padding: "10px 20px", fontSize: 12 }}>WhatsApp</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  return (
    <section id="kontakt" style={{ background: C.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal><div style={S.divider} /><h2 style={S.h2}>Kontakt</h2></Reveal>
        <Reveal delay={0.1}><p style={{ ...S.subtitle, margin: "0 auto 48px" }}>Chętnie odpowiem na pytania. Napisz, zadzwoń lub kliknij.</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
          {[
            { icon: "✆", label: "Telefon", value: CONFIG.phone, href: `tel:${CONFIG.phoneFormatted}` },
            { icon: "✉", label: "WhatsApp", value: CONFIG.phone, href: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappDefaultMsg)}` },
            { icon: "@", label: "Email", value: CONFIG.email, href: `mailto:${CONFIG.email}` },
          ].map((ch, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <a href={ch.href} target={ch.label === "WhatsApp" ? "_blank" : undefined} rel="noopener noreferrer" style={{ ...S.card, textDecoration: "none", display: "block", textAlign: "center", padding: "40px 24px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: "30%", right: "30%", height: 2, background: C.gold }} />
                <div style={{ fontFamily: fontSerif, fontSize: 28, color: C.gold, marginBottom: 12 }}>{ch.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{ch.label}</div>
                <div style={{ fontSize: 14, color: C.textMed }}>{ch.value}</div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
                    <div style={{ marginTop: 40, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 14, letterSpacing: "0.04em" }}>Rolki, przepisy i inspiracje — obserwuj:</div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center" }}>
              <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.text, fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", borderBottom: `1.5px solid ${C.gold}`, paddingBottom: 3 }}>Instagram</a>
              <span style={{ color: C.goldBorder }}>·</span>
              <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.text, fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", borderBottom: `1.5px solid ${C.gold}`, paddingBottom: 3 }}>Facebook</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// REFERRAL
// ═══════════════════════════════════════════════════════════
function Referral() {
  const [copied, setCopied] = useState(false);
  const url = `https://${CONFIG.domain}`;
  const handleCopy = () => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); };
  return (
    <section style={{ background: C.cream, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <Reveal>
          <div style={S.divider} />
          <h3 style={{ fontFamily: fontSerif, fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 600, color: C.text, marginBottom: 12 }}>Poleć mnie bliskim</h3>
          <p style={{ fontSize: 15, color: C.textMed, marginBottom: 28, lineHeight: 1.7 }}>Znasz kogoś, kto chciałby gotować szybciej i zdrowiej? Wyślij link — a ja zadbam o resztę.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleCopy} style={{ ...S.btnOutline, ...(copied ? { borderColor: C.gold, color: C.gold } : {}) }}>{copied ? "✓ Skopiowano" : "Skopiuj link"}</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Polecam Ci Kasię — świetna przedstawicielka Thermomix. Zobacz: ${url}`)}`} target="_blank" rel="noopener noreferrer" style={S.btn}>Wyślij przez WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "48px 24px", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 20%, ${C.gold}40 50%, transparent 80%)` }} />
      <div style={{ fontFamily: fontSerif, fontSize: 18, fontWeight: 600, color: C.textOnDark, marginBottom: 6 }}>{CONFIG.brandName}</div>
      <div style={{ fontSize: 12, color: C.textOnDarkMed, marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>{CONFIG.tagline}</div>
      <a href={`tel:${CONFIG.phoneFormatted}`} style={{ color: C.gold, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>{CONFIG.phone}</a>
     <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.gold, fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>Instagram</a>
        <span style={{ color: C.goldBorder }}>·</span>
        <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.gold, fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>Facebook</a>
      </div>
      <div style={{ fontSize: 10, color: "rgba(232,226,216,0.25)", marginTop: 8, letterSpacing: "0.06em" }}>Rolki · Przepisy · Inspiracje</div>
      <div style={{ fontSize: 11, color: "rgba(232,226,216,0.15)", marginTop: 28 }}>© 2026 {CONFIG.brandName} · {CONFIG.domain}</div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// FLOATING WHATSAPP
// ═══════════════════════════════════════════════════════════
function WhatsAppFloat() {
  const [hover, setHover] = useState(false);
  return (
    <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappDefaultMsg)}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, display: "flex", alignItems: "center", gap: 10, background: C.dark, color: C.gold, padding: hover ? "14px 24px 14px 18px" : "14px 18px", textDecoration: "none", border: `1px solid ${C.goldBorder}`, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", transition: "all 0.3s ease", fontSize: 14, fontWeight: 600 }}>
      <span style={{ fontSize: 20 }}>💬</span>{hover && <span>Napisz</span>}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═══════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; scroll-padding-top: 80px; }
      body { overflow-x: hidden; }
      ::selection { background: rgba(196,162,101,0.15); color: #0D1A0F; }
      @media (max-width: 768px) {
        .desktop-only { display: none !important; }
        .mobile-menu-btn { display: block !important; }
        .phone-text { display: none; }
        .gallery-grid { grid-template-columns: 1fr !important; grid-auto-rows: 200px !important; }
        .gallery-grid > div { grid-column: span 1 !important; }
        .testimonials-grid { grid-template-columns: 1fr !important; }
        .awards-row { flex-direction: column !important; align-items: center !important; }
        .specs-params { grid-template-columns: repeat(3, 1fr) !important; }
      }
      @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      input[type="range"] { -webkit-appearance: none; appearance: none; outline: none; height: 1px; background: #E8E0D0; }
      input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 18px; width: 18px; background: #C4A265; cursor: pointer; border: none; }
      input::placeholder, textarea::placeholder { color: rgba(232,226,216,0.3); }
      input:focus, textarea:focus { border-color: #C4A265 !important; }
      .promo-popup-content { flex-direction: column !important; }
      .promo-popup-img { flex: 0 0 160px !important; min-height: 160px !important; }
    `}</style>
  );
}

// ═══════════════════════════════════════════════════════════
// PROMO POPUP — wyskakuje po wejściu na stronę
// ═══════════════════════════════════════════════════════════
function PromoPopup({ onClose }) {
  const [active, setActive] = useState(0);
  const promos = [
    {
      badge: "NOWOŚĆ",
      title: "36 rat RRSO 0% + drugie naczynie za 499 zł",
      desc: "Kup Thermomix® TM7 na 36 rat RRSO 0% lub w zestawie z drugim kompletnym naczyniem miksującym za jedyne 499 zł (zamiast 1 400 zł)!",
      deadline: "31.03.2026",
      note: "Cofidis · Alior Bank · Credit Agricole",
      img: "https://media.vorwerk.com/is/image/vorwerk/1080x1350%20Thermomix%20promocja%20dodatkowe%20naczynie%20marzec?wid=600&fmt=webp",
    },
    {
      badge: "DO 28.02",
      title: "Thermomix® TM7 + SodaStream za 49 zł",
      desc: "Zamów nowy Thermomix® TM7 i odbierz elegancki saturator SodaStream w promocyjnej cenie. Idealne połączenie smaku i stylu!",
      deadline: "28.02.2026",
      note: "Nie łączy się z innymi promocjami",
      img: "https://media.vorwerk.com/is/image/vorwerk/oferta-luty-thermomix-tm7-sodastream-zestaw-vorwerk?wid=600&fmt=webp",
    },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(13,26,15,0.75)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: C.dark, maxWidth: 560, width: "100%", border: `1px solid ${C.goldBorder}`, overflow: "auto", maxHeight: "90vh" }}>
        <GoldCorners size={20} thickness={1} />

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${C.forest} 0%, ${C.dark} 100%)`, padding: "24px 28px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>✦&ensp;Aktualne promocje Thermomix®&ensp;✦</div>
          <div style={{ fontSize: 13, color: C.textOnDarkMed }}>Wybierz ofertę, która Ci odpowiada</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid rgba(196,162,101,0.15)` }}>
          {promos.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              flex: 1, padding: "14px 12px", background: active === i ? "rgba(196,162,101,0.08)" : "transparent",
              border: "none", borderBottom: active === i ? `2px solid ${C.gold}` : "2px solid transparent",
              color: active === i ? C.gold : C.textOnDarkMed, fontSize: 12, fontWeight: 600,
              fontFamily: fontSans, cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.3s",
            }}>
              {p.badge}
            </button>
          ))}
        </div>

        {/* Content with image */}
        <div>
          {/* Image — full width */}
         <div style={{ width: "100%", background: C.darkCard, textAlign: "center", padding: 8 }}>
  <img src={promos[active].img} alt={promos[active].title} style={{ maxWidth: "100%", maxHeight: 680, objectFit: "contain" }} />
</div>

          {/* Text */}
          <div style={{ padding: "24px 28px 16px" }}>
            <h3 style={{ fontFamily: fontSerif, fontSize: 22, color: C.white, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>
              {promos[active].title}
            </h3>
            <div style={{ width: 40, height: 1, background: C.gold, marginBottom: 10 }} />
            <p style={{ fontSize: 14, color: C.textOnDarkMed, lineHeight: 1.7, marginBottom: 12 }}>
              {promos[active].desc}
            </p>
            <div style={{ fontSize: 11, color: C.textOnDarkMed, marginBottom: 4 }}>
              <span>⏳ Do: <strong style={{ color: C.goldLight }}>{promos[active].deadline}</strong></span>
            </div>
            <div style={{ fontSize: 10, color: C.textOnDarkMed }}>{promos[active].note}</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "0 24px 24px" }}>
          <a href="#rezerwacja" onClick={onClose} style={{ ...S.btnLight, width: "100%", justifyContent: "center" }}>
            Umów pokaz i skorzystaj
          </a>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12 }}>
            <a href={`tel:${CONFIG.phoneFormatted}`} style={{ fontSize: 13, color: C.gold, textDecoration: "none", fontWeight: 600 }}>✆ {CONFIG.phone}</a>
            <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Cześć Kasiu! Widziałam promocję na stronie — chciałabym się umówić na pokaz!")}`}
              target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.gold, textDecoration: "none", fontWeight: 600 }}>WhatsApp →</a>
          </div>
        </div>

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.3)", border: "none",
          color: C.textOnDark, fontSize: 18, cursor: "pointer", padding: "4px 8px", lineHeight: 1,
        }}>×</button>
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const [popupOpen, setPopupOpen] = useState(CONFIG.promoPopup);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={S.page}>
      <GlobalStyles />
     {promoVisible && <PromoBar onClose={() => setPromoVisible(false)} onDetails={() => setPopupOpen(true)} />}
      <Nav scrolled={scrolled} />
      <Hero />
      <PromoSection />
      <About />
      <Gallery />
      <Showcase />
      <Specs />
      <WhatToExpect />
      <Benefits />
      <Calculator />
      <Testimonials />
      <FAQ />
      <Booking />
      <Contact />
      <Referral />
      <Footer />
      <WhatsAppFloat />
      {popupOpen && <PromoPopup onClose={() => setPopupOpen(false)} />}
    </div>
  );
}