# GreenTechCycle — Système de design « Épuré »

Guide de référence pour toute modification visuelle du site (Next.js 14, Tailwind 3, next-intl fr/en).
À lire **avant** de toucher un composant ou une page. Les règles ci-dessous sont un contrat, pas une ambiance :
chaque décision est encodée en tokens (`tailwind.config.ts`, `src/app/globals.css`, `src/app/fonts.ts`).

Version : 1.0 — 2026-10-02 — branche `redesign-epure`.
Sources : `reports/audit-greentechcycle.md` (audit live, captures, axe-core) + lecture du code.

---

## 0. Direction en une phrase

> **Un site B2B de conformité, calme et dense en preuves : beaucoup de blanc cassé chaud, un seul vert d'action, des titres en serif éditorial, des hairlines plutôt que des ombres, zéro dégradé décoratif.**

Références (vérifiées le 2026-10-02, HTTP 200, captures dans `reports/screenshots/references/` du projet) — ce qu'on leur emprunte, rien d'autre :

| Référence | Ce qu'on reprend | Ce qu'on ne reprend pas |
|---|---|---|
| **Watershed — /customers** (principale) https://watershed.com/customers | Pairing serif display + sans texte (Crimson Text + Messina Sans → Fraunces + Inter), filets verticaux fins, bandeau de logos en cellules à filets, ton « preuve avant adjectif » | Le bouton bleu, la vidéo plein cadre, les logos réels |
| **Linear — /customers** (principale) https://linear.app/customers | Grille régulière 3 colonnes à filets, onglets de filtre en texte simple (actif = plus foncé), lien « → » discret, zéro ombre/dégradé | Le mode sombre, Inter en titres, visuels plein cadre dans chaque carte |
| Watershed — accueil https://watershed.com/ | Hero typographique (eyebrow à pastille, H1 18–24 caractères, un CTA), nav sobre | Palette blanc + bleu + aplats colorés, bannière promo |
| Vanta — /customers https://www.vanta.com/customers | Mur de confiance chiffré, pairing serif (Reckless) + sans (Söhne) | Le violet, logos flottants à ombre, boutons pilule |
| Greenly — FR https://greenly.earth/fr-fr | Bandeau clients en cellules à filets sans boîtes, bouton vert sobre, vocabulaire CSRD français | Inter en titres, teinte verte diffuse, hero en biais |
| Linear — accueil https://linear.app/ | Hero minimal, transitions discrètes, 6 entrées de nav max | Fond noir |

Ce que le site n'est plus : un template SaaS Tailwind (Inter par défaut, dégradés vert→bleu, blobs flous, cartes à ombres, rose/magenta, 3 barres sticky empilées).

---

## 1. Principes (à appliquer à chaque écran)

1. **Un seul vert d'action.** `leaf` (`#047857`, le vert du logo) sert aux boutons primaires, liens, états actifs, focus. Rien d'autre n'est vert vif.
2. **Le fond travaille, pas la décoration.** Le rythme vient de l'alternance `white` / `cream` / `forest` entre sections, jamais de blobs, grilles SVG ou dégradés.
3. **Hairline > ombre.** Bordure 1 px `line`. Les ombres n'existent que pour les éléments flottants (menus, popover, panneau de chat).
4. **Un seul élément collant à la fois** (en haut) et **un seul en bas sur mobile**. Jamais de contenu recouvert pendant la lecture.
5. **Preuves avant adjectifs.** Les chiffres, certifications et références sont composés comme des données (tabulaires, alignés), pas comme des badges décoratifs.
6. **Contraste AA partout** : texte ≥ 4.5:1, éléments d'interface ≥ 3:1. Les paires autorisées sont listées en §2.4 — on ne compose que celles-là.
7. **Images locales uniquement** (`/public`). Zéro hotlink externe (`images.unsplash.com`, `i.pravatar.cc`).

---

## 2. Palette & rôles

### 2.1 Tokens (source de vérité : `tailwind.config.ts` → `theme.extend.colors`, miroir en CSS vars dans `globals.css`)

```ts
// 2 verts (teintes dérivées autorisées) + neutres chauds + 1 accent
colors: {
  // Vert 1 — profond (surfaces sombres, titres alternatifs, texte sur mint)
  forest: {
    DEFAULT: "#0B3B2E",
    700:     "#0E4A3A",   // hover de surfaces forest, bordures sur forest
    900:     "#0F1F1A",   // "night" : surface sombre principale (sections Douleurs, citation, bandeaux)
    950:     "#122621",   // cartes sur night
  },
  // Vert 2 — action (= vert du logo)
  leaf: {
    DEFAULT: "#047857",   // boutons primaires, liens, focus, actif
    700:     "#065F46",   // hover du bouton primaire
    100:     "#E3F3EB",   // "mint" : fond de tag, encart léger, icône-pastille
    50:      "#F1F8F4",   // survol très léger, zebra de tableau
    300:     "#7BE0B3",   // vert d'accent SUR fond sombre uniquement (texte, icône, souligné)
  },
  // Neutres chauds (base stone, légèrement jaunie)
  ink:   { DEFAULT: "#1C1917", 700: "#44403C" }, // texte principal / texte secondaire
  muted: "#6B6560",   // texte tertiaire, légendes, placeholders (5.7:1 sur blanc, 5.3:1 sur cream)
  line:  "#E7E2DA",   // bordures 1 px, séparateurs, zebra
  sand:  "#EFEBE3",   // fond de zone en retrait (code, aside), fond de pictogramme neutre
  cream: "#F7F5F0",   // fond de section alternée
  paper: "#FFFFFF",   // fond par défaut
  // Sur fond sombre (forest / night)
  ondark: { DEFAULT: "#F5F2EC", muted: "#A3B3AA", line: "rgba(255,255,255,0.10)" },
  // Accent unique (alertes, échéances, eyebrow "coût caché", chiffre à risque)
  ochre: { DEFAULT: "#B45309", 800: "#9A4A0B", 100: "#FBEFD9", 300: "#F2B35B" /* sur sombre */ },
}
```

### 2.2 Rôles (qui a le droit de quoi)

| Rôle | Token | Exemples |
|---|---|---|
| Fond de page | `paper` | body, cartes, header |
| Section alternée | `cream` | une section sur deux, formulaires, FAQ |
| Section sombre | `forest-900` (night) | Douleurs, citation, bandeau chiffres, footer |
| Section « marque » | `forest` | CTA final, hero des pages secteur, référence client |
| Texte principal | `ink` | titres, corps |
| Texte secondaire | `ink-700` | paragraphes longs, descriptions de cartes |
| Texte tertiaire | `muted` | légendes, notes, méta, placeholders |
| Action | `leaf` → hover `leaf-700` | boutons primaires, liens, onglet actif (souligné), focus ring |
| Tag / pastille icône | `leaf-100` fond + `forest` texte/icône | pictos secteurs, labels « Prioritaire », certification |
| Accent alerte | `ochre` (texte) / `ochre-100` (fond) + `ochre-800` (texte sur fond) | eyebrow « Le coût caché », échéance CSRD, icône AlertTriangle |
| Bordure | `line` (clair) / `ondark-line` (sombre) | partout |
| Texte sur sombre | `ondark` / `ondark-muted` / `leaf-300` / `ochre-300` | sections night & forest |

