const rows = [
  { aspect: "Co mierzysz", typical: "Pozycje fraz kluczowych", adawards: "Wej\u015Bcia \u2192 leady \u2192 przych\u00F3d" },
  { aspect: "Raport", typical: "\u201EWidoczno\u015B\u0107 wzros\u0142a o 517%\u201D", adawards: "Liczba telefon\u00F3w, lead\u00F3w, sprzeda\u017Cy" },
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
        <h2 className="section-title reveal"><span className="text-gradient">AdAwards</span>{" vs typowa agencja SEO"}</h2>
        <p className="section-sub reveal">{"Konkretne różnice, które widzisz w wynikach"}</p>
        <div className="overflow-x-auto rounded-2xl border border-border reveal" style={{ maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
          <table className="w-full max-sm:text-[11px]" style={{ borderSpacing: 0, borderCollapse: "collapse" }}>
            <thead>
              <tr className="bg-[rgba(155,98,255,0.04)]">
                <th className="text-left text-text-muted uppercase tracking-[1px] font-semibold" style={{ padding: "16px 20px", fontSize: 12 }}>
                  Aspekt
                </th>
                <th className="text-left text-text-muted uppercase tracking-[1px] font-semibold" style={{ padding: "16px 20px", fontSize: 12 }}>
                  Typowa agencja
                </th>
                <th className="text-left text-text-muted uppercase tracking-[1px] font-semibold" style={{ padding: "16px 20px", fontSize: 12 }}>
                  <span className="text-gradient font-bold">AdAwards</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "16px 20px", fontSize: 14, lineHeight: 1.6 }}>
                    <strong className="text-text-secondary" style={{ fontSize: 14, fontWeight: 600 }}>{r.aspect}</strong>
                  </td>
                  <td className="text-text-muted" style={{ padding: "16px 20px", fontSize: 14, lineHeight: 1.6 }}>
                    {r.typical}
                  </td>
                  <td className="text-accent-light font-medium" style={{ padding: "16px 20px", fontSize: 14, lineHeight: 1.6 }}>
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
