export default function GuaranteeSection() {
  return (
    <section className="relative" data-glow="green-orange">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 1l1.5 3.5H14l-3 2.5 1.5 4L8 8.5 3.5 11l1.5-4L2 4.5h4.5z" fill="currentColor" />
          </svg>
          Gwarancje
        </div>
        <h2 className="section-title text-gradient-white-green reveal">Nasze gwarancje</h2>
        <p className="section-sub reveal">
          {"Dwie rzeczy, których nie oferuje żadna inna agencja naraz"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 reveal-stagger" style={{ gap: 24, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          {/* Activity guarantee */}
          <div style={{ position: "relative", borderRadius: 16, textAlign: "center", background: "linear-gradient(to bottom right, rgba(34,197,94,0.08), rgba(34,197,94,0.01))", border: "1px solid rgba(34,197,94,0.20)", padding: "32px 28px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 150, height: 150, background: "radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ width: 56, height: 56, marginLeft: "auto", marginRight: "auto", marginBottom: 16, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-green-glow)", color: "var(--color-green)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-secondary" style={{ fontSize: 20, marginBottom: 14 }}>
              {"Gwarancja realizacji aktywności"}
            </h3>
            <p className="text-text-dim" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 10 }}>
              {"Każdego miesiąca wdrażamy "}
              <strong className="text-text-secondary">
                {"100% aktywności przewidzianych w Twoim pakiecie"}
              </strong>
              {" \u2014 content, optymalizacja, off-site, raportowanie. Bez opóźnień."}
            </p>
            <p className="text-green font-semibold text-sm">
              {"Płacisz za konkretne działania. Dostajesz każde z nich."}
            </p>
          </div>

          {/* Contract guarantee */}
          <div style={{ position: "relative", borderRadius: 16, textAlign: "center", background: "linear-gradient(to bottom right, rgba(155,98,255,0.08), rgba(155,98,255,0.01))", border: "2px solid var(--color-accent)", padding: "32px 28px", boxShadow: "0 0 0 4px rgba(155,98,255,0.08), 0 0 30px rgba(155,98,255,0.10)", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 150, height: 150, background: "radial-gradient(circle, rgba(155,98,255,0.1), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ width: 56, height: 56, marginLeft: "auto", marginRight: "auto", marginBottom: 16, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-accent-glow)", color: "var(--color-accent-light)", border: "1px solid rgba(155,98,255,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <line x1="12" y1="16" x2="12" y2="18" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-secondary" style={{ fontSize: 20, marginBottom: 14 }}>Umowa bez locka</h3>
            <p className="text-text-dim" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 10 }}>
              {"Umowa "}
              <strong className="text-text-secondary">
                {"bezterminowa z 1-miesięcznym okresem wypowiedzenia."}
              </strong>
              {" Możesz odejść na koniec dowolnego miesiąca \u2014 bez kar, bez haczyków, bez małego druku."}
            </p>
            <p className="text-text-dim" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 10 }}>
              {"Nie trzymamy klientów na siłę. Nasi klienci zostają, bo widzą wyniki \u2014 nie dlatego, że muszą. Nasza retencja: "}
              <strong className="text-text-secondary">94%.</strong>
            </p>
            <p className="text-accent-light font-semibold text-sm">
              Zostajecie z wyboru, nie z przymusu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
