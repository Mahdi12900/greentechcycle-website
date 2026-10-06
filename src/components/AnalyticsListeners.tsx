"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Écouteur global pour deux événements qui peuvent survenir sur n'importe quelle page
 * (pied de page, widgets, cartes de contact, pages secteur…) sans qu'il soit nécessaire
 * d'instrumenter chaque composant : clic sur un lien `wa.me` (WhatsApp) ou `mailto:`
 * (e-mail). Un clic sur `document` en phase de capture suffit à tous les attraper.
 *
 * Les liens déjà instrumentés explicitement ailleurs (ex. l'écran d'appel à l'action du
 * film de marque, `FilmPlayer.tsx`) portent `data-gtc-tracked` pour ne pas être comptés
 * deux fois ici.
 */
export default function AnalyticsListeners() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.closest("[data-gtc-tracked]")) return;
      const href = link.getAttribute("href") || "";
      if (/^mailto:/i.test(href)) {
        track("email_click", { location: pathname || "" });
      } else if (/(^https?:\/\/)?(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        track("whatsapp_click", { location: pathname || "" });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
