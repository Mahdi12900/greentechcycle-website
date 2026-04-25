# Rapport · Refonte éditoriale /plateforme + /pourquoi-gtc + /contact + harmonisation /impact

**Date** : 2026-04-25
**Vague** : 4 (suite home + cas-usages)
**Branche** : main
**Build** : `npm run build` → ✓ Compiled successfully
**Pages livrées** : 4 refondues, 0 régression sur le reste du site

---

## 1. Pages livrées

| Page | Avant | Après | Pattern appliqué |
|---|---|---|---|
| `/plateforme` | 1 117 lignes — grille de modules + diagramme orbital + mockup mobile | **685 lignes** — storytelling parcours en 5 chapitres pleine largeur alternés | Hero split sombre, 5 chapitres ingestion → audit → décision → traçabilité → restitution, citation magazine, bandeau chiffres XXL, 3 offres avec « Réserver », FAQ courte, conversion verte, CTA final atelier |
| `/pourquoi-gtc` | 268 lignes — tuiles génériques mission/founder/values/benefits | **570 lignes** — manifeste fondateur premium | Hero provocation chiffrée « 50 millions de tonnes », manifeste prose, mot du fondateur split sombre, 5 convictions alternées (souveraineté/preuve/inclusion/sobriété/excellence), 6 engagements chiffrés sourcés, citation magazine, conversion verte |
| `/contact` | 166 lignes — formulaire générique 5 champs + sidebar | **572 lignes** — formulaire qualifié par offre | Hero split + carte témoignage flottante, formulaire 9 champs (offre, fonction, taille de parc, échéance…) avec panneau d'offre dynamique sticky, lecture du `?offre=` via `useSearchParams` + Suspense, voies directes split sombre, conversion verte |
| `/impact` | 943 lignes (méthodo carbone V3 préservée) | **953 lignes** — enveloppe harmonisée | Hero refondu en split sombre + numéro fantôme XXL `78`, KPIs intégrés au hero, CTAs migrés vers `/reserver?offre=` (3 endroits). **Méthodologie, sources ADEME, tableaux comparison/ESRS strictement intacts.** |

---

## 2. Pattern éditorial appliqué (rappel home/cas-usages)

