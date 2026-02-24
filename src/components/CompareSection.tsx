const rows = [
  { aspect: "Co mierzysz", typical: "Pozycje fraz kluczowych", adawards: "Wejścia → leady → przychód" },
  { aspect: "Raport", typical: "\u201EWidoczność wzrosła o 517%\u201D", adawards: "\u201E47 leadów z Google, wartość ~23 000 zł\u201D" },
  { aspect: "Frazy", typical: "\u201EBez limitu\u201D (głównie zero-traffic)", adawards: "Priorytet: frazy z intencją zakupową" },
  { aspect: "AI / GEO", typical: "Osobna usługa lub brak", adawards: "W pakiecie od Local Leader / Country Standard" },
  { aspect: "Technologia", typical: "Optymalizacja on-page", adawards: "Core Web Vitals + schema + GEO + LLM readiness" },
  { aspect: "Umowa", typical: "Lock 12-24 miesiące", adawards: "Bezterminowa, 1-miesięczne wypowiedzenie" },
  { aspect: "Gwarancja", typical: "Brak", adawards: "100% wdrożenia aktywności pakietu co miesiąc" },
  { aspect: "Zespół", typical: "Anonimowy specjalista", adawards: "SEO + analityk + developer — znasz każdego" },
];

export default function CompareSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">AdAwards vs typowa agencja SEO</h2>
        <p className="section-sub">Konkretne różnice, które widzisz w wynikach</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px] max-sm:text-[11px]">
            <thead>
              <tr>
                <th className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 text-left border-b border-border text-text-dim text-[11px] uppercase tracking-[1px] font-semibold">
                  Aspekt
                </th>
                <th className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 text-left border-b border-border text-text-dim text-[11px] uppercase tracking-[1px] font-semibold">
                  Typowa agencja
                </th>
                <th className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 text-left border-b border-border text-text-dim text-[11px] uppercase tracking-[1px] font-semibold">
                  AdAwards
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 border-b border-border">
                    <strong>{r.aspect}</strong>
                  </td>
                  <td className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 border-b border-border text-text-muted">
                    {r.typical}
                  </td>
                  <td className="p-3 px-4 max-sm:p-2 max-sm:px-1.5 border-b border-border text-yellow font-medium">
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
