"use client";

import { useState, useRef, useEffect } from "react";
import { pickPackage, getPackagesByCategory, ALL_PACKAGES, type Package, type BusinessType } from "@/data/packages";
import { getAuditPDFBase64 } from "@/lib/generateAuditPDF";

/* ═══════════════════════════════════════
   TYPES
   ═══════════════════════════════════════ */

interface CheckItem {
  label: string;
  status: "ok" | "warn" | "fail";
  detail: string;
  points: number;
  maxPoints: number;
}

interface ModuleResult {
  name: string;
  icon: string;
  items: CheckItem[];
  score: number;
  maxScore: number;
}

interface BusinessTypeResult {
  type: BusinessType;
  confidence: number;
  signals: string[];
  label: string;
  description: string;
}

interface AuditResult {
  url: string;
  domain: string;
  date: string;
  modules: ModuleResult[];
  totalScore: number;
  businessType: BusinessTypeResult;
  pkg: Package;
  recommendation: {
    reason: string;
    prognosis: string;
  };
  priorities: { level: "critical" | "important" | "optional"; text: string; packageAction: string }[];
}

/* ═══════════════════════════════════════
   LOADING MESSAGES
   ═══════════════════════════════════════ */

const LOADING_MSGS = [
  "Sprawdzam SSL i bezpieczeństwo...",
  "Analizuję meta tagi...",
  "Sprawdzam strukturę nagłówków...",
  "Analizuję obrazki i alt tagi...",
  "Sprawdzam schema markup...",
  "Analizuję Open Graph...",
  "Sprawdzam robots.txt...",
  "Szukam sitemap.xml...",
  "Oceniam gotowość na AI...",
  "Rozpoznaję typ firmy...",
  "Analizuję profil biznesowy...",
  "Dobieram optymalny pakiet...",
  "Przygotowuję raport...",
];

/* ═══════════════════════════════════════
   CORS PROXIES (with fallback)
   ═══════════════════════════════════════ */

const PROXIES = [
  (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
];

async function fetchViaProxy(url: string, timeout = 15000): Promise<{ html: string; loadTime: number; ok: boolean; statusCode: number }> {
  const start = Date.now();
  for (const mkUrl of PROXIES) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      const resp = await fetch(mkUrl(url), { signal: controller.signal });
      clearTimeout(timer);
      if (!resp.ok) continue;
      const html = await resp.text();
      if (html.length > 50) {
        return { html, loadTime: Date.now() - start, ok: true, statusCode: resp.status };
      }
    } catch {
      // try next proxy
    }
  }
  return { html: "", loadTime: Date.now() - start, ok: false, statusCode: 0 };
}

async function checkUrlExists(url: string): Promise<boolean> {
  for (const mkUrl of PROXIES) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const resp = await fetch(mkUrl(url), { signal: controller.signal });
      clearTimeout(timer);
      if (!resp.ok) continue;
      const text = await resp.text();
      if (text.length > 50) return true;
    } catch {
      // try next proxy
    }
  }
  return false;
}

/* ═══════════════════════════════════════
   BUSINESS TYPE DETECTION
   ═══════════════════════════════════════ */

