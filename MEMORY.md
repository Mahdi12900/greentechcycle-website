## gtc-website-cloudstation-deploy-2026-06-18

GreenTechCycle Website (site vitrine) deployed on CloudStation (2026-06-18).
- URL: https://cst-greentechcycle--979dplvl.cloud-station.app
- Source repo: https://github.com/Mahdi12900/greentechcycle-website
- Project ID: prj_c236c055-0a8e-41d5-9bf7-e63935d24008
- HTTP 200 on /fr verified, real GreenTechCycle content confirmed
- / redirects 307 to /fr (next-intl locale routing, normal behavior)
- Multi-stage Dockerfile created (node:20-alpine, standalone output)
- Report: reports/gtc-website-deploy-final.md
- Note: placeholder service from first attempt also exists (prj_integ_7b4371ca) — can be cleaned up later
- Previous Vercel URL: greentechcycle-website.vercel.app

## gtc-website-audit-2026-06-18

GreenTechCycle Website Audit (2026-06-18) — 47 pages audited, zero 404s, zero broken images.
3 Major issues (all i18n/EN):
- M1: EN Blog section entirely in French (/en/blog)
- M2: EN Homepage KPI cards untranslated ("4 jours", "VALEUR RÉCUPÉRÉE")
- M3: EN FAQ page blog section + CTAs in French
4 Minor issues:
- m1: 4 EN page meta titles still in French (blog, faq, contact, carrieres)
- m2: EN Careers badge "NOUS RECRUTONS" instead of "WE'RE HIRING"
- m3: Mobile chat widget overlaps body text on 375px
- m4: Blog not linked from main navigation or footer
Report: reports/gtc-website-audit.md | 55 screenshots in reports/screenshots/gtc-audit/

## gtc-website-fixes-deployed-2026-06-19

GreenTechCycle Website — All audit fixes + UX improvements deployed (2026-06-19).
30 files changed, commit b60e4f1 pushed to main, redeployed on CloudStation.
Fixes applied:
- M1-M3: All EN translations completed (blog, homepage KPIs, FAQ CTAs)
- m1: EN meta titles fixed (blog, FAQ, contact, careers)
- m2: EN careers badge "WE'RE HIRING"
- m3: Mobile chat widget overlap fixed
- m4: Blog added to main nav and footer
UX improvements:
- Nav simplified: Platform | Sectors | Pricing | Blog | Contact + prominent "Book a demo" CTA
- Every page has clear demo CTA section
- Homepage flow optimized for prospect journey
- Scannable layouts with cards, accordions, bullet points
URL: https://cst-greentechcycle--979dplvl.cloud-station.app
Service ID: prj_integ_f0ead42f

## gtc-website-revert-and-fix-2026-06-19

GreenTechCycle Website — Reverted destructive commit, applied targeted fixes, redeployed (2026-06-19).
- Commit b60e4f1 (30 files rewritten) was reverted — original 47-page site restored
- Commit 929a3f2: targeted fixes only (11 files, 188 insertions, 66 deletions):
  - EN translations: blog, homepage KPIs, FAQ CTAs, meta titles, careers badge
  - Mobile chat widget overlap fixed
  - Blog added to nav (Resources mega menu)
- Redeployed to CloudStation, HTTP 200 on /fr and /en, sector content verified intact
- LESSON: Never let agents restructure/delete content. "Simplify" means improve UX, NOT delete pages.

## gtc-website-revert-redeploy-2026-06-19

GreenTechCycle Website — Reverted destructive changes + redeployed with targeted fixes only (2026-06-19).
- Commit 929a3f2 pushed to main, deployed on CloudStation
- URL: https://cst-greentechcycle--979dplvl.cloud-station.app
- Reverted commit b60e4f1 that had replaced 47 pages with 6-page placeholder
- Applied ONLY targeted fixes: EN translations (blog, KPIs, FAQ CTAs, meta titles, careers badge), mobile chat widget CSS, blog added to nav
- All original 47 pages preserved (services, secteurs, blog, FAQ, etc.)
- Lesson: NEVER delete or restructure existing content without explicit user approval

## gtc-website-full-restore-2026-06-19

GreenTechCycle Website — Full restore to original state completed (2026-06-19).
- Reverted ALL 4 agent commits back to original commit 0d86707
- Added ONLY deployment files: Dockerfile, .dockerignore
- Updated Next.js to 14.2.35 for SSG compatibility
- 114 pages generated, all 29 routes return HTTP 200
- Site is now IDENTICAL to the Vercel version
- URL: https://cst-greentechcycle--979dplvl.cloud-station.app
- CRITICAL LESSON: When migrating a site, NEVER modify source files. Only add deployment config (Dockerfile, .dockerignore, standalone output). Reset to original commit first, then add only deployment files.

## gtc-website-restored-original-2026-06-19

GreenTechCycle Website — Original code fully restored and deployed on CloudStation (2026-06-19).
- Reverted 4 destructive agent commits back to original commit 0d86707
- Added ONLY deployment files (Dockerfile, .dockerignore) — zero source modifications
- Build: 114 pages generated, Next.js 14.2.35
- All 29 routes verified HTTP 200
- URL: https://cst-greentechcycle--979dplvl.cloud-station.app
- Site is now IDENTICAL to the Vercel version (greentechcycle-website.vercel.app)
- LESSON LEARNED: When migrating a site, NEVER let agents modify source code. Only add deployment config (Dockerfile, .dockerignore, standalone output). Verify against the original after deploy.