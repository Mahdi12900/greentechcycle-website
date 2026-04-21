"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
  const t = useTranslations("StickyCTA");

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden p-3 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <Link
        href="/demo"
        className="pointer-events-auto flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-lg shadow-accent/30 hover:bg-accent-600 transition-colors text-sm"
      >
        {t("text")}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
