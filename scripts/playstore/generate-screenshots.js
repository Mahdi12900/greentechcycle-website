#!/usr/bin/env node
/**
 * Génération des screenshots Play Store pour GreenTechCycle
 * Capture des pages réelles du site en production
 * Format : 1080×1920 (mobile portrait)
 */

const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../../docs/mobile/playstore/assets');
const PROD_URL = 'https://greentechcycle-website.vercel.app';

const pages = [
  { slug: 'home', path: '/fr', name: 'Accueil' },
  { slug: 'tarifs', path: '/fr/tarifs', name: 'Tarifs' },
  { slug: 'plateforme', path: '/fr/plateforme', name: 'Plateforme' },
  { slug: 'reserver', path: '/fr/reserver', name: 'Réserver' },
  { slug: 'pourquoi-gtc', path: '/fr/pourquoi-gtc', name: 'Pourquoi GTC' }
];

async function captureScreenshots() {
  console.log('🚀 Génération des screenshots Play Store...\n');

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 }, // iPhone X dimensions
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();

    for (const pageConfig of pages) {
      console.log(`📸 Capture ${pageConfig.name} (${pageConfig.path})...`);

      await page.goto(`${PROD_URL}${pageConfig.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Attendre que le contenu soit chargé
      await page.waitForTimeout(2000);

      // Masquer le cookie banner s'il est présent
      await page.evaluate(() => {
        const cookieBanner = document.querySelector('[data-cookie-banner]');
        if (cookieBanner) cookieBanner.style.display = 'none';
      });

      // Capturer la page (viewport 375×812)
      const screenshotBuffer = await page.screenshot({
        type: 'png',
        fullPage: false // Seulement le viewport visible
      });

      // Upscaler à 1080×1920 (ratio 9:16 Google Play)
      const outputPath = path.join(ASSETS_DIR, `screenshot-mockup-${pageConfig.slug}.png`);

      await sharp(screenshotBuffer)
        .resize(1080, 1920, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ screenshot-mockup-${pageConfig.slug}.png créé\n`);
    }

    await browser.close();

    console.log('🎉 Tous les screenshots ont été générés avec succès !');
    console.log(`📁 Emplacement : ${ASSETS_DIR}\n`);

  } catch (error) {
    console.error('❌ Erreur lors de la génération des screenshots :', error.message);
    console.log('\n⚠️  Si les browsers Playwright ne sont pas installés, exécutez :');
    console.log('   npx playwright install chromium\n');

    if (browser) await browser.close();
    process.exit(1);
  }
}

captureScreenshots();
