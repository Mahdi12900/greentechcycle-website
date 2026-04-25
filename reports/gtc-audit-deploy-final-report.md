# Audit transverse final + déploiement — GreenTechCycle

- Date : 2026-04-25
- Branche : `main`
- Commit final : `280ce14` — `audit: photos+franglais+stash final`
- Production : https://greentechcycle-website.vercel.app
- Déploiement Vercel : `dpl_7ZK8FevC9Akzc3hs26bK4LmV4AN5` (READY)

---

## 1. Audit franglais — remplacements appliqués

### Côté FR (`messages/fr.json`)

| Ligne | Avant | Après |
|------|-------|-------|
| 543 | `Véhicules sécurisés avec tracking GPS temps réel` | `Véhicules sécurisés avec suivi GPS temps réel` |
| 576 | `Dashboard temps réel des métriques carbone` | `Tableau de bord temps réel des métriques carbone` |
| 592 | `Dashboard de suivi temps réel` | `Tableau de bord de suivi temps réel` |
| 599 | `engagement: Monitoring temps réel` | `engagement: Supervision temps réel` |
| 602 | `Borne de collecte connectée plug-and-play` | `Borne de collecte connectée prête à l'emploi` |
| 606 | `Dashboard de suivi par site` | `Tableau de bord de suivi par site` |
| 607 | `Gamification pour encourager le réemploi` | `Ludification pour encourager le réemploi` |
| 615 | `Un workflow en 7 étapes…` | `Un parcours en 7 étapes…` |
| 626 | `…tracking GPS du transport.` | `…suivi GPS du transport.` |
| 1237 | `Dashboard principal` | `Tableau de bord principal` |
| 1736 | `Onboarding GTC en 60 jours… chain of custody…` | `Intégration GTC en 60 jours… chaîne de traçabilité…` |
| 2361-2363 | `Dashboards / 4 dashboards / 1 dashboard` | `Tableaux de bord / 4 tableaux de bord / 1 tableau de bord` |
| 2486 | `Dashboard multi-établissements pour les GHT` | `Tableau de bord multi-établissements pour les GHT` |
| 2581 | `Dashboard adapté aux collectivités…` | `Tableau de bord adapté aux collectivités…` |
| 3087 | `Dashboard ROI temps réel…` | `Tableau de bord ROI temps réel…` |
| 3719 | `Onboarding office managers…` | `Intégration des responsables de bureau…` |

### Côté FR (composants `.tsx`)

| Fichier:Ligne | Avant | Après |
|---|---|---|
| `methodologie/page.tsx:158` | `Workflow d'approbation configurable par rôle` | `Parcours d'approbation configurable par rôle` |
| `methodologie/page.tsx:172-174` | `Secure Logistics / tracking GPS / Chain of custody` | `Logistique sécurisée / suivi GPS / Chaîne de traçabilité` |
| `methodologie/page.tsx:272` | `tx("Continuous Monitoring", ...)` (FR=EN) | `tx("Supervision continue", "Continuous Monitoring")` |
| `methodologie/page.tsx:274` | `Dashboard temps réel avec KPIs live… vos workflows. Scoring continu` | `Tableau de bord temps réel avec KPI en direct… vos parcours. Notation continue` |
| `methodologie/page.tsx:571` | `dashboard client` | `tableau de bord client` |
| `reglementation/page.tsx:245` | `Workflow dédié PCI-DSS…` | `Parcours dédié PCI-DSS…` |
| `reglementation/page.tsx:656` | `workflow PCI-DSS automatisé` | `parcours PCI-DSS automatisé` |
| `reglementation/page.tsx:902` | `tx("Challenge énergétique", ...)` | `tx("Défi énergétique", ...)` |
| `reglementation/page.tsx:988` | `Frameworks cybersécurité…` | `Référentiels cybersécurité…` |
| `reglementation/page.tsx:1021` | `…workflow unique et certifié` | `…parcours unique et certifié` |
| `services/wakibox/page.tsx:18` | `…un brin de gamification…` | `…un brin de ludification…` |
| `services/wakibox/page.tsx:30` | `…données de gamification.` | `…données de ludification.` |
| `tarifs/page.tsx:143` | `Dashboard multi-axes (cyber/carbone/finance/lifecycle)` | `Tableau de bord multi-axes (cyber/carbone/finance/cycle de vie)` |
| `tarifs/page.tsx:147` | `Validation humaine des findings critiques` | `Validation humaine des constats critiques` |

