# Rapport Refonte Page d'Accueil — Vague 4

**Date** : 2026-04-25
**Auteur** : Builder + Lead Designer (mandaté par le propriétaire du repo)
**Périmètre** : `src/app/[locale]/page.tsx` + `messages/fr.json` + `messages/en.json` + nouveaux assets photos
**Cible persona** : DSI, RSSI, RSE, DAF de grandes entreprises et ETI cotées
**Build status** : `npm run build` PASS (Compiled successfully · 13 kB home / 167 kB First Load JS)
**Lignes JSX home** : 410 → **1 048** (×2,6)

---

## 1. Diagnostic sévère de la version précédente (12 points)

Observation à froid de la home v3a (commit `10ed059`) en local et en prod sur https://greentechcycle-website.vercel.app/fr. Points relevés sans complaisance, classés par criticité.

### 1.1 — Hero : promesse plate, hiérarchie typographique uniforme
Le hero précédent reposait sur un titre i18n « De la collecte au certificat ESRS E5 — décommissionnez sans risque » correctement informatif mais **typographiquement plat** : un seul niveau de hiérarchie (h1 5xl-7xl), un sous-titre, deux CTA. Aucun élément visuel ne hiérarchise une promesse forte ; le gradient sur photo `team-collab.jpg` mange les mots, le badge eyebrow disparaît dans le bruit. Pour un DSI/RSSI en 6 secondes, le hero ne dit ni l'urgence, ni l'angle, ni la preuve.

### 1.2 — Photo hero générique, gradient qui aplatit
La photo `team-collab.jpg` (équipe générique en réunion, déjà vue 3× sur le site) recouverte d'un triple gradient `from-[#047857]/80 via-[#0F172A]/75 to-[#1E40AF]/85` produit un visuel sombre, qui pourrait être celui de n'importe quelle SSII. Aucun lien visuel avec ITAD, ESS, certifications, atelier, ou décideur cible.

### 1.3 — Pas de "preuve sociale dure" au-dessus de la ligne de flottaison
La home v3a avait des badges « 150+ ETI équipées · Certificat 24h · 45T CO₂ évités », corrects mais perdus en bas de hero, sans cohérence visuelle avec le reste. Aucune ligne de logos clients, aucun bandeau de confiance sectoriel anonymisé. Pour la cible CAC40/ETI, c'est un manque qui plante la crédibilité dès la deuxième seconde.

### 1.4 — Structure narrative "produit", pas "client"
L'ordre des sections était : Urgency → Hero → Stats → How It Works → Video → Testimonials → Counters → Press → Final CTA. C'est une chaîne **descriptive du produit** (« voici nos chiffres, voici comment on travaille, voici ce que les clients disent »), pas une chaîne **de valeur client** (problème → solution → preuve → action). Un DSI scanne 3 sections et part s'il ne lit pas son problème.

### 1.5 — "Comment ça marche" en 4 étapes redondant et faible
Les 4 étapes (Audit / Collecte / Traitement / Rapport) sont génériques : c'est ce que dit Recommerce, ATF Gaia, Cycleon, et tout vendeur ITAD européen. Aucun KPI, aucun standard nommé, aucune SLA. Les visuels par étape étaient déjà présents (vague 3a) mais l'argument restait creux.

### 1.6 — Stats sourcées correctes mais isolées
Les 4 stats CIGREF/ADEME/Gartner/Capgemini sont solides et bien sourcées (vague 3a). Mais elles ne s'enchaînent avec rien : pas de transition vers la solution GTC, pas de mécanique « problème chiffré → solution proposée ». Elles flottent.

### 1.7 — Témoignages crédibles (Marc B., Sylvie R., Philippe D.) noyés dans une grille
Les 3 témoignages anonymisés introduits en vague 3a sont bons (chiffres, périmètre, secteur). Mais présentés en grille de 3 cards de taille égale, **aucun ne ressort**. Or Marc B. RSSI banque tier-1 mérite un traitement éditorial dédié — c'est notre verbatim le plus puissant pour la cible primaire.

### 1.8 — Aucune mention des cas clients sur la home
La page `/cas-usages` contient 8 cas chiffrés très solides (banque CAC40, CHU 9 000 lits, industriel CSRD, ministère, retail, énergie, telco, université). **Aucun lien sur la home** vers ces cas. Un visiteur DSI banque CAC40 scrollait toute la home sans jamais voir qu'on a un cas exact pour lui.

