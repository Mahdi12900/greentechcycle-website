import Image from "next/image";
import type { ReactNode } from "react";
import SlotVideo from "./SlotVideo";

/**
 * MediaSlot — emplacement photo/vidéo (DESIGN.md v2 §7.3).
 * - Sans `src`/`video` : affiche son `fallback` (visuel construit en code).
 *   Jamais de placeholder gris ni de « image à venir ».
 * - `src` : next/image (fill + sizes) — à fournir quand le client livrera ses photos.
 * - `video` : vidéo muette en boucle, poster obligatoire (phase vidéo).
 * Chaque slot a un `id` listé dans `src/content/media-slots.ts`.
 *
 * Deux modes : cadre autonome (ratio fixe, bordure, ombre) ou `fill` pour
 * remplir un cadre existant (absolute inset-0).
 */
export default function MediaSlot({
  id,
  ratio = "16/10",
  fill = false,
  src,
  alt = "",
  video,
  fallback,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
}: {
  id: string;
  ratio?: string;
  fill?: boolean;
  src?: string;
  alt?: string;
  video?: { src: string; poster: string };
  fallback: ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const content = video ? (
    <SlotVideo src={video.src} poster={video.poster} />
  ) : src ? (
    <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes={sizes} />
  ) : (
    fallback
  );

  if (fill) {
    return (
      <div data-media-slot={id} className={`absolute inset-0 overflow-hidden ${className}`}>
        {content}
      </div>
    );
  }
  return (
    <div
      data-media-slot={id}
      className={`relative overflow-hidden rounded-2xl border border-track bg-bg-card shadow-float ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="fx-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0">{content}</div>
    </div>
  );
}
