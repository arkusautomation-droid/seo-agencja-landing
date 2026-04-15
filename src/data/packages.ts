/* ═══════════════════════════════════════
   PACKAGES — all SEO packages with pricing
   ═══════════════════════════════════════ */

export type BusinessType = "local" | "national" | "ecommerce";

export interface Package {
  id: string;
  name: string;
  category: BusinessType;
  categoryLabel: string;
  priceNetto: number;
  priceBrutto: number;
  description: string;
  features: string[];
  stripeLink: string;
  color: string;
}

const brutto = (n: number) => Math.round(n * 1.23 * 100) / 100;

// ── SEO LOKALNE ──

const localPackages: Package[] = [
  {
    id: "local-start",
    name: "Local Start",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 1000,
    priceBrutto: brutto(1000),
    description: "Małe firmy, 1 lokalizacja, niska konkurencja.",
    features: ["Audyt strony", "Optymalizacja on-site", "GA4 + Search Console", "5 fraz priorytetowych", "4 artykuły / mies."],
    stripeLink: "",
    color: "#f97316",
  },
  {
    id: "local-pro",
    name: "Local Pro",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 2000,
    priceBrutto: brutto(2000),
    description: "Lokalne firmy usługowe, większe miasta, kilka usług.",
    features: ["Wszystko z Local Start", "Wizytówka Google", "Analiza konkurencji", "10 fraz priorytetowych", "8 artykułów / mies.", "AI Q&A"],
    stripeLink: "",
    color: "#f97316",
  },
  {
    id: "local-leader",
    name: "Local Leader",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 3000,
    priceBrutto: brutto(3000),
    description: "Dominacja lokalna, wiele usług, duża konkurencja.",
    features: ["Pełny audyt + strategia treści", "Testy A/B", "15 fraz priorytetowych", "12 artykułów / mies.", "AI Topical Map", "GEO AI"],
    stripeLink: "",
    color: "#f97316",
  },
];

// ── SEO OGÓLNOPOLSKIE ──

const countryPackages: Package[] = [
  {
    id: "country-starter",
    name: "Country Starter",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 3000,
    priceBrutto: brutto(3000),
    description: "Firma ogólnopolska, nisza: strategiczne zdobywanie autorytetu.",
    features: ["Audyt + optymalizacja on-site", "GA4 + Search Console", "20 fraz priorytetowych", "12 artykułów / mies.", "AI Q&A"],
    stripeLink: "",
    color: "#3b82f6",
  },
  {
    id: "country-standard",
    name: "Country Standard",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 5000,
    priceBrutto: brutto(5000),
    description: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    features: ["30 fraz priorytetowych", "Klastry tematyczne", "20 artykułów / mies.", "GEO: AI Overview", "AI Topical Map"],
    stripeLink: "",
    color: "#3b82f6",
  },
  {
    id: "country-pro",
    name: "Country Pro",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 7000,
    priceBrutto: brutto(7000),
    description: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    features: ["50 fraz priorytetowych", "28 artykułów / mies.", "GEO + monitoring trendów", "Analiza widoczności AI (kwartalnie)"],
    stripeLink: "",
    color: "#3b82f6",
  },
  {
    id: "country-leader",
    name: "Country Leader",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 10000,
    priceBrutto: brutto(10000),
    description: "Content hub + topical map: strategiczne zdobywanie autorytetu.",
    features: ["75 fraz + pełna strategia content", "40 artykułów / mies.", "Dedykowany strateg SEO", "AI Brief strategiczny"],
    stripeLink: "",
    color: "#3b82f6",
  },
];

// ── SEO E-COMMERCE ──

const ecomPackages: Package[] = [
  {
    id: "ecom-starter",
    name: "E-Com Starter",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 3000,
    priceBrutto: brutto(3000),
    description: "Sklep 10 produktów / mies.",
    features: ["Audyt + optymalizacja on-site", "10 produktów / mies. (opisy + meta)", "12 artykułów / mies.", "AI Schema Product + Offer"],
    stripeLink: "",
    color: "#22c55e",
  },
  {
    id: "ecom-basic",
    name: "E-Com Basic",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 5000,
    priceBrutto: brutto(5000),
    description: "Sklep 15 produktów / mies.",
    features: ["15 produktów / mies.", "20 artykułów / mies.", "Monitoring trendów + raporty konkurencji", "AI Q&A produktów"],
    stripeLink: "",
    color: "#22c55e",
  },
  {
    id: "ecom-standard",
    name: "E-Com Standard",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 10000,
    priceBrutto: brutto(10000),
    description: "Sklep 20 produktów / mies.",
    features: ["20 produktów / mies.", "40 artykułów / mies.", "Konsultacje UX i CRO", "AI Topical Map kategorii"],
    stripeLink: "",
    color: "#22c55e",
  },
  {
    id: "ecom-pro",
    name: "E-Com Pro",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 15000,
    priceBrutto: brutto(15000),
    description: "Sklep 30 produktów / mies.",
    features: ["30 produktów / mies.", "60 artykułów / mies.", "GEO + integracja z rekomendacjami AI", "Omawianie raportów ze specjalistą"],
    stripeLink: "",
    color: "#22c55e",
  },
  {
    id: "ecom-leader",
    name: "E-Com Leader",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 20000,
    priceBrutto: brutto(20000),
    description: "Sklep 50 produktów / mies.",
    features: ["50 produktów / mies.", "80 artykułów / mies.", "GEO + monitoring globalny", "Dedykowany strateg", "Monitoring AI Overview"],
    stripeLink: "",
    color: "#22c55e",
  },
];

// ── EXPORT ──

export const ALL_PACKAGES: Package[] = [...localPackages, ...countryPackages, ...ecomPackages];

export function getPackagesByCategory(type: BusinessType): Package[] {
  return ALL_PACKAGES.filter((p) => p.category === type);
}

export function getPackageById(id: string): Package | undefined {
  return ALL_PACKAGES.find((p) => p.id === id);
}

/**
 * Pick the right package based on business type and audit score.
 */
export function pickPackage(type: BusinessType, auditScore: number, geoReadiness: number): Package {
  const pkgs = getPackagesByCategory(type);

  if (type === "local") {
    if (auditScore <= 50) return pkgs[1]; // Local Pro
    if (auditScore <= 75) return geoReadiness < 0.4 ? pkgs[2] : pkgs[1];
    return pkgs[2]; // Local Leader
  }

  if (type === "national") {
    if (auditScore <= 40) return pkgs[1]; // Country Standard
    if (auditScore <= 65) return pkgs[1];
    if (auditScore <= 85) return pkgs[2]; // Country Pro
    return pkgs[3]; // Country Leader
  }

  // ecommerce
  if (auditScore <= 30) return pkgs[0]; // Starter
  if (auditScore <= 50) return pkgs[1]; // Basic
  if (auditScore <= 70) return pkgs[2]; // Standard
  if (auditScore <= 85) return pkgs[3]; // Pro
  return pkgs[4]; // Leader
}
