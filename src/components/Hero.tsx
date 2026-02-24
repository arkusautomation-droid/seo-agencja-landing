const stats = [
  { num: "96,3%", label: "Polaków korzysta z Google" },
  { num: "46%", label: "zapytań to lokalne" },
  { num: "91,8%", label: "fraz to long tail" },
  { num: "14,6%", label: "konwersja z SEO" },
];

export default function Hero() {
  return (
    <section className="pt-36 pb-20 text-center relative overflow-hidden border-t-0!">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Purple glow — hero */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(50%_50%,#321F74_0%,#01041A_100%)] pointer-events-none opacity-70" />

      {/* Secondary glow — pink accent */}
      <div className="absolute top-[100px] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(50%_50%,rgba(236,72,153,0.15)_0%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 reveal">
        {/* Badge */}
        <div className="section-badge mx-auto mb-8">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
          </svg>
          Oferta SEO &middot; Luty 2026
        </div>

        <h1 className="text-[clamp(36px,5.5vw,64px)] font-bold leading-[1.1] mb-6 tracking-[-0.03em]">
          {"SEO, które przynosi"}
          <br />
          <span className="text-gradient">{"klientów, nie raporty"}</span>
        </h1>

        <p className="text-lg text-text-dim max-w-[600px] mx-auto mb-12 leading-relaxed">
          Nie sprzedajemy pozycji fraz — sprzedajemy realny wzrost ruchu,
          {"zapytań i przychodów z Google. Mierzysz efekty, nie obietnice."}
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-6 sm:gap-12 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient leading-none mb-1">
                {s.num}
              </div>
              <div className="text-[12px] sm:text-[13px] text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030116] to-transparent pointer-events-none" />
    </section>
  );
}
