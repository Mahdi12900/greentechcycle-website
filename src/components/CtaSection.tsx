"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, Download, MessageCircle, Phone } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { ReactNode } from "react";

type CTAVariant = "demo" | "contact" | "download" | "call" | "audit";

interface CtaSectionProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: CTAVariant;
  /** Dark: navy/primary bg (default). Light: white background with primary accents. */
  tone?: "dark" | "light" | "gradient";
  icon?: ReactNode;
  className?: string;
}

const variantIcon: Record<CTAVariant, ReactNode> = {
  demo: <Calendar className="h-5 w-5" />,
  contact: <MessageCircle className="h-5 w-5" />,
  download: <Download className="h-5 w-5" />,
  call: <Phone className="h-5 w-5" />,
  audit: <ArrowRight className="h-5 w-5" />,
};

export default function CtaSection({
  title,
  subtitle,
  primaryLabel = "Demander une démo",
  primaryHref = "/demo",
  secondaryLabel = "Nous contacter",
  secondaryHref = "/contact",
  variant = "demo",
  tone = "dark",
  icon,
  className = "",
}: CtaSectionProps) {
  const isDark = tone === "dark" || tone === "gradient";

  const bgClass =
    tone === "light"
      ? "bg-gradient-to-br from-primary-50 via-white to-accent/5 border-y border-primary-100"
      : tone === "gradient"
      ? "bg-gradient-to-br from-[#047857] via-[#0F172A] to-[#1E40AF]"
      : "bg-[#0F172A]";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subtitleClass = isDark ? "text-gray-300" : "text-gray-600";
  const secondaryClass = isDark
    ? "border-2 border-white/40 hover:border-white/80 text-white hover:bg-white/10 backdrop-blur-sm"
    : "border-2 border-primary/30 text-primary hover:bg-primary hover:text-white";

  return (
    <section className={`relative py-20 md:py-24 overflow-hidden ${bgClass} ${className}`}>
      {/* Decorative blobs */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.10),_transparent_55%)]" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-3xl animate-pulse-slower" />
          {/* Grid pattern */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </>
      )}
      {!isDark && (
        <>
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="container-max mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-lg ${
                isDark ? "bg-accent text-white shadow-accent/30" : "bg-primary text-white shadow-primary/20"
              }`}
            >
              {icon ?? variantIcon[variant]}
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${titleClass}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-base md:text-lg leading-relaxed mb-10 ${subtitleClass}`}>{subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                {primaryLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 ${secondaryClass}`}
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
