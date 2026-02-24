export default function GuaranteeSection() {
  return (
    <section className="relative" data-glow="green-orange">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 1l1.5 3.5H14l-3 2.5 1.5 4L8 8.5 3.5 11l1.5-4L2 4.5h4.5z" fill="currentColor" />
          </svg>
          Gwarancje
        </div>
        <h2 className="section-title reveal">Nasze gwarancje</h2>
        <p className="section-sub reveal">
          {"Dwie rzeczy, których nie oferuje żadna inna agencja naraz"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[900px] mx-auto reveal-stagger">
          {/* Activity guarantee */}
          <div className="relative p-8 rounded-2xl text-center bg-gradient-to-br from-[rgba(34,197,94,0.08)] to-[rgba(34,197,94,0.01)] border border-[rgba(34,197,94,0.20)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-[-60px] right-[-60px] w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none" />
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-green-glow text-green border border-[rgba(34,197,94,0.15)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-secondary">
              {"Gwarancja realizacji aktywności"}
            </h3>
            <p className="text-[13.5px] text-text-dim leading-[1.7] mb-2">
              {"Każdego miesiąca wdrażamy "}
              <strong className="text-text-secondary">
                {"100% aktywności przewidzianych w Twoim pakiecie"}
              </strong>
              {" \u2014 content, optymalizacja, off-site, raportowanie. Bez opóźnień, bez wymówek."}
            </p>
            <p className="text-[13.5px] text-text-dim leading-[1.7] mb-3">
              {"Jeśli w danym miesiącu nie zrealizujemy którejkolwiek aktywności \u2014 "}
              <strong className="text-text-secondary">
                {"nadrabiamy ją w kolejnym bezpłatnie"}
              </strong>
              {" lub pomniejszamy fakturę proporcjonalnie."}
            </p>
            <p className="text-green font-semibold text-sm">
              {"Płacisz za konkretne działania. Dostajesz każde z nich."}
            </p>
          </div>

          {/* Contract guarantee */}
          <div className="relative p-8 rounded-2xl text-center bg-gradient-to-br from-[rgba(155,98,255,0.08)] to-[rgba(155,98,255,0.01)] border-2 border-accent transition-all duration-300 hover:-translate-y-1 shadow-[0_0_0_4px_rgba(155,98,255,0.08),0_0_30px_rgba(155,98,255,0.10)]">
            <div className="absolute top-[-60px] right-[-60px] w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(155,98,255,0.1),transparent_70%)] pointer-events-none" />
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-accent-glow text-accent-light border border-[rgba(155,98,255,0.15)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <line x1="12" y1="16" x2="12" y2="18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-secondary">Umowa bez locka</h3>
            <p className="text-[13.5px] text-text-dim leading-[1.7] mb-2">
              {"Umowa "}
              <strong className="text-text-secondary">
                {"bezterminowa z 1-miesięcznym okresem wypowiedzenia."}
              </strong>
              {" Możesz odejść na koniec dowolnego miesiąca \u2014 bez kar, bez haczyków, bez małego druku."}
            </p>
            <p className="text-[13.5px] text-text-dim leading-[1.7] mb-3">
              {"Nie trzymamy klientów na siłę. Nasi klienci zostają, bo widzą wyniki \u2014 nie dlatego, że muszą. Nasza retencja: "}
              <strong className="text-text-secondary">94%.</strong>
            </p>
            <p className="text-accent-light font-semibold text-sm">
              Zostajecie z wyboru, nie z przymusu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
