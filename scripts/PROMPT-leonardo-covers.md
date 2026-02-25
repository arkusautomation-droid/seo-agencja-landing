# PROMPT — Grafiki blogowe z Leonardo AI

> Zastępuje poprzedni prompt o Pillow. Grafiki generowane przez Leonardo AI zamiast algorytmicznie.

## Konto
- Email: adawardspolska@gmail.com
- URL: https://app.leonardo.ai/
- API key: w `.env` jako `LEONARDO_API_KEY`

## Model (wybrany po testach)
- DO UZUPELNIENIA po zalogowaniu i przetestowaniu

## Parametry
- Alchemy: ON
- Rozmiar: 1200x630
- Contrast: 3.5
- Guidance scale: 7-9

## Base style prompt
```
Dark premium tech aesthetic, background gradient from near-black #0a0c10 to #0f1318 with subtle blue undertone, abstract geometric and organic shapes, glowing neon accents, particle network connections, clean modern composition, professional blog header image, no people no faces no stock photo feel, no text on image, wide cinematic format, subtle depth of field, studio-quality rendering, minimalist with strategic negative space
```

## Negative prompt
```
text, words, letters, watermark, signature, blurry, low quality, pixelated, noisy, oversaturated, cartoon, anime, childish, clipart, stock photo, generic, busy composition, cluttered, humans, faces, hands
```

## Prompty per artykul — patrz generate-leonardo-covers.py

## Integracja
- Covery w: `public/blog/covers/`
- Mapping w: `src/data/articles.ts` (COVER_MAP)
- Blog index thumbnails + article hero + OG meta tags juz zaimplementowane