function analyzeBusinessType(html: string, doc: Document, url: string): BusinessTypeResult {
  const signals: { type: string; signal: string }[] = [];
  const text = doc.body?.textContent?.toLowerCase() || "";
  const htmlLower = html.toLowerCase();

  // ════════════════════════════════════════════════════════════════════
  // KROK 1: E-COMMERCE KNOCKOUT — jeden sygnał wystarczy → natychmiast e-commerce
  // ════════════════════════════════════════════════════════════════════

  // 1a. Platformy e-commerce w kodzie źródłowym (klasy, skrypty, meta, linki, cookies)
  const knockoutPlatforms: [RegExp, string][] = [
    [/shoper/i, "Shoper"],
    [/woocommerce|wc-cart|wc-block|wp-content[^"]*woo/i, "WooCommerce"],
    [/cdn\.shopify|shopify\.com|Shopify\./i, "Shopify"],
    [/prestashop/i, "PrestaShop"],
    [/magento|Mage\./i, "Magento"],
    [/idosell|iai-shop|iai\.pl/i, "IdoSell"],
    [/baselinker/i, "BaseLinker"],
    [/sote\.pl/i, "SOTE"],
    [/sky-shop|skyshop/i, "Sky-Shop"],
    [/shoplo/i, "Shoplo"],
    [/redcart/i, "RedCart"],
    [/atomstore/i, "AtomStore"],
    [/shopgold/i, "ShopGold"],
  ];
  for (const [re, name] of knockoutPlatforms) {
    if (re.test(htmlLower)) {
      signals.push({ type: "ecommerce", signal: `platforma ${name}` });
      return ecomResult(100, signals);
    }
  }

  // 1b. Struktura URL typowa dla sklepu
  if (/\/product\/|\/produkt\/|\/p\/\d|\/pl\/p\/|\/cart|\/koszyk|\/checkout|\/zamowienie|\/order/i.test(htmlLower)) {
    signals.push({ type: "ecommerce", signal: "URL sklepu (/product, /cart, /checkout)" });
    return ecomResult(95, signals);
  }

  // 1c. Meta tagi sklepu
  if (/og:type["']\s*content=["']product/i.test(htmlLower) || /content=["']product["']/i.test(htmlLower)) {
    signals.push({ type: "ecommerce", signal: "og:type = product" });
    return ecomResult(95, signals);
  }
  if (/<meta[^>]*generator[^>]*shoper/i.test(htmlLower)) {
    signals.push({ type: "ecommerce", signal: "meta generator: Shoper" });
    return ecomResult(100, signals);
  }

  // 1d. Schema Product / Offer
  if (/"@type"\s*:\s*"Product"|"@type"\s*:\s*"Offer"|"@type"\s*:\s*"AggregateOffer"/i.test(html)) {
    signals.push({ type: "ecommerce", signal: "Schema Product/Offer" });
    return ecomResult(95, signals);
  }

  // ════════════════════════════════════════════════════════════════════
  // KROK 2: E-COMMERCE SILNE SYGNAŁY — 2+ = e-commerce
  // ════════════════════════════════════════════════════════════════════

  let ecomStrongCount = 0;

  // Koszyk / cart / do kasy
  if (/koszyk|cart|do kasy|suma:?\s*\d|sum[a:]?\s*0/i.test(htmlLower)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "koszyk / do kasy" });
  }

  // Dodaj do koszyka / Kup teraz
  if (/dodaj do koszyka|add to cart|kup teraz|buy now|zamów teraz|do koszyka/i.test(htmlLower)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "dodaj do koszyka / kup teraz" });
  }

  // Ceny produktów (3+ cen w formacie XX,XX zł)
  const priceMatches = text.match(/\d+[.,]\d{2}\s*(zł|pln)/gi);
  if (priceMatches && priceMatches.length >= 3) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: `${priceMatches.length} cen produktów` });
  }

  // Konto klienta
  if (/zarejestruj się|zaloguj się|moje konto|mój koszyk|my account|log in.*sign up/i.test(htmlLower)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "konto klienta (rejestracja/logowanie)" });
  }

  // Wysyłka / dostawa / zwroty
  if (/wysyłka|dostawa|zwroty|regulamin sklepu|czas realizacji|darmowa dostawa|dostawa.*gratis|koszt dostawy/i.test(text)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "wysyłka / dostawa / zwroty" });
  }

  // Kody rabatowe / kupony / promocje zakupowe
  if (/kod rabatowy|kupon|kody rabatowe|kod promocyjny|voucher|wyprzedaż|outlet|bestsellery|nowości|promocj/i.test(text)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "kody rabatowe / promocje / outlet" });
  }

  // Kategorie produktowe (wiele linków do kategorii)
  const categoryLinks = doc.querySelectorAll('a[href*="/kategori"], a[href*="/category"], a[href*="/c/"], a[href*="/collections"], a[href*="/produkty"], a[href*="/products"]');
  if (categoryLinks.length >= 3) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: `${categoryLinks.length} linków do kategorii` });
  }

  // Integracje płatności
  if (/payu|przelewy24|tpay|blik|paypal|stripe|dotpay|imoje|klarna/i.test(htmlLower)) {
    ecomStrongCount++;
    signals.push({ type: "ecommerce", signal: "integracja płatności online" });
  }

  // 2+ silnych sygnałów = e-commerce
  if (ecomStrongCount >= 2) {
    return ecomResult(60 + ecomStrongCount * 10, signals);
  }

  // ════════════════════════════════════════════════════════════════════
  // KROK 3: E-COMMERCE SŁABE (potwierdzające)
  // ════════════════════════════════════════════════════════════════════

  let ecomWeakCount = 0;
  if (/sklep internetowy|sklep online|kup online|e-shop|shop online/i.test(text)) {
    ecomWeakCount++;
    signals.push({ type: "ecommerce", signal: "frazy 'sklep internetowy'" });
  }
  if (/polityka zwrotów|regulamin zakupów|warunki zakupu|regulamin sprzedaży/i.test(text)) {
    ecomWeakCount++;
    signals.push({ type: "ecommerce", signal: "regulamin zakupów/zwrotów" });
  }

  // 1 silny + 1 słaby = e-commerce
  if (ecomStrongCount >= 1 && ecomWeakCount >= 1) {
    return ecomResult(60, signals);
  }

  // ════════════════════════════════════════════════════════════════════
  // KROK 4: LOCAL vs NATIONAL (tylko jeśli NIE e-commerce)
  // ════════════════════════════════════════════════════════════════════

  let localScore = 0;
  let nationalScore = 0;

  // ── LOCAL signals ──
  if (/ul\.\s*\w+|al\.\s*\w+|os\.\s*\w+|plac\s+\w+/i.test(text)) {
    localScore += 20;
    signals.push({ type: "local", signal: "adres fizyczny" });
  }
  const phoneMatch = text.match(/\+?48[\s-]?\d{2,3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\d{2,3}[\s-]\d{3}[\s-]\d{2,3}[\s-]\d{2,3}/g);
  if (phoneMatch && phoneMatch.length <= 3) {
    localScore += 10;
    signals.push({ type: "local", signal: "telefon kontaktowy" });
  }
  const localCityPattern = /w\s+(legnicy|warszawie|krakowie|wrocławiu|poznaniu|gdańsku|łodzi|katowicach|lublinie|szczecinie|bydgoszczy|białymstoku|olsztynie|toruniu|rzeszowie|kielcach|opolu|gorzowie|zielonej górze)/i;
  if (localCityPattern.test(text) || /na terenie|w obrębie|i okolice|i okolicy|obsługujemy.*miasto/i.test(text)) {
    localScore += 20;
    signals.push({ type: "local", signal: "frazy lokalne" });
  }
  if (/maps\.google|google\.com\/maps|goo\.gl\/maps|maps\.googleapis|iframe.*google.*maps/i.test(htmlLower)) {
    localScore += 15;
    signals.push({ type: "local", signal: "mapa Google" });
  }
  if (/fryzjer|dentysta|stomatolog|hydraulik|mechanik|restauracja|pizzeria|salon kosmetyczny|kancelaria|biuro rachunkowe|warsztat|gabinet|apteka|pralnia|kwiaciarnia|piekarnia|cukiernia|fotograf|weterynarz|fizjoterapeut|masaż|trener personalny|notariusz|adwokat|radca prawny/i.test(text)) {
    localScore += 25;
    signals.push({ type: "local", signal: "branża lokalna" });
  }
  if (/"@type"\s*:\s*"LocalBusiness"|"@type"\s*:\s*"Dentist"|"@type"\s*:\s*"Restaurant"|"@type"\s*:\s*"AutoRepair"|"@type"\s*:\s*"BeautySalon"|"@type"\s*:\s*"LegalService"/i.test(html)) {
    localScore += 20;
    signals.push({ type: "local", signal: "Schema LocalBusiness" });
  }

  // ── NATIONAL signals ──
  const bigCities = ["warszaw", "kraków", "krakow", "wrocław", "wroclaw", "poznań", "poznan", "gdańsk", "gdansk", "łódź", "lodz", "katowic", "lublin", "szczecin", "bydgoszcz", "białystok", "bialystok", "rzeszów", "rzeszow", "toruń", "torun", "kielc", "olsztyn", "opol"];
  let citiesFound = 0;
  for (const city of bigCities) {
    if (text.includes(city)) citiesFound++;
  }
  if (citiesFound >= 3) {
    nationalScore += 30;
    signals.push({ type: "national", signal: `${citiesFound} dużych miast` });
  }
  if (/w całej Polsce|ogólnopolsk|cały kraj|na terenie całego kraju|dostawy.*polska|zasięg.*ogólnopolsk|na terenie Polski/i.test(text)) {
    nationalScore += 25;
    signals.push({ type: "national", signal: "frazy ogólnopolskie" });
  }
  const cityLinks = doc.querySelectorAll('a[href*="/warszawa"], a[href*="/krakow"], a[href*="/wroclaw"], a[href*="/poznan"], a[href*="/gdansk"], a[href*="/katowice"], a[href*="/lodz"], a[href*="/lublin"]');
  if (cityLinks.length >= 2) {
    nationalScore += 20;
    signals.push({ type: "national", signal: "podstrony per miasto" });
  }
  if (/sieć\s|oddziały|oddziałów|filie|placówki|placówek|biura\s+w|biur\s+w|punkty?\s+(odbioru|nadania|obsługi)|punkt(ów|y)\s/i.test(text)) {
    nationalScore += 20;
    signals.push({ type: "national", signal: "sieć oddziałów" });
  }
  if (/software house|agencja\s+(marketingowa|reklamowa|interaktywna|seo|pr)|konsulting|doradztwo|szkolenia.*ogólnopolsk|b2b|hurtownia/i.test(text)) {
    nationalScore += 15;
    signals.push({ type: "national", signal: "usługi B2B/profesjonalne" });
  }
  if (/paczkomat|kurier|przesyłk|paczk[aię]|nadaj|nadanie|śledzenie|tracking|punkt.*odbioru|logistyk/i.test(text)) {
    nationalScore += 25;
    signals.push({ type: "national", signal: "logistyka/przesyłki" });
  }
  if (/ubezpiecz|polisa|bank.*online|konto.*bankowe|kredyt|pożyczk|leasing|faktoring/i.test(text)) {
    nationalScore += 20;
    signals.push({ type: "national", signal: "finanse/ubezpieczenia" });
  }
  const hreflangLinks = doc.querySelectorAll('link[rel="alternate"][hreflang]');
  if (hreflangLinks.length >= 2) {
    nationalScore += 15;
    signals.push({ type: "national", signal: `${hreflangLinks.length} wersji językowych` });
  }
  const allInternalLinks = doc.querySelectorAll(`a[href^="/"], a[href*="${new URL(url).hostname}"]`);
  if (allInternalLinks.length > 80) {
    nationalScore += 10;
    signals.push({ type: "national", signal: "rozbudowana nawigacja" });
  }

  // ── Jeszcze raz: jeśli jest JAKIKOLWIEK silny sygnał ecom i reszta słaba → ecom ──
  if (ecomStrongCount >= 1 && localScore < 50 && nationalScore < 50) {
    return ecomResult(55, signals);
  }

  // ── Determine winner: national vs local ──
  let type: BusinessType;
  if (nationalScore > localScore && nationalScore > 40) {
    type = "national";
  } else if (localScore > 0) {
    type = "local";
  } else {
    type = "local"; // default
  }

  const winnerScore = type === "national" ? nationalScore : localScore;
  const confidence = winnerScore > 0 ? Math.min(100, Math.round((winnerScore / 70) * 100)) : 30;
  const typeSignals = signals.filter((s) => s.type === type).map((s) => s.signal);

  const labels: Record<BusinessType, string> = {
    local: "Firma lokalna",
    national: "Firma ogólnopolska",
    ecommerce: "Sklep internetowy",
  };
  const descriptions: Record<BusinessType, string> = {
    local: "Firma usługowa działająca w obrębie jednego miasta lub regionu.",
    national: "Firma z zasięgiem ogólnopolskim — wiele lokalizacji lub usługi w całej Polsce.",
    ecommerce: "Sklep internetowy — sprzedaż produktów online z dostawą.",
  };

  return { type, confidence, signals: typeSignals, label: labels[type], description: descriptions[type] };

  // ── Helper: build e-commerce result ──
  function ecomResult(conf: number, sigs: { type: string; signal: string }[]): BusinessTypeResult {
    return {
      type: "ecommerce",
      confidence: Math.min(100, conf),
      signals: sigs.filter((s) => s.type === "ecommerce").map((s) => s.signal),
      label: "Sklep internetowy",
      description: "Sklep internetowy — sprzedaż produktów online z dostawą.",
    };
  }
}

/* ═══════════════════════════════════════
   ANALYSIS ENGINE
   ═══════════════════════════════════════ */

function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
}

