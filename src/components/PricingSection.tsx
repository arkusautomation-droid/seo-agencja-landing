"use client";

import { useState } from "react";

type TabId = "local" | "country" | "ecom";

interface Plan {
  name: string;
  price: string;
  target: string;
  kpis: { label: string; value: string; note: string }[];
  oneTime?: string[];
  oneTimeLabel?: string;
  recurring?: string[];
  recurringLabel?: string;
  items?: string[];
  bonus?: string;
  recommended?: boolean;
}

const tabDefs: { id: TabId; label: string; icon: React.ReactNode; activeClass: string }[] = [
  {
    id: "local",
    label: "SEO Lokalne",
    activeClass: "bg-orange text-bg border-orange",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: "country",
    label: "SEO Ogólnopolskie",
    activeClass: "bg-blue text-white border-blue",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    id: "ecom",
    label: "SEO E-commerce",
    activeClass: "bg-green text-bg border-green",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
];

const localPlans: Plan[] = [
  {
    name: "Local Start",
    price: "1 000",
    target: "Małe firmy, 1 lokalizacja, niska konkurencja",
    kpis: [
      { label: "Cel po 6 miesiącach", value: "100–1 000 wejść / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Kliknięcia: telefon + formularz", note: "mierzone w GA4 — cel: wzrost o 50%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesiąc)",
    oneTime: ["Audyt strony", "Optymalizacja i porządek on-site", "Integracja GA4 + Search Console", "Przeredagowanie treści", "Dobór 5 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesiąca)",
    recurring: ["Content: 4 000 zzs / mies.", "1 artykuł blogowy / mies.", "Optymalizacja strony: 1h / mies.", "Raport: ruch + kliknięcia CTA + pozycje"],
  },
  {
    name: "Local Standard",
    price: "1 250",
    target: "Lokalne firmy usługowe, większe miasta",
    recommended: true,
    kpis: [
      { label: "Cel po 6 miesiącach", value: "150–1 000 wejść / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Kliknięcia: telefon + formularz", note: "mierzone w GA4 — cel: wzrost o 80%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesiąc)",
    oneTime: ["Wszystko z Local Start +", "Dodanie do 5 katalogów NAP", "Optymalizacja wizytówki Google", "Dobór 7 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesiąca)",
    recurring: ["Content: 6 000 zzs / mies.", "1 artykuł blogowy / mies.", "Optymalizacja strony: 1,5h / mies.", "Raport: ruch + leady + szacowany przychód"],
    bonus: "BONUS: +1 fraza co 6 miesięcy",
  },
  {
    name: "Local Pro",
    price: "1 500",
    target: "Firmy z konkurencją, kilka usług",
    kpis: [
      { label: "Cel po 6 miesiącach", value: "200–1 500 wejść / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Kliknięcia: telefon + formularz", note: "mierzone w GA4 — cel: wzrost o 120%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesiąc)",
    oneTime: ["Wszystko z Local Standard +", "8 katalogów NAP", "Analiza lokalnej konkurencji", "Dobór 10 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesiąca)",
    recurring: ["Content: 10 000 zzs / mies.", "2 artykuły / mies.", "Optymalizacja strony: 2h / mies.", "Off-site: budżet 100 zł / mies.", "Raport: ruch + leady + przychód + rekomendacje"],
    bonus: "BONUS: +2 frazy co 6 miesięcy",
  },
  {
    name: "Local Leader",
    price: "2 000",
    target: "Dominacja lokalna, wiele usług",
    kpis: [
      { label: "Cel po 6 miesiącach", value: "300–2 000 wejść / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Kliknięcia: telefon + formularz", note: "mierzone w GA4 — cel: wzrost o 200%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesiąc)",
    oneTime: ["Wszystko z Local Pro +", "10 katalogów NAP", "Testy A/B", "Dobór 15 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesiąca)",
    recurring: ["Content: 14 000 zzs / mies.", "2-3 artykuły / mies.", "Optymalizacja strony: 2,5h / mies.", "Off-site: budżet 250 zł / mies.", "GEO: widoczność w ChatGPT / Gemini / Perplexity", "Raport: ruch + leady + przychód + ROI"],
    bonus: "BONUS: +3 frazy co 6 miesięcy",
  },
];

const countryPlans: Plan[] = [
  {
    name: "Country Start",
    price: "2 500",
    target: "Firma ogólnopolska, nisza, do 20 fraz",
    kpis: [{ label: "Cel po 6 miesiącach", value: "10–30 leadów / mies.", note: "formularze + telefony z ruchu organicznego" }],
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "Wizytówka Google", "20 fraz priorytetowych", "Analiza konkurencji + testy A/B"],
    recurringLabel: "Cykliczne",
    recurring: ["Content: 20 000 zzs / mies.", "Off-site: 300 zł / mies.", "Optymalizacja: 3h / mies.", "Raport: ruch + leady + przychód"],
    bonus: "BONUS: +3 frazy co 6 mies.",
  },
  {
    name: "Country Standard",
    price: "3 500",
    target: "Średnia firma, rozbudowana oferta",
    recommended: true,
    kpis: [{ label: "Cel po 6 miesiącach", value: "20–50 leadów / mies.", note: "formularze + telefony z ruchu organicznego" }],
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Wszystko z Country Start +", "30 fraz priorytetowych", "Klastry tematyczne (strategia treści)"],
    recurringLabel: "Cykliczne",
    recurring: ["Content: 30 000 zzs / mies.", "Off-site: 500 zł / mies.", "Optymalizacja: 4h / mies.", "GEO: widoczność w AI Overview", "Raport + omawianie ze specjalistą"],
    bonus: "BONUS: +4 frazy co 6 mies.",
  },
  {
    name: "Country Pro",
    price: "5 000",
    target: "Duża firma, silna konkurencja",
    kpis: [{ label: "Cel po 6 miesiącach", value: "50–100 leadów / mies.", note: "formularze + telefony z ruchu organicznego" }],
    items: ["50 fraz + klastry tematyczne", "Content: 40 000 zzs / mies.", "Off-site: 750 zł / mies.", "Optymalizacja: 5h / mies.", "GEO + monitoring trendów", "Omawianie raportów ze specjalistą", "Prognoza przychodu z SEO (kwartalnie)"],
  },
  {
    name: "Country Leader",
    price: "8 000",
    target: "Lider branży, maksymalna dominacja",
    kpis: [{ label: "Cel po 6 miesiącach", value: "100–200 leadów / mies.", note: "formularze + telefony z ruchu organicznego" }],
    items: ["75 fraz + pełna strategia content", "Content: 50 000 zzs / mies.", "Off-site: 1 500 zł / mies.", "Optymalizacja: 7h / mies.", "GEO + monitoring + raporty konkurencji", "Dedykowany strateg SEO", "Integracja z narzędziami marketingowymi"],
  },
];

const ecomPlans: Plan[] = [
  {
    name: "E-commerce Basic",
    price: "10 000",
    target: "Sklep do 100 produktów",
    kpis: [{ label: "Cel po 6 miesiącach", value: "+300% ruchu z Google", note: "Wzrost przychodu organicznego o ~40%" }],
    items: ["Audyt + optymalizacja 100 produktów", "Content: 60 000 zzs / mies.", "Off-site: 2 000 zł / mies.", "Optymalizacja: 10h / mies.", "Monitoring trendów + raporty konkurencji", "Konsultacje UX i CRO", "Raport: ruch → konwersje → przychód"],
  },
  {
    name: "E-commerce Pro",
    price: "15 000",
    target: "Sklep do 150 produktów, rozbudowany",
    recommended: true,
    kpis: [{ label: "Cel po 6 miesiącach", value: "+500% ruchu z Google", note: "Wzrost przychodu organicznego o ~70%" }],
    items: ["Optymalizacja 150 produktów", "Content: 70 000 zzs / mies.", "Off-site: 3 000 zł / mies.", "Optymalizacja: 15h / mies.", "GEO + integracja z rekomendacjami", "Konsultacje UX/CRO", "Omawianie raportów ze specjalistą"],
  },
  {
    name: "E-commerce Advanced",
    price: "20 000",
    target: "Duży sklep, 200+ produktów",
    kpis: [{ label: "Cel po 6 miesiącach", value: "+700% ruchu z Google", note: "Wzrost przychodu organicznego o ~100%" }],
    items: ["Optymalizacja 200 produktów", "Content: 85 000 zzs / mies.", "Off-site: 4 500 zł / mies.", "Optymalizacja: 25h / mies.", "GEO + monitoring globalny", "Rozbudowane raporty przychodu", "Dedykowany strateg + konsultacje UX"],
  },
  {
    name: "E-commerce Leader",
    price: "30 000",
    target: "Enterprise, 300+ produktów",
    kpis: [{ label: "Cel po 6 miesiącach", value: "+1000% ruchu z Google", note: "Pełna dominacja kategorii" }],
    items: ["Optymalizacja 300 produktów", "Content: 100 000 zzs / mies.", "Off-site: 6 000 zł / mies.", "Optymalizacja: 40h / mies.", "Dedykowany specjalista + wsparcie graficzne 10h/mies.", "Globalna analiza rynku", "Analiza ścieżki UX + redesign", "Strategia marketingowa + prognoza przychodów"],
  },
];

const tabPlans: Record<TabId, Plan[]> = {
  local: localPlans,
  country: countryPlans,
  ecom: ecomPlans,
};

const colorSchemes: Record<TabId, {
  nameColor: string;
  kpiBg: string;
  kpiBorder: string;
  kpiLabel: string;
  checkColor: string;
  recBorder: string;
  recBadgeBg: string;
}> = {
  local: {
    nameColor: "text-orange",
    kpiBg: "bg-orange-glow",
    kpiBorder: "border-[rgba(249,115,22,0.2)]",
    kpiLabel: "text-orange",
    checkColor: "text-orange",
    recBorder: "border-orange",
    recBadgeBg: "bg-orange",
  },
  country: {
    nameColor: "text-blue",
    kpiBg: "bg-blue-glow",
    kpiBorder: "border-[rgba(59,130,246,0.2)]",
    kpiLabel: "text-blue",
    checkColor: "text-blue",
    recBorder: "border-blue",
    recBadgeBg: "bg-blue",
  },
  ecom: {
    nameColor: "text-green",
    kpiBg: "bg-green-glow",
    kpiBorder: "border-[rgba(34,197,94,0.2)]",
    kpiLabel: "text-green",
    checkColor: "text-green",
    recBorder: "border-green",
    recBadgeBg: "bg-green",
  },
};

function PlanCard({ plan, tab }: { plan: Plan; tab: TabId }) {
  const cs = colorSchemes[tab];
  return (
    <div className={`p-[26px] px-5 rounded-[14px] bg-bg-card border border-border transition-all hover:-translate-y-0.5 hover:border-[#2a3040] relative ${plan.recommended ? cs.recBorder : ""}`}>
      {plan.recommended && (
        <div className={`absolute -top-[11px] left-1/2 -translate-x-1/2 text-[10px] font-bold py-[3px] px-3 rounded-full tracking-[0.8px] whitespace-nowrap text-white ${cs.recBadgeBg}`}>
          REKOMENDOWANY
        </div>
      )}
      <div className={`text-xs uppercase tracking-[1.5px] font-bold mb-1 ${cs.nameColor}`}>{plan.name}</div>
      <div className="font-heading text-[34px] font-bold mb-0.5">
        {plan.price} <span className="text-sm text-text-dim font-body">zł / mies.</span>
      </div>
      <div className="text-xs text-text-muted mb-3.5 leading-snug">{plan.target}</div>

      {plan.kpis.map((kpi, i) => (
        <div key={i} className={`rounded-lg p-3 px-3.5 border ${cs.kpiBg} ${cs.kpiBorder} ${i > 0 ? "mt-1.5" : ""} mb-1.5`}>
          <div className={`text-[10px] uppercase tracking-[1px] font-semibold mb-0.5 ${cs.kpiLabel}`}>{kpi.label}</div>
          <div className="text-base font-bold">{kpi.value}</div>
          <div className="text-[11px] text-text-dim mt-0.5">{kpi.note}</div>
        </div>
      ))}

      <hr className="border-t border-border my-3.5" />

      {plan.oneTime && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold mb-2">{plan.oneTimeLabel}</div>
          <ul className="list-none mb-3">
            {plan.oneTime.map((item, i) => (
              <li key={i} className="text-[12.5px] py-[3px] text-text flex items-start gap-2 leading-snug">
                <span className={`font-bold shrink-0 mt-px text-[11px] ${cs.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.recurring && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold mb-2">{plan.recurringLabel}</div>
          <ul className="list-none mb-3">
            {plan.recurring.map((item, i) => (
              <li key={i} className="text-[12.5px] py-[3px] text-text flex items-start gap-2 leading-snug">
                <span className={`font-bold shrink-0 mt-px text-[11px] ${cs.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.items && (
        <ul className="list-none mb-3">
          {plan.items.map((item, i) => (
            <li key={i} className="text-[12.5px] py-[3px] text-text flex items-start gap-2 leading-snug">
              <span className={`font-bold shrink-0 mt-px text-[11px] ${cs.checkColor}`}>&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {plan.bonus && (
        <div className="text-xs py-2 px-3 rounded-md bg-[rgba(249,115,22,0.06)] border border-dashed border-[rgba(249,115,22,0.25)] text-orange font-medium mt-2">
          {plan.bonus}
        </div>
      )}
    </div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabId>("local");

  return (
    <section>
      <div className="container">
        <h2 className="section-title">Pakiety z konkretnymi celami wzrostu</h2>
        <p className="section-sub">
          Każdy pakiet = konkretny KPI, który mierzysz. Umowa bezterminowa,
          1-miesięczne wypowiedzenie.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabDefs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`py-2.5 px-[22px] rounded-full border text-sm font-medium cursor-pointer transition-all font-body inline-flex items-center gap-1.5 ${
                activeTab === t.id
                  ? t.activeClass
                  : "border-border bg-transparent text-text-dim hover:border-text-muted hover:text-text"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-start">
          {tabPlans[activeTab].map((plan, i) => (
            <PlanCard key={`${activeTab}-${i}`} plan={plan} tab={activeTab} />
          ))}
        </div>
      </div>
    </section>
  );
}
