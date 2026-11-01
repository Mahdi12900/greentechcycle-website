"use client";

import { useEffect } from "react";

/**
 * Garde côté client du tableau de bord (defense-in-depth).
 *
 * Le middleware (307 → /pilotage/login) reste la protection principale. Cette
 * garde neutralise l'hypothèse résiduelle où une vieille copie HTML du
 * tableau de bord serait servie par un cache intermédiaire sans passer par le
 * middleware : au chargement, on interroge /api/pilotage/session (le cookie
 * est httpOnly, illisible en JS — d'où la sonde dédiée) ; si la session est
 * absente ou invalide, on remplace immédiatement la page par /pilotage/login.
 */
export default function SessionGuard() {
  useEffect(() => {
    let cancelled = false;
    fetch("/api/pilotage/session", { cache: "no-store" })
      .then((r) => {
        if (cancelled) return;
        if (r.status === 401) window.location.replace("/pilotage/login");
      })
      .catch(() => {
        /* réseau indisponible : on laisse le rendu server-side décider */
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
