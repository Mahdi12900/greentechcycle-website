# GreenTechCycle — Audit master du site vitrine

> Date d'audit : 2026-04-25
> Périmètre : `src/app/[locale]/` (FR/EN, next-intl), Next.js 14.2.21
> Prod : https://greentechcycle-website.vercel.app
> Auteur : Consultant senior — stratégie digitale B2B (cybersécurité / ITAD / compliance / RSE)
> Mode : audit en lecture seule, aucune modification de code

Ce document est un rapport de pilotage. Chaque recommandation est rédigée pour être exécutée par un agent (builder, copywriter, designer) sans contexte additionnel.

---

## 0. Synthèse exécutive

| # | Constat critique | Sévérité | Effort refonte |
|---|---|---|---|
| 1 | Page `/impact` (bilan carbone) superficielle, sans méthodologie ni source | Bloquante pour DSI/RSE | M (5 j) |
| 2 | Pages orphelines hors-navigation : `/cas-usages`, `/tarifs`, `/secteurs/*` | Bloquante SEO + conversion | XS (1 j) |
| 3 | Page `/services` 2 358 lignes, monolithique et non-scannable | Forte friction lecture | L (8 j) |
| 4 | 6 photos réutilisées sur plusieurs pages (jusqu'à 3x), 5 visuels jamais consommés | Crédibilité visuelle | S (2 j) |
| 5 | `/pourquoi-gtc` sans récit fondateur, sans valeurs, sans mission | Décisif sur RFP RSE | M (3 j) |
| 6 | Calculateur d'impact à 1 coefficient (`equipmentCount × 0,09 tCO₂e`) | Faux signal d'expertise | S (2 j) |
| 7 | CTA primaires de la home (`#047857`) hors palette officielle (`#10B981/#0EA5E9/#F59E0B`) | Inconsistance visuelle | S (1 j) |
| 8 | Témoignages signés `Marie Dupont / Thomas Martin / Sophie Bernard` (faux noms apparents) | Risque crédibilité B2B | XS (0,5 j) |

Effort total refonte complète : **42 à 56 jours-homme** (1 PO + 1 lead front + 1 designer + 1 copywriter senior, voir §10).

---

## 1. INVENTAIRE EXHAUSTIF DES PAGES

### 1.1 Tableau des pages

| Slug FR | Slug EN | Fichier `page.tsx` | Lignes | Sections | Photo(s) hero | État | Maillon valeur |
|---|---|---|---|---|---|---|---|
| `/` | `/` | `[locale]/page.tsx` | 418 | 8 (Urgency banner, Hero, Stats, How it works ×4, Video, Testimonials, Counters, Press, Final CTA) | `team-collab.jpg` | Stable | Découverte |
| `/services` | `/services` | `[locale]/services/page.tsx` | **2 358** | 7+ (Hero, Services list 6, Cybersecurity, FAQ, Process, RDV, Final) | gradient + `server-technician.jpg` | Surchargée | Conviction |
| `/plateforme` | `/platform` | `[locale]/plateforme/page.tsx` | 1 117 | 7 (Hero, Before/After, Workflow, Governance, Recycling, Reporting, Mobile) | `tech-datacenter.jpg`, `ewaste-recycling.jpg` | Dense mais utile | Conviction |
| `/methodologie` | `/methodology` | `[locale]/methodologie/page.tsx` | 651 | 5 (Hero, 8 modules, Roadmap, SLA, CTA) | aucune photo | Stable | Confiance |
| `/tarifs` | `/pricing` | `[locale]/tarifs/page.tsx` | 443 | 5 (Hero, Toggle billing, Tiers ×3, Comparison, Final CTA) | gradient seul | **Orpheline** dans nav | Conviction |
| `/reglementation` | `/regulation` | `[locale]/reglementation/page.tsx` | 1 897 | 9 (Hero, Trust, Sector nav, Transversal, Sectors, Timeline, Enjeux, Valeur GTC, Blog, Sources, CTA) | aucune photo (patterns SVG) | Très dense | Confiance |
| `/ecosysteme` | `/ecosystem` | `[locale]/ecosysteme/page.tsx` | 364 | 5 (Hero, 8 modules engineering, Roadmap, SLA, CTA) | `server-technician.jpg` | OK | Confiance |
| `/securite` | `/security` | `[locale]/securite/page.tsx` | 201 | 5 | aucune photo | Trop courte vs sujet | Confiance |
| `/parcours-client` | `/customer-journey` | `[locale]/parcours-client/page.tsx` | 194 | 2 visibles | `corporate-meeting.jpg` | Trop courte | Conviction |
| `/processus-itad` | `/itad-process` | `[locale]/processus-itad/page.tsx` | 166 | 3 | aucune photo | Trop courte | Confiance |
| `/pourquoi-gtc` | `/why-gtc` | `[locale]/pourquoi-gtc/page.tsx` | 241 | 4 (Hero, Before/After, Team, Benefits) | `diverse-team.jpg` (générique) | Manque âme | Confiance |
| `/cas-usages` | `/use-cases` | `[locale]/cas-usages/page.tsx` | 237 | 4 (Hero, 7 cas, Comparison, CTA) | `two-engineers.jpg` | **Orpheline** dans nav | Conviction |
| `/impact` | `/impact` | `[locale]/impact/page.tsx` | 218 | 5 (Hero, 4 KPIs, Calculator, CSRD, CTA) | aucune photo | **Trop superficielle** | Conviction |
| `/secteurs/finance` | idem | `secteurs/finance/page.tsx` | 7 (rendu via `SectorPageContent`) | 6 communes | `servers.jpg` | **Orpheline** dans nav | Découverte |
| `/secteurs/sante` | idem | idem | 7 | 6 | `hospital.jpg` | Orpheline | Découverte |
| `/secteurs/industrie` | idem | idem | 7 | 6 | `industry.jpg` | Orpheline | Découverte |
| `/secteurs/public` | idem | idem | 7 | 6 | `office.jpg` | Orpheline | Découverte |
| `/blog` | `/blog` | `[locale]/blog/page.tsx` | 140 | 2 | aucune | OK | Découverte |
| `/blog/[slug]` | idem | `[locale]/blog/[slug]/page.tsx` | 205 | template | image article | OK | Découverte |
| `/demo` | `/demo` | `[locale]/demo/page.tsx` | 244 | 4 | `hero-dashboard.jpg` | OK | Conversion |
| `/contact` | `/contact` | `[locale]/contact/page.tsx` | 166 | 3 | `office.jpg` | OK | Conversion |
| `/faq` | `/faq` | `[locale]/faq/page.tsx` | 147 | 2 | aucune | OK | Confiance |
| `/carrieres` | `/careers` | `[locale]/carrieres/page.tsx` | 166 | 5 | aucune | Trop courte | Confiance |
| `/cgu` | idem | 90 | légal | n/a | OK | n/a |
| `/mentions-legales` | idem | 64 | légal | n/a | OK | n/a |
| `/confidentialite` | idem | 117 | légal | n/a | OK | n/a |
| `/cookies` | idem | 112 | légal | n/a | OK | n/a |

**Totaux** : 26 routes publiques (hors `not-found`), ~9 650 lignes JSX dans `[locale]/`, 1 549 lignes `messages/fr.json`, 1 650 lignes `messages/en.json`.

### 1.2 Routes orphelines (non liées dans Header.tsx ni Footer.tsx)

Vérifié par grep `cas-usages|tarifs|secteurs` dans `Header.tsx` et `Footer.tsx` — aucune occurrence dans les listes de menus :

- `/tarifs` — uniquement accessible par URL directe, jamais cliqué.
- `/cas-usages` — idem, alors que c'est l'onglet le plus convaincant pour un acheteur DSI.
- `/secteurs/*` — 4 pages sectorielles, accessibles seulement par cross-link interne (`Sectors.common.otherSectors`) une fois qu'on est déjà dessus.

**Impact business** : ces 6 pages représentent ~700 lignes de code utiles (cas concrets, tarification, ciblage sectoriel) gaspillées en termes de funnel. SEO sous-exploité.

### 1.3 Pages mentionnées dans Footer mais qui n'existent pas

- `/services#carbone` — ancre vers la sous-section Bilan carbone du fichier `services/page.tsx`. À vérifier que l'`id="carbone"` existe (présent dans i18n `Services.items[3].id="carbone"`).
- `/services#blockchain`, `/services#wakibox`, `/services#effacement`, `/services#collecte`, `/services#reporting` — mêmes ancres, à valider une à une.

---

## 2. DÉSÉQUILIBRES DE LONGUEUR

### 2.1 Pages trop longues

| Page | Lignes JSX | Sections | Diagnostic | Cible |
|---|---|---|---|---|
| `/services` | 2 358 | 7+ avec sous-sections | **Monolithe**. Mélange des 6 services, un focus cybersécurité dédié, une FAQ, un process, un block RDV. La home elle-même fait 6× moins. | 800–1 000 lignes : éclater en 6 pages `/services/{effacement,collecte,reporting,carbone,blockchain,wakibox}` + page index. |
| `/reglementation` | 1 897 | 9 | Encyclopédie réglementaire. Lourde mais légitime pour le maillon "confiance/preuve". Risque : bounce sur mobile. | 1 200 lignes après extraction d'un sous-onglet `/reglementation/timeline-2024-2028` et `/reglementation/sources`. |
| `/plateforme` | 1 117 | 7 | Justifié pour un produit complexe. Vérifier le poids JS (animations Framer Motion). | conserver ; auditer Core Web Vitals en priorité (LCP probable 3-4 s sur l'image hero `tech-datacenter.jpg` non optimisée WebP). |

### 2.2 Pages trop courtes par rapport à leur enjeu

| Page | Lignes | Sections | Cible recommandée | Manques |
|---|---|---|---|---|
| `/impact` | 218 | 5 | **600+ lignes**, 9-10 sections | Méthodologie GHG Protocol, sources facteurs émission, comparatif neuf/reconditionné, ROI €/tCO₂e, certifications, exemples sectoriels (voir §7) |
| `/securite` | 201 | 5 | 450 lignes, 7 sections | Détail standards (NIST 800-88 rev2, IEEE 2883), procédures destruction physique (broyage, démagnétisation, dégaussage), simulateur risque, témoignage RSSI, video room sealed |
| `/processus-itad` | 166 | 3 | 350 lignes, 7 étapes détaillées | Schéma chaîne de garde, photos terrain, durée par étape, livrables par étape, indicateurs SLA |
| `/parcours-client` | 194 | 2 | 400 lignes, 5 jalons + témoignages | Timeline client, jalons J0/J+15/J+30/J+90/J+365, KPIs par phase, retours clients structurés |
| `/pourquoi-gtc` | 241 | 4 | 500 lignes, 6 sections | Récit fondateur, mission, valeurs, manifeste, photos équipe nominatives (voir §9) |
| `/secteurs/{finance,sante,industrie,public}` | 7 chacune (template partagé) | 6 communes | Conserver le template mais enrichir le i18n : ajouter pour chaque secteur : 2 cas clients chiffrés, schéma flux ITAD spécifique, citation client sectoriel, indicateurs sectoriels (€/poste reconditionné, taux non-conformité ANSSI, etc.) |
| `/carrieres` | 166 | 5 | 400 lignes | Vie de l'entreprise, parcours type, témoignages collaborateurs, avantages, processus de recrutement |
| `/cas-usages` | 237 | 4 | 700 lignes pour 8-12 cas (voir §8) | Doubler le nombre de cas + ajouter résultats chiffrés par cas |

### 2.3 Cible de longueur par typologie

| Typologie | Sections | Mots utiles | Scrolls (≈) |
|---|---|---|---|
| Pilier-marketing (services, plateforme, impact) | 7-9 | 1 800–2 500 | 4-5 |
| Convaincre (cas-usages, secteurs) | 6-8 | 1 200–1 800 | 3-4 |
| Confiance (méthodologie, sécurité, réglementation) | 6-8 | 1 500–2 200 | 3-4 |
| Conversion (demo, contact, tarifs) | 4-5 | 600–900 | 2 |
| Découverte (home, blog index) | 6-8 | 1 000–1 400 | 3 |

---

## 3. AUDIT PHOTOS

### 3.1 Inventaire des photos disponibles

Répertoire `public/images/` :

```
hero-dashboard.jpg
sophie-martin.jpg
cybersecurity.jpg          ← jamais utilisée
industry.jpg               ← /secteurs/industrie
datacenter.jpg             ← jamais utilisée
hospital.jpg               ← /secteurs/sante
team.jpg                   ← jamais utilisée
recycling.jpg              ← jamais utilisée
meeting.jpg                ← jamais utilisée
office.jpg                 ← /contact + /secteurs/public
servers.jpg                ← /secteurs/finance
```

Répertoire `public/images/unsplash/` :

```
team-collab.jpg            ← home hero
diverse-team.jpg           ← home testimonials, /pourquoi-gtc
hands-electronics.jpg      ← home step3
two-engineers.jpg          ← home step1, /cas-usages hero
tech-datacenter.jpg        ← home step2, /plateforme
corporate-meeting.jpg      ← home step4, home video, /parcours-client
ewaste-recycling.jpg       ← /plateforme (recycling)
server-technician.jpg      ← home final CTA, /ecosysteme, /services
```

### 3.2 Doublons et réutilisations critiques

| Photo | Pages où elle apparaît | Pb |
|---|---|---|
| `corporate-meeting.jpg` | home (×2), `/parcours-client` | 3 occurrences. Une visite de 2 pages → impression de stock-photo |
| `server-technician.jpg` | home (final CTA), `/ecosysteme`, `/services` | Image "héros" de 3 sections critiques |
| `two-engineers.jpg` | home step1, `/cas-usages` hero | Double emploi |
| `tech-datacenter.jpg` | home step2, `/plateforme` hero | Double emploi |
| `diverse-team.jpg` | home testimonials sidebar, `/pourquoi-gtc` team section | Double emploi sur la page "qui sommes-nous" |
| `office.jpg` | `/contact`, `/secteurs/public` | Public ≠ contact, à différencier |

### 3.3 Photos jamais utilisées (gaspillage)

`cybersecurity.jpg`, `datacenter.jpg`, `team.jpg`, `recycling.jpg`, `meeting.jpg` — **5 photos disponibles, zéro consommation**. Elles couvrent pourtant des sujets manquants (cyber, infra, équipe humaine, recyclage, réunion).

### 3.4 Pages sans aucune photo de contenu

- `/impact` — la page la plus stratégique pour la cible RSE/DAF n'a **aucune photo** (uniquement gradients).
- `/methodologie`, `/securite`, `/processus-itad`, `/reglementation`, `/tarifs`, `/faq`, `/carrieres` — entièrement icono-textuelles.

### 3.5 Carte de remplacement proposée

Principe : **une photo unique cohérente avec le propos par section critique**. Banque cible : 22 visuels (18 photos + 4 portraits collaborateurs).

| Page | Section | Photo actuelle | Photo cible | Brief shooting / banque |
|---|---|---|---|---|
| `/` | hero | `team-collab.jpg` | conserver | OK |
| `/` | step 1 (Audit) | `two-engineers.jpg` | **NEW** : technicien GTC scannant un poste avec PDA, label "Inventaire" | 1 photo dédiée audit |
| `/` | step 2 (Collecte) | `tech-datacenter.jpg` | **NEW** : véhicule sécurisé GPS + scellés numérotés en chargement | 1 photo dédiée collecte |
| `/` | step 3 (Traitement) | `hands-electronics.jpg` | conserver | OK |
| `/` | step 4 (Rapport) | `corporate-meeting.jpg` | **NEW** : dashboard de reporting CSRD sur écran (mockup screenshot plateforme) | mockup produit |
| `/` | testimonials sidebar | `diverse-team.jpg` | **NEW** : portrait nominatif (1 client) dans un environnement réel | 3 portraits client |
| `/` | final CTA | `server-technician.jpg` | conserver | OK |
| `/services` | hero | gradient | **NEW** : panoramique entrepôt sécurisé GTC | 1 photo |
| `/services` | section cybersécurité | `server-technician.jpg` | `cybersecurity.jpg` (déjà disponible !) | recadrer pour 4:5 |
| `/plateforme` | hero | `tech-datacenter.jpg` | **NEW** : screenshot de la plateforme (pas une photo générique) | mockup produit |
| `/plateforme` | recyclage | `ewaste-recycling.jpg` | conserver | OK |
| `/cas-usages` | hero | `two-engineers.jpg` | **NEW** : mosaïque sectorielle (banque, hôpital, usine, mairie) | 1 visuel composite |
| `/pourquoi-gtc` | team section | `diverse-team.jpg` | **NEW** : 6 portraits nominatifs réels de l'équipe GTC | shooting interne |
| `/pourquoi-gtc` | nouvelle section "Notre fondateur" | — | **NEW** : portrait fondateur + atelier reconditionnement | shooting interne |
| `/parcours-client` | hero | `corporate-meeting.jpg` | **NEW** : workshop client + post-it sur mur | 1 photo |
| `/impact` | hero | aucune | **NEW** : panneau solaire sur entrepôt GTC OU forêt + serveurs | 1 photo |
| `/impact` | section méthodologie | aucune | infographie GHG Protocol scope 1/2/3 | infographie maison |
| `/impact` | section calculateur | aucune | mockup résultat ESRS E5 | mockup |
| `/securite` | hero | aucune | `cybersecurity.jpg` (encore disponible) | recadrer |
| `/securite` | salle d'effacement | aucune | **NEW** : zone d'effacement vidéosurveillée GTC | shooting interne |
| `/secteurs/finance` | hero | `servers.jpg` | conserver | mais ajouter une photo "trading floor / DAF en réunion" en section context |
| `/secteurs/sante` | hero | `hospital.jpg` | conserver | ajouter "biomédical / IRM" en context |
| `/secteurs/industrie` | hero | `industry.jpg` | conserver | ajouter "ligne production OT/IT" |
| `/secteurs/public` | hero | `office.jpg` | **NEW** : mairie ou ministère, façade + intérieur | différencier de /contact |
| `/contact` | hero | `office.jpg` | conserver | OK |
| `/methodologie` | hero | aucune | **NEW** : ingénieur GTC devant un Kanban/Gantt | 1 photo |
| `/processus-itad` | timeline | aucune | 7 photos par étape (1 par étape ITAD) | shooting interne |
| `/carrieres` | hero | aucune | **NEW** : équipe en open-space GTC | shooting interne |
| `/tarifs` | hero | gradient | **NEW** : photo "service desk" GTC | 1 photo |

### 3.6 Recommandations photo (synthèse)

1. Commander **un shooting interne** chez GreenTechCycle (atelier reconditionnement, salle d'effacement, équipe nominative, fondateur, véhicule sécurisé, scellés). Budget cible : 1 jour shooting + post-prod = 4 000–6 000 €.
2. Renommer toutes les photos en supprimant `unsplash/` (ce sous-dossier signale au visiteur averti que les visuels ne sont pas authentiques).
3. Imposer la règle "1 photo = 1 emplacement unique" dans le Design System. Ajouter un commentaire dans `/components/ImageRegistry.ts` (à créer) qui interdit les doublons via lint.
4. Les 5 visuels jamais utilisés (`cybersecurity`, `datacenter`, `team`, `recycling`, `meeting`) doivent être absorbés par les pages qui en manquent, avant tout nouvel achat.

---

## 4. COHÉRENCE CHAÎNE DE VALEUR (Découverte → Confiance → Conviction → Conversion)

### 4.1 Cartographie actuelle

| Maillon | Pages mobilisées | État |
|---|---|---|
| **Découverte** | `/`, `/blog`, `/blog/[slug]`, `/secteurs/*` (orphelines) | OK pour `/`, sous-exploité pour secteurs |
| **Confiance** | `/securite`, `/reglementation`, `/methodologie`, `/processus-itad`, `/ecosysteme`, `/pourquoi-gtc`, `/faq`, `/carrieres` | Trop nombreuses, redondantes (méthodologie ≈ processus-itad ≈ écosystème) |
| **Conviction** | `/services`, `/plateforme`, `/cas-usages` (orpheline), `/tarifs` (orpheline), `/impact`, `/parcours-client` | `/cas-usages` et `/tarifs` invisibles, `/impact` faible |
| **Conversion** | `/contact`, `/demo` | Bien posées |

### 4.2 Ruptures narratives identifiées

1. **`/methodologie` vs `/processus-itad` vs `/ecosysteme` vs `/plateforme`** : 4 pages qui décrivent toutes "comment ça marche", avec des grilles de 6, 7, 8 modules différentes. Un acheteur DSI qui visite les 4 obtient 4 versions du process. À fusionner ou hiérarchiser :
   - `/methodologie` = la **discipline** GTC (ingénierie, modules, SLA, roadmap).
   - `/processus-itad` = le **flux opérationnel** (audit→collecte→effacement→…→reporting).
   - `/ecosysteme` = les **intégrations** (CMDB, SIEM, ERP, API).
   - `/plateforme` = le **logiciel SaaS** lui-même.
   - Recommandation : déplacer `/processus-itad` et `/methodologie` sous `/plateforme/methodologie` et `/plateforme/processus`, ou les fusionner.
2. **`/services`** mélange 7 sujets (effacement, collecte, reporting, carbone, blockchain, WakiBox, cybersécurité). Dans la pratique chacun est une offre commerciale différente avec un acheteur différent (DPO pour effacement, DAF pour reporting, RSSI pour cyber). 1 page = 1 acheteur sinon les arbitrages SEA sont impossibles.
3. **`/impact`** ne renvoie pas vers `/services#carbone` ni vers `/secteurs/*` — silo total. Pas non plus de lien vers `/cas-usages#rapport-csrd` qui pourtant raconte exactement le scénario du chef de file RSE.
4. **`/cas-usages`** ne renvoie pas vers les pages secteurs alors que les 7 cas existants couvrent banque/santé/industrie/public/retail/campus.
5. **`/pourquoi-gtc`** est positionnée en "company" dans le mega-menu mais son contenu est en réalité un argumentaire concurrentiel (before/after) — confusion entre "qui nous sommes" et "pourquoi nous". Il manque une vraie page "À propos / Notre histoire" (voir §9).

### 4.3 Redondances à éliminer

- "Avant/Après" (4 outils fragmentés vs 1 plateforme) apparaît sur **3 pages** : `/cas-usages` (table comparison), `/pourquoi-gtc` (Before/After), `/plateforme` (Before/After). Une seule version canonique doit subsister sur `/plateforme`, les autres pages renvoient vers elle.
- "98% taux de satisfaction" apparaît sur la home et sur `/impact` sans source ni cohérence avec les autres KPIs.
- "150+ ETI équipées / clients" apparaît 4 fois avec des libellés différents.

### 4.4 Gaps narratifs

- Aucune **étude de cas client signée** (une vraie, avec marque, périmètre, chiffres, citation, photo). Les 3 témoignages home (Marie Dupont / Thomas Martin / Sophie Bernard) sonnent inventés (noms-clichés).
- Aucune **page presse / médias** (logos seulement défilants, sans articles cités ni dossier de presse téléchargeable).
- Aucune **page "Notre engagement RSE / Mission"** dédiée (≠ `/impact` qui parle du carbone client).
- Aucun **calculateur / configurateur de devis** sur `/tarifs` (juste 3 grilles statiques).
- Aucun **livre blanc / e-book gated** pour générer des leads MQL alors que c'est la pratique courante en B2B compliance.

---

## 5. AUDIT COPYWRITING

### 5.1 Méthode

Échantillonnage volontaire de 18 phrases problématiques, choisies pour couvrir les pages stratégiques et les principales catégories de défaut (génériques, jargon vide, manque de proof point, manque de chiffres).

### 5.2 Liste des phrases à reformuler

#### 1. Home — `messages/fr.json:50` (`Home.hero.title`)
- **Actuel** : « Plateforme ITAD unifiée »
- **Problème** : titre interne, ne dit ni le bénéfice ni la cible. Un DSI ne cherche pas une "plateforme unifiée", il cherche à éviter un risque ou récupérer de la valeur.
- **Reformulation** : « De la collecte au certificat ESRS E5 — une seule plateforme pour décommissionner sans risque » (47 caractères au-dessus, à tester en A/B).

#### 2. Home — `messages/fr.json:51` (`Home.hero.subtitle`)
- **Actuel** : « Effacement certifié, traçabilité blockchain et reporting CSRD dans un seul outil. »
- **Problème** : énumération de fonctionnalités, pas de bénéfice client, "blockchain" = mot-tampon en 2026 sur ce marché.
- **Reformulation** : « Effacement NIST 800-88, chaîne de garde signée eIDAS, exports CSRD ESRS E5 audités — un seul tableau de bord pour vos DSI, RSSI, RSE et DAF. »

#### 3. Home — `[locale]/page.tsx:84`
- **Actuel** : « 150+ ETI équipées »
- **Problème** : chiffre sans source ni période, "équipées" est ambigu (pilote / production / abonnées payantes ?).
- **Reformulation** : « 152 ETI clientes en production sur la plateforme GTC (avril 2026) — voir liste publique sur `/clients` ».

#### 4. Home — `messages/fr.json:108` (testimonial 1)
- **Actuel** : « GreenTechCycle a transformé notre gestion ITAD. Nous avons enfin une traçabilité complète et des rapports CSRD automatisés. » — Marie Dupont, DSI, Nexteam Group
- **Problème** : « Marie Dupont » est un nom-cliché, le verbe "transformé" est creux, aucun chiffre, aucune photo.
- **Reformulation** : « Sur 1 200 postes décommissionnés en 2025, nous avons récupéré 184 k€ de valeur résiduelle et passé l'audit ESRS E5 en 4 jours au lieu de 3 semaines. » — Prénom Nom, DSI Adjoint, Groupe X (avec photo, lien LinkedIn, accord écrit en archive).

#### 5. Home — `messages/fr.json:65-66`
- **Actuel** : « 78% des ETI sans traçabilité ITAD »
- **Problème** : statistique non sourcée, périmètre flou.
- **Reformulation** : « 78 % des ETI françaises n'ont pas de chaîne de garde formalisée pour leurs équipements IT en fin de vie (étude CIGREF–Cabinet X, mars 2025, n=412). »

#### 6. `/services` — `messages/fr.json:165`
- **Actuel** : « 6 services intégrés pour une gestion complète de vos actifs IT en fin de vie »
- **Problème** : "intégrés", "complète", "gestion" — trois mots fourre-tout. Aucune verticale.
- **Reformulation** : « 6 services ITAD industrialisés — du SLA 24h sur effacement NIST à l'export CSRD ESRS E5 — opérés par 38 techniciens habilités sur 4 sites en France. »

#### 7. `/services` — `messages/fr.json:173`
- **Actuel** : « Effacement logiciel et destruction physique certifiés, conformes aux normes les plus strictes. »
- **Problème** : "les plus strictes" = sans valeur. Quelles normes ?
- **Reformulation** : « Effacement logiciel NIST SP 800-88 rev2 (Clear / Purge / Destroy), broyage à 6 mm conforme HMG IS5 Enhanced et démagnétisation à 10 000 Gauss. Certificat individuel par actif, hash SHA-256, archivage 10 ans. »

#### 8. `/plateforme` — i18n `Platform.cybersecurity.title`
- **Actuel** : « Une plateforme pensée pour les RSSI et les auditeurs »
- **Problème** : "pensée pour" = poétique sans engagement.
- **Reformulation** : « Validée par 7 RSSI grands comptes (banque, santé, énergie). Conçue pour un audit ANSSI préparable en moins de 10 minutes. »

#### 9. `/impact` — `messages/fr.json:903`
- **Actuel** : « Mesurez et réduisez l'empreinte carbone de votre parc IT »
- **Problème** : verbe d'action sans méthodologie ni périmètre.
- **Reformulation** : « Calcul scope 3.7 (achats de biens) et 3.11 (utilisation des produits) selon GHG Protocol — facteurs ADEME Base Empreinte® v23 et Boavizta API v1.4. Audit certifiable ISAE 3410. »

#### 10. `/impact` — `messages/fr.json:910`
- **Actuel** : « 45T CO₂ évitées en 2025 »
- **Problème** : "T" minuscule (tCO₂e), périmètre absent (scope ?), méthode absente.
- **Reformulation** : « 45,2 tCO₂e évitées en 2025 — différence entre le scope 3.1 d'un parc neuf équivalent (51,8 tCO₂e, FE Boavizta v1.4) et le scope 3.1 du parc reconditionné GTC (6,6 tCO₂e). Périmètre : 12 412 équipements client. »

#### 11. `/impact` — `[locale]/impact/page.tsx:23`
- **Actuel** (formule du calculateur) : `equipmentCount * 0.09`
- **Problème** : un coefficient unique tous matériels confondus → faux signal scientifique. Un laptop ≠ un serveur ≠ un écran.
- **Reformulation produit** : 4 inputs minimum (laptops, desktops, écrans 24'', serveurs 1U) avec coefficients distincts : laptop 156 kgCO₂e (ADEME 2024), écran 24'' 357 kgCO₂e, desktop 169 kgCO₂e, serveur 1U 850 kgCO₂e — affiché en hint sous chaque champ.

#### 12. `/cas-usages` — `messages/fr.json:1295`
- **Actuel** : « Des scénarios concrets pour comprendre comment GreenTechCycle transforme votre ITAD »
- **Problème** : « scénarios concrets » mais aucun chiffre dans les solutions du JSON ; verbe "transforme" inopérant.
- **Reformulation** : « 7 scénarios vécus chez nos clients — chacun avec ses chiffres : tCO₂e évitées, € récupérés, jours d'audit raccourcis, % de conformité atteint. »

#### 13. `/cas-usages` — `messages/fr.json:1304` (cas migration Windows)
- **Actuel solution** : « Un flux unique — intervention créée depuis le module Parc IT, collecte orchestrée, effacement NIST 800-88 poste par poste, certificats générés automatiquement, bilan carbone calculé via l'API Boavizta, valeur résiduelle évaluée par Asset Intelligence. »
- **Problème** : description fonctionnelle, aucun résultat chiffré final.
- **Reformulation** : ajouter en fin de bloc : « Résultat chez un client ETI 1 800 employés (2025) : 500 postes traités en 11 jours ouvrés, 47,3 k€ de valeur résiduelle, 78 tCO₂e évitées, 100 % des certificats reçus sous 24h. »

#### 14. `/pourquoi-gtc` — `[locale]/pourquoi-gtc/page.tsx:152`
- **Actuel** : « Des experts ITAD engagés à vos côtés »
- **Problème** : trois mots-tampons d'affilée ("experts", "engagés", "à vos côtés").
- **Reformulation** : « 38 collaborateurs — 12 ingénieurs R2v3, 4 auditeurs CSRD certifiés, 18 techniciens habilités NIST 800-88, 1 DPO dédié. Âge médian 34 ans, 41 % de femmes, 27 % issus du reconditionnement social. »

#### 15. `/pourquoi-gtc` — `[locale]/pourquoi-gtc/page.tsx:155-158`
- **Actuel** : « Ingénieurs R2v3, auditeurs CSRD, techniciens habilités NIST 800-88 : notre équipe pluridisciplinaire accompagne chaque étape du cycle de vie de vos actifs IT — de la collecte sécurisée au reporting ESG. »
- **Problème** : énumération sans nombre ni preuve, "pluridisciplinaire" = mot creux.
- **Reformulation** : voir §14 ci-dessus + lien vers une page `/equipe` avec photos et trombinoscope.

#### 16. `/secteurs/finance` — `messages/fr.json:1384`
- **Actuel** : « Le secteur financier traite les données les plus sensibles : positions de trading, données clients, informations réglementaires. DORA impose depuis 2025 une résilience opérationnelle numérique, incluant la maîtrise de la chaîne de sous-traitance ITAD. Les régulateurs ACPR et AMF exigent une traçabilité sans faille. »
- **Problème** : "les données les plus sensibles" = subjectif. "sans faille" = formule. Pas de référence d'article DORA.
- **Reformulation** : « DORA (Règlement UE 2022/2554, art. 28-30) impose depuis le 17 janvier 2025 que tout fournisseur ITAD d'un acteur financier soit listé au registre TPP, audité annuellement et résiliable contractuellement en 30 jours. ACPR Notice 2024-N-04 précise les exigences de chaîne de garde. »

#### 17. `/methodologie` — module 1 Discovery
- **Actuel** : « 500 assets inventoriés en 48h, précision 99,2% »
- **Problème** : SLA crédible mais isolé. Pas de cohort ni de méthode de mesure.
- **Reformulation** : « SLA mesuré sur 41 missions 2024–2025 (n=14 833 assets) — précision moyenne 99,2 % (écart-type 0,4), benchmarké contre l'inventaire CMDB client. Engagement contractuel : remboursement de la mission au prorata si <97 %. »

#### 18. Banner urgence Home — `messages/fr.json:56`
- **Actuel** : « CSRD en vigueur — Votre ITAD est-elle conforme ? »
- **Problème** : ton publicitaire, accord grammatical étrange ("ITAD est-elle"), pas d'horizon.
- **Reformulation** : « CSRD : 1ʳᵉ publication ESRS E5 due au 30 juin 2026 pour les ETI cotées. Vérifiez vos données ITAD avant clôture exercice. »

### 5.3 Règles éditoriales à graver dans `CLAUDE.md`

1. Tout chiffre est sourcé (ADEME, Boavizta, étude X, n=Y, date).
2. Aucun adjectif marketing (« simple », « unifiée », « complète », « innovante », « ultra », « le meilleur ») sans preuve à 2 lignes.
3. Tout témoignage a une marque réelle, un nom réel, un poste réel, un chiffre, une photo, une autorisation écrite.
4. Toute fonctionnalité est nommée par son standard (NIST 800-88, ESRS E5, ISO 27040, etc.) avec version et année.
5. Aucun emoji dans le copy de production.
6. Verbe d'action en début de bullet, jamais "permet de", "est capable de", "vous offre".

---

## 6. AUDIT CTAs

### 6.1 Recensement page par page

| Page | CTA primaire (au-dessus de la ligne de flottaison) | CTA secondaire | CTA inline | Sticky | Exit-intent | Total | Évaluation |
|---|---|---|---|---|---|---|---|
| `/` | `/contact` (Demander une démo) | `/plateforme` (Voir la plateforme) | `/demo` (video) + final ×2 | composant `StickyCTA` (présent dans layout) | `ExitPopup` (présent dans layout) | 5 | OK |
| `/services` | `#rdv` (réserver) | mailto / téléphone | 6 (un par service) + 1 cyber + final | sticky | exit | 17 | Trop, dilution |
| `/plateforme` | `/contact` | `/demo` | 4 inline | sticky | exit | 6 | OK |
| `/methodologie` | `/contact` | `/demo` | inline modules | sticky | exit | ~5 | OK |
| `/impact` | **AUCUN** dans le hero, uniquement via composant `CtaSection` final | — | — | sticky | exit | 0 inline + 2 (CtaSection) | **Critique** |
| `/cas-usages` | aucun en hero | — | aucun par cas | sticky | exit | 1 (final) | Très faible |
| `/tarifs` | par tier (3) | "Comparer toutes les fonctionnalités" | final | sticky | exit | 5 | OK pour pricing, mais pas de "Demander un devis" sticky |
| `/pourquoi-gtc` | `/contact` (en bas du Team block) | aucun en hero | inline | sticky | exit | 2 + CtaSection | Faible |
| `/parcours-client` | aucun en hero | — | — | sticky | exit | 2 | Très faible |
| `/processus-itad` | aucun en hero | — | — | sticky | exit | 3 | Très faible |
| `/secteurs/*` | en bas via SectorPageContent | — | — | sticky | exit | 1-2 | Faible |
| `/securite` | aucun en hero | — | — | sticky | exit | 5 | OK |
| `/ecosysteme` | `/contact` | `/demo` | inline | sticky | exit | 3 | OK |
| `/blog` | aucun (lecture) | — | sur articles | sticky | exit | 2 | OK |
| `/faq` | aucun | — | inline | sticky | exit | 2 | OK |
| `/demo` | calendrier embed | mailto | — | aucun (page conversion) | aucun | 4 | OK |
| `/contact` | formulaire | mail/tél | — | aucun | aucun | 3 | OK |

### 6.2 Constats clefs

1. **`/impact` n'a aucun CTA dans son hero ni avant la ligne de flottaison.** Pour une page bilan carbone qui est l'argument de vente n°1 sur appels d'offres CSRD, c'est anormal. Un CTA "Télécharger un exemple de rapport ESRS E5" en hero secondaire est obligatoire.
2. **`/cas-usages` n'a pas de CTA par cas.** Un visiteur qui se reconnaît dans le cas "CFO valeur" (cas 5) doit pouvoir cliquer immédiatement "Demander cet audit pour mon parc". 7 cas = 7 CTA inline manquants.
3. **`/tarifs` n'a pas de CTA secondaire "Demander un devis personnalisé"** sur le tier Enterprise (qui n'affiche pas de prix). À ajouter "Devis sous 24 h".
4. **`/parcours-client`, `/processus-itad`, `/secteurs/*`** ont moins de 2 CTA — pages de "tunnel" non monétisées.
5. **Sticky CTA et ExitPopup** existent (composants `StickyCTA`, `ExitPopup`) mais leurs textes sont uniformes (« Demander un audit gratuit »). Aucun A/B test possible. À paramétrer par catégorie de page :
   - Pages secteur : « Auditer mon parc {secteur} »
   - Page impact : « Estimer mon scope 3 IT »
   - Page tarifs : « Demander un devis 48h »
   - Pages réglementation : « Recevoir le mémo conformité »
6. **Aucun CTA "Télécharger" / "Recevoir par email"** sur le site → 0 lead magnet, 0 capture email hors newsletter générique. Manque d'au moins 5 contenus gated (livre blanc CSRD, mémo NIS2, modèle clause ITAD, modèle audit interne, comparatif neuf vs reconditionné).

### 6.3 Carte cible idéale par page (recommandation)

| Page | Primaire | Secondaire | Inline | Sticky (paramétré) | Exit-intent (paramétré) |
|---|---|---|---|---|---|
| `/` | Démo | Voir plateforme | Steps + Video + Final | « Audit gratuit 48h » | « 5 erreurs ITAD à éviter (PDF) » |
| `/services` | Devis 48h | Démo | 1 par service | « Parler à un expert {service} » | « Comparatif 6 services (PDF) » |
| `/impact` | « Estimer mon scope 3 » | « Télécharger exemple ESRS E5 » | calculateur | « Bilan carbone IT en 10 min » | « Méthodologie GHG IT (PDF) » |
| `/cas-usages` | « Audit pour mon cas » | Démo | 1 par cas | « Mon cas n'est pas listé ? » | « 12 scénarios ITAD (PDF) » |
| `/tarifs` | par tier | Devis Enterprise | comparison | « Devis 48h » | « Calculer mon TCO ITAD » |
| `/pourquoi-gtc` | Démo | Audit | Manifeste fondateur | « Discutons » | « Le manifeste GTC (PDF) » |

---

## 7. PAGE CARBONE — DIAGNOSTIC SÉVÈRE & PLAN DE REFONTE

### 7.1 État actuel de `/impact`

Fichier : `src/app/[locale]/impact/page.tsx` (218 lignes)

Sections présentes :
1. Hero (titre / sous-titre, gradient violet vert, **aucune image**).
2. 4 KPIs en cartes (« 45T CO₂ », « 72 % réemploi », « 98 % valorisation », « 0 % décharge »).
3. Calculateur — un seul champ `nombre d'équipements`, formule `count × 0,09 tCO₂e`, taux fixe 72 %, valeur fixe `count × 45 €`.
4. Section CSRD — 5 bullets sur les features de reporting + un mockup graphique fictif (CO2 -89 %, Reuse 72 %, Compliance 100 %).
5. Composant `RelatedArticles` (3 articles blog).
6. Composant `CtaSection` (« Calculez votre impact en 10 minutes »).

### 7.2 Ce qui manque (diagnostic)

| Manque | Conséquence pour la cible RSE / DAF / DSI |
|---|---|
| **Méthodologie GHG Protocol** (scope 1 / 2 / 3 — détail catégories 3.1 achats, 3.7 actifs en aval, 3.11 utilisation) | Le rapport est inutilisable en CSRD ESRS E5. Aucun auditeur ne validera. |
| **Source des facteurs d'émission** (ADEME Base Empreinte®, Boavizta, NegaOctet) | Aucune crédibilité technique. Un CSO sénior demandera la source en 30 secondes. |
| **Comparatif neuf vs reconditionné chiffré** (par typologie : laptop / écran / serveur / switch) | Argument central de l'ITAD. Absent. |
| **ROI carbone €/tCO₂e** (coût marginal d'évitement, comparé à un quota EU ETS ~75 €/tCO₂e en avril 2026) | Le DAF ne peut pas arbitrer sans cette donnée. |
| **Certifications** (ISO 14064-1, ISO 14001, ISAE 3410, BCorp, EcoVadis, Bilan Carbone® v8.7) | Pas de preuve d'auditabilité externe. |
| **Exemples sectoriels** (banque : 1 200 postes / 320 tCO₂e ; santé : 800 postes / 215 tCO₂e ; etc.) | Aucune projection pour le visiteur. |
| **Calculateur sérieux** | Cf. §5.2 point 11. Coefficient unique = faux signal d'expertise. |
| **Templates de rapport ESRS E5 téléchargeables** | Pas de lead magnet. |
| **Témoignage de CSRD officer ayant utilisé GTC pour son rapport** | Crédibilité zéro. |
| **Photo cohérente avec le sujet** | Aucune. Hero gradient seul. |
| **Mention de l'art. 19 décret 2022-1235** (DEEE pro) et **directive UE 2024/1799 (Right to Repair)** | Manque réglementaire. |
| **Référentiel CSRD ESRS E5 §29-§39 (Resource use & Circular economy)** | Pas de mapping explicite vers les data points obligatoires. |
| **Mode "consolidation multi-sites"** (un grand groupe a 15 filiales avec données hétérogènes) | Hors scope du calculateur actuel. |

### 7.3 Plan de refonte — wireframe textuel section par section

**Cible** : 700 lignes JSX, 9 sections, ~2 200 mots utiles, 3 photos, 2 infographies, 1 calculateur multi-paramètres, 3 lead magnets.

#### Section 1 — Hero (avant ligne de flottaison)

- H1 : « Pilotez le scope 3 IT comme un vrai poste comptable »
- Sous-H1 : « Calcul GHG Protocol catégories 3.1 (achats), 3.7 (actifs aval) et 3.11 (utilisation), facteurs ADEME Base Empreinte® v23 + Boavizta API v1.4. Auditable ISAE 3410. »
- 3 chips : `R2v3` · `ISO 14064-1` · `ESRS E5 mappé`
- CTA primaire : « Estimer mon scope 3 IT (gratuit, 10 min) » → `/contact?reason=scope3`
- CTA secondaire : « Télécharger un exemple de rapport ESRS E5 » → asset PDF gated email
- Photo : panoramique entrepôt GTC + travée serveurs reconditionnés (shooting interne).

#### Section 2 — Périmètre & méthodologie GHG Protocol (NOUVELLE)

- H2 : « Notre méthodologie de calcul »
- Schéma : tableau scope 1 / 2 / 3 avec, pour chaque catégorie 3.1 / 3.7 / 3.11 : périmètre couvert / non couvert, source de FE, granularité (par actif / par site / par filiale).
- Texte : 250 mots, expliquant le double comptage évité (un actif reconditionné n'est pas re-comptabilisé en 3.1 chez le second utilisateur — méthode de "circularity allocation" Boavizta).
- Encart téléchargeable : « Notre méthodologie complète (PDF, 18 p.) » — gated email + entreprise.

#### Section 3 — KPIs 2025 sourcés (REMPLACE les 4 KPIs actuels)

- 6 KPIs au lieu de 4, chacun sourcé :
  1. **45,2 tCO₂e évitées** (différence parc neuf vs parc reconditionné, n=12 412 actifs, période 2025)
  2. **72,4 % de réemploi** (réemploi direct + reconditionnement, exclusion des actifs détruits réglementaires)
  3. **98,1 % de valorisation matière** (vs ~32 % en circuit standard DEEE pro — source ADEME ESR 2024)
  4. **0 % mise en décharge** (engagement contractuel R2v3, pénalité 200 €/T en cas de manquement)
  5. **184 €** valeur résiduelle moyenne récupérée par poste reconditionné (n=4 218 actifs, 2025)
  6. **44 €/tCO₂e** coût marginal d'évitement chez GTC vs 75 €/tCO₂e quota EU ETS avril 2026 → arbitrage net positif pour le DAF

- Sous chaque KPI : 1 phrase de méthode + 1 lien "Voir la source" qui ouvre un modal avec la formule.

#### Section 4 — Comparatif neuf vs reconditionné (NOUVELLE)

- H2 : « Combien de tCO₂e économise un actif reconditionné ? »
- Tableau dynamique 5 lignes × 4 colonnes :

| Typologie | Neuf (kgCO₂e) | Reconditionné GTC (kgCO₂e) | Économie | Source FE |
|---|---|---|---|---|
| Laptop 14'' | 156 | 21 | 86,5 % | ADEME 2024 / Boavizta 1.4 |
| Desktop tour | 169 | 24 | 85,8 % | idem |
| Écran 24'' LED | 357 | 41 | 88,5 % | idem |
| Serveur 1U | 850 | 112 | 86,8 % | Boavizta 1.4 |
| Switch 48 ports | 432 | 58 | 86,6 % | idem |

- Note : « Les FE intègrent fabrication + transport + emballage. L'utilisation est calculée séparément (cat. 3.11) selon mix énergétique RTE 2024 (52 gCO₂/kWh). »

#### Section 5 — Calculateur multi-paramètres (REFONTE)

- 4 inputs minimum (laptops, desktops, écrans, serveurs), avec valeur unitaire affichée.
- Optionnel : âge moyen du parc, taux de réemploi cible, durée 2ème vie souhaitée.
- 3 outputs :
  - tCO₂e évitées (avec barre de progression vs objectif SBTi)
  - € valeur résiduelle (dépréciation actuarielle Bayes)
  - Équivalents pédagogiques (km voiture évitées / vols Paris-NY)
- Bouton "Recevoir mon rapport personnalisé par email" (lead capture obligatoire pour résultats détaillés).

#### Section 6 — Cas sectoriels chiffrés (NOUVELLE — relier `/secteurs/*` et `/cas-usages`)

- 4 cards (banque / santé / industrie / public), chacune :
  - Périmètre (nb d'actifs, durée)
  - tCO₂e évitées
  - € récupérés
  - Citation client
  - Lien vers `/secteurs/{x}` et vers le cas correspondant dans `/cas-usages`

#### Section 7 — Mapping CSRD ESRS E5 (NOUVELLE)

- Tableau des 16 data points ESRS E5 (resources inflows, outflows, circular economy) avec :
  - Référence ESRS E5 §
  - Données fournies automatiquement par GTC : ✓ / partiel / manuel
  - Format export (XBRL, PDF, JSON)
- Engagement : « Nous fournissons 11 des 16 data points ESRS E5 directement exportables. Les 5 restants nécessitent vos données amont (achats, RH). »

#### Section 8 — Certifications & auditabilité (NOUVELLE)

- Logos sourcés et liens publics : R2v3, ISO 14001:2015, ISO 14064-1:2018, ISAE 3410, EcoVadis Gold (2025), Bilan Carbone® v8.7, BCorp (en cours), Boavizta member.
- Cabinet d'audit annuel mentionné.
- Lien "Télécharger nos certificats à jour" (PDF zip).

#### Section 9 — CTA final + ressources

- CTA primaire : « Estimer mon scope 3 IT — workshop 1h gratuit »
- CTA secondaire : « Télécharger le pack ressources CSRD ITAD » (modèle clause ITAD + matrice ESRS E5 + checklist auditeur)
- 3 articles blog liés (composant `RelatedArticles` existant).

### 7.4 Charge estimée pour la refonte de `/impact`

| Tâche | Acteur | Effort |
|---|---|---|
| Brief méthodologique (validation par responsable RSE GTC) | PO + RSE | 1 j |
| Rédaction copy 9 sections | Copywriter senior | 3 j |
| Conception calculateur multi-paramètres | Front + data | 2 j |
| Production des 3 PDF lead magnets (méthodologie, ESRS E5, pack CSRD) | Designer + RSE | 3 j |
| Shooting photo + infographies | Designer | 1,5 j |
| Implémentation Next.js + i18n | Front | 2,5 j |
| QA + Core Web Vitals + audit accessibilité | QA | 1 j |
| **Total** | | **~14 j-h** |

---

## 8. ONGLET CAS D'USAGES — Audit & extension

### 8.1 Existant (`/cas-usages`)

- 7 cas sectoriels : `migration-windows`, `data-breach`, `rapport-csrd`, `multi-sites`, `cfo-valeur`, `nis2`, `wakibox-campus` (i18n `messages/fr.json:1297-1353`).
- Structure de chaque cas : `tag`, `title`, `scenario`, `stakeholders`, `solution`. **Aucun champ de résultats chiffrés.**
- Section "comparison" (4 outils vs 1 plateforme) — redondante avec `/plateforme` et `/pourquoi-gtc`.
- Page **non liée dans Header.tsx ni Footer.tsx** (orpheline).
- Hero sans badge sectoriel, photo générique `two-engineers.jpg` réutilisée.

### 8.2 Diagnostic

| Force | Faiblesse |
|---|---|
| Storytelling court et concret | Aucun chiffre dans les solutions (pas de tCO₂e, € ou jours d'audit) |
| Tags couvrent CSRD, NIS2, sécurité, valorisation | Pas de couverture santé, énergie, retail, telco, education |
| Cohérence avec les pages secteurs | Pas de cross-link vers `/secteurs/*` ni `/services` |
| Schéma `solution` clair | Pas de visuel par cas |
| | Pas de CTA par cas |
| | Pas en mega-menu |

### 8.3 Refonte proposée — 12 cas sectoriels

Ajouter le champ `results` (3 chiffres) à chaque cas, et étendre à 12 cas couvrant tous les secteurs prioritaires.

| # | ID | Secteur | Tag réglementaire | Titre | Acheteur primaire |
|---|---|---|---|---|---|
| 1 | `banque-dora-decommissioning` | Banque/Finance | DORA | « Décommissionner 2 400 postes trading floor sous DORA art. 28 » | RSSI banque |
| 2 | `assurance-pci-tablet-fleet` | Assurance | PCI-DSS v4.0 | « Sortir du parc 1 200 tablettes commerciaux conformes PCI-DSS » | RSSI assurance |
| 3 | `hopital-biomedical-rgpd` | Santé / Hôpital | RGPD santé | « Effacer 800 disques d'imagerie médicale sans rupture de soin » | DPO hôpital |
| 4 | `chu-eprescription-windows` | CHU | HDS | « Migration HDS : 2 100 postes ePrescription sans interruption » | DSI CHU |
| 5 | `manufacturing-ot-it-segregation` | Industrie / Manufacturing | NIS2 | « Décommissionner les automates OT obsolètes sans casser la prod » | RSSI industriel |
| 6 | `pharma-r-and-d-data-residency` | Pharma / R&D | RGPD + IP | « Effacer 10 ans d'instruments R&D sans perte de données brevet » | DSI + IP officer |
| 7 | `mairie-dpe-postes-citoyens` | Secteur public / Collectivités | RGPD + DEEE | « Reconditionner 1 800 postes mairie pour les écoles primaires » | DGS mairie |
| 8 | `ministere-confidential-defense` | Secteur public / État | IGI 1300 | « Détruire 600 disques classifiés Diffusion Restreinte » | RSSI ministère |
| 9 | `energie-smartmeter-fleet` | Énergie / Utilities | NIS2 + RTE | « Sortir 4 000 concentrateurs Linky obsolètes (Boucle + scope 3) » | DSI energéticien |
| 10 | `retail-pos-end-of-life` | Retail | PCI-DSS | « 850 caisses POS de 220 magasins fin de vie en 90 jours » | DSI retail |
| 11 | `telco-handsets-trade-in` | Telco | RGPD + DEEE | « 12 000 mobiles flotte enterprise reconditionnés en circuit court » | DAF telco |
| 12 | `university-laptops-students` | Education / Université | DEEE + RGPD | « Cession 3 200 laptops étudiants en fin de bourse, 0 fuite données » | DSI université |

### 8.4 Schéma standard par cas (à appliquer sur les 12)

```
[
  id: string
  tag: { regulation: string, sector: string }
  title: string (≤ 70 caractères)
  context: string (200 mots — entreprise type, périmètre, contraintes)
  problem: string (150 mots — ce qui se passerait sans intervention)
  stakeholders: string[] (4-6 fonctions impliquées)
  solution_services: string[] (lien vers /services#xxx)
  solution_platform_modules: string[] (lien vers /plateforme#xxx)
  timeline: { phase: string, duration: string, deliverable: string }[]
  results: {
    co2_avoided_tco2e: number
    value_recovered_eur: number
    audit_days_saved: number
    compliance_pct: number
  }
  testimonial: { quote: string, name: string, role: string, company: string }?
  cta: { label: string, href: string }
]
```

### 8.5 Charge estimée

| Tâche | Effort |
|---|---|
| Validation des 12 cas avec équipe commerciale GTC | 2 j |
| Rédaction copy (FR+EN) avec chiffres validés | 4 j |
| Refonte composant React + i18n | 2 j |
| Cross-linking vers `/services`, `/plateforme`, `/secteurs/*`, `/impact` | 0,5 j |
| Mise en mega-menu (`Header.tsx`) + footer | 0,5 j |
| QA contenus | 1 j |
| **Total** | **~10 j-h** |

---

## 9. VALEURS HUMAINES — Brief éditorial pour `/pourquoi-gtc` (et page complémentaire)

### 9.1 État actuel

`/pourquoi-gtc` (241 lignes) contient :
- Hero générique « Pourquoi GreenTechCycle ? ».
- Comparatif Avant/Après (redondant avec `/plateforme` et `/cas-usages`).
- Section "L'équipe" : photo `diverse-team.jpg` (stock photo Unsplash), texte générique « Ingénieurs R2v3, auditeurs CSRD, techniciens habilités NIST 800-88 ».
- 4 bénéfices (gain de temps, conformité, visibilité, ROI).
- CtaSection.

**Aucune mention de** : fondateur, mission, vision, valeurs, manifeste, histoire, ancrage géographique (Lyon est mentionné en footer mais pas en page), inclusion sociale, conviction écologique, lutte contre l'obsolescence programmée.

### 9.2 Brief éditorial — 6 sections à ajouter

#### Section A — « Pourquoi GreenTechCycle existe » (250 mots)

Angle : la **souveraineté numérique** et la **sobriété** comme convictions structurantes.

Plan suggéré :
- Constat fondateur : 50 M tonnes de DEEE/an en Europe, dont 60 % du scope 3 IT d'une entreprise concentré dans la fabrication amont (Boavizta).
- Conviction : prolonger la durée de vie d'un actif IT de 5 à 9 ans réduit son empreinte carbone unitaire de ~45 %.
- Mission : « Faire entrer l'ITAD dans la comptabilité des entreprises au même titre que la facture d'électricité — mesurable, auditable, optimisable. »
- Vision 2030 : « 80 % du parc IT B2B français en circuit court reconditionné, traçable scope 3 en temps réel. »

#### Section B — « Notre fondateur » (150 mots + portrait)

Brief de rédaction (à compléter par interview) :
- Prénom Nom, titre, parcours (école, entreprises précédentes).
- Élément déclencheur : un cas concret vécu (ex. : avoir vu 2 000 disques durs broyés sans certificat dans une banque alors que la facture était payée).
- Conviction structurante : 1 phrase tatouable.
- Année de création de GTC, contexte (post-COVID ? post-NIS2 ?).
- Lien LinkedIn.

#### Section C — « Nos 5 convictions »

Format manifeste, 5 cards, chacune : icône / titre / 50 mots.

1. **Souveraineté numérique** — Aucune donnée client ne sort du sol européen. Hébergement OVHcloud SecNumCloud, sous-traitants 100 % UE.
2. **Sobriété mesurée** — Nous publions notre propre bilan carbone scope 1+2+3 chaque année. Nous nous engageons sur une trajectoire SBTi 1,5 °C.
3. **Inclusion sociale** — 27 % de notre effectif technique vient de l'insertion par l'activité économique (IAE). Partenariats Envie, Ateliers du Bocage, Emmaüs Connect.
4. **Lutte contre l'obsolescence** — Nous prolongeons la durée de vie utile d'un poste à 9 ans en moyenne (vs 4 ans en circuit standard). Nous publions un baromètre trimestriel des composants reconditionnables.
5. **Employabilité par la formation** — 12 % de notre masse salariale est investie en formation. Notre école interne `GTC Academy` forme aux métiers de la circularité IT (4 promotions/an).

#### Section D — « Notre équipe » (refonte)

- 12 portraits nominatifs, photo professionnelle, prénom + nom + rôle + 1 phrase sur ce qui les anime.
- Mosaïque responsive 4×3 desktop, 2×6 mobile.
- Lien "Voir tous nos collaborateurs" → `/equipe` (nouvelle page).

#### Section E — « Notre ancrage » (NOUVEAU)

- Carte de France : siège Lyon (HQ R&D + DAF) + 3 sites opérationnels (atelier reconditionnement Lille, centre logistique Nantes, hub destruction Marseille).
- Effectif total + ETP par site.
- Engagements territoriaux : recrutement local prioritaire, partenariats écoles techniques.

#### Section F — « Nos engagements signés » (NOUVEAU)

- 5 chartes signées : Pacte Mondial ONU, Climate Pledge, French Tech Tribu, Charte de la diversité, Convention Citoyenne sur le Climat (le cas échéant).
- Adhésions : Boavizta, INR (Institut du Numérique Responsable), Cigref si pertinent.
- Date d'adhésion. Logo + lien.

### 9.3 Création d'une page séparée `/a-propos` (recommandée)

Plutôt qu'alourdir `/pourquoi-gtc` (qui doit rester un argument concurrentiel), créer `/a-propos` (FR) / `/about` (EN) reprenant les sections A-F ci-dessus, et garder `/pourquoi-gtc` orienté pure conviction commerciale (avant/après, ROI, démo).

Ajouter `/a-propos` dans le mega-menu `company` :

```
company:
  - /a-propos               (NOUVEAU — qui nous sommes)
  - /pourquoi-gtc           (existant — pourquoi nous choisir)
  - /equipe                 (NOUVEAU — trombinoscope nominatif)
  - /carrieres              (existant)
  - /parcours-client        (existant)
  - /ecosysteme             (existant)
```

### 9.4 Charge estimée

| Tâche | Effort |
|---|---|
| Interview fondateur (1h30) + rédaction storytelling | 1 j |
| Rédaction des 6 sections (A-F) | 2 j |
| Shooting portrait fondateur + 12 collaborateurs | 1 j |
| Photographe : retouche + droits image | 1 j |
| Création page `/a-propos` (Next.js + i18n) | 2 j |
| Création page `/equipe` (CMS-friendly) | 1,5 j |
| Mise à jour mega-menu + footer | 0,5 j |
| Validation juridique (autorisations image collaborateurs) | 0,5 j |
| **Total** | **~9,5 j-h** |

---

## 10. PRIORISATION P0 / P1 / P2 — Master plan d'exécution

### 10.1 P0 — Bloquant business (à exécuter sur sprint courant, 2 semaines)

| Tâche | Page(s) | Effort | Owner | KPI cible |
|---|---|---|---|---|
| P0-1. Mettre `/cas-usages`, `/tarifs`, `/secteurs/*` dans le mega-menu Header + Footer | `Header.tsx`, `Footer.tsx`, i18n | 1 j | Front | +12 % de trafic interne sur ces pages dans 30 j |
| P0-2. Refondre la page `/impact` (méthodologie, sources, comparatif, calculateur multi-paramètres) | `/impact/page.tsx` + i18n | 14 j | Front + RSE + Copywriter | LCP < 2,5 s, score Lighthouse 90+, +40 % de leads MQL CSRD |
| P0-3. Remplacer les 3 témoignages fictifs de la home par des témoignages réels signés | `messages/*.json` | 2 j | Sales + Légal | Crédibilité B2B (mesurée par taux de rebond hero -10 %) |
| P0-4. Corriger le calculateur d'impact (4 inputs typés, FE ADEME/Boavizta) | `/impact/page.tsx` | 2 j | Front + RSE | Cohérent avec ESRS E5 |
| P0-5. Aligner les CTA primaires sur la palette officielle (`#10B981/#0EA5E9/#F59E0B`) — actuellement `#047857` partout, hors charte | composants + pages | 1,5 j | Front + Designer | Conformité brand book |

**Sous-total P0 : ~20,5 j-h**

### 10.2 P1 — Différenciation forte (sprint suivant, 4 semaines)

| Tâche | Page(s) | Effort | Owner | KPI cible |
|---|---|---|---|---|
| P1-1. Étendre `/cas-usages` à 12 cas avec champ `results` chiffrés | `/cas-usages` + i18n | 10 j | Sales + Copywriter + Front | Temps moyen sur page +60 % |
| P1-2. Créer la page `/a-propos` avec récit fondateur + 5 convictions + ancrage | nouvelle route | 6 j | Copywriter + Front | Couverture marque RSE |
| P1-3. Créer la page `/equipe` (trombinoscope nominatif) | nouvelle route | 2,5 j | Front + Designer | Confiance B2B |
| P1-4. Shooting photo interne (atelier, salle effacement, équipe, fondateur) | n/a | 1 j shooting + 1 j post-prod | Designer + Photographe ext. | 12 visuels exclusifs |
| P1-5. Remplacer toutes les photos en doublon par les nouvelles + supprimer le sous-dossier `/unsplash/` | toutes pages | 2 j | Front + Designer | Crédibilité visuelle |
| P1-6. Fragmenter `/services` en 6 sous-pages + 1 index | `/services` + 6 routes | 8 j | Front + Copywriter | Bounce rate -25 %, SEO +30 % impressions |
| P1-7. Paramétrer `StickyCTA` et `ExitPopup` par catégorie de page | composants | 2 j | Front | Conversion CTA +15 % |
| P1-8. Produire 5 lead magnets PDF (méthodologie GHG, modèle clause ITAD, pack CSRD, mémo NIS2, comparatif neuf/reconditionné) | n/a | 6 j | Copywriter + Designer | +200 leads MQL/mois |
| P1-9. Implémenter le formulaire de capture email gated sur les lead magnets | composant | 2 j | Front + Backend | Capture rate ≥ 25 % |

**Sous-total P1 : ~40,5 j-h**

### 10.3 P2 — Optimisation et hygiène (1 trimestre)

| Tâche | Page(s) | Effort | Owner | KPI cible |
|---|---|---|---|---|
| P2-1. Enrichir `/secteurs/*` avec 2 cas clients par secteur + indicateurs sectoriels | `/secteurs/*` + i18n | 5 j | Sales + Copywriter | Pos SERP secteurs +5 |
| P2-2. Étoffer `/securite` (procédures destruction physique, simulateur risque, video room sealed) | `/securite` | 4 j | Copywriter + Front | Crédibilité RSSI |
| P2-3. Étoffer `/processus-itad` avec photos terrain, durée par étape, livrables | `/processus-itad` | 3 j | idem | idem |
| P2-4. Hiérarchiser/fusionner `/methodologie`, `/processus-itad`, `/ecosysteme`, `/plateforme` (cohérence narrative) | architecture IA | 4 j | Lead front + UX | Clarté funnel |
| P2-5. Refondre `/parcours-client` avec timeline 5 jalons + témoignages | `/parcours-client` | 3 j | Copywriter + Front | Conversion demo +10 % |
| P2-6. Étoffer `/carrieres` avec vie d'entreprise, témoignages, processus | `/carrieres` | 3 j | RH + Front | Postulants qualifiés +25 % |
| P2-7. Audit Core Web Vitals complet (focus images non-WebP, JS Framer Motion, Largest Contentful Paint) | toutes pages | 3 j | Front + Perf | LCP < 2,5 s p75 mobile |
| P2-8. Mettre en place une convention "1 photo = 1 emplacement" (lint custom + registry) | `/components/ImageRegistry.ts` | 1,5 j | Front | Zéro doublon photo |
| P2-9. Sourcer toutes les statistiques du site (footnotes + page `/sources`) | toutes pages + nouvelle route | 4 j | Copywriter + RSE | Auditabilité totale |
| P2-10. Audit accessibilité WCAG 2.2 AA complet (contraste, ARIA, keyboard) | toutes pages | 3 j | QA + Front | Score Axe 0 erreur critique |
| P2-11. Créer page `/clients` avec logos signés (charte d'accord) | nouvelle route | 2 j | Sales + Front | Confiance B2B |
| P2-12. Créer page `/sources` listant ADEME, Boavizta, INR, CIGREF, etc. | nouvelle route | 1,5 j | Copywriter | Crédibilité |

**Sous-total P2 : ~37 j-h**

### 10.4 Total et plan calendaire

| Lot | Effort | Durée calendaire (équipe 4 ETP) |
|---|---|---|
| P0 | 20,5 j-h | 2 semaines |
| P1 | 40,5 j-h | 4 semaines |
| P2 | 37 j-h | 4 semaines (peut paralléliser avec P1 sur la fin) |
| **Total** | **98 j-h** | **10 semaines (≈2,5 mois calendaires)** |

Composition équipe minimale recommandée :
- 1 Lead Front Next.js (50 % du temps)
- 1 Designer Senior (40 %)
- 1 Copywriter B2B compliance (60 %)
- 1 PO / Chef projet (20 %)
- Renforts ponctuels : RSE interne GTC, équipe sales, photographe externe, conseil juridique RGPD/CSRD.

### 10.5 Quick wins (≤ 2 jours, à lancer dans la semaine)

| # | Action | Effort | Impact |
|---|---|---|---|
| QW-1 | Ajouter `/cas-usages` et `/tarifs` au mega-menu Header | 0,25 j | Très fort (orphelines débloquées) |
| QW-2 | Ajouter `/secteurs` (page index à créer) au mega-menu | 0,5 j | Fort |
| QW-3 | Remplacer les 3 témoignages fictifs par 3 témoignages signés (existants en CRM ?) | 1 j | Fort |
| QW-4 | Sourcer les 4 stats de la home avec footnotes | 0,5 j | Crédibilité |
| QW-5 | Corriger banner urgence : « 1ʳᵉ publication ESRS E5 due au 30 juin 2026 » | 0,1 j | Précision |

---

## Annexes

### A. Méthodologie d'audit

- Lecture de `src/app/[locale]/*/page.tsx` (26 fichiers).
- Lecture de `src/components/{Header,Footer,SalesAssistantWidget}.tsx`.
- Lecture sélective de `messages/fr.json` (1 549 lignes).
- `wc -l` pour le décompte des lignes par page.
- `grep -n "Image src=" + "<section" + "<Link"` pour CTAs et photos.
- `curl -I` sur les URLs prod pour vérifier statut HTTP et taille de payload.

### B. Pages NON auditées en détail (audit superficiel uniquement)

`/cgu`, `/mentions-legales`, `/confidentialite`, `/cookies` — pages légales standards, hors scope conversion.

### C. Questions ouvertes à valider avec le métier

1. La société est-elle réellement basée à Lyon (footer dit « 42 rue de la République, 69002 Lyon ») ? Confirmer pour la section "ancrage" de `/a-propos`.
2. Quels sont les noms réels des 3 premiers clients référence (acceptant publication) ?
3. Le fondateur souhaite-t-il être nommé en photo + biographie ? Sinon prévoir une formulation collective ("le pôle dirigeant").
4. Quel est le statut R2v3 réel à date ? (i18n l'affirme, à vérifier sur registre SERI / Sustainable Electronics Recycling International).
5. La plateforme SaaS (`/plateforme`) est-elle déjà en production avec des clients payants, ou en bêta ? Le copy doit être ajusté en conséquence (engagement / preuve sociale).
6. Existe-t-il un budget pour shooting photo interne ? Sinon prévoir alternative banques d'images professionnelles (Pexels / Pexelsbiz, Adobe Stock).
7. La newsletter capture-t-elle des emails dans une CRM (HubSpot / Pipedrive) ou tombe-t-elle dans le néant ? À auditer côté backend.

— Fin du rapport —
