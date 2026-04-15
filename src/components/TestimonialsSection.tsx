const testimonials = [
  {
    quote:
      "Z firm\u0105 Ad Awards mamy przyjemno\u015B\u0107 wsp\u00F3\u0142pracowa\u0107 od kilku lat. Komfort korzystania z tak szerokiego wachlarza us\u0142ug skupionego w jednej agencji utrwala nasz\u0105 wsp\u00F3\u0142prac\u0119 na kolejne lata.",
    name: "Igor Gorzycki",
    role: "Dyrektor ds. jako\u015Bci i marketingu",
    company: "Nissan Yama",
  },
  {
    quote:
      "Profesjonalne podej\u015Bcie, terminowo\u015B\u0107 i kreatywno\u015B\u0107 w realizacji kampanii sprawiaj\u0105, \u017Ce z przyjemno\u015Bci\u0105 kontynuujemy wsp\u00F3\u0142prac\u0119.",
    name: "Joanna Komorowska",
    role: "",
    company: "Toyota \u0141\u00F3d\u017A",
  },
  {
    quote:
      "Dzia\u0142ania AD Awards charakteryzuj\u0105 si\u0119 profesjonalizmem i fachowym doradztwem na ka\u017Cdym etapie realizacji.",
    name: "Karolina Wa\u0142owska",
    role: "Marketing Manager",
    company: "Polmotor Szczecin",
  },
];

function TestimonialCard({
  t,
}: {
  t: (typeof testimonials)[number];
}) {
  return (
    <div className="glass-card" style={{ flexShrink: 0, width: 380, padding: "32px 28px", borderRadius: 16 }}>
      {/* Quote icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: 24, height: 24, color: "var(--color-accent)", marginBottom: 16, opacity: 0.4 }}
      >
        <path d="M11 7.5a5.5 5.5 0 0 0-5.5 5.5c0 .28.02.55.07.82A3.5 3.5 0 0 0 2 17.5 3.5 3.5 0 0 0 5.5 21c1.93 0 3.5-1.57 3.5-3.5V13a5.5 5.5 0 0 0-5.5-5.5H3v1h.5zm10 0a5.5 5.5 0 0 0-5.5 5.5c0 .28.02.55.07.82A3.5 3.5 0 0 0 12 17.5a3.5 3.5 0 0 0 3.5 3.5c1.93 0 3.5-1.57 3.5-3.5V13a5.5 5.5 0 0 0-5.5-5.5H13v1h.5z" />
      </svg>
      <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 24, color: "var(--color-text-dim)", fontStyle: "italic" }}>
        {"\u201E"}{t.quote}{"\u201D"}
      </p>
      <div style={{ display: "flex", alignItems: "center", marginTop: 20, gap: 14 }}>
        {/* Avatar placeholder */}
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(to bottom right, var(--color-accent-dark), var(--color-accent-light))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
          {t.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: "var(--color-text-secondary)" }}>
            {t.name}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 4, color: "var(--color-text-muted)" }}>
            {t.role ? <>{t.role} &middot; {t.company}</> : t.company}
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
    <section data-glow="purple" style={{ position: "relative", overflow: "hidden", padding: "48px 0" }}>
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
        <h2 className="section-title reveal">{"Opinie klientów"}</h2>
        <p className="section-sub reveal">
          {"Klienci, z którymi współpracujemy od lat"}
        </p>
      </div>

      {/* Marquee scroll */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 96, background: "linear-gradient(to right, #030116, transparent)", zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 96, background: "linear-gradient(to left, #030116, transparent)", zIndex: 10, pointerEvents: "none" }} />

        <div className="animate-marquee" style={{ display: "flex", gap: 24 }}>
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

    </section>
  );
}
