import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strony internetowe i sklepy — AdAwards",
  description: "Profesjonalne strony internetowe i sklepy online. Zaprojektowane z myślą o Twoim sukcesie online. Od projektu UX, przez design, aż po kodowanie i wdrożenie.",
};

const whyDedicated = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Przyciąga uwagę",
    text: "Unikalny design wyróżnia Twoją firmę na tle konkurencji",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Działa 24/7",
    text: "Twoje najskuteczniejsze narzędzie sprzedażowe, które nigdy nie śpi",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Zwiększa konwersję",
    text: "Funkcjonalności dopasowane do Twojej grupy docelowej",
  },
];

const expertCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Zwiększają sprzedaż",
    text: "Dzięki optymalizacji konwersji i precyzyjnie dobranym treściom",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Budują wizerunek",
    text: "Nowoczesny design podkreśla profesjonalizm Twojej marki",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Są niezawodne",
    text: "Bezpieczeństwo, szybkość i zgodność z RODO to nasz priorytet",
  },
];

const advantages = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Pełna personalizacja",
    text: "Nie tworzymy kopii; każda strona jest wyjątkowa i zaprojektowana na miarę",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Najnowocześniejsze technologie",
    text: "Twoja strona będzie działać szybko, wyglądać świetnie i spełniać wymogi techniczne",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Skalowalność",
    text: "Strony rosną razem z Twoim biznesem; nowe funkcje to żaden problem",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "SEO od początku",
    text: "Dzięki optymalizacji już na etapie budowy, Twoja witryna ma przewagę w wynikach wyszukiwania",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Brief i projekt UX",
    text: "Poznajemy potrzeby, analizujemy rynek i tworzymy intuicyjny układ strony",
  },
  {
    num: "02",
    title: "Projekt graficzny",
    text: "Design który wyróżnia się i odzwierciedla charakter marki",
  },
  {
    num: "03",
    title: "Kodowanie front-endu",
    text: "Zamieniamy projekt graficzny w pełni responsywną stronę",
  },
  {
    num: "04",
    title: "Programowanie back-endu",
    text: "Dodajemy funkcje ułatwiające zarządzanie i integracje",
  },
  {
    num: "05",
    title: "Copywriting i SEO",
    text: "Angażujące treści które sprzedają",
  },
  {
    num: "06",
    title: "Testowanie i wdrożenie",
    text: "Każdy element sprawdzany przed publikacją",
  },
];

const technologies = [
  { name: "HTML5 i CSS3", desc: "Estetyka i nowoczesność" },
  { name: "PHP8", desc: "Dynamika i niezawodność" },
  { name: "Lazy Load i WebP", desc: "Błyskawiczne ładowanie" },
  { name: "CMS WordPress", desc: "Intuicyjne zarządzanie treścią" },
];

const pricing = [
  {
    name: "BASIC",
    price: "4 500",
    desc: "Projekt na szablonie dedykowanym",
    features: [
      "Formularz kontaktowy",
      "Pełna responsywność",
      "Zgodność z RODO",
      "Do 5 podstron",
      "Blog",
      "CMS WordPress",
      "5 zdjęć stockowych",
      "Copywriting",
    ],
  },
  {
    name: "START",
    price: "12 000",
    desc: "Rozbudowana strona firmowa",
    recommended: true,
    features: [
      "6 podstron (główna, o nas, oferta, blog, galeria, kontakt)",
      "Architektura treści",
      "Autorska grafika",
      "UX i CTA",
      "Mapa Google",
      "Panel CMS",
      "Zgodność z RODO",
      "Copywriting",
    ],
  },
  {
    name: "PRO",
    price: "18 000",
    desc: "Strona z zaawansowanymi funkcjami",
    features: [
      "8 podstron + ofertowa",
      "20 powielań podstron",
      "Analiza UX",
      "Rozbudowane formularze",
      "Strefa klienta",
      "Struktura pod SEO",
      "Copywriting w cenie",
    ],
  },
  {
    name: "PREMIUM",
    price: "25 000",
    desc: "Kompleksowy projekt z integracjami",
    features: [
      "9 podstron",
      "30 powielań podstron",
      "Integracje API z systemami zewnętrznymi",
      "Struktura pod SEO",
      "Optymalizacja SEO w cenie",
    ],
  },
];

