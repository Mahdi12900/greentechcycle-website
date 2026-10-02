"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiContext";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, functional: false, marketing: false });
  const { setOverlay } = useSiteUi();

  // Tant que la bannière est ouverte, elle prend la place de la barre d'action mobile.
  useEffect(() => {
    setOverlay("cookies", visible);
    return () => setOverlay("cookies", false);
  }, [visible, setOverlay]);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("gtc-cookies")) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("gtc-cookies", JSON.stringify({ necessary: true, analytics: true, functional: true, marketing: true }));
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("gtc-cookies", JSON.stringify({ necessary: true, analytics: false, functional: false, marketing: false }));
    setVisible(false);
  }

  function save() {
    localStorage.setItem("gtc-cookies", JSON.stringify({ necessary: true, ...prefs }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-xl border border-line bg-paper p-4 shadow-pop sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 id="cookie-banner-title" className="font-sans text-heading-md text-ink">{t("title")}</h2>
          <button
            type="button"
            onClick={reject}
            className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink"
            aria-label={t("rejectAll")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mb-4 text-body-sm text-ink-700">{t("description")}</p>

        {showDetails && (
          <div className="mb-4 divide-y divide-line rounded-lg border border-line">
            <label className="flex items-center gap-3 px-3 py-2 text-body-sm">
              <input type="checkbox" checked disabled className="h-5 w-5 accent-leaf" />
              <span className="font-medium text-ink">{t("categories.necessary.title")}</span>
              <span className="ml-auto text-right text-caption text-muted">{t("categories.necessary.desc")}</span>
            </label>
            {(["analytics", "functional", "marketing"] as const).map((cat) => (
              <label key={cat} className="flex items-center gap-3 px-3 py-2 text-body-sm">
                <input
                  type="checkbox"
                  checked={prefs[cat]}
                  onChange={(e) => setPrefs({ ...prefs, [cat]: e.target.checked })}
                  className="h-5 w-5 accent-leaf"
                />
                <span className="font-medium text-ink">{t(`categories.${cat}.title`)}</span>
                <span className="ml-auto text-right text-caption text-muted">{t(`categories.${cat}.desc`)}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={accept} className="h-11 rounded-lg bg-leaf px-5 text-body-sm font-semibold text-white transition-colors hover:bg-leaf-700">
            {t("acceptAll")}
          </button>
          <button type="button" onClick={reject} className="h-11 rounded-lg border border-line bg-paper px-5 text-body-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-cream">
            {t("rejectAll")}
          </button>
          {showDetails ? (
            <button type="button" onClick={save} className="h-11 rounded-lg px-4 text-body-sm font-semibold text-leaf transition-colors hover:bg-leaf-50">
              {t("save")}
            </button>
          ) : (
            <button type="button" onClick={() => setShowDetails(true)} className="h-11 rounded-lg px-4 text-body-sm font-semibold text-leaf transition-colors hover:bg-leaf-50">
              {t("customize")}
            </button>
          )}
          <Link href="/cookies" className="ml-auto text-caption text-muted underline-offset-2 hover:text-ink hover:underline">
            {t("link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