function analyzeModule1Technical(url: string, html: string, doc: Document, loadTime: number): ModuleResult {
  const items: CheckItem[] = [];

  // SSL
  const hasSSL = url.startsWith("https://");
  items.push({
    label: "Certyfikat SSL (HTTPS)",
    status: hasSSL ? "ok" : "fail",
    detail: hasSSL ? "Strona używa szyfrowanego połączenia HTTPS" : "Brak HTTPS — strona nie jest bezpieczna. Google obniża pozycje stron bez SSL.",
    points: hasSSL ? 5 : 0,
    maxPoints: 5,
  });

  // Viewport
  const viewport = doc.querySelector('meta[name="viewport"]');
  const hasViewport = !!viewport;
  items.push({
    label: "Responsywność (meta viewport)",
    status: hasViewport ? "ok" : "fail",
    detail: hasViewport ? "Strona ma tag viewport — poprawnie wyświetla się na urządzeniach mobilnych" : "Brak meta viewport — strona może źle wyświetlać się na telefonach.",
    points: hasViewport ? 5 : 0,
    maxPoints: 5,
  });

  // Favicon
  const favicon = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  const hasFavicon = !!favicon;
  items.push({
    label: "Favicon",
    status: hasFavicon ? "ok" : "warn",
    detail: hasFavicon ? "Strona ma ikonę favicon" : "Brak favicon — drobny element, ale wpływa na rozpoznawalność w zakładkach i wynikach.",
    points: hasFavicon ? 3 : 0,
    maxPoints: 3,
  });

  // Load time (estimated via proxy — actual times may differ)
  const fastEnough = loadTime < 3000;
  const moderate = loadTime < 6000;
  items.push({
    label: `Czas odpowiedzi serwera (~${(loadTime / 1000).toFixed(1)}s)`,
    status: fastEnough ? "ok" : moderate ? "warn" : "fail",
    detail: fastEnough
      ? "Serwer odpowiada szybko — dobra baza dla Core Web Vitals"
      : moderate
        ? "Czas odpowiedzi serwera jest przeciętny — warto zoptymalizować hosting lub cache"
        : "Serwer odpowiada wolno — to negatywnie wpływa na pozycje i konwersję.",
    points: fastEnough ? 5 : moderate ? 3 : 0,
    maxPoints: 5,
  });

  // Page size
  const sizeKB = Math.round(html.length / 1024);
  const sizeOk = sizeKB < 200;
  const sizeWarn = sizeKB < 500;
  items.push({
    label: `Rozmiar HTML (${sizeKB} KB)`,
    status: sizeOk ? "ok" : sizeWarn ? "warn" : "fail",
    detail: sizeOk
      ? "Rozmiar HTML jest optymalny"
      : sizeWarn
        ? "HTML jest nieco duży — rozważ optymalizację"
        : "HTML jest bardzo duży — może spowalniać ładowanie.",
    points: sizeOk ? 4 : sizeWarn ? 2 : 0,
    maxPoints: 4,
  });

  // Charset
  const charset = doc.querySelector('meta[charset]') || doc.querySelector('meta[http-equiv="Content-Type"]');
  items.push({
    label: "Kodowanie znaków (charset)",
    status: charset ? "ok" : "warn",
    detail: charset ? "Strona deklaruje kodowanie znaków" : "Brak deklaracji charset — może powodować problemy z polskimi znakami.",
    points: charset ? 3 : 1,
    maxPoints: 3,
  });

  // Language attribute
  const htmlLang = doc.documentElement?.getAttribute("lang");
  items.push({
    label: "Atrybut lang",
    status: htmlLang ? "ok" : "warn",
    detail: htmlLang
      ? `Strona deklaruje język: "${htmlLang}"`
      : "Brak atrybutu lang na <html> — Google może nieprawidłowo określić język strony.",
    points: htmlLang ? 2 : 0,
    maxPoints: 2,
  });

  const score = items.reduce((s, i) => s + i.points, 0);
  const maxScore = items.reduce((s, i) => s + i.maxPoints, 0);

  return { name: "Analiza techniczna", icon: "tech", items, score, maxScore };
}

function analyzeModule2OnPage(url: string, html: string, doc: Document): ModuleResult {
  const items: CheckItem[] = [];

  // Title
  const title = doc.querySelector("title")?.textContent?.trim() || "";
  const titleLen = title.length;
  const titleOk = titleLen >= 30 && titleLen <= 65;
  items.push({
    label: `Tag title (${titleLen} znaków)`,
    status: titleLen === 0 ? "fail" : titleOk ? "ok" : "warn",
    detail: titleLen === 0
      ? "Brak tagu title — to krytyczny błąd SEO!"
      : titleOk
        ? `Title: "${title.substring(0, 60)}${title.length > 60 ? "..." : ""}"`
        : titleLen < 30
          ? `Title za krótki (${titleLen} znaków, optymalnie 50-60). "${title}"`
          : `Title za długi (${titleLen} znaków, optymalnie 50-60). "${title.substring(0, 50)}..."`,
    points: titleLen === 0 ? 0 : titleOk ? 4 : 2,
    maxPoints: 4,
  });

  // Meta description
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || "";
  const descLen = desc.length;
  const descOk = descLen >= 120 && descLen <= 165;
  const descWarn = descLen > 0;
  items.push({
    label: `Meta description (${descLen} znaków)`,
    status: descOk ? "ok" : descLen === 0 ? "fail" : descWarn ? "warn" : "fail",
    detail: descLen === 0
      ? "Brak meta description — Google wyświetli losowy fragment strony."
      : descOk
        ? "Meta description ma optymalną długość"
        : `Meta description ma ${descLen} znaków (optymalnie 150-160).`,
    points: descOk ? 4 : descLen > 0 ? 2 : 0,
    maxPoints: 4,
  });

  // H1
  const h1s = doc.querySelectorAll("h1");
  const h1Count = h1s.length;
  const h1Text = (h1s[0]?.textContent || "").trim();
  const h1Ok = h1Count === 1 && h1Text.length > 0;
  items.push({
    label: `Nagłówek H1 (${h1Count} szt.)`,
    status: h1Count === 0 ? "fail" : h1Ok ? "ok" : "warn",
    detail: h1Count === 0
      ? "Brak nagłówka H1 — kluczowy element SEO!"
      : h1Ok
        ? `Jeden H1: "${h1Text.substring(0, 60)}${h1Text.length > 60 ? "..." : ""}"`
        : h1Text.length === 0
          ? "Nagłówek H1 jest pusty — dodaj tekst opisujący główny temat strony."
          : `Znaleziono ${h1Count} nagłówków H1 — powinien być dokładnie jeden.`,
    points: h1Ok ? 3 : h1Count > 0 ? 1 : 0,
    maxPoints: 3,
  });

  // Heading hierarchy
  const h2Count = doc.querySelectorAll("h2").length;
  const h3Count = doc.querySelectorAll("h3").length;
  const hasStructure = h2Count >= 2;
  items.push({
    label: `Struktura nagłówków (H2: ${h2Count}, H3: ${h3Count})`,
    status: hasStructure ? "ok" : h2Count > 0 ? "warn" : "fail",
    detail: hasStructure
      ? "Dobra struktura nagłówków wspiera SEO i czytelność"
      : "Słaba struktura nagłówków — dodaj podsekcje H2/H3 dla lepszej organizacji treści.",
    points: hasStructure ? 3 : h2Count > 0 ? 1 : 0,
    maxPoints: 3,
  });

  // Images & alt tags
  const imgs = doc.querySelectorAll("img");
  const imgCount = imgs.length;
  const withAlt = Array.from(imgs).filter((i) => i.getAttribute("alt")?.trim()).length;
  const altRatio = imgCount > 0 ? withAlt / imgCount : 1;
  items.push({
    label: `Obrazki z alt (${withAlt}/${imgCount})`,
    status: altRatio >= 0.9 ? "ok" : altRatio >= 0.5 ? "warn" : imgCount === 0 ? "ok" : "fail",
    detail: imgCount === 0
      ? "Brak obrazków na stronie"
      : altRatio >= 0.9
        ? "Prawie wszystkie obrazki mają atrybut alt"
        : `${imgCount - withAlt} obrazków bez alt — to problem dla SEO i dostępności.`,
    points: altRatio >= 0.9 ? 3 : altRatio >= 0.5 ? 1 : 0,
    maxPoints: 3,
  });

  // Links
  const allLinks = doc.querySelectorAll("a[href]");
  const internalLinks = Array.from(allLinks).filter((a) => {
    const href = a.getAttribute("href") || "";
    return href.startsWith("/") || href.startsWith("#") || href.includes(new URL(url).hostname);
  }).length;
  const externalLinks = allLinks.length - internalLinks;
  items.push({
    label: `Linki (wewnętrzne: ${internalLinks}, zewnętrzne: ${externalLinks})`,
    status: internalLinks >= 3 ? "ok" : internalLinks >= 1 ? "warn" : "fail",
    detail: internalLinks >= 3
      ? "Dobra struktura linków wewnętrznych"
      : "Za mało linków wewnętrznych — popraw nawigację i cross-linking.",
    points: internalLinks >= 3 ? 3 : internalLinks >= 1 ? 1 : 0,
    maxPoints: 3,
  });

  // URL structure (clean URLs)
  const urlPath = new URL(url).pathname;
  const hasCleanUrl = !urlPath.includes("?") && !urlPath.match(/\d{5,}/) && !urlPath.includes(".php");
  items.push({
    label: "Struktura URL",
    status: hasCleanUrl ? "ok" : "warn",
    detail: hasCleanUrl
      ? "Czyste, przyjazne adresy URL"
      : "URL zawiera parametry lub identyfikatory — przyjazne URL poprawiają CTR.",
    points: hasCleanUrl ? 2 : 0,
    maxPoints: 2,
  });

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]');
  items.push({
    label: "Canonical URL",
    status: canonical ? "ok" : "warn",
    detail: canonical
      ? "Strona ma tag canonical — zapobiega duplicate content"
      : "Brak canonical URL — ryzyko problemów z duplikatem treści.",
    points: canonical ? 2 : 0,
    maxPoints: 2,
  });

  // Robots meta
  const robotsMeta = doc.querySelector('meta[name="robots"]');
  const noindex = robotsMeta?.getAttribute("content")?.includes("noindex");
  items.push({
    label: "Meta robots",
    status: noindex ? "fail" : robotsMeta ? "ok" : "warn",
    detail: noindex
      ? "Strona ma ustawiony noindex — nie pojawi się w Google!"
      : robotsMeta
        ? "Meta robots jest poprawnie skonfigurowany"
        : "Brak meta robots — domyślnie Google indeksuje, ale warto określić jawnie.",
    points: noindex ? 0 : robotsMeta ? 3 : 2,
    maxPoints: 3,
  });

  const score = items.reduce((s, i) => s + i.points, 0);
  const maxScore = items.reduce((s, i) => s + i.maxPoints, 0);

  return { name: "SEO on-page", icon: "seo", items, score, maxScore };
}

