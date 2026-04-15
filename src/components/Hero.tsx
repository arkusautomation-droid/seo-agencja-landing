const stats = [
  { num: "96,3%", label: "Polaków korzysta z Google" },
  { num: "46%", label: "zapytań to lokalne" },
  { num: "23%", label: "Polaków szuka w AI" },
  { num: "14,6%", label: "konwersja z SEO" },
];

export default function Hero() {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 40, position: "relative", overflow: "hidden", textAlign: "center" }}>
      {/* Grid pattern */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.6, zIndex: 0 }} />

      {/* Purple glow — hero (hidden) */}
      {/* Secondary glow — pink accent (hidden) */}

      <div className="container reveal" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Badge */}
        <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
          <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
            <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
          </svg>
          Oferta SEO + GEO 2026
        </div>

        <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
          {"OFERTA "}
          <span className="text-gradient">{"SEO + AI + SXO"}</span>
        </h1>

        <p style={{ fontSize: 18, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
          {"Bezterminowa umowa z 1-miesięcznym wypowiedzeniem."}
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" as const, gap: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="text-gradient" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, marginBottom: 2 }}>
                {s.num}
              </div>
              <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 128,
        background: "linear-gradient(to top, #030116, transparent)",
        pointerEvents: "none",
        zIndex: 1,
      }} />
    </section>
  );
}
