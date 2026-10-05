"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiContext";
import { ChatLauncher } from "@/components/SalesAssistantWidget";

/**
 * Barre d'action mobile (DESIGN.md §6.11) — remplace StickyCTA.
 * Seul élément fixe en bas sous `lg` : CTA contextuel + bouton de chat.
 * - Apparaît une fois le hero (1re section de <main>) dépassé.
 * - S'efface quand CookieBanner / ExitPopup / chat sont ouverts.
 * Le libellé et la cible dépendent de la page (micro-conversion la plus pertinente).
 */
export function pickContext(pathname: string): { textKey: string; href: string } {
  const last = pathname.replace(/\/$/, "");
  if (last.includes("/impact")) return { textKey: "impact", href: "/contact?reason=scope3" };
  if (last.includes("/cas-usages") || last.includes("/secteurs"))
    return { textKey: "audit", href: "/contact?reason=audit" };
  if (last.includes("/services")) return { textKey: "expert", href: "/contact?reason=services" };
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

export default function MobileActionBar() {
  const t = useTranslations("StickyCTA");
  const pathname = usePathname() || "/";
  const { overlayOpen, chatOpen } = useSiteUi();
  const [pastHero, setPastHero] = useState(false);
  const ctx = pickContext(pathname);
  const label = (() => {
    try {
      return t(ctx.textKey);
    } catch {
      return t("text");
    }
  })();
  const chatAvailable = !pathname.includes("/reserver");

  /* Sentinelle : la 1re section de <main> (le hero) */
  useEffect(() => {
    setPastHero(false);
    const hero = document.querySelector("main section");
    if (!hero) {
      const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  const visible = pastHero && !overlayOpen && !chatOpen;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-track bg-bg/95 px-4 backdrop-blur transition-transform duration-200 ease-out lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 items-center gap-3">
        <Link
          href={ctx.href}
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald px-4 text-body-sm font-semibold text-bg transition-colors hover:bg-emerald-hover"
        >
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {chatAvailable && <ChatLauncher size="md" className={visible ? "flex" : "hidden"} />}
      </div>
    </div>
  );
}
