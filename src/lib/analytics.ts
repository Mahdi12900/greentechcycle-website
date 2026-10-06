/**
 * Mesure d'audience — Google Analytics 4 avec Google Consent Mode v2 (2026-10-06).
 *
 * Aucun cookie de mesure n'est déposé et aucune requête n'est envoyée à Google avant que
 * la personne ait accepté la catégorie « Mesure d'audience » dans la bannière cookies
 * (`src/components/CookieBanner.tsx`). Les signaux publicitaires (`ad_storage`,
 * `ad_user_data`, `ad_personalization`) restent refusés en permanence : le site ne fait
 * aucun usage publicitaire des données.
 *
 * Mode Consentement BASIQUE strict — appliqué par construction, pas seulement par Consent
 * Mode : `gtag.js` (la librairie) est chargé sans condition dans
 * `src/components/GoogleAnalytics.tsx`, mais `gtag('js', …)` / `gtag('config', …)` ne sont
 * JAMAIS appelées avant que `applyConsent()` ci-dessous ne le fasse via `window.__gaInit()`
 * (constat vérifié : `gtag.js` envoie sinon un ping sans cookie dès `config`, même
 * consentement refusé — comportement du mode avancé que la consigne exclut). Tant qu'aucun
 * accord n'a été donné, aucune requête de mesure ne peut donc partir, par construction.
 *
 * `track()` reste l'unique point d'entrée des événements applicatifs : il alimente
 * `window.dataLayer` (compatibilité GTM éventuelle) ET appelle `window.gtag('event', …)`.
 * Avant consentement, ces appels sont mis en file sans destination configurée : ils ne
 * sont jamais transmis, ni rejoués rétroactivement après un accord ultérieur (seules les
 * interactions postérieures au consentement sont mesurées).
 */

/** Taxonomie GA4 du site (mapping des anciens événements `film_*` compris). */
export type AnalyticsEvent =
  | "video_start"
  | "video_progress"
  | "video_complete"
  | "cta_click"
  | "configurator_use"
  | "quote_request"
  | "contact_form_submit"
  | "generate_lead"
  | "lab_pilot_apply"
  | "wakibox_pilot_apply"
  | "newsletter_signup"
  | "whatsapp_click"
  | "email_click"
  | "tab_view"
  /** Conservé pour compatibilité : ouverture de la modale vidéo (avant lecture). */
  | "film_open";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  /** Défini dans `src/components/GoogleAnalytics.tsx` : initialise `gtag.js` (idempotent). */
  __gaInit?: () => void;
};

export function track(event: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  // `gtag.js` gère lui-même le blocage tant que le consentement n'est pas accordé
  // (Consent Mode) : aucune vérification de consentement n'est nécessaire ici.
  w.gtag?.("event", event, params);
}

/* ── Consentement cookies : catégories, stockage, durée de 6 mois ──────────────────── */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3LL29WDT8B";

/** Clé de stockage partagée avec l'ancienne bannière cookies (pas de migration nécessaire). */
export const CONSENT_STORAGE_KEY = "gtc-cookies";

/** CNIL : durée de conservation recommandée du consentement, 6 mois ici. */
export const CONSENT_MAX_AGE_DAYS = 182;

export interface ConsentCategories {
  necessary: true;
  /** Mesure d'audience (Google Analytics 4) — seule catégorie branchée à Consent Mode. */
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface StoredConsent extends ConsentCategories {
  /** Date du choix (epoch ms), pour expirer le consentement après 6 mois. */
  timestamp: number;
}

/** Lit le consentement stocké, `null` si absent, invalide ou expiré (> 6 mois). */
export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (typeof parsed.timestamp !== "number") return null;
    const ageDays = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24);
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      functional: !!parsed.functional,
      marketing: !!parsed.marketing,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

/** Enregistre le choix (horodaté) et met à jour Consent Mode. Ne touche jamais aux signaux publicitaires. */
export function saveConsent(categories: Omit<ConsentCategories, "necessary">): StoredConsent {
  const stored: StoredConsent = { necessary: true, ...categories, timestamp: Date.now() };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  }
  applyConsent(stored);
  return stored;
}

/**
 * Met à jour Consent Mode v2 côté `gtag.js`. Seul `analytics_storage` est piloté par le
 * choix de la personne ; `ad_storage` / `ad_user_data` / `ad_personalization` ne sont
 * JAMAIS accordés (aucun usage publicitaire sur ce site), quel que soit le choix.
 *
 * `gtag('config', …)` n'est appelée qu'ici, au moment de l'accord (`__gaInit`, défini dans
 * `src/components/GoogleAnalytics.tsx`) — jamais au chargement de la page : c'est la seule
 * façon de garantir qu'aucune requête n'est envoyée à Google avant consentement (constat du
 * 2026-10-06 : `gtag.js` envoie sinon un ping sans cookie dès `config`, même consentement
 * refusé). Un refus n'appelle jamais `__gaInit` : rien ne part jamais.
 */
export function applyConsent(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.gtag?.("consent", "update", {
    analytics_storage: categories.analytics ? "granted" : "denied",
  });
  if (categories.analytics) w.__gaInit?.();
}
