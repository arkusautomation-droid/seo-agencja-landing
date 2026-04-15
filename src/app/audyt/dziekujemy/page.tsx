import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dziękujemy za zamówienie — AD Awards",
  description:
    "Twoja subskrypcja jest aktywna. W ciągu 24 godzin skontaktuje się z Tobą nasz specjalista SEO.",
};

const steps = [
  {
    num: 1,
    title: "Audyt Twojej strony",
    desc: "W pierwszym tygodniu przeanalizujemy Twoją stronę i konkurencję",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Strategia i optymalizacja",
    desc: "Wdrożymy zmiany techniczne i rozpoczniemy budowę treści",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Pierwsze efekty",
    desc: "Po 4-8 tygodniach zobaczysz wzrost pozycji i ruchu organicznego",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
        <path d="M3 20l4-4 4 2 4-6 6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ThankYouPage() {
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
                background: "rgba(34, 197, 94, 0.08)",
                borderColor: "rgba(34, 197, 94, 0.25)",
                color: "#22c55e",
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
              Dziękujemy za{" "}
              <span className="text-gradient">zamówienie!</span>
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
              Twoja subskrypcja jest aktywna. W ciągu 24 godzin skontaktuje się
              z Tobą nasz specjalista SEO.
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
                          background: "linear-gradient(135deg, #6037FF, #9B62FF)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                          boxShadow: "0 0 20px rgba(155, 98, 255, 0.3)",
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
                              "linear-gradient(180deg, rgba(155, 98, 255, 0.3), rgba(155, 98, 255, 0.05))",
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
                          background: "rgba(155, 98, 255, 0.08)",
                          border: "1px solid rgba(155, 98, 255, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-accent-light)",
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
              {/* Primary: orange gradient */}
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 3px 20px rgba(249, 115, 22, 0.3)",
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
                Wróć do oferty
              </a>

              {/* Secondary: border button */}
              <a
                href="/audyt/"
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
                Bezpłatny audyt SEO
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
