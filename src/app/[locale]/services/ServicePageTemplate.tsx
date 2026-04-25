"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";

export type ServicePageData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  badge: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  methodology: {
    title: string;
    steps: { title: string; desc: string }[];
  };
  deliverables: string[];
  sla: { metric: string; value: string }[];
  certifications: string[];
  faq: { q: string; a: string }[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#0F172A] text-sm pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const Icon = data.icon;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857] via-[#0B4633] to-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                  <Icon className="h-6 w-6 text-[#6EE7B7]" />
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-xs font-semibold text-white ring-1 ring-white/20">
                  {data.badge}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-3">
                {data.eyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                {data.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
                {data.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={data.ctaPrimary.href}
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {data.ctaPrimary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={data.ctaSecondary.href}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition"
                >
                  {data.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Description + Image */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 tracking-tight">
                  Pourquoi ce service ?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {data.description}
                </p>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.benefits.map((b, j) => (
                    <StaggerItem key={j}>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 text-[#047857] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-snug">{b}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#047857]/30 via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
                {data.methodology.title}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="max-w-4xl mx-auto space-y-6">
            {data.methodology.steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#047857] text-white font-bold flex items-center justify-center shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables + SLA + Certifications */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Deliverables */}
            <FadeIn>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 h-full">
                <h3 className="text-lg font-bold text-[#0F172A] mb-5">Livrables</h3>
                <ul className="space-y-3">
                  {data.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#047857] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* SLA */}
            <FadeIn>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 h-full">
                <h3 className="text-lg font-bold text-[#0F172A] mb-5">SLA contractuels</h3>
                <ul className="space-y-4">
                  {data.sla.map((s, i) => (
                    <li key={i}>
                      <p className="text-2xl font-bold text-[#047857]">{s.value}</p>
                      <p className="text-sm text-gray-600">{s.metric}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 h-full">
                <h3 className="text-lg font-bold text-[#0F172A] mb-5">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((c, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#047857]/10 text-[#047857] text-xs font-semibold border border-[#047857]/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {data.faq.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-10">
                  <HelpCircle className="w-6 h-6 text-[#047857]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                    Questions frequentes
                  </h2>
                </div>
                <div className="space-y-3">
                  {data.faq.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection
        title={data.ctaPrimary.label}
        subtitle="Discutons de votre parc IT : notre equipe propose un audit gratuit et un plan d'action sous 48h."
        primaryLabel={data.ctaPrimary.label}
        primaryHref={data.ctaPrimary.href}
        secondaryLabel="Voir la demo"
        secondaryHref="/demo"
        variant="audit"
        tone="dark"
      />
    </main>
  );
}
