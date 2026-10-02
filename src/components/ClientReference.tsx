import { Tv, type LucideIcon } from "lucide-react";

/**
 * Référence client (DESIGN.md §6.8) — remplace l'ancien bloc rose de la page
 * Médias & audiovisuel. Section `forest`, pastille pictogramme, citation
 * éditoriale en Fraunces, méta en légende. Ni étoile, ni Sparkles.
 */
export default function ClientReference({
  eyebrow,
  quote,
  meta,
  icon: Icon = Tv,
}: {
  eyebrow: string;
  quote: string;
  meta?: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="bg-forest py-12" aria-label={eyebrow}>
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <figure className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[auto_1fr]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-700">
            <Icon className="h-6 w-6 text-leaf-300" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div className="max-w-[65ch]">
            <p className="text-eyebrow uppercase text-ondark-muted">{eyebrow}</p>
            <blockquote className="mt-3 text-display-sm text-ondark">{quote}</blockquote>
            {meta && <figcaption className="mt-4 text-caption text-ondark-muted">{meta}</figcaption>}
          </div>
        </figure>
      </div>
    </section>
  );
}
