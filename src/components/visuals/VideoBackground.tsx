import SlotVideo from "./SlotVideo";
import { SLOT_VIDEOS } from "@/content/media-slots";

/**
 * VideoBackground — calque vidéo décoratif sous un hero (DESIGN.md v2 §7.3).
 * Lit sa vidéo dans le registre `SLOT_VIDEOS` (src/content/media-slots.ts) ; rien n'est
 * rendu si l'emplacement n'a pas de vidéo « loop ».
 * Lisibilité (AA) : voile `bg` dense côté texte (gauche en desktop, haut en mobile),
 * léger côté visuel pour que la boucle se voie, puis vignettage. Contraste mesuré ≥ 4,5:1.
 */
export default function VideoBackground({ id, className = "" }: { id: string; className?: string }) {
  const spec = SLOT_VIDEOS[id];
  if (!spec || spec.kind !== "loop") return null;
  return (
    <div
      data-media-slot={id}
      data-video-ready
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <SlotVideo sources={spec.sources} poster={spec.poster} className="opacity-90" />
      {/* Voile dense sous le texte (gauche en desktop, haut en mobile), léger côté visuel */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 from-55% via-bg/60 to-bg/40 lg:bg-gradient-to-r lg:from-bg lg:from-35% lg:via-bg/55 lg:via-55% lg:to-transparent" />
      <div className="fx-vignette absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
