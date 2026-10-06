"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiContext";
import { getStoredConsent, saveConsent } from "@/lib/analytics";

/** Événement global : rouvre la bannière avec les choix déjà enregistrés (lien « Gérer mes
 * cookies » du pied de page et de la page /cookies — `window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))`). */
export const OPEN_COOKIE_SETTINGS_EVENT = "gtc:cookie-settings:open";

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
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // « Gérer mes cookies » (pied de page, page /cookies) : rouvre la bannière, préférences
  // déjà faites pré-cochées — modifier son choix doit être aussi facile que l'accepter.
  useEffect(() => {
    function reopen() {
      const stored = getStoredConsent();
      setPrefs({
        analytics: stored?.analytics ?? false,
        functional: stored?.functional ?? false,
        marketing: stored?.marketing ?? false,
      });
      setShowDetails(true);
      setVisible(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  function accept() {
    saveConsent({ analytics: true, functional: true, marketing: true });
    setVisible(false);
  }

  function reject() {
    saveConsent({ analytics: false, functional: false, marketing: false });
    setVisible(false);
  }

  function save() {
    saveConsent(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    /* DESIGN.md v2 §6.11 (correction QA) : sur sm+, carte compacte en bas à
       gauche, hors de la colonne de lecture (ne couvre plus le bandeau de
       confiance) ; sur mobile, feuille pleine largeur ≤ 60 vh qui remplace la
       barre d'action. */
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:right-auto sm:w-[380px] sm:max-w-[calc(100vw-2rem)] sm:p-0"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-labelledby="cookie-banner-title"
    >
      <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-track bg-bg-card p-4 shadow-float sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 id="cookie-banner-title" className="font-sans text-heading-md text-fg">{t("title")}</h2>
          <button
            type="button"
            onClick={reject}
            className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[0.04] hover:text-fg"
            aria-label={t("rejectAll")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mb-4 text-body-sm text-fg-strong">{t("description")}</p>

        {showDetails && (
          <div className="mb-4 divide-y divide-track rounded-lg border border-track">
            <label className="flex items-center gap-3 px-3 py-2 text-body-sm">
              <input type="checkbox" checked disabled className="h-5 w-5 accent-emerald" />
              <span className="font-medium text-fg">{t("categories.necessary.title")}</span>
              <span className="ml-auto text-right text-caption text-fg-muted">{t("categories.necessary.desc")}</span>
            </label>
            {(["analytics", "functional", "marketing"] as const).map((cat) => (
              <label key={cat} className="flex items-center gap-3 px-3 py-2 text-body-sm">
                <input
                  type="checkbox"
                  checked={prefs[cat]}
                  onChange={(e) => setPrefs({ ...prefs, [cat]: e.target.checked })}
                  className="h-5 w-5 accent-emerald"
                />
                <span className="font-medium text-fg">{t(`categories.${cat}.title`)}</span>
                <span className="ml-auto text-right text-caption text-fg-muted">{t(`categories.${cat}.desc`)}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {/* Accepter / Refuser : même taille, même poids visuel (plein, pas de hiérarchie
              bouton plein vs. contour) — refuser doit être aussi simple et visible qu'accepter. */}
          <button type="button" onClick={accept} className="h-11 rounded-lg bg-emerald px-5 text-body-sm font-semibold text-bg transition-colors hover:bg-emerald-hover">
            {t("acceptAll")}
          </button>
          <button type="button" onClick={reject} className="h-11 rounded-lg bg-fg px-5 text-body-sm font-semibold text-bg transition-colors hover:bg-white">
            {t("rejectAll")}
          </button>
          {showDetails ? (
            <button type="button" onClick={save} className="h-11 rounded-lg px-4 text-body-sm font-semibold text-emerald transition-colors hover:bg-white/[0.04]">
              {t("save")}
            </button>
          ) : (
            <button type="button" onClick={() => setShowDetails(true)} className="h-11 rounded-lg px-4 text-body-sm font-semibold text-emerald transition-colors hover:bg-white/[0.04]">
              {t("customize")}
            </button>
          )}
          <Link href="/cookies" className="ml-auto text-caption text-fg-muted underline-offset-2 hover:text-fg hover:underline">
            {t("link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
