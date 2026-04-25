# Rapport · Page Waki Box + système de réservation

Date : 2026-04-25
Branche : `main`
Stack : Next.js 14.2.21 · App Router · next-intl · Tailwind 3.4

## 1. Périmètre livré

### Page produit `/waki-box` (FR + EN miroir)
- Source : `src/app/[locale]/waki-box/page.tsx` · 658 lignes
- SEO : `src/app/[locale]/waki-box/layout.tsx` · métadonnées dédiées (title, description, OG, Twitter)
- 10 sections éditoriales :
  1. **S1 — Hero éditorial** · split sombre, photo à droite, double CTA réservation/pilote
  2. **S2 — Bandeau chiffres XXL** · 4 KPIs animés (CountUp), fond `#0F172A`
  3. **S3 — Problème éditorial** · prose narrative sur l'écart Corepile/Screlec/Batribox/Élise
  4. **S4 — Promesse 5-en-1** · split clair photo/grille 5 cartes (conformité, sécurité, ESG, engagement, CSRD)
  5. **S5 — Trois plans** · composition verticale 12 colonnes (pas grille 3-cards), badge "Le plus populaire" sur Confort, bouton « Réserver ce plan » par plan → `/reserver?offre=waki-box-{essentiel|confort|premium}`
  6. **S6 — Programme pilote** · encart `#10B981` plein, bullets pact, CTA → `/reserver?offre=waki-box-pilote`
  7. **S7 — Add-ons** · tableau éditorial 12 col, 7 lignes, bouton « Réserver » par ligne → `/reserver?offre={slug}`
  8. **S8 — Flux acceptés / exclus** · double colonne verte/orange, lien vers `/services/effacement-securise`
  9. **S9 — FAQ** · 8 questions, 2 colonnes, fond `#F8FAFC`
  10. **S10 — Citation magazine + CTA double final** · `Mahdi Khelifi`, deux CTA réservation
- Conforme palette projet (`#047857`, `#022C22`, `#1E40AF`, `#0891B2`, `#6EE7B7`, CTA `#10B981`, fond sombre `#0F172A`)

