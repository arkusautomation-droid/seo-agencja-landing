const placements = [
  {
    category: "Portale bran\u017Cowe",
    color: "text-blue",
    border: "border-[rgba(59,130,246,0.18)]",
    bg: "bg-[rgba(59,130,246,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    places: [
      "meble.pl \u2014 katalog producent\u00F3w i dostawc\u00F3w",
      "meblepolskie.pl \u2014 polska bran\u017Ca meblarska",
      "biznesmeblowy.pl \u2014 artyku\u0142y i og\u0142oszenia bran\u017Cowe",
      "meblobranie.pl \u2014 por\u00F3wnywarki i katalogi",
    ],
  },
  {
    category: "Portale wn\u0119trzarskie",
    color: "text-accent-light",
    border: "border-[rgba(155,98,255,0.18)]",
    bg: "bg-[rgba(155,98,255,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    places: [
      "homebook.pl \u2014 du\u017Ca platforma dla projektant\u00F3w wn\u0119trz",
      "weranda.pl \u2014 lifestyle + wn\u0119trza",
      "dizajn.pl \u2014 design i architektura",
      "murator.pl \u2014 budowa i wn\u0119trza (du\u017Cy ruch)",
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
      "Pinterest \u2014 SEO tablic i pin\u00F3w (d\u0142ugi ogon wyszukiwa\u0144)",
      "Houzz.com \u2014 mi\u0119dzynarodowa platforma wn\u0119trzarska",
      "Behance / Dezeen \u2014 portfolio projektowe",
      "Instagram \u2014 sygnały spo\u0142eczno\u015Bciowe + linki w bio",
    ],
  },
  {
    category: "Prasa bran\u017Cowa",
    color: "text-yellow",
    border: "border-[rgba(251,191,36,0.18)]",
    bg: "bg-[rgba(251,191,36,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    places: [
      "Meble Plus \u2014 magazyn bran\u017Cy meblarskiej",
      "Furniture Poland \u2014 eksport + B2B",
      "Wpisy go\u015Bcinne na blogach wn\u0119trzarskich",
      "Artyku\u0142y sponsorowane w portalach regionalne",
    ],
  },
  {
    category: "Spo\u0142eczno\u015Bci bran\u017Cowe",
    color: "text-green",
    border: "border-[rgba(34,197,94,0.18)]",
    bg: "bg-[rgba(34,197,94,0.05)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    places: [
      "Grupy FB dla architekt\u00F3w i projektant\u00F3w wn\u0119trz",
      "LinkedIn \u2014 profile firmy + artyku\u0142y eksperckie",
      "Fora meblarskie i tapicerskie",
      "Lokalne grupy \"polecam\" + wizyt\u00F3wki Google",
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
                Jak to dzia&#322;a?
              </div>
              <p className="text-text-dim" style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Ustalasz miesi\u0119czny bud\u017Cet (np. 300\u00A0z\u0142, 500\u00A0z\u0142, 1\u00A0000\u00A0z\u0142 lub wi\u0119cej) &mdash;
                my dobieramy miejsca, kt\u00F3re daj\u0105 najlepsz\u0105 jako\u015B\u0107 linku dla Twojej niszy.
                Raportujemy ka\u017Cdy link: domen\u0119, DR, ruch i tematyczno\u015B\u0107.
                <br /><br />
                <span className="text-text-secondary font-medium">Minim. bud\u017Cet off-site: 300 z\u0142 / mies.</span> &mdash; poni\u017Cej tej kwoty efekt jest zbyt ma\u0142y, by by\u0142 sensowny.
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
            Zaplanuj bud\u017Cet off-site &rarr;
          </a>
          <p className="text-text-muted" style={{ fontSize: 11, marginTop: 10 }}>
            Wycena bezp\u0142atna &middot; Odpowiadamy w 24h
          </p>
        </div>

      </div>
    </section>
  );
}