### 2.3 Interdits

- `#10B981`, `#0EA5E9`, `#1E40AF`, `#0891B2`, `#F59E0B`, `#8B5CF6`, toutes les classes `pink-*`, `rose-*`, `sky-*`, `blue-*`, `indigo-*`, `violet-*`, `cyan-*`, `lime-*`, `fuchsia-*`, `amber-*`, `red-*` (sauf messages d'erreur de formulaire : `#B42318` texte sur blanc).
- `bg-gradient-*` décoratif, `blur-3xl`, `animate-pulse*`, `animate-ping`, `backdrop-blur` hors header/panneau flottant.
- Couleur par secteur (`accent: "pink"` etc. dans `sectors.ts`) : tous les secteurs partagent la même pastille `leaf-100 / forest`. L'identité d'un secteur vient de son pictogramme et de son numéro, pas d'une couleur.
- Le logo (`/public/logo/*.svg`) garde ses couleurs internes (vert `#047857`, bleu, cyan) : c'est un actif, pas un token. Ne pas en dériver de bleu pour l'interface.

### 2.4 Paires de contraste vérifiées (WCAG, calcul relatif luminance)

| Texte | Fond | Ratio | Usage |
|---|---|---|---|
| `ink` #1C1917 | paper / cream | 17.5 / 16.1 | texte |
| `ink-700` #44403C | paper / cream | 10.3 / 9.4 | texte secondaire |
| `muted` #6B6560 | paper / cream | 5.7 / 5.3 | légendes (≥ 13 px) |
| `forest` #0B3B2E | paper / cream / leaf-100 | 12.5 / 11.5 / 10.9 | titres, texte sur mint |
| `leaf` #047857 | paper / cream / leaf-100 | 5.5 / 5.0 / 4.8 | liens, texte d'action |
| blanc | `leaf` / `forest` / `forest-900` | 5.5 / 12.5 / 17.1 | boutons, sections sombres |
| `ochre` #B45309 | paper / cream | 5.0 / 4.6 | eyebrow alerte |
| `ochre-800` #9A4A0B | `ochre-100` | ≥ 5.5 | texte sur fond alerte |
| `ondark` #F5F2EC | night / forest | 15.3 / 11.2 | texte sur sombre |
| `ondark-muted` #A3B3AA | night / forest | 7.8 / 5.7 | méta sur sombre, numéros 01–06 |
| `leaf-300` #7BE0B3 | night / forest | 10.7 / ≥ 6.7 | accent sur sombre |
| `ochre-300` #F2B35B | night / forest | 9.2 / 6.8 | alerte sur sombre |

Hors liste = interdit (ex. `text-white/30`, `text-white/50`, `#78716C` sur cream = 4.4, blanc sur `#10B981` = 2.5).

---

## 3. Typographie

### 3.1 Pairing

| Rôle | Police | Fichier (auto-hébergé, `next/font/local`) | Axes |
|---|---|---|---|
| **Display** (H1, H2, chiffres-arguments, citations) | **Fraunces** (variable, OFL) | `src/fonts/fraunces-latin-opsz-normal.woff2` (67 Ko) | `wght` 100–900, `opsz` 9–144 |
| **Texte & UI** (corps, H3+, boutons, tableaux, nav) | **Inter** (variable, OFL) | `src/fonts/inter-latin-opsz-normal.woff2` (73 Ko) | `wght` 100–900, `opsz` 14–32 |

Chargement : `src/app/fonts.ts` exporte `fontDisplay` (`--font-display`) et `fontSans` (`--font-sans`), appliqués sur `<html>` dans `src/app/[locale]/layout.tsx`. **Aucun `@import` Google Fonts, aucun CDN** (supprimé de `globals.css`). Sous-ensemble `latin` = couvre tout le français (accents, œ, €).

Pourquoi : Fraunces donne le côté « travaillé » éditorial (cf. Watershed) sans tomber dans le luxe ; Inter reste la police la plus lisible pour des pages denses (tableaux ROI, FAQ, formulaires) — ce n'était pas Inter le problème, c'était l'absence de système.

### 3.2 Échelle (tokens `fontSize` dans Tailwind — `text-display-xl` etc.)

| Token | Taille / interligne (mobile → ≥ lg) | Police, graisse, tracking | Usage |
|---|---|---|---|
| `display-xl` | 44/48 → 64/68 | Fraunces 500, −0.02em (opsz auto) | H1 accueil, chiffre-argument du hero (« 78 % ») |
| `display-lg` | 36/40 → 48/52 | Fraunces 500, −0.02em | H1 pages intérieures |
| `display-md` | 30/36 → 36/40 | Fraunces 500, −0.01em | H2 de section |
| `display-sm` | 24/30 → 28/34 | Fraunces 500, −0.01em | H2 compact, citation, titre de carte éditoriale, prix |
| `heading-lg` | 20/28 | Inter 600, −0.01em | H3 |
| `heading-md` | 17/24 | Inter 600, −0.01em | H4, titre de carte, ligne de tableau en gras |
| `body-lg` | 18/28 | Inter 400 | chapô, paragraphe d'intro (max 65 ch) |
| `body` | 16/24 | Inter 400 | corps par défaut |
| `body-sm` | 14/20 | Inter 400/500 | cartes, tableaux, nav, boutons md |
| `caption` | 13/16 | Inter 400 | légendes, notes, méta |
| `eyebrow` | 12/16 | Inter 600, +0.12em, uppercase | sur-titre de section, label de colonne |
| `stat` | 40/40 → 56/56 | Fraunces 500, −0.02em, `tabular-nums` | KPI (CountUp), ROI |

Règles :
- **H1/H2 = Fraunces, graisse 500 uniquement.** Jamais 700/800/900 en Fraunces (c'est lourd et « gras de template »). Les `font-bold`/`font-black` actuels sur titres sont à retirer.
- **Inter 600 max** pour l'UI. `font-black` disparaît du site. L'emphase se fait par la taille et la couleur, pas par la graisse.
- **Chiffres** : arguments (hero, KPI) en Fraunces `stat` ; données (tableaux, prix, compteurs de badge) en Inter 600 `tabular-nums`.
- Longueur de ligne : `max-w-[65ch]` sur tout paragraphe ; les H1 `max-w-[18ch]`, H2 `max-w-[24ch]`.
- Hiérarchie de section standard : `eyebrow` (`muted` ou `ochre` si alerte) → H2 `display-md` → chapô `body-lg ink-700` → contenu. Espacement : 12 px / 16 px / 40 px.
- `font-feature-settings: "ss01", "cv11"` (Inter) et `font-optical-sizing: auto` (Fraunces suit sa taille via l'axe opsz) dans `globals.css`.
- Pas de texte en italique décoratif ; italique réservé aux citations courtes et aux notes de source.

---

## 4. Espacement, grille, rythme

### 4.1 Échelle 8 px
Autorisé : `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128` (Tailwind : `1 2 3 4 6 8 10 12 16 20 24 32`). Pas de `py-14`, `gap-5`, `mb-7`, `p-7`, `py-3.5`, `h-[48px]`, etc.

### 4.2 Conteneurs
- `container-max` = `max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8`.
- Colonne de lecture : `max-w-[720px]` (prose, FAQ, formulaires).
- Grilles : 1 col mobile → 2 cols `sm` → 3/4 cols `lg`. Gouttière `gap-4` (16) pour cartes compactes, `gap-6` (24) pour cartes standards, `gap-12/16` pour split texte/image.

### 4.3 Rythme vertical
| Type de section | Padding vertical (mobile → lg) |
|---|---|
| Hero | `py-16 lg:py-24` (accueil : `lg:py-32`) |
| Section standard | `py-16 lg:py-24` |
| Section dense (bandeau chiffres, autres secteurs, certification) | `py-12 lg:py-16` |
| Bandeau fin (notice, strip de certifications) | `py-3` |

Entre en-tête de section et contenu : `mb-10 lg:mb-12`. Entre blocs d'une même section : `gap-8`. Carte : `p-6` (compacte `p-4`, grande `p-8`).
Alternance des fonds : jamais deux sections `cream` consécutives, jamais deux `night` consécutives. Pattern type : paper → cream → paper → night → paper → cream → forest (CTA) → footer (night).

---

## 5. Formes : rayons, bordures, ombres

| Élément | Rayon | Bordure | Ombre |
|---|---|---|---|
| Bouton, input, select, tag | `rounded-lg` (8 px) | 1 px `line` (secondaire/inputs) | aucune |
| Carte, panneau, cellule de grille | `rounded-xl` (12 px) | 1 px `line` | aucune ; `hover: border-ink/20` |
| Image, visuel, panneau de chat | `rounded-2xl` (16 px) | 1 px `line` sur image claire | aucune |
| Pastille icône, avatar, chip | `rounded-full` | — | — |
| Menu déroulant, popover, bulle chat | `rounded-xl` | 1 px `line` | `shadow-pop` |

Tokens d'ombre (`boxShadow`) : `card` = `0 1px 2px rgba(28,25,23,.06), 0 1px 3px rgba(28,25,23,.04)` (uniquement cartes cliquables au hover) ; `pop` = `0 8px 24px -8px rgba(28,25,23,.18), 0 2px 6px rgba(28,25,23,.06)`. Interdits : `shadow-lg/xl/2xl`, `shadow-[color]/30` (glow), `ring-1 ring-black/5` comme pseudo-ombre.
Sur fond sombre : bordure `ondark-line`, cartes `forest-950`.

Focus clavier : `outline: 2px solid leaf; outline-offset: 2px` (sur sombre : `leaf-300`). Jamais `focus:outline-none` sans remplacement.

---

## 6. Composants

### 6.1 Header (`src/components/Header.tsx`)
- Une seule barre, `h-16 lg:h-[72px]`, `bg-paper/95 backdrop-blur`, `border-b line`. `position: fixed` ; `<main>` reçoit `pt-16 lg:pt-[72px]` (plus de calcul `+1.75rem`).
- Gauche : logo horizontal seul (**supprimer** la tagline « Plateforme ITAD unifiée » sous le logo). Centre : 5 menus + Tarifs. Droite : switch langue (texte « EN/FR », sans icône globe) + bouton primaire md.
- Liens de nav : `body-sm` 500 `ink-700`, hover `ink` + fond `cream`. Actif : `ink` + souligné 2 px `leaf`.
- Menus déroulants : `rounded-xl`, `line`, `shadow-pop`, items `py-2 px-3`. Pas de `role="menu"` sans gestion clavier complète (garder liens simples).
- Mobile : panneau plein écran sous la barre, sections par groupe, bouton primaire pleine largeur en bas.
- **Le bandeau certifications (`TrustBar`) n'est plus fixe** : il devient `CertificationStrip` (statique) placé en bas de hero (accueil, secteurs, plateforme, tarifs) ou en haut du footer ailleurs. Composant unique, texte `caption muted`, pictos `ShieldCheck` 14 px `forest`.

### 6.2 Règle « un seul sticky »
- Par défaut, **seul le header** est fixe.
- Pages avec navigation de sections (page secteur, réglementation) : la barre d'onglets est `sticky top-0` **et le header se retire** quand elle prend le relais. Implémentation : une sentinelle (`<div aria-hidden>`) juste au-dessus de la barre observée par `IntersectionObserver` ; quand elle sort par le haut, le header reçoit `data-hidden` → `-translate-y-full` (transition 200 ms) ; quand on remonte au-dessus, il revient. La barre d'onglets embarque alors à gauche la pastille logo (`/logo/icon-only.svg`, 24 px, lien accueil) pour conserver l'accès marque. À tout instant : header **ou** onglets, jamais les deux.
- Accueil : la nav d'ancres sticky est **supprimée** (les ids `#solution #differentiators #cases #compliance #pricing` restent sur les sections).
- `html { scroll-padding-top: 5rem }` pour que les ancres (`#douleurs`…) ne passent pas sous la barre.

### 6.3 Boutons (`src/components/ui/Button.tsx`, à créer)
| Variante | Fond / texte | Hover | Bordure |
|---|---|---|---|
| `primary` | `leaf` / blanc | `leaf-700` | — |
| `secondary` | `paper` / `ink` | `cream` | 1 px `line` → `ink/30` |
| `ghost` | transparent / `leaf` | `leaf-50` | — |
| `primary` sur sombre | `ondark` (#F5F2EC) / `forest` | blanc | — |
| `secondary` sur sombre | transparent / `ondark` | `white/10` | 1 px `ondark-line` → `white/30` |

Tailles : `md` = `h-11 px-5 text-sm` ; `lg` = `h-12 px-6 text-base`. Graisse 600. Icône `ArrowRight` 16 px à droite uniquement sur le primaire, translation 2 px au hover. Pas de `-translate-y`, pas de glow. Coins `rounded-lg`. `min-height 44px` garanti (tap target).

### 6.4 En-tête de section (`SectionHeader`)
`eyebrow` (`muted`, ou `ochre` pour les sections « risque ») + H2 `display-md` + chapô optionnel `body-lg ink-700 max-w-[65ch]`. Alignement à gauche par défaut ; centré uniquement pour les CTA. Plus d'icône dans une pastille à côté du H2 (motif actuel « carré 48 px + icône + titre » supprimé).

### 6.5 Cartes
- Base : `bg-paper border line rounded-xl p-6`. Sur `cream` : fond `paper`. Sur sombre : `forest-950` + `ondark-line`.
- Cliquable : `hover:border-ink/20 hover:shadow-card`, titre → `leaf` au hover, flèche 16 px qui se décale de 2 px. Pas de zoom d'image, pas de levée.
- Pastille icône : `h-10 w-10 rounded-full bg-leaf-100 text-forest`, icône Lucide 20 px, `strokeWidth 1.75`.
- Numéro de carte (« 01 ») : `eyebrow muted`, jamais en « ghost number » géant translucide (motif supprimé partout : hero secteur, grille, cartes).

### 6.6 Grille des secteurs (`/secteurs`, `SectorCard`)
- **Grille régulière** : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` → 16 cartes de même taille, dans l'ordre des numéros 01→16.
- **Carte sans photo** : pastille pictogramme secteur (Lucide, mapping existant dans `sectors.ts`), `eyebrow` « 01 », nom en `heading-md`, 1 ligne d'angle (`body-sm muted`, à ajouter dans `sectors-i18n.ts` : `tagline`), lien « Voir la fiche ». Hauteur uniforme (`h-full`).
- Mise en avant (`featured`, finance + médias) : badge `leaf-100/forest` « Référence TF1 » / « Prioritaire » en haut à droite ; **pas** de carte plus grande, **pas** de badge rose.
- Les photos de stock quittent la grille (elles n'apportent rien et deux étaient cassées).

### 6.7 Bandeau de confiance (`TrustBand`, accueil)
- Remplace les 6 rectangles gris : une ligne `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`, **sans boîtes** — chaque item = pictogramme sectoriel 24 px `forest` dans pastille `leaf-100` 40 px + nom en `body-sm ink` 600 + métrique en `caption muted` sur 2 lignes, séparés par `border-l line` (sauf le premier). Centré, `py-12`.
- Mapping pictos : banque → `Landmark` ; TF1 → `Tv` ; CHU → `HeartPulse` ; ETI industrielle → `Factory` ; ministère → `Building2` ; retail → `Store`. TF1 (référence publique) : nom en `heading-md` (pas de logo tiers).
- La note « Identité anonymisée… » reste en `caption muted` sous la ligne.

### 6.8 Référence client (`ClientReference`, page secteur médias)
Remplace le bloc rose : section `bg-forest`, `py-12`, split `[auto_1fr]` : pastille `Tv` 48 px `leaf-300` sur `forest-700` + eyebrow `ondark-muted` « Référence client · TF1 » + texte `display-sm ondark` (citation éditoriale) + méta `caption ondark-muted` (« Contrat annuel récurrent, parc IT et broadcast »). Aucune étoile, aucun `Sparkles`.

### 6.9 Onglets / navigation de sections (`SectionNav`)
- Liste `<nav aria-label>` d'ancres, `h-12`, `bg-paper/95`, `border-b line`.
- Item : `body-sm` 500 `ink-700`, `px-3`, actif = `ink` + soulignement 2 px `leaf` (`aria-current="true"`). **Plus de fond vert plein** (contraste 2.5:1 corrigé).
- Mobile : défilement horizontal `overflow-x-auto snap-x`, chaque item `snap-start`, **indice de défilement** = masque `mask-image: linear-gradient(to right, #000 calc(100% - 48px), transparent)` + padding droit `pr-12` pour laisser le dernier onglet partiellement visible ; au scroll à la fin, le masque disparaît (classe toggled par un petit `onScroll`). `scrollbar-hide` conservé.
- Scroll-spy : garder l'`IntersectionObserver` existant (`rootMargin: -30% 0px -60% 0px`).

### 6.10 Widget de chat (`SalesAssistantWidget`)
- **Bouton compact** : `h-12 w-12 rounded-full bg-leaf text-white` avec icône `MessageCircle` 22 px (plus de photo dans le bouton), `shadow-pop`, position `fixed bottom-6 right-6` sur `lg+`. `aria-label`, `aria-expanded`, `aria-controls`.
- **Mobile (< lg)** : le bouton vit **dans** la barre d'action basse (§6.11) ; aucune bulle flottante ; le panneau s'ouvre en **feuille plein écran** (`inset-0`, `h-[100dvh]`, `role="dialog" aria-modal`) avec bouton Fermer 44 px dans son en-tête — il ne recouvre jamais le contenu pendant la lecture puisqu'il est modal.
- **Desktop** : panneau `w-[380px] max-h-[70vh] rounded-2xl shadow-pop bottom-24 right-6`. En-tête `forest` (plus de dégradé vert→bleu), avatar 40 px autorisé dans l'en-tête du panneau.
- **Bulle « Besoin d'aide ? »** : desktop seulement, une fois par session (sessionStorage), après 20 s, auto-fermée après 12 s. **Deux boutons frères** (`<div>` conteneur → `<button>` ouvrir + `<button>` fermer), jamais un bouton dans un bouton (fix axe `nested-interactive`).
- `env(safe-area-inset-bottom)` respecté. `prefers-reduced-motion` : pas d'animation d'apparition.

### 6.11 Barre d'action mobile (`MobileActionBar`, remplace `StickyCTA`)
- `< lg` uniquement. `fixed bottom-0 inset-x-0 h-16 bg-paper border-t line px-4 flex gap-3 items-center`, padding bas `safe-area`.
- Contenu : bouton primaire `flex-1` (libellé contextuel existant de `pickContext`) + bouton chat 44 px (§6.10). **C'est le seul élément fixe en bas.**
- Apparaît seulement une fois le hero dépassé (sentinelle sur le hero) ; disparaît si le `CookieBanner` ou l'`ExitPopup` est ouvert.
- `<main>` reçoit `pb-20 lg:pb-0` pour que le dernier contenu ne soit jamais sous la barre.
- Plus de dégradé blanc transparent au-dessus, plus de glow vert.

### 6.12 CTA de fin de page (`CtaSection`)
- Une seule variante visuelle : section `bg-forest`, `py-16 lg:py-24`, centré, H2 `display-md ondark max-w-[24ch]`, chapô `body-lg ondark-muted`, 2 boutons (primaire sur sombre + secondaire sur sombre). Ligne de réassurance `caption ondark-muted` (« Réponse sous 48 h · Sans engagement »).
- Supprimés : icône dans pastille, blobs, grille SVG, variantes `gradient`, `light`, fond `#10B981` plein.
- Une page = **un seul** CTA de fin (les enchaînements CTA + bandeau tarifaire + encart pilote + bandeau confiance sont réduits à un bloc, voir §9).

### 6.13 Tableaux (ROI, comparatifs, matrice)
`border line rounded-xl overflow-hidden` ; en-tête `bg-cream eyebrow muted` ; lignes `border-t line` ; zebra `leaf-50` ; chiffres `tabular-nums` alignés à droite ; cellule-clé `ink 600`. Mobile : `overflow-x-auto` avec le même masque d'indice que §6.9, ou empilement en cartes si ≤ 3 colonnes.

### 6.14 Accordéon (FAQ, objections)
Liste `divide-y line` sans cartes individuelles ; bouton `py-5 text-left heading-md ink` + `ChevronDown` 20 px `muted` (rotation 180°) ; `aria-expanded`, contenu `body ink-700 pb-6`. Un seul ouvert par défaut.

### 6.15 Tags, badges, eyebrow chips
`inline-flex h-7 px-3 rounded-full text-caption 600`. Neutre : `bg-sand ink-700`. Marque : `bg-leaf-100 forest`. Alerte : `bg-ochre-100 ochre-800`. Sur sombre : `bg-white/10 ondark`. Pas d'emoji, pas de `Sparkles`.

### 6.16 Formulaires (contact, réservation, newsletter)
Label `body-sm 500 ink` au-dessus, input `h-11 rounded-lg border line bg-paper px-3 body` ; focus `border-leaf ring-2 ring-leaf/20` ; erreur `border-[#B42318]` + message `caption` rouge. Aide `caption muted`. Checkbox 20 px. Bouton de soumission primaire `lg`, pleine largeur sur mobile.

### 6.17 Stat / KPI
Bloc : valeur `stat` (Fraunces, `CountUp` conservé) + libellé `body-sm ink-700` + source `caption muted`. Alignés sur une ligne `grid-cols-2 lg:grid-cols-4`, séparés par `border-l line`. Sur sombre : valeur `ondark`, accent de valeur `leaf-300`.

### 6.18 Footer
`bg-forest-900`, texte `ondark-muted`, titres de colonne `eyebrow ondark`, liens `body-sm` hover `ondark`. Newsletter : input sur `forest-950` + bouton primaire sur sombre. Ligne du bas : certifications (`CertificationStrip` variante sombre) + mentions. Pas de dégradé.

### 6.19 Notice / bandeau d'urgence (CSRD)
Le `Link` pleine largeur navy au-dessus du hero est supprimé des pages (accueil, plateforme, contact, pourquoi). L'information devient une **ligne de notice** dans le hero : `inline-flex gap-2 rounded-full bg-ochre-100 text-ochre-800 caption 600 px-3 h-7` + icône `AlertTriangle` 14 px, lien vers `/reglementation`.

---

## 7. Imagerie & pictogrammes

- **Local uniquement** : `/public/photos/*`, `/public/images/*`. Supprimer `images.remotePatterns` de `next.config.js` une fois les 15 hotlinks remplacés (liste en §10, étape 1).
- Un secteur sans photo locale dédiée a `image: null` dans `sectors.ts` : le hero utilise alors la surface `forest` seule et la section Profil affiche un **panneau d'identité** (numéro, cadre réglementaire, 3 faits) à la place de l'image. **On n'affiche jamais une photo « à peu près »** pour boucher un trou.
- Traitement : photos en couleur, pas de filtre ; sur hero sombre, image en `opacity-20` + voile `forest/60` (jamais opacité 15 % sur noir pur). Rayon `rounded-2xl`, bordure `line` sur fond clair.
- Ratios : hero split `4/5` (portrait) ou `3/2` ; carte `16/10` ; profil secteur `4/3` ; avatar `1/1`. Toujours `next/image` avec `sizes`.
- Pas de photo « lifestyle startup » en hero accueil : remplacer `/photos/hp-rssi-boardroom.jpg` par `/photos/hp-atelier-itad.jpg` ou `/photos/hp-audit-signature.jpg` (métier, atelier, signature d'audit) — à valider avec le client ; à défaut, hero sans photo avec un panneau de preuve (Audit ACPR 4 jours / 638 k€) composé en Stat (§6.17).
- Pictogrammes : Lucide uniquement, `strokeWidth 1.75`, 20 px dans pastille 40 px, 24 px dans pastille 48 px, couleur `forest` sur `leaf-100` (ou `leaf-300` sur sombre). Un seul set, pas de mélange emoji/icônes.
- Logo : `logo-horizontal.svg` sur clair, `logo-mono-white.svg` sur `forest`/`night`, `icon-only.svg` pour la barre d'onglets. Hauteur 32 px (mobile) / 36 px (desktop).

---

## 8. Mouvement & interaction

- Entrées de section : `FadeIn` conservé mais calmé : `y: 12`, `duration: 0.45`, `once: true`, `margin: -40px`. `StaggerContainer` : `staggerDelay 0.06`. `motion.tsx` lit `useReducedMotion()` et désactive tout si actif.
- `CountUp` autorisé sur les KPI (durée 1.6 s).
- Hover : changement de couleur/bordure 150 ms, flèche `translate-x-0.5`. Pas de `scale`, pas de `-translate-y`, pas de zoom d'image.
- Supprimés : `animate-pulse-slow/slower`, `animate-shimmer`, `animate-marquee`, `animate-ping` (badge « en ligne »), blobs flous, `whileHover={{ scale }}` du bouton de chat.
- Transitions de header (`-translate-y-full`) : 200 ms `ease-out`.

---

## 9. Responsive

- Mobile-first ; breakpoints Tailwind par défaut (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Typo : les tokens display ont deux paliers (mobile / `lg`) via `clamp()` défini dans `fontSize` ; ne pas empiler `text-3xl md:text-4xl lg:text-5xl` à la main.
- Splits texte/image : empilés sous `lg`, image après le texte.
- Grilles : 1 → 2 → 3/4 colonnes ; jamais 4 colonnes sous `lg`.
- Barres horizontales (onglets, tableaux) : masque d'indice de défilement (§6.9), jamais coupées net.
- Cibles tactiles ≥ 44 px ; `MobileActionBar` 64 px + `safe-area`.
- Un seul élément fixe en haut (header **ou** onglets) + un seul en bas (`MobileActionBar`) ; le `CookieBanner` prend la place de la barre d'action tant qu'il est ouvert.
- Longueur des pages secteur (16 500 px mobile) : réduite par les condensations §10 ; pas de découpage en sous-pages (les ancres et URLs restent).

---

## 10. Architecture des pages

Règles communes : les **URLs, ids d'ancres, métadonnées SEO (`generateMetadata`/`metadata` des `layout.tsx`), `hreflang`, `sitemap`, Schema.org et les messages `fr/en`** sont conservés tels quels. « Condenser » = même contenu, moins de blocs ; « couper » = contenu déplacé ou retiré explicitement listé ci-dessous.

### 10.1 Accueil `/[locale]` (`src/app/[locale]/page.tsx`)
Ordre cible (actuel → cible) :
1. ~~Bandeau urgence navy~~ → **notice CSRD** dans le hero (§6.19).
2. **Hero** : fond `paper`, split 7/5. Eyebrow certifications → chip neutre ; chiffre « 78 % » en `display-xl` Fraunces `forest` ; titre `display-lg` ; sous-titre `body-lg` ; 2 boutons ; source `caption`. Les 2 cartes de preuve flottantes deviennent une ligne Stat sous la photo. **`CertificationStrip`** statique en bas de hero (remplace `TrustBar`).
3. ~~Cartes « enjeux » (4)~~ → **condensées** en une ligne de 4 liens texte (`body-sm 500 leaf`) sous le hero : « Je suis DSI · RSSI · RSE · DAF ».
4. ~~Nav d'ancres sticky~~ → **supprimée** (ids conservés).
5. **TrustBand** pictogrammes (§6.7).
6. **Problème** (3 risques) — eyebrow `ochre` « Le coût caché », 3 cartes régulières.
7. **Solution** `#solution` — titre + hub (4 piliers en grille 2×2, sans schéma décoratif) ; le bloc **Avant/Après** y est **condensé** en tableau 2 colonnes.
8. **Chaîne de valeur** (5 étapes) — section `night`, 5 colonnes numérotées `eyebrow`.
9. **Preuves** `#cases` — **fusion** des 4 KPI (Stat row) et des 3 cas clients (3 cartes) dans une seule section `cream`.
10. **Calendrier réglementaire** `#compliance` — 4 échéances en timeline verticale sobre, accent `ochre`.
11. **Pourquoi GreenTechCycle** `#differentiators` — 4 différenciateurs en liste à pictos.
12. **Témoignage** — section `forest`, citation `display-sm`, auteur `caption`.
13. **Tarifs Waki Box** `#pricing` — 3 cartes régulières + ligne pilote ; fond `paper`.
14. **Calculateur ROI** (`#fleet-size`) — carte unique sur `cream`.
15. **FAQ** (4) — accordéon (§6.14).
16. **CTA final** (§6.12) — un seul bloc. ~~Bandeau confiance final~~ → absorbé par le footer.
Les 3 sections non titrées (lignes 1212–1364 : ressources / newsletter / ROI) : garder le ROI (14), **couper** la newsletter (présente dans le footer), condenser « ressources » en 3 liens dans la FAQ.

### 10.2 Secteurs — listing `/[locale]/secteurs` (`secteurs/page.tsx`)
1. **Hero clair** (`cream`) : H1 `display-lg`, chapô, `CertificationStrip`. Plus de « 16 » fantôme ni de `grid-pattern.svg` (fichier inexistant).
2. ~~« Comment lire » 3 briques~~ → **condensé** en une ligne de 3 items texte-picto sous le chapô.
3. **Grille 16 secteurs** régulière (§6.6), ordre 01→16.
4. **Annexe 1 — matrice de priorisation** et **Annexe 2 — séquencement** : contenu conservé mais **démoté** en deux accordéons fermés par défaut (titre `heading-lg`, `caption` « Annexe interne de lecture ») sous la grille ; tableau en §6.13.
5. **CTA final** unique (§6.12). ~~Bandeau confiance~~ → footer.

### 10.3 Page secteur `/[locale]/secteurs/[slug]` (`SectorDetailPage.tsx`) — ex. `medias-audiovisuel`
Ancres conservées : `#profil #douleurs #cas-usage #roi #personas #argumentaire #objections`.
1. **Hero** `forest` : fil d'Ariane (`Breadcrumbs`), chip « Secteur 09/16 », H1 `display-lg ondark`, sous-titre `body-lg ondark-muted`, image locale `opacity-20` si existante. Plus de numéro fantôme.
2. **SectionNav** (§6.9, règle un-seul-sticky §6.2).
3. **Profil** `#profil` — split texte / image-ou-panneau d'identité ; cadre réglementaire en carte `cream`.
4. **Référence client** (médias uniquement) — `ClientReference` (§6.8).
5. **Douleurs** `#douleurs` — section `night`, grille `lg:grid-cols-2 gap-8`, numéros « 01 » en `eyebrow ondark-muted` (7.8:1), texte `body ondark`.
6. **Cas d'usage** `#cas-usage` — liste `divide-y line`, numéro `eyebrow muted`, H3 `heading-lg`, texte `ink-700`. Plus de cartes alternées.
7. **ROI** `#roi` — tableau §6.13 sur `cream`.
8. **Décideurs** `#personas` — grille 3 colonnes de cartes compactes (initiale en pastille `leaf-100 forest`).
9. **Argumentaire** `#argumentaire` — citation `display-sm` sur `forest`.
10. **Objections** `#objections` — accordéon.
11. **Autres secteurs** — rangée de chips (6) + lien « Tous les secteurs ».
12. **CTA final unique** : titre `content.cta.title`, bouton principal `/reserver?offre=demo-conseil`, bouton secondaire **« Tester Waki Box — 1er mois offert »** (`/reserver?offre=pilote-waki-box`), ligne `caption` « Grille tarifaire complète → /tarifs ». ~~Bandeau tarifaire 3 cartes~~, ~~encart pilote séparé~~, ~~bandeau confiance~~ : **condensés** dans ce bloc (contenu textuel repris, 1 section au lieu de 4). Corriger « automatisé », « Résiliable à tout moment », « Démarrer », « 39 € HT ».

### 10.4 Plateforme `/[locale]/plateforme`
1. ~~Bandeau urgence~~ → notice (§6.19). 2. **Hero split** (`paper`), `CertificationStrip`. 3. ~~S2 promesse narrative~~ → **condensée** en chapô du hero. 4. **Parcours 5 chapitres** `#parcours` — ajouter les ids attendus par le header : `#modules` (section parcours), `#governance` et `#mobile` sur les chapitres correspondants (actuellement les liens `/plateforme#modules|#governance|#mobile` pointent dans le vide). 5. **Citation** `forest`. 6. **Chiffres d'exploitation** — Stat row sur `night`. 7. **Offres d'entrée** — 3 cartes régulières. 8. **FAQ**. 9. ~~S8 conversion vert plein~~ + ~~S9 CTA photo~~ → **un seul CTA** (§6.12). Métadonnées : accents (« unifiée », « traçabilité », « temps réel », « automatisés », « intégration », « certifié », « reporting ») dans `title`, `description`, `keywords`, `openGraph`, `twitter` et `featureList` du Schema.

### 10.5 Tarifs `/[locale]/tarifs`
Ancres conservées : `#plans #pilote #sur-devis`.
1. **Hero** `cream` (plus de split sombre), H1 « Tarifs Waki Box, la seule brique GTC à prix public. » (espace après la virgule — le `<br />` reste pour la composition mais le texte source contient `, `). 2. **3 briques GTC** — ligne de 3 cartes ; **fusionne** S6d « trois portes d'entrée » (doublon). 3. **3 plans Waki Box** `#plans` — grille régulière 3 colonnes, plan recommandé = bordure `leaf` + tag, **pas** de composition asymétrique. 4. **Programme pilote** `#pilote` — section `leaf-100` (plus de vert plein), H2 « Premier mois offert, puis 39 € HT/mois. » 5. ~~Comparatif par barres~~ → **condensé** : les différences entrent dans la liste de features des cartes de plans. 6. **Modules complémentaires** — tableau. 7. **Comparateur interactif** — conservé, carte unique. 8. **Bundles RSE** — 2–3 cartes. 9. **Pilote GTC 3 jours** — carte unique. 10. ~~Séparateur dégradé~~ supprimé. 11. **Sur devis** `#sur-devis` — section `night`, 2 cartes éditoriales. 12. **FAQ**. 13. **CTA** unique.

### 10.6 Contact `/[locale]/contact`
1. ~~Bandeau urgence~~ supprimé. 2. **Hero court** (`paper`) : H1 + 2 lignes + 3 réassurances `caption` (48 h, NDA, sans engagement). 3. **Formulaire** `#formulaire` sur `cream` : panneau d'offre à gauche (`paper`, `line`), formulaire §6.16 à droite ; `aside` sticky **uniquement** `lg+` et seulement si aucune autre barre n'est collée (ici OK : header seul). 4. **Coordonnées & voies directes** — section `night`, 3 colonnes. 5. ~~S4 conversion verte~~ → **coupée** (la page est déjà la conversion).

### 10.7 Autres gabarits
| Page(s) | Fichier | Décision |
|---|---|---|
| Services (listing) | `services/page.tsx` | Hero split `paper` ; bandeau certifs → `CertificationStrip` ; S2b pilote + S6 conversion → un CTA ; grille 6 services régulière 2×3 ; citation `forest`. Hotlinks Unsplash → `/photos/service-*.jpg`. |
| Services (6 pages) | `services/ServicePageTemplate.tsx` | Même squelette : hero, pourquoi, méthodologie (`night`), livrables, citation, FAQ, CTA. Supprimer ghost numbers ; hotlinks → locaux. |
| Cas d'usage | `cas-usages/page.tsx` | Conserver le cas TF1 en « featured » ; les 8 cas sectoriels pleine largeur alternés → **grille régulière 2 colonnes** de cartes-cas (titre, 3 chiffres, lien secteur) ; témoignages, FAQ, cross-link secteurs, CTA unique ; supprimer la nav flottante `xl:fixed right-4`. |
| Pourquoi GTC, Waki Box, Impact, Parcours client, Processus ITAD, Méthodologie, Sécurité, Écosystème, Résultats clients, Carrières | pages respectives | Appliquer tokens + §6 ; supprimer bandeau urgence, blobs, dégradés ; un CTA par page. Impact : calculateur en carte unique, CTA milieu de page conservé mais en variante `secondary` inline. |
| Réglementation | `reglementation/page.tsx` | 27 dégradés → palette §2 (sections `paper/cream/night`) ; sa nav de sections suit §6.2 (le header se retire) ; `sticky top-0` conservé. |
| Démo, Réserver (+ merci) | `demo`, `reserver/*` | Formulaires §6.16, hero court, pas de CTA de fin. |
| Blog (liste + article) | `blog/*` | Hero Unsplash → `/photos/blog-*.jpg` ; `prose` : titres `display-sm` Fraunces, liens `leaf`. |
| FAQ | `faq/page.tsx` | Accordéon unique §6.14 par thème. |
| Légal (CGU, confidentialité, cookies, mentions) | `LegalPageLayout.tsx` | Colonne 720 px, `cream` léger, pas de dégradé ni couleurs par catégorie (cookies : pastilles neutres). |
| 404 | `not-found.tsx` | H1 `display-lg`, 2 liens. |

---

## 11. Plan d'implémentation (ordonné)

Chaque étape doit laisser `npm run build` vert. Les étapes 1 à 7 corrigent l'audit et sont indépendantes de la refonte visuelle ; les faire en premier.

### Étape 0 — Fondation *(faite sur cette branche)*
- `src/fonts/` : `fraunces-latin-opsz-normal.woff2`, `inter-latin-opsz-normal.woff2` + licences OFL.
- `src/app/fonts.ts` : `next/font/local` → `fontDisplay` / `fontSans` (variables `--font-display`, `--font-sans`).
- `src/app/[locale]/layout.tsx` : variables de police sur `<html>`.
- `src/app/globals.css` : suppression de l'`@import` Google Fonts ; CSS vars des tokens ; base typographique (H1/H2 en display 500) ; `scroll-padding-top` ; focus visible.
- `tailwind.config.ts` : tokens §2–5 (`colors`, `fontFamily`, `fontSize`, `boxShadow`, `maxWidth`). Les anciens alias (`primary`, `secondary`, `accent`, `gtc.*`, `dark`, `light`) sont **remappés** vers la nouvelle palette (ex. `primary` → `leaf`, `secondary` → `forest`) pour que les pages non encore refondues restent cohérentes ; ils sont à supprimer à l'étape 12.

### Étape 1 — Images locales uniquement (audit 1.1, 1.2, 1.5)
- `src/data/sectors.ts` : `medias-audiovisuel.image` → `/photos/case-media-tf1.jpg` ; `transport-logistique.image` et `agroalimentaire.image` → `null` (panneau d'identité, §7) **ou** nouvelle photo locale committée (`/photos/sector-transport.jpg`, `/photos/sector-agro.jpg`, licence libre, source notée dans `docs/`). Type `image: string | null`.
- Hotlinks restants à remplacer : `services/audit-inventaire` → `/photos/service-audit.jpg` ; `effacement-securise` → `/photos/service-effacement.jpg` ; `reconditionnement-valorisation` → `/photos/service-reconditionnement.jpg` ; `wakibox` → `/photos/service-wakibox.jpg` ; `cybersecurite` (2) → `/images/cybersecurity.jpg`, `/photos/server-technician.jpg` ; `recyclage-deee` (2) → `/images/recycling.jpg`, `/photos/hands-electronics.jpg` ; `services/page.tsx` (2) → `/photos/tech-datacenter.jpg`, `/photos/hp-atelier-itad.jpg` ; `blog/page.tsx` → `/photos/blog-economie-circulaire.jpg`.
- `next.config.js` : supprimer `images.remotePatterns` (Unsplash, pravatar). Vérifier `grep -rn "unsplash\|pravatar" src` = 0.

### Étape 2 — Accents & typos (audit 1.4, 2.1, 2.2)
- `src/app/[locale]/plateforme/layout.tsx` : accents dans `title`, `description`, `keywords`, `openGraph`, `twitter`, `platformeSchema.description` et `featureList` (« temps réel », « Traçabilité », « automatisés », « Intégration », « certifié »).
- `src/app/[locale]/services/layout.tsx` : même correction (« Découvrez », « certifié », « sécurisée », « traçabilité ») — trouvée en lisant le code, hors audit.
- `SectorDetailPage.tsx` ~l. 614 : « Collecte, inventaire automatisé et attestation inclus. Résiliable à tout moment. » ; ~l. 609 « 39 € HT/mois » ; ~l. 622 « Démarrer le pilote ».
- `tarifs/page.tsx` l. 879 : `Tarifs Waki Box, <br />` ; l. 1280 : `Premier mois offert, <br />puis 39 € HT/mois.` (le texte DOM contient l'espace, le `<br />` reste).

### Étape 3 — Chat : élément interactif imbriqué (audit 2.4)
- `SalesAssistantWidget.tsx` : la bulle devient `<div class="relative"><button>Besoin d'aide…</button><button aria-label="Fermer">×</button></div>` (frères). Puis refonte compacte §6.10.

### Étape 4 — Contrastes (audit 2.3)
- Onglets actifs : soulignement `leaf` + texte `ink` (plus de blanc sur vert).
- Numéros 01–06 Douleurs : `ondark-muted`. Tous `text-white/30|40|50|60`, `text-gray-400` sur sombre → `ondark-muted`. `text-gray-500` sur `cream` → `muted`.
- Boutons `bg-[#10B981]` → `bg-leaf`. Badges `text-[#6EE7B7]` → `leaf-300`.
- Vérification : axe-core (`playwright` est déjà en devDependency) sur `/fr`, `/fr/secteurs/medias-audiovisuel`, `/fr/plateforme`, `/fr/contact` → 0 violation `color-contrast`.

### Étape 5 — Bloc « Référence client » (audit 2.5)
- Nouveau `src/components/ClientReference.tsx` (§6.8) ; remplacer la section rose dans `SectorDetailPage.tsx` ; badge TF1 de `SectorCard` → tag `leaf-100 forest`.

### Étape 6 — Un seul sticky, chat et CTA mobile (audit 1.3, 3.1, 3.4)
- `src/app/[locale]/layout.tsx` : retirer `<TrustBar />` et `<StickyCTA />` ; `<main className="pt-16 lg:pt-[72px] pb-20 lg:pb-0">` ; ajouter `<MobileActionBar />`.
- `TrustBar.tsx` → `CertificationStrip.tsx` (statique, 2 variantes clair/sombre).
- `StickyCTA.tsx` → `MobileActionBar.tsx` (§6.11), conserve `pickContext`.
- `Header.tsx` : `data-hidden` piloté par un hook `useHeaderYield(sentinelRef)` (§6.2) ; supprimer la tagline.
- Nouveau `src/components/SectionNav.tsx` (§6.9) utilisé par `SectorDetailPage` (et `reglementation`) ; supprimer la nav d'ancres de l'accueil.
- `globals.css` : `scroll-padding-top`.

### Étape 7 — Bandeau de confiance (audit 2.6)
- Nouveau `src/components/TrustBand.tsx` (§6.7) ; `messages/{fr,en}.json` → `trustBand.clients` devient un tableau d'objets `{ name, metric, icon }` (contenu identique, structuré).

### Étape 8 — Primitives UI
`src/components/ui/` : `Button`, `SectionHeader`, `Card`, `Tag`, `Stat`, `Table`, `Accordion`, `Pictogram`. Refondre `CtaSection` (§6.12), `Footer` (§6.18), `CookieBanner`, `ExitPopup` (une fois par session, sobre), `Breadcrumbs`, `RelatedArticles`, `LegalPageLayout`, `motion.tsx` (§8). Supprimer `DecorativeBackdrop.tsx`.

### Étape 9 — Pages prioritaires (dans cet ordre)
Accueil → Secteurs listing → Page secteur → Plateforme → Tarifs → Contact (architecture §10.1–10.6). Pour chaque page : build + capture 390/1440 + axe.

### Étape 10 — Pages secondaires
Services (listing + template), Cas d'usage, Pourquoi GTC, Waki Box, Impact, Réglementation, Démo/Réserver, Blog, FAQ, pages info (processus, méthodologie, sécurité, parcours, écosystème, résultats, carrières), légal, 404 (§10.7).

### Étape 11 — Nettoyage
- Supprimer alias Tailwind legacy (`primary`, `secondary`, `accent`, `gtc`, `dark`, `light`), keyframes inutilisées (`pulse-*`, `shimmer`, `marquee`), champs `color`/`accent` de `sectors.ts`.
- `grep -rnE "#[0-9A-Fa-f]{6}" src --include=*.tsx` → 0 (hors `SchemaOrg`/SVG) ; `grep -rn "bg-gradient" src` → 0 ; `grep -rn "unsplash" src` → 0.
- `npm run build` + `npm run lint` verts ; `BUILD_MODE=mobile npm run build` (export Capacitor) vert.

### Critères de recette
1. Aucune image 404 (`/fr/secteurs`, `/fr/secteurs/medias-audiovisuel`) ; 2. mobile 390 px : aucun texte recouvert pendant le scroll, un seul élément fixe en haut et un seul en bas ; 3. `document.title` de `/fr/plateforme` accentué ; 4. zéro faute listée §Étape 2 dans le DOM ; 5. axe : 0 `color-contrast`, 0 `nested-interactive` ; 6. aucun `pink/rose/sky/blue` dans `src` ; 7. `#douleurs` et toutes les ancres existantes atterrissent sous la barre collée ; 8. `/en/*` identique en structure.

---

## 12. Do / Don't

| ✅ Faire | ❌ Ne pas faire |
|---|---|
| Un bouton primaire `leaf` par bloc, le reste en secondaire | Deux boutons pleins côte à côte, boutons blancs sur dégradé |
| H2 Fraunces 500 + eyebrow + chapô, aligné à gauche | H2 `font-black` centré avec icône dans un carré coloré |
| Sections alternées `paper / cream / night` | Dégradés vert→bleu, rose, blobs flous, grilles SVG |
| Cartes `border line`, hover = bordure plus foncée | `shadow-xl`, `hover:-translate-y-1`, `scale-105` |
| Pictos Lucide `forest` sur pastille `leaf-100` | Icônes multicolores par carte (`#0EA5E9`, `#F59E0B`, `#8B5CF6`) |
| Numéros « 01 » en `eyebrow` | Numéros fantômes géants à 4 % d'opacité |
| Grille 4×4 régulière pour les 16 secteurs | Mosaïque magazine à tailles variables |
| Tableau pour le ROI et les comparatifs | Barres de progression décoratives |
| Référence TF1 sur `forest`, picto `Tv` | Bloc rose + étoile + `Sparkles` |
| Header seul fixe ; onglets prennent le relais | Header + bandeau certifs + onglets empilés |
| Chat = bouton rond compact, panneau modal sur mobile | Bulle flottante + avatar + barre CTA se chevauchant |
| Images dans `/public`, `image: null` si absente | Hotlink Unsplash, photo « à peu près » |
| `ondark-muted` pour le texte secondaire sur sombre | `text-white/30`, `text-white/50` |
| Espaces `8, 16, 24, 32, 48, 64, 96` | `py-14`, `gap-5`, `p-7`, `h-[48px]` |
| « Résiliable à tout moment », « Premier mois offert, puis » | Accents manquants, virgule sans espace |

---

## 13. Guide pour les agents (prompt guide)

**Avant toute modification visuelle :**
1. Lire §1 (principes), §2.2 (rôles), §3.2 (échelle), §6 (le composant concerné) et §10 (la page concernée).
2. Utiliser uniquement les tokens (`bg-leaf`, `text-ink-700`, `text-display-md`, `border-line`…). **Jamais** de code hexadécimal ni de classe de couleur Tailwind par défaut (`emerald-*`, `gray-*`, `slate-*`) dans un `.tsx`.
3. Ne pas changer : URLs, ids d'ancres, `metadata`, clés `messages/*.json` (on peut restructurer une valeur si fr **et** en sont mis à jour ensemble), Schema.org.
4. Pour une page : suivre l'ordre de sections de §10 ; une page = un CTA de fin ; alternance de fonds §4.3.
5. Vérifier avant de livrer : `npm run build` ; capture 390 px et 1440 px ; aucun élément fixe en double ; contraste des nouvelles paires (§2.4) ; `grep -n "unsplash\|bg-gradient\|#10B981" <fichier>` vide.

**Formulation type d'une tâche d'itération :** « Sur `/fr/tarifs`, section `#pilote`, remplacer le fond `bg-[#10B981]` par `bg-leaf-100`, titre en `text-display-md text-forest`, bouton primaire `Button variant="primary" size="lg"`, conserver l'id et les textes. »

**Niveau de liberté :** l'agent ne choisit pas de nouvelles couleurs, polices, rayons ou ombres. S'il manque un token, il le propose ici (§2–5) avant de l'utiliser.
