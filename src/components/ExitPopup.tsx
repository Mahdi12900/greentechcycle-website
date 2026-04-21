"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, BookOpen } from "lucide-react";

export default function ExitPopup() {
  const t = useTranslations("ExitPopup");
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t("title")}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1" aria-label="Fermer">
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-5">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t("title")}</h3>
        <p className="text-sm text-gray-600 mb-6">{t("subtitle")}</p>
        {submitted ? (
          <p className="text-accent font-semibold text-center py-4">Merci !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-sm">
              {t("cta")}
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
