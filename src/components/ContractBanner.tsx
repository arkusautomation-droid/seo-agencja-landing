export default function ContractBanner() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container">
        <div
          className="contract-pulse"
          style={{
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
            padding: "28px 32px",
            gap: 20,
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(to bottom right, rgba(155,98,255,0.08), rgba(155,98,255,0.02))",
            border: "1px solid rgba(155,98,255,0.20)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(155,98,255,0.15), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* 1M badge — animated */}
          <div
            className="badge-1m"
            style={{
              flexShrink: 0,
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              borderRadius: 16,
              background: "linear-gradient(to bottom right, var(--color-accent-dark), var(--color-accent-light))",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 24, lineHeight: 1, letterSpacing: "-0.02em" }}>
              1M
            </span>
          </div>

          <div style={{ position: "relative", zIndex: 10 }}>
            <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
              {"Umowa "}<span className="text-gradient">bezterminowa</span>{" z 1-miesięcznym wypowiedzeniem"}
            </h2>
            <p style={{ color: "var(--color-text-dim)", fontSize: 14, lineHeight: 1.6 }}>
              {"Nie trzymamy klientów na siłę. "}
              <strong style={{ color: "var(--color-text-secondary)" }}>
                {"Nie ma locka na 12 miesięcy."}
              </strong>{" "}
              {"Zostajecie, bo widzicie efekty — nie dlatego, że musicie. Wypowiedzenie na koniec dowolnego miesiąca, bez kar i haczyków. Nasza retencja to 94% — bo działamy tak, żebyście chcieli z nami być."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