### 1.9 — "Pourquoi GreenTechCycle" inexistant sur la home
Les 4 différenciateurs durs (chain of custody opposable, 7 certifications, mapping ESRS E5, équipe ESS française) sont éparpillés sur `/pourquoi-gtc`, `/methodologie`, `/securite`. Sur la home : aucun. Le visiteur ne comprend pas pourquoi nous, vs un autre prestataire.

### 1.10 — CTA finals corrects mais bandeau de confiance absent
Le final CTA v3a a 2 CTAs (audit + démo) sur fond `server-technician.jpg` avec gradient. Pas de bandeau de garanties contractuelles (RGPD, SecNumCloud, ISO 27001, R2v3, NIST, SLA réponse). Or c'est exactement ce qu'un DAF/Achats veut voir avant de cliquer.

### 1.11 — Press marquee décorative sans valeur
Le bandeau presse défilant (Les Échos / BFM / L'Usine Digitale / GreenBiz / 01net / ZDNet) n'a ni source, ni date, ni article cité. Aucun click-through. C'est de la décoration. À supprimer.

### 1.12 — Aucun calendrier régulateur, aucune mécanique d'urgence dépassant le simple banner
La urgency band en haut mentionne CSRD juin 2026. Mais NIS2 (octobre 2024), DORA (janvier 2025), PCI-DSS v4.0 (mars 2025) ne sont jamais visualisés. Pour une cible RSSI/DPO/Compliance, un calendrier daté avec articles précis et plafonds de sanction est un argument acheteur direct.

### Bilan diagnostic
Une home **techniquement saine** (vague 3a a corrigé palette, photos uniques par section, sources nominatives) mais **stratégiquement plate** : pas d'angle, pas de hiérarchie de preuves, pas de mécanique narrative orientée client, et des éléments à fort potentiel (cas clients, différenciateurs, calendrier régulateur) qui dorment ailleurs sur le site.

---

## 2. Trois partis-pris hero alternatifs envisagés

### Direction A — "Manifeste"
**Concept** : titre fort, courte phrase éditoriale, photo authentique d'équipe atelier, chiffre choc en sous-couche.
- Titre : *« Les actifs IT en fin de vie ne sont pas un déchet. Ce sont 638 k€ et 1 247 tCO₂e que vos auditeurs ne voient pas. »*
- Photo : atelier de reconditionnement ESS (ouvriers grade-A en blouse, écrans Dell sur établi)
- CTA : « Demander un audit » (primaire) + « Voir le manifeste » (secondaire)

**Forces** : ton consultant senior, casse les codes ITAD-marketing, photo authentique, lien direct ESS = différenciateur GTC.
**Faiblesses** : titre long (~120 char), risque de paraître éditorial sans prouver. Le visiteur DSI peut percevoir « comm » avant « business ».

### Direction B — "Démonstration"
**Concept** : split screen — argument à gauche, mockup animé de la plateforme à droite (dashboards qui s'enchaînent), 3 KPIs en preuve immédiate sous le hero.
- Titre : *« La seule plateforme qui vous présente un certificat ESRS E5 audité en 4 jours. »*
- Visuel : mockup figé d'une vue dashboard "Audit ACPR · 100 % certificats signés · 4j" + ribbon scrollable de 3 KPIs.
- CTA : « Réserver la démo » (primaire) + « Voir le dashboard » (secondaire)

**Forces** : démontre par l'image, dimension "produit SaaS" claire, attire les DSI techniques.
**Faiblesses** : mockup à concevoir/illustrer (pas de screenshot prod plausible aujourd'hui), risque d'opacité pour cible non-DSI (RSE, DAF), animations coûteuses en JS.

### Direction C — "Provocation chiffrée"  ✅ RETENUE
**Concept** : un chiffre choc en typo XXL (« 78% »), un sous-titre qui nomme la barrière (la fabrication), une promesse en 1 phrase qui repositionne le rôle de GTC, dual CTA dur (audit / démo), photos boardroom + 2 cards flottantes de preuve.
- Eyebrow : *« Plateforme ITAD certifiée R2v3 · NIST 800-88 · SecNumCloud-ready »*
- Chiffre : **78%**
- Sous : *« de l'empreinte carbone d'un parc IT »*
- Titre : *« est figée à la fabrication. Vous ne pouvez agir que sur les 22 % qui restent. »*
- Subtitle : *« Fin de vie matériel, données sensibles, valeur résiduelle, reporting CSRD : une seule fenêtre de tir, une seule plateforme — opérée par 38 collaborateurs habilités, sur 4 sites en France. »*
- CTA1 : « Demander un audit (sous 48 h) »
- CTA2 : « Réserver une démo (30 min) »
- Source : *« ADEME — Évaluation environnementale du numérique 2024 (scope 3.1 fabrication, moyenne pondérée laptop/desktop/serveur). »*
- 3 trust badges inline (R2v3/ISO, NIST/HMG, RGPD/NIS2/DORA/CSRD)
- Photo : `hp-rssi-boardroom.jpg` (comité de direction grand compte) + 2 cards flottantes (« Audit ACPR : 4 jours » / « Valeur récupérée : 638 k€ »)

### Justification du choix
Pour un DSI/RSSI/RSE/DAF, la première seconde doit produire un **fait** (pas une promesse). Le 78% est un chiffre ADEME publiquement vérifiable, **inverse l'angle commercial classique de l'ITAD** (qui parle de tonnes de DEEE et de compliance), et **repositionne GreenTechCycle comme le seul acteur qui maîtrise la fenêtre de levier réelle** (les 22 % restants : fin de vie + données + valeur + reporting).

C'est aussi l'angle qui :
1. **Différencie le plus** vs Recommerce / Eco-mobilier / Cycleon / ATF Gaia (tous parlent en tonnes ou en certificats, aucun ne pose la question de la fenêtre de levier carbone).
2. **Tient en moins de 6 secondes** : le DSI lit 78% → fabrication → 22% → fenêtre. C'est compréhensible sans subtitle.
3. **Permet l'enchaînement** : la section suivante (Trust band) atterrit naturellement, puis Problème (3 risques chiffrés) accentue le « ce que coûte de ne rien faire ».
4. **Donne deux ancrages chiffrés visibles** (4 jours audit ACPR + 638 k€) qui sont des KPIs réels de la cohorte 2025, pas des inventions.

La Direction A reste forte et pourrait servir de variante A/B test ultérieure. La Direction B nécessite un investissement design produit (mockup) qui dépasse le périmètre de la refonte home actuelle.

---

## 3. Structure finale (13 sections / sub-sections)

| # | Section | Background | Rôle narratif | Lignes JSX |
|---|---------|------------|----------------|-----------|
| 1 | Urgency band | navy `#0F172A` | Réveil régulateur | ~10 |
| 2 | Hero "Provocation chiffrée" | white→emerald gradient | Choc + angle + preuve | ~140 |
| 3 | Trust band (6 clients sectoriels anonymisés) | white | Validation pairs | ~30 |
| 4 | Problème : 3 risques chiffrés | `#F8FAFC` | Coût caché | ~70 |
| 4-bis | Calendrier régulateur (NIS2 / DORA / PCI-DSS / CSRD) | white | Urgence datée | ~80 |
| 5 | Solution : phrase + hub-and-spoke | white | Repositionnement | ~110 |
| 6 | Chaîne de valeur 5 étapes | dark `#0F172A` | Méthode | ~80 |
| 7 | Preuves & résultats : 4 KPIs CountUp | white | Preuves chiffrées | ~70 |
| 8 | Cas clients : 3 mini-cas (banque/CHU/industriel) | `#F8FAFC` | Persona match | ~110 |
| 9 | Différenciateurs : 4 engagements durs | white | Pourquoi nous | ~70 |
| 9-bis | Avant / Après comparaison | `#F8FAFC` | Démonstration de transformation | ~110 |
| 10 | Témoignage fort Marc B. RSSI banque tier-1 | dark gradient | Verbatim hero | ~80 |
| 10-bis | FAQ DSI/RSSI : 4 questions | white | Lever objections finales | ~60 |
| 11 | CTA final double + bandeau garanties | photo + emerald gradient | Conversion | ~80 |

**Total** : ~1 048 lignes TSX (incl. imports, types, commentaires de section), 11 sections principales + 4 sub-sections, environ 6-8 minutes de scroll desktop.

---

## 4. Photos uniques pour la home (5 nouvelles, aucune réutilisation)

Toutes téléchargées depuis Unsplash CDN officiel (`images.unsplash.com`) — listées dans `next.config.js` `remotePatterns`. Aucune photo de la home v3a n'est conservée pour le **nouveau** contenu (les anciennes photos restent disponibles mais ne sont plus référencées sur la home).

| Fichier | Section d'usage | Description | Taille |
|---------|-----------------|-------------|--------|
| `public/photos/hp-rssi-boardroom.jpg` | Hero | Comité de direction — décideurs grand compte, posture corporate | 384 ko |
| `public/photos/hp-dsi-strategy.jpg` | Témoignage Marc B. | Décideur IT en analyse de dossier (visage anonymisé, grayscale) | 438 ko |
| `public/photos/hp-atelier-itad.jpg` | CTA final | Atelier de reconditionnement / chaîne d'effacement | 502 ko |
| `public/photos/hp-datacenter-green.jpg` | Réserve (futurs A/B) | Datacenter green | 316 ko |
| `public/photos/hp-audit-signature.jpg` | Réserve (futurs A/B) | Signature de certificat / audit | 182 ko |

Les 3 photos directement utilisées (`hp-rssi-boardroom`, `hp-dsi-strategy`, `hp-atelier-itad`) **ne sont référencées nulle part ailleurs sur le site** : pas dans `/services`, pas dans `/plateforme`, pas dans `/pourquoi-gtc`, pas dans les cas-usages. Vérifié via `grep` sur l'arbre `src/`.

Les photos sectorielles déjà sur le site (`case-banque.jpg`, `case-hopital.jpg`, `case-industrie.jpg`) sont **réutilisées intentionnellement** dans la section "Cas clients" de la home — c'est une cohérence éditoriale (le visiteur qui clique tombe sur la même image en page de détail).

---

## 5. Décisions clefs de design

### 5.1 Palette restaurée à l'officielle
La v3a utilisait `#047857` (emerald-700) comme primary. Refonte v4 utilise strictement la palette officielle :
- `#10B981` (emerald-500) — primaire (CTA, accents, KPI)
- `#0EA5E9` (sky-500) — secondaire (CTA secondaire, bordure démo)
- `#F59E0B` (amber-500) — urgence (banner, problème, calendrier régulateur)
- `#0F172A` (slate-900) — texte titres, sections sombres

### 5.2 Typographie hiérarchisée par fonction
- **Hero figure** (78%) : `text-[7rem] lg:text-[9rem] font-bold leading-none tracking-tighter` en `#10B981`
- **Hero figureUnit** (sous-couche) : `text-2xl lg:text-3xl font-semibold text-gray-500`
- **Hero title** : `text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A]`
- **Section h2** : `text-3xl md:text-5xl font-bold leading-[1.1]`
- **Eyebrow** : `text-sm font-semibold tracking-[0.18em] uppercase` (jamais en couleur secondaire criarde)
- **Body** : `text-gray-600 leading-relaxed` (16-18px selon contexte)
- **Source / footnote** : `text-[11px] italic` (toujours sourcé sur 1-2 lignes)

### 5.3 Animations sobres
Strictement les helpers existants `motion.tsx` :
- `FadeIn` (opacity + 30 px shift, ease cubic-bezier 0.22, 1, 0.36, 1)
- `StaggerContainer` + `StaggerItem` (delay 0.08 s)
- `ScaleIn` (scale 0.9 → 1)
- `CountUp` (animation IntersectionObserver triggered sur les 4 KPIs)
**Pas de bounce, pas de spring agressif, pas d'animation décorative qui aspire le JS.**

### 5.4 Hub-and-spoke en pure CSS
Le diagramme central de la section Solution est entièrement CSS — un cercle en gradient `from-[#10B981] to-[#0EA5E9]` avec halo blur, deux colonnes de pillars à gauche et à droite, deux traits décoratifs. Pas d'image, pas de SVG externe, pas de JS d'animation. Coût bundle : 0 ko supplémentaire.

### 5.5 Cards flottantes au-dessus du hero
Deux mini-cards (« Audit ACPR : 4 jours » / « Valeur récupérée : 638 k€ ») flottent sur la photo du hero en `position: absolute -top-4 -right-4 / -bottom-4 -left-4`, fond blanc, ombre `shadow-xl`. Effet boardroom-meets-fintech-dashboard, sans saturer.

---

## 6. Extraits before / after

### 6.1 Hero title

**AVANT (v3a)** :
```tsx
<h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
  {t("hero.title")}
</h1>
<p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
  {t("hero.subtitle")}
</p>
```
*Title:* « De la collecte au certificat ESRS E5 — décommissionnez sans risque »

**APRÈS (v4)** :
```tsx
<h1 id="hero-title" className="text-[#0F172A] mb-6 tracking-tight leading-[1.02]">
  <span className="block text-[5.5rem] sm:text-[7rem] lg:text-[9rem] font-bold text-[#10B981] leading-none mb-2 tracking-tighter">
    {t("hero.figure")}
  </span>
  <span className="block text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 mb-4 tracking-tight">
    {t("hero.figureUnit")}
  </span>
  <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight max-w-2xl">
    {t("hero.title")}
  </span>
</h1>
```
*Figure:* « 78% »
*FigureUnit:* « de l'empreinte carbone d'un parc IT »
*Title:* « est figée à la fabrication. Vous ne pouvez agir que sur les 22 % qui restent. »

### 6.2 Section "Cas clients" (n'existait pas en v3a)

**AVANT** : *(absent — la home renvoyait vers nulle part)*

**APRÈS** :
```tsx
{cases.map((c, i) => (
  <Link href={`/cas-usages#${c.slug}`} className="group bg-white border border-gray-100 rounded-2xl ...">
    <div className="relative aspect-[16/9]">
      <Image src={photos[i]} ... />
      <div className="absolute top-4 left-4 ...">{c.sector}</div>
      <span className="absolute bottom-4 left-4 ... bg-[#F59E0B]">{c.regulation}</span>
    </div>
    <ul>
      {c.results.map((r, j) => <li><CheckCircle2 /> {r}</li>)}
    </ul>
  </Link>
))}
```

### 6.3 Différenciateurs (nouveaux — n'existaient pas en v3a)

**AVANT** : *(absent — éparpillé sur `/pourquoi-gtc`)*

**APRÈS** : 4 cards 2x2 avec stat badge + titre + body, chacune affichant un engagement écrit opposable (chain of custody, 7 certifs, ESRS E5 mapping, équipe ESS française).

### 6.4 Témoignage fort (nouveau format)

**AVANT** : grille de 3 cards 1/3 chacune.

**APRÈS** : Marc B. RSSI banque tier-1 isolé sur fond sombre, photo grayscale 224×224 px + bloc citation typo 2-3xl + contexte de mission + lien vers cas complet `/cas-usages#banque-cac40-windows11-nis2`.

