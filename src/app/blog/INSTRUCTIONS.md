# Blog — instrukcja dodawania artykułów

## Gdzie są artykuły

Wszystkie artykuły są w pliku: `src/data/articles.ts`

## Jak dodać nowy artykuł

### 1. Otwórz `src/data/articles.ts`

### 2. Dodaj nowy obiekt na POCZĄTKU tablicy `articles`:

```ts
{
  slug: "twoj-slug-artykulu",
  title: "Tytuł artykułu",
  lead: "1-2 zdania podsumowania widoczne na liście bloga.",
  date: "2026-03-01",  // format: YYYY-MM-DD
  readingTime: 7,       // wylicz: ilość znaków / 1500 ≈ minuty
  content: `<p class="article-lead">Lead artykułu — pogrubiony wstęp.</p>

<h2>Pierwsza sekcja</h2>
<p>Treść akapitu...</p>
<p><strong>Ważny tekst</strong> — wyróżniony.</p>

<h2>Druga sekcja</h2>
<p>Kolejna treść...</p>

<div class="article-cta">
  <p>Tekst CTA na końcu artykułu.</p>
  <a href="/seo-oferta/#pakiety" class="btn-primary" style="padding: 12px 28px; font-size: 15px;">Zobacz pakiety SEO <span style="margin-left: 4px;">→</span></a>
</div>`,
},
```

### 3. Naming convention

- **slug**: małe litery, bez polskich znaków, słowa oddzielone myślnikami
  - Przykład: `seo-lokalne-vs-ogolnopolskie-ktory-pakiet`
- **date**: format ISO `YYYY-MM-DD`
- **readingTime**: ilość znaków ze spacjami / 1500 (zaokrągl w górę)

### 4. Dostępne elementy HTML w treści

| Element | Użycie |
|---------|--------|
| `<p>` | Zwykły akapit |
| `<p class="article-lead">` | Lead artykułu (pogrubiony, większy) |
| `<h2>` | Podtytuł sekcji (Playfair Display) |
| `<strong>` | Wyróżnienie (jaśniejszy kolor) |
| `<blockquote>` | Cytat z pomarańczowym border-left |
| `<div class="article-cta">` | Box CTA na końcu |

### 5. Build i deploy

Po dodaniu artykułu:

```bash
# 1. Zmień config na deploy
# W next.config.ts ustaw: output: "export", basePath: "/seo-oferta"

# 2. Build
npm run build

# 3. Deploy
rsync -avz --delete -e "ssh -p 65002 -i ~/.ssh/id_ed25519" out/ u598440266@82.29.157.176:~/domains/mastermarketing.io/public_html/seo-oferta/

# 4. Przywróć config do domyślnego
```

### 6. Template do skopiowania

```ts
{
  slug: "SLUG",
  title: "TYTUŁ",
  lead: "LEAD — 1-2 zdania.",
  date: "2026-MM-DD",
  readingTime: 0,
  content: `<p class="article-lead">LEAD</p>

<h2>Sekcja 1</h2>
<p>Treść...</p>

<h2>Sekcja 2</h2>
<p>Treść...</p>

<h2>Sekcja 3</h2>
<p>Treść...</p>

<div class="article-cta">
  <p>Chcesz zobaczyć jak to wygląda dla Twojej firmy?</p>
  <a href="/seo-oferta/#pakiety" class="btn-primary" style="padding: 12px 28px; font-size: 15px;">Zobacz pakiety SEO <span style="margin-left: 4px;">→</span></a>
</div>`,
},
```
