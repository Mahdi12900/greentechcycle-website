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
    <div className="bg-bg-card">
      <section className="relative bg-bg-card overflow-hidden">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="reveal">
            <div className="max-w-2xl mx-auto text-center text-fg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-dim border border-emerald/30 mb-7">
                <CheckCircle2 className="h-8 w-8 text-emerald" aria-hidden="true" />
              </div>

              <h1
                className="text-display-lg mb-6"
              >
                {isFallback ? t("fallback.title") : t("success.title")}
              </h1>

              <p className="text-fg-muted text-base lg:text-lg mb-10">
                {isFallback ? t("fallback.body") : t("success.body")}
              </p>

              {ref && (
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/8 border border-white/15 mb-10">
                  <span className="uppercase text-fg-muted text-eyebrow">
                    {t("success.ref")}
                  </span>
                  <code className="text-caption font-mono text-emerald tracking-tight break-all">
                    {ref}
                  </code>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 hover:border-track-strong hover: text-sm"
                >
                  {t("success.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="mailto:mahdi@greentechcycle.fr"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-fg border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition text-sm"
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
    <Suspense fallback={<div className="min-h-[60vh] bg-bg-card" />}>
      <MerciInner />
    </Suspense>
  );
}
