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
  /** Stripe Payment Link URL — replace with live URLs after creating products in Stripe */
  stripeLink: string;
  color: string;
}

// ── SEO LOKALNE ──

const localPackages: Package[] = [
  {
    id: "local-start",
    name: "Local Start",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 1000,
    priceBrutto: 1230,
    description: "Solidne fundamenty SEO lokalnego dla małej firmy.",
    features: ["Audyt SEO", "Optymalizacja techniczna", "Google Moja Firma", "5 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#f97316",
  },
  {
    id: "local-standard",
    name: "Local Standard",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 1250,
    priceBrutto: 1537.5,
    description: "Pełna strategia SEO dla firmy lokalnej z ambicjami.",
    features: ["Wszystko z Start", "Content marketing", "Link building lokalny", "10 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#f97316",
  },
  {
    id: "local-pro",
    name: "Local Pro",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 1500,
    priceBrutto: 1845,
    description: "Zaawansowane SEO z budową autorytetu i widocznością w AI.",
    features: ["Wszystko z Standard", "Schema markup", "GEO podstawowe", "15 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#f97316",
  },
  {
    id: "local-leader",
    name: "Local Leader",
    category: "local",
    categoryLabel: "SEO Lokalne",
    priceNetto: 2000,
    priceBrutto: 2460,
    description: "Dominacja lokalnego rynku + pełna strategia GEO.",
    features: ["Wszystko z Pro", "Strategia GEO", "Zaawansowany link building", "Analityka AI", "20+ fraz"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#f97316",
  },
];

// ── SEO OGÓLNOPOLSKIE ──

const countryPackages: Package[] = [
  {
    id: "country-start",
    name: "Country Start",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 2500,
    priceBrutto: 3075,
    description: "Start pozycjonowania ogólnopolskiego.",
    features: ["Audyt SEO", "Optymalizacja techniczna", "Strategia treści", "15 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#3b82f6",
  },
  {
    id: "country-standard",
    name: "Country Standard",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 3500,
    priceBrutto: 4305,
    description: "Kompleksowe SEO ogólnopolskie z link buildingiem.",
    features: ["Wszystko z Start", "Link building premium", "Content marketing", "25 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#3b82f6",
  },
  {
    id: "country-pro",
    name: "Country Pro",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 5000,
    priceBrutto: 6150,
    description: "Zaawansowane pozycjonowanie z GEO i analityką AI.",
    features: ["Wszystko z Standard", "Strategia GEO", "Schema zaawansowany", "40 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#3b82f6",
  },
  {
    id: "country-leader",
    name: "Country Leader",
    category: "national",
    categoryLabel: "SEO Ogólnopolskie",
    priceNetto: 8000,
    priceBrutto: 9840,
    description: "Dominacja ogólnopolska + pełna widoczność w AI.",
    features: ["Wszystko z Pro", "Dominacja AI Overview", "Dedykowany strateg", "60+ fraz", "Raportowanie C-level"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#3b82f6",
  },
];

// ── SEO E-COMMERCE ──

const ecomPackages: Package[] = [
  {
    id: "ecom-basic",
    name: "Ecommerce Basic",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 10000,
    priceBrutto: 12300,
    description: "Fundamenty SEO dla sklepu internetowego.",
    features: ["Audyt techniczny e-com", "Optymalizacja kategorii", "Schema Product", "50 fraz kluczowych"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#22c55e",
  },
  {
    id: "ecom-pro",
    name: "Ecommerce Pro",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 15000,
    priceBrutto: 18450,
    description: "Pełna strategia SEO e-commerce z content marketingiem.",
    features: ["Wszystko z Basic", "Content marketing", "Link building", "Optymalizacja konwersji", "100 fraz"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#22c55e",
  },
  {
    id: "ecom-advanced",
    name: "Ecommerce Advanced",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 20000,
    priceBrutto: 24600,
    description: "Zaawansowane SEO e-commerce z GEO i AI.",
    features: ["Wszystko z Pro", "Strategia GEO", "AI-ready schema", "Analityka predykcyjna", "200 fraz"],
    stripeLink: "", // TODO: Stripe Payment Link
    color: "#22c55e",
  },
  {
    id: "ecom-leader",
    name: "Ecommerce Leader",
    category: "ecommerce",
    categoryLabel: "SEO E-commerce",
    priceNetto: 30000,
    priceBrutto: 36900,
    description: "Dominacja e-commerce — pełna widoczność organiczna + AI.",
    features: ["Wszystko z Advanced", "Dedykowany zespół", "Dominacja AI Overview", "Nieograniczone frazy", "SLA 24h"],
    stripeLink: "", // TODO: Stripe Payment Link
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
    if (auditScore <= 40) return pkgs[2]; // Local Pro — needs solid foundations
    if (auditScore <= 60) return pkgs[1]; // Local Standard — has base, time to grow
    if (auditScore <= 80) {
      return geoReadiness < 0.4 ? pkgs[3] : pkgs[1]; // Leader if no GEO, else Standard
    }
    return pkgs[3]; // Local Leader — dominate local
  }

  if (type === "national") {
    if (auditScore <= 40) return pkgs[1]; // Country Standard
    if (auditScore <= 60) return pkgs[0]; // Country Start or Standard
    if (auditScore <= 80) return pkgs[1]; // Country Standard or Pro
    return pkgs[2]; // Country Pro
  }

  // ecommerce
  if (auditScore <= 40) return pkgs[1]; // Ecommerce Pro
  if (auditScore <= 60) return pkgs[0]; // Ecommerce Basic
  if (auditScore <= 80) return pkgs[1]; // Ecommerce Pro
  return pkgs[2]; // Ecommerce Advanced
}
