# Procédure de Publication sur Google Play Store

## Vue d'ensemble

Cette procédure détaille les étapes complètes pour publier l'application **GreenTechCycle** sur le Google Play Store.

**Durée estimée** : 3-5 heures (première publication) + 24-72h de review Google

---

## Prérequis

- [ ] AAB signé généré (`app-release.aab`, voir [BUILD-ANDROID.md](../BUILD-ANDROID.md))
- [ ] Keystore de production sauvegardé en lieu sûr
- [ ] Compte Google actif (compte entreprise recommandé)
- [ ] Carte bancaire (frais unique de 25 USD)
- [ ] Assets Play Store générés (icônes, screenshots, feature graphic)
- [ ] Listings FR + EN rédigés
- [ ] Privacy Policy accessible en ligne

---

## Étape 1 : Créer un compte développeur Google Play (25 USD une fois)

1. Aller sur [Google Play Console](https://play.google.com/console)
2. Se connecter avec un compte Google (@greentechcycle.com recommandé)
3. Accepter les conditions de service
4. Payer les frais d'inscription (25 USD, carte bancaire)
5. Compléter le profil développeur :
   - **Nom du développeur** : "GreenTechCycle"
   - **Email de contact** : contact@greentechcycle.fr
   - **Site web** : https://greentechcycle-website.vercel.app
   - **Adresse physique** : (adresse du siège social)
   - **Numéro de téléphone** : (téléphone support)

**Délai** : Validation du compte sous 24-48h.

---

## Étape 2 : Créer une nouvelle application

1. Dans Play Console, cliquer **Create app**
2. Remplir le formulaire :
   - **App name** : GreenTechCycle
   - **Default language** : Français (France)
   - **App or game** : App
   - **Free or paid** : Free
   - **Declarations** :
     - ✅ Developer Program Policies
     - ✅ US export laws
3. Cliquer **Create app**

---

## Étape 3 : Compléter Store Listing (FR)

Dans **Grow > Store presence > Main store listing** :

### 3.1 Textes

- **App name** : `GreenTechCycle`
- **Short description** : (copier depuis `listing-fr.md`)
- **Full description** : (copier depuis `listing-fr.md`)

### 3.2 Graphics

**App icon** (512×512, PNG)
- Uploader `icon-512.png` (généré dans l'étape 4)

**Feature graphic** (1024×500, PNG/JPG)
- Uploader `feature-graphic-1024x500.png`

**Phone screenshots** (min. 2, max. 8)
- Format : PNG/JPG, 16:9 ou 9:16
- Résolution min : 320px sur le côté court
- Uploader les 5 screenshots :
  1. `screenshot-1-home.png` (page d'accueil)
  2. `screenshot-2-pricing.png` (page tarifs)
  3. `screenshot-3-platform.png` (page plateforme)
  4. `screenshot-4-booking.png` (page réservation)
  5. `screenshot-5-why.png` (page pourquoi-gtc)

**7-inch tablet screenshots** (optionnel, recommandé)
- Mêmes screenshots en format tablette si disponible

**10-inch tablet screenshots** (optionnel)
- Idem

### 3.3 Categorization

- **App category** : Business
- **Tags** : ITAD, IT Recycling, Carbon Footprint, CSRD, GDPR Compliance

### 3.4 Contact details

- **Email** : contact@greentechcycle.fr
- **Phone** : (optionnel mais recommandé)
- **Website** : https://greentechcycle-website.vercel.app

### 3.5 Privacy Policy

- **Privacy Policy URL** : `https://greentechcycle-website.vercel.app/fr/mentions-legales`

---

## Étape 4 : Ajouter Store Listing EN

1. Dans **Store presence > Main store listing**, cliquer **Add translation**
2. Sélectionner **English (United States)**
3. Remplir avec le contenu de `listing-en.md`
4. Uploader les **mêmes assets** (icône, feature graphic, screenshots)

**Note** : Les assets visuels peuvent être les mêmes FR/EN si le texte à l'écran est en anglais.

---

## Étape 5 : Compléter Data Safety

Dans **App content > Data safety** :

1. Cliquer **Start**
2. Répondre aux questions en suivant **exactement** `data-safety.md`
3. Points clés :
   - ✅ "Does your app collect or share user data?" → **Yes**
   - Données collectées : Email, Name, Phone, Company, Messages
   - Finalités : App functionality, Marketing, Customer support
   - Partage avec : Supabase (EU), Resend (USA) - **sous-traitants RGPD uniquement**
   - ✅ All data encrypted in transit (HTTPS)
   - ✅ Users can request deletion (email à contact@greentechcycle.fr)
4. Sauvegarder

---

## Étape 6 : Compléter App Access

Dans **App content > App access** :

1. **All functionality is available without special access** → **Yes**
2. Aucun login/credential requis pour utiliser l'app
3. Sauvegarder

---

## Étape 7 : Compléter Ads

Dans **App content > Ads** :

1. **Does your app contain ads?** → **No**
2. GreenTechCycle n'affiche aucune publicité tierce
3. Sauvegarder

---

## Étape 8 : Compléter Content Rating

Dans **App content > Content rating** :

1. Cliquer **Start questionnaire**
2. **Email address** : contact@greentechcycle.fr
3. **Category** : Utility, Productivity, Communication, Other
   - Sélectionner **Business**
4. Répondre aux questions :
   - Violence → No
   - Sexual content → No
   - Language → No
   - Controlled substances → No
   - User interaction → Yes (users can communicate, user-generated content)
   - Share location → No
   - Share personal info → Yes (via contact forms, business purpose)
5. **Rating obtenu** : Everyone (E) - PEGI 3

**⚠️ Important** : Valider que le rating est bien **E (Everyone)**. Un rating plus restrictif réduirait l'audience.

---

## Étape 9 : Compléter Target Audience

Dans **App content > Target audience and content** :

1. **Target age** : 18+ (application B2B professionnelle)
2. **Appeals to children** → **No**
3. Sauvegarder

---

## Étape 10 : Compléter News Apps (optionnel)

Si l'app contient un blog/actualités :

1. **Is this a news app?** → **No** (le blog est secondaire)

---

## Étape 11 : Compléter COVID-19 Contact Tracing

**App is a COVID-19 contact tracing or status app** → **No**

---

## Étape 12 : Compléter Data Safety Review

Revérifier que toutes les sections **App content** ont une ✅ verte :

- [x] Data safety
- [x] App access
- [x] Ads
- [x] Content rating
- [x] Target audience
- [x] News apps (si applicable)
- [x] COVID-19

---

## Étape 13 : Créer une release interne (test recommandé)

**Avant la production, tester avec Internal Testing :**

1. Aller dans **Release > Testing > Internal testing**
2. Cliquer **Create new release**
3. Uploader `app-release.aab`
4. **Release name** : `1.0.0 - Internal Test`
5. **Release notes** :
   ```
   Version initiale - Test interne
   • Toutes les pages accessibles
   • Formulaires de contact/réservation
   • Dashboard Plateforme
   ```
6. Ajouter des testeurs :
   - Créer une liste de testeurs (max 100 emails)
   - Ajouter vos emails internes (@greentechcycle.com)
7. **Review release** puis **Start rollout to Internal testing**
8. Partager le lien de test avec les testeurs
9. **Tester pendant 2-3 jours** avant production

**Avantages** :
- Détection de bugs avant la review publique
- Validation de l'AAB (signature, permissions, compatibilité)
- Feedback rapide des utilisateurs pilotes

---

## Étape 14 : Créer la release de production

Une fois le test interne validé :

1. Aller dans **Release > Production**
2. Cliquer **Create new release**
3. Uploader `app-release.aab` (le même que le test interne si OK)
4. Google affiche :
   - **Version code** : 1
   - **Min SDK** : 24 (Android 7.0+)
   - **Target SDK** : 34
   - **Permissions** : INTERNET, ACCESS_NETWORK_STATE
   - **Signature** : SHA-256 du certificat
5. **Release name** : `1.0.0`
6. **Release notes (FR)** :
   ```
   🎉 Première version de l'application GreenTechCycle ITAD !

   Fonctionnalités :
   • Accès mobile à la Plateforme GreenTechCycle
   • Réservation de collecte ITAD en ligne
   • Consultation des offres Waki Box
   • Simulation tarifaire instantanée
   • Accès aux guides conformité (CSRD, NIST, NIS2)
   • Contact direct avec l'équipe

   Besoin d'aide ? contact@greentechcycle.fr
   ```
7. **Release notes (EN)** :
   ```
   🎉 First release of the GreenTechCycle ITAD app!

   Features:
   • Mobile access to GreenTechCycle Platform
   • Online ITAD collection booking
   • Waki Box offers consultation
   • Instant pricing simulation
   • Access to compliance guides (CSRD, NIST, NIS2)
   • Direct contact with the team

   Need help? contact@greentechcycle.fr
   ```
8. **Countries/regions** : Sélectionner :
   - ✅ France (priorité)
   - ✅ Belgique
   - ✅ Suisse
   - ✅ Luxembourg
   - ✅ Canada (optionnel)
   - ❌ Autres pays : à évaluer selon stratégie commerciale

9. **Review release**
10. Vérifier la checklist :
    - [x] AAB uploadé et valide
    - [x] Release notes FR + EN
    - [x] Pays ciblés sélectionnés
    - [x] Toutes les sections App content complètes
    - [x] Store listing FR + EN complets
11. **Cliquer "Start rollout to Production"**

---

## Étape 15 : Soumission à la review Google

1. Google affiche un récapitulatif
2. Cliquer **Confirm rollout**
3. Status passe à **In review**

**Délai de review** : 24-72 heures (parfois jusqu'à 7 jours)

**Ce que Google vérifie** :
- Conformité aux [Developer Program Policies](https://play.google.com/about/developer-content-policy/)
- Absence de malware
- Permissions justifiées
- Métadonnées non trompeuses
- Privacy Policy accessible

---

## Étape 16 : Pendant la review

### Actions recommandées :

1. **Surveiller les emails** :
   - Google envoie des notifications sur le compte développeur
   - Vérifier spam/promotions
   - Temps de réponse critique si Google demande des clarifications

2. **Préparer les réponses** :
   - Pourquoi l'app collecte email/téléphone → Forms B2B, GDPR-compliant
   - Pourquoi INTERNET permission → WebView app, loads website content
   - Proof of privacy policy → URL accessible

3. **Monitoring Play Console** :
   - Status visible dans **Release > Production**
   - États possibles :
     - ⏳ In review
     - ✅ Published
     - ❌ Rejected (avec raisons détaillées)

### Si rejetée :

1. Lire attentivement le motif de rejet
2. Corriger le problème (code, metadata, privacy policy, etc.)
3. Incrémenter versionCode dans `build.gradle`
4. Rebuild l'AAB
5. Créer une nouvelle release
6. Répondre au message de Google avec les correctifs apportés

---

## Étape 17 : Publication réussie

Quand le status passe à **Published** :

1. ✅ L'app est visible sur le Play Store sous 1-2 heures
2. URL de l'app : `https://play.google.com/store/apps/details?id=com.greentechcycle.app`
3. Vérifier la page publique :
   - Icône correcte
   - Screenshots affichés
   - Description FR/EN disponibles
   - Note "Aucun avis" (normal au lancement)

### Actions post-lancement :

1. **Communication** :
   - Annoncer sur LinkedIn, Twitter, site web
   - Email aux clients existants
   - Ajouter badge "Disponible sur Google Play" sur le site

2. **Monitoring** :
   - Activer Google Analytics for Firebase (optionnel)
   - Surveiller les crashs dans Play Console > Quality > Crashes
   - Surveiller les avis utilisateurs (répondre sous 24-48h)

3. **ASO (App Store Optimization)** :
   - Encourager les premiers avis 5★ (clients satisfaits)
   - Optimiser les mots-clés selon les recherches
   - A/B tester les screenshots après 1 mois

---

## Checklist finale avant soumission

### App Build
- [ ] AAB signé avec keystore de PRODUCTION (pas debug)
- [ ] versionCode = 1, versionName = "1.0.0"
- [ ] minSdkVersion = 24, targetSdkVersion = 34
- [ ] Testé sur émulateur ET device physique
- [ ] Aucun crash au lancement
- [ ] Toutes les pages accessibles
- [ ] Formulaires fonctionnels (appellent l'API live)

### Play Console - App Content
- [ ] Data safety complété et exact
- [ ] Content rating = E (Everyone)
- [ ] Privacy Policy URL accessible publiquement
- [ ] Ads = No
- [ ] App access = All functionality available
- [ ] Target audience = 18+

### Play Console - Store Listing
- [ ] Listing FR complet (titre, descriptions, assets)
- [ ] Listing EN complet (titre, descriptions, assets)
- [ ] Icône 512×512 uploadée
- [ ] Feature graphic 1024×500 uploadée
- [ ] Minimum 2 screenshots phone (5 recommandés)
- [ ] Email de contact monitored
- [ ] Site web accessible
- [ ] Catégorie = Business
- [ ] Tags pertinents ajoutés

### Assets Graphiques
- [ ] Icône haute résolution (pas de texte, lisible à petite taille)
- [ ] Feature graphic professionnel (branding cohérent)
- [ ] Screenshots montrent les vraies fonctionnalités (pas de mockups)
- [ ] Pas de captures d'écran d'émulateur (bordures Android)
- [ ] Texte lisible sur tous les assets

### Légal & RGPD
- [ ] Privacy Policy contient toutes les mentions RGPD
- [ ] DPA signé avec Supabase et Resend
- [ ] Procédure de suppression des données documentée
- [ ] Email DPO/contact configuré et monitored
- [ ] Conformité aux Developer Program Policies vérifiée

---

## Mises à jour futures

Pour publier une version 1.1.0, 2.0.0, etc. :

1. Éditer `android/app/build.gradle` :
   ```gradle
   versionCode 2         // Incrémenter (DOIT être > 1)
   versionName "1.1.0"   // Semantic versioning
   ```

2. Rebuild l'AAB :
   ```bash
   npm run cap:sync:android
   cd android && ./gradlew bundleRelease
   ```

3. Dans Play Console > Production, créer une nouvelle release
4. Uploader le nouvel AAB
5. Ajouter les release notes (changelog)
6. Start rollout (100% ou staged rollout 10% → 50% → 100%)

**Rollout progressif recommandé** pour les updates majeures (détection de bugs avant déploiement complet).

---

## Support & Ressources

- [Play Console Help Center](https://support.google.com/googleplay/android-developer)
- [Developer Program Policies](https://play.google.com/about/developer-content-policy/)
- [Data Safety Guide](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Pre-launch Reports](https://support.google.com/googleplay/android-developer/answer/7002270) (tests auto Google)
- [Release Dashboard](https://play.google.com/console) (statistiques téléchargements, crashs, avis)

---

## Contact en cas de blocage

**Email Google Play Support** : disponible dans Play Console > Help > Contact us

**Délai de réponse** : 24-48h (en anglais généralement)

**Communauté** : [Android Developers Reddit](https://reddit.com/r/androiddev)

---

**Bonne chance pour la publication ! 🚀**
