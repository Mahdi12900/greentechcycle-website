"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Button, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import ContactChannels from "@/components/ContactChannels";
import { CONTACT_TOPICS, LEGAL, isContactTopic, mailtoHref, type ContactTopic } from "@/lib/contact";
import { getSectorDef } from "@/data/sectors";
import { getSectorName } from "@/data/sectors-i18n";
import {
  ArrowDown,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Clock,
  Leaf,
  CalendarCheck,
} from "lucide-react";

/**
 * /contact — DESIGN.md §10.6. Formulaire qualifié pré-rempli via ?offre=<slug>.
 * Hero court paper → formulaire #formulaire (cream) → voies directes (night).
 * Le bandeau d'urgence devient une notice ; la section « conversion verte » est coupée.
 */
function ContactInner() {
  const t = useTranslations("Contact");
  const locale = useLocale();
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
  // Sujet → destinataire (src/lib/contact.ts) : ?sujet=support|lab pré-sélectionne le sujet
  const sujetParam = searchParams?.get("sujet");
  const [topic, setTopic] = useState<ContactTopic>(isContactTopic(sujetParam) ? sujetParam : "commercial");
  // ?secteur=<slug> (page /lab, programmes pilotes) : pré-remplit le message avec le secteur.
  // Seuls les 16 slugs de src/data/sectors.ts sont acceptés.
  const secteurParam = searchParams?.get("secteur");
  const sectorName = secteurParam && getSectorDef(secteurParam) ? getSectorName(locale, secteurParam) : null;
  const sectorPrefill = sectorName
    ? locale === "en"
      ? `Sector: ${sectorName}. We would like to discuss a GreenTechCycle Lab pilot programme.`
      : `Secteur : ${sectorName}. Nous souhaitons échanger sur un programme pilote GreenTechCycle Lab.`
    : "";

  const [form, setForm] = useState({
    offre: initialOffer,
    name: "",
    email: "",
    company: "",
    role: "DSI",
    fleet: "1000-5000",
    phone: "",
    timeline: "1-3-mois",
    message: sectorPrefill,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

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

  // Envoi réel : /api/reservation enregistre la demande et l'envoie par email
  // (Resend, si RESEND_API_KEY est configurée côté serveur).
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent || pending) return;
    setPending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          size: form.fleet,
          persona: form.role,
          needs: `Échéance : ${form.timeline}${sectorName ? ` · Secteur : ${sectorName}` : ""}`,
          message: form.message,
          consent: form.consent,
          offerSlug: topic === "commercial" ? form.offre : null,
          topic,
          source: "contact",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const label = "block text-body-sm font-medium text-fg";
  const field =
    "mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <div>
      {/* ═══════════════ HERO court (paper) ═══════════════ */}
      <section className="bg-bg py-16 lg:py-24" aria-labelledby="contact-hero">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <Tag variant="brand" icon={<CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />}>
              {t("urgency.text")}
            </Tag>
            <p className="mt-6 text-eyebrow uppercase text-fg-muted">{t("hero.eyebrow")}</p>
            <h1 id="contact-hero" className="mt-3 max-w-[24ch] text-display-lg text-fg">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-caption text-fg-strong">
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                {t("hero.trust1")}
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                {t("hero.trust2")}
              </li>
              <li className="inline-flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                {t("hero.trust3")}
              </li>
            </ul>
            <a
              href="#formulaire"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-fg-muted hover:text-fg"
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              {t("hero.scrollLabel")}
            </a>
            {/* Voies directes : WhatsApp / email (si configurés) / formulaire */}
            <ContactChannels variant="pills" className="mt-6" />
          </div>
        </div>
      </section>

      {/* ═══════════════ FORMULAIRE #formulaire (cream) ═══════════════ */}
      <section className="border-t border-track bg-bg-card py-16 lg:py-24" id="formulaire" aria-labelledby="form-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <SectionHeader id="form-title" eyebrow={t("form.eyebrow")} title={t("form.title")} intro={t("form.subtitle")} />
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr] lg:gap-12">
            {/* Panneau de l'offre — collant uniquement en lg+ (seule barre fixe : le header) */}
            <div className="rounded-xl border border-track bg-bg p-6 lg:sticky lg:top-24" aria-live="polite">
              {topic === "commercial" ? (
                <>
                  <p className="text-eyebrow uppercase text-fg-muted">{t("form.selectedOfferLabel")}</p>
                  <h3 className="mt-3 text-heading-lg text-fg">{selectedOffer.name}</h3>
                  <p className="mt-2 text-body-sm text-fg-strong">{selectedOffer.pitch}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-caption font-semibold text-emerald">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {selectedOffer.duration}
                  </p>
                  <div className="mt-6 border-t border-track pt-4">
                    <p className="text-eyebrow uppercase text-fg-muted">{t("form.nextStepLabel")}</p>
                    <p className="mt-2 text-body-sm text-fg-strong">{selectedOffer.nextStep}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-eyebrow uppercase text-fg-muted">{tx("Objet de votre demande", "Your request")}</p>
                  <h3 className="mt-3 text-heading-lg text-fg">{CONTACT_TOPICS[topic].label[isEn ? "en" : "fr"]}</h3>
                  <p className="mt-2 text-body-sm text-fg-strong">
                    {tx("Votre message est transmis directement à", "Your message goes straight to")}{" "}
                    <span className="font-mono text-emerald">{CONTACT_TOPICS[topic].recipient}</span>
                  </p>
                </>
              )}
              <figure className="mt-6 border-t border-track pt-4">
                <blockquote className="text-body-sm text-fg">&laquo;&nbsp;{t("hero.floatQuote")}&nbsp;&raquo;</blockquote>
                <figcaption className="mt-2 text-caption text-fg-muted">
                  <span className="font-semibold text-fg-strong">{t("hero.floatName")}</span> · {t("hero.floatRole")}
                </figcaption>
              </figure>
            </div>

            {/* Formulaire §6.16 */}
            <div className="rounded-xl border border-track bg-bg p-6 lg:p-8">
              {submitted ? (
                <div className="py-12 text-center" role="status">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-display-sm text-fg">{t("form.successTitle")}</p>
                  <p className="mx-auto mt-2 max-w-md text-body-sm text-fg-strong">{t("form.successBody")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <fieldset>
                    <legend className={label}>{tx("Objet de votre demande", "What is your request about?")}</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {(Object.keys(CONTACT_TOPICS) as ContactTopic[]).map((k) => (
                        <label
                          key={k}
                          className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-body-sm transition-colors ${
                            topic === k ? "border-emerald bg-emerald-dim text-fg" : "border-track bg-bg text-fg-strong hover:border-track-strong"
                          }`}
                        >
                          <input
                            type="radio"
                            name="topic"
                            value={k}
                            checked={topic === k}
                            onChange={() => setTopic(k)}
                            className="h-4 w-4 flex-shrink-0 accent-emerald"
                          />
                          {CONTACT_TOPICS[k].label[isEn ? "en" : "fr"]}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {topic === "commercial" && (
                  <div>
                    <label htmlFor="offre" className={label}>
                      {t("form.fields.offer")}
                    </label>
                    <select id="offre" value={form.offre} onChange={(e) => setForm({ ...form, offre: e.target.value })} className={field}>
                      {offers.map((o) => (
                        <option key={o.slug} value={o.slug}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>
                        {t("form.fields.name")} <span aria-hidden="true">*</span>
                      </label>
                      <input id="name" type="text" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                    </div>
                    <div>
                      <label htmlFor="email" className={label}>
                        {t("form.fields.email")} <span aria-hidden="true">*</span>
                      </label>
                      <input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className={label}>
                        {t("form.fields.company")} <span aria-hidden="true">*</span>
                      </label>
                      <input id="company" type="text" required autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={field} />
                    </div>
                    <div>
                      <label htmlFor="role" className={label}>
                        {t("form.fields.role")} <span aria-hidden="true">*</span>
                      </label>
                      <select id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={field}>
                        <option value="DSI">{tx("DSI / Direction informatique", "CIO / IT department")}</option>
                        <option value="RSSI">{tx("RSSI / Sécurité", "CISO / Security")}</option>
                        <option value="RSE">{tx("Direction RSE", "CSR department")}</option>
                        <option value="DAF">{tx("DAF / Achats", "CFO / Procurement")}</option>
                        <option value="DG">{tx("Direction générale", "Executive management")}</option>
                        <option value="Autre">{t("form.fields.roleOther")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fleet" className={label}>
                        {t("form.fields.fleet")} <span aria-hidden="true">*</span>
                      </label>
                      <select id="fleet" value={form.fleet} onChange={(e) => setForm({ ...form, fleet: e.target.value })} className={field}>
                        <option value="0-500">{t("form.fields.fleetSmall")}</option>
                        <option value="500-1000">{tx("500 à 1 000", "500 to 1,000")}</option>
                        <option value="1000-5000">{tx("1 000 à 5 000", "1,000 to 5,000")}</option>
                        <option value="5000-20000">{tx("5 000 à 20 000", "5,000 to 20,000")}</option>
                        <option value="20000+">{t("form.fields.fleetLarge")}</option>
                      </select>
                      {(form.fleet === "5000-20000" || form.fleet === "20000+") && (
                        <p className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-dim px-3 py-2 text-caption font-semibold text-emerald">
                          <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                          {t("form.fields.leadScoringMessage")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="timeline" className={label}>
                        {t("form.fields.timeline")} <span aria-hidden="true">*</span>
                      </label>
                      <select id="timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={field}>
                        <option value="immediat">{t("form.fields.timelineNow")}</option>
                        <option value="1-3-mois">{t("form.fields.timeline13")}</option>
                        <option value="3-6-mois">{t("form.fields.timeline36")}</option>
                        <option value="exploration">{t("form.fields.timelineExplore")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className={label}>
                      {t("form.fields.phone")}
                    </label>
                    <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
                  </div>

                  <div>
                    <label htmlFor="message" className={label}>
                      {t("form.fields.message")}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t("form.fields.messagePlaceholder")}
                      className={`${field} h-auto resize-y py-3`}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-body-sm text-fg-strong">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 accent-emerald"
                    />
                    <span>{t("form.consent")}</span>
                  </label>

                  <Button type="submit" size="lg" disabled={pending || !form.consent} className="w-full sm:w-auto">
                    {pending ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    ) : (
                      <Send className="h-4 w-4" aria-hidden="true" />
                    )}
                    {t("form.submit")}
                  </Button>
                  {failed && (
                    <div role="alert" className="rounded-lg border border-danger/40 bg-danger/10 p-4 text-body-sm text-fg">
                      <p className="font-semibold">
                        {tx("L'envoi n'a pas abouti. Vos réponses sont conservées : réessayez, ou passez par un canal direct.", "Sending failed. Your answers are kept: try again, or use a direct channel.")}
                      </p>
                      {mailtoHref(tx("Demande via le site", "Website request"), "", CONTACT_TOPICS[topic].recipient) && (
                        <a
                          href={mailtoHref(tx("Demande via le site", "Website request"), "", CONTACT_TOPICS[topic].recipient) as string}
                          className="mt-2 inline-flex min-h-[44px] items-center font-mono text-caption text-emerald underline underline-offset-4"
                        >
                          {CONTACT_TOPICS[topic].recipient}
                        </a>
                      )}
                      <ContactChannels variant="pills" formHref={null} className="mt-3" />
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COORDONNÉES & VOIES DIRECTES (3 colonnes) ═══════════════
          forest plutôt que night : la section précède le footer (night) et §4.3
          interdit deux sections night consécutives. */}
      <Section tone="forest">
        <div className="reveal">
          <SectionHeader tone="dark" eyebrow={t("info.eyebrow")} title={t("info.title")} intro={t("info.body")} />
        </div>
        <ContactChannels />
        <div className="reveal mt-3 flex items-start gap-4 rounded-xl border border-track bg-bg-card p-5">
          <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="text-eyebrow uppercase text-fg-muted">{tx("Identité légale", "Legal identity")}</p>
            <p className="mt-2 text-body text-fg">{LEGAL.name}</p>
            <p className="mt-2 font-mono text-caption text-fg-muted">SIREN {LEGAL.siren} · {LEGAL.rcs}</p>
          </div>
        </div>

        {/* Ancienne S4 « conversion verte » coupée (la page est déjà la conversion) :
            ses deux liens de découverte restent accessibles ici. */}
        <div className="mt-12 border-t border-track pt-8">
          <p className="text-eyebrow uppercase text-fg-muted">{t("conversion.eyebrow")}</p>
          <p className="mt-2 max-w-[65ch] text-body-sm text-fg-muted">{t("conversion.subtitle")}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <TextLink href="/cas-usages" tone="dark">
              {t("conversion.cta1")}
            </TextLink>
            <TextLink href="/plateforme" tone="dark">
              {t("conversion.cta2")}
            </TextLink>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ContactInner />
    </Suspense>
  );
}
