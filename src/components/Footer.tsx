import AdAwardsLogo from "./AdAwardsLogo";

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-border">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(50%_50%,rgba(155,98,255,0.06)_0%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10">
        {/* CTA block */}
        <div className="max-w-[700px] mx-auto text-center mb-12 p-12 rounded-3xl bg-gradient-to-br from-[rgba(24,19,66,0.8)] to-[rgba(36,31,54,0.6)] border border-[rgba(155,98,255,0.15)] shadow-[0_3px_20px_rgba(155,98,255,0.12)] reveal">
          <AdAwardsLogo className="h-8 mb-6" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
            {"Gotowy na "}<span className="text-gradient">{"wzrost z SEO"}</span>{"?"}
          </h3>
          <p className="text-text-dim text-sm mb-6 max-w-md mx-auto">
            {"Bezpłatna konsultacja. Pokażemy, ile ruchu i leadów możesz zyskać. Bez zobowiązań."}
          </p>
          <a href="#pakiety" className="btn-primary">
            Zobacz pakiety
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Info */}
        <div className="text-center text-text-muted text-xs space-y-2">
          <p>
            {"Wszystkie ceny netto w PLN. Umowa bezterminowa z 1-miesięcznym wypowiedzeniem. Bez ukrytych kosztów."}
          </p>
          <p>
            {"AdAwards · Marcin Bielaczyc · Marcin Siwonia · Jakub Płóciennik · Renata Kieruzal · Dawid Płóciennik"}
          </p>
          <p className="pt-3 text-[10px] text-text-dim">
            {"© 2026 AdAwards. Wszelkie prawa zastrzeżone."}
          </p>
        </div>
      </div>
    </footer>
  );
}
