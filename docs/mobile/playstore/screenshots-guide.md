# Screenshots Guide - Play Store

## Spécifications techniques

**Format** : PNG ou JPG (PNG recommandé pour la qualité)
**Ratio** : 16:9 (landscape) ou 9:16 (portrait)
**Résolution minimale** : 320px sur le côté court
**Résolution recommandée** : 1080×1920 (portrait) ou 1920×1080 (landscape)
**Nombre** : Min. 2, max. 8 (5-6 recommandé)
**Taille de fichier** : Max. 8 MB par screenshot

---

## 5 Screenshots à capturer (ordre d'affichage)

### Screenshot 1 : Page d'accueil (Home)
**Fichier** : `screenshot-1-home.png`
**URL** : `/fr` ou `/en`
**Focus** : Hero section + 3 portes d'entrée

**Points clés à montrer** :
- Titre principal "GreenTechCycle - Plateforme ITAD unifiée"
- Tagline avec les 3 rôles (RSSI, RSE, DAF)
- Section "3 portes d'entrée" avec les personas
- Call-to-action "Réserver un audit" visible

**Timing de capture** :
- Attendre le chargement complet des images
- Scroller jusqu'à avoir le hero + début de la section portes d'entrée

---

### Screenshot 2 : Page Tarifs
**Fichier** : `screenshot-2-pricing.png`
**URL** : `/fr/tarifs` ou `/en/tarifs`
**Focus** : Les 4 offres tarifaires

**Points clés à montrer** :
- Section Waki Box avec les 3 tiers (39/79/149 €)
- Pilote Audit 3 jours (2 900 € HT)
- Prix lisibles et call-to-action "Réserver" visible
- Badge "Premier mois offert" si présent

**Timing de capture** :
- Scroller jusqu'à la grille des 3 offres Waki Box
- Capturer avec le pilote visible en dessous

---

### Screenshot 3 : Page Plateforme
**Fichier** : `screenshot-3-platform.png`
**URL** : `/fr/plateforme` ou `/en/plateforme`
**Focus** : Dashboard et fonctionnalités

**Points clés à montrer** :
- Titre "Plateforme GreenTechCycle"
- Description "À partir de 2 500 € HT/mois"
- Liste des fonctionnalités clés (dashboard, orchestration, rapports)
- Capture d'écran du dashboard si présente
- Modules optionnels visibles

**Timing de capture** :
- Section hero avec prix + début des fonctionnalités
- Ou section avec capture d'écran du produit

---

### Screenshot 4 : Page Réservation
**Fichier** : `screenshot-4-booking.png`
**URL** : `/fr/reserver` ou `/en/reserver`
**Focus** : Formulaire de réservation

**Points clés à montrer** :
- Sélection de l'offre (dropdown avec les 4 offres)
- Récapitulatif du prix avec le setup gratuit
- Formulaire de contact (nom, email, téléphone, entreprise)
- Champs optionnels (persona, besoins, créneaux)
- Bouton "Réserver maintenant" visible

**Timing de capture** :
- Formulaire complet visible (peut nécessiter 2 screenshots si trop long)
- Choisir une offre dans le dropdown pour afficher le récapitulatif

---

### Screenshot 5 : Page Pourquoi GTC
**Fichier** : `screenshot-5-why.png`
**URL** : `/fr/pourquoi-gtc` ou `/en/pourquoi-gtc`
**Focus** : Valeur ajoutée et différenciation

**Points clés à montrer** :
- Titre "Pourquoi choisir GreenTechCycle ?"
- Section expertise ou éthique
- Certifications (NIST, ISO 27001, R2v3, ADEME)
- Trust banner avec logos clients si présent
- Ancre vers fondateur ou engagement

**Timing de capture** :
- Section avec les certifications visible
- Ou section "Notre expertise" avec les 3 piliers

---

## Méthode de capture

### Option A : Capture sur device Android physique (recommandé)

1. Installer l'app via Internal Testing (voir UPLOAD-PROCEDURE.md étape 13)
2. Ouvrir l'app sur un device Android (Pixel 6/7 recommandé pour ratio 9:16)
3. Naviguer vers chaque page
4. Utiliser les boutons Volume Down + Power simultanément
5. Screenshots sauvegardés dans `Photos > Screenshots`
6. Transférer via USB ou Google Photos

**Avantages** :
- Screenshots natifs de l'app réelle
- Status bar et navigation bar Android authentiques
- Meilleure fidélité visuelle

**Device recommandés** :
- Google Pixel 6/7/8 (1080×2400, ratio 9:20)
- Samsung Galaxy S21/S22/S23 (1080×2400)
- OnePlus 9/10 (1080×2400)

### Option B : Capture via émulateur Android Studio

