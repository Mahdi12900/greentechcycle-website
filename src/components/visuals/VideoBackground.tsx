import SlotVideo from "./SlotVideo";
import { SLOT_VIDEOS } from "@/content/media-slots";

/**
 * VideoBackground — calque vidéo décoratif sous un hero (DESIGN.md v2 §7.3).
 * Lit sa vidéo dans le registre `SLOT_VIDEOS` (src/content/media-slots.ts) ; rien n'est
 * rendu si l'emplacement n'a pas de vidéo « loop ».
 * Lisibilité (AA) : voile `bg` dense côté texte (gauche en desktop, partout en mobile),
 * plus léger côté visuel, puis vignettage.
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
      <SlotVideo sources={spec.sources} poster={spec.poster} className="opacity-60" />
      <div className="absolute inset-0 bg-bg/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-bg lg:from-45% lg:via-bg/80 lg:via-60% lg:to-bg/30" />
      <div className="fx-vignette absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
