const rows = [
  { aspect: "Co mierzysz", typical: "Pozycje fraz kluczowych", adawards: "Wej\u015Bcia \u2192 leady \u2192 przych\u00F3d" },
  { aspect: "Raport", typical: "\u201EWidoczno\u015B\u0107 wzros\u0142a o 517%\u201D", adawards: "\u201E47 lead\u00F3w z Google, warto\u015B\u0107 ~23 000 z\u0142\u201D" },
  { aspect: "Frazy", typical: "\u201EBez limitu\u201D (g\u0142\u00F3wnie zero-traffic)", adawards: "Priorytet: frazy z intencj\u0105 zakupow\u0105" },
  { aspect: "AI / GEO", typical: "Osobna us\u0142uga lub brak", adawards: "W pakiecie od Local Leader / Country Standard" },
  { aspect: "Technologia", typical: "Optymalizacja on-page", adawards: "Core Web Vitals + schema + GEO + LLM readiness" },
  { aspect: "Umowa", typical: "Lock 12-24 miesi\u0105ce", adawards: "Bezterminowa, 1-miesi\u0119czne wypowiedzenie" },
  { aspect: "Gwarancja", typical: "Brak", adawards: "100% wdro\u017Cenia aktywno\u015Bci pakietu co miesi\u0105c" },
  { aspect: "Zesp\u00F3\u0142", typical: "Anonimowy specjalista", adawards: "SEO + analityk + developer \u2014 znasz ka\u017Cdego" },
];

export default function CompareSection() {
  return (
    <section className="relative" data-glow="green">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M4 2v12M12 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {"Porównanie"}
        </div>
        <h2 className="section-title reveal">AdAwards vs typowa agencja SEO</h2>
        <p className="section-sub reveal">{"Konkretne różnice, które widzisz w wynikach"}</p>
        <div className="overflow-x-auto rounded-2xl border border-border reveal">
          <table className="w-full border-collapse text-[13px] max-sm:text-[11px]">
            <thead>
              <tr className="bg-[rgba(155,98,255,0.04)]">
                <th className="p-4 px-5 max-sm:p-2.5 max-sm:px-2 text-left text-text-muted text-[11px] uppercase tracking-[1px] font-semibold">
                  Aspekt
                </th>
                <th className="p-4 px-5 max-sm:p-2.5 max-sm:px-2 text-left text-text-muted text-[11px] uppercase tracking-[1px] font-semibold">
                  Typowa agencja
                </th>
                <th className="p-4 px-5 max-sm:p-2.5 max-sm:px-2 text-left text-text-muted text-[11px] uppercase tracking-[1px] font-semibold">
                  <span className="text-gradient font-bold">AdAwards</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-[rgba(155,98,255,0.06)] hover:bg-[rgba(155,98,255,0.03)] transition-colors">
                  <td className="p-4 px-5 max-sm:p-2.5 max-sm:px-2">
                    <strong className="text-text-secondary">{r.aspect}</strong>
                  </td>
                  <td className="p-4 px-5 max-sm:p-2.5 max-sm:px-2 text-text-muted">
                    {r.typical}
                  </td>
                  <td className="p-4 px-5 max-sm:p-2.5 max-sm:px-2 text-accent-light font-medium">
                    {r.adawards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
