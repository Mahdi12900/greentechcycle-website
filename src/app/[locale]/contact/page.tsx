"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeIn, ScaleIn } from "@/components/motion";
import {
  ArrowDown,
  Send,
  CheckCircle2,
  Quote,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Leaf,
  CalendarCheck,
} from "lucide-react";

/**
 * /contact — refonte éditoriale (vague 4)
 * Formulaire qualifié pré-rempli via ?offre=<slug>. Pattern hero sombre,
 * sections alternées, prose narrative, conversion verte.
 */
function ContactInner() {
  const t = useTranslations("Contact");
  const searchParams = useSearchParams();

  type Offer = {
    slug: string;
    name: string;
    pitch: string;
    duration: string;
    nextStep: string;
  };
  const offers = t.raw("offers") as Offer[];

  const initialOffer = (searchParams?.get("offre") ?? "audit-decommissionnement").trim();

  const [form, setForm] = useState({
    offre: initialOffer,
    name: "",
    email: "",
    company: "",
    role: "DSI",
    fleet: "1000-5000",
    phone: "",
    timeline: "1-3-mois",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  // Synchronise quand le param URL change
  useEffect(() => {
    const fromUrl = searchParams?.get("offre");
    if (fromUrl && fromUrl !== form.offre) {
      setForm((prev) => ({ ...prev, offre: fromUrl }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const selectedOffer =
    offers.find((o) => o.slug === form.offre) ?? offers[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <main className="overflow-hidden bg-white">
      {/* ═══════════════ Bandeau urgence ═══════════════ */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-center">
          <CalendarCheck className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="leading-snug text-gray-300">{t("urgency.text")}</p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 — HERO — split sombre, photo équipe à droite
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[78vh] flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="contact-hero"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 12% 10%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 pb-12 lg:py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("hero.eyebrow")}
              </span>
            </div>
            <h1
              id="contact-hero"
              className="text-white font-black tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.5rem)", lineHeight: 1.05 }}
            >
              {t("hero.title")}
            </h1>
            <p className="text-gray-300 text-base lg:text-[1.1rem] leading-[1.72] max-w-xl mb-8">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-8 border-b border-white/10">
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                {t("hero.trust1")}
              </span>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                {t("hero.trust2")}
              </span>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <Leaf className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                {t("hero.trust3")}
              </span>
            </div>

            <a
              href="#formulaire"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
              {t("hero.scrollLabel")}
            </a>
          </FadeIn>
        </div>

        <div className="relative w-full lg:w-[45%] min-h-[42vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/team-collab.jpg"
            alt="Équipe GreenTechCycle en réunion d'atterrissage avec un client grand compte"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />

          <div className="absolute bottom-8 right-5 sm:right-8 max-w-[280px] bg-white/96 backdrop-blur-lg rounded-2xl p-5 shadow-2xl ring-1 ring-gray-100 hidden sm:block">
            <Quote className="h-6 w-6 text-[#0EA5E9] mb-3" aria-hidden="true" />
            <p className="text-[12px] text-[#0F172A] leading-snug font-medium mb-3">
              &ldquo;{t("hero.floatQuote")}&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0EA5E9]/12 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0F172A] leading-none">
                  {t("hero.floatName")}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                  {t("hero.floatRole")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 — FORMULAIRE QUALIFIÉ — clair, panneau d'offre à gauche
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]" id="formulaire">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("form.eyebrow")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight leading-[1.05] mb-4"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
              >
                {t("form.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("form.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 max-w-6xl">
            {/* Panneau de l'offre sélectionnée */}
            <FadeIn>
              <aside className="bg-[#0F172A] text-white rounded-2xl p-7 lg:sticky lg:top-24">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                  {t("form.selectedOfferLabel")}
                </p>
                <h3 className="text-xl font-bold leading-tight mb-3 tracking-tight">
                  {selectedOffer.name}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-5">
                  {selectedOffer.pitch}
                </p>
                <div className="flex items-center gap-2 mb-5 text-xs text-[#10B981]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">{selectedOffer.duration}</span>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    {t("form.nextStepLabel")}
                  </p>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {selectedOffer.nextStep}
                  </p>
                </div>
              </aside>
            </FadeIn>

            {/* Formulaire */}
            <FadeIn>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 lg:p-9">
                {submitted ? (
                  <div className="text-center py-12">
                    <ScaleIn>
                      <div className="w-16 h-16 mx-auto rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                      </div>
                    </ScaleIn>
                    <p className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">
                      {t("form.successTitle")}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                      {t("form.successBody")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="offre"
                        className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                      >
                        {t("form.fields.offer")}
                      </label>
                      <select
                        id="offre"
                        value={form.offre}
                        onChange={(e) => setForm({ ...form, offre: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none bg-white"
                      >
                        {offers.map((o) => (
                          <option key={o.slug} value={o.slug}>
                            {o.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.name")} *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.email")} *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.company")} *
                        </label>
                        <input
                          id="company"
                          type="text"
                          required
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.role")} *
                        </label>
                        <select
                          id="role"
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none bg-white"
                        >
                          <option value="DSI">DSI / Direction informatique</option>
                          <option value="RSSI">RSSI / Sécurité</option>
                          <option value="RSE">Direction RSE</option>
                          <option value="DAF">DAF / Achats</option>
                          <option value="DG">Direction générale</option>
                          <option value="Autre">{t("form.fields.roleOther")}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="fleet"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.fleet")} *
                        </label>
                        <select
                          id="fleet"
                          value={form.fleet}
                          onChange={(e) => setForm({ ...form, fleet: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none bg-white"
                        >
                          <option value="0-500">{t("form.fields.fleetSmall")}</option>
                          <option value="500-1000">500 — 1 000</option>
                          <option value="1000-5000">1 000 — 5 000</option>
                          <option value="5000-20000">5 000 — 20 000</option>
                          <option value="20000+">{t("form.fields.fleetLarge")}</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                        >
                          {t("form.fields.timeline")} *
                        </label>
                        <select
                          id="timeline"
                          value={form.timeline}
                          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none bg-white"
                        >
                          <option value="immediat">{t("form.fields.timelineNow")}</option>
                          <option value="1-3-mois">{t("form.fields.timeline13")}</option>
                          <option value="3-6-mois">{t("form.fields.timeline36")}</option>
                          <option value="exploration">{t("form.fields.timelineExplore")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                      >
                        {t("form.fields.phone")}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-[#0F172A] tracking-wider uppercase mb-1.5"
                      >
                        {t("form.fields.message")}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t("form.fields.messagePlaceholder")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]"
                      />
                      <span>{t("form.consent")}</span>
                    </label>

                    <button
                      type="submit"
                      disabled={pending || !form.consent}
                      className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {pending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden="true" />
                      )}
                      {t("form.submit")}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 — COORDONNÉES & VOIES DIRECTES — split sombre
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] text-white">
        <div className="flex flex-col lg:flex-row min-h-[60vh]">
          <div className="relative w-full lg:w-[42%] min-h-[40vh] lg:min-h-0 overflow-hidden flex-shrink-0">
            <Image
              src="/photos/corporate-meeting.jpg"
              alt="Réunion de cadrage avec une direction informatique grand compte"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/70" />
          </div>
          <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20">
            <div className="max-w-xl w-full">
              <FadeIn>
                <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                  {t("info.eyebrow")}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-8">
                  {t("info.title")}
                </h2>
                <p className="text-gray-300 text-base leading-[1.78] mb-10">
                  {t("info.body")}
                </p>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-gray-200 whitespace-pre-line leading-relaxed pt-1.5">
                      {t("info.address")}
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    </div>
                    <a
                      href="tel:+33186652210"
                      className="text-sm text-gray-200 hover:text-[#10B981] transition-colors pt-1.5"
                    >
                      {t("info.phone")}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    </div>
                    <a
                      href="mailto:contact@greentechcycle.fr"
                      className="text-sm text-gray-200 hover:text-[#10B981] transition-colors pt-1.5"
                    >
                      {t("info.email")}
                    </a>
                  </li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S4 — CONVERSION FOND VERT PLEIN
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#10B981] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <p className="text-sm font-semibold tracking-[0.18em] text-white/80 uppercase mb-4">
                {t("conversion.eyebrow")}
              </p>
              <h2
                className="font-bold tracking-tight leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
              >
                {t("conversion.title")}
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {t("conversion.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] hover:bg-[#F8FAFC] font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
                >
                  {t("conversion.cta1")}
                </Link>
                <Link
                  href="/plateforme"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  {t("conversion.cta2")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <ContactInner />
    </Suspense>
  );
}