1. Ouvrir Android Studio
2. Lancer AVD Manager (Android Virtual Device)
3. Créer un device Pixel 6 API 34 (Android 14)
4. Installer l'AAB via `adb install app-release.aab`
5. Ouvrir l'app dans l'émulateur
6. Utiliser l'outil "Camera" de l'émulateur (icône appareil photo)
7. Screenshots sauvegardés dans le répertoire AVD

**⚠️ Attention** : Google rejette parfois les screenshots d'émulateur (bordures visibles, fonts différentes).

### Option C : Capture du site web (fallback)

Si l'app n'est pas encore publiée pour Internal Testing :

1. Ouvrir Chrome en mode device emulation (F12 > Toggle device toolbar)
2. Sélectionner "iPhone 12 Pro" ou custom (390×844)
3. Naviguer sur https://greentechcycle-website.vercel.app
4. Capturer via l'outil screenshot de Chrome (Cmd+Shift+P > Capture screenshot)
5. Recadrer pour obtenir ratio 9:16

**⚠️ Limitation** : Ne montre pas l'app native, mais peut suffire pour la première soumission.

---

## Post-traitement (optionnel mais recommandé)

### Ajouter des annotations

Pour rendre les screenshots plus vendeurs, ajouter :

1. **Titre court** en haut (24-32px, font bold)
   - Screenshot 1 : "Plateforme ITAD unifiée"
   - Screenshot 2 : "Tarifs transparents"
   - Screenshot 3 : "Dashboard temps réel"
   - Screenshot 4 : "Réservation en 3 clics"
   - Screenshot 5 : "Certifications et conformité"

2. **Highlight d'une fonctionnalité** (flèche ou encadré)
   - Screenshot 2 : Encadrer le prix "Premier mois offert"
   - Screenshot 3 : Encadrer "Rapports ESG automatisés"

**Outils** :
- Figma (template Play Store screenshots)
- Canva (modèles mobile app screenshots)
- Photoshop/GIMP
- [App Mockup](https://app-mockup.com/) (génération automatique)

### Template Figma recommandé

1. Frame 1080×1920 (9:16 portrait)
2. Importer le screenshot brut
3. Ajouter un bandeau en haut (1080×200) avec dégradé vert #10B981
4. Texte blanc bold 32px centré
5. Optionnel : ajouter le logo GTC en coin supérieur droit (64×64)

---

## Checklist avant upload

- [ ] 5 screenshots générés (home, tarifs, plateforme, réservation, pourquoi-gtc)
- [ ] Format PNG ou JPG
- [ ] Résolution min 1080×1920 (portrait) ou 1920×1080 (landscape)
- [ ] Ratio 9:16 ou 16:9 strict (pas de bordures)
- [ ] Taille < 8 MB par fichier
- [ ] Texte lisible même en miniature (police ≥ 14px sur le device)
- [ ] Pas de bordure d'émulateur visible
- [ ] Status bar cohérente entre screenshots (même heure, batterie, wifi)
- [ ] Ordre logique (parcours utilisateur : découverte → pricing → booking)

---

## Assets supplémentaires (optionnels)

### Screenshots tablette 7" (1024×600 ou 600×1024)

Mêmes pages mais capturées sur tablette Android. Recommandé si vous ciblez les utilisateurs tablette (moins prioritaire pour une app B2B).

### Screenshots tablette 10" (1920×1200 ou 1200×1920)

Idem, format tablette large.

### Promo video (optionnel, max impact)

**Format** : MP4, WebM
**Durée** : 30 secondes - 2 minutes
**Résolution** : 1080p min (1920×1080)
**Ratio** : 16:9

**Contenu recommandé** :
- 0-5s : Logo + tagline "Plateforme ITAD unifiée"
- 5-15s : Démonstration du dashboard Plateforme
- 15-25s : Parcours de réservation en accéléré
- 25-30s : Certifications + call-to-action "Téléchargez l'app"

**Outils** :
- Loom (screen recording)
- OBS Studio (gratuit, recording device)
- Adobe Premiere / Final Cut Pro
- Canva Video (templates mobile app promo)

**⚠️ Note** : La vidéo peut être ajoutée APRÈS la première publication (ne bloque pas).

---

## Ressources

- [Play Store Screenshot Best Practices](https://developer.android.com/distribute/best-practices/launch/store-listing)
- [Google Play Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151)
- [Screenshot.rocks](https://screenshot.rocks/) (mockup generator)
- [Previewed.app](https://previewed.app/) (device frames)

---

**Prochaine étape** : Une fois les screenshots générés, voir [UPLOAD-PROCEDURE.md](./UPLOAD-PROCEDURE.md) étape 3.2 pour les uploader.
