# Génération des Assets Play Store

## Vue d'ensemble

Ce guide explique comment générer les assets graphiques requis pour le Play Store.

## Assets requis

| Asset | Dimensions | Format | Utilisation |
|-------|-----------|--------|-------------|
| Icône app | 512×512 | PNG | Store listing, icône sur device |
| Icône adaptive foreground | 432×432 | PNG | Android 8+ icône adaptative (avant-plan) |
| Icône adaptive background | 432×432 | PNG | Android 8+ icône adaptative (arrière-plan) |
| Feature graphic | 1024×500 | PNG/JPG | Bannière en haut du store listing |
| Screenshots phone | 1080×1920 | PNG/JPG | 2-8 captures d'écran (voir screenshots-guide.md) |

---

## Option A : Génération manuelle (Figma/Canva recommandé)

### 1. Icône 512×512

**Concept** : Logo GTC sur fond clair ou transparent

1. Ouvrir Figma ou Canva
2. Créer un frame 512×512
3. Importer le logo GreenTechCycle (SVG ou PNG haute résolution)
4. Centrer le logo, taille ~400×400 (laisser 56px de padding)
5. Fond : blanc #FFFFFF ou vert clair #F0FDF4 ou transparent
6. **Ne PAS ajouter de texte** (l'icône doit être lisible à 48×48)
7. Exporter en PNG 512×512, 72 DPI minimum

**Contraintes Google** :
- ❌ Pas de texte (sauf si partie du logo)
- ❌ Pas de bordure épaisse
- ❌ Pas de dégradé trop complexe (illisible en petit)
- ✅ Contraste élevé
- ✅ Forme simple et reconnaissable

### 2. Icônes adaptive (432×432)

Android 8+ utilise des icônes adaptatives en 2 calques.

**Foreground (avant-plan)** : `icon-adaptive-foreground.png`
- Frame 432×432
- Zone de sécurité : cercle de 288px de diamètre centré
- Contenu : Logo GTC uniquement (pas de fond)
- Fond transparent (PNG avec alpha channel)

**Background (arrière-plan)** : `icon-adaptive-background.png`
- Frame 432×432
- Couleur unie : vert GTC #10B981 ou blanc #FFFFFF
- Pas de contenu (juste la couleur de fond)

**Preview** : Android découpe ces calques en cercle, carré arrondi, ou squircle selon le launcher.

### 3. Feature Graphic (1024×500)

**Concept** : Bannière marketing avec le tagline et un visuel

**Composition recommandée** :
- **Gauche (512×500)** : Titre + tagline
  - "GreenTechCycle" (font bold 48px, blanc ou vert foncé)
  - "Plateforme ITAD unifiée" (font regular 24px)
  - "Conformité · RSE · Valorisation" (font light 18px)
- **Droite (512×500)** : Visuel datacenter ou dashboard
  - Utiliser `/public/photos/hp-datacenter-green.jpg` (recadré)
  - Ou mockup du dashboard Plateforme

**Fond** :
- Dégradé vert #10B981 → #059669 (gauche → droite)
- Ou blanc avec bordure verte

**Contraintes Google** :
- ❌ Pas de screenshots (réserver pour la section Screenshots)
- ❌ Pas de prix (à mettre dans la description)
- ❌ Pas de texte < 16px (illisible)
- ✅ Branding cohérent avec le site web
- ✅ Ratio exact 1024×500 (pas de bordures)

**Export** : PNG ou JPG, max 1 MB

---

## Option B : Génération via script (si ImageMagick/Sharp disponible)

### Prérequis

```bash
# Installer ImageMagick (Linux/macOS)
sudo apt install imagemagick  # Debian/Ubuntu
brew install imagemagick       # macOS

# Ou installer Sharp (Node.js)
npm install sharp --save-dev
```

### Script de génération (ImageMagick)

Créer `scripts/generate-playstore-assets.sh` :

```bash
#!/bin/bash
set -e

LOGO_PATH="public/logo.svg"  # Ajuster le chemin
OUTPUT_DIR="docs/mobile/playstore/assets"
mkdir -p "$OUTPUT_DIR"

# Icône 512×512
convert "$LOGO_PATH" -resize 512x512 -background white -gravity center -extent 512x512 "$OUTPUT_DIR/icon-512.png"

# Icône adaptive foreground (transparent)
convert "$LOGO_PATH" -resize 288x288 -background none -gravity center -extent 432x432 "$OUTPUT_DIR/icon-adaptive-foreground.png"

# Icône adaptive background (vert uni)
convert -size 432x432 xc:"#10B981" "$OUTPUT_DIR/icon-adaptive-background.png"

# Feature graphic (placeholder avec texte)
convert -size 1024x500 gradient:"#10B981-#059669" \
  -font Arial-Bold -pointsize 48 -fill white -gravity west \
  -annotate +50+0 "GreenTechCycle\nITAD Platform" \
  "$OUTPUT_DIR/feature-graphic-1024x500.png"

echo "✅ Assets générés dans $OUTPUT_DIR"
```

Rendre exécutable :
```bash
chmod +x scripts/generate-playstore-assets.sh
./scripts/generate-playstore-assets.sh
```

### Script Node.js (Sharp)

Créer `scripts/generate-playstore-assets.js` :

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../docs/mobile/playstore/assets');
const LOGO_PATH = path.join(__dirname, '../public/logo.svg');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAssets() {
  // Icône 512×512
  await sharp(LOGO_PATH)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-512.png'));

  // Adaptive foreground (transparent)
  await sharp(LOGO_PATH)
    .resize(288, 288, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 72, bottom: 72, left: 72, right: 72, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-adaptive-foreground.png'));

  // Adaptive background (vert uni)
  await sharp({
    create: {
      width: 432,
      height: 432,
      channels: 4,
      background: { r: 16, g: 185, b: 129, alpha: 1 }
    }
  })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-adaptive-background.png'));

  console.log('✅ Assets générés dans', OUTPUT_DIR);
}

generateAssets().catch(console.error);
```

Exécuter :
```bash
node scripts/generate-playstore-assets.js
```

---

## Option C : Utiliser les assets du site web existants

Si vous avez déjà des assets pour le site :

1. **Icône** : Utiliser `public/favicon.png` ou `public/logo.png`
   - Redimensionner à 512×512 avec Figma/Photoshop/GIMP

2. **Feature graphic** : Combiner logo + photo datacenter
   - Prendre `/public/photos/hp-datacenter-green.jpg`
   - Recadrer en 1024×500
   - Ajouter le titre "GreenTechCycle ITAD" avec Canva

---

## Checklist avant upload

- [ ] `icon-512.png` : 512×512, PNG, < 1 MB
- [ ] `icon-adaptive-foreground.png` : 432×432, PNG avec transparence
- [ ] `icon-adaptive-background.png` : 432×432, PNG couleur unie
- [ ] `feature-graphic-1024x500.png` : 1024×500, PNG ou JPG, < 1 MB
- [ ] Tous les assets testés en preview (charger dans un frame pour vérifier)
- [ ] Branding cohérent avec le site web
- [ ] Logo lisible même en 48×48 (test en miniature)

---

## Preview des assets

Avant upload, vérifier :

1. **Icône en petit** : Redimensionner à 48×48 et vérifier la lisibilité
2. **Adaptive icons** : Tester avec [Adaptive Icon Preview](https://adapticon.tooo.io/)
3. **Feature graphic** : Afficher en 1024×500 dans navigateur, vérifier que tout est lisible

---

## Ressources

- [Play Store Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151)
- [Adaptive Icon Guide](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)
- [Figma Play Store Template](https://www.figma.com/community/search?resource_type=mixed&sort_by=relevancy&query=google%20play%20store&editor_type=all)
- [Canva App Icon Maker](https://www.canva.com/create/icons/)
- [ImageMagick Documentation](https://imagemagick.org/Usage/)

---

## Ordre de priorité

Si le temps est limité, générer dans cet ordre :

1. **Icon 512×512** (obligatoire, bloquant)
2. **Feature graphic** (obligatoire, bloquant)
3. **Screenshots** (obligatoire, min. 2)
4. Adaptive icons (recommandé, améliore l'apparence sur Android 8+)
5. Promo video (optionnel, peut être ajouté plus tard)

---

**Prochaine étape** : Une fois les assets générés, voir [UPLOAD-PROCEDURE.md](./UPLOAD-PROCEDURE.md) étape 3 pour les uploader sur Play Console.
