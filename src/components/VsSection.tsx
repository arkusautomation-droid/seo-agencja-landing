const cards = [
  {
    type: "old" as const,
    title: "\u201EMasz 197 fraz w TOP 10\u201D",
    text: "Brzmi \u015Bwietnie, ale ile z nich jest widocznych w odpowiedziach AI? Wi\u0119kszo\u015B\u0107 agencji nie uwzgl\u0119dnia nowych kana\u0142\u00F3w wyszukiwania.",
  },
  {
    type: "new" as const,
    title: "Widoczno\u015B\u0107 tam, gdzie Twoi klienci szukaj\u0105: Google, AI i LLM",
    text: "GEO sprawia, \u017Ce Twoja firma pojawia si\u0119 w odpowiedziach ChatGPT, Google AI Overview i Gemini.",
  },
  {
    type: "old" as const,
    title: "Pozycjonowanie fraz bez limitu",
    text: "Agencje dodaj\u0105 setki fraz long tail, kt\u00F3rych nikt nie wyszukuje, zamiast skupi\u0107 si\u0119 na tych, kt\u00F3re maj\u0105 realn\u0105 warto\u015B\u0107.",
  },
  {
    type: "new" as const,
    title: "Priorytet: frazy o realnej warto\u015Bci",
    text: "Analizujemy intencj\u0119, wolumen i potencja\u0142 konwersji. Bud\u017Cet na frazy, kt\u00F3re maj\u0105 znaczenie dla Twojego biznesu.",
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
          {"Typowe oferty SEO ko\u0144cz\u0105 si\u0119 na pozycjach w Google. My budujemy widoczno\u015B\u0107 tam, gdzie dzi\u015B szukaj\u0105 Twoi klienci \u2014 w Google, AI i modelach j\u0119zykowych."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 reveal-stagger" style={{ gap: 16, maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl transition-all duration-300 ${
                c.type === "old"
                  ? "border-l-3 border-l-red vs-card-old"
                  : "border-l-3 border-l-green vs-card-new"
              }`}
              style={{ padding: 24 }}
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
                {c.type === "old" ? "Stare podej\u015Bcie" : "Podej\u015Bcie AD Awards"}
              </div>
              <h3 className="font-semibold text-text-secondary" style={{ fontSize: 16, marginBottom: 8 }}>{c.title}</h3>
              <p className="text-text-dim" style={{ fontSize: 13, lineHeight: 1.6 }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
