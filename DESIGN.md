# GreenTechCycle — Système de design « Dark Tech » (v2)

Guide de référence pour toute modification visuelle du site (Next.js 14, Tailwind 3, next-intl fr/en, framer-motion 11).
À lire **avant** de toucher un composant ou une page. Les règles sont un contrat : chaque décision est encodée en tokens
(`tailwind.config.ts`, `src/app/globals.css`, `src/app/fonts.ts`).

Version : **2.0 — 2026-10-03** — branche `redesign-epure`. Remplace la v1 « Épuré » (palette crème/vert forêt, serif Fraunces) à la demande du client :
palette sombre imposée, rendu « tech, dans l'air du temps », site **dynamique et responsive comme Apple**, **aucune photo** pour l'instant
(visuels dessinés en code), emplacements prêts pour les photos et vidéos à venir.
Ce qui ne change pas par rapport à la v1 : l'architecture des pages (§10), les contenus, URLs, ancres, métadonnées SEO, i18n fr/en, et la règle « un seul élément collant ».

---

## 0. Direction en une phrase

> **Un produit tech sur fond quasi-noir : une seule couleur, l'émeraude, qui dessine le logo, les lignes et les données ; une typographie grotesque serrée ; des visuels construits en code (tableau de bord, cycle de vie animé, géométrie) à la place des photos ; et un mouvement au défilement fluide, progressif, qui ne cache jamais le contenu.**

Références vérifiées le 2026-10-03 (HTTP 200, captures dans `reports/screenshots/references/` du projet) — ce qu'on leur emprunte, rien d'autre :

| Référence | Ce qu'on reprend | Ce qu'on ne reprend pas |
|---|---|---|
| **Apple — MacBook Pro** (principale) https://www.apple.com/macbook-pro/ | Fond noir, produit en « héros » éclairé au centre, titre très grand et serré, sections à défilement scénarisé (visuel épinglé pendant que le texte avance), bandeau de nav fin et sombre | Le dégradé bleu dans le titre, la police SF Pro (propriétaire), le bouton bleu, la densité marketing produit |
| **Linear — accueil** (principale) https://linear.app/ | Fond `#08090A`-like identique au nôtre, **maquette d'interface produit en visuel de hero** (notre tableau de bord ITAD construit en code), hiérarchie titre → une ligne → produit, nav 6 entrées, cartes à bordure 1 px sans ombre | L'absence totale de couleur d'accent (nous avons l'émeraude), le logiciel comme sujet (nous vendons un service + une plateforme) |
| Resend — accueil https://resend.com/ | Le **halo lumineux** diffus sur fond noir (notre halo émeraude à 9 %), le bouton primaire clair sur sombre, le chip d'annonce arrondi au-dessus du titre | Le titre en serif (nous restons en grotesque), les traînées lumineuses blanches animées en continu |
| Raycast — accueil https://www.raycast.com/ | Nav flottante en pilule à bordure 1 px sur fond sombre, hero centré typographique, gris secondaire proche de `#8A8F98` | Le rouge de marque, le téléchargement comme CTA |
| Supabase — accueil https://supabase.com/ | **Bouton vert à texte sombre** (même logique de contraste que notre émeraude), vert utilisé pour un mot-clé du titre, grille de cartes-fonctionnalités à bordure fine avec visuel technique dessiné dans chaque carte | Le fond blanc du jour, la typographie Manrope en titres |
| Vercel — accueil https://vercel.com/ | La police **Geist** (OFL, auto-hébergée chez nous), le bandeau de logos monochromes, la retenue (une forme, un titre, deux boutons) | Le fond blanc, le noir et blanc intégral, le triangle |

---

## 1. Principes