function analyzeModule3Content(html: string, doc: Document): ModuleResult {
  const items: CheckItem[] = [];

  // Text content length
  const bodyText = doc.body?.textContent?.replace(/\s+/g, " ").trim() || "";
  const charCount = bodyText.length;
  const hasEnoughText = charCount > 3000;
  const hasModerateText = charCount > 1000;
  items.push({
    label: `Ilość tekstu (${charCount.toLocaleString("pl")} znaków)`,
    status: hasEnoughText ? "ok" : hasModerateText ? "warn" : "fail",
    detail: hasEnoughText
      ? "Strona ma wystarczająco dużo treści tekstowej"
      : hasModerateText
        ? "Mało treści tekstowej — rozważ rozbudowanie opisów i sekcji informacyjnych"
        : "Bardzo mało tekstu — Google potrzebuje treści żeby zrozumieć stronę.",
    points: hasEnoughText ? 7 : hasModerateText ? 3 : 0,
    maxPoints: 7,
  });

  // Schema markup
  const schemas = doc.querySelectorAll('script[type="application/ld+json"]');
  const hasSchema = schemas.length > 0;
  let schemaTypes: string[] = [];
  schemas.forEach((s) => {
    try {
      const data = JSON.parse(s.textContent || "");
      if (data["@type"]) schemaTypes.push(data["@type"]);
      if (Array.isArray(data["@graph"])) {
        data["@graph"].forEach((g: Record<string, string>) => { if (g["@type"]) schemaTypes.push(g["@type"]); });
      }
    } catch { /* ignore */ }
  });
  items.push({
    label: `Schema markup (${schemas.length} bloków)`,
    status: hasSchema ? "ok" : "fail",
    detail: hasSchema
      ? `Znaleziono schema: ${schemaTypes.join(", ") || "JSON-LD"}`
      : "Brak schema markup — Google i AI nie rozumieją struktury Twojej strony.",
    points: hasSchema ? 6 : 0,
    maxPoints: 6,
  });

  // Open Graph
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  const ogDesc = doc.querySelector('meta[property="og:description"]');
  const ogImage = doc.querySelector('meta[property="og:image"]');
  const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  items.push({
    label: `Open Graph tags (${ogCount}/3)`,
    status: ogCount === 3 ? "ok" : ogCount > 0 ? "warn" : "fail",
    detail: ogCount === 3
      ? "Kompletne Open Graph tags — strona dobrze wyświetla się w social mediach"
      : ogCount > 0
        ? "Niekompletne Open Graph tags — brakuje " + [!ogTitle && "og:title", !ogDesc && "og:description", !ogImage && "og:image"].filter(Boolean).join(", ")
        : "Brak Open Graph tags — linki do strony wyglądają źle w social mediach.",
    points: ogCount === 3 ? 6 : ogCount > 0 ? 3 : 0,
    maxPoints: 6,
  });

  // Twitter Card
  const twitterCard = doc.querySelector('meta[name="twitter:card"]');
  const twitterTitle = doc.querySelector('meta[name="twitter:title"]');
  const twCount = [twitterCard, twitterTitle].filter(Boolean).length;
  items.push({
    label: `Twitter Card (${twCount}/2)`,
    status: twCount === 2 ? "ok" : twCount > 0 ? "warn" : "warn",
    detail: twCount === 2
      ? "Twitter Card tags są kompletne"
      : "Brak lub niekompletne Twitter Card tags — wpływa na wygląd linków na X/Twitter.",
    points: twCount === 2 ? 3 : twCount > 0 ? 1 : 0,
    maxPoints: 3,
  });

  // Hreflang
  const hreflang = doc.querySelectorAll('link[hreflang]');
  items.push({
    label: `Hreflang (${hreflang.length} wersji)`,
    status: hreflang.length > 0 ? "ok" : "warn",
    detail: hreflang.length > 0
      ? `Strona deklaruje ${hreflang.length} wersji językowych`
      : "Brak hreflang — opcjonalne, ale ważne jeśli celujesz w międzynarodowy ruch.",
    points: hreflang.length > 0 ? 6 : 2,
    maxPoints: 6,
  });

  const score = items.reduce((s, i) => s + i.points, 0);
  const maxScore = items.reduce((s, i) => s + i.maxPoints, 0);

  return { name: "Analiza treści", icon: "content", items, score, maxScore };
}

function analyzeModule4GEO(html: string, doc: Document): ModuleResult {
  const items: CheckItem[] = [];

  // FAQ / Q&A format
  const hasFAQ = html.includes("FAQPage") || doc.querySelectorAll('details, [itemtype*="Question"]').length > 0;
  const hasQAText = html.toLowerCase().includes("faq") || html.includes("pytania") || html.includes("odpowiedzi");
  items.push({
    label: "Format FAQ / Q&A",
    status: hasFAQ ? "ok" : hasQAText ? "warn" : "fail",
    detail: hasFAQ
      ? "Strona zawiera treści w formacie FAQ — idealne dla AI"
      : hasQAText
        ? "Znaleziono elementy Q&A, ale brak formalnej struktury FAQ"
        : "Brak treści w formacie pytanie-odpowiedź — AI trudniej cytować Twoją stronę.",
    points: hasFAQ ? 7 : hasQAText ? 3 : 0,
    maxPoints: 7,
  });

  // Structured data for AI
  const hasSpeakable = html.includes("speakable");
  const hasHowTo = html.includes("HowTo");
  const hasFAQSchema = html.includes("FAQPage");
  const aiSchemaCount = [hasSpeakable, hasHowTo, hasFAQSchema].filter(Boolean).length;
  items.push({
    label: `Schema AI-ready (${aiSchemaCount}/3)`,
    status: aiSchemaCount >= 2 ? "ok" : aiSchemaCount > 0 ? "warn" : "fail",
    detail: aiSchemaCount >= 2
      ? "Dane strukturalne gotowe na AI: " + [hasSpeakable && "speakable", hasHowTo && "HowTo", hasFAQSchema && "FAQPage"].filter(Boolean).join(", ")
      : aiSchemaCount > 0
        ? "Częściowe schema AI-ready — dodaj więcej typów (speakable, HowTo, FAQPage)"
        : "Brak schema przystosowanych do AI — Twoja strona jest niewidoczna dla ChatGPT i Gemini.",
    points: aiSchemaCount >= 2 ? 7 : aiSchemaCount > 0 ? 3 : 0,
    maxPoints: 7,
  });

  // Content depth & authority
  const bodyText = doc.body?.textContent || "";
  const wordCount = bodyText.split(/\s+/).length;
  const isLong = wordCount > 800;
  const isMedium = wordCount > 300;
  items.push({
    label: `Głębokość treści (${wordCount} słów)`,
    status: isLong ? "ok" : isMedium ? "warn" : "fail",
    detail: isLong
      ? "Treść jest wystarczająco rozbudowana — AI ceni autorytatywne, szczegółowe źródła"
      : isMedium
        ? "Treść jest przeciętna — rozbuduj ją o szczegóły, przykłady i dane"
        : "Za mało treści — AI ignoruje strony z thin content.",
    points: isLong ? 6 : isMedium ? 3 : 0,
    maxPoints: 6,
  });

  // Authorship
  const hasAuthor = html.includes("author") || html.includes("autor") || doc.querySelector('[rel="author"], .author, [itemprop="author"]') !== null;
  const hasAbout = doc.querySelector('a[href*="about"], a[href*="o-nas"], a[href*="o-firmie"]') !== null || html.toLowerCase().includes("o nas") || html.toLowerCase().includes("o firmie");
  items.push({
    label: "Autorstwo i wiarygodność",
    status: hasAuthor && hasAbout ? "ok" : hasAuthor || hasAbout ? "warn" : "fail",
    detail: hasAuthor && hasAbout
      ? "Strona sygnalizuje autorstwo i prezentuje firmę — buduje E-E-A-T"
      : hasAuthor || hasAbout
        ? "Częściowe sygnały autorstwa — dodaj więcej informacji o autorze/firmie"
        : "Brak informacji o autorze i firmie — AI nie traktuje anonimowych stron jako wiarygodne.",
    points: hasAuthor && hasAbout ? 5 : hasAuthor || hasAbout ? 2 : 0,
    maxPoints: 5,
  });

  const score = items.reduce((s, i) => s + i.points, 0);
  const maxScore = items.reduce((s, i) => s + i.maxPoints, 0);

  return { name: "Gotowość na AI (GEO)", icon: "ai", items, score, maxScore };
}

