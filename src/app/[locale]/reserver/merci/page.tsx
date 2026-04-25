"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

function MerciInner() {
  const t = useTranslations("reserver");
  const sp = useSearchParams();
  const ref = sp?.get("ref") ?? null;
  const mode = sp?.get("mode") ?? null;

  const isFallback = mode === "fallback";

  return (
    <main className="bg-white">
      <section className="relative bg-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 mb-7">
                <CheckCircle2 className="h-8 w-8 text-[#10B981]" aria-hidden="true" />
              </div>

              <h1
                className="font-black tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.05 }}
              >
                {isFallback ? t("fallback.title") : t("success.title")}
              </h1>

              <p className="text-gray-300 text-base lg:text-lg leading-[1.7] mb-10">
                {isFallback ? t("fallback.body") : t("success.body")}
              </p>

              {ref && (
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/8 border border-white/15 mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    {t("success.ref")}
                  </span>
                  <code className="text-[12px] font-mono text-[#6EE7B7] tracking-tight break-all">
                    {ref}
                  </code>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
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
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#0F172A]" />}>
      <MerciInner />
    </Suspense>
  );
}
