# Rapport — Harmonisation design & enrichissement GreenTechCycle

**Date** : 2026-04-21
**Preview URL** : https://4100-cst-orbit-2a261973-c7b871de-p.cloud-station.app/

---

## 1. Synthèse

Harmonisation systémique du site GreenTechCycle : création de composants partagés, enrichissement visuel (icônes, formes décoratives, gradients), ajout de Call-to-Action clairs et de liens vers les articles de blog sur chaque page identifiée comme manquant de densité. Toutes les pages compilent (`npm run build` OK), tous les endpoints renvoient HTTP 200.

---

## 2. Composants partagés créés

Tous placés dans `src/components/` et réutilisables sur tout le site.

### `CtaSection.tsx`
Section CTA harmonisée avec :
- 3 tons (`dark` = navy, `light` = pastel, `gradient` = multi-couleurs)
- 5 variantes d'icône (`demo`, `contact`, `download`, `call`, `audit`)
- Formes décoratives : blobs gradient + grille SVG
- Boutons primary (accent vert) + secondary (outline)
- Intégrée sur : CGU, cookies, mentions-legales, confidentialite, FAQ, pourquoi-gtc, parcours-client, securite, impact

### `RelatedArticles.tsx`
Grille d'articles de blog liés, filtrable par :
- `categories` (ex : Réglementation, Sécurité)
- `keywords` (recherche dans slug/titre/keywords)
- Fallback automatique sur les plus récents
- Cards modernes : image + tag coloré + date + reading time + hover scale
- Eyebrow "Ressources" + lien "Voir tous les articles"
- Intégrée sur : contact, FAQ, carrieres, processus-itad, pourquoi-gtc, parcours-client, ecosysteme, securite, impact, methodologie, reglementation

### `DecorativeBackdrop.tsx`
Backdrop absolu réutilisable :
- 3 variantes (`primary`, `secondary`, `neutral`)
- Blobs animés (pulse-slow, pulse-slower) + grille SVG
- Radial gradient accent
- Utilisé dans `LegalPageLayout`

### `LegalPageLayout.tsx`
Layout unifié pour pages légales :
- Hero dark (primary → dark → secondary) avec icône badge
- Breadcrumbs intégrés
- Backdrop décoratif
- Container 4xl avec section blanche et décor subtil
- Remplace 4 pages auparavant quasi brutes

---

## 3. Pages traitées (détail par page)

### Pages légales — refonte complète (les plus pauvres du site)

#### `/[locale]/cgu/page.tsx`
- Avant : titre + 8 paragraphes nus sur fond blanc.
- Après :
  - Hero dark avec icône `FileText`, sous-titre descriptif, breadcrumbs
  - Articles numérotés dans cards blanches avec barre gradient accent → primary à gauche
  - Badge numéroté `01`..`08` dans chaque card
  - Bloc d'aide "Besoin d'éclaircissements ?" avec lien contact
  - CTA final "Une question sur nos conditions ?" (demo/contact)
- Fix : `use(params)` → `useLocale()` (bug SSG résolu)

#### `/[locale]/cookies/page.tsx`
- Avant : 4 paragraphes texte brut.
- Après :
  - Hero avec icône `Cookie`
  - Intro dans card
  - Grille 2 colonnes des 4 catégories de cookies avec icône colorée par type :
    - Necessary → ShieldCheck emerald
    - Analytics → BarChart3 blue
    - Functional → Sparkles amber
    - Marketing → Megaphone rose
  - Section management mise en avant dans card gradient primary
  - CTA final "Reprenez le contrôle de vos préférences"

#### `/[locale]/mentions-legales/page.tsx`
- Avant : 4 paragraphes en liste verticale.
- Après :
  - Hero avec icône `Scale`
  - Grille 2 colonnes des 4 sections avec icônes (`Building2`, `Server`, `Copyright`, `AlertCircle`)
  - Cards blanches avec icône badge primary
  - CTA final "Une question sur nos informations légales ?"

#### `/[locale]/confidentialite/page.tsx`
- Avant : 10 paragraphes nus.
- Après :
  - Hero avec icône `Lock`
  - Sommaire cliquable (grille 2 colonnes avec numéros 01..10) pour naviguer
  - Chaque section dans card avec icône contextuelle (`Info`, `UserCheck`, `Database`, `Target`, `Gavel`, `Clock`, `ShieldCheck`, `Cookie`, `Globe2`, `RefreshCcw`)
  - Ancres `scroll-mt-24` pour navigation douce
  - CTA final "Exercer vos droits RGPD" (contact DPO)

