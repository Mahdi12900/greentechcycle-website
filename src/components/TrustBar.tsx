"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

export default function TrustBar() {
  const t = useTranslations("TrustBar");

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-primary text-white text-center py-1.5 text-xs font-medium tracking-wide">
      <div className="container-max mx-auto px-4 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
        <span>{t("text")}</span>
      </div>
    </div>
  );
}
