# GreenTechCycle — Rapport de Refonte Éditoriale : /cas-usages

**Date :** 25 avril 2026
**Commit :** ea946ce
**Branch :** main
**URL prod :** https://greentechcycle-website.vercel.app/fr/cas-usages
**Push GitHub :** ✓ (déclenche auto-deploy Vercel)
**Build Next.js :** ✓ (0 warnings, 0 errors)
**Lignes JSX :** 1 408

---

## 1. Diagnostic de l'ancienne version

La version précédente de `/cas-usages` (commit 99c7486) souffrait de plusieurs problèmes structurels qui en faisaient une page "catalogue" plutôt qu'une page "magazine" :

### 1.1 Problèmes identifiés

**Hero en grille sectorielle rejetée par le user**
L'ancienne version présentait les 8 secteurs sous forme de grille mathématique 4×2 en hero. Ce choix — bien que fonctionnel — produisait une lecture "admin", sans aspérité visuelle, sans hiérarchie éditoriale. Le user a explicitement rejeté cette approche : *"il ne veut PAS de grille — il veut du visuel storytelling, éditorial, qualité magazine"*.

**Absence de storytelling vertical**
Chaque cas était présenté de façon équivalente, sans mise en scène, sans respiration. La page manquait de tension narrative — pas de featured case, pas de montée en puissance, pas de conclusion impactante.

**Typographie trop sage**
Les titres de cas n'excédaient pas text-3xl. Aucun élément n'utilisait la puissance de la grande typographie éditoriale (chiffres en text-8xl/9xl, watermarks, contrastes extremes de poids) qui caractérise les sites de référence (Stripe, Linear, Vercel, Apple Business).

**Sections trop homogènes**
Fond #F8FAFC constant sur toute la page — zéro contraste éditorial, zéro section sombre pour créer de la drama visuelle et briser la monotonie.

**Textes bullets vs prose éditoriale**
Chaque cas utilisait des listes à puces pour le contexte et la solution. Cela convient à un document technique mais casse le registre premium attendu pour une cible DSI/RSSI/RSE/DAF de grands comptes.

**Tableau comparatif "Excel"**
La section comparative était un tableau HTML classique — heavy visuellement, peu scalable sur mobile, lecture froide.

---

## 2. Partis-pris éditoriaux — 3 décisions clés

### Parti-pris 1 : Hero narratif mono-cas plutôt que panorama sectoriel

**Décision :** Sacrifier la couverture immédiate des 8 secteurs au profit d'une seule scène visuelle premium en hero.

**Raisonnement :** Un DSI ou RSSI qui arrive sur cette page n'a pas besoin de voir les 8 cas d'un coup — il a besoin d'être *convaincu* en 3 secondes que GreenTechCycle est dans son registre. Un grand titre éditorial choc comme *"12 000 postes. 4 ans. 1 850 tonnes de CO₂ évitées."* crée cette conviction instantanément, bien mieux qu'une grille.

**Implémentation :**
- Full-viewport fond `#0F172A` avec radial gradients verts et bleus
- Split asymétrique 55%/45% : argument à gauche, photo banque à droite
- Titre H1 en `clamp(2.2rem, 5.5vw, 4.75rem)` avec `font-black`, `line-height: 1.02`
- Floating testimonial card en bas de la photo avec la citation de Marc B.
- 3 proof figures inline (1 850 tCO2e / 638 k€ / 4 jours) avec couleurs distinctes
- Anchor scroll discret vers `#cas-banque-cac40`

### Parti-pris 2 : 8 sections pleine largeur alternées avec ghost watermark

**Décision :** Chaque cas devient une *section indépendante à part entière*, pleine largeur, avec sa propre atmosphère visuelle.

**Raisonnement :** Les grandes pages éditoriales de référence (Stripe cases, Linear changelog, Vercel blog) utilisent des sections qui "possèdent" leur espace. Cela crée une progression naturelle dans la page et force l'utilisateur à s'arrêter sur chaque cas plutôt qu'à scroller rapidement.

**Implémentation :**
- `min-h-[85vh]` par section, photo pleine hauteur à gauche ou droite
- Alternance fond : blanc (indices pairs) / `#F8FAFC` (indices impairs) / `#0F172A` (indices 2 et 6)
- Ghost case number watermark en `clamp(8rem, 22vw, 18rem)` qui "saigne" hors du fond de photo — effet editorial premium
- Barre accent verticale de 3px sur le bord gauche du panneau de contenu, colorée en `badgeColor` du cas
- Numéro de cas en `text-5xl/6xl font-black` en couleur accent, avec ligne de séparation
- Prose éditoriale 3-4 phrases (pas de bullets) avec `leading-[1.78]`
- 3 KPIs en `text-2xl/3xl font-black` avec label sobre dessous
- Blockquote en italic avec barre gauche colorée semi-transparente

### Parti-pris 3 : Visualisation comparative à barres plutôt que tableau

**Décision :** Remplacer le tableau HTML par une double colonne : barres de progression horizontales (taux récupération) + liste-cartes cliquables (valeur / CO₂).

