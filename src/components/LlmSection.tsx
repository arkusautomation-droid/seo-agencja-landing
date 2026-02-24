const googleItems = [
  { title: "Core Web Vitals i szybko\u015B\u0107", desc: "optymalizacja LCP, CLS i INP. Szybka strona = wy\u017Csze pozycje i ni\u017Cszy bounce rate.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { title: "Architektura i struktura URL", desc: "logiczna hierarchia, breadcrumbs, wewn\u0119trzny linkbuilding. Google \u0142atwiej crawluje i indeksuje.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { title: "Schema markup (dane strukturalne)", desc: "JSON-LD dla firmy, us\u0142ug, produkt\u00F3w, FAQ, recenzji. Wi\u0119cej rich snippets w wynikach.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { title: "Mobile-first i UX", desc: "responsywno\u015B\u0107, czytelno\u015B\u0107, dost\u0119pno\u015B\u0107. Google indeksuje wersj\u0119 mobiln\u0105 \u2014 musi by\u0107 idealna.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { title: "E-E-A-T i autorytet", desc: "budowanie zaufania: autorzy tre\u015Bci, cytowania, backlinki z bran\u017Cowych \u017Ar\u00F3de\u0142.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: "Wizyt\u00F3wka Google + NAP", desc: "sp\u00F3jna obecno\u015B\u0107 w katalogach, optymalizacja zdj\u0119\u0107 i recenzji, lokalna dominacja map.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
];

const llmItems = [
  { title: "Generative Engine Optimization", desc: "modele AI cytuj\u0105 strony z czyteln\u0105 struktur\u0105 i autorytatywnymi tre\u015Bciami. Dostosowujemy oba.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-2 4-4 4s-4-2.05-4-4a4 4 0 0 1 4-4z"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="17" r="4"/></svg> },
  { title: "Tre\u015Bci w formacie Q&A", desc: "AI preferuje content, kt\u00F3ry wprost odpowiada na pytania. Tworzymy FAQ, how-to i definicje.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { title: "Semantyczne dane strukturalne", desc: "rozszerzony schema (speakable, howTo, FAQPage) u\u0142atwia LLM-om parsowanie i cytowanie Twojej firmy.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: "Monitoring obecno\u015Bci w AI", desc: "sprawdzamy, czy ChatGPT/Gemini poleca Twoj\u0105 firm\u0119 na kluczowe zapytania i korygujemy strategi\u0119.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: "Aktualizacja tre\u015Bci pod LLM", desc: "modele AI trenuj\u0105 si\u0119 na danych z sieci. Regularna aktualizacja = Twoja firma w najnowszych odpowiedziach.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> },
  { title: "Brand protection w AI", desc: "monitorujemy, czy AI nie generuje b\u0142\u0119dnych informacji o Twojej marce i korygujemy \u017Ar\u00F3d\u0142a.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
];

function ListItem({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: "blue" | "purple" }) {
  const icoClass = color === "blue"
    ? "bg-blue-glow text-blue border border-[rgba(59,130,246,0.15)]"
    : "bg-accent-glow text-accent-light border border-[rgba(155,98,255,0.15)]";
  return (
    <li className="text-[13px] py-2.5 border-b border-[rgba(155,98,255,0.06)] last:border-b-0 flex items-start gap-3 text-text-secondary">
      <span className={`shrink-0 w-[24px] h-[24px] rounded-md flex items-center justify-center mt-px ${icoClass}`}>
        {icon}
      </span>
      <span>
        <strong className="text-text">{title}</strong> — <span className="text-text-dim">{desc}</span>
      </span>
    </li>
  );
}

export default function LlmSection() {
  return (
    <section className="relative" data-glow="purple">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Technologia
        </div>
        <h2 className="section-title text-gradient-white-green reveal">Optymalizacja pod Google i czaty AI</h2>
        <p className="section-sub reveal">
          {"W 2026 klienci szukają dwoma drogami \u2014 przez Google i przez AI. Optymalizujemy obie."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-stagger">
          {/* Google SEO */}
          <div className="glass-card llm-card-blue p-7">
            <h3 className="text-[17px] font-semibold mb-4 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
              {"Google SEO \u2014 fundament widoczności"}
            </h3>
            <ul className="list-none">
              {googleItems.map((item, i) => (
                <ListItem key={i} icon={item.icon} title={item.title} desc={item.desc} color="blue" />
              ))}
            </ul>
          </div>

          {/* GEO / LLM */}
          <div className="glass-card llm-card-purple p-7">
            <h3 className="text-[17px] font-semibold mb-4 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent shrink-0 shadow-[0_0_10px_rgba(155,98,255,0.4)]" />
              {"GEO \u2014 widoczność w ChatGPT, Gemini, Perplexity"}
            </h3>
            <ul className="list-none">
              {llmItems.map((item, i) => (
                <ListItem key={i} icon={item.icon} title={item.title} desc={item.desc} color="purple" />
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 py-5 px-6 rounded-xl bg-gradient-to-r from-[rgba(59,130,246,0.06)] to-[rgba(155,98,255,0.06)] border border-[rgba(155,98,255,0.12)] text-center">
          <p className="text-sm text-text-dim leading-relaxed">
            <strong className="text-text-secondary">
              {"Każdy pakiet zawiera optymalizację techniczną pod Google."}
            </strong>{" "}
            {"GEO (widoczność w AI) jest dostępne od pakietów: Local Leader, Country Standard i E-commerce Pro. W niższych pakietach można dodać jako usługę dodatkową."}
          </p>
        </div>
      </div>
    </section>
  );
}