1. **Une couleur, l'émeraude `#10B981`.** Elle dessine la boucle du logo, le mot « Cycle », les lignes, graphiques, liens, états actifs et le bouton primaire. Rien d'autre n'est coloré, sauf **un point ambre** `#F59E0B` quand il faut signaler un risque.
2. **Deux surfaces seulement** : fond `#08090B` et carte `#0F1115`. Le rythme vient de l'alternance fond/carte et des bordures `#2C2F36`, pas de dégradés multicolores.
3. **Texte sur sombre, toujours AA** : `#EDEDEF` (principal) et `#8A8F98` (secondaire) sur les deux surfaces ; texte **sombre** sur émeraude (jamais blanc sur émeraude : 2.2:1).
4. **Lumière, pas décoration** : un halo émeraude (9 %), une grille de points (4,5 %), un vignettage — réservés au hero et aux sections de conversion, jamais sur toute la page.
5. **Les visuels sont construits en code** (SVG/JSX) : tableau de bord, cycle collecte → effacement → reconditionnement → recyclage, géométrie sombre/émeraude. Aucune photo tant que le client n'a pas fourni les siennes ; chaque emplacement photo/vidéo est prévu et listé (§7.4).
6. **Mouvement progressif** : le contenu est lisible sans JavaScript et par les robots ; l'animation s'ajoute par-dessus (CSS scroll-driven d'abord, framer-motion pour le scénarisé), `transform`/`opacity` uniquement, `prefers-reduced-motion` respecté, 60 fps sur mobile.
7. **Un seul élément collant** en haut (header **ou** barre d'onglets) et un seul en bas sur mobile — inchangé depuis la v1.
8. **Responsive de 360 px aux très grands écrans** : typographie fluide, grilles 1 → 2 → 3/4, sections scénarisées qui se dépilent sous `lg`.

---

## 2. Palette & rôles

### 2.1 Tokens imposés (utilisés tels quels — `tailwind.config.ts` → `theme.extend.colors`, miroir CSS vars dans `globals.css`)

```ts
colors: {
  bg:      { DEFAULT: "#08090B", card: "#0F1115" }, // fond principal quasi-noir ; cartes, panneaux, cercles des piliers
  track:   { DEFAULT: "#2C2F36", strong: "#646973" }, // bordures, ligne de flux, pistes des jauges ; `strong` = bord d'input (dérivé, 3:1)
  bar:     "#363A42",                                  // barres inactives des graphiques
  fg:      { DEFAULT: "#EDEDEF", muted: "#8A8F98", strong: "#C2C6CC" }, // texte principal ; secondaire ; `strong` = corps long sur carte (dérivé)
  emerald: { DEFAULT: "#10B981", hover: "#34D399", dim: "rgba(16,185,129,0.12)", line: "rgba(16,185,129,0.35)" },
  amber:   { DEFAULT: "#F59E0B", dim: "rgba(245,158,11,0.12)" },
  danger:  "#F87171",                                  // erreurs de formulaire uniquement (7.2:1 sur bg)
}
```
Valeurs **imposées par le client** : `bg`, `bg-card`, `track`, `bar`, `fg`, `fg-muted`, `emerald`, `amber`. Valeurs **dérivées** (à ne pas multiplier) : `emerald-hover` (survol du bouton primaire), `emerald-dim`/`amber-dim` (teintes à 12 % pour tags et encarts), `emerald-line` (traits de graphiques, 35 %), `track-strong` (bord d'input, seul cas où une bordure doit atteindre 3:1), `fg-strong` (paragraphes longs sur carte), `danger`.

### 2.2 Rôles

| Rôle | Token | Exemples |
|---|---|---|
| Fond de page, header, barre mobile | `bg` | body, nav, footer |
| Carte, panneau, cellule, maquette UI, cercle de pilier | `bg-card` | cartes secteurs, plans tarifaires, tableau de bord dessiné |
| Section alternée | `bg-card` en pleine largeur **ou** `bg` + bordures `track` | une section sur deux ; jamais deux `bg-card` consécutives |
| Texte principal, titres, « GreenTech » | `fg` | H1–H4, corps court, valeurs de KPI |
| Texte secondaire : slogans, sous-titres, libellés de cartes, légendes | `fg-muted` | chapôs, descriptions, méta, eyebrow |
| Corps long (> 3 lignes) sur `bg-card` | `fg-strong` | fiches secteur, FAQ, légal |
| Action & données : bouton primaire (fond), liens, onglet actif, focus, lignes de graphiques, boucle du logo, mot « Cycle », URL | `emerald` | partout où il y a une interaction ou une donnée |
| Survol du bouton primaire | `emerald-hover` + lueur | — |
| Tag, encart léger, fond de pictogramme | `emerald-dim` fond + `emerald` texte/icône | labels « Prioritaire », certifications, pastilles |
| Bordures, séparateurs, lignes de flux, pistes de jauges | `track` | cartes, tableaux, timeline |
| Bord d'un champ de formulaire | `track-strong` → focus `emerald` | inputs, selects |
| Barres inactives, états désactivés | `bar` | graphiques, toggles off |
| Alerte (un seul point / une seule ligne par écran) | `amber` (texte/point) ; `amber-dim` fond | échéance CSRD, point sur le radar de risque, eyebrow « Le coût caché » |
| Texte sur bouton émeraude | `bg` (#08090B) | boutons primaires, tags pleins |

### 2.3 Interdits
- Blanc (`#FFFFFF`, `#EDEDEF`) sur émeraude ; toute autre couleur que l'émeraude et l'ambre (pas de bleu, violet, rose, cyan, orange) ; dégradés multicolores ; `text-white/30|50` (utiliser `fg-muted`) ; surfaces claires pleine page.
- L'ambre sur plus d'un élément par écran. Les anciens tokens v1 (`paper, cream, sand, ink, muted, line, forest, leaf, ochre, ondark`) sont **à migrer** (plan §11) puis supprimés.
- Le logo : `logo-mono-white.svg` sur fond sombre (loop émeraude si la variante existe : à produire par le client ; sinon monochrome blanc). Jamais `logo-horizontal.svg` (bleu/cyan) sur fond sombre.

### 2.4 Paires de contraste vérifiées (luminance relative, calcul du 2026-10-03)

| Texte | Fond | Ratio | Verdict |
|---|---|---|---|
| `fg` #EDEDEF | bg / bg-card | 17.0 / 16.2 | AA |
| `fg-muted` #8A8F98 | bg / bg-card | 6.1 / 5.8 | AA (corps de texte autorisé) |
| `fg-strong` #C2C6CC | bg / bg-card | 11.6 / 11.0 | AA |
| `emerald` #10B981 (texte, lien, icône) | bg / bg-card | 7.9 / 7.5 | AA |
| `bg` #08090B (texte de bouton) | emerald / emerald-hover | 7.9 / 10.4 | AA |
| `emerald` | emerald-dim (sur bg) | 6.8 | AA |
| `fg-muted` | emerald-dim | 4.6 | AA |
| `amber` #F59E0B | bg / amber-dim | 9.3 / 7.9 | AA |
| `danger` #F87171 | bg | 7.2 | AA |
| `track-strong` #646973 (bord d'input) | bg-card | ≥ 3.0 | UI (1.4.11) |
| `track` #2C2F36 | bg / bg-card | 1.5 / 1.4 | décoratif seulement (jamais seul pour délimiter un champ) |
| **Interdit** : `fg` sur emerald | — | 2.2 | FAIL |

---

## 3. Typographie

### 3.1 Choix : Geist + Geist Mono (Fraunces et Inter retirés)

| Rôle | Police | Fichier (`next/font/local`, sous-ensemble latin) | Axes | Licence |
|---|---|---|---|---|
| **Titres, corps, UI** | **Geist** (Vercel) | `src/fonts/geist-latin-wght-normal.woff2` (29 Ko) | `wght` 100–900 | OFL 1.1 (`src/fonts/LICENSE.Geist.txt`) |
| **Eyebrows, labels de données, unités, chips techniques, code** | **Geist Mono** | `src/fonts/geist-mono-latin-wght-normal.woff2` (23 Ko) | `wght` 100–900 | OFL 1.1 |

Pourquoi : le client veut « tech, dans l'air du temps » et une dynamique « comme Apple ». Apple compose tout en une seule grotesque (SF Pro, propriétaire) à graisse 600 et interlettrage serré ; Linear fait de même avec Inter. **Geist** est la grotesque géométrique la plus actuelle disponible en licence libre, dessinée pour les interfaces sombres (Vercel), avec des chiffres tabulaires et un mono assorti pour les données — ce qui colle au propos (traçabilité, certificats, chiffres). Le serif Fraunces donnait un ton éditorial « climat/ESG » incompatible avec la nouvelle palette ; il est retiré. Inter est retiré pour n'avoir qu'une famille (52 Ko au total). Variables CSS : `--font-sans` et `--font-display` pointent **toutes deux** sur Geist (les composants `font-display` existants basculent sans modification), `--font-mono` sur Geist Mono. Aucun CDN.

### 3.2 Échelle (`fontSize` Tailwind, inchangée en noms ; valeurs et graisses revues « Apple »)

| Token | Taille / interligne (360 px → ≥ lg) | Graisse, tracking | Usage |
|---|---|---|---|
| `display-xl` | 44/48 → 76/80 | 600, −0.035em | H1 accueil, chiffre-argument (« 78 % ») |
| `display-lg` | 36/40 → 56/60 | 600, −0.03em | H1 pages intérieures |
| `display-md` | 30/36 → 40/44 | 600, −0.025em | H2 de section |
| `display-sm` | 24/30 → 28/34 | 600, −0.02em | H2 compact, prix, citation |
| `heading-lg` | 20/28 | 600, −0.015em | H3 |
| `heading-md` | 17/24 | 600, −0.01em | H4, titre de carte |
| `body-lg` | 18/28 | 400 | chapô (`fg-muted`), max 65 ch |
| `body` | 16/24 | 400 | corps |
| `body-sm` | 14/20 | 400/500 | cartes, nav, boutons md, tableaux |
| `caption` | 13/16 | 400 | légendes, méta |
| `eyebrow` | 12/16 | **Geist Mono** 500, +0.08em, uppercase | sur-titres, labels de colonnes, chips techniques |
| `stat` | 44/44 → 72/72 | 600, −0.03em, `tabular-nums` | KPI, compteurs |

Règles : H1/H2 en Geist 600 (plus jamais de serif) ; emphase par la taille et par **un mot en `emerald`** dans le titre (« GreenTech**Cycle** », « 78 % »), pas par la graisse 800/900 ; `text-wrap: balance` sur les titres ; chiffres toujours `tabular-nums` ; eyebrow en mono avec un préfixe optionnel `// ` ou `01` (une seule convention par page) ; longueur de ligne 65 ch ; pas d'italique.

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

## 5. Formes : rayons, bordures, ombres, lumière

| Élément | Rayon | Bordure | Ombre / lumière |
|---|---|---|---|
| Bouton, input, chip | `rounded-lg` (8 px) ; bouton primaire du hero `rounded-full` (Apple/Resend) | `track` (secondaire) / `track-strong` (input) | primaire : `glow-emerald` au survol |
| Carte, panneau | `rounded-xl` (12 px) | 1 px `track` | aucune ; survol `border-track-strong` |
| Maquette UI, visuel, slot média, panneau chat | `rounded-2xl` (16 px) | 1 px `track` + liseré intérieur `emerald-line` optionnel | `shadow-float` (ombre noire portée, pas de couleur) |
| Pastille icône, avatar, point d'état | `rounded-full` | — | point d'état émeraude : `glow-dot` |
| Menu, popover, bulle | `rounded-xl` | 1 px `track` | `shadow-float` |

Tokens (`boxShadow`) : `float` = `0 16px 48px -16px rgba(0,0,0,.6), 0 2px 8px rgba(0,0,0,.4)` ; `glow-emerald` = `0 0 0 1px rgba(16,185,129,.4), 0 0 24px rgba(16,185,129,.35)` ; `glow-dot` = `0 0 12px rgba(16,185,129,.6)`.
Lumière : les éléments émeraude (lignes, points, boucle du logo) peuvent porter un flou de lueur **séparé** (pseudo-élément `::after` flouté à 8–16 px, opacité .35) qui les fait paraître légèrement plus clairs que `#10B981` à l'écran — c'est voulu. Budget : **3 éléments lumineux maximum par écran**, jamais sur du texte courant.
Focus clavier : `outline: 2px solid #10B981; outline-offset: 2px`.

### 5.1 Effets de fond (utilitaires dans `globals.css`)
- `.fx-halo` : `radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,.09), transparent 70%)` — hero, section CTA finale. Positionné `absolute inset-0`, `pointer-events-none`.
- `.fx-dots` : grille de points blancs `radial-gradient(rgba(255,255,255,.045) 1px, transparent 1px)` pas 24 px — hero, sections « plateforme », slots média vides.
- `.fx-vignette` : `radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)` — hero uniquement.
- Les trois sont des calques statiques (aucune animation continue) ; `background-attachment: fixed` est interdit (performance mobile). Une section « lumineuse » = `bg` + `.fx-halo` (+ `.fx-dots`) ; une section standard = `bg` ou `bg-card` sans effet.

---

## 6. Composants (adaptés au thème sombre — les specs structurelles v1 restent valables : un sticky, barre mobile unique, chat compact)

### 6.1 Header
`fixed top-0`, `h-16 lg:h-[72px]`, `bg-bg/80 backdrop-blur-md`, `border-b track` qui n'apparaît qu'après 8 px de défilement (classe `is-scrolled`). Logo `logo-mono-white.svg` h-7. Liens `body-sm fg-muted`, hover/actif `fg` + soulignement 2 px `emerald`. Bouton primaire md. Mobile : panneau `bg` plein écran. Comportement « un sticky » (sentinelle + `headerHidden`) inchangé.

### 6.2 Boutons (`ui/Button.tsx`)
| Variante | Fond / texte | Hover | Bordure |
|---|---|---|---|
| `primary` | `emerald` / **`bg`** (#08090B) 600 | `emerald-hover` + `glow-emerald` | — |
| `secondary` | `bg-card` / `fg` | `border-track-strong`, `bg-card` éclaircie de 4 % (`white/[.04]` overlay) | 1 px `track` |
| `ghost` | transparent / `emerald` | soulignement | — |
| `hero` | = primary en `rounded-full h-12 px-6` | idem | — |
Icône flèche 16 px à droite du primaire, translation 2 px. `min-height 44px`. Jamais de texte blanc sur émeraude.

### 6.3 Cartes (`ui/Card.tsx`)
`bg-card border track rounded-xl p-6` ; cliquable : `hover:border-track-strong`, titre → `emerald`, flèche +2 px. Variante `glass` (sur hero) : `bg-card/70 backdrop-blur` — max 2 par écran. Pastille icône : `h-10 w-10 rounded-full bg-emerald-dim text-emerald`, Lucide 20 px, `strokeWidth 1.75`.

### 6.4 En-tête de section (`ui/SectionHeader.tsx`)
`eyebrow` mono `fg-muted` (ou `amber` pour une section « risque ») → H2 `display-md fg` (un mot-clé `emerald` autorisé) → chapô `body-lg fg-muted`. Gauche par défaut ; centré pour hero/CTA.

### 6.5 Grille des secteurs
Inchangée structurellement (4 × 4, cartes à pictogramme, pas de photo). Carte : `bg-card`, numéro en eyebrow mono, pictogramme `emerald` sur `emerald-dim`, badge « Référence TF1 » `emerald-dim/emerald`. Survol : bordure `track-strong` + lueur `glow-dot` sur le pictogramme.

### 6.6 Bandeau de confiance (`TrustBand`)
Pictogrammes sectoriels `emerald` dans pastilles `emerald-dim`, nom `body-sm fg`, métrique `caption fg-muted`, cellules séparées par `border-l track`. Sur `bg`. Note NDA en `caption fg-muted`.

### 6.7 Référence client (`ClientReference`)
Section `bg-card` bordée `track`, pictogramme `Tv` émeraude, eyebrow mono « RÉFÉRENCE CLIENT · TF1 », citation `display-sm fg`, méta `caption fg-muted`. Pas de lueur.

### 6.8 Onglets / `SectionNav`
`sticky top-0 bg-bg/90 backdrop-blur border-b track`. Item `body-sm fg-muted`, actif `fg` + soulignement 2 px `emerald` + `glow-dot` discret. **Mobile : masque d'indice de défilement + `pr-12` + dernier onglet partiellement visible** (`.scroll-hint` existant, dont le masque disparaît en fin de liste) — corrige l'onglet coupé sans indice (QA). Le scroll-spy et le relais header ↔ onglets restent.

### 6.9 Chat (`SalesAssistantWidget`)
Bouton `h-12 w-12 rounded-full bg-emerald text-bg` + `glow-dot`. Panneau `bg-card border track rounded-2xl shadow-float`, en-tête `bg` avec point d'état émeraude. Mobile : dans la barre d'action, panneau en feuille plein écran. Bulle desktop une fois par session, deux boutons frères.

### 6.10 Barre d'action mobile (`MobileActionBar`)
`bg-bg/95 backdrop-blur border-t track`, bouton primaire `flex-1` + bouton chat. Même logique d'apparition (après le hero) et de retrait (cookies/popup ouverts).

### 6.11 Bannière cookies (`CookieBanner`) — correction QA
Ne couvre plus le bandeau de confiance : sur `sm+`, carte **compacte en bas à gauche** (`sm:left-4 sm:right-auto sm:max-w-[380px]`, `bg-card border track shadow-float`), hors de la colonne de lecture (le bandeau de confiance est centré sur 1200 px, la carte occupe < 400 px en bord d'écran) ; sur mobile, feuille pleine largeur qui **remplace** la barre d'action (déjà en place) et ne dépasse pas 60 vh. Apparition à 1,5 s, sans animation si mouvement réduit.

### 6.12 CTA de fin de page (`CtaSection`)
Section `bg` + `.fx-halo` + `.fx-dots`, centrée, H2 `display-md fg` avec un mot `emerald`, chapô `fg-muted`, boutons `hero` + `secondary`, réassurance `caption fg-muted`. Un seul par page.

### 6.13 Tableaux, accordéon, tags, formulaires, stat, footer
- Tableau : `border track rounded-xl`, en-tête `bg-card eyebrow mono fg-muted`, lignes `border-t track`, zebra `white/[.02]`, chiffres tabulaires `fg`, cellule-clé `emerald`.
- Accordéon : `divide-y track`, bouton `heading-md fg`, chevron `fg-muted`, contenu `fg-strong`.
- Tags : `h-7 px-3 rounded-full` ; neutre `bg-card border track fg-muted` ; marque `bg-emerald-dim text-emerald` ; alerte `bg-amber-dim text-amber` ; plein `bg-emerald text-bg`.
- Formulaires : label `body-sm fg`, input `h-11 bg-bg border track-strong rounded-lg fg`, placeholder `fg-muted`, focus `border-emerald ring-2 ring-emerald/25`, erreur `border-danger` + message `danger`. Bouton `primary lg`.
- Stat : valeur `stat fg` (ou `emerald` pour la valeur-clé), libellé `body-sm fg-muted`, unité en mono, séparateurs `border-l track`. Compteur animé (`CountUp`) conservé.
- Footer : `bg border-t track`, colonnes `eyebrow mono fg-muted`, liens `body-sm fg-muted` hover `fg`, ligne de certifications, newsletter `input` + `primary`.
- Notice CSRD (hero) : `bg-amber-dim text-amber caption` + `AlertTriangle` — c'est **le** point ambre de l'écran.

### 6.14 Nouveaux composants visuels (`src/components/visuals/`) — voir §7
`DashboardMock`, `LifecycleDiagram`, `GeometryField`, `CertificateCard`, `MediaSlot`, `VideoBackground`, `ScrollStory`.

---

## 7. Visuels : pas de photo, du code

### 7.1 Règle
**Aucune photographie n'est affichée tant que le client n'a pas fourni les siennes.** Les 69 références actuelles à `/photos/*` et `/images/*` sont remplacées par des visuels construits en JSX/SVG/CSS (vectoriels, responsives, thémables, animables, < 20 Ko chacun). Les fichiers photos peuvent rester dans `/public` mais ne sont plus référencés (sauf `og-image`, `favicon`, logos). Pas d'image de stock, pas d'illustration 3D, pas d'IA générative.

### 7.2 Jeu de visuels (tous `aria-hidden` avec un `<p class="sr-only">` descriptif, ou `role="img" aria-label`)
| Composant | Contenu | Animation (progressive, §8) | Où |
|---|---|---|---|
| `DashboardMock` | Tableau de bord ITAD : 4 tuiles KPI (actifs tracés, certificats émis, valeur récupérée, CO₂e évité), graphique « IT assets » en barres (`bar` inactives, `emerald` actives), radar de risque avec **un** point `amber`, ligne de flux de certificats, fil d'activité | Barres qui montent et compteurs à l'entrée ; 3 états (Inventaire → Effacement → Reporting) commutés par `ScrollStory` | Hero accueil (parallax lent), `/plateforme` (section épinglée), `/tarifs` plan recommandé (version compacte) |
| `LifecycleDiagram` | Boucle « Cycle » à 4 nœuds : Collecte → Effacement → Reconditionnement → Recyclage, trait émeraude, pictogrammes Lucide dans cercles `bg-card`, flux `track` en fond | Trait dessiné (`stroke-dashoffset`) lié au défilement ; nœud actif lumineux | `/services` (listing), `/processus-itad`, `/pourquoi-gtc`, hero des pages service (nœud concerné en surbrillance) |
| `GeometryField` | Grille isométrique `track`, anneaux concentriques, 2–3 segments émeraude, grille de points | Dérive très lente par parallax (≤ 40 px) ; rien en mouvement réduit | Hero des pages secteur (avec le pictogramme du secteur au centre), `/contact`, `/secteurs`, 404 |
| `CertificateCard` | Carte « Certificat d'effacement » : n° de série, méthode NIST 800-88, horodatage, empreinte (hash tronqué en mono), sceau émeraude | Apparition + sceau qui « s'imprime » (scale .9 → 1) | `/services/effacement-securise`, `/securite`, cas d'usage, section « preuves » accueil |
| `KpiTile` (sous-partie de `DashboardMock`) | Une tuile KPI autonome | Compteur | Bandeaux chiffres, fiches secteur (ROI) |

Grammaire commune : fond `bg-card`, bordures `track`, données `emerald`, inactif `bar`, texte `fg`/`fg-muted` en Geist, labels en Geist Mono, rayon 12/16 px, **un seul** point ambre. Les visuels se comportent comme des composants responsives (grille fluide, `viewBox` + `preserveAspectRatio`), pas comme des images.

### 7.3 Emplacements photo/vidéo (`MediaSlot`)
```tsx
<MediaSlot id="home-hero" ratio="4/5" fallback={<DashboardMock state="inventory" />} />
<MediaSlot id="plateforme-hero" ratio="16/10" src="/photos/…jpg" alt="…" />          // photo plus tard
<MediaSlot id="home-hero-video" ratio="16/9" video={{ src: "/video/…mp4", poster: "/photos/…jpg" }} /> // vidéo plus tard
```
- Cadre : `rounded-2xl border track bg-card overflow-hidden shadow-float` + `.fx-dots` en fond ; `aspect-ratio` fixe par slot ; `next/image` `fill` + `sizes` quand `src` est fourni ; `<video muted playsinline loop autoplay preload="metadata" poster>` quand `video` est fourni, **désactivé** (poster seul) si `prefers-reduced-motion` ou `navigator.connection.saveData`.
- Sans `src`/`video`, le slot affiche son `fallback` (visuel codé). **Jamais** un placeholder gris ou un texte « image à venir » visible.
- Registre : `src/content/media-slots.ts` liste `{ id, page, ratio, sujet recommandé, état }` — c'est la liste que le client remplira avec ses photos/vidéos. Ratios : hero split `4/5` ou `16/10`, bandeau `21/9`, carte `16/10`, portrait `1/1`.
- `VideoBackground` (phase vidéo, **non activée maintenant**) : calque `absolute inset-0 object-cover` sous le hero, voile `bg/60` + `.fx-vignette`, poster obligatoire, pas de son, pas de contrôle visible, chargé en `lazy` hors viewport, remplacé par le poster sous 768 px si `saveData`.

### 7.4 Pictogrammes & logo
Lucide uniquement, `strokeWidth 1.75`, `emerald` sur `emerald-dim` (20 px / pastille 40 px ; 24 px / 48 px). Logo monochrome blanc sur fond sombre ; la boucle du logo en émeraude est à produire par le client (SVG) — en attendant `logo-mono-white.svg`.

---

## 8. Mouvement « comme Apple » : système

### 8.1 Principes non négociables
1. **Lisible sans JavaScript et pour les robots** : aucun contenu essentiel en `opacity: 0` dans le HTML servi. Les animations d'entrée sont **CSS scroll-driven** (`animation-timeline: view()`) encapsulées dans `@supports` : sans support (ou sans JS, ou robot) le contenu est simplement affiché. Interdit : `initial={{ opacity: 0 }}` de framer-motion sur du texte, des titres, des listes, des CTA. Le `FadeIn` v1 est remplacé par la classe `.reveal` (§8.3).
2. **`transform` et `opacity` uniquement** (compositor). Jamais d'animation de `top/left/width/height/filter` sur du contenu ; `filter: blur` seulement sur les lueurs statiques.
3. **`prefers-reduced-motion: reduce`** : tout est désactivé (reveal, parallax, scénarisation, compteurs → valeur finale, vidéos → poster). Règle globale dans `globals.css` + `useReducedMotion()` dans les composants framer.
4. **60 fps mobile** : ≤ 3 lueurs et ≤ 2 `backdrop-blur` par écran, `will-change: transform` seulement sur le visuel épinglé pendant qu'il est épinglé, `content-visibility: auto` sur les sections sous la ligne de flottaison, test Chrome DevTools CPU × 4 sur `/fr`, `/fr/plateforme`, `/fr/secteurs/medias-audiovisuel`.
5. **Pas de nouvelle dépendance** : CSS natif + `framer-motion` 11 déjà présent (`useScroll`, `useTransform`, `useSpring`, `useInView`). Pas de GSAP (licence/poids), pas de Lenis (défilement « lissé » perturbe l'accessibilité et les ancres).

### 8.2 Répartition
| Besoin | Technique | JS requis ? |
|---|---|---|
| Révélation à l'entrée (fondu + 16 px) | CSS `.reveal` (`animation-timeline: view(); animation-range: entry 0% entry 40%`) | non |
| Décalage en cascade | `.reveal` + `--reveal-i` (délai = `animation-range` décalée de 6 % par item) | non |
| Parallax lent/rapide d'un visuel | CSS `.parallax-slow` / `.parallax-fast` (`translateY(±40px)` sur `animation-range: cover`) | non |
| Trait de `LifecycleDiagram` dessiné au défilement | CSS `stroke-dashoffset` sur `animation-timeline: view()` | non |
| Section scénarisée (visuel épinglé, 3 étapes) | `ScrollStory` : conteneur `h-[300vh]`, colonne visuel `sticky top-[88px]`, `useScroll({ target })` + `useTransform` → état courant ; crossfade `opacity` entre états | oui (sans JS : les 3 étapes sont empilées et lisibles) |
| Compteurs KPI | `CountUp` existant (`useInView`) | oui (sans JS : valeur finale rendue côté serveur) |
| Transition de visuel produit (Inventaire → Effacement → Reporting) | framer `AnimatePresence` sur `DashboardMock state` | oui |
| Header : bordure/flou après 8 px, relais onglets | `scroll` passif + classe | oui |
| Lueurs | CSS statique (pseudo-élément) | non |

### 8.3 Classes CSS (dans `globals.css`, encapsulées dans `@supports (animation-timeline: view())` et neutralisées par `prefers-reduced-motion`)
```css
.reveal        { animation: reveal-up linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; }
.reveal-scale  { animation: reveal-scale linear both; animation-timeline: view(); animation-range: entry 0% entry 50%; }
.parallax-slow { animation: parallax-slow linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
.parallax-fast { animation: parallax-fast linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
.reveal[style*="--reveal-i"] { animation-range: calc(entry 0% + var(--reveal-i) * 6%) calc(entry 40% + var(--reveal-i) * 6%); }
@keyframes reveal-up    { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes reveal-scale { from { opacity: 0; transform: scale(.96); }     to { opacity: 1; transform: none; } }
@keyframes parallax-slow { from { transform: translateY(40px); }  to { transform: translateY(-40px); } }
@keyframes parallax-fast { from { transform: translateY(80px); }  to { transform: translateY(-80px); } }
```
Comportement : un élément déjà entièrement visible au chargement (ou dans le viewport haut d'un robot) est au-delà de sa plage `entry` → affiché à l'état final ; sans support → aucune règle appliquée → affiché.

### 8.4 Courbes et durées (transitions d'état, pas scroll-linked)
`--ease-out: cubic-bezier(.22,1,.36,1)` ; hover 150 ms ; apparition/crossfade 400–600 ms ; header 200 ms ; compteur 1,6 s. Les animations liées au défilement n'ont pas de durée (progression = scroll). Aucune animation infinie (pas de pulse, ping, marquee, shimmer).

### 8.5 Scénarisation (« scroll-telling ») — où
- Accueil : **Solution** (`#solution`) → `ScrollStory` 3 étapes : « Inventorier » / « Effacer & certifier » / « Valoriser & reporter », visuel `DashboardMock` qui change d'état.
- Plateforme : **Parcours 5 chapitres** (`#parcours`) → `ScrollStory` 5 étapes (ids `#modules`, `#governance`, `#mobile` posés sur les étapes correspondantes).
- Services : `LifecycleDiagram` dessiné au défilement, chaque service allume son nœud.
- Sous `lg` : `ScrollStory` se dépile (texte + visuel par étape, visuel non épinglé) ; sous 360 px rien ne déborde (`min-w-0`, `overflow-x-clip` sur `main`).

---

## 9. Responsive (360 px → ≥ 1920 px)
- Mobile-first ; breakpoints Tailwind ; conteneur `max-w-[1200px]`, au-delà de 1600 px les heros gardent 1200 px de contenu mais les effets de fond (`.fx-*`) occupent toute la largeur.
- Typographie fluide via `clamp()` (tokens §3.2) ; H1 `max-w-[18ch]`, paragraphes `max-w-[65ch]`.
- Grilles 1 → 2 (`sm`) → 3/4 (`lg`) ; `ScrollStory` épinglé uniquement `lg+` ; visuels `DashboardMock`/`LifecycleDiagram` en `viewBox` fluide (hauteur mini 240 px mobile).
- Barres horizontales (onglets, tableaux) : masque d'indice + dernier item partiellement visible.
- Cibles tactiles ≥ 44 px ; barre mobile 64 px + `safe-area` ; un sticky en haut, un en bas.
- Test obligatoire à 360, 390, 768, 1024, 1440, 1920 px, Chrome + Safari iOS.

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

## 11. Plan d'implémentation v2 (ordonné) — migration « Épuré » → « Dark Tech »

Chaque étape laisse `npm run build` vert. Les étapes 1–3 rendent le site sombre et cohérent ; 4–6 apportent les visuels et le mouvement ; 7–8 finissent.

### Étape 0 — Fondation *(faite sur cette branche)*
- `src/fonts/` : Geist + Geist Mono (latin, variables, OFL) ; Fraunces et Inter supprimés. `src/app/fonts.ts` : `fontSans`/`fontDisplay` = Geist, `fontMono` = Geist Mono.
- `tailwind.config.ts` : tokens v2 (`bg`, `track`, `bar`, `fg`, `emerald`, `amber`, `danger`), `fontFamily.mono`, `boxShadow` (`float`, `glow-emerald`, `glow-dot`), échelle `fontSize` revue (graisses 600, tracking serré). Tokens v1 conservés **temporairement** pour que les pages non migrées compilent.
- `globals.css` : CSS vars v2, H1/H2 Geist 600, utilitaires `.fx-halo/.fx-dots/.fx-vignette`, `.glow`, classes `.reveal*/.parallax-*` scroll-driven (désactivées sous `prefers-reduced-motion`). Le fond/texte sombres du `body` sont prêts sous `html.dark` et **s'activent à l'étape 2** (`class="dark"` sur `<html>`) pour que les pages v1 restent lisibles entre-temps.

### Étape 1 — Primitives UI en sombre
`ui/Button` (texte `bg` sur émeraude, variante `hero`), `ui/Card`, `ui/Tag`, `ui/SectionHeader` (eyebrow mono), `ui/Stat`, `ui/Table`, `ui/Accordion`, `ui/Pictogram`, `ui/Section` (fonds `bg`/`bg-card`, option `glow`). Remplacer `FadeIn/StaggerContainer/StaggerItem` par `.reveal` (garder `CountUp`) ; `motion.tsx` ne garde que `CountUp` et les helpers de `ScrollStory`.

### Étape 2 — Chrome du site
`Header`, `SectionNav` (vérifier le masque d'indice mobile — QA), `MobileActionBar`, `SalesAssistantWidget`, `CookieBanner` (carte compacte bas-gauche — QA), `ExitPopup`, `Footer`, `CertificationStrip`, `TrustBand`, `ClientReference`, `CtaSection`, `Breadcrumbs`, `LegalPageLayout`, `RelatedArticles`. `<html>` reçoit `class="dark"` + `color-scheme: dark` (formulaires natifs, barres de défilement).

### Étape 3 — Migration des tokens page par page
Mapping mécanique puis relecture : `bg-paper→bg-bg`, `bg-cream|bg-sand→bg-bg-card`, `text-ink→text-fg`, `text-ink-700→text-fg-strong`, `text-muted→text-fg-muted`, `border-line→border-track`, `bg-forest|bg-forest-900→bg-bg-card` (+ `.fx-halo` si c'était un hero/CTA), `text-forest→text-fg` (titres) ou `text-emerald` (valeurs-clés), `text-ondark→text-fg`, `text-ondark-muted→text-fg-muted`, `bg-leaf→bg-emerald` **avec texte `text-bg`**, `text-leaf|text-leaf-300→text-emerald`, `bg-leaf-100→bg-emerald-dim`, `text-ochre→text-amber`, `bg-ochre-100→bg-amber-dim`, `text-ochre-800→text-amber`, `shadow-card|shadow-pop→shadow-float`. Ordre : accueil → secteurs → fiche secteur → plateforme → tarifs → contact → services → cas d'usage → reste (§10 inchangé). Puis supprimer les tokens v1 de `tailwind.config.ts`/`globals.css` ; `grep -rn "paper\|cream\|ink\|forest\|leaf\|ochre\|ondark" src` → 0.

### Étape 4 — Visuels en code (`src/components/visuals/`)
`DashboardMock` (3 états), `KpiTile`, `LifecycleDiagram`, `GeometryField`, `CertificateCard`, `MediaSlot`, `VideoBackground` (inactif), registre `src/content/media-slots.ts`. Remplacer **toutes** les `<Image src="/photos|/images…">` par un `MediaSlot` avec `fallback` (69 occurrences ; `/fr/plateforme` ligne 101 `hp-dsi-strategy.jpg` incluse — QA). `og-image`, favicon et logos restent. `grep -rn "/photos/\|/images/" src` → uniquement `media-slots.ts` (sujets recommandés) et métadonnées OG.

### Étape 5 — Mouvement
Appliquer `.reveal` (titres, cartes, listes : par groupe, `--reveal-i` ≤ 6), `.reveal-scale` (visuels), `.parallax-slow` (visuel de hero). `ScrollStory` sur accueil `#solution` et plateforme `#parcours` (ids `#modules/#governance/#mobile` conservés sur les étapes). `LifecycleDiagram` dessiné au défilement sur services. Header `is-scrolled`. Vérifier : HTML servi sans `opacity:0` (`curl /fr | grep -c "opacity:0"` → 0), Lighthouse « content visible » avec JS désactivé, `prefers-reduced-motion` émulé → zéro animation, DevTools Performance CPU × 4 → pas de frame > 16 ms soutenue sur `/fr`.

### Étape 6 — Logo & détails
`logo-mono-white.svg` partout sur sombre ; demander au client la variante « boucle émeraude » ; `::selection` émeraude/bg ; `color-scheme: dark` ; scrollbars natives sombres.

### Étape 7 — QA
Captures 360/390/768/1024/1440/1920 sur les 6 pages prioritaires ; axe-core : 0 `color-contrast`, 0 `nested-interactive` ; onglets secteur mobile avec indice visible ; bannière cookies hors du bandeau de confiance ; aucune photo affichée ; ancres `#douleurs` etc. sous la barre collée ; `/en/*` identique ; `npm run build`, `BUILD_MODE=mobile npm run build`.

### Étape 8 — Phase vidéo (plus tard, sur demande)
Activer `VideoBackground` sur le hero accueil et `MediaSlot video` sur plateforme/services avec les fichiers du client (MP4 H.264 + WebM, ≤ 4 Mo, poster JPEG, 1920 × 1080, 6–12 s en boucle, sans son).

### Critères de recette v2
1. Palette : seules les 8 valeurs imposées + dérivés §2.1 dans `src` (grep hex → 0 hors tokens) ; 2. aucune `<img>`/`next/image` photographique rendue (hors OG/logos) ; 3. HTML servi lisible sans JS (texte visible, pas d'`opacity:0` initial) ; 4. `prefers-reduced-motion` → aucune animation ; 5. 60 fps CPU × 4 sur les 3 pages test ; 6. responsive 360 → 1920 sans débordement horizontal ; 7. axe 0 contraste ; 8. cookies/onglets/plateforme QA corrigés ; 9. URLs, ancres, métadonnées, i18n inchangés (diff `messages/*.json` = 0 hors restructuration déjà faite).

---

## 12. Do / Don't

| ✅ Faire | ❌ Ne pas faire |
|---|---|
| Émeraude pour l'action et la donnée, texte sombre dessus | Blanc sur émeraude ; émeraude en fond de section |
| Deux surfaces `bg` / `bg-card`, bordures `track` | Dégradés multicolores, surfaces claires, ombres colorées |
| Un point ambre par écran | Ambre en eyebrow + badge + icône sur la même vue |
| Geist 600 serré pour les titres, un mot en émeraude | Serif, graisse 900, titre entièrement coloré |
| Visuel codé (`DashboardMock`, `LifecycleDiagram`) dans un `MediaSlot` | Photo de stock, placeholder gris, « image à venir » |
| `.reveal` CSS, contenu visible sans JS | `initial={{opacity:0}}` sur du texte ; animation infinie |
| Halo + points + vignettage dans le hero seulement | Effets de fond sur toute la page, `background-attachment: fixed` |
| 3 lueurs max par écran, sur des traits/points | Lueur sur du texte courant, `blur` animé |
| Section scénarisée épinglée `lg+`, dépilée en dessous | Pin sur mobile, `h-[300vh]` sans fallback |
| Bannière cookies compacte en bas à gauche | Bannière centrée large qui couvre le bandeau de confiance |
| Onglets mobiles avec masque d'indice + item coupé volontairement | Onglets coupés net au bord |

---

## 13. Guide pour les agents

**Avant toute modification :** lire §1, §2.2, §3.2, §6 (composant concerné), §7 (visuels/slots), §8 (mouvement), §10 (page concernée).
**Règles d'écriture :** tokens v2 uniquement (`bg-bg-card`, `text-fg-muted`, `border-track`, `text-emerald`…) ; jamais de hex ni de `gray-*/slate-*/emerald-*` Tailwind par défaut ; une photo = `MediaSlot` avec `fallback` ; une animation = `.reveal`/`ScrollStory`, jamais d'`opacity:0` initial sur du contenu ; contenu, URLs, ancres, `metadata`, clés `messages/*.json` inchangés.
**Avant de livrer :** `npm run build` ; capture 360 et 1440 ; `prefers-reduced-motion` émulé ; contraste des nouvelles paires (§2.4) ; `grep -n "photos/\|opacity:0\|#10B981\|text-white" <fichier>` propre.
**Formulation type :** « Sur `/fr/plateforme`, section `#parcours`, remplacer l'`Image` par `<MediaSlot id="plateforme-parcours" ratio="16/10" fallback={<DashboardMock state="erasure" />} />`, envelopper les 5 chapitres dans `ScrollStory`, conserver les ids et les textes. »
**Liberté :** aucune nouvelle couleur, police, rayon, ombre ou effet. Un token manquant se propose ici (§2–5) avant usage.
