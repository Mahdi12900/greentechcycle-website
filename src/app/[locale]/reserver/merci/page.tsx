"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

function MerciInner() {
  const t = useTranslations("reserver");
  const sp = useSearchParams();
  const ref = sp?.get("ref") ?? null;
  const mode = sp?.get("mode") ?? null;

  const isFallback = mode === "fallback";

  return (
    <div className="bg-white">
      <section className="relative bg-forest-900 overflow-hidden">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="reveal">
            <div className="max-w-2xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-leaf-100 border border-leaf/30 mb-7">
                <CheckCircle2 className="h-8 w-8 text-leaf-300" aria-hidden="true" />
              </div>

              <h1
                className="text-display-lg mb-6"
              >
                {isFallback ? t("fallback.title") : t("success.title")}
              </h1>

              <p className="text-ondark-muted text-base lg:text-lg mb-10">
                {isFallback ? t("fallback.body") : t("success.body")}
              </p>

              {ref && (
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/8 border border-white/15 mb-10">
                  <span className="uppercase text-ondark-muted text-eyebrow">
                    {t("success.ref")}
                  </span>
                  <code className="text-caption font-mono text-leaf-300 tracking-tight break-all">
                    {ref}
                  </code>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-sm"
                >
                  {t("success.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="mailto:mahdi@greentechcycle.fr"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition text-sm"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  mahdi@greentechcycle.fr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-forest-900" />}>
      <MerciInner />
    </Suspense>
  );
}