**Raisonnement :** Un tableau à 6 colonnes et 8 lignes est difficile à lire sur mobile, visuellement lourd, et ne crée aucune émotion. Les barres de progression colorées sont plus rapides à lire, plus visuelles, et permettent une comparaison intuitive par couleur par cas.

**Implémentation :**
- Colonne gauche : `ComparativeBar` — composant intra-page avec barre CSS (width = `${pct}%`, backgroundColor = accentColor)
- Colonne droite : liste de "cards" cliquables avec href vers `#cas-{slug}` et les 2 chiffres clés (valeur + tCO2e)
- Section basse : grille 4×2 de compliance cards avec conformités réglementaires par cas
- Tous les éléments sont color-coded per case avec les 3 couleurs de palette

---

## 3. Structure de page — 15 sections (tel que spec)

| # | Section | Fond | Particularité |
|---|---------|------|---------------|
| 0 | Urgency band | `#0F172A` | 38k certs / 6200 tCO2e / 72h |
| 1 | Hero éditorial featured | `#0F172A` | Split 55/45, photo banque, floating card |
| 2 | Bandeau chiffres XXL | `#0F172A` | 4 CountUp animés |
| 2b | 3 différenciateurs | `#F8FAFC` | Sécurité / ROI / Impact |
| 3 | Introduction éditoriale | blanc | max-w-3xl + anchor nav |
| 3b | Partenaires certifications | blanc | Bandeau discret |
| 4→11 | 8 cas sectoriels | alternés | Pleine largeur, ghost watermark |
| 12 | Section comparative visuelle | blanc | Barres + cards + compliance |
| 12b | Témoignages 4 personas | `#0F172A` | Grid dark |
| 12c | FAQ DSI/RSSI | blanc | 6 questions 2 colonnes |
| 13 | Conversion form | `#10B981` | 3 champs + état success |
| 14 | Citation finale magazine | blanc | Ghost quote 32rem + centered |
| 15 | CTA final double | `#0F172A` | Photo overlay + process 4 steps + trust |

---

## 4. Détails techniques

### 4.1 Architecture du fichier

```
src/app/[locale]/cas-usages/page.tsx  — 1 408 lignes
├── Types (CaseItem, KPIItem, MatrixRow)
├── CASE_ICONS[] — 8 icônes Lucide sectorielles
├── getCaseLayout() — pure function, layout per index
├── CaseSection() — composant intra-page réutilisé 8×
├── ComparativeBar() — composant intra-page pour barres
└── CasUsagesPage() — composant principal export default
```

### 4.2 Gestion i18n

Namespace : `casUsages` (existant, enrichi)

Nouvelles clés ajoutées en FR et EN :
- `editorialHero` — headline, subtitle, scrollCta, cta1/2, featuredLabel/Meta
- `editorialIntro` — headline, text, cta
- `editorialBodies` — 8 paragraphes prose par slug (banque-cac40, chu-sante, etc.)
- `editorialFinalQuote` — text, name, role, consentNote

Clés réutilisées (existantes, aucune modification) :
- `cases.items` — 8 cas avec slug, photo, metrics, quote, badgeColor
- `kpis.items` — 4 KPIs pour bandeau chiffres
- `matrix.rows` — données comparative (8 lignes × 6 colonnes)
- `testimonials.items` — 4 témoignages personas
- `faq.items` — 6 questions FAQ
- `partners.items` — partenaires/intégrations
- `conversion.*` — formulaire conversion
- `finalCta.*` — CTA final + trustBadges

### 4.3 Photos utilisées

| Section | Fichier |
|---------|---------|
| Hero | `/photos/case-banque.jpg` |
| Cas 01 Banque | `/photos/case-banque.jpg` |
| Cas 02 CHU | `/photos/case-hopital.jpg` |
| Cas 03 Industrie | `/photos/case-industrie.jpg` |
| Cas 04 Mairie | `/photos/case-administration.jpg` |
| Cas 05 Retail | `/photos/case-retail.jpg` |
| Cas 06 Énergie | `/photos/case-energie.jpg` |
| Cas 07 Telco | `/photos/case-telco.jpg` |
| Cas 08 Université | `/photos/case-universite.jpg` |
| CTA final | `/photos/hp-atelier-itad.jpg` |

### 4.4 Motion & animations

- `FadeIn` — révélation de chaque panneau éditorial (direction up/left/right selon contexte)
- `StaggerContainer` + `StaggerItem` — grilles de cartes (stats, témoignages, FAQ)
- `CountUp` — bandeau chiffres : 4 animations déclenchées au scroll
  - Gestion cas `>= 1M€` : `end={kpi.value / 1000000}`, `decimals={1}`, `suffix=" M€"`
- `ScaleIn` — utilisé dans les sections import (via motion.tsx, disponible si besoin)

### 4.5 Responsive

