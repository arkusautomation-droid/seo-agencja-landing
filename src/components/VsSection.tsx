const cards = [
  {
    type: "old" as const,
    title: "\u201EMasz 197 fraz w TOP 10\u201D",
    text: "Brzmi świetnie — ale ile z nich generuje telefony? Większość agencji raportuje widoczność, nie pieniądze. Pozycja 8 na frazę o 10 wyszukiwaniach = 0 klientów.",
  },
  {
    type: "new" as const,
    title: "\u201E47 zapytań z Google warte ~23 000 zł\u201D",
    text: "Targetujemy frazy z intencją zakupową. Raportujemy ruch → formularze → telefony → szacowany przychód. Widzisz ROI, nie metryki próżności.",
  },
  {
    type: "old" as const,
    title: "\u201EPozycjonowanie fraz bez limitu\u201D",
    text: "Agencje dodają setki fraz long tail, które nikt nie wyszukuje. Raport wygląda imponująco — Twoje konto bankowe nie.",
  },
  {
    type: "new" as const,
    title: "Priorytet: frazy, po których ludzie kupują",
    text: "Analizujemy intencję, wolumen i wartość kliknięcia. Skupiamy budżet na frazach, które napędzają biznes — nie statystyki.",
  },
];

export default function VsSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">Dlaczego zmieniamy zasady gry</h2>
        <p className="section-sub">
          Typowe oferty SEO mierzą pozycje. My mierzymy Twój przychód.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border border-border bg-bg-card ${
                c.type === "old" ? "border-l-3 border-l-red" : "border-l-3 border-l-green"
              }`}
            >
              <div
                className={`text-[11px] uppercase tracking-[1.5px] mb-2 font-semibold ${
                  c.type === "old" ? "text-red" : "text-green"
                }`}
              >
                {c.type === "old" ? "Stare podejście" : "Podejście AdAwards"}
              </div>
              <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
              <p className="text-[13px] text-text-dim leading-[1.55]">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
