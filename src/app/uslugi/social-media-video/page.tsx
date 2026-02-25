import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social media i video — AdAwards",
  description:
    "Strategia social media, content, reels, kampanie reklamowe — od planu do wyników. Facebook, Instagram, TikTok, YouTube, LinkedIn.",
};

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    title: "Facebook & Instagram",
    text: "Posty, stories, reels, kampanie reklamowe na największych platformach.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M9 12a4 4 0 1 0 4-4" /><path d="M15 8V2" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 2v2" /><path d="M12 20v2" />
      </svg>
    ),
    title: "TikTok",
    text: "Produkcja krótkich video i kampanie na najszybciej rosnącej platformie.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "YouTube",
    text: "Video marketing, reklamy pre-roll i strategia kanału.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    title: "LinkedIn",
    text: "Employer branding, B2B marketing, budowanie pozycji eksperta.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Google Ads",
    text: "Setup, optymalizacja, remarketing, raportowanie wyników.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "E-commerce MIX",
    text: "Sprzedaż przez Google + Facebook — pełna strategia dla sklepów.",
  },
];

const platforms = ["Facebook", "Instagram", "TikTok", "YouTube", "LinkedIn", "Google Ads"];

const pricing = [
  {
    name: "1 kanał",
    price: "2 000",
    period: "/mies.",
    desc: "Podstawowa obsługa jednego kanału",
    features: [
      "Strategia",
      "12 postów / miesiąc",
      "Grafiki do postów",
      "Copywriting",
      "Moderacja",
      "Raport miesięczny",
    ],
  },
  {
    name: "2-3 kanały",
    price: "3 500",
    period: "/mies.",
    desc: "Strategia cross-channel z rozbudowanym contentem",
    recommended: true,
    features: [
      "Strategia cross-channel",
      "24-36 postów / miesiąc",
      "Stories / Reels",
      "Grafiki do postów",
      "Copywriting",
      "Moderacja",
      "Raporty miesięczne",
    ],
  },
  {
    name: "Full Service + Video",
    price: "6 000",
    period: "/mies.",
    desc: "Pełna obsługa z produkcją video i kampaniami",
    features: [
      "Wszystkie kanały",
      "Strategia kompleksowa",
      "Produkcja video (reels, shorts, TikTok)",
      "Kampanie płatne Meta / Google",
      "Grafiki, copy, moderacja",
      "Raport ROI",
    ],
  },
  {
    name: "Kampanie Google Ads",
    price: "1 500",
    period: "/mies. + budżet",
    desc: "Dedykowane zarządzanie kampaniami Google",
    features: [
      "Setup kampanii",
      "Optymalizacja",
      "Remarketing",
      "Raportowanie wyników",
    ],
  },
];

const whyUs = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "15+ lat doświadczenia",
    text: "Ponad dekada w branży digital. Wiemy, co działa — i dlaczego.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "200+ zrealizowanych projektów",
    text: "Strony, sklepy, kampanie, identyfikacje — szeroki wachlarz realizacji.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Kompleksowa obsługa",
    text: "Strategia, design, wdrożenie, marketing — wszystko w jednym miejscu.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Google Partner",
    text: "Certyfikowany partner Google — gwarancja jakości kampanii.",
  },
];

export default function SocialMediaVideo() {
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
                <polygon points="6 3 14 8 6 13 6 3" fill="currentColor" />
              </svg>
              Social media i video
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Social media i video,<br />
              <span className="text-gradient">które budują zasięg i sprzedaż</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
              Strategia, content, reels, kampanie reklamowe — od planu do wyników.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#cennik" className="btn-primary" style={{ padding: "16px 36px", fontSize: 16 }}>
                Zobacz pakiety
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#kontakt" className="btn-ghost" style={{ padding: "16px 36px", fontSize: 16 }}>
                Bezpłatny audyt profili
              </a>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 128, background: "linear-gradient(to top, #030116, transparent)", pointerEvents: "none", zIndex: 1 }} />
        </section>

        {/* Nasze usługi */}
        <section data-glow="orange">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Nasze usługi
            </div>
            <h2 className="section-title text-gradient-white-orange">Co robimy w social media</h2>
            <p className="section-sub">6 filarów naszej obsługi — od organiki po kampanie płatne</p>
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

        {/* Platformy */}
        <section data-glow="purple">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Platformy
            </div>
            <h2 className="section-title text-gradient-white-purple">Działamy tam, gdzie są Twoi klienci</h2>
            <p className="section-sub">Obsługujemy wszystkie kluczowe platformy</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 24 }}>
              {platforms.map((platform) => (
                <div key={platform} className="glass-card" style={{ padding: "16px 32px", fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)" }}>
                  {platform}
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
            <h2 className="section-title text-gradient-white-green">Pakiety miesięczne</h2>
            <p className="section-sub">Ceny netto w PLN. Budżet na reklamy płatne nie jest wliczony w cenę.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {pricing.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: "32px 28px", position: "relative", border: plan.recommended ? "1px solid rgba(155,98,255,0.3)" : undefined, display: "flex", flexDirection: "column" }}>
                  {plan.recommended && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "white", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 999 }}>
                      Polecany
                    </div>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>od </span>
                    <span className="text-gradient" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 14, color: "var(--color-text-muted)", marginLeft: 4 }}>zł netto{plan.period}</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
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
        <section data-glow="blue">
          <div className="container">
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Dlaczego my
            </div>
            <h2 className="section-title text-gradient-white-blue">Dlaczego AdAwards</h2>
            <p className="section-sub">Doświadczenie, kompetencje i efekty — to nas wyróżnia</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {whyUs.map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(59,130,246,0.08)", color: "var(--color-blue)", border: "1px solid rgba(59,130,246,0.15)", marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-glow="purple" style={{ paddingBottom: 32 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="glass-card" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto", padding: "48px 40px" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                Zamów <span className="text-gradient">strategię social media</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--color-text-dim)", lineHeight: 1.6, marginBottom: 28 }}>
                Bezpłatny audyt profili — pokażemy, co możemy poprawić i ile możesz zyskać.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#kontakt" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Bezpłatny audyt profili
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

        {/* Kontakt */}
        <section id="kontakt" style={{ paddingBottom: 64 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M14 11.5a2.5 2.5 0 0 1-2.5 2.5H4.5A2.5 2.5 0 0 1 2 11.5v-7A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Kontakt
            </div>
            <h2 className="section-title">Porozmawiajmy o Twojej marce</h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>Napisz lub zadzwoń — odpowiadamy w ciągu 24h</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
              <div className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>Dariusz Kolber</h3>
                <p style={{ fontSize: 14, color: "var(--color-text-dim)", marginBottom: 4 }}>
                  <a href="mailto:d.kolber@adawards.pl" style={{ color: "var(--color-accent-light)", textDecoration: "none" }}>d.kolber@adawards.pl</a>
                </p>
                <p style={{ fontSize: 14, color: "var(--color-text-dim)" }}>
                  <a href="tel:+48693181765" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>+48 693 181 765</a>
                </p>
              </div>
              <div className="glass-card" style={{ padding: "28px 24px", textAlign: "center" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>Arkadiusz Szustak</h3>
                <p style={{ fontSize: 14, color: "var(--color-text-dim)", marginBottom: 4 }}>
                  <a href="mailto:a.szustak@adawards.pl" style={{ color: "var(--color-accent-light)", textDecoration: "none" }}>a.szustak@adawards.pl</a>
                </p>
                <p style={{ fontSize: 14, color: "var(--color-text-dim)" }}>
                  <a href="tel:+48795999111" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>+48 795 999 111</a>
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
