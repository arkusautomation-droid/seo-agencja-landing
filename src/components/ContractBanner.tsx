export default function ContractBanner() {
  return (
    <section className="!pt-0 !pb-0">
      <div className="container">
        <div
          className="contract-pulse p-8 sm:p-10 rounded-2xl relative overflow-hidden bg-gradient-to-br from-[rgba(155,98,255,0.08)] to-[rgba(155,98,255,0.02)] border border-[rgba(155,98,255,0.20)] flex items-center gap-7 max-sm:flex-col max-sm:text-center max-sm:p-6 reveal"
          style={{ maxWidth: 900, marginLeft: "auto", marginRight: "auto", marginTop: 10 }}
        >
          {/* Glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(155,98,255,0.15),transparent_70%)] pointer-events-none" />

          {/* 1M badge — animated */}
          <div
            className="badge-1m rounded-2xl bg-gradient-to-br from-accent-dark to-accent-light"
            style={{ flexShrink: 0, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 10 }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 24, lineHeight: 1, letterSpacing: "-0.02em" }}>
              1M
            </span>
          </div>

          <div className="relative z-10">
            <h2 className="text-xl sm:text-[22px] font-semibold mb-2">
              {"Umowa "}<span className="text-gradient">bezterminowa</span>{" z 1-miesięcznym wypowiedzeniem"}
            </h2>
            <p className="text-sm text-text-dim leading-relaxed">
              {"Nie trzymamy klientów na siłę. "}
              <strong className="text-text-secondary">
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
