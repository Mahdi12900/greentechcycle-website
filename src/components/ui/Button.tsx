import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * Boutons (DESIGN.md §6.3). Une seule primitive pour les liens et les boutons.
 * - variant : primary | secondary | ghost
 * - tone    : light (fond clair) | dark (sur forest / night)
 * - size    : md (h-11) | lg (h-12)
 * Flèche à droite par défaut uniquement sur le primaire ; jamais de glow ni de levée.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonTone = "light" | "dark";
export type ButtonSize = "md" | "lg";

interface StyleProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const VARIANTS: Record<ButtonTone, Record<ButtonVariant, string>> = {
  light: {
    primary: "bg-leaf text-white hover:bg-leaf-700",
    secondary: "border border-line bg-paper text-ink hover:border-ink/30 hover:bg-cream",
    ghost: "bg-transparent text-leaf hover:bg-leaf-50",
  },
  dark: {
    primary: "bg-ondark text-forest hover:bg-white",
    secondary: "border border-ondark-line bg-transparent text-ondark hover:border-white/30 hover:bg-white/10",
    ghost: "bg-transparent text-leaf-300 hover:bg-white/10",
  },
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-body-sm",
  lg: "h-12 px-6 text-body",
};

export function buttonClasses({
  variant = "primary",
  tone = "light",
  size = "md",
  fullWidth = false,
  className = "",
}: StyleProps = {}) {
  return [
    "group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150",
    "disabled:cursor-not-allowed disabled:opacity-60",
    tone === "dark" ? "focus-visible:outline-leaf-300" : "",
    VARIANTS[tone][variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Arrow() {
  return (
    <ArrowRight
      className="h-4 w-4 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  );
}

export function ButtonLink({
  href,
  children,
  arrow,
  external = false,
  ...style
}: StyleProps & { href: string; children: ReactNode; arrow?: boolean; external?: boolean }) {
  const showArrow = arrow ?? (style.variant ?? "primary") === "primary";
  const cls = buttonClasses(style);
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {showArrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {showArrow && <Arrow />}
    </Link>
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { arrow?: boolean }
>(function Button({ variant, tone, size, fullWidth, className, arrow, children, type = "button", ...rest }, ref) {
  const showArrow = arrow ?? false;
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, tone, size, fullWidth, className })}
      {...rest}
    >
      {children}
      {showArrow && <Arrow />}
    </button>
  );
});

/** Lien texte discret « → » (Linear) : body-sm 500 leaf. */
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1 text-body-sm font-medium transition-colors ${
        tone === "dark" ? "text-leaf-300 hover:text-ondark" : "text-leaf hover:text-leaf-700"
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
