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
    <section className="relative" data-glow="orange">
      <div className="container relative z-10">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M2 14l4-5 3 3 5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ROI
        </div>
        <h2 className="section-title text-gradient-white-yellow reveal">{"Liczby, które przekonują szefa"}</h2>
        <p className="section-sub reveal" style={{ fontSize: 32, fontWeight: 700 }}>Dlaczego SEO to inwestycja, nie koszt</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 reveal-stagger" style={{ gap: 20, maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className="glass-card text-center transition-all duration-300 hover:-translate-y-1"
              style={{ padding: "28px 24px" }}
            >
              <div className="font-bold text-gradient-warm leading-none" style={{ fontSize: 40, marginBottom: 6 }}>
                {c.big}
              </div>
              <div className="text-text-secondary font-medium" style={{ fontSize: 14, marginBottom: 10 }}>{c.mid}</div>
              <div className="text-text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