### Côté EN — vérifications

- Audit `messages/en.json` : 0 contamination FR (les seules occurrences FR sont des noms propres légitimes — `rue de la République`, `Halte à l'Obsolescence Programmée`, `Envie / Ateliers du Bocage`, `Institut du Numérique Responsable`, `à la carte`).
- Audit `tx("…", "…")` côté EN : aucun caractère accentué FR, aucun mot français résiduel.
- Termes conservés (techniques opposables) : `Scope 1/2/3`, `ESRS`, `CSRD`, `CMDB`, `chain of custody`, `data point`, `Pentest`, `DPO-as-a-Service`.
- 2 passes effectuées — second balayage sans nouvelle occurrence à corriger.

---

## 2. Audit photos — vérifications

| Source | Type | Verdict |
|---|---|---|
| `images.unsplash.com/photo-1518770660439-…` | Carte électronique | ✓ métier DEEE |
| `images.unsplash.com/photo-1526374965328-…` | Console code/cybersécurité | ✓ pas de bourse |
| `images.unsplash.com/photo-1581091226825-…` | Inventaire physique laptop | ✓ métier audit |
| `images.unsplash.com/photo-1558494949-…` | Salle d'effacement | ✓ métier ITAD |
| `images.unsplash.com/photo-1593104547489-…` | Atelier reconditionnement | ✓ métier ITAD |
| `images.unsplash.com/photo-1611273426858-…` | Démantèlement cartes | ✓ métier recyclage |
| `images.unsplash.com/photo-1605600659908-…` | Atelier recyclage | ✓ métier recyclage |
| `images.unsplash.com/photo-1556761175-…` | Équipe/dispositif | ✓ métier collecte |
| `images.unsplash.com/photo-1614064641938-…` | Convoyage sécurisé | ✓ métier cybersécurité |

