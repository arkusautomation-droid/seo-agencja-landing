const testimonials = [
  {
    quote:
      "Z firm\u0105 Ad Awards Sp. J. z Legnicy mamy przyjemno\u015B\u0107 wsp\u00F3\u0142pracowa\u0107 od kilku lat w zakresie obs\u0142ugi social medi\u00F3w, generowania lead\u00F3w, Google Ads, remarketingu, kampanii banerowych oraz projektowania stron www. Komfort korzystania z tak szerokiego wachlarza us\u0142ug skupionego w jednej agencji, spos\u00F3b komunikacji z klientem, realizacja kampanii i ich efekty utrwalaj\u0105 nasz\u0105 wsp\u00F3\u0142prac\u0119 na kolejne lata.",
    name: "Igor Gorzycki",
    role: "Dyrektor ds. jako\u015Bci i marketingu",
    company: "Nissan Yama",
  },
  {
    quote:
      "Z Agencj\u0105 Medialn\u0105 Ad Awards wsp\u00F3\u0142pracujemy nieprzerwanie od 2018 r. Wsp\u00F3\u0142praca przebiega g\u0142\u00F3wnie w kanale Social Media. Profesjonalne podej\u015Bcie, terminowo\u015B\u0107 i kreatywno\u015B\u0107 w realizacji kampanii sprawiaj\u0105, \u017Ce z przyjemno\u015Bci\u0105 kontynuujemy wsp\u00F3\u0142prac\u0119.",
    name: "Joanna Komorowska",
    role: "Marketing / Dzia\u0142 obs\u0142ugi posprzeda\u017Cnej",
    company: "Toyota \u0141\u00F3d\u017A",
  },
  {
    quote:
      "Z Agencj\u0105 Medialn\u0105 AD Awards wsp\u00F3\u0142pracujemy od 2017 roku. Dzia\u0142ania jakie wykonuje dla nas AD Awards charakteryzuj\u0105 si\u0119 profesjonalizmem i fachowym doradztwem na ka\u017Cdym etapie realizacji projekt\u00F3w.",
    name: "Karolina Wa\u0142owska",
    role: "Marketing Manager Grupa Polmotor",
    company: "Polmotor Szczecin",
  },
];

function TestimonialCard({
  t,
}: {
  t: (typeof testimonials)[number];
}) {
  return (
    <div className="shrink-0 w-[380px] max-sm:w-[300px] p-6 rounded-2xl glass-card">
      {/* Quote icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-accent mb-4 opacity-40"
      >
        <path d="M11 7.5a5.5 5.5 0 0 0-5.5 5.5c0 .28.02.55.07.82A3.5 3.5 0 0 0 2 17.5 3.5 3.5 0 0 0 5.5 21c1.93 0 3.5-1.57 3.5-3.5V13a5.5 5.5 0 0 0-5.5-5.5H3v1h.5zm10 0a5.5 5.5 0 0 0-5.5 5.5c0 .28.02.55.07.82A3.5 3.5 0 0 0 12 17.5a3.5 3.5 0 0 0 3.5 3.5c1.93 0 3.5-1.57 3.5-3.5V13a5.5 5.5 0 0 0-5.5-5.5H13v1h.5z" />
      </svg>
      <p className="text-[13.5px] text-text-dim leading-[1.7] mb-5 italic">
        {"\u201E"}{t.quote}{"\u201D"}
      </p>
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-dark to-accent-light flex items-center justify-center text-white font-bold text-sm shrink-0">
          {t.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
        <div>
          <div className="text-sm font-semibold text-text-secondary">
            {t.name}
          </div>
          <div className="text-[12px] text-text-muted">
            {t.role} &middot; {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Duplicate array for infinite scroll effect
  const doubledTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden" data-glow="purple">
      <div className="container mb-12">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path
              d="M8 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9.5l-3 1.5.5-3.5L3 5l3.5-.5z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          Opinie
        </div>
        <h2 className="section-title reveal">{"Zaufali nam"}</h2>
        <p className="section-sub reveal">
          {"Klienci, z którymi współpracujemy od lat"}
        </p>
      </div>

      {/* Marquee scroll */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030116] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030116] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee">
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

    </section>
  );
}
