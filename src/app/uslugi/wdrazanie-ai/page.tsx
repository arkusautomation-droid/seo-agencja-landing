import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wdrażanie AI w firmie — AdAwards",
  description: "Chatboty, automatyzacja procesów, AI w content marketingu, integracja z CRM — realne wdrożenia, mierzalne efekty.",
};

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h4" />
      </svg>
    ),
    title: "Chatboty AI",
    text: "Obsługa klienta 24/7, trenowanie na danych firmy, integracja z CRM. Chatbot odpowiada na pytania, kwalifikuje leady i umawia spotkania — bez udziału człowieka.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Automatyzacja procesów",
    text: "Automatyzacja powtarzalnych zadań: oferty, maile, raporty. AI przejmuje rutynowe czynności, a Twój zespół skupia się na tym, co naprawdę ważne.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 20V10M18 20V4M6 20v-4" />
        <path d="M2 4h2M8 4h2M14 4h2M20 4h2" />
      </svg>
    ),
    title: "AI w content marketingu",
    text: "Generowanie treści, optymalizacja SEO, personalizacja komunikacji. AI tworzy, analizuje i optymalizuje content — szybciej i na większą skalę.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M13 7l-4 4 4 4" />
      </svg>
    ),
    title: "Integracja z CRM",
    text: "Połączenie AI z istniejącymi narzędziami i systemami. Dane przepływają automatycznie między CRM, e-mailem, e-commerce i narzędziami marketingowymi.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Analityka predykcyjna",
    text: "Przewidywanie trendów, zachowań klientów, optymalizacja budżetów. AI analizuje dane historyczne i prognozuje wyniki — decyzje oparte na danych, nie intuicji.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Szkolenia zespołu",
    text: "Warsztaty z prompt engineeringu i efektywnego wykorzystania AI. Uczymy Twój zespół, jak pracować z AI w codziennych zadaniach — praktycznie, nie teoretycznie.",
  },
];

const pricing = [
  {
    name: "Audyt AI + Roadmapa",
    price: "2 500",
    priceNote: "jednorazowo",
    features: [
      "Analiza procesów firmy",
      "Identyfikacja obszarów do automatyzacji",
      "Roadmapa wdrożeń z priorytetami",
      "Szacunkowy ROI dla każdego obszaru",
    ],
  },
  {
    name: "Chatbot AI",
    price: "od 5 000",
    priceNote: "setup + 800 zł/mies.",
    features: [
      "Chatbot na stronę www",
      "Trenowanie na danych firmy",
      "Integracja z CRM / formularzem",
      "Obsługa klienta 24/7",
      "Raportowanie i analityka",
    ],
  },
  {
    name: "Automatyzacja procesów",
    price: "od 8 000",
    priceNote: "netto",
    features: [
      "Automatyzacja powtarzalnych zadań",
      "Integracja AI z narzędziami firmy",
      "Szkolenie zespołu",
      "Wdrożenie i konfiguracja",
    ],
  },
  {
    name: "Pełne wdrożenie AI",
    price: "od 15 000",
    priceNote: "netto",
    recommended: true,
    features: [
      "Audyt AI + roadmapa",
      "Chatbot AI na stronę",
      "Automatyzacja procesów",
      "Content AI (generowanie treści)",
      "Szkolenia dla zespołu",
      "Wsparcie techniczne 12 miesięcy",
    ],
  },
];

const whyUs = [
  {
    stat: "15+",
    label: "lat doświadczenia",
    desc: "na rynku marketingu cyfrowego i technologii",
  },
  {
    stat: "200+",
    label: "zrealizowanych projektów",
    desc: "dla firm z różnych branż w Polsce i za granicą",
  },
  {
    stat: "360°",
    label: "kompleksowa obsługa",
    desc: "strategia, design, wdrożenie, marketing — wszystko pod jednym dachem",
  },
  {
    stat: "Google",
    label: "Partner",
    desc: "certyfikowany partner Google z dostępem do najnowszych narzędzi",
  },
];

