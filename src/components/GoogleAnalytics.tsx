import Script from "next/script";
import { GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY, CONSENT_MAX_AGE_DAYS } from "@/lib/analytics";

/**
 * Google Analytics 4 (`gtag.js`) avec Google Consent Mode v2 — mode BASIQUE strict.
 *
 * Constat vérifié (2026-10-06, capture réseau) : `gtag.js`, même avec un consentement par
 * défaut TOUT refusé posé avant `config`, envoie quand même une requête de mesure
 * (`/g/collect`, sans cookie) dès que `gtag('config', …)` est appelée — c'est le
 * comportement « pings sans cookie » du mode Consentement AVANCÉ, que la consigne demande
 * explicitement d'éviter. La seule façon fiable de garantir « aucune requête avant
 * consentement » est donc de ne JAMAIS appeler `gtag('js', …)` / `gtag('config', …)` tant
 * que la personne n'a pas accordé la catégorie « Mesure d'audience » :
 *
 *   1. `ga-consent-default` (beforeInteractive, inline, s'exécute avant tout) : crée
 *      `dataLayer`/`gtag`, pose le consentement par défaut TOUT refusé, définit
 *      `window.__gaInit()` (initialise la mesure, idempotent) mais NE L'APPELLE PAS — puis
 *      relit un choix déjà enregistré (6 mois, `src/lib/analytics.ts`) : si la mesure
 *      d'audience a déjà été acceptée, accorde le consentement et appelle `__gaInit()`
 *      immédiatement, sans attendre l'hydratation React.
 *   2. `ga-gtag-src` (afterInteractive) : charge la seule LIBRAIRIE `gtag.js` (aucune
 *      requête de mesure envoyée par le simple chargement du fichier).
 *
 * `window.__gaInit()` n'est ensuite appelée qu'au moment où la personne clique « Tout
 * accepter » ou « Enregistrer mes préférences » avec la mesure d'audience cochée
 * (`applyConsent()`, `src/lib/analytics.ts`) : c'est seulement à cet instant que
 * `gtag('config', …)` part, avec le consentement déjà accordé — exactement la requête
 * `page_view` attendue par la vérification. Un refus n'appelle jamais `__gaInit()` : rien
 * ne part jamais, sur aucune page.
 *
 * Les signaux publicitaires (`ad_storage`, `ad_user_data`, `ad_personalization`) restent
 * refusés dans tous les cas : ce site ne fait aucun usage publicitaire des données.
 */
export default function GoogleAnalytics() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document --
          Faux positif App Router : cette règle ne connaît que `pages/_document.js` (Pages
          Router). Ici, `<html>`/`<body>` sont bien rendus dans un layout racine
          (`src/app/[locale]/layout.tsx`), seul emplacement valide en App Router pour
          `beforeInteractive` (doc. Next.js officielle). */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
// Aucun usage publicitaire des données sur ce site : jamais de redaction à lever.
gtag('set', 'ads_data_redaction', true);

// N'initialise réellement gtag.js (js + config) qu'au moment du consentement — jamais avant,
// jamais sur simple chargement de page. Idempotent : un deuxième appel ne fait rien.
window.__gaInit = function () {
  if (window.__gaInitialized) return;
  window.__gaInitialized = true;
  gtag('js', new Date());
  // cookie_expires : 399 jours (~13 mois), plafond recommandé par la CNIL — au lieu des
  // 2 ans par défaut de GA4.
  gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, { cookie_expires: 60 * 60 * 24 * 399 });
};

try {
  var raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
  if (raw) {
    var stored = JSON.parse(raw);
    var ageDays = (Date.now() - stored.timestamp) / (1000 * 60 * 60 * 24);
    if (typeof stored.timestamp === 'number' && ageDays <= ${CONSENT_MAX_AGE_DAYS} && stored.analytics) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      window.__gaInit();
    }
  }
} catch (e) {}
`}
      </Script>
      <Script id="ga-gtag-src" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
    </>
  );
}
