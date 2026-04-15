const benefits = [
  {
    color: "blue" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "Widoczno\u015B\u0107 w Google i AI",
    text: "Twoja strona zoptymalizowana pod klasyczne wyniki wyszukiwania oraz pod odpowiedzi generowane przez AI.",
  },
  {
    color: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-2 4-4 4s-4-2.05-4-4a4 4 0 0 1 4-4z"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="17" r="4"/>
      </svg>
    ),
    title: "Obecno\u015B\u0107 w asystentach AI",
    text: "ChatGPT, Gemini, AI Overview \u2014 dostosowujemy content i technologi\u0119, \u017Ceby modele j\u0119zykowe cytowa\u0142y Twoj\u0105 firm\u0119.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Mierzalne dzia\u0142ania, nie obietnice",
    text: "Konkretne KPI w ka\u017Cdym pakiecie: ruch organiczny, widoczno\u015B\u0107 fraz, obecno\u015B\u0107 w AI Overview.",
  },
  {
    color: "cyan" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Strona zbudowana pod algorytmy",
    text: "Szybko\u015B\u0107, struktura, schema markup, Core Web Vitals \u2014 techniczny fundament widoczno\u015Bci.",
  },
  {
    color: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedykowany zesp\u00F3\u0142, nie automat",
    text: "SEO-wiec, analityk, developer, copywriter \u2014 znasz ich z imienia.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bez locka, zostajecie z wyboru",
    text: "Umowa bezterminowa, 1-miesi\u0119czne wypowiedzenie. 94% klient\u00F3w zostaje.",
  },
];

const colorMap = {
  accent: { bg: "bg-accent-glow", text: "text-accent-light", border: "border-[rgba(155,98,255,0.15)]" },
  blue: { bg: "bg-blue-glow", text: "text-blue", border: "border-[rgba(59,130,246,0.15)]" },
  green: { bg: "bg-green-glow", text: "text-green", border: "border-[rgba(34,197,94,0.15)]" },
  cyan: { bg: "bg-cyan-glow", text: "text-cyan", border: "border-[rgba(6,182,212,0.15)]" },
};

export default function BenefitsSection() {
  return (
    <section className="relative" data-glow="orange">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
          </svg>
          {"Korzyści"}
        </div>
        <h2 className="section-title text-gradient-white-orange reveal">Co konkretnie zyskujesz</h2>
        <p className="section-sub reveal">
          {"Nie lista czynności \u2014 lista wyników, które wpływają na Twój biznes"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: 20 }}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className="benefit-card glass-card text-center transition-all duration-300 hover:-translate-y-1"
              style={{ padding: "28px 24px" }}
            >
              <div
                className={`benefit-ico rounded-xl flex items-center justify-center ${colorMap[b.color].bg} ${colorMap[b.color].text} border ${colorMap[b.color].border}`}
                style={{ width: 56, height: 56, marginLeft: "auto", marginRight: "auto", marginBottom: 16 }}
              >
                {b.icon}
              </div>
              <h3 className="font-semibold text-text-secondary" style={{ fontSize: 15, marginBottom: 8 }}>{b.title}</h3>
              <p className="text-text-dim" style={{ fontSize: 13, lineHeight: 1.6 }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
