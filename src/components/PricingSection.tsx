"use client";

import { useState } from "react";
import { ALL_PACKAGES } from "@/data/packages";

type TabId = "local" | "country" | "ecom";

interface Plan {
  name: string;
  price: string;
  target: string;
  oneTimeLabel?: string;
  oneTime?: string[];
  recurringLabel?: string;
  recurring?: string[];
  aiLabel?: string;
  ai?: string[];
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
    target: "Ma\u0142e firmy, 1 lokalizacja, niska konkurencja.",
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Audyt strony", "Optymalizacja on-site", "Integracja GA4 + Search Console", "Prze\u015Bwietlenie tre\u015Bci", "Dob\u00F3r 5 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["4 artyku\u0142y / mies.", "Optymalizacja strony: 1 h / mies.", "Raport: ruch organiczny + widoczno\u015B\u0107 fraz + pozycje"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)"],
  },
  {
    name: "Local Pro",
    price: "2 000",
    target: "Lokalne firmy us\u0142ugowe, wi\u0119ksze miasta, kilka us\u0142ug.",
    recommended: true,
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Audyt + optymalizacja on-site", "Integracja GA4 + Search Console", "Optymalizacja wizyt\u00F3wki Google", "Analiza lokalnej konkurencji", "Dob\u00F3r 10 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["8 artyku\u0142\u00F3w / mies.", "Optymalizacja strony: 2 h / mies.", "Raport: ruch organiczny + widoczno\u015B\u0107 + dynamika wzrostu"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)"],
    bonus: "BONUS: 1 fraza co 6 miesi\u0119cy",
  },
  {
    name: "Local Leader",
    price: "3 000",
    target: "Dominacja lokalna, wiele us\u0142ug, du\u017Ca konkurencja.",
    oneTimeLabel: "Jednorazowe (1. miesi\u0105c)",
    oneTime: ["Pe\u0142ny audyt + strategia tre\u015Bci", "GA4 + Search Console + testy A/B", "Optymalizacja wizyt\u00F3wki Google", "Dob\u00F3r 15 fraz priorytetowych"],
    recurringLabel: "Cykliczne (od 2. miesi\u0105ca)",
    recurring: ["12 artyku\u0142\u00F3w / mies.", "Optymalizacja strony: 2,5 h / mies.", "Raport: ruch organiczny + widoczno\u015B\u0107 + obecno\u015B\u0107 w AI Overview"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)", "AI Topical Map \u2014 mapa tematyczna fraz", "GEO AI \u2014 widoczno\u015B\u0107 w modelach j\u0119zykowych"],
    bonus: "BONUS: 2 frazy co 6 miesi\u0119cy",
  },
];

