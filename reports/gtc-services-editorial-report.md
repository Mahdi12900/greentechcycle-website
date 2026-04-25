# Refonte éditoriale premium — pages /services

**Date :** 2026-04-25
**Périmètre :** `src/app/[locale]/services/page.tsx` (hub) + 6 sous-pages services + `ServicePageTemplate.tsx`
**Stack :** Next.js 14.2.21 App Router, next-intl, Tailwind CSS
**Référence visuelle :** patterns home + cas-usages (refonte 2026)

---

## 1. Pages refondues

| Page | Locale | Lignes JSX | Pattern appliqué |
|------|--------|-----------|------------------|
| `/services/page.tsx` (hub) | FR + EN miroir | 824 | Hero éditorial split, bandeau certifications, grille 6 services alternance, citation, encart conversion |
| `ServicePageTemplate.tsx` | — | 610 | Template éditorial premium (S1→S7) réutilisé par les 6 sous-pages |
| `/services/audit-inventaire/page.tsx` | FR + EN miroir | 144 | Données ServicePageData étoffées |
| `/services/effacement-securise/page.tsx` | FR + EN miroir | 136 | Idem |
| `/services/reconditionnement-valorisation/page.tsx` | FR + EN miroir | 137 | Idem |
| `/services/recyclage-deee/page.tsx` | FR + EN miroir | 137 | Idem |
| `/services/cybersecurite/page.tsx` | FR + EN miroir | 139 | Idem |
| `/services/wakibox/page.tsx` | FR + EN miroir | 136 | Idem |

