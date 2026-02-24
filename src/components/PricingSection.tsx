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

const tabDefs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "local",
    label: "SEO Lokalne",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: "country",
    label: "SEO Og\u00F3lnopolskie",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    id: "ecom",
    label: "SEO E-commerce",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
];

const localPlans: Plan[] = [
  {
    name: "Local Start",
    price: "1 000",
    target: "Ma\u0142e firmy, 1 lokalizacja, niska konkurencja",
    kpis: [
      { label: "Cel po 6 miesi\u0105cach", value: "100\u20131 000 wej\u015B\u0107 / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Klikni\u0119cia: telefon + formularz", note: "mierzone w GA4 \u2014 cel: wzrost o 50%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Audyt strony", "Optymalizacja i porz\u0105dek on-site", "Integracja GA4 + Search Console", "Przeredagowanie tre\u015Bci", "Dob\u00F3r 5 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["Content: 4 000 zzs / mies.", "1 artyku\u0142 blogowy / mies.", "Optymalizacja strony: 1h / mies.", "Raport: ruch + klikni\u0119cia CTA + pozycje"],
  },
  {
    name: "Local Standard",
    price: "1 250",
    target: "Lokalne firmy us\u0142ugowe, wi\u0119ksze miasta",
    recommended: true,
    kpis: [
      { label: "Cel po 6 miesi\u0105cach", value: "150\u20131 000 wej\u015B\u0107 / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Klikni\u0119cia: telefon + formularz", note: "mierzone w GA4 \u2014 cel: wzrost o 80%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Wszystko z Local Start +", "Dodanie do 5 katalog\u00F3w NAP", "Optymalizacja wizyt\u00F3wki Google", "Dob\u00F3r 7 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["Content: 6 000 zzs / mies.", "1 artyku\u0142 blogowy / mies.", "Optymalizacja strony: 1,5h / mies.", "Raport: ruch + leady + szacowany przych\u00F3d"],
    bonus: "BONUS: +1 fraza co 6 miesi\u0119cy",
  },
  {
    name: "Local Pro",
    price: "1 500",
    target: "Firmy z konkurencj\u0105, kilka us\u0142ug",
    kpis: [
      { label: "Cel po 6 miesi\u0105cach", value: "200\u20131 500 wej\u015B\u0107 / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Klikni\u0119cia: telefon + formularz", note: "mierzone w GA4 \u2014 cel: wzrost o 120%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Wszystko z Local Standard +", "8 katalog\u00F3w NAP", "Analiza lokalnej konkurencji", "Dob\u00F3r 10 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["Content: 10 000 zzs / mies.", "2 artyku\u0142y / mies.", "Optymalizacja strony: 2h / mies.", "Off-site: bud\u017Cet 100 z\u0142 / mies.", "Raport: ruch + leady + przych\u00F3d + rekomendacje"],
    bonus: "BONUS: +2 frazy co 6 miesi\u0119cy",
  },
  {
    name: "Local Leader",
    price: "2 000",
    target: "Dominacja lokalna, wiele us\u0142ug",
    kpis: [
      { label: "Cel po 6 miesi\u0105cach", value: "300\u20132 000 wej\u015B\u0107 / mies.", note: "z wyszukiwarki Google (ruch organiczny)" },
      { label: "Drugi KPI", value: "Klikni\u0119cia: telefon + formularz", note: "mierzone w GA4 \u2014 cel: wzrost o 200%" },
    ],
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Wszystko z Local Pro +", "10 katalog\u00F3w NAP", "Testy A/B", "Dob\u00F3r 15 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["Content: 14 000 zzs / mies.", "2-3 artyku\u0142y / mies.", "Optymalizacja strony: 2,5h / mies.", "Off-site: bud\u017Cet 250 z\u0142 / mies.", "GEO: widoczno\u015B\u0107 w ChatGPT / Gemini / Perplexity", "Raport: ruch + leady + przych\u00F3d + ROI"],
    bonus: "BONUS: +3 frazy co 6 miesi\u0119cy",
  },
];

const countryPlans: Plan[] = [
  {
    name: "Country Start",
    price: "2 500",
    target: "Firma og\u00F3lnopolska, nisza, do 20 fraz",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "10\u201330 lead\u00F3w / mies.", note: "formularze + telefony z ruchu organicznego" }],
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "Wizyt\u00F3wka Google", "20 fraz priorytetowych", "Analiza konkurencji + testy A/B"],
    recurringLabel: "Cykliczne",
    recurring: ["Content: 20 000 zzs / mies.", "Off-site: 300 z\u0142 / mies.", "Optymalizacja: 3h / mies.", "Raport: ruch + leady + przych\u00F3d"],
    bonus: "BONUS: +3 frazy co 6 mies.",
  },
  {
    name: "Country Standard",
    price: "3 500",
    target: "\u015Arednia firma, rozbudowana oferta",
    recommended: true,
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "20\u201350 lead\u00F3w / mies.", note: "formularze + telefony z ruchu organicznego" }],
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Wszystko z Country Start +", "30 fraz priorytetowych", "Klastry tematyczne (strategia tre\u015Bci)"],
    recurringLabel: "Cykliczne",
    recurring: ["Content: 30 000 zzs / mies.", "Off-site: 500 z\u0142 / mies.", "Optymalizacja: 4h / mies.", "GEO: widoczno\u015B\u0107 w AI Overview", "Raport + omawianie ze specjalist\u0105"],
    bonus: "BONUS: +4 frazy co 6 mies.",
  },
  {
    name: "Country Pro",
    price: "5 000",
    target: "Du\u017Ca firma, silna konkurencja",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "50\u2013100 lead\u00F3w / mies.", note: "formularze + telefony z ruchu organicznego" }],
    items: ["50 fraz + klastry tematyczne", "Content: 40 000 zzs / mies.", "Off-site: 750 z\u0142 / mies.", "Optymalizacja: 5h / mies.", "GEO + monitoring trend\u00F3w", "Omawianie raport\u00F3w ze specjalist\u0105", "Prognoza przychodu z SEO (kwartalnie)"],
  },
  {
    name: "Country Leader",
    price: "8 000",
    target: "Lider bran\u017Cy, maksymalna dominacja",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "100\u2013200 lead\u00F3w / mies.", note: "formularze + telefony z ruchu organicznego" }],
    items: ["75 fraz + pe\u0142na strategia content", "Content: 50 000 zzs / mies.", "Off-site: 1 500 z\u0142 / mies.", "Optymalizacja: 7h / mies.", "GEO + monitoring + raporty konkurencji", "Dedykowany strateg SEO", "Integracja z narz\u0119dziami marketingowymi"],
  },
];

