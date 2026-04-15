const rows = [
  { aspect: "Co mierzysz", typical: "Pozycje fraz", adawards: "Ruch organiczny + widoczno\u015B\u0107 w AI" },
  { aspect: "Frazy", typical: "\u201EBez limitu\u201D (zero-traffic)", adawards: "Priorytet: intencja zakupowa" },
  { aspect: "AI / GEO", typical: "Brak lub osobna us\u0142uga", adawards: "W pakiecie od Local Leader" },
  { aspect: "Technologia", typical: "Optymalizacja on-page", adawards: "CWV + schema + GEO + LLM" },
  { aspect: "Umowa", typical: "Lock 12\u201324 mies.", adawards: "Bezterminowa, 1-mies. wypowiedzenie" },
  { aspect: "Wdro\u017Cenie", typical: "Brak gwarancji realizacji", adawards: "100% aktywno\u015Bci pakietu co miesi\u0105c" },
  { aspect: "Zesp\u00F3\u0142", typical: "Anonimowy specjalista", adawards: "SEO + analityk + dev: znasz ka\u017Cdego" },
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
        <h2 className="section-title reveal"><span className="text-gradient">Ad Awards</span>{" vs. typowa agencja SEO"}</h2>
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
                  <span className="text-gradient font-bold">Ad Awards</span>
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
