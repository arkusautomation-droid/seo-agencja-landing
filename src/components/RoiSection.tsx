const cards = [
  {
    big: "14,6%",
    mid: "Konwersja z leadów organicznych",
    desc: "vs. 1,7% z marketingu tradycyjnego. SEO przyciąga ludzi, którzy już szukają Twoich usług.",
  },
  {
    big: "5×",
    mid: "Wyższy ROAS niż reklamy płatne",
    desc: "Google Ads znika po wyłączeniu budżetu. SEO kumuluje wartość — im dłużej, tym taniej za klienta.",
  },
  {
    big: "6–12",
    mid: "Miesięcy do pozytywnego ROI",
    desc: "Od tego momentu SEO staje się centrum zysku. W roku 2. koszty spadają, a efekty rosną.",
  },
];

export default function RoiSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">Liczby, które przekonują szefa</h2>
        <p className="section-sub">Dlaczego SEO to inwestycja, nie koszt</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-bg-card border border-border text-center"
            >
              <div className="font-heading text-[44px] font-bold text-orange leading-none mb-1">
                {c.big}
              </div>
              <div className="text-sm text-text-dim mb-2">{c.mid}</div>
              <div className="text-xs text-text-muted leading-[1.5]">
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
