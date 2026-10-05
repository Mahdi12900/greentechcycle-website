/**
 * Secteur → vidéo de cas client (registre `SLOT_VIDEOS`, src/content/media-slots.ts).
 * Module neutre (ni "use client" ni composant serveur) : importé à la fois par
 * `SectorDetailPage.tsx` (affichage, client) et `secteurs/[slug]/page.tsx` (VideoObject
 * JSON-LD, serveur — plan SEO du 2026-10-05). Un composant serveur ne peut pas accéder à une
 * valeur exportée depuis un module "use client" ; ce fichier évite le problème à la racine.
 */
export const SECTOR_VIDEOS: Record<string, string> = {
  finance: "case-banque",
  sante: "case-chu",
  energie: "case-energie",
  "medias-audiovisuel": "case-tf1",
};
