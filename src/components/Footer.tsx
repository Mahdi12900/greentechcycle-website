"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/Logo";
import { Mail, MessageCircle, MapPin, Linkedin, Twitter, ArrowUpRight, Send } from "lucide-react";
import { EMAILS, PREFILL, mailtoHref, whatsappHref } from "@/lib/contact";
import CertificationStrip from "@/components/CertificationStrip";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isEn = locale === "en";
  const pre = isEn ? PREFILL.en : PREFILL.fr;
  // Pied de page : adresse support (clients existants)
  const mail = mailtoHref(pre.supportSubject, "", EMAILS.support);
  const wa = whatsappHref(pre.whatsapp);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const columns = [
    {
      title: t("columns.services.title"),
      links: [
        { name: t("columns.services.links.audit"), href: "/services/audit-inventaire" },
        { name: t("columns.services.links.erasure"), href: "/services/effacement-securise" },
        { name: t("columns.services.links.refurbish"), href: "/services/reconditionnement-valorisation" },
        { name: t("columns.services.links.recycling"), href: "/services/recyclage-deee" },
        { name: t("columns.services.links.cyber"), href: "/services/cybersecurite" },
        { name: t("columns.services.links.wakibox"), href: "/services/wakibox" },
        { name: t("columns.services.links.useCases"), href: "/cas-usages" },
        { name: t("columns.services.links.pricing"), href: "/tarifs" },
      ],
    },
    {
      title: t("columns.sectors.title"),
      links: [
        { name: t("columns.sectors.links.overview"), href: "/secteurs" },
        { name: t("columns.sectors.links.finance"), href: "/secteurs/finance" },
        { name: t("columns.sectors.links.sante"), href: "/secteurs/sante" },
        { name: t("columns.sectors.links.industrie"), href: "/secteurs/industrie" },
        { name: t("columns.sectors.links.retail"), href: "/secteurs/retail" },
        { name: t("columns.sectors.links.energie"), href: "/secteurs/energie" },
        { name: t("columns.sectors.links.transport"), href: "/secteurs/transport-logistique" },
        { name: t("columns.sectors.links.public"), href: "/secteurs/public" },
        { name: t("columns.sectors.links.tech"), href: "/secteurs/tech" },
        { name: t("columns.sectors.links.medias"), href: "/secteurs/medias-audiovisuel" },
        { name: t("columns.sectors.links.conseil"), href: "/secteurs/conseil" },
        { name: t("columns.sectors.links.pharma"), href: "/secteurs/pharma-biotech" },
        { name: t("columns.sectors.links.btp"), href: "/secteurs/btp" },
        { name: t("columns.sectors.links.horeca"), href: "/secteurs/horeca" },
        { name: t("columns.sectors.links.education"), href: "/secteurs/education-recherche" },
        { name: t("columns.sectors.links.agroalimentaire"), href: "/secteurs/agroalimentaire" },
        { name: t("columns.sectors.links.telecom"), href: "/secteurs/telecom" },
      ],
    },
    {
      title: t("columns.company.title"),
      links: [
        { name: t("columns.company.links.whyGtc"), href: "/pourquoi-gtc" },
        { name: t("columns.company.links.journey"), href: "/parcours-client" },
        { name: t("columns.company.links.ecosystem"), href: "/ecosysteme" },
        { name: t("columns.company.links.careers"), href: "/carrieres" },
        { name: t("columns.company.links.impact"), href: "/impact" },
        { name: t("columns.company.links.contact"), href: "/contact" },
      ],
    },
    {
      title: t("columns.resources.title"),
      links: [
        { name: t("columns.resources.links.demo"), href: "/demo" },
        { name: t("columns.resources.links.faq"), href: "/faq" },
        { name: t("columns.resources.links.regulation"), href: "/reglementation" },
        { name: t("columns.resources.links.methodology"), href: "/methodologie" },
        { name: t("columns.resources.links.platform"), href: "/plateforme" },
        { name: t("columns.resources.links.security"), href: "/securite" },
        { name: t("columns.resources.links.process"), href: "/processus-itad" },
      ],
    },
    {
      title: t("columns.legal.title"),
      links: [
        { name: t("columns.legal.links.mentions"), href: "/mentions-legales" },
        { name: t("columns.legal.links.privacy"), href: "/confidentialite" },
        { name: t("columns.legal.links.terms"), href: "/cgu" },
        { name: t("columns.legal.links.cookies"), href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-track bg-bg text-fg-muted">
      <div className="container-max px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Haut : marque + contact + newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-track pb-12 mb-12 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Logo size="lg" />
            </Link>
            <p className="mt-6 max-w-[65ch] text-body-sm text-fg-muted">{t("tagline")}</p>
          </div>

          <div>
            <h2 className="text-eyebrow uppercase text-fg font-sans tracking-[0.12em]">{t("contact.title")}</h2>
            <ul className="mt-6 space-y-3 text-body-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                <span className="whitespace-pre-line">{t("contact.address")}</span>
              </li>
              {mail && (
                <li>
                  <a href={mail} className="inline-flex items-center gap-3 hover:text-fg">
                    <Mail className="h-4 w-4 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                    {EMAILS.support}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-fg">
                    <MessageCircle className="h-4 w-4 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                    WhatsApp
                    <span className="sr-only">{isEn ? "(opens WhatsApp)" : "(ouvre WhatsApp)"}</span>
                  </a>
                </li>
              )}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-emerald px-5 text-body-sm font-semibold text-bg transition-colors hover:bg-white/[0.04]"
            >
              {t("cta")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="text-eyebrow uppercase text-fg font-sans tracking-[0.12em]">{t("newsletter.title")}</h2>
            <p className="mt-6 text-body-sm">
              {isEn
                ? "Receive our latest ITAD news, guides and regulatory updates."
                : "Recevez nos dernières actualités ITAD, guides et réglementations."}
            </p>
            {success ? (
              <p className="mt-4 text-body-sm font-semibold text-emerald" role="status">
                {isEn ? "Subscribed, thanks!" : "Inscription validée, merci !"}
              </p>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(false);
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, locale }),
                    });
                    if (res.ok) {
                      setSuccess(true);
                      setEmail("");
                    } else {
                      setError(true);
                    }
                  } catch {
                    setError(true);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="mt-4 flex gap-2"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {t("newsletter.placeholder")}
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  placeholder={t("newsletter.placeholder")}
                  aria-invalid={error || undefined}
                  className="h-11 min-w-0 flex-1 rounded-lg border border-track bg-bg px-3 text-body-sm text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald text-bg transition-colors hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={t("newsletter.cta")}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
            {error && (
              <p className="mt-2 text-caption text-amber" role="alert">
                {isEn
                  ? "Invalid address, please check your email."
                  : "Adresse invalide, vérifiez votre email."}
              </p>
            )}
          </div>
        </div>

        {/* Colonnes de liens */}
        <nav aria-label={isEn ? "Footer" : "Pied de page"} className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-eyebrow uppercase text-fg font-sans tracking-[0.12em]">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-body-sm text-fg-muted transition-colors hover:text-fg">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Ligne du bas : certifications + mentions */}
        <div className="mt-12 space-y-6 border-t border-track pt-8">
          <CertificationStrip variant="dark" />
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-caption">{t("copyright")}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/mentions-legales" className="text-caption hover:text-fg">{t("bottomLinks.legal")}</Link>
              <Link href="/confidentialite" className="text-caption hover:text-fg">{t("bottomLinks.privacy")}</Link>
              <Link href="/cookies" className="text-caption hover:text-fg">{t("bottomLinks.cookies")}</Link>
              <span className="h-4 w-px bg-track" aria-hidden="true" />
              <a href="https://linkedin.com/company/greentechcycle" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center hover:text-fg" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://twitter.com/greentechcycle" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center hover:text-fg" aria-label="Twitter">
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