| Breakpoint | Hero | Cas sections | Comparative |
|-----------|------|-------------|-------------|
| Mobile | Stacked full width | Stacked (photo top, content bottom) | Single column |
| md (768px) | Stacked avec padding | Stacked optimisé | 2 colonnes |
| lg (1024px) | Split 55/45 | Split 48/flex-1 | 2 colonnes full |

---

## 5. Build & déploiement

### 5.1 Résultat build Next.js 14.2.21

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (85/85)

/[locale]/cas-usages    8.43 kB    168 kB First Load JS
├── /fr/cas-usages
└── /en/cas-usages
```

**Zéro erreur TypeScript. Zéro warning.**

### 5.2 Git

```
Commit : ea946ce
Message : refonte editoriale cas-usages: hero featured + 8 cas magazine + alternance sombre/clair
Branch  : main
Push    : ✓ → github.com/Mahdi12900/greentechcycle-website
```

Files modifiés :
- `src/app/[locale]/cas-usages/page.tsx` — réécriture complète (1 408 lignes)
- `messages/fr.json` — +140 lignes (nouveaux keys éditoriaux)
- `messages/en.json` — +140 lignes (miroir EN)

### 5.3 Vercel

Auto-deploy déclenché par le push GitHub (webhook Vercel → build triggered).

```
curl -sI https://greentechcycle-website.vercel.app/fr/cas-usages
HTTP/2 200 ✓
```

---

## 6. Checklist des critères de succès

| Critère | Statut |
|---------|--------|
| Fichier ≥ 1400 lignes JSX | ✓ 1 408 lignes |
| Hero featured (pas de grille) | ✓ Split 55/45 Banque CAC40 |
| 8 cas pleine largeur alternés | ✓ Fond blanc / gris / sombre alternés |
| Sections asymétriques (photo left/right) | ✓ Index pair = photo gauche |
| Certains cas fond sombre | ✓ Index 2 (Industrie) et index 6 (Telco) |
| Bandeau chiffres XXL fond sombre | ✓ CountUp 4 KPIs |
| Section comparative visuelle (pas tableau) | ✓ Barres + cards |
| CTA conversion vert pleine largeur | ✓ Fond `#10B981`, formulaire 3 champs |
| Citation finale magazine | ✓ Ghost quote 32rem, typo 3xl |
| CTA final double + trust badges | ✓ Fond `#0F172A` + 4 badges |
| Build PASS | ✓ 0 erreurs |
| Push réussi | ✓ ea946ce → main |
| Rapport sans tokens | ✓ Aucun token en clair |
| Mobile responsive | ✓ Toutes sections Tailwind responsive |
| Ancrages id="cas-{slug}" | ✓ Sur chaque section de cas |
| next-intl namespace casUsages | ✓ FR + EN enrichis |
| Framer-motion via @/components/motion | ✓ FadeIn, StaggerContainer, CountUp |
| next/image priority hero | ✓ `priority` sur hero photo |

---

## 7. Décisions de composition organique (au-delà du cahier des charges)

### Ghost watermark numérique
Le numéro de cas (01 à 08) est rendu en typographie géante (`clamp(8rem, 22vw, 18rem)`) en blanc semi-transparent (opacity 4%) qui "saigne" hors du bas de la photo. Cet effet — emprunté aux magazines typographiques haut de gamme — crée une continuité visuelle entre le panneau photo et le panneau texte sans être explicite.

### Barre accent verticale par cas
Chaque panneau de contenu de cas possède une barre de 3px sur son bord gauche, colorée avec le `badgeColor` du cas (bleu, vert ou ambre). Cet élément discret crée une signature visuelle immédiate : le DSI peut identifier le secteur à la couleur avant même de lire le titre.

### Prose éditoriale contextuelle (editorialBodies)
Chaque cas dispose d'un paragraphe de 3-4 phrases rédigé dans un registre narratif — ni descriptif ("GTC a fait X, Y, Z") ni bullets ("• 4 200 postes"). Le texte pose le *contexte* (la pression réglementaire, la contrainte humaine) avant de mentionner les résultats. Ce choix crée de l'empathie avec le lecteur cible (DSI/RSSI qui se reconnaît dans la situation décrite) avant de prouver la valeur.

### Comparative avec ancres cliquables
Les cards de la section comparative sont `<a href="#cas-{slug}">` — cliquer sur un cas dans le benchmark déroule la page jusqu'au cas complet. Cela transforme la section comparative d'un élément statique en navigateur de contenu naturel.

### FAQ et témoignages dans les sections sombres
Les 4 témoignages sont regroupés sur fond `#0F172A` — contraste maximal avec les sections cas alternées blanches/grises juste au-dessus. Cette rupture visuelle force une pause dans le scroll et donne du poids aux citations.

---

## 8. Tokens (sécurité)

Aucun token GitHub, Vercel ou autre credential n'apparaît dans ce rapport.
Le token Git présent dans `git remote get-url origin` est dans la configuration locale uniquement, non exposé dans le code source ou ce document.

---

*Rapport généré le 25 avril 2026 — GreenTechCycle refonte cas-usages éditoriale*
