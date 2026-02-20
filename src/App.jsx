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
  instagram: "#",
  facebook: "#",
  tiktok: "#",
  googleCalendarLink: "#",
  whatsappDefaultMsg: "Cześć Kasiu! Chciałabym umówić się na pokaz Thermomixa 😊",
  whatsappReferralMsg: "Cześć! Polecono mi Cię jako przedstawicielkę Thermomix. Chętnie umówię się na pokaz!",
  promotion: {
    active: true,
    text: "Kup Thermomix® TM7 do 28.02.2026 i odbierz saturator SodaStream za 49 zł!",
    emoji: "🔥",
    linkText: "Dowiedz się więcej",
    linkUrl: "#rezerwacja",
  },
  promoSection: {
    active: true,
    title: "Thermomix® TM7 + SodaStream za 49 zł!",
    description: "Kup nowy Thermomix® TM7 do końca lutego i odbierz saturator SodaStream w promocyjnej cenie. Oferta ograniczona czasowo!",
    deadline: "28.02.2026",
    price: "6 669 zł",
    ctaText: "Umów pokaz i dowiedz się więcej",
  },
  giftBanner: { active: false },
};

// ═══════════════════════════════════════════════════════════
// PALETTE A: Świeża Kuchnia
// ═══════════════════════════════════════════════════════════
const C = {
  primary: "#E8722A",
  primaryLight: "#F5924F",
  primaryDark: "#C45A1A",
  secondary: "#4A9B5F",
  secondaryLight: "#5FB876",
  accent: "#D64545",
  bg: "#FFF8F0",
  bgAlt: "#FFFFFF",
  dark: "#1A3A2A",
  darkLight: "#254A38",
  text: "#2D1F14",
  textMed: "#6B5344",
  textLight: "#A08B7A",
  card: "#FFFFFF",
  border: "rgba(45,31,20,0.08)",
};

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
const font = `'Nunito', sans-serif`;
const fontSerif = `'Fraunces', Georgia, serif`;

