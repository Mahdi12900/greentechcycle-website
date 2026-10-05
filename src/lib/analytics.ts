/**
 * Mesure d'audience légère (2026-10-04).
 *
 * Le site n'embarque aucun outil d'analytics : on se contente de pousser les événements
 * dans `window.dataLayer` (convention Google Tag Manager / la plupart des CMP). Aucun
 * script tiers n'est chargé ici, donc rien ne quitte le navigateur tant qu'un outil de
 * mesure n'a pas été branché (et autorisé via la bannière cookies) côté dataLayer.
 */

export type AnalyticsEvent =
  | "film_open"
  | "film_play"
  | "film_progress"
  | "film_chapter"
  | "film_complete"
  | "film_cta_click";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
