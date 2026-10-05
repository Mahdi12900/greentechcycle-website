import { notFound } from "next/navigation";

/**
 * Toute URL inconnue sous /fr ou /en (audit final I3) : déclenche la page 404 brandée
 * src/app/[locale]/not-found.tsx (logo, navigation, message dans la langue) au lieu de la
 * page 404 par défaut de Next.js. Le statut HTTP reste 404.
 */
export default function CatchAllNotFound() {
  notFound();
}
