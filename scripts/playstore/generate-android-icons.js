#!/usr/bin/env node
/**
 * Génération des icônes Android natives pour GreenTechCycle
 * 5 densités : mdpi(48), hdpi(72), xhdpi(96), xxhdpi(144), xxxhdpi(192)
 * + Adaptive icons foreground/background
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_ICON_SOURCE = path.join(__dirname, '../../public/04-icon-only.svg');
const ANDROID_RES_DIR = path.join(__dirname, '../../android/app/src/main/res');
const BRAND_GREEN = '#10B981';

const densities = [
  { name: 'mdpi', size: 48 },
  { name: 'hdpi', size: 72 },
  { name: 'xhdpi', size: 96 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xxxhdpi', size: 192 }
];

console.log('🚀 Génération des icônes Android natives...\n');

async function generateLauncherIcons() {
  for (const density of densities) {
    const mipmapDir = path.join(ANDROID_RES_DIR, `mipmap-${density.name}`);

    // Créer le dossier mipmap si nécessaire
    if (!fs.existsSync(mipmapDir)) {
      fs.mkdirSync(mipmapDir, { recursive: true });
    }

    console.log(`📦 Génération ic_launcher.png (${density.name} - ${density.size}×${density.size})...`);

    // Icône complète avec fond (ic_launcher.png)
    await sharp(LOGO_ICON_SOURCE)
      .resize(density.size, density.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(mipmapDir, 'ic_launcher.png'));

    // Icône ronde (ic_launcher_round.png) - même que ic_launcher pour GTC
    await sharp(LOGO_ICON_SOURCE)
      .resize(density.size, density.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(mipmapDir, 'ic_launcher_round.png'));

    console.log(`✅ ${density.name}: ic_launcher.png + ic_launcher_round.png créés\n`);
  }
}

async function generateAdaptiveIcons() {
  console.log('📦 Génération des adaptive icons foreground/background...\n');

  // Lire le SVG et extraire le groupe central sans fond
  const svgContent = fs.readFileSync(LOGO_ICON_SOURCE, 'utf8');
  const svgWithoutBg = svgContent.replace(/<rect[^>]*\/>/g, '');

  for (const density of densities) {
    const mipmapDir = path.join(ANDROID_RES_DIR, `mipmap-${density.name}`);

    // Foreground (logo seul transparent)
    const foregroundSize = Math.round(density.size * 432 / 108); // Ratio 432:108 pour adaptive
    await sharp(Buffer.from(svgWithoutBg))
      .resize(foregroundSize, foregroundSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(mipmapDir, 'ic_launcher_foreground.png'));

    // Background (fond vert uni)
    await sharp({
      create: {
        width: foregroundSize,
        height: foregroundSize,
        channels: 4,
        background: BRAND_GREEN
      }
    })
      .png()
      .toFile(path.join(mipmapDir, 'ic_launcher_background.png'));

    console.log(`✅ ${density.name}: ic_launcher_foreground.png + ic_launcher_background.png créés`);
  }

  console.log();
}

async function createAdaptiveXmlConfigs() {
  console.log('📦 Création des fichiers XML adaptive icons...\n');

  const anydpiDir = path.join(ANDROID_RES_DIR, 'mipmap-anydpi-v26');
  if (!fs.existsSync(anydpiDir)) {
    fs.mkdirSync(anydpiDir, { recursive: true });
  }

  // ic_launcher.xml
  const launcherXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;

  // ic_launcher_round.xml
  const launcherRoundXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;

  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), launcherXml);
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), launcherRoundXml);

  console.log('✅ mipmap-anydpi-v26/ic_launcher.xml créé');
  console.log('✅ mipmap-anydpi-v26/ic_launcher_round.xml créé\n');
}

(async () => {
  try {
    await generateLauncherIcons();
    await generateAdaptiveIcons();
    await createAdaptiveXmlConfigs();

    console.log('🎉 Toutes les icônes Android natives ont été générées avec succès !');
    console.log(`📁 Emplacement : ${ANDROID_RES_DIR}/mipmap-*\n`);

  } catch (error) {
    console.error('❌ Erreur lors de la génération des icônes Android :', error);
    process.exit(1);
  }
})();