---

### Page contact

#### `/[locale]/contact/page.tsx`
- Conservé le formulaire et les infos existants.
- Ajouté :
  - Trust strip 3 colonnes sous le formulaire : Réponse 24h (Clock) + Confidentialité (Shield) + Impact (Leaf) — cards gradient primary-50 avec icônes badges primary
  - Section RelatedArticles (3 articles récents) avant le pied de page

---

### Page FAQ

#### `/[locale]/faq/page.tsx`
- Ajouté :
  - Icônes contextuelles sur les onglets (`Users` DSI, `Sparkles` RSE, `TrendingUp` DAF, `Shield` Compliance)
  - Section RelatedArticles après l'accordéon
  - CTA final "Votre question n'est pas dans la FAQ ?" (contact/demo)

---

### Page carrières

#### `/[locale]/carrieres/page.tsx`
- Hero enrichi :
  - Badge "Nous recrutons" avec icône `Rocket`
  - Gradients animés (blobs accent + secondary)
  - Radial accent
- Ajouté :
  - Section RelatedArticles
  - CTA final remplacé : badge `Heart`, bouton mailto + bouton contact RH, meilleur visuel

---

### Pages secondaires

#### `/[locale]/processus-itad/page.tsx`
- Ajouté :
  - RelatedArticles filtré sur catégories `Réglementation / Sécurité / Durabilité`
  - CTA final refait : badge `Sparkles`, 2 boutons (audit gratuit + démo), gradient plus riche avec 3 stops et blobs animés

#### `/[locale]/pourquoi-gtc/page.tsx`
- Ajouté :
  - RelatedArticles sur les 3 derniers articles
  - CtaSection "Faites le choix d'un ITAD à forte valeur ajoutée" variant=audit tone=dark

#### `/[locale]/parcours-client/page.tsx`
- Ajouté :
  - RelatedArticles "Ressources pour votre parcours"
  - CtaSection "Prêt à démarrer votre parcours ?" variant=call

