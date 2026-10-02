import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * Cartes (DESIGN.md §6.5) : bordure 1 px `line`, rayon 12 px, sans ombre.
 * Cliquable : bordure plus foncée + ombre `card` au survol, titre → leaf,
 * flèche décalée de 2 px. Sur sombre : forest-950 + ondark-line.
 */
type Pad = "sm" | "md" | "lg";
const PAD: Record<Pad, string> = { sm: "p-4", md: "p-6", lg: "p-8" };

export function cardClasses({ tone = "light", pad = "md", className = "" }: { tone?: "light" | "dark"; pad?: Pad; className?: string } = {}) {
  return `rounded-xl border ${tone === "dark" ? "border-ondark-line bg-forest-950 text-ondark" : "border-line bg-paper text-ink"} ${PAD[pad]} ${className}`;
}

export default function Card({
  children,
  tone = "light",
  pad = "md",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  pad?: Pad;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <Tag className={cardClasses({ tone, pad, className })}>{children}</Tag>;
}

export function CardLink({
  href,
  children,
  tone = "light",
  pad = "md",
  className = "",
  cta,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  pad?: Pad;
  className?: string;
  /** Libellé du lien « → » affiché en bas de carte. */
  cta?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col transition-[border-color,box-shadow] duration-150 ${
        tone === "dark" ? "hover:border-white/30" : "hover:border-ink/20 hover:shadow-card"
      } ${cardClasses({ tone, pad, className })}`}
    >
      {children}
      {cta && (
        <span className={`mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-medium ${tone === "dark" ? "text-leaf-300" : "text-leaf"}`}>
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}
