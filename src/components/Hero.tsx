const stats = [
  { num: "96,3%", label: "Polaków korzysta z Google" },
  { num: "46%", label: "zapytań to lokalne" },
  { num: "91,8%", label: "fraz to long tail" },
  { num: "14,6%", label: "konwersja z SEO" },
];

export default function Hero() {
  return (
    <section className="pt-[70px] pb-[50px] text-center relative overflow-hidden border-t-0!">
      {/* Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--color-orange-glow)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] mb-[18px] tracking-[-1px]">
          SEO, które przynosi
          <br />
          <em className="italic text-orange">klientów, nie raporty</em>
        </h1>
        <p className="text-[17px] text-text-dim max-w-[620px] mx-auto mb-9">
          Nie sprzedajemy pozycji fraz — sprzedajemy realny wzrost ruchu,
          zapytań i przychodów z Google. Mierzysz efekty, nie obietnice.
        </p>
        <div className="flex justify-center gap-10 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-4xl font-bold text-orange">
                {s.num}
              </div>
              <div className="text-[13px] text-text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
