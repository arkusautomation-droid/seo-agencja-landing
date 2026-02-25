import AdAwardsLogo from "./AdAwardsLogo";

export default function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid var(--color-border)", padding: "48px 0 40px" }}>
      {/* Top glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 200, background: "radial-gradient(50% 50%, rgba(155,98,255,0.06) 0%, transparent 100%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* CTA block */}
        <div className="text-center rounded-3xl bg-gradient-to-br from-[rgba(24,19,66,0.8)] to-[rgba(36,31,54,0.6)] border border-[rgba(155,98,255,0.15)] shadow-[0_3px_20px_rgba(155,98,255,0.12)] reveal" style={{ maxWidth: 700, marginLeft: "auto", marginRight: "auto", padding: "56px 40px", marginBottom: 32 }}>
          <AdAwardsLogo style={{ height: 32, marginLeft: "auto", marginRight: "auto", marginBottom: 20 }} />
          <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            {"Gotowy na "}<span className="text-gradient">{"wzrost z SEO"}</span>{"?"}
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 32, color: "var(--color-text-dim)", maxWidth: 448, marginLeft: "auto", marginRight: "auto" }}>
            {"Bezpłatna konsultacja. Pokażemy, ile ruchu i leadów możesz zyskać. Bez zobowiązań."}
          </p>
          <a href="#pakiety" className="btn-primary" style={{ marginTop: 8, padding: "16px 36px", fontSize: 16 }}>
            Zobacz pakiety
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Info */}
        <div className="text-center text-text-muted">
          <p style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>
            {"Wszystkie ceny netto w PLN. Umowa bezterminowa z 1-miesięcznym wypowiedzeniem. Bez ukrytych kosztów."}
          </p>
          <p className="text-text-dim" style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, opacity: 0.6 }}>
            {"© 2026 AdAwards. Wszelkie prawa zastrzeżone."}
          </p>
          <div style={{ marginTop: 12 }}>
            <a href="/seo-oferta/blog/" className="footer-subtle-link">Blog</a>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: "0 8px" }}>{" · "}</span>
            <a href="/seo-oferta/audyt/" className="footer-subtle-link">Audyt SEO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
