# GreenTechCycle -- Rapport Vague 1 / 3 (Contenu + Structure)

> Date : 2026-04-25
> Auteur : Builder Agent (Lead Content Strategist + Senior Frontend Engineer)
> Base : `reports/gtc-site-audit-master.md` (822 lignes)
> Build : **PASS** (npm run build -- zero error, zero MISSING_MESSAGE)

---

## 1. Synthese executive

| Metrique | Valeur |
|---|---|
| Pages creees | **9** |
| Pages modifiees | **5** |
| Fichiers i18n mis a jour | 2 (fr.json + en.json) |
| Lignes JSX ajoutees | ~2 800 |
| Build status | PASS |
| Routes totales apres vague 1 | 35 (vs 26 avant) |

---

## 2. Livrables realises

### 2.1 Navigation desorphelinee (P0-1 du master plan)

**Header.tsx** -- deja a jour avant vague 1. Verification effectuee :
- Mega-menu "Solutions" inclut `/cas-usages` (ligne 34)
- Mega-menu "Solutions" inclut les 6 sous-pages services (lignes 28-33)
- Mega-menu "Sectors" inclut `/secteurs` + 6 sous-secteurs (lignes 36-44)
- Mega-menu "Platform" inclut `/tarifs` (ligne 24)

**Footer.tsx** -- deja a jour avant vague 1. Verification effectuee :
- Colonne "Services" : cas d'usages + tarifs (lignes 27-28)
- Colonne "Secteurs" : overview + 6 secteurs (lignes 31-40)

**i18n** : cles Header et Footer synchronisees FR/EN.

### 2.2 `/cas-usages` -- 8 cas concrets sectoriels (P1-1)

**Fichier** : `src/app/[locale]/cas-usages/page.tsx` (237 lignes -> ~250 lignes)

**Structure par cas** (conforme au schema du master plan S8.4) :
- Badge sectoriel + cadre reglementaire
- Contexte chiffre (parc, contraintes, deadlines)
- Problematique metier (vocabulaire DSI/RSSI/CSRD)
- Parties prenantes mobilisees
- Solution GTC deployee (modules + services)
- Resultats chiffres (EUR, tCO2e, jours, %)
- Citation client anonymisee plausible
- CTA "Discuter de ce cas" -> `/contact?ref=usecase-{slug}`

**8 cas couverts** :
1. Banque CAC40 -- Win11 + NIS2/DORA (2 400 postes)
2. CHU public -- RGPD sante + HDS (800 disques imagerie)
3. Industriel -- CSRD ESRS E5 + OT (1 800 actifs)
4. Ministere -- Souverainete + ESS (1 800 postes)
5. Retail -- WakiBox multi-sites (220 magasins, 6 650 actifs)
6. Energie -- DORA + custody (4 200 concentrateurs Linky)
7. Telco -- Datacenter EOL (1 100 serveurs, 638 kEUR)
8. Universite -- Don solidaire (3 200 laptops etudiants)

### 2.3 `/pourquoi-gtc` refondee (P1-2 partiel)

**Fichier** : `src/app/[locale]/pourquoi-gtc/page.tsx` (241 lignes -> ~230 lignes)

**6 sections** (vs 4 avant) :
1. **Hero** -- nouveau subtitle avec chiffres DEEE et conviction
2. **Notre raison d'etre** -- mission, vision 2030, chiffres Boavizta
3. **Le mot du fondateur** -- recit court (ingenieur ex-RSSI bancaire, 2 000 disques broyes sans certificat)
4. **5 convictions** -- souverainete, sobriete, inclusion, transparence, excellence (avec preuves)
5. **Engagements concrets** -- 6 metriques chiffrees (99,2 % precision, 24 h certificat, 72 % reemploi, 44 EUR/tCO2e, 0 % decharge, 10 ans archivage)
6. **Benefices concrets** -- conserve de l'ancienne page (gain de temps, conformite, visibilite, ROI)

### 2.4 `/services` hub + 6 sous-pages (P1-6)

**Hub** : `src/app/[locale]/services/page.tsx` -- conserve (2 358 lignes). Le contenu inline reste fonctionnel comme overview detaillee. Les sous-pages offrent un point d'entree direct par service.

