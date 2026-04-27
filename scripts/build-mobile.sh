#!/bin/bash
set -e

echo "📱 Building GreenTechCycle for mobile..."

# Temporarily move incompatible routes (API routes, dynamic sitemaps, feeds)
echo "→ Temporarily moving incompatible routes..."
mkdir -p .temp-mobile-backup

if [ -d "src/app/api" ]; then
  mv src/app/api .temp-mobile-backup/
fi

if [ -f "src/app/[locale]/sitemap.ts" ]; then
  mv "src/app/[locale]/sitemap.ts" .temp-mobile-backup/
fi

if [ -d "src/app/feed.xml" ]; then
  mv src/app/feed.xml .temp-mobile-backup/
fi

# Build static export
echo "→ Building static Next.js export..."
BUILD_MODE=mobile npm run build

# Restore routes
echo "→ Restoring routes..."
if [ -d ".temp-mobile-backup/api" ]; then
  mv .temp-mobile-backup/api src/app/
fi

if [ -f ".temp-mobile-backup/sitemap.ts" ]; then
  mv .temp-mobile-backup/sitemap.ts "src/app/[locale]/"
fi

if [ -d ".temp-mobile-backup/feed.xml" ]; then
  mv .temp-mobile-backup/feed.xml src/app/
fi

rmdir .temp-mobile-backup 2>/dev/null || true

echo "✅ Mobile build complete (out/)"
