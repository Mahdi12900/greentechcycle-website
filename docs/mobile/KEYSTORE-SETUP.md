# Android Keystore Setup

## Génération du Keystore de Release

Le keystore est le fichier de signature qui identifie votre application de manière unique sur le Play Store. **ATTENTION : Ne jamais perdre ce fichier ni les mots de passe associés.**

### 1. Générer le keystore

```bash
cd android

keytool -genkey -v \
  -keystore gtc-release.keystore \
  -alias gtc \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass VOTRE_STORE_PASSWORD \
  -keypass VOTRE_KEY_PASSWORD \
  -dname "CN=GreenTechCycle, OU=Mobile, O=GreenTechCycle, L=Paris, S=Ile-de-France, C=FR"
```

**Remplacer** :
- `VOTRE_STORE_PASSWORD` : mot de passe du keystore (min. 6 caractères)
- `VOTRE_KEY_PASSWORD` : mot de passe de la clé (min. 6 caractères)

### 2. Créer le fichier de configuration

Copier `key.properties.template` vers `key.properties` :

```bash
cp key.properties.template key.properties
```

Éditer `key.properties` avec vos valeurs :

```properties
storeFile=gtc-release.keystore
storePassword=VOTRE_STORE_PASSWORD
keyAlias=gtc
keyPassword=VOTRE_KEY_PASSWORD
```

### 3. Sauvegarder le keystore

**CRITIQUE** : Sauvegarder `gtc-release.keystore` et `key.properties` dans un coffre-fort sécurisé (1Password, Bitwarden, etc.). **Ne JAMAIS** committer ces fichiers sur git.

Si vous perdez ce keystore :
- ❌ Vous ne pourrez plus publier de mises à jour de l'application
- ❌ Vous devrez créer une nouvelle application sur le Play Store
- ❌ Les utilisateurs devront désinstaller et réinstaller

### 4. Vérifier l'exclusion git

Le fichier `.gitignore` doit contenir :

```
*.keystore
*.jks
android/key.properties
```

### 5. Informations du certificat

Pour afficher les informations de votre keystore :

```bash
keytool -list -v -keystore gtc-release.keystore -alias gtc
```

Vous aurez besoin de l'empreinte SHA-256 pour certaines intégrations (Firebase, Google Sign-In, etc.).

## Build de Production

Une fois le keystore configuré, voir [BUILD-ANDROID.md](./BUILD-ANDROID.md) pour générer l'AAB signé.
