"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, functional: false, marketing: false });

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
    <div className="fixed bottom-0 inset-x-0 z-[60] p-2 sm:p-4" role="dialog" aria-label="Gestion des cookies">
      <div className="container-max mx-auto max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 text-sm">{t("title")}</h3>
          </div>
          <button onClick={reject} className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded p-1" aria-label="Fermer la bannière cookies"><X className="w-4 h-4" aria-hidden="true" /></button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{t("description")}</p>

        {showDetails && (
          <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked disabled className="accent-primary" />
              <span className="font-medium text-gray-700">{t("categories.necessary.title")}</span>
              <span className="text-gray-400 text-xs ml-auto">{t("categories.necessary.desc")}</span>
            </label>
            {(["analytics", "functional", "marketing"] as const).map((cat) => (
              <label key={cat} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={prefs[cat]}
                  onChange={(e) => setPrefs({ ...prefs, [cat]: e.target.checked })}
                  className="accent-primary"
                />
                <span className="font-medium text-gray-700">{t(`categories.${cat}.title`)}</span>
                <span className="text-gray-400 text-xs ml-auto">{t(`categories.${cat}.desc`)}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={accept} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors">
            {t("acceptAll")}
          </button>
          <button onClick={reject} className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            {t("rejectAll")}
          </button>
          {showDetails ? (
            <button onClick={save} className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
              {t("save")}
            </button>
          ) : (
            <button onClick={() => setShowDetails(true)} className="px-4 py-2 text-sm text-gray-500 hover:text-primary transition-colors">
              {t("customize")}
            </button>
          )}
          <Link href="/cookies" className="ml-auto text-xs text-gray-400 hover:text-primary transition-colors">
            {t("link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