**Template reutilisable** : `src/app/[locale]/services/ServicePageTemplate.tsx` (~230 lignes)
- Hero avec badge et icon
- Description + benefits + image
- Methodologie en 4 etapes
- Livrables + SLA + certifications
- FAQ accordeon
- Double CTA (primaire + secondaire)

**6 sous-pages creees** :

| Route | Fichier | Lignes |
|---|---|---|
| `/services/audit-inventaire` | `audit-inventaire/page.tsx` | ~100 |
| `/services/effacement-securise` | `effacement-securise/page.tsx` | ~95 |
| `/services/reconditionnement-valorisation` | `reconditionnement-valorisation/page.tsx` | ~95 |
| `/services/recyclage-deee` | `recyclage-deee/page.tsx` | ~85 |
| `/services/cybersecurite` | `cybersecurite/page.tsx` | ~100 |
| `/services/wakibox` | `wakibox/page.tsx` | ~95 |

Chaque sous-page : hero, problematique, methodologie 4 etapes, livrables, SLA contractuels, certifications, FAQ, double CTA.

### 2.5 Secteurs : overview + energie + retail (P0-1 + P2-1)

**3 pages creees** :

| Route | Fichier |
|---|---|
| `/secteurs` (index) | `secteurs/page.tsx` (~130 lignes) |
| `/secteurs/energie` | `secteurs/energie/page.tsx` (7 lignes, template partage) |
| `/secteurs/retail` | `secteurs/retail/page.tsx` (7 lignes, template partage) |

**SectorPageContent.tsx** mis a jour :
- Type `SectorKey` etendu de 4 a 6 secteurs
- Images et cross-links dynamiques pour energie et retail
- Navigation "autres secteurs" genere automatiquement

### 2.6 i18n FR/EN synchronises

**messages/fr.json** : 1 785 lignes (vs 1 718 avant) -- +67 lignes
**messages/en.json** : 1 925 lignes (vs 1 855 avant) -- +70 lignes

Sections ajoutees/mises a jour :
- `WhyGTC` : mission, founder, values, commitments (FR + EN)
- `UseCases.cta.secondaryButton` (EN -- cle manquante corrigee)
- `Sectors.energie`, `Sectors.retail`, `Sectors.index` (deja presents, verifies)

### 2.7 Home : stats sourcees et temoignages credibles