const ecomPlans: Plan[] = [
  {
    name: "E-commerce Basic",
    price: "10 000",
    target: "Sklep do 100 produkt\u00F3w",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "+300% ruchu z Google", note: "Wzrost przychodu organicznego o ~40%" }],
    items: ["Audyt + optymalizacja 100 produkt\u00F3w", "Content: 60 000 zzs / mies.", "Off-site: 2 000 z\u0142 / mies.", "Optymalizacja: 10h / mies.", "Monitoring trend\u00F3w + raporty konkurencji", "Konsultacje UX i CRO", "Raport: ruch \u2192 konwersje \u2192 przych\u00F3d"],
  },
  {
    name: "E-commerce Pro",
    price: "15 000",
    target: "Sklep do 150 produkt\u00F3w, rozbudowany",
    recommended: true,
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "+500% ruchu z Google", note: "Wzrost przychodu organicznego o ~70%" }],
    items: ["Optymalizacja 150 produkt\u00F3w", "Content: 70 000 zzs / mies.", "Off-site: 3 000 z\u0142 / mies.", "Optymalizacja: 15h / mies.", "GEO + integracja z rekomendacjami", "Konsultacje UX/CRO", "Omawianie raport\u00F3w ze specjalist\u0105"],
  },
  {
    name: "E-commerce Advanced",
    price: "20 000",
    target: "Du\u017Cy sklep, 200+ produkt\u00F3w",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "+700% ruchu z Google", note: "Wzrost przychodu organicznego o ~100%" }],
    items: ["Optymalizacja 200 produkt\u00F3w", "Content: 85 000 zzs / mies.", "Off-site: 4 500 z\u0142 / mies.", "Optymalizacja: 25h / mies.", "GEO + monitoring globalny", "Rozbudowane raporty przychodu", "Dedykowany strateg + konsultacje UX"],
  },
  {
    name: "E-commerce Leader",
    price: "30 000",
    target: "Enterprise, 300+ produkt\u00F3w",
    kpis: [{ label: "Cel po 6 miesi\u0105cach", value: "+1000% ruchu z Google", note: "Pe\u0142na dominacja kategorii" }],
    items: ["Optymalizacja 300 produkt\u00F3w", "Content: 100 000 zzs / mies.", "Off-site: 6 000 z\u0142 / mies.", "Optymalizacja: 40h / mies.", "Dedykowany specjalista + wsparcie graficzne 10h/mies.", "Globalna analiza rynku", "Analiza \u015Bcie\u017Cki UX + redesign", "Strategia marketingowa + prognoza przychod\u00F3w"],
  },
];