---

## 7. Conformité aux critères de succès

| Critère | Cible | Réalisé |
|---------|-------|---------|
| Lignes JSX home | ≥ 1 000 | ✅ 1 048 |
| Sections principales | 8-10 | ✅ 11 + 4 sub-sections |
| 3 partis-pris hero documentés | oui | ✅ A, B, C dans §2 |
| Parti-pris choisi argumenté | oui | ✅ Direction C — Provocation chiffrée |
| KPIs animés sourcés | ≥ 4 | ✅ 4 (clients/assets/value/carbon) |
| Mini-cas clients liés à `/cas-usages` | 3 | ✅ banque/CHU/industriel |
| Différenciateurs durs | 4 | ✅ chain of custody / 7 certifs / ESRS E5 / ESS française |
| Témoignage fort | 1 | ✅ Marc B. RSSI banque tier-1 |
| Double CTA final | oui | ✅ Audit + Démo + bandeau garanties |
| Photos uniques nouvelles | ≥ 3 | ✅ 5 nouvelles, 3 utilisées |
| Aucune réutilisation depuis autres pages | oui | ✅ vérifié grep |
| `npm run build` | PASS | ✅ Compiled successfully |
| FR ↔ EN miroir complet | oui | ✅ tous les nouveaux blocs |
| Pas d'emojis UI | oui | ✅ uniquement icônes lucide-react |
| Animations sobres | oui | ✅ FadeIn / Stagger / ScaleIn / CountUp |
| Sticky CTA + Exit popup harmonisés | oui | ✅ couleur `#10B981`, contexte pathname `/` → `default` |
| Bundle home raisonnable | oui | ✅ 13 kB / 167 kB First Load JS |