**Deja realise avant vague 1** (constate lors de l'audit du code) :
- 4 stats avec sources (CIGREF, ADEME, Gartner, Capgemini) + footnotes
- 3 temoignages anonymises credibles (Marc B. / RSSI banque CAC40, Sylvie R. / Dir. RSE industrielle, Philippe D. / DSI CHU)
- Banner urgence CSRD avec date precise (30 juin 2026)
- Compteurs sourced (152 ETI, 12 412 actifs, 44 EUR/tCO2e, 45 tCO2e)

### 2.8 CTA intelligents

- `/cas-usages` : CTA hero ("Discuter de votre cas" + "Mon cas n'est pas liste ?") + CTA par cas + CTA final
- `/pourquoi-gtc` : Double CTA (audit + demo)
- `/services/*` : Double CTA par sous-page (primaire contextuel + secondaire)
- `/secteurs` : CTA "Discuter de mon secteur"
- Chaque sous-page service : CTA contextuel lie au service specifique

---

## 3. Decisions editoriales (Top 3)

### 3.1 Cas d'usages : pas de storytelling romanesque, des dossiers de preuve

Chaque cas est structure comme un dossier de pre-audit (contexte, probleme, parties prenantes, solution, resultats, verbatim). Ce format parle aux DSI et RSSI qui evaluent GTC dans un RFP. Les chiffres sont precis (2 400 postes, 11 semaines, 187 kEUR, 312 tCO2e) plutot qu'approximatifs.

### 3.2 Pourquoi-GTC : manifeste fondateur vs argumentaire produit

La page est reorientee comme un manifeste de conviction (pourquoi l'ITAD doit changer) plutot qu'un comparatif avant/apres. Le recit du fondateur ("2 000 disques broyes sans certificat") ancre la mission dans une experience vecue, pas dans du marketing. Les 5 convictions sont des engagements verifiables, pas des valeurs generiques.

### 3.3 Services sous-pages : donnees en dur, pas en i18n

Les 6 sous-pages services utilisent un helper `tx(fr, en)` inline plutot que des cles i18n. Raison : le contenu est tres technique (methodologies, SLA, certifications) et le maintenir dans des fichiers JSON de 2 000+ lignes serait ingerable. Le trade-off est acceptable pour du contenu a faible taux de changement.

---

## 4. Conformite par critere

| Critere | Statut | Detail |
|---|---|---|
| Header expose les pages orphelines | OK | grep confirme : cas-usages, tarifs, secteurs dans mega-menus |
| Footer expose les pages | OK | grep confirme : cas-usages, tarifs, 6 secteurs |
| /cas-usages >= 8 cas structures | OK | 8 cas avec resultats chiffres |
| /pourquoi-gtc 4+ nouvelles sections | OK | 6 sections (mission, fondateur, valeurs, engagements, benefices, articles) |
| /services hub + 5+ sous-pages | OK | Hub existant + 6 sous-pages (audit, effacement, recond, recyclage, cyber, wakibox) |
| npm run build PASS | OK | Zero erreur |
| Messages FR/EN synchronises | OK | Toutes les cles presentes dans les deux fichiers |
| Pas d'emojis UI | OK | Aucun emoji dans les fichiers modifies |
| Pas de photos modifiees (vague 3) | OK | Aucune modification de visuels |
| Page /impact non touchee (vague 2) | OK | Fichier intact |

---

## 5. Fichiers crees et modifies

### Fichiers crees (9)
```
src/app/[locale]/secteurs/page.tsx                          (index)
src/app/[locale]/secteurs/energie/page.tsx
src/app/[locale]/secteurs/retail/page.tsx
src/app/[locale]/services/ServicePageTemplate.tsx           (template reutilisable)
src/app/[locale]/services/audit-inventaire/page.tsx
src/app/[locale]/services/effacement-securise/page.tsx
src/app/[locale]/services/reconditionnement-valorisation/page.tsx
src/app/[locale]/services/recyclage-deee/page.tsx
src/app/[locale]/services/cybersecurite/page.tsx
src/app/[locale]/services/wakibox/page.tsx
```

### Fichiers modifies (5)
```
src/app/[locale]/cas-usages/page.tsx           (refonte complete)
src/app/[locale]/pourquoi-gtc/page.tsx         (refonte complete)
src/app/[locale]/secteurs/SectorPageContent.tsx (extension 6 secteurs)
messages/fr.json                                (+67 lignes)
messages/en.json                                (+70 lignes)
```

---

## 6. Reste pour vagues 2 et 3

### Vague 2 -- Impact carbone + calculateur (P0-2 / P0-4)
- Refonte complete de `/impact/page.tsx` (methodologie GHG, sources, comparatif neuf/recond, calculateur multi-parametres)
- Mapping ESRS E5 (16 data points)
- Certifications et auditabilite
- Cross-linking vers /cas-usages et /secteurs

### Vague 3 -- Photos + polish visuel (P1-4 / P1-5)
- Remplacement des photos en doublon
- Utilisation des 5 photos disponibles jamais utilisees (cybersecurity.jpg, datacenter.jpg, team.jpg, recycling.jpg, meeting.jpg)
- Suppresssion du sous-dossier `/unsplash/`
- Core Web Vitals (LCP, images WebP)
- Parametrage StickyCTA et ExitPopup par categorie de page
- Alignement palette CTA sur #10B981 (actuellement #047857)

### Backlog P2 (post-vagues)
- Enrichir /securite, /processus-itad, /parcours-client, /carrieres
- Creer /equipe (trombinoscope)
- Audit accessibilite WCAG 2.2 AA
- Lead magnets PDF gated
- Page /sources avec toutes les references

---

## 7. Recommandations immediates

1. **Valider les chiffres des 8 cas d'usages** avec l'equipe commerciale avant mise en prod. Les donnees sont plausibles mais doivent etre confirmees par des cas reels.
2. **Verifier la bio du fondateur** (section "Le mot du fondateur") avec la direction avant publication.
3. **Commander le shooting photo interne** (atelier, salle d'effacement, equipe) pour la vague 3 -- les stock photos restent un risque de credibilite B2B.

---

*Rapport genere le 2026-04-25 -- Vague 1 / 3 terminee.*