const tabPlans: Record<TabId, Plan[]> = {
  local: localPlans,
  country: countryPlans,
  ecom: ecomPlans,
};

/* Color scheme per tab */
const tabColors: Record<TabId, {
  accent: string; accentLight: string; glow: string; glowStrong: string;
  border: string; borderRec: string; subtle: string; shadowRec: string;
  checkColor: string; bonusBorder: string;
}> = {
  local: {
    accent: "text-accent-light", accentLight: "text-accent-light",
    glow: "rgba(155,98,255,0.12)", glowStrong: "rgba(155,98,255,0.25)",
    border: "border-[rgba(155,98,255,0.12)]", borderRec: "border-accent",
    subtle: "bg-[rgba(155,98,255,0.06)]", shadowRec: "shadow-[0_0_0_6px_rgba(155,98,255,0.10),0_0_40px_rgba(155,98,255,0.12)]",
    checkColor: "text-accent-light", bonusBorder: "border-[rgba(155,98,255,0.25)]",
  },
  country: {
    accent: "text-blue", accentLight: "text-blue",
    glow: "rgba(59,130,246,0.12)", glowStrong: "rgba(59,130,246,0.25)",
    border: "border-[rgba(59,130,246,0.12)]", borderRec: "border-blue",
    subtle: "bg-[rgba(59,130,246,0.06)]", shadowRec: "shadow-[0_0_0_6px_rgba(59,130,246,0.10),0_0_40px_rgba(59,130,246,0.12)]",
    checkColor: "text-blue", bonusBorder: "border-[rgba(59,130,246,0.25)]",
  },
  ecom: {
    accent: "text-green", accentLight: "text-green",
    glow: "rgba(34,197,94,0.12)", glowStrong: "rgba(34,197,94,0.25)",
    border: "border-[rgba(34,197,94,0.12)]", borderRec: "border-green",
    subtle: "bg-[rgba(34,197,94,0.06)]", shadowRec: "shadow-[0_0_0_6px_rgba(34,197,94,0.10),0_0_40px_rgba(34,197,94,0.12)]",
    checkColor: "text-green", bonusBorder: "border-[rgba(34,197,94,0.25)]",
  },
};

const recBadgeColors: Record<TabId, string> = {
  local: "bg-gradient-to-r from-accent-dark to-accent-light shadow-[0_2px_12px_rgba(155,98,255,0.4)]",
  country: "bg-gradient-to-r from-[#2563eb] to-[#60a5fa] shadow-[0_2px_12px_rgba(59,130,246,0.4)]",
  ecom: "bg-gradient-to-r from-[#16a34a] to-[#4ade80] shadow-[0_2px_12px_rgba(34,197,94,0.4)]",
};

