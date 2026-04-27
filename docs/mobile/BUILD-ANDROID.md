# Build Android App Bundle (AAB)

## Prérequis

- Android SDK installé (Android Studio recommandé)
- Java JDK 17+ installé
- Keystore de release configuré (voir [KEYSTORE-SETUP.md](./KEYSTORE-SETUP.md))
- Node.js 18+ et npm installés

## Build Complet (Web + Android)

### 1. Build du site web en mode mobile

```bash
npm run build:mobile
```

Cette commande :
- Exclut temporairement les API routes (incompatibles avec export statique)
- Build Next.js en mode `export` (fichiers statiques dans `out/`)
- Restaure les API routes

**Note** : Les formulaires de l'app mobile appelleront l'API live à `https://greentechcycle-website.vercel.app/api/*`.

### 2. Synchroniser avec le projet Android

```bash
npx cap sync android
```

Cette commande copie le contenu de `out/` vers `android/app/src/main/assets/public`.

### 3. Générer l'AAB signé

```bash
cd android
./gradlew bundleRelease
```

**Durée estimée** : 2-5 minutes selon la machine.

### 4. Localiser l'AAB

Le fichier AAB signé sera généré ici :

```
android/app/build/outputs/bundle/release/app-release.aab
```

**Taille attendue** : 10-30 MB

### 5. Vérifier la signature

```bash
cd android
./gradlew :app:signingReport
```

Vous devriez voir les empreintes SHA-1 et SHA-256 de votre certificat de release.

## Build d'un coup (script npm)

Pour simplifier, utilisez :

```bash
npm run android:build
```

Qui exécute `cd android && ./gradlew bundleRelease`.

**⚠️ Assurez-vous d'avoir d'abord exécuté `npm run cap:sync:android`.**

## Troubleshooting

### Erreur "Task :app:validateSigningRelease FAILED"

➡️ Le fichier `key.properties` est manquant ou mal configuré. Voir [KEYSTORE-SETUP.md](./KEYSTORE-SETUP.md).

### Erreur "AAPT: error: resource android:attr/lStar not found"

➡️ Mettre à jour Android SDK Build-Tools vers la version 31+.

```bash
# Dans Android Studio
Tools > SDK Manager > SDK Tools > Android SDK Build-Tools (sélectionner 34.0.0)
```

### Erreur "Could not find or load main class org.gradle.wrapper.GradleWrapperMain"

➡️ Le wrapper Gradle est corrompu. Régénérer :

```bash
cd android
gradle wrapper
```

### Build très lente

➡️ Activer le Gradle daemon et augmenter la heap :

Créer/éditer `android/gradle.properties` :

```properties
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
```

## Build Debug (sans signature)

Pour tester sans keystore de production :

```bash
cd android
./gradlew bundleDebug
```

Output : `android/app/build/outputs/bundle/debug/app-debug.aab`

**⚠️ Ne PAS uploader un AAB debug sur le Play Store.**

## Incrémenter la version

Avant chaque nouvelle release, éditer `android/app/build.gradle` :

```gradle
defaultConfig {
    versionCode 2      // Incrémenter (1 → 2 → 3...)
    versionName "1.1.0" // Semantic versioning
}
```

Le `versionCode` DOIT être strictement croissant.

## Next Steps

Une fois l'AAB généré, voir [playstore/UPLOAD-PROCEDURE.md](./playstore/UPLOAD-PROCEDURE.md) pour publier sur le Play Store.