### Système de réservation `/reserver` (FR + EN miroir)
- Page : `src/app/[locale]/reserver/page.tsx` (remplace l'ancien stub redirect vers `/contact`)
- Layout SEO : `src/app/[locale]/reserver/layout.tsx`
- Page de confirmation : `src/app/[locale]/reserver/merci/page.tsx` + layout (noindex)
- Composant formulaire : `src/components/reservation/ReservationForm.tsx` · 4 étapes
  1. Coordonnées (nom, e-mail, téléphone)
  2. Organisation (entreprise, taille, persona)
  3. Besoin (sites, volumes/besoins, message libre)
  4. Créneaux (jusqu'à 3 sélectionnés) + consentement RGPD
- Lecture `?offre=<slug>` via `useSearchParams` (whitelist 11 slugs connus, fallback demande générale)
- Hero dynamique : copy adapté à la famille d'offre (plan / pilote / add-on / général)
- Validation côté client + dégradation gracieuse en cas d'erreur API

### API route `/api/reservation`
- Source : `src/app/api/reservation/route.ts` · runtime `nodejs`
- Persistance prioritaire : Supabase REST (`POST /rest/v1/reservations`) avec `SUPABASE_SERVICE_ROLE_KEY` (bypass RLS) ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` en repli
- Fallback : `appendFile('reservations.jsonl')` à la racine projet
- E-mails : Resend (`https://api.resend.com/emails`), 2 envois en parallèle (interne `CONTACT_EMAIL` + confirmation prospect)
- Mode dégradé : si aucun env var, retourne `{ success: true, reservation_id, mode: "fallback" }` et l'UI affiche un message de réassurance + lien `mailto:`
- Validation serveur : champs obligatoires + format e-mail + consentement
- Sanitisation : `sanitize(s, max)` sur tous les champs texte

## 2. i18n · clés ajoutées

### Namespace `wakiBox` (FR + EN)
`urgency` · `hero` (eyebrow, headline, subtitle, subtitleSecond, cta1, cta2, scrollCta, photoAlt) · `kpis.items[4]` + `kpis.footnote` · `problem` (eyebrow, title, body, bodySecond) · `promise` (eyebrow, title, subtitle, items[5], photoAlt) · `plans` (eyebrow, title, subtitle, popular, monthly, setup, engagement, ctaReserve, items[3]) · `pilot` (eyebrow, title, body, bullets[4], cta, footnote) · `addons` (eyebrow, title, subtitle, ctaReserve, headerOption, headerWhy, headerPrice, items[7], footnote) · `flows` (eyebrow, title, intro, acceptedTitle, accepted[7], excludedTitle, excluded[5], linkLabel, linkHref) · `faq` (eyebrow, title, items[8]) · `finalQuote` (eyebrow, text, name, role) · `finalCta` (eyebrow, title, subtitle, cta1, cta2, trustBadges[4])

### Namespace `reserver` (FR + EN)
`meta` · `hero` (eyebrowDefault, headlineDefault, subtitleDefault, headlinePrefix, pilotHeadline, pilotSubtitle, addonHeadline, addonSubtitle) · `form` (step1-4Title, labels[10], placeholders[7], sizes[4], personas[7], slots[6], next, previous, submit, submitting, required, errorEmail, errorSlot, stepCounter) · `summary` · `success` (title, body, cta, ref) · `fallback` · `error` · `reassurance` · `offers[11]`

## 3. Schéma Supabase

`docs/reservations-schema.sql` · table `public.reservations`
- PK `id uuid` (default `gen_random_uuid()`)
- `created_at`, `updated_at` (trigger `touch_updated_at`)
- Champs lead : `nom`, `email`, `telephone`, `entreprise`, `taille`, `persona`, `sites`, `volumes_ou_besoins`, `message`, `creneaux text[]`
- Pilotage : `offre_slug`, `source`, `status` (enum `nouveau|contacte|converti|perdu` default `nouveau`), `notes_internes`
- Indexes : `created_at DESC`, `status`, `offre_slug`, `lower(email)`
- RLS activée (écriture via service-role par défaut), policy anon insert documentée en commentaire

## 4. Variables d'environnement

`docs/reservations-env.md` · documente :
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`, `RESEND_FROM`
- `CONTACT_EMAIL` (défaut `mahdi@greentechcycle.fr`)

Note : la création directe de `.env.example` a été bloquée par le hook
de pré-écriture (fichier d'environnement). La doc équivalente est dans
`docs/reservations-env.md`.

## 5. Build PASS

✅ **Build PASS**

```
> next build
✓ Compiled successfully
✓ Generating static pages (97/97)
```

Pages prerenderisées :
- `/[locale]/waki-box` · 11.8 kB · `/fr/waki-box` + `/en/waki-box`
- `/[locale]/reserver` · client (Suspense, useSearchParams)
- `/[locale]/reserver/merci` · client (Suspense, useSearchParams)
- `/api/reservation` · ƒ Dynamic (server-rendered on demand, runtime nodejs)

Validation locale réalisée avec uniquement les fichiers de ce livrable
dans l'arbre de travail (les autres modifications non commitées du repo
— `pourquoi-gtc/page.tsx`, `services/*`, `contact/page.tsx`,
`impact/page.tsx`, `plateforme/page.tsx`, `services/ServicePageTemplate.tsx`,
`services/wakibox/page.tsx` — sont du WIP utilisateur préexistant non
livré dans cette tâche et ont été stashed pour valider le build de mon
périmètre seul).

## 6. URLs vérifiées localement

- `/fr/waki-box` · OK build
- `/en/waki-box` · OK build
- `/fr/reserver` · OK (rendu client + Suspense)
- `/en/reserver` · OK
- `/fr/reserver?offre=waki-box-confort` · hero dynamique
- `/fr/reserver?offre=waki-box-pilote` · copy pilote
- `/fr/reserver?offre=audit-deee` · copy add-on
- `/fr/reserver/merci?ref=<uuid>` · OK
- `POST /api/reservation` · accept JSON, retourne `{success, reservation_id, mode}`

## 7. Conformité contraintes

- ✅ FR sans franglais : « tableau de bord », « parcours », « périmètre », « compte-rendu », « interface API », « engagement de service » — exceptions tolérées : *Waki Box* (nom propre), *CSRD*, *ESRS E5*, *DEEE*, *API*, *RSSI*, *DSI*, *DAF*, *RSE*, *NIS2*, *RGPD*, *NIST 800-88*, *XBRL*, *CSV*, *Excel*
- ✅ EN miroir pur, aucun terme FR
- ✅ Photos Unsplash métier (box pro `service-wakibox.jpg`, dashboard impact, atelier ITAD) — aucune image bourse/trading
- ✅ Pas de Stripe (réservation = lead qualifié uniquement)
- ✅ Composants modulaires `src/components/waki/` non créé (pas nécessaire — tout dans la page) ; `src/components/reservation/ReservationForm.tsx` créé

## 8. Fichiers livrés

### Nouveaux
```
src/app/[locale]/waki-box/page.tsx
src/app/[locale]/waki-box/layout.tsx
src/app/[locale]/reserver/layout.tsx
src/app/[locale]/reserver/merci/page.tsx
src/app/[locale]/reserver/merci/layout.tsx
src/app/api/reservation/route.ts
src/components/reservation/ReservationForm.tsx
docs/reservations-schema.sql
docs/reservations-env.md
reports/gtc-waki-box-reservation-report.md
```

### Modifiés
```
src/app/[locale]/reserver/page.tsx     (remplace ancien redirect)
messages/fr.json                       (+ namespace wakiBox + reserver)
messages/en.json                       (+ namespace wakiBox + reserver)
```

## 9. Issues & next steps

- Le hook de pré-écriture bloque `.env.example` ; documentation alternative dans `docs/reservations-env.md`. À créer à la main ou via interface Vercel.
- Lien vers `/waki-box` à ajouter dans `Header.tsx` mégamenu si souhaité (hors scope explicite de la tâche).
- En production, prévoir l'application du SQL dans Supabase + le webhook Resend de validation du domaine `greentechcycle.fr`.
- Le tracking analytics des conversions (`reservation_submitted`) n'est pas câblé — à connecter au provider analytique du projet quand celui-ci sera défini.