const additionalServices = [
  { name: "Dodatkowy język", price: "1 000 zł" },
  { name: "Interaktywna mapa", price: "3 000 zł" },
  { name: "Serwis i opieka", price: "od 600 zł/kwartał" },
  { name: "Optymalizacja SEO", price: "2 000 zł" },
];

const realizacje = [
  "podprojekt.pl",
  "linneo.pl",
  "zloty-widok.pl",
  "eurometall.pl",
  "lion-ochrona.pl",
  "gloxar.pl",
  "scorpio.pl",
  "optyksoroka.com",
  "filipekmeble.pl",
];

const whyAdAwards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    value: "15+",
    label: "lat doświadczenia",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "200+",
    label: "zrealizowanych projektów",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    value: "360°",
    label: "kompleksowa obsługa",
    desc: "strategia — design — wdrożenie — marketing",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    value: "Google",
    label: "Partner",
  },
];

const contacts = [
  { name: "Dariusz Kolber", email: "d.kolber@adawards.pl", phone: "+48 693 181 765" },
  { name: "Arkadiusz Szustak", email: "a.szustak@adawards.pl", phone: "+48 795 999 111" },
];

export default function StronySklepy() {
  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <section style={{ paddingTop: 64, paddingBottom: 40, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.6, zIndex: 0 }} />
          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <div className="section-badge" style={{ display: "inline-flex", marginBottom: 32 }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M2 3h12v10H2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Strony i sklepy
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Tworzymy strony<br />
              <span className="text-gradient">internetowe</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
              Zaprojektowane z myślą o Twoim sukcesie online. Od projektu UX, przez design, aż po kodowanie i wdrożenie.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#cennik" className="btn-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
                Zobacz cennik
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#kontakt" className="btn-ghost" style={{ padding: "16px 36px", fontSize: 16 }}>
                Skontaktuj się
              </a>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 128, background: "linear-gradient(to top, #030116, transparent)", pointerEvents: "none", zIndex: 1 }} />
        </section>

        {/* Dlaczego strona dedykowana */}
        <section data-glow="purple">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Dlaczego strona dedykowana
            </div>
            <h2 className="section-title text-gradient-white-purple">Dlaczego strona dedykowana?</h2>
            <p className="section-sub">Strona internetowa to fundament Twojej obecności online i najważniejsza wizytówka firmy</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {whyDedicated.map((card, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px 28px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-accent-glow)", color: "var(--color-accent-light)", border: "1px solid rgba(155,98,255,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Twoja wizja w rękach ekspertów */}
        <section data-glow="blue">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Nasze strony
            </div>
            <h2 className="section-title text-gradient-white-blue">Twoja wizja w rękach ekspertów</h2>
            <p className="section-sub">Strony, które tworzymy, nie tylko wyglądają — one pracują na Twój sukces</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {expertCards.map((card, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px 28px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-blue-glow)", color: "var(--color-blue)", border: "1px solid rgba(59,130,246,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nasze atuty */}
        <section data-glow="green">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Nasze atuty
            </div>
            <h2 className="section-title text-gradient-white-green">Nasze atuty</h2>
            <p className="section-sub">To, co sprawia, że nasi klienci nam ufają i wracają z kolejnymi projektami</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {advantages.map((card, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-green-glow)", color: "var(--color-green)", border: "1px solid rgba(34,197,94,0.15)", marginBottom: 16 }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proces tworzenia */}
        <section data-glow="orange">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M2 2v12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 10l3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Jak pracujemy
            </div>
            <h2 className="section-title text-gradient-white-orange">Proces tworzenia</h2>
            <p className="section-sub">6 kroków, które zamieniają Twój pomysł w profesjonalną stronę internetową</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {processSteps.map((step, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--color-orange)" }}>{step.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologie */}
        <section data-glow="blue">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M5 3l-3 5 3 5M11 3l3 5-3 5M9 2l-2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              Technologie
            </div>
            <h2 className="section-title text-gradient-white-blue">Technologie, z których korzystamy</h2>
            <p className="section-sub">Stawiamy na sprawdzone rozwiązania, które gwarantują szybkość i stabilność</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
              {technologies.map((tech) => (
                <div key={tech.name} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6 }}>{tech.name}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-dim)" }}>{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section id="cennik" data-glow="green">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1v14M4 4h8M5 8h6M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
              Cennik
            </div>
            <h2 className="section-title text-gradient-white-green">Przejrzyste ceny, realne rezultaty</h2>
            <p className="section-sub">Wszystkie ceny netto w PLN. Ostateczna wycena po poznaniu zakresu projektu.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {pricing.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: "32px 24px", position: "relative", border: plan.recommended ? "1px solid rgba(155,98,255,0.3)" : undefined }}>
                  {plan.recommended && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "white", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 999 }}>
                      Polecany
                    </div>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16, minHeight: 36 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>od </span>
                    <span className="text-gradient" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 14, color: "var(--color-text-muted)", marginLeft: 4 }}>zł netto</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ fontSize: 14, color: "var(--color-text-dim)", padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }}>
                          <path d="M3 8l4 4 6-8" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Usługi dodatkowe */}
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 20 }}>Usługi dodatkowe</h3>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                {additionalServices.map((s) => (
                  <div key={s.name} className="glass-card" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, color: "var(--color-text-dim)" }}>{s.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-accent-light)" }}>{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Realizacje */}
        <section data-glow="purple">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M4 8h8M4 5h8M4 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Realizacje
            </div>
            <h2 className="section-title text-gradient-white-purple">Zaufali nam</h2>
            <p className="section-sub">Firmy, dla których realizowaliśmy projekty stron internetowych</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 24 }}>
              {realizacje.map((name) => (
                <div key={name} className="glass-card" style={{ padding: "16px 28px", fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, opacity: 0.5 }}>
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dlaczego AdAwards */}
        <section data-glow="orange">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <polygon points="8 1 10 6 15 6 11 9 13 14 8 11 3 14 5 9 1 6 6 6" fill="currentColor" />
              </svg>
              Dlaczego my
            </div>
            <h2 className="section-title text-gradient-white-orange">Dlaczego AdAwards?</h2>
            <p className="section-sub">Doświadczenie, technologia i kompleksowe podejście — to nas wyróżnia</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 24 }}>
              {whyAdAwards.map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))", color: "var(--color-orange)", border: "1px solid rgba(249,115,22,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {item.icon}
                  </div>
                  <div className="text-gradient-warm" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{item.value}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 4 }}>{item.label}</div>
                  {item.desc && <div style={{ fontSize: 13, color: "var(--color-text-dim)", marginTop: 4 }}>{item.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kontakt CTA */}
        <section id="kontakt" data-glow="purple" style={{ paddingBottom: 64 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="glass-card" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto", padding: "48px 40px" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                Porozmawiajmy o <span className="text-gradient">Twoim projekcie</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--color-text-dim)", lineHeight: 1.6, marginBottom: 32 }}>
                Opisz swój pomysł — przygotujemy bezpłatną wycenę i propozycję realizacji.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 }}>
                {contacts.map((c) => (
                  <div key={c.name} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>{c.name}</div>
                    <a href={`mailto:${c.email}`} style={{ display: "block", fontSize: 14, color: "var(--color-accent-light)", textDecoration: "none", marginBottom: 4 }}>{c.email}</a>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} style={{ display: "block", fontSize: 14, color: "var(--color-text-dim)", textDecoration: "none" }}>{c.phone}</a>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:d.kolber@adawards.pl" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Napisz do nas
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="/" className="btn-ghost" style={{ padding: "14px 32px" }}>
                  Wróć na stronę główną
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