export default function WdrazanieAI() {
  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>

        {/* ═══ Hero ═══ */}
        <section style={{ paddingTop: 72, paddingBottom: 48, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.6, zIndex: 0 }} />
          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <div className="section-badge" style={{ display: "inline-flex", marginBottom: 32 }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Wdrażanie AI
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Wdrażanie AI<br />
              <span className="text-gradient">w Twojej firmie</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--color-text-dim)", lineHeight: 1.7, maxWidth: 640, marginLeft: "auto", marginRight: "auto", marginBottom: 36 }}>
              Automatyzacja, która oszczędza czas i pieniądze — chatboty, automatyzacja procesów, AI w marketingu, integracja z CRM.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#kontakt" className="btn-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
                Umów bezpłatną konsultację AI
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#pakiety" className="btn-ghost" style={{ padding: "16px 28px", fontSize: 16 }}>
                Zobacz pakiety
              </a>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 128, background: "linear-gradient(to top, #030116, transparent)", pointerEvents: "none", zIndex: 1 }} />
        </section>

        {/* ═══ Co wdrażamy — 6 cards ═══ */}
        <section data-glow="purple">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Co wdrażamy
            </div>
            <h2 className="section-title text-gradient-white-purple">Rozwiązania AI dla Twojej firmy</h2>
            <p className="section-sub">Realne wdrożenia, które przynoszą mierzalne efekty — od chatbotów po analitykę predykcyjną</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {services.map((s, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-accent-glow)", color: "var(--color-accent-light)", border: "1px solid rgba(155,98,255,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Pakiety cenowe ═══ */}
        <section id="pakiety" data-glow="green">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1v14M4 4h8M5 8h6M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
              Pakiety
            </div>
            <h2 className="section-title text-gradient-white-green">Pakiety wdrożeniowe</h2>
            <p className="section-sub">Wszystkie ceny netto w PLN. Zakres ustalany indywidualnie po konsultacji.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {pricing.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: "32px 24px", position: "relative", border: plan.recommended ? "1px solid rgba(155,98,255,0.3)" : undefined, display: "flex", flexDirection: "column" }}>
                  {plan.recommended && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "white", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>
                      Najczęściej wybierany
                    </div>
                  )}
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{plan.name}</h3>
                  <div style={{ marginBottom: 16, marginTop: 12 }}>
                    <span className="text-gradient" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: "var(--color-text-muted)", marginLeft: 6 }}>zł {plan.priceNote}</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ fontSize: 14, color: "var(--color-text-dim)", padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }}>
                          <path d="M3 8l4 4 6-8" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#kontakt" className={plan.recommended ? "btn-primary" : "btn-ghost"} style={{ marginTop: 20, padding: "12px 24px", fontSize: 14, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
                    Zapytaj o wycenę
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Dlaczego AdAwards ═══ */}
        <section data-glow="blue">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l1.5 4.5H14l-3.5 2.5 1.5 4.5L8 10l-4 2.5 1.5-4.5L2 5.5h4.5z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              Dlaczego AdAwards
            </div>
            <h2 className="section-title text-gradient-white-blue">Doświadczenie, któremu możesz zaufać</h2>
            <p className="section-sub">Kompleksowa obsługa: strategia, design, wdrożenie, marketing — wszystko pod jednym dachem</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {whyUs.map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ marginBottom: 8 }}>
                    <span className="text-gradient" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>{item.stat}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6 }}>{item.label}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA + Kontakt ═══ */}
        <section id="kontakt" data-glow="purple" style={{ paddingBottom: 64 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="glass-card" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto", padding: "48px 40px" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                <span className="text-gradient">Umów bezpłatną konsultację AI</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--color-text-dim)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
                Pokażemy, gdzie AI może przyspieszyć Twoją firmę, ile możesz zaoszczędzić i jak wygląda proces wdrożenia — bez zobowiązań.
              </p>

              {/* Contact persons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 28, textAlign: "left" }}>
                {/* Dariusz */}
                <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(155,98,255,0.06)", border: "1px solid rgba(155,98,255,0.12)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>Dariusz Kolber</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <a href="mailto:d.kolber@adawards.pl" style={{ fontSize: 14, color: "var(--color-accent-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M1 4.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      d.kolber@adawards.pl
                    </a>
                    <a href="tel:+48693181765" style={{ fontSize: 14, color: "var(--color-accent-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                        <path d="M3.5 1.5h3l1.5 4-2 1.5a8 8 0 0 0 3.5 3.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A12 12 0 0 1 2 3a1.5 1.5 0 0 1 1.5-1.5z" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      +48 693 181 765
                    </a>
                  </div>
                </div>
                {/* Arkadiusz */}
                <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(155,98,255,0.06)", border: "1px solid rgba(155,98,255,0.12)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>Arkadiusz Szustak</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <a href="mailto:a.szustak@adawards.pl" style={{ fontSize: 14, color: "var(--color-accent-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M1 4.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      a.szustak@adawards.pl
                    </a>
                    <a href="tel:+48795999111" style={{ fontSize: 14, color: "var(--color-accent-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                        <path d="M3.5 1.5h3l1.5 4-2 1.5a8 8 0 0 0 3.5 3.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A12 12 0 0 1 2 3a1.5 1.5 0 0 1 1.5-1.5z" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      +48 795 999 111
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:a.szustak@adawards.pl" className="btn-primary" style={{ padding: "14px 32px" }}>
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
