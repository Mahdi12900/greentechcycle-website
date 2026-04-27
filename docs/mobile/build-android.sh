#!/bin/bash
#
# Script de build Android AAB pour GreenTechCycle
# Prérequis : Android SDK, JDK 17, keystore de production
#
# Usage :
#   ./docs/mobile/build-android.sh
#
# Sortie :
#   android/app/build/outputs/bundle/release/app-release.aab (non signé)
#   android/app/build/outputs/bundle/release/app-release.aab (signé avec keystore)
#

set -e  # Arrêt immédiat en cas d'erreur

echo "🚀 Build Android AAB pour GreenTechCycle"
echo "========================================"
echo ""

# Vérification des prérequis
echo "🔍 Vérification des prérequis..."

if ! command -v java &> /dev/null; then
    echo "❌ ERREUR : Java (JDK 17) non trouvé."
    echo "   Installation recommandée : https://adoptium.net/ (Temurin 17)"
    echo "   Ou via Homebrew : brew install openjdk@17"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | grep version | awk '{print $3}' | tr -d '"' | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ ERREUR : Java 17 minimum requis (version actuelle : $JAVA_VERSION)"
    exit 1
fi

echo "✅ Java $JAVA_VERSION détecté"

if [ ! -d "$ANDROID_HOME" ] && [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "❌ ERREUR : Android SDK non trouvé."
    echo "   Installer Android Studio : https://developer.android.com/studio"
    echo "   Ou définir ANDROID_HOME : export ANDROID_HOME=/path/to/android-sdk"
    exit 1
fi

SDK_DIR="${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
echo "✅ Android SDK détecté : $SDK_DIR"

# Vérification du keystore de production
KEYSTORE_PATH="$HOME/.android/greentechcycle-release.keystore"

if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "⚠️  ATTENTION : Keystore de production non trouvé à $KEYSTORE_PATH"
    echo ""
    echo "Pour générer un keystore de production (À FAIRE UNE SEULE FOIS) :"
    echo ""
    echo "keytool -genkeypair -v \\"
    echo "  -storetype PKCS12 \\"
    echo "  -keystore ~/.android/greentechcycle-release.keystore \\"
    echo "  -alias greentechcycle \\"
    echo "  -keyalg RSA \\"
    echo "  -keysize 4096 \\"
    echo "  -validity 10000 \\"
    echo "  -dname 'CN=GreenTechCycle, OU=IT, O=GreenTechCycle SAS, L=Lyon, ST=Rhone, C=FR' \\"
    echo "  -storepass VOTRE_PASS_ICI \\"
    echo "  -keypass VOTRE_PASS_ICI"
    echo ""
    echo "⚠️  IMPORTANT : Sauvegardez le keystore ET les mots de passe en lieu sûr !"
    echo "   La perte du keystore rend impossible toute mise à jour ultérieure de l'app."
    echo ""
    read -p "Continuer sans signature (build debug) ? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    SIGN_BUILD=false
else
    echo "✅ Keystore de production trouvé : $KEYSTORE_PATH"
    SIGN_BUILD=true
fi

# Synchronisation Capacitor
echo ""
echo "📦 Synchronisation Capacitor..."
cd "$(dirname "$0")/../.."
npm run cap:sync:android

# Build AAB
echo ""
echo "🔨 Build de l'AAB release..."
cd android

if [ "$SIGN_BUILD" = true ]; then
    echo "   Mode : PRODUCTION (signé avec keystore)"
    read -sp "Mot de passe du keystore : " KEYSTORE_PASSWORD
    echo ""

    # Configuration Gradle pour signature
    export ORG_GRADLE_PROJECT_GREENTECHCYCLE_RELEASE_STORE_FILE="$KEYSTORE_PATH"
    export ORG_GRADLE_PROJECT_GREENTECHCYCLE_RELEASE_STORE_PASSWORD="$KEYSTORE_PASSWORD"
    export ORG_GRADLE_PROJECT_GREENTECHCYCLE_RELEASE_KEY_ALIAS="greentechcycle"
    export ORG_GRADLE_PROJECT_GREENTECHCYCLE_RELEASE_KEY_PASSWORD="$KEYSTORE_PASSWORD"

    ./gradlew bundleRelease --stacktrace
else
    echo "   Mode : DEBUG (non signé)"
    ./gradlew bundleRelease --stacktrace
fi

# Résultats
echo ""
echo "🎉 Build terminé avec succès !"
echo ""

if [ "$SIGN_BUILD" = true ]; then
    AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
    echo "📦 AAB signé créé :"
    echo "   $AAB_PATH"
    echo ""
    ls -lh "$AAB_PATH"
    echo ""
    echo "✅ Cet AAB est prêt pour upload sur Play Console"
    echo "   URL : https://play.google.com/console"
else
    echo "⚠️  AAB NON SIGNÉ créé (debug uniquement)"
    echo "   Générez un keystore de production avant le déploiement Play Store"
fi

echo ""
echo "📋 Prochaines étapes :"
echo "   1. Vérifier l'AAB : bundletool build-apks --bundle=app-release.aab --output=test.apks"
echo "   2. Tester sur device : bundletool install-apks --apks=test.apks"
echo "   3. Uploader sur Play Console > Production"
echo ""
