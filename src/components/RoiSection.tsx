const cards = [
  {
    big: "14,6%",
    mid: "Konwersja z lead\u00F3w organicznych",
    desc: "vs. 1,7% z marketingu tradycyjnego. SEO przyci\u0105ga ludzi, kt\u00F3rzy ju\u017C szukaj\u0105 Twoich us\u0142ug.",
  },
  {
    big: "5\u00D7",
    mid: "Wy\u017Cszy ROAS ni\u017C reklamy p\u0142atne",
    desc: "Google Ads znika po wy\u0142\u0105czeniu bud\u017Cetu. SEO kumuluje warto\u015B\u0107 \u2014 im d\u0142u\u017Cej, tym taniej za klienta.",
  },
  {
    big: "6\u201312",
    mid: "Miesi\u0119cy do pozytywnego ROI",
    desc: "Od tego momentu SEO staje si\u0119 centrum zysku. W roku 2. koszty spadaj\u0105, a efekty rosn\u0105.",
  },
];

export default function RoiSection() {
  return (
    <section className="relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(50%_50%,rgba(155,98,255,0.06)_0%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="section-badge mx-auto flex justify-center">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M2 14l4-5 3 3 5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ROI
        </div>
        <h2 className="section-title">{"Liczby, które przekonują szefa"}</h2>
        <p className="section-sub">Dlaczego SEO to inwestycja, nie koszt</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[960px] mx-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="glass-card p-8 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-[48px] font-bold text-gradient leading-none mb-2">
                {c.big}
              </div>
              <div className="text-sm text-text-secondary mb-2 font-medium">{c.mid}</div>
              <div className="text-xs text-text-muted leading-[1.6]">
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
