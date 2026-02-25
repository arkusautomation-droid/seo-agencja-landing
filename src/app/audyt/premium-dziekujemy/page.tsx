import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dziękujemy za zamówienie audytu premium — AD Awards",
  description:
    "Twoje zamówienie szczegółowego audytu SEO zostało przyjęte. Wynik audytu otrzymasz w ciągu 5-7 dni roboczych.",
};

const steps = [
  {
    num: 1,
    title: "Potwierdzenie email",
    desc: "Na Twój adres email wysłaliśmy potwierdzenie zamówienia wraz ze szczegółami",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Analiza Twojej strony",
    desc: "Nasi eksperci przeprowadzą dogłębną analizę techniczną, treści i profilu linków",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Przygotowanie raportu",
    desc: "Stworzymy szczegółowy raport z rekomendacjami i priorytetyzacją działań SEO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15h6M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Konsultacja z ekspertem",
    desc: "Omówimy wyniki audytu i strategię podczas indywidualnej konsultacji online",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PremiumThankYouPage() {
  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero section */}
        <section
          style={{
            paddingTop: 80,
            paddingBottom: 64,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container reveal" style={{ position: "relative", zIndex: 10 }}>
            {/* Section badge */}
            <div
              className="section-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 24,
                background: "rgba(59, 130, 246, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.25)",
                color: "#3b82f6",
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path
                  d="M13.3 4.3L6.5 11.1 2.7 7.3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Zamówienie przyjęte
            </div>

            {/* Heading */}
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 20,
              }}
            >
              Dziękujemy za zamówienie{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                audytu!
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 18,
                color: "var(--color-text-dim)",
                lineHeight: 1.6,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 0,
              }}
            >
              Szczegółowy audyt SEO + strategia. Nasz zespół ekspertów już
              rozpoczyna pracę nad Twoim projektem.
            </p>
          </div>
        </section>

        {/* Steps card section */}
        <section style={{ paddingTop: 0, paddingBottom: 80, textAlign: "center" }}>
          <div
            className="container reveal"
            style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}
          >
            <div
              className="glass-card"
              style={{
                padding: "48px 40px",
                textAlign: "left",
              }}
            >
              {/* Card heading */}
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: 40,
                  textAlign: "center",
                }}
              >
                Co dalej?
              </h2>

              {/* Steps timeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {steps.map((step, i) => (
                  <div key={step.num} style={{ display: "flex", gap: 20, position: "relative" }}>
                    {/* Left column: number + connecting line */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {/* Numbered circle */}
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                      >
                        {step.num}
                      </div>

                      {/* Connecting line */}
                      {i < steps.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 32,
                            background:
                              "linear-gradient(180deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.05))",
                          }}
                        />
                      )}
                    </div>

                    {/* Right column: icon + text */}
                    <div style={{ paddingBottom: i < steps.length - 1 ? 32 : 0, paddingTop: 2 }}>
                      {/* Icon */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: "rgba(59, 130, 246, 0.08)",
                          border: "1px solid rgba(59, 130, 246, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#60a5fa",
                          marginBottom: 12,
                        }}
                      >
                        {step.icon}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--color-text)",
                          marginBottom: 6,
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: 15,
                          color: "var(--color-text-dim)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline info */}
              <div
                style={{
                  marginTop: 40,
                  padding: "16px 24px",
                  borderRadius: 12,
                  background: "rgba(59, 130, 246, 0.06)",
                  border: "1px solid rgba(59, 130, 246, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 22, height: 22, color: "#3b82f6", flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#60a5fa",
                  }}
                >
                  Wynik audytu w ciągu 5-7 dni roboczych
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="reveal"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                marginTop: 40,
                flexWrap: "wrap",
              }}
            >
              {/* Primary: blue gradient */}
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 3px 20px rgba(59, 130, 246, 0.3)",
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                  <path
                    d="M13 8H3M3 8l4-4M3 8l4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Wróć do strony głównej
              </a>

              {/* Secondary: border button */}
              <a
                href="/seo-oferta/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Zobacz nasze pakiety SEO
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                  <path
                    d="M3 8h10M13 8l-4-4M13 8l-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