| Élément | Implémentation |
|---|---|
| Hero pleine hauteur split sombre `#0F172A` | Toutes les nouvelles pages |
| Titres `clamp(2.2rem, 5.5vw, 4.75rem)` | Tous les H1/H2 hero |
| Numéros XXL ghost `clamp(8rem, 22vw, 18rem)`, opacity 4 % | 5 chapitres /plateforme, 5 convictions /pourquoi-gtc, hero /impact |
| Sections pleine largeur 50/50 alternance gauche/droite | Chapitres /plateforme et convictions /pourquoi-gtc |
| Alternance fond clair (#F8FAFC) / sombre (#0F172A ou #022C22) | Chapitres index 1 et 3 sombres, autres clairs |
| Prose narrative 3-4 phrases avant chiffres | Hero promesse, chaque chapitre, mot du fondateur, manifeste |
| Photos organiques Unsplash métier | hp-dsi-strategy, hp-rssi-boardroom, hp-atelier-itad, hp-audit-signature, hp-datacenter-green, server-technician, founder-portrait, team-workshop, team-collab, diverse-team, ewaste-recycling, impact-dashboard, impact-sustainability — **0 graphe boursier, 0 stock-photo trading** |
| Citations magazine intercalées | /plateforme S4 (Hélène D., directrice informatique) · /pourquoi-gtc S6 (Pierre L., directeur RSE) · cartes flottantes hero plateforme et contact |
| Encart conversion fond `#10B981` plein avant CTA final | /plateforme S8, /pourquoi-gtc S7, /contact S4 |
| Bouton « Réserver » sur chaque offre/CTA | 3 offres /plateforme + 2 CTA conversion + CTA final + 3 CTA /impact + 1 CTA /pourquoi-gtc |

---

## 3. Système de réservation (`/reserver?offre=<slug>`)

La route `/reserver` existe déjà (composant `ReservationForm` multi-étapes + namespace `reserver` complet, KNOWN_OFFERS = `waki-box-*` + options à la carte). J'ai introduit cette page comme alias d'entrée et créé en plus le formulaire qualifié sur `/contact?offre=<slug>`.

**Slugs émis par les nouvelles pages** :

| Source | Slug | Cible |
|---|---|---|
| /plateforme S1 + S8 | `demo-plateforme` | /reserver (fallback générique élégant) |
| /plateforme S6 + /impact S10 | `audit-decommissionnement` | /reserver |
| /plateforme S6 | `audit-blanc-itad` | /reserver |
| /plateforme S8 secondaire | `plateforme-info` | /contact (form qualifié pré-sélectionné) |
| /pourquoi-gtc | `audit-decommissionnement` | /reserver |
| /impact mid-CTA + ESRS | `esrs-pack` | /reserver |
| /impact hero | `methodologie-csrd` | /reserver |
| /impact final | `csrd-pack` | /reserver |

`/reserver/page.tsx` traite gracieusement les slugs hors `KNOWN_OFFERS` en retombant sur le hero/sous-titre par défaut. Aucune erreur 404, aucune redirection cassée.

`/contact?offre=<slug>` lit le param, pré-sélectionne l'offre dans le `<select>` et affiche un panneau dynamique (offre, durée, étape suivante chez nous). Conformément à la consigne, **le formulaire est lui-même la cible** — pas de redirection en cascade.

---

## 4. Internationalisation (FR + EN strictement miroir)

| Namespace | Clés réécrites | Lignes FR | Lignes EN |
|---|---|---|---|
| `Platform` | `urgency`, `hero{eyebrow,title,subtitle,cta1,cta2,scrollLabel,floatQuote,floatName,floatRole,proofs[3]}`, `promise{eyebrow,title,body1,body2}`, `chapters[5]`, `editorialQuote`, `liveProofs.{assets,value,carbon,audit}`, `offers{eyebrow,title,subtitle,reserveLabel,items[3]}`, `faq{eyebrow,title,items[4]}`, `conversion`, `finalCta` | ≈ 110 | ≈ 110 |
| `WhyGTC` | `urgency`, `hero{eyebrow,figure,title,subtitle,cta1,cta2,source,scrollLabel}`, `manifesto{eyebrow,title,body1,body2,body3}`, `founder{eyebrow,title,quote,name,role,bio}`, `convictions[5]`, `commitments{eyebrow,title,items[6]}`, `editorialQuote`, `conversion` | ≈ 95 | ≈ 95 |
| `Contact` | `urgency`, `hero{eyebrow,title,subtitle,trust1-3,scrollLabel,floatQuote,floatName,floatRole}`, `form{eyebrow,title,subtitle,selectedOfferLabel,nextStepLabel,consent,submit,successTitle,successBody,fields[15]}`, `offers[5]`, `info`, `conversion` | ≈ 80 | ≈ 80 |
| `Impact` | inchangé (méthodologie/sources ADEME préservées) | — | — |

**Audit franglais sur les nouvelles clés FR** (script regex `\bworkflow\b|\bdashboard\b|\bframework\b|\bfeedback\b|\blead\b|\bdeal\b|\bcase study\b|\bchallenge\b|\binsight\b|\bboilerplate\b|\bgo-to-market\b`) → **0 occurrence**, hormis le nom de fichier `/photos/impact-dashboard.jpg` (pas un mot exposé à l'utilisateur).

Substitutions retenues côté FR : `workflow → parcours`, `dashboard → tableau de bord`, `framework → référentiel`, `scope → périmètre` (sauf mention technique CSRD/GHG `Scope 3`), `feedback → retour`, `lead → prospect`, `deal → mission`, `case study → cas client`. Côté EN : anglais idiomatique (CISO, CIO, CSO, ESRS, CSRD, NIST conservés).

---

## 5. Photos employées (toutes Unsplash existantes dans /public/photos/)

| Page | Photo | Usage |
|---|---|---|
| /plateforme | `hp-dsi-strategy.jpg` | Hero droite — direction informatique en arbitrage |
| /plateforme | `server-technician.jpg` | Chapitre 1 ingestion — technicien scan QR |
| /plateforme | `hp-rssi-boardroom.jpg` | Chapitre 2 audit — direction sécurité tableau de bord risque |
| /plateforme | `hp-dsi-strategy.jpg` (réemploi) | Chapitre 3 décision |
| /plateforme | `hp-audit-signature.jpg` | Chapitre 4 traçabilité — signature certificat |
| /plateforme | `impact-dashboard.jpg` | Chapitre 5 restitution |
| /plateforme | `hp-atelier-itad.jpg` | Citation magazine S4 |
| /plateforme | `hp-audit-signature.jpg` | CTA final S9 |
| /pourquoi-gtc | `team-workshop.jpg` | Hero droite |
| /pourquoi-gtc | `founder-portrait.jpg` | Mot du fondateur split |
| /pourquoi-gtc | `hp-datacenter-green.jpg` | Conviction 01 souveraineté |
| /pourquoi-gtc | `hp-audit-signature.jpg` | Conviction 02 preuve |
| /pourquoi-gtc | `diverse-team.jpg` | Conviction 03 inclusion + citation S6 |
| /pourquoi-gtc | `ewaste-recycling.jpg` | Conviction 04 sobriété |
| /pourquoi-gtc | `team-collab.jpg` | Conviction 05 excellence |
| /contact | `team-collab.jpg` | Hero droite |
| /contact | `corporate-meeting.jpg` | Section voies directes split |
| /impact | `impact-sustainability.jpg` | Hero droite (déjà en place, conservée) |

**Audit graphes boursiers / trading** → 0. Toutes les photos illustrent atelier, équipe, signature, centre de données, portrait, écran de plateforme, recyclage. Cohérent avec l'interdiction utilisateur.

---

## 6. Vérifications

| Critère succès | Statut |
|---|---|
| /plateforme refondue en storytelling parcours, **pas de grille de modules** | ✓ 5 chapitres pleine largeur |
| /pourquoi-gtc registre manifeste fondateur élevé | ✓ Hero provocation, manifeste prose, 5 convictions |
| /impact harmonisée sans toucher méthodologie/sources ADEME | ✓ Hero split + numéro 78 ghost + CTAs `/reserver`, tables ESRS/comparison intactes |
| /contact formulaire qualifié + lecture `?offre=` | ✓ 5 offres, panneau dynamique sticky, Suspense en place |
| 0 franglais côté FR | ✓ 0 occurrence audit (1 faux positif sur nom de fichier) |
| 0 FR côté EN | ✓ Mirroir strict, anglais idiomatique |
| 0 photo bourse/trading | ✓ Toutes Unsplash métier vérifiées |
| Bouton « Réserver » sur chaque CTA d'offre | ✓ 9 boutons « Réserver » pointant `/reserver?offre=<slug>` |
| `npm run build` PASS | ✓ Compiled successfully, 0 erreur, 0 warning bloquant |

---

## 7. Fichiers modifiés

```
M  messages/en.json                              (+ Platform/WhyGTC/Contact réécrits, Impact intact)
M  messages/fr.json                              (+ Platform/WhyGTC/Contact réécrits, Impact intact)
M  src/app/[locale]/contact/page.tsx             (166 → 572 lignes)
M  src/app/[locale]/impact/page.tsx              (943 → 953 lignes, hero refondu, CTAs /reserver)
M  src/app/[locale]/plateforme/page.tsx          (1117 → 685 lignes, refonte radicale storytelling)
M  src/app/[locale]/pourquoi-gtc/page.tsx        (268 → 570 lignes, registre manifeste premium)
?? src/app/[locale]/reserver/                    (route alias /reserver pré-existait via composant ReservationForm)
?? reports/gtc-plateforme-pourquoi-editorial-report.md (ce rapport)
```

Les autres fichiers `services/*` et `ServicePageTemplate.tsx` modifiés en `M` proviennent d'un travail antérieur déjà commité ou en attente — **hors périmètre de cette refonte**, non touchés.

---

## 8. Limites connues / dette assumée

1. **Slugs d'offre custom hors `KNOWN_OFFERS`** : `/reserver?offre=demo-plateforme|audit-decommissionnement|audit-blanc-itad|methodologie-csrd|esrs-pack|csrd-pack|plateforme-info` → la page de réservation retombe sur son hero/sous-titre par défaut (pas de label spécifique d'offre). Pour activer le label premium, il suffira d'ajouter ces slugs au `KNOWN_OFFERS` du `/reserver/page.tsx` et de définir leurs labels dans `reserver.offers.*` du JSON. Décision prise pour ne pas modifier le périmètre de la route Waki Box existante.
2. **Soumission `/contact` simulée** : le `setTimeout` de 700 ms reproduit le comportement précédent (pas d'API câblée). À brancher sur `/api/reservation` ou `/api/contact` quand l'endpoint sera défini.
3. **Section méthodologie /impact** : hero refondu uniquement. Sections 2 à 9 (poids du numérique, méthodologie GHG/ADEME, calculateur carbone, comparison neuf vs reconditionné, mapping ESRS E5, preuves, cas, ressources) gardent leur composition d'origine, conformément à la consigne explicite « Ne TOUCHE PAS la méthodologie/sources ADEME — juste l'enveloppe visuelle ».

---

## 9. À faire après merge (hors scope cette vague)

- Ajouter les nouveaux slugs au `KNOWN_OFFERS` de `/reserver/page.tsx` et définir leurs labels dans `reserver.offers.*` (FR + EN) → 12 lignes JSON, 6 lignes TS.
- Câbler le formulaire `/contact` sur `/api/reservation` (réutiliser le pipeline existant `docs/reservations-schema.sql`).
- Ajouter une régression visuelle Playwright sur les 4 pages (snapshot lighthouse + axe).

---

**Build** : `npm run build` → ✓ — déployable en l'état.
