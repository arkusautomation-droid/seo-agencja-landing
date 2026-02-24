export default function ContractBanner() {
  return (
    <section className="pt-0 pb-10">
      <div className="container">
        <div className="max-w-[900px] mx-auto p-8 sm:p-10 rounded-2xl relative overflow-hidden bg-gradient-to-br from-[rgba(155,98,255,0.08)] to-[rgba(155,98,255,0.02)] border border-[rgba(155,98,255,0.20)] flex items-center gap-7 max-sm:flex-col max-sm:text-center max-sm:p-6">
          {/* Glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(155,98,255,0.15),transparent_70%)] pointer-events-none" />

          {/* Icon */}
          <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent-dark to-accent-light">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl sm:text-[22px] font-semibold mb-2">
              {"Umowa "}<span className="text-gradient">bezterminowa</span>{" z 1-miesięcznym wypowiedzeniem"}
            </h3>
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