function getRecommendation(totalScore: number, modules: ModuleResult[], btype: BusinessTypeResult): { pkg: Package; reason: string; prognosis: string } {
  const geoScore = modules[3].score / modules[3].maxScore;
  const pkg = pickPackage(btype.type, totalScore, geoScore);

  // Dynamic reason based on score + type
  let reason: string;
  if (totalScore <= 40) {
    reason = `Twoja strona wymaga pilnej interwencji. Jako ${btype.label.toLowerCase()}, potrzebujesz kompleksowego audytu, optymalizacji technicznej i strategii treści dopasowanej do Twojego rynku.`;
  } else if (totalScore <= 60) {
    reason = `Masz podstawy, ale tracisz klientów przez niekompletną optymalizację. ${btype.label} potrzebuje systematycznego podejścia do budowy widoczności${geoScore < 0.4 ? " — szczególnie w AI (GEO)" : ""}.`;
  } else if (totalScore <= 80) {
    reason = `Dobra baza techniczna${geoScore < 0.4 ? ", ale brakuje widoczności w AI (GEO) — to nowy kanał pozyskiwania klientów" : ""}. Pakiet ${pkg.name} pomoże Ci osiągnąć kolejny poziom widoczności.`;
  } else {
    reason = `Świetna robota! Twoja strona jest dobrze zoptymalizowana. Czas na skalowanie — pakiet ${pkg.name} pozwoli zdominować wyniki i zbudować silną obecność w AI Overview.`;
  }

  // Dynamic prognosis based on type + package tier
  const prognosisMap: Record<string, string> = {
    local: `Z tym pakietem w ciągu 6 miesięcy możesz oczekiwać: ${totalScore <= 50 ? "500-1000" : "1000-2000"} wejść/mies. organicznych i ${totalScore <= 50 ? "10-20" : "20-40"} leadów/mies.`,
    national: `Z tym pakietem w ciągu 6 miesięcy możesz oczekiwać: ${totalScore <= 50 ? "1500-3000" : "3000-6000"} wejść/mies. organicznych i ${totalScore <= 50 ? "30-60" : "60-120"} leadów/mies.`,
    ecommerce: `Z tym pakietem w ciągu 6 miesięcy możesz oczekiwać: ${totalScore <= 50 ? "5000-15000" : "15000-40000"} wejść/mies. organicznych i ${totalScore <= 50 ? "2-5%" : "5-10%"} wzrostu przychodów.`,
  };

  return { pkg, reason, prognosis: prognosisMap[btype.type] };
}

