import SlotVideo from "./SlotVideo";

/**
 * VideoBackground — calque vidéo sous un hero (DESIGN.md v2 §7.3).
 * PHASE VIDÉO : composant prêt mais NON utilisé tant que le client n'a pas
 * fourni ses fichiers (MP4 H.264 + WebM ≤ 4 Mo, poster JPEG 1920×1080).
 * Voile bg/60 + vignettage ; poster seul en mouvement réduit / saveData.
 */
export default function VideoBackground({ src, poster }: { src: string; poster: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <SlotVideo src={src} poster={poster} />
      <div className="absolute inset-0 bg-bg/60" />
      <div className="fx-vignette absolute inset-0" />
    </div>
  );
}
