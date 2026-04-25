"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { X, BookOpen } from "lucide-react";

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
  const pathname = usePathname() || "/";
  const ctx = pickContext(pathname);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setVisible(true);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(dismiss, 2000);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={tx(ctx.titleKey, "title")}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1" aria-label="Fermer">
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex items-center justify-center w-14 h-14 bg-[#10B981]/10 rounded-xl mb-5">
          <BookOpen className="w-7 h-7 text-[#10B981]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tx(ctx.titleKey, "title")}</h3>
        <p className="text-sm text-gray-600 mb-6">{tx(ctx.subtitleKey, "subtitle")}</p>
        {submitted ? (
          <p className="text-[#10B981] font-semibold text-center py-4">Merci !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none"
            />
            <button type="submit" className="w-full py-3 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#0E9F6E] transition-colors text-sm">
              {tx(ctx.ctaKey, "cta")}
            </button>
          </form>
        )}
        <button onClick={dismiss} className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600">
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
}
