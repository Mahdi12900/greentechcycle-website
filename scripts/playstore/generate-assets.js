#!/usr/bin/env node
/**
 * Génération des assets Play Store pour GreenTechCycle
 * - icon-512.png (512×512, logo brand complet)
 * - icon-adaptive-foreground.png (432×432, logo seul transparent avec padding)
 * - icon-adaptive-background.png (432×432, fond uni #10B981)
 * - feature-graphic-1024x500.png (bannière marketing)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../../docs/mobile/playstore/assets');
const LOGO_ICON_SOURCE = path.join(__dirname, '../../public/04-icon-only.svg');
const BRAND_GREEN = '#10B981';
const BRAND_DARK = '#0F172A';
const BRAND_LIGHT = '#F8FAFC';

// Créer le dossier assets s'il n'existe pas
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

console.log('🚀 Génération des assets Play Store...\n');

// 1. Icon 512×512 (logo brand complet avec fond)
async function generateIcon512() {
  console.log('📦 Génération icon-512.png...');
  await sharp(LOGO_ICON_SOURCE)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon-512.png'));
  console.log('✅ icon-512.png créé\n');
}

// 2. Icon Adaptive Foreground 432×432 (logo seul transparent, centré avec padding)
async function generateAdaptiveForeground() {
  console.log('📦 Génération icon-adaptive-foreground.png...');

  // Lire le SVG et extraire uniquement le groupe central (sans fond)
  const svgContent = fs.readFileSync(LOGO_ICON_SOURCE, 'utf8');

  // Créer un SVG sans le fond (rect) pour le foreground transparent
  const svgWithoutBg = svgContent.replace(/<rect[^>]*\/>/g, '');

  // Zone de sécurité Android adaptive icons : 264×264 au centre de 432×432
  // On redimensionne le logo à ~300px pour qu'il soit visible mais sûr
  await sharp(Buffer.from(svgWithoutBg))
    .resize(300, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 66,
      bottom: 66,
      left: 66,
      right: 66,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon-adaptive-foreground.png'));

  console.log('✅ icon-adaptive-foreground.png créé (300×300 logo + 66px padding)\n');
}

// 3. Icon Adaptive Background 432×432 (fond uni vert #10B981)
async function generateAdaptiveBackground() {
  console.log('📦 Génération icon-adaptive-background.png...');
  await sharp({
    create: {
      width: 432,
      height: 432,
      channels: 4,
      background: BRAND_GREEN
    }
  })
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon-adaptive-background.png'));
  console.log('✅ icon-adaptive-background.png créé (fond #10B981)\n');
}

// 4. Feature Graphic 1024×500 (bannière marketing)
async function generateFeatureGraphic() {
  console.log('📦 Génération feature-graphic-1024x500.png...');

  // Créer un SVG pour la bannière marketing
  const featureSvg = `
    <svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_DARK};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E293B;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accentGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${BRAND_GREEN};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#34D399;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Fond gradient sombre -->
      <rect width="1024" height="500" fill="url(#bgGradient)"/>

      <!-- Accent vert en bas -->
      <rect x="0" y="450" width="1024" height="50" fill="url(#accentGreen)" opacity="0.3"/>

      <!-- Logo à gauche -->
      <g transform="translate(100, 250)">
        <circle cx="0" cy="0" r="60" fill="${BRAND_GREEN}" opacity="0.2"/>
        <circle cx="0" cy="0" r="45" fill="${BRAND_GREEN}" opacity="0.4"/>
        <circle cx="0" cy="0" r="30" fill="${BRAND_GREEN}"/>
        <circle cx="-8" cy="-10" r="6" fill="#ECFDF5" opacity="0.9"/>
      </g>

      <!-- Titre principal -->
      <text x="220" y="220" font-family="Inter, Arial, sans-serif" font-size="68" font-weight="800" fill="#FFFFFF" letter-spacing="-1">
        GreenTechCycle
      </text>

      <!-- Sous-titre -->
      <text x="220" y="280" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500" fill="${BRAND_GREEN}" letter-spacing="0.5">
        Plateforme ITAD unifiée
      </text>

      <!-- Tagline -->
      <text x="220" y="320" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">
        Audit • Effacement • Recyclage • Reporting ESG
      </text>
    </svg>
  `;

  await sharp(Buffer.from(featureSvg))
    .png()
    .toFile(path.join(ASSETS_DIR, 'feature-graphic-1024x500.png'));

  console.log('✅ feature-graphic-1024x500.png créé\n');
}

// Exécution séquentielle
(async () => {
  try {
    await generateIcon512();
    await generateAdaptiveForeground();
    await generateAdaptiveBackground();
    await generateFeatureGraphic();

    console.log('🎉 Tous les assets Play Store ont été générés avec succès !');
    console.log(`📁 Emplacement : ${ASSETS_DIR}\n`);

    // Lister les fichiers créés avec leur taille
    const files = fs.readdirSync(ASSETS_DIR);
    console.log('📊 Fichiers générés :');
    files.forEach(file => {
      const stats = fs.statSync(path.join(ASSETS_DIR, file));
      console.log(`   - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la génération des assets :', error);
    process.exit(1);
  }
})();
