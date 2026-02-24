const benefits = [
  {
    color: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "Sta\u0142y dop\u0142yw klient\u00F3w z Google",
    text: "Twoja strona pojawia si\u0119 tam, gdzie ludzie szukaj\u0105 Twoich us\u0142ug. Ka\u017Cdy miesi\u0105c to wi\u0119cej wej\u015B\u0107, telefon\u00F3w i formularzy \u2014 bez p\u0142acenia za klikni\u0119cie.",
  },
  {
    color: "blue" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "Widoczno\u015B\u0107 w AI i asystentach",
    text: "ChatGPT, Gemini i AI Overview to nowe \u201Ewyszukiwarki\u201D. Dostosujemy Tw\u00F3j content i technologi\u0119, \u017Ceby AI poleca\u0142a Twoj\u0105 firm\u0119 \u2014 nie konkurencj\u0119.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Mierzalne efekty, nie obietnice",
    text: "W ka\u017Cdym pakiecie masz konkretny KPI: liczb\u0119 wej\u015B\u0107, leady, klikni\u0119cia w telefon. Widzisz co dostajesz \u2014 nie zgadujesz.",
  },
  {
    color: "cyan" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Strona zbudowana pod algorytmy",
    text: "Nie tylko content \u2014 poprawiamy szybko\u015B\u0107, struktur\u0119, schema markup i Core Web Vitals. Google i chatboty AI widz\u0105 Twoj\u0105 stron\u0119 jako autorytet.",
  },
  {
    color: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedykowany zesp\u00F3\u0142, nie automat",
    text: "SEO-wiec, analityk, developer, copywriter \u2014 znasz ich z imienia. Omawiasz raporty z cz\u0142owiekiem, nie z dashboardem.",
  },
  {
    color: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bez locka \u2014 zostajecie z wyboru",
    text: "Umowa bezterminowa z 1-miesi\u0119cznym wypowiedzeniem. \u017Badnych kar, \u017Cadnych haczyk\u00F3w. 94% klient\u00F3w zostaje \u2014 bo widz\u0105 efekty.",
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
    <section className="relative !pt-8" data-glow="orange">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(50%_50%,rgba(155,98,255,0.06)_0%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-stagger">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="benefit-card glass-card p-7 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`benefit-ico w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${colorMap[b.color].bg} ${colorMap[b.color].text} border ${colorMap[b.color].border}`}
              >
                {b.icon}
              </div>
              <h3 className="text-[15px] font-semibold mb-2 text-text-secondary">{b.title}</h3>
              <p className="text-[13px] text-text-dim leading-[1.6]">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