const countryPlans: Plan[] = [
  {
    name: "Country Starter",
    price: "3 000",
    target: "Firma og\u00F3lnopolska, nisza: strategiczne zdobywanie autorytetu.",
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "20 fraz priorytetowych", "Analiza konkurencji"],
    recurringLabel: "Cykliczne",
    recurring: ["12 artyku\u0142\u00F3w / mies.", "Optymalizacja: 3 h / mies.", "Raport: ruch organiczny + widoczno\u015B\u0107 + dynamika wzrostu"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)"],
    bonus: "BONUS: 3 frazy co 6 miesi\u0119cy",
  },
  {
    name: "Country Standard",
    price: "5 000",
    target: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    recommended: true,
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "30 fraz priorytetowych", "Klastry tematyczne (strategia tre\u015Bci)"],
    recurringLabel: "Cykliczne",
    recurring: ["20 artyku\u0142\u00F3w / mies.", "Optymalizacja: 4 h / mies.", "GEO: widoczno\u015B\u0107 w AI Overview", "Raport + omawianie ze specjalist\u0105"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)", "AI Topical Map \u2014 mapa tematyczna fraz"],
    bonus: "BONUS: 4 frazy co 6 miesi\u0119cy",
  },
  {
    name: "Country Pro",
    price: "7 000",
    target: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "50 fraz priorytetowych", "Klastry tematyczne (strategia tre\u015Bci)"],
    recurringLabel: "Cykliczne",
    recurring: ["28 artyku\u0142\u00F3w / mies.", "Optymalizacja: 5 h / mies.", "GEO + monitoring trend\u00F3w", "Omawianie raport\u00F3w ze specjalist\u0105", "Analiza widoczno\u015Bci w AI (kwartalnie)"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)", "AI Topical Map \u2014 mapa tematyczna fraz", "GEO AI \u2014 widoczno\u015B\u0107 w modelach j\u0119zykowych"],
  },
  {
    name: "Country Leader",
    price: "10 000",
    target: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    oneTimeLabel: "Jednorazowe",
    oneTime: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "75 fraz priorytetowych", "Pe\u0142na strategia content"],
    recurringLabel: "Cykliczne",
    recurring: ["40 artyku\u0142\u00F3w / mies.", "Optymalizacja: 7 h / mies.", "GEO + monitoring + raporty konkurencji", "Dedykowany strateg SEO", "Integracja z narz\u0119dziami marketingowymi"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema markup (dane strukturalne)", "AI Q&A pytania i odpowiedzi (FAQ Schema)", "AI Topical Map \u2014 mapa tematyczna fraz", "GEO AI \u2014 widoczno\u015B\u0107 w modelach j\u0119zykowych", "AI Brief strategiczny \u2014 automatyczna analiza okazji contentowych"],
  },
];

