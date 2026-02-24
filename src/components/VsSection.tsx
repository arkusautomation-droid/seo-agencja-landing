const cards = [
  {
    type: "old" as const,
    title: "\u201EMasz 197 fraz w TOP 10\u201D",
    text: "Brzmi \u015Bwietnie \u2014 ale ile z nich generuje telefony? Wi\u0119kszo\u015B\u0107 agencji raportuje widoczno\u015B\u0107, nie pieni\u0105dze. Pozycja 8 na fraz\u0119 o 10 wyszukiwaniach = 0 klient\u00F3w.",
  },
  {
    type: "new" as const,
    title: "\u201E47 zapyta\u0144 z Google warte ~23 000 z\u0142\u201D",
    text: "Targetujemy frazy z intencj\u0105 zakupow\u0105. Raportujemy ruch \u2192 formularze \u2192 telefony \u2192 szacowany przych\u00F3d. Widzisz ROI, nie metryki pr\u00F3\u017Cno\u015Bci.",
  },
  {
    type: "old" as const,
    title: "\u201EPozycjonowanie fraz bez limitu\u201D",
    text: "Agencje dodaj\u0105 setki fraz long tail, kt\u00F3rych nikt nie wyszukuje. Raport wygl\u0105da imponuj\u0105co \u2014 Twoje konto bankowe nie.",
  },
  {
    type: "new" as const,
    title: "Priorytet: frazy, po kt\u00F3rych ludzie kupuj\u0105",
    text: "Analizujemy intencj\u0119, wolumen i warto\u015B\u0107 klikni\u0119cia. Skupiamy bud\u017Cet na frazach, kt\u00F3re nap\u0119dzaj\u0105 biznes \u2014 nie statystyki.",
  },
];

export default function VsSection() {
  return (
    <section className="relative !pt-4 !pb-4" data-glow="red">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {"Porównanie"}
        </div>
        <h2 className="section-title reveal">
          {"Dlaczego "}
          <span className="text-gradient-orange">{"zmieniamy zasady gry"}</span>
        </h2>
        <p className="section-sub reveal">
          {"Typowe oferty SEO mierzą pozycje. My mierzymy Twój przychód."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 reveal-stagger" style={{ gap: 25, maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl transition-all duration-300 ${
                c.type === "old"
                  ? "border-l-3 border-l-red vs-card-old"
                  : "border-l-3 border-l-green vs-card-new"
              }`}
              style={{ padding: 33 }}
            >
              <div
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[1.5px] mb-4 font-semibold px-2.5 py-1 rounded-full ${
                  c.type === "old"
                    ? "text-red bg-red-glow vs-badge-old"
                    : "text-green bg-green-glow vs-badge-new"
                }`}
              >
                {c.type === "old" ? (
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                    <path d="M4 12L12 4M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {c.type === "old" ? "Stare podej\u015Bcie" : "Podej\u015Bcie AdAwards"}
              </div>
              <h3 className="text-base font-semibold mb-3 text-text-secondary">{c.title}</h3>
              <p className="text-[13px] text-text-dim leading-[1.7]">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
