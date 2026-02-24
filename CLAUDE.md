# SEO Agencja Landing — Project Guide

## Stack
- **Framework**: Next.js 16.1.6 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@theme inline` syntax, NOT tailwind.config.js)
- **Font**: Inter (Google Fonts, loaded via next/font)
- **Language**: Polish (pl)

## Architecture
- Single page app: `src/app/page.tsx` renders all sections
- Sections as components in `src/components/`
- Global CSS: `src/app/globals.css` (custom properties, glass-card, reveal, pricing-tab, etc.)
- Client components marked with `"use client"` only when needed (PricingSection, ScrollReveal)

## Design System

### Colors (defined in globals.css @theme inline)
- **Background**: `#030116` (deep dark blue)
- **Card bg**: `#0c0a2a` / glass: `rgba(255,255,255,0.04)`
- **Accent (purple)**: `#9B62FF` / dark: `#6037FF` / light: `#B27AFF`
- **Semantic**: green `#22c55e`, blue `#3b82f6`, red `#ef4444`, orange `#f97316`, yellow `#fbbf24`
- **Text**: white / secondary `#ebe9fe` / dim `#98a2b3` / muted `#667085`
- **Borders**: `rgba(155,98,255,0.10)` / strong: `0.20`

### Key CSS Classes
- `.glass-card` — card with glass morphism, hover lift, border glow
- `.section-badge` — pill badge above section title
- `.section-title` — centered heading with glow (`::after` pseudo-element)
- `.section-sub` — subtitle below section title
- `.text-gradient` — purple-pink gradient text (hero style)
- `.text-gradient-orange` — orange-yellow gradient text
- `.text-gradient-warm` — warm gradient for numbers
- `.reveal` / `.reveal-stagger` — scroll-triggered fade-in (IntersectionObserver via ScrollReveal.tsx)
- `.pricing-tab` / `.pricing-tab--active-{local|country|ecom}` — tab buttons with color pulse
- `[data-glow="color"]` — per-section glow color on `.section-title`

### Visual Patterns
- Section glow: each section has `data-glow="red|orange|purple|blue|green|green-orange"`
- Ambient background: fixed orbs with blur + noise overlay
- Cards: `.glass-card` with hover translateY(-4px) and border color change
- Marquee: CSS keyframes with `animation: marquee Xs linear infinite` and fade edges
- Badge above recommended card: inline-block inside card (NOT absolute positioned)

## Figma-to-Code Procedure

When translating a Figma design or screenshot to code for this project:

### 1. Analyze
- Identify which existing section/component the design modifies or replaces
- Map Figma colors to the design system (use CSS custom properties, not hardcoded values)
- Note spacing in the design — use Tailwind classes (p-6, gap-4, mb-12, etc.)

### 2. Match Existing Patterns
- Use `.glass-card` for any card-like containers
- Use `.section-badge` + `.section-title` + `.section-sub` for section headers
- Use `reveal` / `reveal-stagger` for scroll animations
- Use `data-glow="color"` on `<section>` for title glow effects
- Use `.text-gradient` or `.text-gradient-orange` for gradient text
- Icons: inline SVGs (no icon library) — use `viewBox="0 0 24 24"` or `"0 0 16 16"`

### 3. Implement
- Edit existing component file (prefer editing over creating new files)
- If new section needed: create `src/components/SectionName.tsx` and add to `page.tsx`
- Keep components as server components unless interactivity is needed
- Use Tailwind utility classes; add custom CSS to globals.css only for complex effects
- Mobile-first responsive: `max-sm:`, `sm:`, `lg:` breakpoints

### 4. Verify
- Run `npm run build` to check for TypeScript/build errors
- Check visually in browser (dev server on port 3000)
- Verify responsive behavior
- Ensure scroll reveal animations work

### 5. Color Reference Quick Map
| Figma Color | Tailwind / CSS |
|---|---|
| Deep purple bg | `bg-bg` / `#030116` |
| Card background | `bg-bg-card` / `.glass-card` |
| Purple accent | `text-accent` / `text-accent-light` |
| Green | `text-green` |
| Blue | `text-blue` |
| Red | `text-red` |
| Orange | `text-orange` / `.text-gradient-orange` |
| Dim text | `text-text-dim` |
| Muted text | `text-text-muted` |
| Border default | `border-border` |
| Glow/subtle bg | `bg-accent-subtle` / `bg-[rgba(155,98,255,0.06)]` |

## Commands
- `npm run dev` — dev server (port 3000)
- `npm run build` — production build (checks TypeScript)
- No test suite configured
