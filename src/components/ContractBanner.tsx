export default function ContractBanner() {
  return (
    <section className="pt-10 pb-0 border-t-0!">
      <div className="container">
        <div className="max-w-[860px] mx-auto p-8 sm:px-9 rounded-2xl bg-[linear-gradient(135deg,rgba(249,115,22,0.08)_0%,rgba(249,115,22,0.02)_100%)] border-2 border-orange flex items-center gap-6 relative overflow-hidden max-sm:flex-col max-sm:text-center max-sm:p-6">
          {/* Glow */}
          <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(249,115,22,0.12),transparent_70%)] pointer-events-none" />

          {/* Icon */}
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-orange flex items-center justify-center">
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
            <h3 className="font-heading text-[22px] font-bold mb-1.5">
              Umowa <span className="text-orange">bezterminowa</span> z
              1-miesięcznym wypowiedzeniem
            </h3>
            <p className="text-sm text-text-dim leading-relaxed">
              Nie trzymamy klientów na siłę.{" "}
              <strong className="text-text">
                Nie ma locka na 12 miesięcy.
              </strong>{" "}
              Zostajecie, bo widzicie efekty — nie dlatego, że musicie.
              Wypowiedzenie na koniec dowolnego miesiąca, bez kar i haczyków.
              Nasza retencja to 94% — bo działamy tak, żebyście chcieli z nami
              być.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
