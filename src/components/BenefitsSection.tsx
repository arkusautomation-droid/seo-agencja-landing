const benefits = [
  {
    color: "yellow" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "Stały dopływ klientów z Google",
    text: "Twoja strona pojawia się tam, gdzie ludzie szukają Twoich usług. Każdy miesiąc to więcej wejść, telefonów i formularzy — bez płacenia za kliknięcie.",
  },
  {
    color: "blue" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "Widoczność w AI i asystentach",
    text: "ChatGPT, Gemini i AI Overview to nowe \u201Ewyszukiwarki\u201D. Dostosujemy Twój content i technologię, żeby AI polecała Twoją firmę — nie konkurencję.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Mierzalne efekty, nie obietnice",
    text: "W każdym pakiecie masz konkretny KPI: liczbę wejść, leady, kliknięcia w telefon. Widzisz co dostajesz — nie zgadujesz.",
  },
  {
    color: "purple" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Strona zbudowana pod algorytmy",
    text: "Nie tylko content — poprawiamy szybkość, strukturę, schema markup i Core Web Vitals. Google i chatboty AI widzą Twoją stronę jako autorytet.",
  },
  {
    color: "yellow" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedykowany zespół, nie automat",
    text: "SEO-wiec, analityk, developer, copywriter — znasz ich z imienia. Omawiasz raporty z człowiekiem, nie z dashboardem.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[26px] h-[26px]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bez locka — zostajecie z wyboru",
    text: "Umowa bezterminowa z 1-miesięcznym wypowiedzeniem. Żadnych kar, żadnych haczyków. 94% klientów zostaje — bo widzą efekty.",
  },
];

const colorMap = {
  yellow: { bg: "bg-yellow-glow", text: "text-yellow" },
  blue: { bg: "bg-blue-glow", text: "text-blue" },
  green: { bg: "bg-green-glow", text: "text-green" },
  purple: { bg: "bg-purple-glow", text: "text-purple" },
};

export default function BenefitsSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">Co konkretnie zyskujesz</h2>
        <p className="section-sub">
          Nie lista czynności — lista wyników, które wpływają na Twój biznes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-7 px-6 rounded-[14px] bg-bg-card border border-border text-center transition-colors hover:border-[#2a3040]"
            >
              <div
                className={`w-[52px] h-[52px] mx-auto mb-3.5 rounded-xl flex items-center justify-center ${colorMap[b.color].bg} ${colorMap[b.color].text}`}
              >
                {b.icon}
              </div>
              <h3 className="text-[15px] font-semibold mb-1.5">{b.title}</h3>
              <p className="text-[13px] text-text-dim leading-[1.5]">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
