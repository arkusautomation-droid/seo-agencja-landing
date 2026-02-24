const googleItems = [
  { title: "Core Web Vitals i szybkość", desc: "optymalizacja LCP, CLS i INP. Szybka strona = wyższe pozycje i niższy bounce rate.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { title: "Architektura i struktura URL", desc: "logiczna hierarchia, breadcrumbs, wewnętrzny linkbuilding. Google łatwiej crawluje i indeksuje.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { title: "Schema markup (dane strukturalne)", desc: "JSON-LD dla firmy, usług, produktów, FAQ, recenzji. Więcej rich snippets w wynikach.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { title: "Mobile-first i UX", desc: "responsywność, czytelność, dostępność. Google indeksuje wersję mobilną — musi być idealna.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { title: "E-E-A-T i autorytet", desc: "budowanie zaufania: autorzy treści, cytowania, backlinki z branżowych źródeł.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: "Wizytówka Google + NAP", desc: "spójna obecność w katalogach, optymalizacja zdjęć i recenzji, lokalna dominacja map.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
];

const llmItems = [
  { title: "Generative Engine Optimization", desc: "modele AI cytują strony z czytelną strukturą i autorytatywnymi treściami. Dostosowujemy oba.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-2 4-4 4s-4-2.05-4-4a4 4 0 0 1 4-4z"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="17" r="4"/></svg> },
  { title: "Treści w formacie Q&A", desc: "AI preferuje content, który wprost odpowiada na pytania. Tworzymy FAQ, how-to i definicje.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { title: "Semantyczne dane strukturalne", desc: "rozszerzony schema (speakable, howTo, FAQPage) ułatwia LLM-om parsowanie i cytowanie Twojej firmy.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: "Monitoring obecności w AI", desc: "sprawdzamy, czy ChatGPT/Gemini poleca Twoją firmę na kluczowe zapytania i korygujemy strategię.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: "Aktualizacja treści pod LLM", desc: "modele AI trenują się na danych z sieci. Regularna aktualizacja = Twoja firma w najnowszych odpowiedziach.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> },
  { title: "Brand protection w AI", desc: "monitorujemy, czy AI nie generuje błędnych informacji o Twojej marce i korygujemy źródła.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[13px] h-[13px]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
];

function ListItem({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: "blue" | "purple" }) {
  const icoClass = color === "blue"
    ? "bg-blue-glow text-blue"
    : "bg-purple-glow text-purple";
  return (
    <li className="text-[13px] py-2 border-b border-border last:border-b-0 flex items-start gap-2.5 text-text">
      <span className={`shrink-0 w-[22px] h-[22px] rounded-[5px] flex items-center justify-center mt-px ${icoClass}`}>
        {icon}
      </span>
      <span>
        <strong>{title}</strong> — {desc}
      </span>
    </li>
  );
}

export default function LlmSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">Optymalizacja pod Google i czaty AI</h2>
        <p className="section-sub">
          W 2026 klienci szukają dwoma drogami — przez Google i przez AI.
          Optymalizujemy obie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Google SEO */}
          <div className="p-7 rounded-[14px] bg-bg-card border border-border">
            <h3 className="text-[17px] font-bold mb-3 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue shrink-0" />
              Google SEO — fundament widoczności
            </h3>
            <ul className="list-none">
              {googleItems.map((item, i) => (
                <ListItem key={i} icon={item.icon} title={item.title} desc={item.desc} color="blue" />
              ))}
            </ul>
          </div>

          {/* GEO / LLM */}
          <div className="p-7 rounded-[14px] bg-bg-card border border-border">
            <h3 className="text-[17px] font-bold mb-3 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple shrink-0" />
              GEO — widoczność w ChatGPT, Gemini, Perplexity
            </h3>
            <ul className="list-none">
              {llmItems.map((item, i) => (
                <ListItem key={i} icon={item.icon} title={item.title} desc={item.desc} color="purple" />
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 py-5 px-6 rounded-xl bg-[linear-gradient(135deg,var(--color-blue-glow),var(--color-purple-glow))] border border-[rgba(167,139,250,0.15)] text-center">
          <p className="text-sm text-text-dim leading-relaxed">
            <strong className="text-text">
              Każdy pakiet zawiera optymalizację techniczną pod Google.
            </strong>{" "}
            GEO (widoczność w AI) jest dostępne od pakietów: Local Leader,
            Country Standard i E-commerce Pro. W niższych pakietach można dodać
            jako usługę dodatkową.
          </p>
        </div>
      </div>
    </section>
  );
}