const ecomPlans: Plan[] = [
  {
    name: "E-Com Starter",
    price: "3 000",
    target: "Sklep 10 produkt\u00F3w / mies.",
    recurringLabel: "Aktywno\u015Bci",
    recurring: ["Audyt + optymalizacja on-site", "10 produkt\u00F3w / mies. (opisy + meta)", "12 artyku\u0142\u00F3w / mies.", "Optymalizacja: 4 h / mies.", "Raport: ruch organiczny, widoczno\u015B\u0107, konwersje"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema dla produkt\u00F3w (Product + Offer Schema)"],
  },
  {
    name: "E-Com Basic",
    price: "5 000",
    target: "Sklep 15 produkt\u00F3w / mies.",
    recurringLabel: "Aktywno\u015Bci",
    recurring: ["Audyt + optymalizacja on-site", "15 produkt\u00F3w / mies. (opisy + meta)", "20 artyku\u0142\u00F3w / mies.", "Optymalizacja: 6 h / mies.", "Monitoring trend\u00F3w + raporty konkurencji", "Raport: ruch organiczny, widoczno\u015B\u0107, konwersje"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema dla produkt\u00F3w (Product + Offer Schema)", "AI Q&A \u2014 sekcja pyta\u0144 do produkt\u00F3w"],
  },
  {
    name: "E-Com Standard",
    price: "10 000",
    target: "Sklep 20 produkt\u00F3w / mies.",
    recommended: true,
    recurringLabel: "Aktywno\u015Bci",
    recurring: ["Audyt + optymalizacja on-site", "20 produkt\u00F3w / mies. (opisy + meta)", "40 artyku\u0142\u00F3w / mies.", "Optymalizacja: 10 h / mies.", "Monitoring trend\u00F3w + raporty konkurencji", "Konsultacje UX i CRO", "Raport: ruch organiczny, widoczno\u015B\u0107, konwersje"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema dla produkt\u00F3w (Product + Offer Schema)", "AI Q&A \u2014 sekcja pyta\u0144 do produkt\u00F3w", "AI Topical Map kategorii \u2014 mapa tematyczna asortymentu"],
  },
  {
    name: "E-Com Pro",
    price: "15 000",
    target: "Sklep 30 produkt\u00F3w / mies.",
    recurringLabel: "Aktywno\u015Bci",
    recurring: ["Audyt + optymalizacja on-site", "30 produkt\u00F3w / mies. (opisy + meta)", "60 artyku\u0142\u00F3w / mies.", "Optymalizacja: 15 h / mies.", "GEO + integracja z rekomendacjami AI", "Konsultacje UX / CRO", "Omawianie raport\u00F3w ze specjalist\u0105"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema dla produkt\u00F3w (Product + Offer Schema)", "AI Q&A \u2014 sekcja pyta\u0144 do produkt\u00F3w", "AI Topical Map kategorii", "GEO AI \u2014 monitoring widoczno\u015Bci w modelach j\u0119zykowych"],
  },
  {
    name: "E-Com Leader",
    price: "20 000",
    target: "Sklep 50 produkt\u00F3w / mies.",
    recurringLabel: "Aktywno\u015Bci",
    recurring: ["Audyt + optymalizacja on-site", "50 produkt\u00F3w / mies. (opisy + meta)", "80 artyku\u0142\u00F3w / mies.", "Optymalizacja: 25 h / mies.", "GEO + monitoring globalny", "Rozbudowane raporty widoczno\u015Bci", "Dedykowany strateg + konsultacje UX"],
    aiLabel: "AI \u2014 Sztuczna inteligencja",
    ai: ["AI Schema dla produkt\u00F3w (Product + Offer Schema)", "AI Q&A \u2014 sekcja pyta\u0144 do produkt\u00F3w", "AI Topical Map kategorii", "GEO AI \u2014 monitoring widoczno\u015Bci w modelach j\u0119zykowych", "AI Brief strategiczny \u2014 automatyczna analiza okazji contentowych", "Monitoring AI Overview \u2014 \u015Bledzenie cytowa\u0144 w Google AI"],
  },
];

const tabPlans: Record<TabId, Plan[]> = {
  local: localPlans,
  country: countryPlans,
  ecom: ecomPlans,
};

/* Grid columns per tab (3 / 4 / 5 packages) */
const gridClass: Record<TabId, string> = {
  local: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  country: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  ecom: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

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

const planToPackageId: Record<string, string> = {
  "Local Start": "local-start",
  "Local Pro": "local-pro",
  "Local Leader": "local-leader",
  "Country Starter": "country-starter",
  "Country Standard": "country-standard",
  "Country Pro": "country-pro",
  "Country Leader": "country-leader",
  "E-Com Starter": "ecom-starter",
  "E-Com Basic": "ecom-basic",
  "E-Com Standard": "ecom-standard",
  "E-Com Pro": "ecom-pro",
  "E-Com Leader": "ecom-leader",
};

const btnColors: Record<TabId, { bg: string; hover: string; shadow: string }> = {
  local: { bg: "bg-accent", hover: "hover:bg-accent-light", shadow: "shadow-[0_4px_20px_rgba(155,98,255,0.35)]" },
  country: { bg: "bg-blue", hover: "hover:bg-[#60a5fa]", shadow: "shadow-[0_4px_20px_rgba(59,130,246,0.35)]" },
  ecom: { bg: "bg-green", hover: "hover:bg-[#4ade80]", shadow: "shadow-[0_4px_20px_rgba(34,197,94,0.35)]" },
};

function PlanCard({ plan, tab }: { plan: Plan; tab: TabId }) {
  const c = tabColors[tab];
  const btn = btnColors[tab];
  const pkgId = planToPackageId[plan.name];
  const pkg = pkgId ? ALL_PACKAGES.find((p) => p.id === pkgId) : undefined;
  const stripeLink = pkg?.stripeLink;

  return (
    <div className={`relative rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
      plan.recommended
        ? `bg-bg-card border-2 ${c.borderRec} ${c.shadowRec}`
        : "glass-card"
    }`} style={{ padding: "32px 24px" }}>
      {plan.recommended && (
        <div className={`inline-block text-[10px] font-bold py-1 px-4 rounded-full tracking-[0.8px] whitespace-nowrap text-white ${recBadgeColors[tab]}`} style={{ marginBottom: 8 }}>
          REKOMENDOWANY
        </div>
      )}

      <div className={`text-xs uppercase tracking-[1.5px] font-bold ${c.accent}`} style={{ marginBottom: 8 }}>{plan.name}</div>
      <div className="font-bold leading-tight" style={{ fontSize: 32, marginBottom: 4 }}>
        {plan.price} <span className="text-text-dim font-normal" style={{ fontSize: 14 }}>{`z\u0142 / mies.`}</span>
      </div>
      <div className="text-text-muted" style={{ fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>{plan.target}</div>

      <hr className="border-t border-[rgba(255,255,255,0.06)]" style={{ margin: "8px 0 16px" }} />

      {plan.oneTime && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold" style={{ marginBottom: 10 }}>{plan.oneTimeLabel}</div>
          <ul className="list-none" style={{ marginBottom: 14 }}>
            {plan.oneTime.map((item, i) => (
              <li key={i} className="text-text-secondary flex items-start" style={{ padding: "4px 0", fontSize: 13, lineHeight: 1.5, gap: 8 }}>
                <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.recurring && (
        <>
          <div className="text-[10px] uppercase tracking-[1.2px] text-text-muted font-semibold" style={{ marginBottom: 10 }}>{plan.recurringLabel}</div>
          <ul className="list-none" style={{ marginBottom: 14 }}>
            {plan.recurring.map((item, i) => (
              <li key={i} className="text-text-secondary flex items-start" style={{ padding: "4px 0", fontSize: 13, lineHeight: 1.5, gap: 8 }}>
                <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.ai && (
        <>
          <div className={`text-[10px] uppercase tracking-[1.2px] font-semibold ${c.accent}`} style={{ marginBottom: 10 }}>{plan.aiLabel}</div>
          <ul className="list-none" style={{ marginBottom: 14 }}>
            {plan.ai.map((item, i) => (
              <li key={i} className="text-text-secondary flex items-start" style={{ padding: "4px 0", fontSize: 13, lineHeight: 1.5, gap: 8 }}>
                <span className={`font-bold shrink-0 mt-px text-[11px] ${c.checkColor}`}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {plan.bonus && (
        <div className={`text-xs rounded-lg ${c.subtle} border border-dashed ${c.bonusBorder} ${c.accent} font-medium`} style={{ marginTop: 4, padding: "10px 14px", fontSize: 12 }}>
          {plan.bonus}
        </div>
      )}

      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <a
          href={stripeLink || "#kontakt"}
          target={stripeLink ? "_blank" : undefined}
          rel={stripeLink ? "noopener noreferrer" : undefined}
          className={`block w-full text-center font-semibold text-white rounded-xl transition-all duration-200 ${btn.bg} ${btn.hover} ${plan.recommended ? btn.shadow : ""}`}
          style={{ padding: "14px 20px", fontSize: 14, textDecoration: "none" }}
        >
          {stripeLink ? "Zamów teraz →" : "Zapytaj o pakiet →"}
        </a>
        <div className="text-text-muted text-center" style={{ fontSize: 10, marginTop: 8 }}>
          Ceny netto w PLN · Bezterminowa umowa
        </div>
      </div>
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
        }`}>Pakiety cenowe</h2>
        <p className={`section-sub visible transition-colors duration-300 ${
          activeTab === "local" ? "!text-accent-light" :
          activeTab === "country" ? "!text-blue" :
          "!text-green"
        }`}>
          {"Umowa bezterminowa, 1-miesi\u0119czne wypowiedzenie. Wszystkie ceny netto."}
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
        <div className={`grid items-start ${gridClass[activeTab]}`} style={{ gap: 20 }}>
          {tabPlans[activeTab].map((plan, i) => (
            <PlanCard key={`${activeTab}-${i}`} plan={plan} tab={activeTab} />
          ))}
        </div>
      </div>
    </section>
  );
}
