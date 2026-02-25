import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brandbook i identyfikacja wizualna — AdAwards",
  description: "Logo, kolorystyka, typografia, guidelines — spójna marka od fundamentów. Identyfikacja wizualna, rebranding i naming.",
};

const offers = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Identyfikacja wizualna",
    text: "Logo, kolory, typografia, brandbook — fundament profesjonalnej marki",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    title: "Rebranding",
    text: "Odświeżenie marki od A do Z, gdy obecna identyfikacja nie nadąża za rozwojem firmy",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    title: "Copywriting & Naming",
    text: "Nazwa firmy, claim, tone of voice — słowa które budują markę",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 3v18M3 12h18" /><path d="M16 6l-4 4-4-4" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Animacje 3D",
    text: "Wizualizacje produktów i reklamy, które przyciągają uwagę",
  },
];

const steps = [
  { num: "01", title: "Brief kreatywny", text: "Poznajemy Twoją firmę, wartości, grupę docelową i cele biznesowe" },
  { num: "02", title: "Koncepcja i moodboard", text: "Przygotowujemy kierunki wizualne i prezentujemy propozycje" },
  { num: "03", title: "Projekt i realizacja", text: "Tworzymy logo, paletę kolorów, typografię i wszystkie materiały" },
  { num: "04", title: "Delivery i wdrożenie", text: "Przekazujemy komplet plików i pomagamy wdrożyć nową identyfikację" },
];

const pricing = [
  {
    name: "Logo + Mini Brandbook",
    price: "3 000",
    desc: "Solidny start dla Twojej marki",
    features: [
      "Logo w 3 wariantach",
      "Paleta kolorów",
      "Typografia",
      "Wizytówka",
      "Papier firmowy",
    ],
  },
  {
    name: "Pełny Brandbook",
    price: "6 000",
    desc: "Kompletna identyfikacja wizualna",
    recommended: true,
    features: [
      "Wszystko z Mini Brandbook +",
      "Guidelines użycia logo",
      "Social media kit",
      "Szablony prezentacji",
      "Druki firmowe",
      "Mockupy",
    ],
  },
  {
    name: "Kompletny Rebranding",
    price: "12 000",
    desc: "Nowa marka od strategii po wdrożenie",
    features: [
      "Analiza obecnej marki",
      "Nowa strategia marki",
      "Pełny brandbook",
      "Wdrożenie na wszystkich kanałach",
      "Materiały print + digital",
    ],
  },
];

const stats = [
  { value: "15+", label: "lat doświadczenia" },
  { value: "200+", label: "zrealizowanych projektów" },
  { value: "360°", label: "strategia → design → wdrożenie → marketing" },
  { value: "✓", label: "Google Partner" },
];

const contacts = [
  { name: "Dariusz Kolber", email: "d.kolber@adawards.pl", phone: "+48 693 181 765" },
  { name: "Arkadiusz Szustak", email: "a.szustak@adawards.pl", phone: "+48 795 999 111" },
];

export default function BrandbookDesign() {
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
                <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="8" r="2" fill="currentColor" />
              </svg>
              Branding i identyfikacja
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Brandbook i identyfikacja wizualna,<br />
              <span className="text-gradient">która wyróżnia</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
              Logo, kolorystyka, typografia, guidelines — spójna marka od fundamentów
            </p>
            <a href="#cennik" className="btn-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
              Zobacz pakiety
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 128, background: "linear-gradient(to top, #030116, transparent)", pointerEvents: "none", zIndex: 1 }} />
        </section>

        {/* Co oferujemy */}
        <section data-glow="orange">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Co oferujemy
            </div>
            <h2 className="section-title text-gradient-white-orange">Usługi brandingowe</h2>
            <p className="section-sub">Kompleksowe budowanie marki — od nazwy po animacje 3D</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {offers.map((b, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-accent-glow)", color: "var(--color-accent-light)", border: "1px solid rgba(155,98,255,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proces */}
        <section data-glow="blue">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M1 8h14M8 1v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Proces
            </div>
            <h2 className="section-title text-gradient-white-blue">Jak pracujemy</h2>
            <p className="section-sub">4 kroki od briefu do gotowej identyfikacji wizualnej</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {steps.map((s) => (
                <div key={s.num} className="glass-card" style={{ padding: "28px 24px" }}>
                  <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                    <span className="text-gradient">{s.num}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pakiety / Cennik */}
        <section id="cennik" data-glow="green">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1v14M4 4h8M5 8h6M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
              Pakiety
            </div>
            <h2 className="section-title text-gradient-white-green">Pakiety brandingowe</h2>
            <p className="section-sub">Wszystkie ceny netto w PLN. Indywidualna wycena po poznaniu zakresu.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {pricing.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: "32px 28px", position: "relative", border: plan.recommended ? "1px solid rgba(155,98,255,0.3)" : undefined }}>
                  {plan.recommended && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "white", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 999 }}>
                      Polecany
                    </div>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 14, color: "var(--color-text-muted)", marginRight: 4 }}>od</span>
                    <span className="text-gradient" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 14, color: "var(--color-text-muted)", marginLeft: 4 }}>zł netto</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ fontSize: 14, color: "var(--color-text-dim)", padding: "6px 0", display: "flex", alignItems: "center", gap: 8 }}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
                          <path d="M3 8l4 4 6-8" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dlaczego AdAwards */}
        <section data-glow="purple">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Dlaczego my
            </div>
            <h2 className="section-title">Dlaczego <span className="text-gradient">AdAwards</span></h2>
            <p className="section-sub">Kompleksowa obsługa: strategia, design, wdrożenie, marketing</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
              {stats.map((s, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div className="text-gradient" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>
                    {s.value}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--color-text-dim)", lineHeight: 1.5 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Kontakt */}
        <section style={{ paddingBottom: 64 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="glass-card" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto", padding: "48px 40px" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                Porozmawiajmy o <span className="text-gradient">Twojej marce</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--color-text-dim)", lineHeight: 1.6, marginBottom: 28 }}>
                Bezpłatna konsultacja — opowiedz nam o swojej firmie, a przygotujemy koncepcję i wycenę dopasowane do Twoich potrzeb.
              </p>

              {/* Kontakt */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32, textAlign: "left" }}>
                {contacts.map((c) => (
                  <div key={c.name} style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(155,98,255,0.10)" }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6 }}>{c.name}</p>
                    <p style={{ fontSize: 13, color: "var(--color-text-dim)", marginBottom: 2 }}>
                      <a href={`mailto:${c.email}`} style={{ color: "var(--color-accent-light)", textDecoration: "none" }}>{c.email}</a>
                    </p>
                    <p style={{ fontSize: 13, color: "var(--color-text-dim)" }}>
                      <a href={`tel:${c.phone.replace(/\s/g, "")}`} style={{ color: "var(--color-text-dim)", textDecoration: "none" }}>{c.phone}</a>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:d.kolber@adawards.pl" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Bezpłatna konsultacja
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
