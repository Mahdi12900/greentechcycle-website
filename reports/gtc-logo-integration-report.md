# GreenTechCycle — Logo Kit v2 Integration Report

**Date:** 2026-04-21
**Status:** Complete
**Site:** http://localhost:5000 (port 5000)

---

## 1. Brand Guidelines Applied

Source: `/home/stella/project/charlie/BRAND-GUIDELINES.md`

### Color Palette (updated in `tailwind.config.ts`)

| Token | Old (v1) | New (v2) | Role |
|---|---|---|---|
| `primary` | `#0D503C` | `#047857` | Forest green — primary brand, accent on "G" and "Tech" |
| `secondary` | `#1E3A5F` | `#1E40AF` | Steel blue — security, compliance |
| `accent` | `#10B981` | `#047857` | Aligned with primary forest green |
| `gtc.forest` | — | `#047857` | ITAD lifecycle, recovery, reuse |
| `gtc.ink` | — | `#022C22` | Primary text, deepest surface |
| `gtc.steel` | — | `#1E40AF` | Cyber risk, certified erasure |
| `gtc.cyan` | — | `#0891B2` | CSRD, traceability, reporting |
| `gtc.mint` | — | `#6EE7B7` | Light accent |
| `gtc.deep` | — | `#0F172A` | Alternative dark surface |

### Typography
- Added `JetBrains Mono` to `fontFamily.mono` in Tailwind config
- `Inter` remains as primary font (`fontFamily.sans`)

---

## 2. Logo Files Deployed

### New files in `public/`

| File | Source | Usage |
|---|---|---|
| `public/logo.svg` | `03-logo-horizontal.svg` | Header/Navbar logo |
| `public/logo-mono-white.svg` | `06-logo-mono-white.svg` | Footer (dark background) |
| `public/logo-primary.svg` | `01-logo-primary.svg` | Schema.org, RSS feed, light backgrounds |
| `public/logo-dark.svg` | `02-logo-dark.svg` | Dark section variants |
| `public/icon-only.svg` | `04-icon-only.svg` | 404 page, mobile icon |
| `public/favicon.svg` | `05-favicon.svg` | Browser tab favicon |
| `public/icon.svg` | `04-icon-only.svg` | Apple touch icon |

### Also in `public/logo/` (archive)

All 6 variants stored as `logo-primary.svg`, `logo-dark.svg`, `logo-horizontal.svg`, `icon-only.svg`, `logo-mono-white.svg`.

### Deleted old files

| Removed |
|---|
| `public/logo.svg` (old v1) |
| `public/logo-icon.svg` |
| `public/logo-light.svg` |
| `public/logo-mono-white.svg` (old v1) |

---

## 3. Component Changes

### Header (`src/components/Header.tsx`)
- **Before:** `<Image src="/logo.svg" ... />` + text wordmark "GreenTech**Cycle**"
- **After:** `<Image src="/logo.svg" ... />` using `03-logo-horizontal.svg` (includes orbital symbol + GTC monogram + wordmark + tagline)
- Removed unused `Leaf`, `Recycle` icon imports

### Footer (`src/components/Footer.tsx`)
- **Before:** `<Image src="/logo-mono-white.svg" ... />` + text wordmark
- **After:** `<Image src="/logo-mono-white.svg" ... />` using `06-logo-mono-white.svg` (full horizontal mono-white lockup)
- Wordmark text span removed (now embedded in the SVG)

### 404 Page (`src/app/[locale]/not-found.tsx`)
- **Before:** Styled "G" letter in a circle
- **After:** `<Image src="/icon-only.svg" ... />` — proper orbital icon

### Layout (`src/app/[locale]/layout.tsx`)
- Added `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- Added `<link rel="apple-touch-icon" href="/icon.svg" />`
- Added `icons` metadata in both root and locale layouts
- Schema.org logo updated: `→ /logo-primary.svg`

### Root Layout (`src/app/layout.tsx`)
- Added metadata with `icons` configuration

### RSS Feed (`src/app/feed.xml/route.ts`)
- Image URL updated: `→ /logo-primary.svg`

### Blog Article (`src/app/[locale]/blog/[slug]/page.tsx`)
- Schema.org publisher logo updated: `→ /logo-primary.svg`

---

## 4. Hardcoded Color Replacements

120 occurrences of v1 colors replaced across 13 source files:

| Old (v1) | New (v2) | Files affected |
|---|---|---|
| `#0D503C` | `#047857` | 13 files |
| `#1E3A5F` | `#1E40AF` | 13 files |
| `#10B981` | `#047857` | 13 files |

---

## 5. Verification

### Build
- `next build` completes without errors
- All SSG pages pre-rendered successfully

### Assets (HTTP 200)
- `/logo.svg` — Header logo (horizontal)
- `/logo-mono-white.svg` — Footer logo (mono white)
- `/favicon.svg` — Browser favicon
- `/icon.svg` — Apple touch icon
- `/icon-only.svg` — 404 page icon
- `/logo-primary.svg` — Schema.org / RSS

### No remaining references to old files
- Zero matches for `/logo-icon.svg`, `/logo-light.svg`, `/images/logo.png` in source

### Site live
- Port 5000, bound to 0.0.0.0
- Homepage returns HTTP 200

---

## 6. Brand Guide Compliance

| Rule | Status |
|---|---|
| Three-color orbit system preserved | OK — forest/steel/cyan in SVGs |
| Mono-white on dark backgrounds | OK — footer uses `06-logo-mono-white.svg` |
| v1 palette removed (`#10B981`, `#0EA5E9`, `#F59E0B`) | OK — all replaced |
| Clear space around logo | OK — SVGs include built-in padding |
| No gradients/shadows/glows on wordmark | OK — not added |
| `gtc` color tokens in Tailwind | OK — forest, ink, steel, cyan, mint, deep |
