# Konfiguracja Stripe Payment Links

## Konto Stripe
- Login: arkadiussixer@gmail.com
- Dashboard: https://dashboard.stripe.com

## Krok 1: Utwórz 12 produktów w Stripe

Przejdź do **Products** → **Add product** i utwórz każdy pakiet jako subskrypcję miesięczną:

### SEO Lokalne (kolor: #f97316)
| Pakiet | Cena netto | Cena brutto (VAT 23%) | ID w kodzie |
|--------|-----------|----------------------|-------------|
| Local Start | 1 000 zł/mies. | 1 230 zł | `local-start` |
| Local Standard | 1 250 zł/mies. | 1 537,50 zł | `local-standard` |
| Local Pro | 1 500 zł/mies. | 1 845 zł | `local-pro` |
| Local Leader | 2 000 zł/mies. | 2 460 zł | `local-leader` |

### SEO Ogólnopolskie (kolor: #3b82f6)
| Pakiet | Cena netto | Cena brutto (VAT 23%) | ID w kodzie |
|--------|-----------|----------------------|-------------|
| Country Start | 2 500 zł/mies. | 3 075 zł | `country-start` |
| Country Standard | 3 500 zł/mies. | 4 305 zł | `country-standard` |
| Country Pro | 5 000 zł/mies. | 6 150 zł | `country-pro` |
| Country Leader | 8 000 zł/mies. | 9 840 zł | `country-leader` |

### SEO E-commerce (kolor: #22c55e)
| Pakiet | Cena netto | Cena brutto (VAT 23%) | ID w kodzie |
|--------|-----------|----------------------|-------------|
| Ecommerce Basic | 10 000 zł/mies. | 12 300 zł | `ecom-basic` |
| Ecommerce Pro | 15 000 zł/mies. | 18 450 zł | `ecom-pro` |
| Ecommerce Advanced | 20 000 zł/mies. | 24 600 zł | `ecom-advanced` |
| Ecommerce Leader | 30 000 zł/mies. | 36 900 zł | `ecom-leader` |

### Ustawienia każdego produktu:
1. **Name**: np. "SEO Lokalne — Local Start"
2. **Price**: cena brutto w PLN, recurring monthly
3. **Tax behavior**: "Inclusive" (cena zawiera VAT) LUB "Exclusive" (cena netto + VAT dolicza Stripe)
4. **Description**: krótki opis pakietu

## Krok 2: Utwórz Payment Links

Dla każdego produktu:
1. Przejdź do **Payment Links** → **New**
2. Wybierz produkt
3. **After payment**: Redirect to `https://mastermarketing.io/seo-oferta/audyt/dziekujemy/`
4. **Collect**: Email, Name, Phone (opcjonalnie)
5. Skopiuj wygenerowany URL

## Krok 3: Wklej linki do kodu

Plik: `src/data/packages.ts`

Zamień puste `stripeLink: ""` na URL Payment Link, np.:
```typescript
stripeLink: "https://buy.stripe.com/test_XXXXXXXX",
```

## Krok 4: Przebuduj i zdeployuj

```bash
# 1. Zmień config na deploy
# W next.config.ts ustaw: output: "export", basePath: "/seo-oferta", trailingSlash: true

# 2. Build
npm run build

# 3. Deploy
rsync -avz --delete -e "ssh -p 65002 -i ~/.ssh/id_ed25519" out/ u598440266@82.29.157.176:~/domains/mastermarketing.io/public_html/seo-oferta/

# 4. Przywróć config
# W next.config.ts ustaw z powrotem: /* config options here */
```

## Co się zmieni po dodaniu linków:

1. **Strona audytu**: Przycisk "Zobacz szczegóły pakietu →" zmieni się na "Zamów pakiet →" i będzie prowadził do Stripe Checkout
2. **Strona cennika**: Przycisk "Zapytaj o pakiet →" zmieni się na "Zamów teraz →" z bezpośrednim linkiem do płatności
3. **Po płatności**: Klient zostanie przekierowany na `/audyt/dziekujemy/` ze stroną podziękowania

## Webhook (opcjonalnie)

Jeśli chcesz automatyczne powiadomienia o zamówieniach:
1. Stripe Dashboard → Developers → Webhooks
2. Endpoint URL: twój serwer/API
3. Events: `checkout.session.completed`, `invoice.paid`

Nie jest to wymagane — Stripe i tak wyśle email z potwierdzeniem płatności.