function PlanCard({ plan, tab }: { plan: Plan; tab: TabId }) {
  const c = tabColors[tab];
  return (
    <div className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
      plan.recommended
        ? `bg-bg-card border-2 ${c.borderRec} ${c.shadowRec}`
        : "glass-card"
    }`}>
      {plan.recommended && (
        <div className={`inline-block text-[10px] font-bold py-1 px-4 rounded-full tracking-[0.8px] whitespace-nowrap text-white mb-4 ${recBadgeColors[tab]}`}>
          REKOMENDOWANY
        </div>
      )}

      <div className={`text-xs uppercase tracking-[1.5px] font-bold mb-2 ${c.accent}`}>{plan.name}</div>
      <div className="text-[34px] font-bold mb-1.5 leading-tight">
        {plan.price} <span className="text-sm text-text-dim font-normal">{`z\u0142 / mies.`}</span>
      </div>
      <div className="text-xs text-text-muted mb-6 leading-snug">{plan.target}</div>

      {plan.kpis.map((kpi, i) => (
        <div key={i} className={`rounded-lg p-3 px-3.5 ${c.border} border ${c.subtle} ${i > 0 ? "mt-1.5" : ""} mb-1.5`}>
          <div className={`text-[10px] uppercase tracking-[1px] font-semibold mb-0.5 ${c.accent}`}>{kpi.label}</div>
          <div className="text-base font-bold text-text-secondary">{kpi.value}</div>
          <div className="text-[11px] text-text-dim mt-0.5">{kpi.note}</div>
        </div>
      ))}

      <hr className="border-t border-[rgba(255,255,255,0.06)] my-6" />

      {plan.oneTime && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold mb-2.5">{plan.oneTimeLabel}</div>
          <ul className="list-none mb-4">
            {plan.oneTime.map((item, i) => (
              <li key={i} className="text-[12.5px] py-[5px] text-text-secondary flex items-start gap-2.5 leading-snug">
                <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.recurring && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold mb-2.5">{plan.recurringLabel}</div>
          <ul className="list-none mb-4">
            {plan.recurring.map((item, i) => (
              <li key={i} className="text-[12.5px] py-[5px] text-text-secondary flex items-start gap-2.5 leading-snug">
                <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.items && (
        <ul className="list-none mb-4">
          {plan.items.map((item, i) => (
            <li key={i} className="text-[12.5px] py-[5px] text-text-secondary flex items-start gap-2.5 leading-snug">
              <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {plan.bonus && (
        <div className={`text-xs py-2 px-3 rounded-lg ${c.subtle} border border-dashed ${c.bonusBorder} ${c.accent} font-medium mt-2`}>
          {plan.bonus}
        </div>
      )}
    </div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabId>("local");

  return (
    <section id="pakiety" className="relative" data-glow="blue">
      <div className="container">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Cennik
        </div>
        <h2 className={`section-title visible ${
          activeTab === "local" ? "text-gradient-white-purple" :
          activeTab === "country" ? "text-gradient-white-blue" :
          "text-gradient-white-green"
        }`}>Pakiety z konkretnymi celami wzrostu</h2>
        <p className={`section-sub visible transition-colors duration-300 ${
          activeTab === "local" ? "!text-accent-light" :
          activeTab === "country" ? "!text-blue" :
          "!text-green"
        }`}>
          {"Ka\u017Cdy pakiet = konkretny KPI, kt\u00F3ry mierzysz. Umowa bezterminowa, 1-miesi\u0119czne wypowiedzenie."}
        </p>

        {/* Tabs */}
        <div className="flex justify-center" style={{ marginBottom: 50 }}>
          <div className="pricing-tabs-container inline-flex gap-2 p-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            {tabDefs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`pricing-tab ${
                  activeTab === t.id
                    ? `pricing-tab--active pricing-tab--active-${t.id}`
                    : ""
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tabPlans[activeTab].map((plan, i) => (
            <PlanCard key={`${activeTab}-${i}`} plan={plan} tab={activeTab} />
          ))}
        </div>
      </div>
    </section>
  );
}
