export default function GuaranteeSection() {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">Nasze gwarancje</h2>
        <p className="section-sub">
          Dwie rzeczy, których nie oferuje żadna inna agencja naraz
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[860px] mx-auto">
          {/* Activity guarantee */}
          <div className="p-8 px-7 rounded-2xl text-center bg-[linear-gradient(135deg,var(--color-green-glow),rgba(34,197,94,0.03))] border border-[rgba(34,197,94,0.25)]">
            <div className="w-14 h-14 mx-auto mb-4 rounded-[14px] flex items-center justify-center bg-[rgba(34,197,94,0.15)] text-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="font-heading text-xl mb-2.5">
              Gwarancja realizacji aktywności
            </h3>
            <p className="text-[13.5px] text-text-dim leading-[1.65] mb-2">
              Każdego miesiąca wdrażamy{" "}
              <strong className="text-text">
                100% aktywności przewidzianych w Twoim pakiecie
              </strong>{" "}
              — content, optymalizacja, off-site, raportowanie. Bez opóźnień,
              bez wymówek.
            </p>
            <p className="text-[13.5px] text-text-dim leading-[1.65] mb-2">
              Jeśli w danym miesiącu nie zrealizujemy którejkolwiek aktywności —{" "}
              <strong className="text-text">
                nadrabiamy ją w kolejnym bezpłatnie
              </strong>{" "}
              lub pomniejszamy fakturę proporcjonalnie.
            </p>
            <p className="text-green font-semibold text-sm">
              Płacisz za konkretne działania. Dostajesz każde z nich.
            </p>
          </div>

          {/* Contract guarantee */}
          <div className="p-8 px-7 rounded-2xl text-center bg-[linear-gradient(135deg,var(--color-orange-glow),rgba(249,115,22,0.03))] border-2 border-orange">
            <div className="w-14 h-14 mx-auto mb-4 rounded-[14px] flex items-center justify-center bg-[rgba(249,115,22,0.15)] text-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <line x1="12" y1="16" x2="12" y2="18" />
              </svg>
            </div>
            <h3 className="font-heading text-xl mb-2.5">Umowa bez locka</h3>
            <p className="text-[13.5px] text-text-dim leading-[1.65] mb-2">
              Umowa{" "}
              <strong className="text-text">
                bezterminowa z 1-miesięcznym okresem wypowiedzenia.
              </strong>{" "}
              Możesz odejść na koniec dowolnego miesiąca — bez kar, bez
              haczyków, bez małego druku.
            </p>
            <p className="text-[13.5px] text-text-dim leading-[1.65] mb-2">
              Nie trzymamy klientów na siłę. Nasi klienci zostają, bo widzą
              wyniki — nie dlatego, że muszą. Nasza retencja:{" "}
              <strong className="text-text">94%.</strong>
            </p>
            <p className="text-orange font-semibold text-sm">
              Zostajecie z wyboru, nie z przymusu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
