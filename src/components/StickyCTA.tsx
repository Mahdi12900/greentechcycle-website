"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/**
 * Sticky mobile CTA. The label and target route are derived from the current
 * pathname so each page funnel offers the most relevant micro-conversion
 * (audit on impact / sectoral pages, demo on platform pages, contact otherwise).
 */
function pickContext(pathname: string): { textKey: string; href: string } {
  const last = pathname.replace(/\/$/, "");
  if (last.includes("/impact"))
    return { textKey: "impact", href: "/contact?reason=scope3" };
  if (last.includes("/cas-usages") || last.includes("/secteurs"))
    return { textKey: "audit", href: "/contact?reason=audit" };
  if (last.includes("/services"))
    return { textKey: "expert", href: "/contact?reason=services" };
  if (last.includes("/tarifs") || last.includes("/pricing"))
    return { textKey: "quote", href: "/contact?reason=quote" };
  if (last.includes("/reglementation") || last.includes("/regulation"))
    return { textKey: "compliance", href: "/contact?reason=compliance" };
  if (
    last.includes("/plateforme") ||
    last.includes("/platform") ||
    last.includes("/methodologie") ||
    last.includes("/methodology") ||
    last.includes("/processus-itad") ||
    last.includes("/itad-process") ||
    last.includes("/parcours-client") ||
    last.includes("/customer-journey")
  )
    return { textKey: "demo", href: "/demo" };
  return { textKey: "default", href: "/demo" };
}

export default function StickyCTA() {
  const t = useTranslations("StickyCTA");
  const pathname = usePathname() || "/";
  const ctx = pickContext(pathname);
  // Fallback to "text" key if a contextual key is missing in messages — keeps
  // the component robust during partial i18n rollouts.
  const label = (() => {
    try {
      return t(ctx.textKey);
    } catch {
      return t("text");
    }
  })();

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden p-3 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <Link
        href={ctx.href}
        className="pointer-events-auto flex items-center justify-center gap-2 w-full py-3.5 bg-[#10B981] text-white font-semibold rounded-xl shadow-lg shadow-[#10B981]/30 hover:bg-[#0E9F6E] transition-colors text-sm"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