---

## 8. Trois améliorations majeures vs version précédente

### 8.1 Hero qui engage en 6 secondes
Le hero v3a faisait travailler la cible (titre dense, photo générique, gradients lourds). Le hero v4 **livre un fait + un angle + une preuve** dans la première seconde grâce au chiffre 78% en typo XXL et aux cards flottantes « 4 jours » / « 638 k€ ». Aucune autre home ITAD du marché européen ne pose la question dans ces termes — ça crée un effet « ce vendeur a réfléchi ».

### 8.2 Narration chaîne de valeur claire au lieu d'un catalogue
La v3a était un catalogue (« voici nos étapes, nos chiffres, nos témoignages »). La v4 est une **chaîne narrative** : choc → coût caché → calendrier régulateur → solution unifiée → méthode 5 étapes → preuves → cas persona → différenciateurs durs → preuve client → objections → action. Chaque section répond à la question « et donc ? » de la précédente.

### 8.3 Conversion outillée pour 4 personas (DSI / RSSI / RSE / DAF)
La v3a avait 1 chemin de conversion (« Demander une démo »). La v4 en a explicitement 4, présents en parallèle :
- **DSI** : Cas industriel CSRD, FAQ « comment intégrer notre CMDB », démo plateforme
- **RSSI** : Cas banque CAC40 NIS2/DORA, Calendrier régulateur, témoignage Marc B., FAQ zone classifiée
- **RSE** : Cas industriel ESRS E5, KPI tCO₂e Boavizta, mapping 11/16 ESRS E5
- **DAF** : KPI 638 k€ valeur résiduelle, Cas CHU 142 k€, comparatif avant/après chiffré
Chacun trouve **son angle, son chiffre, son cas** sans scroller la home en entier.

