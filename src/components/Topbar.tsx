import AdAwardsLogo from "./AdAwardsLogo";

export default function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container">
        <div className="flex items-center justify-between px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] backdrop-blur-lg border border-[rgba(255,255,255,0.08)]">
          <AdAwardsLogo className="h-7" />
          <div className="hidden sm:flex items-center gap-6 text-[13px] text-text-dim">
            <span>Oferta SEO 2026</span>
            <span className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
            <span>Bezterminowa umowa</span>
          </div>
          <a href="#pakiety" className="btn-primary !py-2 !px-5 !text-[12px]">
            Zobacz pakiety
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
