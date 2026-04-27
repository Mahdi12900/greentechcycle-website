# Data Safety - Play Console

Ce document détaille les réponses à fournir dans la section **Data Safety** de la Google Play Console.

## Section 1 : Data Collection and Security

### Does your app collect or share any user data?
**✅ Oui**

L'application collecte des données via les formulaires (contact, réservation, newsletter) et affiche du contenu web.

---

## Section 2 : Types de données collectées

### Personal Info - Contact Info
**✅ Email address**
- **Collecté pour** : Newsletter, demandes de contact, réservations
- **Optionnel** : Non (requis pour les formulaires)
- **Éphémère** : Non (stocké côté serveur)

**✅ Name**
- **Collecté pour** : Demandes de contact, réservations
- **Optionnel** : Non
- **Éphémère** : Non

**✅ Phone number**
- **Collecté pour** : Réservations, demandes de contact
- **Optionnel** : Non
- **Éphémère** : Non

### Personal Info - Company/Organization
**✅ Company name**
- **Collecté pour** : Qualification des leads B2B
- **Optionnel** : Non
- **Éphémère** : Non

### Personal Info - Other
**✅ Other user-generated content**
- **Collecté pour** : Messages de contact, descriptions de besoins
- **Optionnel** : Oui (champ message libre)
- **Éphémère** : Non

---

## Section 3 : Utilisation des données

### Comment les données sont-elles utilisées ?

**App functionality**
- ✅ Account management (gestion des demandes clients)
- ✅ Analytics (suivi des conversions)

**Communications**
- ✅ Advertising or marketing (newsletter, offres commerciales)
- ✅ Developer communications (réponses aux demandes)

---

## Section 4 : Partage des données

### Les données sont-elles partagées avec des tiers ?
**✅ Oui**

**Tiers concernés** :
1. **Supabase** (hébergement base de données)
   - Localisation : UE (Frankfurt)
   - Sous-traitant RGPD (DPA signé)
   - Données : email, nom, téléphone, entreprise, messages

2. **Resend** (emails transactionnels)
   - Localisation : USA (Privacy Shield successor)
   - Sous-traitant RGPD (DPA signé)
   - Données : email, nom (pour envoi confirmations)

**❌ AUCUN partage avec des annonceurs tiers.**

---

## Section 5 : Sécurité des données

### Is all user data encrypted in transit?
**✅ Oui**
- Tous les échanges utilisent HTTPS/TLS 1.3
- Certificats SSL/TLS valides (Let's Encrypt/Vercel)

### Can users request their data be deleted?
**✅ Oui**

**Procédure de suppression** :
1. Envoyer un email à `contact@greentechcycle.fr` avec objet "Suppression données RGPD"
2. Inclure l'adresse email à supprimer
3. Délai de réponse : 30 jours maximum
4. Confirmation par email une fois la suppression effectuée

Alternative : formulaire en ligne à `https://greentechcycle-website.vercel.app/fr/mentions-legales#rgpd`

---

## Section 6 : Pratiques de confidentialité

### Privacy Policy URL
```
https://greentechcycle-website.vercel.app/fr/mentions-legales
```

**Note** : L'URL doit être accessible publiquement et contenir :
- ✅ Types de données collectées
- ✅ Finalités de traitement
- ✅ Durée de conservation
- ✅ Droits des utilisateurs (accès, rectification, suppression, portabilité)
- ✅ Coordonnées du DPO/responsable de traitement
- ✅ Droit de réclamation auprès de la CNIL

---

## Section 7 : Conformité RGPD

### Base légale du traitement
- **Consentement** : Newsletter (opt-in explicite avec checkbox)
- **Exécution d'un contrat** : Réservations et demandes de devis (intérêt légitime précontractuel)
- **Obligation légale** : Conservation des données clients pour obligations comptables (10 ans)

### Durée de conservation
- Prospects (pas de signature) : 3 ans après dernier contact
- Clients (signature contrat) : 10 ans après fin du contrat
- Newsletter : jusqu'à désinscription

### Droits des utilisateurs
- ✅ Droit d'accès
- ✅ Droit de rectification
- ✅ Droit à l'effacement
- ✅ Droit à la portabilité
- ✅ Droit d'opposition
- ✅ Droit de limitation du traitement

**Contact DPO** : contact@greentechcycle.fr

---

## Section 8 : App Access (Permissions)

### Permissions requises dans AndroidManifest.xml

**INTERNET** (obligatoire)
- **Raison** : Chargement du contenu web via WebView
- **Visible par l'utilisateur** : Non (permission normale)

**ACCESS_NETWORK_STATE** (recommandée)
- **Raison** : Détection de la connectivité pour afficher un message offline
- **Visible par l'utilisateur** : Non (permission normale)

**Aucune permission dangereuse** (caméra, localisation, contacts, etc.)

---

## Checklist avant soumission

- [ ] Privacy Policy URL accessible et complète
- [ ] DPA signé avec Supabase et Resend (preuves disponibles)
- [ ] Procédure de suppression des données documentée et testée
- [ ] Tous les champs Data Safety remplis dans la Play Console
- [ ] Content rating "Everyone" (E) validé
- [ ] Email de contact DPO/support configuré et monitored

---

## Ressources

- [Guide Data Safety Google](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Checklist RGPD CNIL](https://www.cnil.fr/fr/rgpd-passer-a-laction)
- [Modèle Privacy Policy](https://www.privacypolicies.com/)