---

## 9. Suivi déploiement

- **Commit local** : `6fc445f` (sur la branche `main`)
- **Push origin main** : ✅ `10ed059..6fc445f` réussi le 2026-04-25
- **Vercel deploy ID** : `dpl_6uuewFF4UR4PTuFpRfJAXXnJv9bR` (READY, 58 s, target=production)
- **URL deployment** : https://greentechcycle-website-6g66e8i8b-grenntechcycle.vercel.app
- **URL alias prod** : https://greentechcycle-website.vercel.app/fr — `HTTP/2 200` ✅
- **Vérif contenu FR** : présence vérifiée pour `78%`, `22 % qui restent`, `figée à la fabrication`, `fenêtre de tir`, `Trois risques chiffrés`, `Calendrier régulateur`, `Demander un audit (sous 48`, `Réserver une démo (30 min)`, `hp-rssi-boardroom` (asset hero)
- **Vérif contenu EN** : présence vérifiée pour `78%`, `locked in at manufacturing`, `Regulatory calendar`, `hidden cost`, `Book a 30-min demo`
- **Push protection GitHub** : 1 incident (tokens dans `gtc-site-deploy-vague3b-report.md` — fichier hérité d'une session précédente, redacté avant push)

---

## 10. Recommandations pour la vague 5 (post-déploiement)

1. **A/B test sur le hero** : variante A "Manifeste" vs variante C "Provocation chiffrée" pendant 21 jours, mesurer scroll-depth + CTR vers `/contact`.
2. **OG-image dédiée** : générer une OG-image 1200×630 reprenant le 78% pour les partages LinkedIn (cible primaire prospection RSSI).
3. **Schema.org `WebPage` + `BreadcrumbList`** : enrichir `SchemaOrg.tsx` avec les 11 sections en `mainEntity`.
4. **Microcopie A/B sur les CTAs** : tester « Demander un audit » vs « Demander un diagnostic 360° » vs « Recevoir le mémo conformité » selon source de trafic.
5. **Deep-linking depuis ads** : les 3 cas clients pointent vers `/cas-usages#<slug>` — ajouter un scroll smooth + `scroll-margin-top: 8rem` sur les ancres pour un meilleur landing depuis ads ABM.
6. **Suppression vague 5 du Press marquee résiduel** : actuellement le code de la marquee n'est plus dans la home v4, mais les keys i18n `Home.press` ne sont plus consommées et peuvent être supprimées de fr/en JSON pour un poids légèrement moindre.
7. **Reading-pause analytics** : instrumenter le scroll-depth via `data-section="<id>"` pour mesurer où la lecture décroche (Hero → Trust → Problème → Calendrier → Solution → ...).

---

## 11. Annexes

### 11.1 Sections supprimées de la v3a
- Section « Stats » (4 cards CIGREF/ADEME/Gartner/Capgemini) → fusionnée dans « Problème » sous forme de risques chiffrés narrativisés
- Section « How It Works » (4 étapes Audit/Collecte/Traitement/Rapport) → remplacée par la Chaîne de Valeur 5 étapes (plus précise, KPI par étape, standard nommé)
- Section « VideoSection » (lien `/demo` avec photo + bouton play) → CTA secondaire `/demo` directement intégré dans Hero et Final CTA
- Section « Testimonials » (3 cards uniformes) → 1 témoignage fort isolé + 3 cas chiffrés en cards de cas-usages
- Section « Counters » (4 KPIs sur fond gradient vert→bleu) → renommée « Preuves & résultats » avec items différents (clients/assets/value/carbon vs companies/equipment/satisfaction/co2) et sources nominatives par KPI
- Section « Press » (marquee BFM/Échos/etc.) → supprimée (pas de valeur sans articles cités)

### 11.2 Sections ajoutées en v4
- Trust band 6 secteurs anonymisés
- Calendrier régulateur 4 échéances (NIS2 / DORA / PCI-DSS / CSRD)
- Solution avec hub-and-spoke
- Cas clients 3 mini-cards liées
- Différenciateurs 4 engagements durs
- Avant/Après comparaison
- FAQ DSI/RSSI 4 questions

### 11.3 Inventaire des CTAs sur la nouvelle home
| Section | CTA | Cible |
|---------|-----|-------|
| Hero | « Demander un audit (sous 48 h) » | `/contact` |
| Hero | « Réserver une démo (30 min) » | `/demo` |
| Cas clients (×3) | « Lire le cas » | `/cas-usages#<slug>` |
| Cas clients header | « Voir les 8 cas chiffrés » | `/cas-usages` |
| Avant/Après | « Voir la plateforme en détail » | `/plateforme` |
| Témoignage Marc B. | « Lire le cas complet » | `/cas-usages#banque-cac40-windows11-nis2` |
| FAQ | « Voir les 24 questions de la FAQ technique » | `/faq` |
| Final | « Demander l'audit gratuit » | `/contact` |
| Final | « Réserver la démo (30 min) » | `/demo` |

Total : **11 CTAs** dont 7 actions de conversion et 4 navigations vers contenus profonds. Le Sticky CTA mobile reste actif sur `/` avec le label `default` = « Demander un audit gratuit » (cible `/demo`).

### 11.4 Règles éditoriales appliquées (extrait `CLAUDE.md`)
1. ✅ Tout chiffre est sourcé (ADEME, Boavizta, étude X, n=Y, date) — vérifié pour les 4 stats du hero, les 3 risques du problème, les 4 KPIs preuves, les 3 cas clients.
2. ✅ Aucun adjectif marketing (« simple », « unifiée », « complète », « innovante ») sans preuve à 2 lignes — 1 occurrence justifiée d'« unifiée » dans le titre Solution, suivie immédiatement du body qui détaille « ITAD opéré + Cyber + CSRD + Économie circulaire ».
3. ✅ Tout témoignage a un nom, un poste, un secteur, un chiffre, une note de consentement.
4. ✅ Toute fonctionnalité est nommée par son standard (NIST 800-88 rev2, ESRS E5 §29-39, ISO 27001:2022, HMG IS5 Enhanced, eIDAS RGS**, GHG Protocol scope 3.1, Boavizta v1.4, ADEME Base Empreinte® v23).
5. ✅ Aucun emoji dans le copy — uniquement icônes lucide-react sobres.
6. ✅ Verbes d'action en début de bullet (« Effacement... », « Reconditionnement... », « Mapping... »).

---

*Fin du rapport. Refonte appliquée et build vérifié au 25 avril 2026.*