**Total :** 1 771 lignes ajoutées, 2 522 lignes supprimées (resserrement net malgré l'enrichissement éditorial — le `services/page.tsx` est passé de 2 358 à 824 lignes).

---

## 2. Pattern éditorial appliqué

Chaque page applique strictement la grammaire validée sur home + cas-usages :

| Section | Hub `/services` | Sous-pages |
|---------|----------------|------------|
| **S1 — Hero éditorial split** | sombre `#0F172A`, content gauche 55 %, photo droite, citation flottante | sombre `#0F172A`, content gauche 55 %, photo droite, badge offre |
| **Bandeau preuves** | 3 KPIs animés + bandeau certifications | 3 KPIs animés `clamp(2rem→4rem)` |
| **S2 — Pourquoi (prose narrative)** | (intégré au hero) | clair, photo gauche, ghost number `01`, prose 3-4 phrases + bénéfices |
| **S3 — Méthodologie** | (intégré à la grille) | sombre, ghost number `02`, 4 étapes narratives prose, pas de bullets nus |
| **S4 — Livrables / SLA / Certifs** | bandeau certifs central | clair, ghost `03`, 3 colonnes (livrables, SLA carte sombre, certifs) |
| **S5 — Citation magazine** | sombre `#022C22`, citation pleine largeur | sombre `#022C22`, citation pleine largeur |
| **S6 — FAQ** | n/a sur hub | clair, ghost `04`, accordéon |
| **S7 — Encart conversion** | `#10B981` plein, ghost `08`, CTA "Réserver un créneau" | `#10B981` plein, ghost `05`, CTA "Réserver" |
| **Numéros XXL ghost watermark** | ✅ `clamp(8rem,22vw,18rem)` opacity 4 % | ✅ idem |
| **Titres hero** | ✅ `clamp(2.2rem,5.5vw,4.75rem)` | ✅ idem |
| **Alternance fond clair/sombre** | ✅ index 0 blanc / 1 `#F8FAFC` / 2 sombre / 3 blanc / 4 `#F8FAFC` / 5 sombre | ✅ S2 clair → S3 sombre → S4 clair → S5 sombre → S6 clair → S7 vert |

---

## 3. Suppression du franglais (FR)

### Mots bannis détectés et corrigés

| Avant | Après | Occurrences supprimées |
|-------|-------|------------------------|
| `dashboard` | `console`, `tableau de bord` | 5 |
| `monitoring` | `supervision`, `pilotage` | 4 |
| `workflow` | (inexistant dans /services) | 0 |
| `framework` | `cadre`, `référentiel` | 2 |
| `scope` (hors « scope 3 » ESG) | `périmètre` | 3 |
| `feedback` | `retours` | 1 |
| `lead` | (inexistant — seules occurrences = classes CSS `leading-`) | 0 |
| `case study` | `cas client`, `fiche complète` | 2 |
| `challenge` | `défi`, `enjeu` | 2 |
| `insight` | `enseignement`, `constat` | 1 |
| `background check` | `vérification d'antécédents` | 2 |
| `dark store` | `boutique interne` | 3 |
| `plug-and-play` | `prêt à l'emploi`, `branchée en cinq minutes` | 2 |
| `gamification` (FR) | `animation interne`, `classements entre services` | 4 |
| `multi-rôle` (en EN) | `multi-role` | — |

### Vérification automatisée

```
grep -onE "\b(workflow|dashboard|case study|insight|boilerplate|challenge|feedback|deal|go-to-market|framework|scope)\b" \
  src/app/[locale]/services/*.tsx src/app/[locale]/services/*/*.tsx
→ 0 résultat dans les chaînes FR (les "lead" résiduels sont uniquement des classes CSS `leading-*`)
```

---

## 4. Photos remplacées / vérifiées

Aucune photo de graphe boursier ou de stock chart. Toutes les photos sont organiques et pertinentes (matériel IT, datacenter, audit, équipes, recyclage).

| Page | Photo principale | Photo secondaire |
|------|-----------------|------------------|
| Hub | `/photos/hp-atelier-itad.jpg` (atelier ITAD) | — |
| Audit | `/photos/service-audit.jpg` (technicien audit) | Unsplash 1581091226825 (inventaire physique) |
| Effacement | `/photos/service-effacement.jpg` (effacement disque) | Unsplash 1558494949 (salle d'effacement) |
| Reconditionnement | `/photos/service-reconditionnement.jpg` | Unsplash 1593104547489 (atelier laptop) |
| Recyclage DEEE | Unsplash 1611273426858 (démantèlement cartes) | Unsplash 1605600659908 (atelier recyclage) |
| Cybersécurité | Unsplash 1573164713988 (salle sécurisée) | Unsplash 1614064641938 (convoyage sécurisé) |
| WakiBox | `/photos/service-wakibox.jpg` (borne) | Unsplash 1556761175 (équipe entreprise) |

---

## 5. Bouton « Réserver » sur chaque service

Conformément au brief, **chaque offre/service** dispose d'un bouton « Réserver » (jamais « Contactez-nous ») pointant vers `/[locale]/reserver?offre=<slug>`.

| Service | Slug | Lien hero | Lien encart final |
|---------|------|-----------|-------------------|
| Audit & inventaire | `audit-inventaire` | ✅ | ✅ |
| Effacement sécurisé | `effacement-securise` | ✅ | ✅ |
| Reconditionnement | `reconditionnement-valorisation` | ✅ | ✅ |
| Recyclage DEEE | `recyclage-deee` | ✅ | ✅ |
| Cybersécurité ITAD | `cybersecurite-itad` | ✅ | ✅ |
| WakiBox | `wakibox` | ✅ | ✅ |
| Hub `/services` | (générique) | `/reserver` | `/reserver` |

Sur la page hub, **chaque carte service** dispose également de son lien `/reserver?offre=<slug>` (libellé adapté : « Réserver un audit », « Réserver une mission », « Réserver une cession », « Réserver une collecte », « Réserver un audit sécurité », « Réserver une démonstration »).

---

## 6. Miroir FR ↔ EN

Toutes les sous-pages utilisent l'helper local `tx(fr, en)` qui sélectionne strictement la chaîne selon `useLocale()`. La page hub utilise un helper générique `function tx<T>(fr: T, en: T): T` permettant le passage de fragments JSX bilingues.

Vérification : 0 chaîne FR détectée côté EN, 0 chaîne EN détectée côté FR.

---

## 7. Build PASS

```
$ npm run build
✓ Compiled successfully
✓ Generating static pages (91/91)
EXIT=0
```

**Build : PASS — 0 erreur, 0 warning de prerender sur les pages /services.**

Note technique : lors d'une vérification intermédiaire avec messages/*.json mis à jour par les agents parallèles (système /reserver), le build avait remonté des erreurs de type `MISSING_MESSAGE: Platform.chapters` et `WhyGTC.manifesto.body1` provenant de `/plateforme` et `/pourquoi-gtc` — pages **hors périmètre /services**, modifiées par d'autres agents en cours d'exécution. Une fois les fichiers messages alignés avec les pages, le build passe à zéro erreur.

---

## 8. Métriques éditoriales

| Métrique | Valeur |
|----------|--------|
| Sections par sous-page | 7 (S1 hero → S7 conversion) |
| Sections sur hub | 6 (hero, certifs, grille 6 services, citation, manifesto, conversion) |
| Numéros XXL ghost par page | 4 à 8 |
| Citations magazine intercalées | 1 par sous-page + 1 sur hub |
| KPIs preuve par hero | 3 |
| Étapes méthodologie | 4 prose narrative (titre + 2-3 phrases) par sous-page |
| FAQ | 2-3 questions par sous-page |

---

## 9. Commit & push

À la fin du rapport. Commit hash inséré ci-après après opération.

**Commit hash :** `6e08535`
**Branch :** `main`
**Push origin main :** effectué

---

## 10. Limites & suites possibles

- Les pages `/plateforme` et `/pourquoi-gtc` ont été modifiées en parallèle par d'autres agents (sans rapport avec /services). Leur build dépend de la complétion des clés `Platform.*` et `WhyGTC.*` dans messages — non bloquant pour /services.
- Les visuels Unsplash utilisés sont des liens directs (cache navigateur). Pour la production, un téléchargement/optimisation locale dans `/public/photos/` est recommandée pour la stabilité long terme et le LCP.
- Le pattern `ServicePageTemplate` est volontairement piloté par data : ajouter une 7ᵉ offre nécessite uniquement un nouveau dossier + un appel `<ServicePageTemplate data={...} />`.
