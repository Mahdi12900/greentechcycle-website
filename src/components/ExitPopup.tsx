"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiContext";

const SESSION_KEY = "gtc-exit-popup-seen";

/**
 * Page-aware exit-intent popup. The lead magnet pitched is chosen from the
 * current pathname so visitors leaving an impact page are offered carbon
 * methodology, regulation pages get the compliance memo, etc.
 */
function pickContext(pathname: string): { titleKey: string; subtitleKey: string; ctaKey: string } {
  const last = pathname.replace(/\/$/, "");
  if (last.includes("/impact"))
    return { titleKey: "impactTitle", subtitleKey: "impactSubtitle", ctaKey: "impactCta" };
  if (last.includes("/reglementation") || last.includes("/regulation"))
    return { titleKey: "regulationTitle", subtitleKey: "regulationSubtitle", ctaKey: "regulationCta" };
  if (last.includes("/cas-usages") || last.includes("/secteurs"))
    return { titleKey: "useCasesTitle", subtitleKey: "useCasesSubtitle", ctaKey: "useCasesCta" };
  if (last.includes("/services") || last.includes("/plateforme") || last.includes("/platform"))
    return { titleKey: "servicesTitle", subtitleKey: "servicesSubtitle", ctaKey: "servicesCta" };
  return { titleKey: "title", subtitleKey: "subtitle", ctaKey: "cta" };
}

export default function ExitPopup() {
  const t = useTranslations("ExitPopup");
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const ctx = pickContext(pathname);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setOverlay } = useSiteUi();

  useEffect(() => {
    setOverlay("exit", visible);
    return () => setOverlay("exit", false);
  }, [visible, setOverlay]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Fallback helper: contextual keys may not yet exist in i18n; default to
  // the historical generic copy so the component never throws.
  const tx = (key: string, fallbackKey: string) => {
    try {
      return t(key);
    } catch {
      return t(fallbackKey);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || localStorage.getItem("gtc-exit-popup-dismissed")) return;
    // Une fois par session au plus (DESIGN.md §11 étape 8)
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* noop */
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setVisible(true);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* noop */
        }
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  function dismiss() {
    localStorage.setItem("gtc-exit-popup-dismissed", "1");
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
    } catch {
      // Non-blocking — show success regardless
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(dismiss, 2000);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div className="relative w-full max-w-md rounded-xl border border-line bg-paper p-8 shadow-pop">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink"
          aria-label={locale === "en" ? "Close" : "Fermer"}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="text-eyebrow uppercase text-muted">{locale === "en" ? "Free resource" : "Ressource offerte"}</p>
        <h2 id="exit-popup-title" className="mt-3 pr-8 text-display-sm text-ink">{tx(ctx.titleKey, "title")}</h2>
        <p className="mt-3 text-body-sm text-ink-700">{tx(ctx.subtitleKey, "subtitle")}</p>
        {submitted ? (
          <p className="mt-6 text-body font-semibold text-leaf" role="status">
            {locale === "en" ? "Thank you!" : "Merci !"}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <label htmlFor="exit-popup-email" className="sr-only">
              {t("placeholder")}
            </label>
            <input
              id="exit-popup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-body text-ink placeholder:text-muted focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
            />
            <button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-lg bg-leaf px-6 text-body font-semibold text-white transition-colors hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "…" : tx(ctx.ctaKey, "cta")}
            </button>
          </form>
        )}
        <button type="button" onClick={dismiss} className="mt-3 h-11 w-full text-center text-caption text-muted hover:text-ink">
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
}