const S = {
  page: { fontFamily: font, color: C.text, background: C.bg, lineHeight: 1.7, margin: 0, WebkitFontSmoothing: "antialiased" },
  section: { padding: "80px 20px", maxWidth: 1100, margin: "0 auto" },
  sectionAlt: { background: C.bgAlt },
  h2: { fontFamily: fontSerif, fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: C.text, marginBottom: 12, lineHeight: 1.2 },
  subtitle: { fontSize: 17, color: C.textMed, marginBottom: 40, maxWidth: 600 },
  btn: {
    display: "inline-flex", alignItems: "center", gap: 8, background: C.primary, color: "#fff",
    border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 16, fontWeight: 700,
    fontFamily: font, cursor: "pointer", textDecoration: "none", transition: "all 0.25s ease",
    boxShadow: `0 4px 16px ${C.primary}40`,
  },
  btnOutline: {
    display: "inline-flex", alignItems: "center", gap: 8, background: "transparent",
    color: C.text, border: `2px solid ${C.border}`, borderRadius: 50, padding: "12px 28px",
    fontSize: 15, fontWeight: 600, fontFamily: font, cursor: "pointer", textDecoration: "none",
    transition: "all 0.25s ease",
  },
  card: {
    background: C.card, borderRadius: 20, padding: "32px 24px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: `1px solid ${C.border}`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
};

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL HOOK
// ═══════════════════════════════════════════════════════════
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROMO TOP BAR
// ═══════════════════════════════════════════════════════════
function PromoBar({ onClose }) {
  if (!CONFIG.promotion.active) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.secondary} 0%, ${C.secondaryLight} 100%)`,
      color: "#fff", padding: "10px 20px", fontSize: 14, textAlign: "center",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap",
    }}>
      <span>{CONFIG.promotion.emoji} {CONFIG.promotion.text}</span>
      <a href={CONFIG.promotion.linkUrl} style={{
        color: "#fff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3,
      }}>{CONFIG.promotion.linkText} →</a>
      <button onClick={onClose} style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer",
        fontSize: 18, padding: "0 0 0 8px", lineHeight: 1,
      }}>×</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STICKY NAV
// ═══════════════════════════════════════════════════════════
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["O mnie", "Thermomix", "Kalkulator", "Opinie", "FAQ", "Kontakt"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,248,240,0.95)" : C.bg,
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      {/* Main bar */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: fontSerif, fontSize: 20, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>
            {CONFIG.brandName}
          </div>
          <div style={{ fontSize: 11, color: C.textLight, letterSpacing: "0.06em" }}>Thermomix®</div>
        </a>

        {/* Desktop menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="desktop-only">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "")}`} style={{
              textDecoration: "none", color: C.textMed, fontSize: 14, fontWeight: 600,
              transition: "color 0.2s",
            }}>{l}</a>
          ))}
        </div>

        {/* Phone + CTA always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href={`tel:${CONFIG.phoneFormatted}`} style={{
            textDecoration: "none", color: C.text, fontWeight: 700, fontSize: 15,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 18 }}>📞</span>
            <span className="phone-text">{CONFIG.phone}</span>
          </a>
          <a href="#rezerwacja" style={{
            ...S.btn, padding: "10px 22px", fontSize: 14,
          }}>Umów prezentację</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.text, padding: 4,
          }}>☰</button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: C.bgAlt, borderTop: `1px solid ${C.border}`, padding: "12px 20px",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "")}`} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "12px 0", textDecoration: "none", color: C.text,
              fontWeight: 600, fontSize: 15, borderBottom: `1px solid ${C.border}`,
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════
function Hero() {
  return (
    <section style={{
      background: `linear-gradient(170deg, ${C.bg} 0%, #FFF0E0 50%, ${C.bg} 100%)`,
      padding: "80px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: -80, right: -80, width: 300, height: 300,
        borderRadius: "50%", background: `${C.primary}08`, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -60, width: 200, height: 200,
        borderRadius: "50%", background: `${C.secondary}08`, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{
            display: "inline-block", background: `${C.primary}12`, color: C.primary,
            fontSize: 13, fontWeight: 700, padding: "6px 18px", borderRadius: 50,
            letterSpacing: "0.04em", marginBottom: 24,
          }}>{CONFIG.tagline}</div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 style={{
            fontFamily: fontSerif, fontSize: "clamp(36px, 7vw, 60px)", fontWeight: 800,
            color: C.text, lineHeight: 1.1, marginBottom: 16, margin: "0 0 16px",
          }}>
            Gotowanie może być{" "}
            <span style={{
              color: C.primary,
              backgroundImage: `linear-gradient(120deg, ${C.primary}20 0%, ${C.primary}20 100%)`,
              backgroundRepeat: "no-repeat", backgroundSize: "100% 35%", backgroundPosition: "0 88%",
            }}>przyjemnością</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, color: C.textMed, marginBottom: 32, lineHeight: 1.7, padding: "0 10px" }}>
            Cześć, jestem Kasia! Pokażę Ci, jak Thermomix® odmieni Twoje gotowanie — oszczędź czas, jedz zdrowiej i odkryj radość w kuchni.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <a href="#rezerwacja" style={S.btn}>Umów darmowy pokaz →</a>
            <a href="#thermomix" style={S.btnOutline}>Dowiedz się więcej</a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div style={{
            display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap",
            fontSize: 14, color: C.textMed,
          }}>
            {["🏠 Pokazy u Ciebie w domu", "📺 Pokazy online na żywo", "🆓 Zawsze za darmo"].map((t, i) => (
              <span key={i} style={{
                background: C.bgAlt, padding: "8px 16px", borderRadius: 50,
                border: `1px solid ${C.border}`, fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// PROMO SECTION
// ═══════════════════════════════════════════════════════════
function PromoSection() {
  if (!CONFIG.promoSection.active) return null;
  return (
    <section style={{ background: `linear-gradient(135deg, ${C.primary}10 0%, ${C.accent}08 100%)`, padding: "40px 20px" }}>
      <Reveal>
        <div style={{
          maxWidth: 800, margin: "0 auto", textAlign: "center",
          background: C.card, borderRadius: 24, padding: "40px 32px",
          border: `2px solid ${C.primary}20`, boxShadow: `0 8px 32px ${C.primary}10`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.accent, marginBottom: 8, letterSpacing: "0.06em" }}>
            🎁 AKTUALNA PROMOCJA
          </div>
          <h3 style={{ fontFamily: fontSerif, fontSize: "clamp(22px, 4vw, 30px)", color: C.text, marginBottom: 12, fontWeight: 700 }}>
            {CONFIG.promoSection.title}
          </h3>
          <p style={{ fontSize: 16, color: C.textMed, marginBottom: 8 }}>{CONFIG.promoSection.description}</p>
          <p style={{ fontSize: 14, color: C.textLight, marginBottom: 20 }}>
            Oferta ważna do <strong style={{ color: C.accent }}>{CONFIG.promoSection.deadline}</strong> · Cena TM7: <strong>{CONFIG.promoSection.price}</strong>
          </p>
          <a href="#rezerwacja" style={S.btn}>{CONFIG.promoSection.ctaText} →</a>
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
    <section id="omnie" style={{ ...S.sectionAlt, padding: "80px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
        <Reveal style={{ flex: "0 0 auto" }}>
          <div style={{
            width: 220, height: 220, borderRadius: 28,
            background: `linear-gradient(135deg, ${C.primary}18 0%, ${C.secondary}18 100%)`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: `2px dashed ${C.primary}30`, position: "relative",
          }}>
            <span style={{ fontSize: 72 }}>👩‍🍳</span>
            <span style={{ fontSize: 12, color: C.textLight, marginTop: 8, fontWeight: 500 }}>Zdjęcie wkrótce</span>
          </div>
        </Reveal>

        <Reveal delay={0.15} style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ ...S.h2, marginBottom: 16 }}>Cześć, jestem Kasia!</h2>
          <div style={{ fontSize: 16, color: C.textMed, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 14 }}>
              Gotowanie to moja pasja od lat. Gotuję codziennie dla mojej dużej rodziny — i uwielbiam każdą chwilę spędzoną w kuchni. Znajomi mówią, że mam do tego talent, ja mówię, że po prostu kocham dobrze karmić bliskich.
            </p>
            <p style={{ marginBottom: 14 }}>
              A Thermomix? Zabawna historia — dostałam go w prezencie i byłam oburzona. <em>„Ja umiem gotować! Po co mi to?!"</em> Ale ciekawość wygrała. I okazało się, że Thermomix nie zastępuje umiejętności — on je wzmacnia. Moje zupy, ciasta i obiady weszły na zupełnie nowy poziom. A przede wszystkim odzyskałam czas na to, co kocham najbardziej.
            </p>
            <p style={{ marginBottom: 14 }}>
              Dziś chcę to samo pokazać Tobie. Nie jestem typową sprzedawczynią — jestem osobą, która sama nie wierzyła, a teraz nie wyobraża sobie kuchni bez Thermomixa.
            </p>
            <p>
              Przyjadę do Ciebie, ugotuję, porozmawiamy przy dobrej kawie. Zero presji, 100% smaku. Pokazy prowadzę w Trójmieście, a jeśli jesteś dalej — zapraszam na pokaz online na żywo!
            </p>
          </div>

          <div style={{
            marginTop: 24, padding: "20px 24px", borderRadius: 16,
            background: `${C.primary}08`, borderLeft: `4px solid ${C.primary}`,
            fontStyle: "italic", color: C.textMed, fontSize: 15, lineHeight: 1.7,
          }}>
            „Dostałam Thermomix w prezencie i byłam pewna, że go nie potrzebuję. Dziś nie wyobrażam sobie bez niego ani jednego dnia w kuchni."
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// WHAT TO EXPECT AT THE SHOW
// ═══════════════════════════════════════════════════════════
function WhatToExpect() {
  const items = [
    { icon: "👀", title: "Zobaczysz Thermomix w akcji", desc: "Pokażę Ci na żywo jak działa" },
    { icon: "🍳", title: "Wspólnie ugotujemy", desc: "Pełny posiłek w ok. godziny" },
    { icon: "🧺", title: "Przywiozę składniki", desc: "Nie musisz nic przygotowywać" },
    { icon: "🍽️", title: "Spróbujesz potraw", desc: "Degustacja tego co ugotujemy" },
    { icon: "🆓", title: "Bezpłatnie i bez zobowiązań", desc: "Zero presji zakupowej" },
  ];
  return (
    <section style={{ padding: "80px 20px", background: C.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={S.h2}>Co Cię czeka na pokazie?</h2></Reveal>
        <Reveal delay={0.1}><p style={S.subtitle}>Pokaz to wspólne gotowanie, degustacja i rozmowa. Bez prezentacji slajdów, bez presji.</p></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08} style={{ flex: "1 1 160px", maxWidth: 200 }}>
              <div style={{
                ...S.card, textAlign: "center", padding: "28px 16px",
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{it.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 6 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: C.textLight }}>{it.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.6}>
          <a href="#rezerwacja" style={{ ...S.btn, marginTop: 32 }}>Brzmi dobrze? Umów się →</a>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// BENEFITS
// ═══════════════════════════════════════════════════════════
function Benefits() {
  const items = [
    { icon: "⏱️", title: "Oszczędność czasu", desc: "Obiad w 20-30 minut. Thermomix kroi, miesza, gotuje i gotuje na parze — jednocześnie.", color: C.primary },
    { icon: "🥗", title: "Zdrowe jedzenie", desc: "Wiesz dokładnie co jesz. Bez konserwantów, bez sztucznych dodatków. Pełna kontrola.", color: C.secondary },
    { icon: "📱", title: "80 000+ przepisów", desc: "Platforma Cookidoo® z przepisami krok po kroku. Nawet jeśli nigdy nie gotowałeś.", color: C.accent },
    { icon: "🔧", title: "1 urządzenie zamiast 20", desc: "Thermomix® zastępuje ponad 20 urządzeń kuchennych. Mniej sprzętów, więcej miejsca.", color: C.primary },
    { icon: "💰", title: "Oszczędność pieniędzy", desc: "Gotowanie w domu zamiast jedzenia na mieście. Nawet kilkaset złotych miesięcznie.", color: C.secondary },
    { icon: "🌍", title: "Smaki całego świata", desc: "Kuchnia tajska, indyjska, włoska — kulinarne podróże bez wychodzenia z domu.", color: C.accent },
  ];
  return (
    <section id="thermomix" style={{ ...S.sectionAlt, padding: "80px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={S.h2}>Jedno urządzenie. Nieskończone możliwości.</h2></Reveal>
        <Reveal delay={0.1}><p style={S.subtitle}>Thermomix® TM7 to Twój osobisty sous chef. Oto dlaczego warto:</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <div style={{ ...S.card, textAlign: "left", borderTop: `3px solid ${it.color}` }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{it.icon}</div>
                <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 19, color: C.text, marginBottom: 8 }}>{it.title}</div>
                <div style={{ fontSize: 15, color: C.textMed, lineHeight: 1.7 }}>{it.desc}</div>
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
  const costOut = 35;
  const costHome = 12;
  const savings = people * meals * 4.3 * (costOut - costHome);
  const yearly = savings * 12;

  return (
    <section id="kalkulator" style={{ padding: "80px 20px", background: C.bg }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={S.h2}>Ile możesz zaoszczędzić?</h2></Reveal>
        <Reveal delay={0.1}><p style={S.subtitle}>Policz, ile wydajesz na jedzenie na mieście — a ile byś wydał gotując w domu z Thermomixem.</p></Reveal>

        <Reveal delay={0.2}>
          <div style={{ ...S.card, padding: "36px 32px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Ile osób w rodzinie?</span>
                <span style={{ fontWeight: 800, color: C.primary, fontSize: 20, fontFamily: fontSerif }}>{people}</span>
              </div>
              <input type="range" min={1} max={8} value={people} onChange={e => setPeople(+e.target.value)}
                style={{ width: "100%", accentColor: C.primary, height: 6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textLight }}>
                <span>1</span><span>8+</span>
              </div>
            </label>

            <label style={{ display: "block", marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Ile razy w tygodniu jesz na mieście?</span>
                <span style={{ fontWeight: 800, color: C.primary, fontSize: 20, fontFamily: fontSerif }}>{meals}</span>
              </div>
              <input type="range" min={0} max={7} value={meals} onChange={e => setMeals(+e.target.value)}
                style={{ width: "100%", accentColor: C.primary, height: 6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textLight }}>
                <span>0</span><span>codziennie</span>
              </div>
            </label>

            <div style={{
              background: `linear-gradient(135deg, ${C.primary}10 0%, ${C.secondary}10 100%)`,
              borderRadius: 16, padding: "24px", textAlign: "center",
            }}>
              <div style={{ fontSize: 14, color: C.textMed, marginBottom: 4 }}>Szacowana oszczędność</div>
              <div style={{ fontFamily: fontSerif, fontSize: 44, fontWeight: 800, color: C.primary, lineHeight: 1 }}>
                {Math.round(savings)} zł
              </div>
              <div style={{ fontSize: 14, color: C.textMed, marginTop: 4 }}>miesięcznie</div>
              <div style={{
                marginTop: 12, fontSize: 16, fontWeight: 700, color: C.secondary,
                background: `${C.secondary}10`, padding: "8px 16px", borderRadius: 50, display: "inline-block",
              }}>
                💰 {Math.round(yearly).toLocaleString("pl-PL")} zł rocznie!
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <a href="#rezerwacja" style={S.btn}>Chcesz zobaczyć to w akcji? →</a>
            </div>
            <p style={{ fontSize: 12, color: C.textLight, textAlign: "center", marginTop: 12 }}>
              * Szacunek na podstawie średnich cen (posiłek na mieście ~35 zł/os., w domu ~12 zł/os.)
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════
function Testimonials() {
  const items = [
    { text: "Nie wierzyłam, że jedno urządzenie może zastąpić tyle sprzętów. Teraz gotuję codziennie w 30 minut — z trójką dzieci to zbawienie.", author: "Mama trójki dzieci" },
    { text: "Myślałem, że Thermomix to gadżet. Ale mój niedzielny meal prep skrócił się z 4 godzin do półtorej. Rewolucja.", author: "Tata, fan zdrowego jedzenia" },
    { text: "Gotuję od 30 lat i byłam pewna, że żaden robot mi nie jest potrzebny. Myliłam się — moja zupa krem nigdy nie była lepsza.", author: "Doświadczona kucharka" },
    { text: "Robię domowe hummusy, pasty curry, mleko roślinne — rzeczy, na które ręcznie potrzebowałam godzin. Jakość nieporównywalna.", author: "Studentka, miłośniczka zdrowej kuchni" },
  ];
  return (
    <section id="opinie" style={{ ...S.sectionAlt, padding: "80px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={S.h2}>Co mówią użytkownicy Thermomixa</h2></Reveal>
        <Reveal delay={0.1}><p style={S.subtitle}>Thermomix zmienił życie milionów rodzin na świecie.</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div style={{ ...S.card, textAlign: "left" }}>
                <div style={{ color: C.primary, fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 15, color: C.textMed, lineHeight: 1.75, fontStyle: "italic", marginBottom: 16 }}>
                  „{it.text}"
                </p>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>— {it.author}</div>
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
    { q: "Ile kosztuje Thermomix?", a: "Nowy Thermomix® TM7 kosztuje 6 669 zł. Są też opcje ratalne i regularne promocje (np. aktualna: SodaStream za 49 zł przy zakupie TM7). Wszystkie szczegóły omówię na pokazie!" },
    { q: "Czy mogę kupić na raty?", a: "Tak! Oferuję wygodne raty 0% oraz inne formy finansowania. Szczegóły na spotkaniu." },
    { q: "Czym różni się od zwykłego robota kuchennego?", a: "Thermomix gotuje! Nie tylko kroi i miesza, ale też podgrzewa, gotuje na parze, waży składniki i prowadzi Cię krok po kroku na dużym 10-calowym ekranie dotykowym. Zastępuje ponad 20 urządzeń kuchennych." },
    { q: "Jak wygląda pokaz?", a: "Gotuję u Ciebie (lub online na żywo) pełny posiłek w ok. 1 godziny. Możesz zaprosić rodzinę i znajomych — im więcej osób, tym więcej zabawy! A dla gospodarzy prezentacji Vorwerk ma specjalny katalog prezentów." },
    { q: "Czy pokaz jest naprawdę darmowy?", a: "Tak, całkowicie. Przyjeżdżam, gotuję, rozmawiamy. Nie musisz niczego kupować." },
    { q: "Co jeśli nie umiem gotować?", a: "To najlepsza wiadomość! Thermomix prowadzi Cię krok po kroku. Wystarczy dodawać składniki — resztę robi sam. Idealny dla początkujących." },
    { q: "Czy można zamówić pokaz online?", a: "Oczywiście! Prowadzę pokazy na żywo przez internet. Gotuję w swojej kuchni, a Ty oglądasz i zadajesz pytania. Wygodne jeśli jesteś poza Trójmiastem." },
    { q: "Mam starszy model (TM5/TM6) — czy mogę wymienić?", a: "Tak! Vorwerk oferuje program wymiany starszych modeli na nowy TM7. Na pokazie opowiem o szczegółach i aktualnych warunkach." },
  ];
  return (
    <section id="faq" style={{ padding: "80px 20px", background: C.bg }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal><h2 style={{ ...S.h2, textAlign: "center" }}>Najczęstsze pytania</h2></Reveal>
        <div style={{ marginTop: 32 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                borderBottom: `1px solid ${C.border}`,
                overflow: "hidden",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between",
                  alignItems: "center", fontFamily: font,
                }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: C.text, paddingRight: 16 }}>{it.q}</span>
                  <span style={{
                    fontSize: 20, color: C.primary, fontWeight: 300,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease", flexShrink: 0,
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: open === i ? 300 : 0, overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}>
                  <p style={{
                    fontSize: 15, color: C.textMed, lineHeight: 1.75,
                    padding: "0 0 20px", margin: 0,
                  }}>{it.a}</p>
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
// BOOKING (CTA SECTION)
// ═══════════════════════════════════════════════════════════
function Booking() {
  return (
    <section id="rezerwacja" style={{
      background: `linear-gradient(160deg, ${C.dark} 0%, ${C.darkLight} 100%)`,
      padding: "80px 20px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontFamily: fontSerif, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            Umów się na darmowy pokaz gotowania
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.7 }}>
            Pokaz trwa ok. 1 godziny. Gotuję na żywo — zobaczysz Thermomix w akcji i spróbujesz potraw. Zero zobowiązań.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
            {["🍳 Gotowanie na żywo", "🏠 U Ciebie w domu", "📺 Lub online", "👩‍👧‍👦 Zaproś znajomych", "🆓 Za darmo"].map((b, i) => (
              <span key={i} style={{
                background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)",
                padding: "8px 16px", borderRadius: 50, fontSize: 14, fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.15)",
              }}>{b}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <a href={CONFIG.googleCalendarLink} style={{
            ...S.btn, padding: "18px 40px", fontSize: 18,
            boxShadow: `0 8px 32px ${C.primary}50`,
          }}>📅 Wybierz termin w kalendarzu</a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 16 }}>
            Zostaniesz przekierowany/a do Google Calendar
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  return (
    <section id="kontakt" style={{ ...S.sectionAlt, padding: "80px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={S.h2}>Masz pytania? Napisz do mnie!</h2></Reveal>
        <Reveal delay={0.1}><p style={S.subtitle}>Chętnie odpowiem na wszystkie pytania. Napisz, zadzwoń lub kliknij — jak Ci wygodniej.</p></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
          {[
            { icon: "💬", label: "WhatsApp", value: CONFIG.phone, href: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappDefaultMsg)}`, color: "#25D366" },
            { icon: "📞", label: "Telefon", value: CONFIG.phone, href: `tel:${CONFIG.phoneFormatted}`, color: C.primary },
            { icon: "📧", label: "Email", value: CONFIG.email, href: `mailto:${CONFIG.email}`, color: C.accent },
          ].map((ch, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <a href={ch.href} target={ch.label === "WhatsApp" ? "_blank" : undefined} rel="noopener noreferrer" style={{
                ...S.card, textDecoration: "none", display: "block", textAlign: "center",
                borderTop: `3px solid ${ch.color}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{ch.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 4 }}>{ch.label}</div>
                <div style={{ fontSize: 14, color: C.textMed }}>{ch.value}</div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32 }}>
            {[
              { icon: "📸", label: "Instagram", href: CONFIG.instagram },
              { icon: "📘", label: "Facebook", href: CONFIG.facebook },
              { icon: "🎵", label: "TikTok", href: CONFIG.tiktok },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
                background: `${C.text}06`, padding: "10px 20px", borderRadius: 50,
                color: C.textMed, fontSize: 14, fontWeight: 600,
                border: `1px solid ${C.border}`, transition: "all 0.2s",
              }}>{s.icon} {s.label}</a>
            ))}
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
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 100%)`,
      padding: "60px 20px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontFamily: fontSerif, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            🎁 Poleć mnie znajomym!
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 24 }}>
            Znasz kogoś, kto chciałby gotować szybciej i zdrowiej? Wyślij link — a ja zadbam o resztę!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleCopy} style={{
              ...S.btn, background: "#fff", color: C.primary, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              {copied ? "✅ Skopiowano!" : "📋 Skopiuj link"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Hej! Polecam Ci Kasię — świetna przedstawicielka Thermomix. Zobacz: ${url}`)}`}
              target="_blank" rel="noopener noreferrer" style={{
                ...S.btn, background: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
              }}>💬 Wyślij przez WhatsApp</a>
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
    <footer style={{
      background: C.dark, padding: "40px 20px", textAlign: "center",
    }}>
      <div style={{ fontFamily: fontSerif, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
        {CONFIG.brandName}
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{CONFIG.tagline}</div>
      <a href={`tel:${CONFIG.phoneFormatted}`} style={{
        color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 16, fontWeight: 600,
      }}>📞 {CONFIG.phone}</a>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 24 }}>
        © 2026 {CONFIG.brandName} · {CONFIG.domain}
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// FLOATING WHATSAPP
// ═══════════════════════════════════════════════════════════
function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappDefaultMsg)}`}
      target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, textDecoration: "none",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        animation: "whatsapp-pulse 2s infinite",
      }}>💬</a>
  );
}

// ═══════════════════════════════════════════════════════════
// GLOBAL STYLES (injected)
// ═══════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800&family=Nunito:wght@400;500;600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; scroll-padding-top: 80px; }
      body { overflow-x: hidden; }
      @keyframes whatsapp-pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
        50% { box-shadow: 0 4px 32px rgba(37,211,102,0.7), 0 0 0 12px rgba(37,211,102,0.1); }
      }
      @media (max-width: 768px) {
        .desktop-only { display: none !important; }
        .mobile-menu-btn { display: block !important; }
        .phone-text { display: none; }
      }
      @media (min-width: 769px) {
        .mobile-menu-btn { display: none !important; }
      }
      input[type="range"] { -webkit-appearance: none; appearance: none; border-radius: 6px; outline: none; }
      input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: ${C.primary}; cursor: pointer; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    `}</style>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={S.page}>
      <GlobalStyles />
      {promoVisible && <PromoBar onClose={() => setPromoVisible(false)} />}
      <Nav scrolled={scrolled} />
      <Hero />
      <PromoSection />
      <About />
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
    </div>
  );
}