function getPriorities(modules: ModuleResult[]): AuditResult["priorities"] {
  const priorities: AuditResult["priorities"] = [];

  for (const mod of modules) {
    for (const item of mod.items) {
      if (item.status === "fail") {
        priorities.push({
          level: "critical",
          text: `${item.label}: ${item.detail}`,
          packageAction: "Naprawiamy w ramach audytu i optymalizacji technicznej",
        });
      }
    }
  }
  for (const mod of modules) {
    for (const item of mod.items) {
      if (item.status === "warn") {
        priorities.push({
          level: "important",
          text: `${item.label}: ${item.detail}`,
          packageAction: "Optymalizujemy w ramach cyklicznych działań SEO",
        });
      }
    }
  }
  // Add optional items
  const geoMod = modules[3];
  if (geoMod.score / geoMod.maxScore < 0.5) {
    priorities.push({
      level: "optional",
      text: "Wdrożenie strategii GEO (Generative Engine Optimization) — widoczność w ChatGPT, Gemini, Copilot",
      packageAction: "Integralny element pakietów z GEO (Local Leader, Country Standard)",
    });
  }

  return priorities.slice(0, 10);
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [activeOption, setActiveOption] = useState<1 | 2 | 3 | 4 | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", company: "", city: "", phone: "", email: "" });
  const [leadConsents, setLeadConsents] = useState({ privacy: false, marketing: false, phone: false });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const msgInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (msgInterval.current) clearInterval(msgInterval.current); };
  }, []);

  function normalizeUrl(raw: string): string {
    let u = raw.trim();
    if (!u) return "";
    if (!u.startsWith("http://") && !u.startsWith("https://")) {
      u = "https://" + u;
    }
    // Remove trailing slash for consistency, then re-add
    try {
      const parsed = new URL(u);
      return parsed.origin + (parsed.pathname === "/" ? "/" : parsed.pathname);
    } catch {
      return u;
    }
  }

  async function runAudit() {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setError("Wpisz adres strony, np. twojafirma.pl");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);
    setLoadingProgress(0);

    // Rotate loading messages
    let msgIdx = 0;
    setLoadingMsg(LOADING_MSGS[0]);
    msgInterval.current = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MSGS.length;
      setLoadingMsg(LOADING_MSGS[msgIdx]);
    }, 2000);

    try {
      // Step 1: Fetch main page
      setLoadingProgress(10);
      const { html, loadTime, ok } = await fetchViaProxy(normalized);

      if (!ok || html.length < 100) {
        setError("Nie mogliśmy połączyć się z tą stroną. Sprawdź adres i spróbuj ponownie.");
        setLoading(false);
        if (msgInterval.current) clearInterval(msgInterval.current);
        return;
      }

      // Detect error/parking/challenge pages
      const isErrorPage = /cloudflare.*error|error \d{3}|domain.*parked|domain.*sale|this site can|page not found/i.test(html)
        && html.length < 20000;
      const isChallengeOrBot = /just a moment|checking your browser|enable javascript.*cookies|cf-browser-verification|challenge-platform/i.test(html)
        && html.length < 30000;
      if (isErrorPage || isChallengeOrBot) {
        setError(isChallengeOrBot
          ? "Ta strona ma ochronę przed botami (Cloudflare) — nie możemy jej przeanalizować automatycznie. Skontaktuj się z nami po bezpłatny audyt."
          : "Ta strona zwraca stronę błędu lub jest zaparkowana. Sprawdź czy adres jest poprawny.");
        setLoading(false);
        if (msgInterval.current) clearInterval(msgInterval.current);
        return;
      }

      setLoadingProgress(30);
      const doc = parseHTML(html);

      // Step 2: Check robots.txt and sitemap
      setLoadingProgress(40);
      let domain: string;
      try {
        domain = new URL(normalized).hostname;
      } catch {
        domain = normalized;
      }
      const origin = new URL(normalized).origin;

      const [robotsExists, sitemapExists] = await Promise.all([
        checkUrlExists(origin + "/robots.txt"),
        checkUrlExists(origin + "/sitemap.xml"),
      ]);

      setLoadingProgress(60);

      // Step 3: Run analysis modules
      const mod1 = analyzeModule1Technical(normalized, html, doc, loadTime);
      setLoadingProgress(70);

      const mod2 = analyzeModule2OnPage(normalized, html, doc);
      // Add robots.txt and sitemap results to mod2
      mod2.items.push({
        label: "robots.txt",
        status: robotsExists ? "ok" : "warn",
        detail: robotsExists ? "Plik robots.txt jest dostępny" : "Brak robots.txt — warto go dodać, by kontrolować indeksację.",
        points: robotsExists ? 2 : 0,
        maxPoints: 2,
      });
      mod2.items.push({
        label: "sitemap.xml",
        status: sitemapExists ? "ok" : "fail",
        detail: sitemapExists ? "Mapa strony sitemap.xml jest dostępna" : "Brak sitemap.xml — Google może nie znaleźć wszystkich podstron.",
        points: sitemapExists ? 2 : 0,
        maxPoints: 2,
      });
      mod2.score = mod2.items.reduce((s, i) => s + i.points, 0);
      mod2.maxScore = mod2.items.reduce((s, i) => s + i.maxPoints, 0);

      setLoadingProgress(80);
      const mod3 = analyzeModule3Content(html, doc);
      setLoadingProgress(90);
      const mod4 = analyzeModule4GEO(html, doc);

      // Calculate total
      const modules = [mod1, mod2, mod3, mod4];
      const totalRaw = modules.reduce((s, m) => s + m.score, 0);
      const totalMax = modules.reduce((s, m) => s + m.maxScore, 0);
      const totalScore = Math.round((totalRaw / totalMax) * 100);

      // Business type detection
      const businessType = analyzeBusinessType(html, doc, normalized);
      const { pkg, reason, prognosis } = getRecommendation(totalScore, modules, businessType);
      const priorities = getPriorities(modules);

      setLoadingProgress(100);

      setTimeout(() => {
        setResult({
          url: normalized,
          domain,
          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          modules,
          totalScore,
          businessType,
          pkg,
          recommendation: { reason, prognosis },
          priorities,
        });
        setLoading(false);
        if (msgInterval.current) clearInterval(msgInterval.current);
        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 500);
    } catch {
      setError("Analiza trwa dłużej niż zwykle. Strona może być wolna — to już pierwszy sygnał do optymalizacji. Spróbuj ponownie.");
      setLoading(false);
      if (msgInterval.current) clearInterval(msgInterval.current);
    }
  }

  const scoreColor = result
    ? result.totalScore >= 71 ? "#22c55e" : result.totalScore >= 41 ? "#fbbf24" : "#ef4444"
    : "#666";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    borderRadius: 10,
    border: "1px solid var(--color-border-strong)",
    background: "var(--color-bg-card)",
    color: "var(--color-text)",
    outline: "none",
  };

  const moduleIcons: Record<string, React.ReactNode> = {
    tech: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    seo: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    content: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14s-4 1-4 4v2h16v-2c0-3-4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", padding: "48px 0 32px", textAlign: "center" }}>
        <div className="container reveal">
          <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: "auto", marginRight: "auto", marginBottom: 24 }}>
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 5v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Bezpłatne narzędzie
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 16 }}>
            {"Bezpłatny audyt "}
            <span className="text-gradient">{"SEO"}</span>
            {" Twojej strony"}
          </h1>
          <p style={{ fontSize: 16, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 560, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>
            {"Wpisz adres swojej strony — przeanalizujemy ją w kilka sekund i pokażemy co poprawić."}
          </p>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", maxWidth: 460, marginLeft: "auto", marginRight: "auto", marginBottom: 24, lineHeight: 1.5 }}>
            {"Sprawdzamy ponad 20 czynników: SSL, meta tagi, nagłówki, schema, obrazki, Open Graph, robots.txt, sitemap i gotowość na AI."}
          </p>

          {/* Input */}
          <div style={{ display: "flex", gap: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto", flexWrap: "wrap" as const, justifyContent: "center" }}>
            <input
              ref={inputRef}
              type="url"
              inputMode="url"
              autoComplete="url"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && !loading && runAudit()}
              placeholder="np. twojafirma.pl"
              disabled={loading}
              style={{
                flex: "1 1 300px",
                padding: "16px 20px",
                fontSize: 16,
                borderRadius: 12,
                border: "1px solid var(--color-border-strong)",
                background: "var(--color-bg-card)",
                color: "var(--color-text)",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              onClick={runAudit}
              disabled={loading}
              style={{
                padding: "16px 28px",
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 12,
                border: "none",
                background: loading ? "rgba(249,115,22,0.4)" : "linear-gradient(135deg, #f97316, #fb923c)",
                color: "white",
                cursor: loading ? "wait" : "pointer",
                whiteSpace: "nowrap" as const,
                boxShadow: "0 3px 20px rgba(249,115,22,0.3)",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Analizuję..." : "Analizuj stronę →"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p style={{ marginTop: 16, fontSize: 14, color: "#ef4444" }}>{error}</p>
          )}
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section style={{ position: "relative", padding: "32px 0" }}>
          <div className="container" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <div className="glass-card" style={{ padding: "40px 32px", borderRadius: 16 }}>
              {/* Spinner */}
              <div style={{ width: 48, height: 48, border: "3px solid rgba(249,115,22,0.2)", borderTop: "3px solid #f97316", borderRadius: "50%", animation: "spin 1s linear infinite", marginLeft: "auto", marginRight: "auto", marginBottom: 24 }} />
              <p style={{ fontSize: 16, color: "var(--color-text-dim)", marginBottom: 20 }}>{loadingMsg}</p>
              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${loadingProgress}%`, borderRadius: 3, background: "linear-gradient(90deg, #f97316, #fbbf24)", transition: "width 0.5s ease" }} />
              </div>
              <p style={{ marginTop: 8, fontSize: 13, color: "var(--color-text-muted)" }}>{loadingProgress}%</p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Score header */}
          <div ref={resultsRef} />
          <section style={{ position: "relative", padding: "24px 0 16px" }}>
            <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
              <div className="glass-card" style={{ padding: "36px 32px", borderRadius: 16, textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 4 }}>{result.domain}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 20 }}>{result.date}</p>
                <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1, color: scoreColor, marginBottom: 8 }}>
                  {result.totalScore}<span style={{ fontSize: 28, fontWeight: 500 }}>/100</span>
                </div>
                <p style={{ fontSize: 16, color: "var(--color-text-dim)" }}>
                  {result.totalScore >= 71 ? "Dobry wynik" : result.totalScore >= 41 ? "Wymaga poprawy" : "Wymaga pilnej interwencji"}
                </p>
                {/* Score bar */}
                <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)", marginTop: 20, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.totalScore}%`, borderRadius: 4, background: scoreColor, transition: "width 1s ease" }} />
                </div>
                {/* Module mini-scores */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 24 }}>
                  {result.modules.map((mod) => {
                    const pct = Math.round((mod.score / mod.maxScore) * 100);
                    const c = pct >= 71 ? "#22c55e" : pct >= 41 ? "#fbbf24" : "#ef4444";
                    return (
                      <div key={mod.name} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: c }}>{pct}%</div>
                        <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{mod.name}</div>
                        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", marginTop: 6, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: c, transition: "width 0.8s ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Module cards */}
          <section style={{ position: "relative", padding: "16px 0" }}>
            <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 20 }}>
                {result.modules.map((mod, modIdx) => {
                  const modPct = Math.round((mod.score / mod.maxScore) * 100);
                  const modColor = modPct >= 71 ? "#22c55e" : modPct >= 41 ? "#fbbf24" : "#ef4444";
                  return (
                    <div
                      key={mod.name}
                      className="glass-card"
                      style={{
                        padding: "28px 24px",
                        borderRadius: 16,
                        borderLeft: `3px solid ${modColor}`,
                        animation: `fadeInUp 0.5s ease ${modIdx * 0.15}s both`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div style={{ color: modColor }}>{moduleIcons[mod.icon]}</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>{mod.name}</div>
                          <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{modPct}% ({mod.score}/{mod.maxScore} pkt)</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                        {mod.items.map((item) => (
                          <div key={item.label} style={{ fontSize: 14, lineHeight: 1.5 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                              <span style={{ flexShrink: 0, marginTop: 2 }}>
                                {item.status === "ok" ? "✅" : item.status === "warn" ? "⚠️" : "❌"}
                              </span>
                              <div>
                                <div style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>{item.label}</div>
                                <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>{item.detail}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Business profile card */}
          <section style={{ position: "relative", padding: "24px 0 16px" }}>
            <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
              <div className="glass-card" style={{ padding: "28px 28px", borderRadius: 16, borderLeft: `3px solid ${result.pkg.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${result.pkg.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: result.pkg.color, flexShrink: 0 }}>
                    {result.businessType.type === "local" && (
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                    {result.businessType.type === "national" && (
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" /></svg>
                    )}
                    {result.businessType.type === "ecommerce" && (
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}><circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="1.5" /><circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.5" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: result.pkg.color, marginBottom: 2 }}>Profil Twojej firmy</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)" }}>{result.businessType.label}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)", marginBottom: 8 }}>{result.businessType.description}</p>
                {result.businessType.signals.length > 0 && (
                  <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                    {"Na podstawie: "}{result.businessType.signals.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 4 Options Grid */}
          <section ref={optionsRef} style={{ position: "relative", padding: "16px 0 24px" }}>
            <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--color-text)", textAlign: "center" }}>
                Co chcesz zrobić dalej?
              </h2>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", textAlign: "center", marginBottom: 24 }}>
                Wybierz jedną z opcji dopasowanych do Twojego wyniku
              </p>
              <div className="options-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {/* OPCJA 1 — Email lead capture */}
                <button
                  onClick={() => setActiveOption(activeOption === 1 ? null : 1)}
                  className="glass-card"
                  style={{
                    padding: "24px 20px",
                    borderRadius: 16,
                    border: activeOption === 1 ? "1px solid rgba(155,98,255,0.4)" : "1px solid rgba(155,98,255,0.10)",
                    background: activeOption === 1 ? "rgba(155,98,255,0.08)" : undefined,
                    cursor: "pointer",
                    textAlign: "left" as const,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>📧</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
                    Wyślij mi wynik audytu na email
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.5, marginBottom: 12 }}>
                    Otrzymaj pełny raport PDF z analizą i rekomendacjami na swoją skrzynkę.
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>BEZPŁATNE</div>
                </button>

                {/* OPCJA 2 — Premium audit */}
                <button
                  onClick={() => setActiveOption(activeOption === 2 ? null : 2)}
                  className="glass-card"
                  style={{
                    padding: "24px 20px",
                    borderRadius: 16,
                    border: activeOption === 2 ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(155,98,255,0.10)",
                    background: activeOption === 2 ? "rgba(59,130,246,0.08)" : undefined,
                    cursor: "pointer",
                    textAlign: "left" as const,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>📋</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
                    Szczegółowy audyt + strategia
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.5, marginBottom: 12 }}>
                    Profesjonalny audyt SEO z indywidualną strategią i planem działania.
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6" }}>
                    od {result.businessType.type === "local" ? "1 500" : result.businessType.type === "national" ? "2 500" : "4 000"} zł netto
                  </div>
                </button>

                {/* OPCJA 3 — Package selector */}
                <button
                  onClick={() => {
                    setActiveOption(activeOption === 3 ? null : 3);
                    if (!selectedPackageId) setSelectedPackageId(result.pkg.id);
                  }}
                  className="glass-card"
                  style={{
                    padding: "24px 20px",
                    borderRadius: 16,
                    border: activeOption === 3 ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(155,98,255,0.10)",
                    background: activeOption === 3 ? "rgba(249,115,22,0.08)" : undefined,
                    cursor: "pointer",
                    textAlign: "left" as const,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>🚀</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
                    Wybierz pakiet SEO i zacznij działać
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.5, marginBottom: 12 }}>
                    {result.pkg.name} — rekomendowany na podstawie Twojego audytu.
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f97316" }}>
                    od {result.pkg.priceNetto.toLocaleString("pl")} zł netto/mies.
                  </div>
                </button>

                {/* OPCJA 4 — Other services */}
                <button
                  onClick={() => setActiveOption(activeOption === 4 ? null : 4)}
                  className="glass-card"
                  style={{
                    padding: "24px 20px",
                    borderRadius: 16,
                    border: activeOption === 4 ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(155,98,255,0.10)",
                    background: activeOption === 4 ? "rgba(34,197,94,0.08)" : undefined,
                    cursor: "pointer",
                    textAlign: "left" as const,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>💡</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
                    Inne usługi AdAwards
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.5, marginBottom: 12 }}>
                    Strony, branding, social media, wdrażanie AI — pełna oferta.
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>
                    Strony · Branding · Social · AI
                  </div>
                </button>
              </div>

              {/* ═══ OPTION 1 PANEL — Lead Capture Form ═══ */}
              {activeOption === 1 && (
                <div className="glass-card" style={{ marginTop: 20, padding: "32px 28px", borderRadius: 16, borderLeft: "3px solid #9B62FF", animation: "fadeInUp 0.3s ease" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--color-text)" }}>
                    📧 Otrzymaj raport na email
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>
                    Wypełnij formularz — wyślemy Ci pełny raport PDF z audytem strony {result.domain}
                  </p>

                  {leadSuccess ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>Raport wysłany!</h4>
                      <p style={{ fontSize: 14, color: "var(--color-text-dim)" }}>Sprawdź swoją skrzynkę email — raport PDF jest w drodze.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!leadConsents.privacy) { setLeadError("Wymagana jest zgoda na przetwarzanie danych."); return; }
                      setLeadError("");
                      setLeadSubmitting(true);

                      // Generate PDF base64
                      let pdfBase64 = "";
                      try {
                        pdfBase64 = getAuditPDFBase64(result);
                      } catch {
                        // PDF generation failed — continue without it
                      }

                      // Submit to PHP backend
                      const formData = new FormData();
                      formData.append("name", leadForm.name);
                      formData.append("company", leadForm.company);
                      formData.append("city", leadForm.city);
                      formData.append("phone", leadForm.phone);
                      formData.append("email", leadForm.email);
                      formData.append("consent_marketing", leadConsents.marketing ? "1" : "0");
                      formData.append("consent_phone", leadConsents.phone ? "1" : "0");
                      formData.append("audit_url", result.url);
                      formData.append("audit_score", String(result.totalScore));
                      formData.append("business_type", result.businessType.type);
                      formData.append("package_recommended", result.pkg.id);
                      formData.append("audit_date", result.date);
                      formData.append("audit_modules", JSON.stringify(result.modules.map(m => ({ name: m.name, score: m.score, maxScore: m.maxScore }))));
                      formData.append("audit_priorities", JSON.stringify(result.priorities));
                      if (pdfBase64) formData.append("pdf_base64", pdfBase64);

                      fetch("https://mastermarketing.io/seo-oferta/api/lead-capture.php", {
                        method: "POST",
                        body: formData,
                      })
                        .then(r => r.json())
                        .then(data => {
                          if (data.success) {
                            setLeadSuccess(true);
                          } else {
                            setLeadError(data.error || "Wystąpił błąd. Spróbuj ponownie.");
                          }
                        })
                        .catch(() => setLeadError("Błąd połączenia. Spróbuj ponownie."))
                        .finally(() => setLeadSubmitting(false));
                    }}>
                      <div className="option-panel-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-dim)", marginBottom: 6 }}>Imię i nazwisko *</label>
                          <input required value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} style={inputStyle} placeholder="Jan Kowalski" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-dim)", marginBottom: 6 }}>Firma</label>
                          <input value={leadForm.company} onChange={e => setLeadForm({...leadForm, company: e.target.value})} style={inputStyle} placeholder="Nazwa firmy" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-dim)", marginBottom: 6 }}>Miasto</label>
                          <input value={leadForm.city} onChange={e => setLeadForm({...leadForm, city: e.target.value})} style={inputStyle} placeholder="Warszawa" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-dim)", marginBottom: 6 }}>Telefon</label>
                          <input type="tel" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} style={inputStyle} placeholder="+48 123 456 789" />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-dim)", marginBottom: 6 }}>Email *</label>
                          <input required type="email" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} style={inputStyle} placeholder="jan@firma.pl" />
                        </div>
                      </div>

                      {/* Consents */}
                      <div style={{ marginTop: 20, display: "flex", flexDirection: "column" as const, gap: 10 }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "var(--color-text-muted)", cursor: "pointer" }}>
                          <input type="checkbox" checked={leadConsents.privacy} onChange={e => setLeadConsents({...leadConsents, privacy: e.target.checked})} style={{ marginTop: 2, accentColor: "#9B62FF" }} />
                          <span>* Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przesłania raportu audytu SEO. <a href="/polityka-prywatnosci" style={{ color: "#9B62FF" }}>Polityka prywatności</a></span>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "var(--color-text-muted)", cursor: "pointer" }}>
                          <input type="checkbox" checked={leadConsents.marketing} onChange={e => setLeadConsents({...leadConsents, marketing: e.target.checked})} style={{ marginTop: 2, accentColor: "#9B62FF" }} />
                          <span>Chcę otrzymywać porady SEO i informacje o promocjach (opcjonalne)</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "var(--color-text-muted)", cursor: "pointer" }}>
                          <input type="checkbox" checked={leadConsents.phone} onChange={e => setLeadConsents({...leadConsents, phone: e.target.checked})} style={{ marginTop: 2, accentColor: "#9B62FF" }} />
                          <span>Zgadzam się na kontakt telefoniczny (opcjonalne)</span>
                        </label>
                      </div>

                      {leadError && <p style={{ marginTop: 12, fontSize: 13, color: "#ef4444" }}>{leadError}</p>}

                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        style={{
                          marginTop: 20,
                          width: "100%",
                          padding: "16px 32px",
                          fontSize: 16,
                          fontWeight: 700,
                          borderRadius: 14,
                          border: "none",
                          background: leadSubmitting ? "rgba(155,98,255,0.4)" : "linear-gradient(135deg, #9B62FF, #6037FF)",
                          color: "white",
                          cursor: leadSubmitting ? "wait" : "pointer",
                          boxShadow: "0 4px 24px rgba(155,98,255,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        {leadSubmitting ? "Wysyłam..." : "Wyślij raport na email →"}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ═══ OPTION 2 PANEL — Premium Audit ═══ */}
              {activeOption === 2 && (
                <div className="glass-card" style={{ marginTop: 20, padding: "32px 28px", borderRadius: 16, borderLeft: "3px solid #3b82f6", animation: "fadeInUp 0.3s ease" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--color-text)" }}>
                    📋 Szczegółowy audyt + strategia SEO
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 20 }}>
                    Profesjonalny audyt wykonany przez eksperta z indywidualną strategią dla {result.domain}
                  </p>

                  {/* What's included */}
                  <div className="option-panel-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                    {[
                      "Analiza 200+ czynników SEO",
                      "Audyt techniczny + treściowy",
                      "Analiza konkurencji (3 firmy)",
                      "Strategia słów kluczowych",
                      "Plan działań na 6 miesięcy",
                      "Raport PDF ~30 stron",
                      "Konsultacja 1h z ekspertem",
                      "Wycena wdrożenia zmian",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-dim)" }}>
                        <span style={{ color: "#3b82f6", flexShrink: 0 }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Price by type */}
                  <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 28, fontWeight: 800, color: "#3b82f6" }}>
                        {result.businessType.type === "local" ? "1 500" : result.businessType.type === "national" ? "2 500" : "4 000"} zł
                      </span>
                      <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>netto (jednorazowo)</span>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                      {result.businessType.type === "local" ? "1 845" : result.businessType.type === "national" ? "3 075" : "4 920"} zł brutto z VAT 23% · Realizacja: 5-7 dni roboczych
                    </p>
                  </div>

                  <a
                    href={`https://mastermarketing.io/seo-oferta/api/premium-checkout.php?type=${result.businessType.type}&url=${encodeURIComponent(result.url)}&score=${result.totalScore}`}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "16px 32px",
                      fontSize: 16,
                      fontWeight: 700,
                      borderRadius: 14,
                      border: "none",
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "white",
                      textAlign: "center" as const,
                      textDecoration: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 24px rgba(59,130,246,0.3)",
                      transition: "all 0.2s",
                    }}
                  >
                    Zamów szczegółowy audyt →
                  </a>
                  <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }}>
                    Bezpieczna płatność Stripe · Faktura VAT · Gwarancja zwrotu 14 dni
                  </div>
                </div>
              )}

              {/* ═══ OPTION 3 PANEL — Package Selector ═══ */}
              {activeOption === 3 && (() => {
                const selectedPkg = ALL_PACKAGES.find(p => p.id === selectedPackageId) || result.pkg;
                const categories: { type: BusinessType; label: string }[] = [
                  { type: "local", label: "SEO Lokalne" },
                  { type: "national", label: "SEO Ogólnopolskie" },
                  { type: "ecommerce", label: "SEO E-commerce" },
                ];
                return (
                  <div className="glass-card" style={{ marginTop: 20, padding: "32px 28px", borderRadius: 16, borderLeft: `3px solid ${selectedPkg.color}`, animation: "fadeInUp 0.3s ease" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--color-text)" }}>
                      🚀 Wybierz pakiet SEO
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 20 }}>
                      Rekomendujemy <strong style={{ color: result.pkg.color }}>{result.pkg.name}</strong> na podstawie audytu. Możesz też wybrać inny.
                    </p>

                    {/* Package dropdown */}
                    <select
                      value={selectedPackageId}
                      onChange={e => setSelectedPackageId(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        fontSize: 15,
                        borderRadius: 12,
                        border: "1px solid var(--color-border-strong)",
                        background: "var(--color-bg-card)",
                        color: "var(--color-text)",
                        outline: "none",
                        cursor: "pointer",
                        marginBottom: 20,
                      }}
                    >
                      {categories.map(cat => (
                        <optgroup key={cat.type} label={cat.label}>
                          {getPackagesByCategory(cat.type).map(pkg => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name} — {pkg.priceNetto.toLocaleString("pl")} zł/mies. {pkg.id === result.pkg.id ? "⭐ Rekomendowany" : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>

                    {/* Selected package details */}
                    <div style={{ padding: "20px 24px", borderRadius: 12, background: `${selectedPkg.color}08`, border: `1px solid ${selectedPkg.color}20`, marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: selectedPkg.color }}>{selectedPkg.categoryLabel}</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)" }}>{selectedPkg.name}</div>
                        </div>
                        <div style={{ textAlign: "right" as const }}>
                          <div style={{ fontSize: 24, fontWeight: 800, color: selectedPkg.color }}>{selectedPkg.priceNetto.toLocaleString("pl")} zł</div>
                          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>netto / mies.</div>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--color-text-dim)", marginBottom: 12 }}>{selectedPkg.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                        {selectedPkg.features.map(f => (
                          <span key={f} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: `${selectedPkg.color}12`, color: selectedPkg.color, fontWeight: 500 }}>{f}</span>
                        ))}
                      </div>
                      {selectedPkg.id === result.pkg.id && (
                        <div style={{ marginTop: 12, fontSize: 12, color: "#22c55e", fontWeight: 600 }}>⭐ Rekomendowany na podstawie audytu</div>
                      )}
                    </div>

                    <a
                      href={selectedPkg.stripeLink || "/seo-oferta/#pakiety"}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "16px 32px",
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 14,
                        border: "none",
                        background: `linear-gradient(135deg, ${selectedPkg.color}, ${selectedPkg.color}cc)`,
                        color: "white",
                        textAlign: "center" as const,
                        textDecoration: "none",
                        cursor: "pointer",
                        boxShadow: `0 4px 24px ${selectedPkg.color}40`,
                        transition: "all 0.2s",
                      }}
                    >
                      {selectedPkg.stripeLink
                        ? `Zamów ${selectedPkg.name} — ${selectedPkg.priceBrutto.toLocaleString("pl", { minimumFractionDigits: 2 })} zł/mies. →`
                        : `Zapytaj o ${selectedPkg.name} →`}
                    </a>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }}>
                      <span>Bezpieczna płatność Stripe</span>
                      <span>·</span>
                      <span>Wypowiedzenie w dowolnym miesiącu</span>
                    </div>
                  </div>
                );
              })()}

              {/* ═══ OPTION 4 PANEL — Other Services ═══ */}
              {activeOption === 4 && (
                <div className="glass-card" style={{ marginTop: 20, padding: "32px 28px", borderRadius: 16, borderLeft: "3px solid #22c55e", animation: "fadeInUp 0.3s ease" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--color-text)" }}>
                    💡 Inne usługi AdAwards
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>
                    Oprócz SEO oferujemy pełen wachlarz usług cyfrowych dla Twojej firmy.
                  </p>

                  <div className="options-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { icon: "🌐", title: "Strony i sklepy internetowe", desc: "WordPress, Shopify, custom development", link: "/seo-oferta/uslugi/strony-sklepy/", color: "#9B62FF" },
                      { icon: "🎨", title: "Brandbook i design", desc: "Identyfikacja wizualna, logo, materiały", link: "/seo-oferta/uslugi/brandbook-design/", color: "#f97316" },
                      { icon: "📱", title: "Social media i video", desc: "Strategia social, content video, kampanie", link: "/seo-oferta/uslugi/social-media-video/", color: "#3b82f6" },
                      { icon: "🤖", title: "Wdrażanie AI w firmie", desc: "Automatyzacja, chatboty, AI workflows", link: "/seo-oferta/uslugi/wdrazanie-ai/", color: "#22c55e" },
                    ].map((svc) => (
                      <a
                        key={svc.title}
                        href={svc.link}
                        className="glass-card"
                        style={{
                          padding: "20px 16px",
                          borderRadius: 12,
                          textDecoration: "none",
                          transition: "all 0.2s",
                          borderLeft: `3px solid ${svc.color}`,
                        }}
                      >
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{svc.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{svc.title}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.4 }}>{svc.desc}</div>
                      </a>
                    ))}
                  </div>

                  <div style={{ marginTop: 20, textAlign: "center" }}>
                    <a
                      href="https://adawards.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "14px 28px",
                        fontSize: 15,
                        fontWeight: 600,
                        borderRadius: 12,
                        border: "1px solid rgba(34,197,94,0.3)",
                        background: "rgba(34,197,94,0.08)",
                        color: "#22c55e",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      Zobacz pełną ofertę AdAwards →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Priorities */}
          {result.priorities.length > 0 && (
            <section style={{ position: "relative", padding: "0 0 32px" }}>
              <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--color-text)" }}>
                  Priorytetowe zalecenia
                </h2>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                  {result.priorities.map((p, i) => (
                    <div
                      key={i}
                      className="glass-card"
                      style={{
                        padding: "20px 24px",
                        borderRadius: 12,
                        borderLeft: `3px solid ${p.level === "critical" ? "#ef4444" : p.level === "important" ? "#fbbf24" : "#22c55e"}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ flexShrink: 0 }}>
                          {p.level === "critical" ? "\uD83D\uDD34" : p.level === "important" ? "\uD83D\uDFE1" : "\uD83D\uDFE2"}
                        </span>
                        <div>
                          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-dim)" }}>{p.text}</p>
                          <p style={{ fontSize: 13, color: "var(--color-accent-light)", marginTop: 6, fontWeight: 500 }}>
                            {"→ "}{p.packageAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Analyze another site */}
          <section style={{ position: "relative", padding: "0 0 64px", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
              <button
                onClick={() => {
                  setResult(null);
                  setUrl("");
                  setError("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => inputRef.current?.focus(), 400);
                }}
                style={{
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 12,
                  border: "1px solid var(--color-border-strong)",
                  background: "transparent",
                  color: "var(--color-text-dim)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {"Analizuj inną stronę →"}
              </button>
            </div>
          </section>
        </>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .options-grid { grid-template-columns: 1fr !important; }
          .option-panel-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