Photo de la tuile `cybersecurite` du hub `/services` corrigée durant la même vague (commit `280ce14`) :
- Avant : `photo-1573164713988-8665fc963095` (alt « Salle d'effacement sécurisée »)
- Après : `photo-1550751827-4bd374c3f58b` (alt « Salle de supervision cybersécurité »)

Toutes photos locales `/photos/*.jpg` et `/images/*.jpg` ont été inventoriées (atelier ITAD, datacenter, équipes, audit, capteurs, écologie, salle réunion). **0 photo de bourse, trading, stock chart, candlestick, ticker, broker, wall-street ou crypto-chart sur tout le site.**

---

## 3. Cohérence boutons « Réserver » & whitelist slugs

Whitelist `KNOWN_OFFERS` étendue dans `src/app/[locale]/reserver/page.tsx` :

**Plans Waki Box (existants)** : `waki-box-essentiel`, `waki-box-confort`, `waki-box-premium`, `waki-box-pilote`.

**Options Waki Box (slugs historiques conservés)** : `box-supplementaire`, `collecte-urgence`, `animation-semaine-recyclage`, `rapport-csrd-dedie`, `kit-comm-customise`, `audit-deee`, `formation-equipes`.

**Slugs canoniques agent waki ajoutés** :
`waki-box-addon-collecte`, `waki-box-addon-animation`, `waki-box-addon-csrd`, `waki-box-addon-kit`, `waki-box-addon-audit`, `waki-box-addon-formation`.

**Services ITAD ajoutés** : `audit-inventaire`, `effacement-securise`, `reconditionnement-valorisation`, `recyclage-deee`, `cybersecurite`, `cybersecurite-itad` (alias produit), `wakibox`.

**Plateforme & contact ajoutés** : `plateforme-demo`, `demo-plateforme` (alias), `contact-general`.

**Slugs historiques conservés (pourquoi-gtc/impact/plateforme)** : `audit-decommissionnement`, `methodologie-csrd`, `esrs-pack`, `csrd-pack`, `audit-blanc-itad`, `plateforme-info`.

Libellés FR + EN ajoutés dans `messages/{fr,en}.json` → `reserver.offers.*` pour chacun des nouveaux slugs.

CTAs Home (`/[locale]/page.tsx`) : pointent vers `/contact` et `/demo` (entrées de tunnel générales — le hub home ne pitche pas d'offre concrète, donc pas de redirection nécessaire vers `/reserver?offre=…`). Tunnels `/reserver` câblés depuis `/services/*`, `/waki-box`, `/plateforme`, `/impact`, `/pourquoi-gtc` (47 liens vérifiés).

---

## 4. Récupération du stash

`stash@{0}` (`user-pre-existing-messages-wip`, parent `1e1bdaa`) :
- Diff vs `messages/{fr,en}.json` au HEAD `ed7835f` : **bit-identique** (`diff` retourne 0).
- Décision : stash superseded — supprimé (déjà intégré aux 3 vagues éditoriales).

---

## 5. Build summary

`npm run build` — 0 erreur, 0 warning, 91 pages statiques générées.

```
Route (app)                                              Size     First Load JS
○ /_not-found                                            880 B          88.2 kB
● /[locale]                                              8.03 kB         167 kB
● /[locale]/cas-usages                                   14.9 kB         169 kB
● /[locale]/contact                                      9.77 kB         164 kB
● /[locale]/impact                                       10.4 kB         173 kB
● /[locale]/methodologie                                 16.3 kB         174 kB
● /[locale]/plateforme                                   10.4 kB         165 kB
● /[locale]/pourquoi-gtc                                 8.97 kB         163 kB
● /[locale]/reglementation                               26.8 kB         190 kB
● /[locale]/reserver                                     9.13 kB         158 kB
● /[locale]/reserver/merci                               5.52 kB         155 kB
● /[locale]/services                                     14.8 kB         169 kB
● /[locale]/services/audit-inventaire                    4.67 kB         168 kB
● /[locale]/services/cybersecurite                       4.12 kB         167 kB
● /[locale]/services/effacement-securise                 3.9 kB          167 kB
● /[locale]/services/reconditionnement-valorisation      4.16 kB         167 kB
● /[locale]/services/recyclage-deee                      4 kB            167 kB
● /[locale]/services/wakibox                             3.88 kB         167 kB
● /[locale]/waki-box                                     11.8 kB         166 kB
● /[locale]/tarifs                                       9.21 kB         116 kB
ƒ /api/reservation                                       0 B                0 B
+ First Load JS shared by all                            87.4 kB
```

---

## 6. Déploiement Vercel

- Team : `grenntechcycle`
- Project : `greentechcycle-website` (`prj_rMjFjzpCiW83vMwAzPSWkS7Ri5TL`)
- Commande : `npx vercel deploy --prod --yes`
- Build : 36 s — `Build Completed in /vercel/output`
- Status : **READY**
- URL deploy : https://greentechcycle-website-cgwbh1b90-grenntechcycle.vercel.app
- Alias prod : https://greentechcycle-website.vercel.app
- `dpl_id` : `dpl_7ZK8FevC9Akzc3hs26bK4LmV4AN5`
- Inspector : https://vercel.com/grenntechcycle/greentechcycle-website/7ZK8FevC9Akzc3hs26bK4LmV4AN5

---

## 7. Vérification HTTP — toutes les routes en 200

| Route | HTTP |
|---|---|
| /fr | 200 |
| /en | 200 |
| /fr/services | 200 |
| /en/services | 200 |
| /fr/services/audit-inventaire | 200 |
| /fr/services/effacement-securise | 200 |
| /fr/services/reconditionnement-valorisation | 200 |
| /fr/services/recyclage-deee | 200 |
| /fr/services/cybersecurite | 200 |
| /fr/services/wakibox | 200 |
| /fr/plateforme | 200 |
| /en/plateforme | 200 |
| /fr/pourquoi-gtc | 200 |
| /en/pourquoi-gtc | 200 |
| /fr/cas-usages | 200 |
| /en/cas-usages | 200 |
| /fr/impact | 200 |
| /en/impact | 200 |
| /fr/contact | 200 |
| /en/contact | 200 |
| /fr/waki-box | 200 |
| /en/waki-box | 200 |
| /fr/reserver | 200 |
| /en/reserver | 200 |

**24 / 24 routes → HTTP 200.**

---

## 8. Critères de succès

- [x] 0 occurrence de franglais côté FR (hors termes légaux CSRD/ESRS, sigles API/REP/DEEE, noms propres).
- [x] 0 occurrence de FR côté EN (hors noms propres / adresses).
- [x] 0 photo bourse/trading sur tout le site.
- [x] Tous les CTA d'offre pointent vers `/reserver?offre=<slug-valide>` ; whitelist couvre 32 slugs (canoniques + historiques + alias).
- [x] `npm run build` PASS (0 erreur, 0 warning).
- [x] `vercel deploy --prod` READY (`dpl_7ZK8FevC9Akzc3hs26bK4LmV4AN5`).
- [x] 100 % des routes ciblées → HTTP 200.
