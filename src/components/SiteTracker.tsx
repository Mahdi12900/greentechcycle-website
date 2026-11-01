"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * SiteTracker — mesure d'audience FIRST-PARTY (GreenTechCycle, 2026-10-29).
 *
 * Pourquoi : le fondateur refuse tout abonnement payant et veut du temps réel.
 * Chaque navigation envoie une page vue à /api/track (même origine, pas de cookie,
 * pas de tiers) → table Supabase `site_events`. session_id = UUID aléatoire en
 * localStorage (« gtc_sid ») : aucune donnée personnelle, IP jamais stockée.
 *
 * RGPD : mesure d'audience first-party sans cookie ni identifiant stable
 * cross-session → hors consentement (cf. recommandations CNIL, périmètre strict).
 * Les pages /admin, /pilotage, /api et /_next ne sont pas trackées (ni côté client ni serveur).
 */

const SKIP = /^\/(admin|pilotage|api|_next)(\/|$)/;

export default function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || SKIP.test(pathname)) return;
    if (typeof window === "undefined") return;

    let sid = window.localStorage.getItem("gtc_sid");
    if (!sid) {
      sid = window.crypto.randomUUID();
      window.localStorage.setItem("gtc_sid", sid);
    }

    const url = new URL(window.location.href);
    const payload = {
      page: (pathname + url.search).slice(0, 500),
      referrer: (document.referrer || "").slice(0, 500),
      session_id: sid,
      utm_source: url.searchParams.get("utm_source")?.slice(0, 200) ?? null,
      utm_medium: url.searchParams.get("utm_medium")?.slice(0, 200) ?? null,
      utm_campaign: url.searchParams.get("utm_campaign")?.slice(0, 200) ?? null,
    };

    // keepalive : la requête survit à une navigation immédiate
    fetch("/api/track", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* non bloquant : la mesure ne doit jamais casser la navigation */
    });
  }, [pathname]);

  return null;
}