#### `/[locale]/ecosysteme/page.tsx`
- Ajouté :
  - RelatedArticles filtré par keywords `nis2 / cybersécurité / sécurité` (lien direct avec les sujets d'intégration)

---

### Pages d'information

#### `/[locale]/securite/page.tsx`
- Ajouté :
  - RelatedArticles filtré catégories `Sécurité / Conformité`
  - CtaSection "Protégez vos données jusqu'à la dernière étape" variant=download

#### `/[locale]/impact/page.tsx`
- Ajouté :
  - RelatedArticles filtré par keywords `CSRD / économie circulaire / DEEE / carbone`
  - CtaSection "Calculez votre impact en 10 minutes" variant=download tone=gradient

#### `/[locale]/methodologie/page.tsx`
- Ajouté :
  - RelatedArticles "Approfondir notre méthodologie"

#### `/[locale]/reglementation/page.tsx`
- Ajouté :
  - RelatedArticles filtré catégories `Réglementation / Conformité`

---

## 4. Cohérence visuelle

### Palette uniforme
- Primary green `#0D503C` (primary)
- Accent green `#10B981` (accent)
- Dark navy `#1E3A5F` (secondary) + `#0F172A` (dark)
- Gradients standards : `from-primary via-dark to-secondary` pour les heros sombres ; `from-primary-50 to-accent/5` pour les fonds clairs

### Tokens d'espacement
- Sections : `py-20 md:py-24` (standard) / `py-24 md:py-32` (hero) — homogène
- Cards : `p-6 md:p-8` / `rounded-2xl` / `border border-gray-100 shadow-sm hover:shadow-md`
- Grids : `gap-6 md:gap-8`

### Typographie
- h1 : `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`
- h2 : `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight`
- h3 : `text-lg md:text-xl font-semibold tracking-tight`
- Body : `text-gray-600 leading-relaxed`

### Boutons unifiés
- Primary : `bg-accent hover:bg-accent-600 text-white rounded-xl px-8 py-4 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5`
- Secondary (dark tone) : `border-2 border-white/40 hover:border-white/80 text-white hover:bg-white/10 backdrop-blur-sm`
- Secondary (light tone) : `border-2 border-primary/30 text-primary hover:bg-primary hover:text-white`

### Icônes
- Utilisation généralisée de `lucide-react` (déjà installé)
- Badges d'icônes : carré 14x14 rounded-2xl avec fond accent ou primary sur dark ; carré 10/11 rounded-xl sur cartes

---

## 5. Call-to-Action ajoutés

Chaque page désormais expose au moins un CTA explicite avant le footer :

| Page | CTA principal | Variante |
|---|---|---|
| CGU | Planifier une démo | demo |
| Cookies | Nous contacter | contact |
| Mentions légales | Nous contacter | contact |
| Confidentialité | Contacter le DPO | contact |
| Contact | (formulaire en place) + trust strip | — |
| FAQ | Poser ma question | contact |
| Carrières | Candidature spontanée (mailto) | heart |
| Processus ITAD | Audit gratuit | audit |
| Pourquoi GTC | Audit gratuit | audit |
| Parcours client | Planifier un appel | call |
| Sécurité | Télécharger le guide | download |
| Impact | Lancer la simulation | download |

---

## 6. Liens vers articles de blog

Toutes les pages enrichies affichent désormais 3 articles pertinents de `src/lib/blog-data.ts`, avec filtrage intelligent par catégorie ou mots-clés pour rester contextuel :
- contact, carrieres, methodologie, parcours-client, pourquoi-gtc, FAQ : 3 articles récents
- processus-itad : Réglementation / Sécurité / Durabilité
- ecosysteme : NIS2 / cybersécurité
- securite : Sécurité / Conformité
- impact : CSRD / économie circulaire / DEEE
- reglementation : Réglementation / Conformité

Les articles mis en avant couvrent les thèmes demandés : décarbonisation (CSRD, bilan carbone, économie circulaire), gestion des assets IT (ITAD, DEEE, reconditionnement) et cybersécurité (NIS2, RGPD, NIST 800-88).

---

## 7. Bug résolu

Les 4 pages légales utilisaient initialement `React.use(params)` avec un type `Promise<{ locale }>` — incompatible en SSG avec Next 14.2 en client component. Remplacé par `useLocale()` de next-intl. Build export réussit désormais sur les 65 pages statiques.

---

## 8. Validation

- TypeScript : `npx tsc --noEmit` → 0 erreur
- Next build : `npm run build` → OK, 65 pages générées
- HTTP probes : 200 sur toutes les pages testées :
  - `/fr` `/fr/contact` `/fr/faq` `/fr/carrieres` `/fr/cgu` `/fr/cookies` `/fr/confidentialite` `/fr/mentions-legales` `/fr/processus-itad` `/fr/pourquoi-gtc` `/fr/parcours-client` `/fr/ecosysteme` `/fr/securite` `/fr/impact` `/fr/methodologie` `/fr/reglementation`
- Dev server : `next start -H 0.0.0.0 -p 4100` en tâche de fond

---

## 9. Preview

→ https://4100-cst-orbit-2a261973-c7b871de-p.cloud-station.app/

Naviguer notamment vers :
- `/fr/cgu` et `/fr/confidentialite` : refonte la plus spectaculaire
- `/fr/contact` : trust strip + articles ajoutés
- `/fr/processus-itad` : CTA final enrichi

---

## 10. Pages non touchées (déjà très travaillées)

- Home (`page.tsx`) : déjà riche en icônes, animations, CTA multiples, hero avec photo équipe
- Services (`services/page.tsx`, 2358 lignes) : pages verticales déjà très denses
- Plateforme (`plateforme/page.tsx`, 1117 lignes) : screenshots et mockups abondants
- Demo (`demo/page.tsx`, 244 lignes) : déjà page conversion optimisée
- Cas-usages & secteurs : CTA déjà présents
- Blog listing (`blog/page.tsx`, 140 lignes) : déjà stylé avec cards et images
- Blog articles (`[slug]/page.tsx`) : gabarit déjà unifié

Ces pages restent cohérentes avec le design system étendu puisque les tokens (couleurs, arrondis, ombres, icônes lucide, gradients) sont communs.

---

## 11. Règles respectées

- Rien de cassé : build complet sans erreur
- Composants Tailwind existants utilisés (primary/accent/secondary, section-padding, container-max)
- Design corporate, cohérent, sobre
- SVG inline et lucide-react (déjà installé)
- Pas de modification de l'i18n / des traductions / de la structure de routing
