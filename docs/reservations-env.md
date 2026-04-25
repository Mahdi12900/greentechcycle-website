# Variables d'environnement — Réservations GreenTechCycle

Toutes les variables sont **optionnelles**. Si elles sont absentes, l'API
`/api/reservation` bascule automatiquement en mode fichier local
(`reservations.jsonl`) et le build/runtime ne casse pas.

À copier dans `.env.local` (dev) et dans Vercel
(Project Settings → Environment Variables) en production.

## Persistance des réservations · Supabase

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (lecture publique conditionnée par RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service-role utilisée uniquement côté serveur (API route). Bypass RLS sur la table `reservations`. |

## E-mails transactionnels · Resend

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé d'API Resend |
| `RESEND_FROM` | Expéditeur validé dans la console Resend (ex : `GreenTechCycle <reservations@greentechcycle.fr>`) |

## Destinataire interne

| Variable | Rôle |
|---|---|
| `CONTACT_EMAIL` | E-mail recevant chaque nouvelle réservation. Défaut : `mahdi@greentechcycle.fr`. |

## Mode dégradé

- Pas de `NEXT_PUBLIC_SUPABASE_URL` ou de clé : l'API écrit dans
  `reservations.jsonl` à la racine du projet (peut échouer en environnement
  serverless en lecture seule, c'est OK : l'utilisateur voit un message de
  réassurance).
- Pas de `RESEND_API_KEY` : aucun e-mail n'est envoyé. Le formulaire
  fonctionne quand même et la confirmation côté UI s'affiche normalement.
- L'utilisateur garde toujours le lien `mailto:mahdi@greentechcycle.fr`
  comme issue de secours.

## Schéma SQL

Le schéma de la table `reservations` est documenté dans
[`reservations-schema.sql`](./reservations-schema.sql).
