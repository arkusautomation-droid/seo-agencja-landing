const placements = [
  {
    category: "Portale branżowe",
    color: "text-blue",
    border: "border-[rgba(59,130,246,0.18)]",
    bg: "bg-[rgba(59,130,246,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    places: [
      "meble.pl — katalog producentów i dostawców",
      "meblepolskie.pl — polska branża meblarska",
      "biznesmeblowy.pl — artykuły i ogłoszenia branżowe",
      "meblobranie.pl — porównywarki i katalogi",
    ],
  },
  {
    category: "Portale wnętrzarskie",
    color: "text-accent-light",
    border: "border-[rgba(155,98,255,0.18)]",
    bg: "bg-[rgba(155,98,255,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    places: [
      "homebook.pl — duża platforma dla projektantów wnętrz",
      "weranda.pl — lifestyle + wnętrza",
      "dizajn.pl — design i architektura",
      "murator.pl — budowa i wnętrza (duży ruch)",
    ],
  },
  {
    category: "Platformy wizualne",
    color: "text-orange",
    border: "border-[rgba(249,115,22,0.18)]",
    bg: "bg-[rgba(249,115,22,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    places: [
      "Pinterest — SEO tablic i pinów (długi ogon wyszukiwań)",
      "Houzz.com — międzynarodowa platforma wnętrzarska",
      "Behance / Dezeen — portfolio projektowe",
      "Instagram — sygnały społecznościowe + linki w bio",
    ],
  },
  {
    category: "Prasa branżowa",
    color: "text-yellow",
    border: "border-[rgba(251,191,36,0.18)]",
    bg: "bg-[rgba(251,191,36,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    places: [
      "Meble Plus — magazyn branży meblarskiej",
      "Furniture Poland — eksport + B2B",
      "Wpisy gościnne na blogach wnętrzarskich",
      "Artykuły sponsorowane w portalach regionalne",
    ],
  },
  {
    category: "Społeczności branżowe",
    color: "text-green",
    border: "border-[rgba(34,197,94,0.18)]",
    bg: "bg-[rgba(34,197,94,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    places: [
      "Grupy FB dla architektów i projektantów wnętrz",
      "LinkedIn — profile firmy + artykuły eksperckie",
      "Fora meblarskie i tapicerskie",
      "Lokalne grupy \"polecam\" + wizytówki Google",
    ],
  },
];

export default function OffsiteSection() {
  return (
    <section id="offsite" className="relative" data-glow="orange" style={{ paddingTop: 0 }}>
      <div className="container">

        {/* Header */}
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Off-site SEO
        </div>
        <h2 className="section-title text-gradient-white-yellow reveal">
          Off-site SEO &mdash; budujesz autorytet poza swoją stroną
        </h2>
        <p className="section-sub reveal">
          Off-site nie jest wliczony w pakiety &mdash; <strong className="text-text-secondary">sam decydujesz, ile miesięcznie chcesz zainwestować</strong>.
          Przygotowujemy strategię i realizujemy. Poniżej miejsca, które budują autorytet w branży meblarskiej.
        </p>

        {/* Budget info box */}
        <div className="glass-card reveal" style={{ maxWidth: 680, margin: "0 auto 64px", padding: "28px 32px" }}>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-[rgba(249,115,22,0.12)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-text-secondary" style={{ fontSize: 15, marginBottom: 6 }}>
                Jak to działa?
              </div>
              <p className="text-text-dim" style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Ustalasz miesięczny budżet (np. 300 zł, 500 zł, 1 000 zł lub więcej) &mdash;
                my dobieramy miejsca, które dają najlepszą jakość linku dla Twojej niszy.
                Raportujemy każdy link: domenę, DR, ruch i tematyczność.
                <br /><br />
                <span className="text-text-secondary font-medium">Minim. budżet off-site: 300 zł / mies.</span> &mdash; poniżej tej kwoty efekt jest zbyt mały, by był sensowny.
              </p>
            </div>
          </div>
        </div>

        {/* Placements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger" style={{ gap: 20, marginBottom: 56 }}>
          {placements.map((p, i) => (
            <div key={i} className={`glass-card rounded-2xl border ${p.border} ${p.bg}`} style={{ padding: "24px 22px" }}>
              <div className={`flex items-center gap-3 ${p.color}`} style={{ marginBottom: 16 }}>
                {p.icon}
                <span className="font-semibold" style={{ fontSize: 14 }}>{p.category}</span>
              </div>
              <ul className="list-none" style={{ margin: 0 }}>
                {p.places.map((place, j) => (
                  <li key={j} className="text-text-dim flex items-start gap-2" style={{ padding: "4px 0", fontSize: 13, lineHeight: 1.55 }}>
                    <span className={`shrink-0 font-bold text-[11px] mt-px ${p.color}`}>&#8250;</span>
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 font-semibold text-white rounded-xl transition-all duration-200 bg-gradient-to-r from-orange to-yellow hover:opacity-90 shadow-[0_4px_24px_rgba(249,115,22,0.35)]"
            style={{ padding: "14px 32px", fontSize: 15, textDecoration: "none" }}
          >
            Zaplanuj budżet off-site &rarr;
          </a>
          <p className="text-text-muted" style={{ fontSize: 11, marginTop: 10 }}>
            Wycena bezpłatna &middot; Odpowiadamy w 24h
          </p>
        </div>

      </div>
    </section>
  );
}
