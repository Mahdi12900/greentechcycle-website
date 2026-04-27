"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Mail, Phone, MapPin, Linkedin, Twitter, ArrowUpRight,
  ShieldCheck, Award, Leaf, Recycle, Send,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isEn = locale === "en";
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
    <footer className="relative overflow-hidden bg-[#0B1220] text-gray-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="pointer-events-none absolute -top-40 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="container-max mx-auto section-padding relative">
        {/* Top: Logo + Contact + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-14 mb-14 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image src="/logo/logo-mono-white.svg" alt="GreenTechCycle" width={200} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-gray-400 max-w-md">{t("tagline")}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { icon: ShieldCheck, label: "NIST 800-88" },
                { icon: Award, label: "R2v3" },
                { icon: Leaf, label: "ISO 14001" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300">
                  <b.icon className="w-3.5 h-3.5 text-accent" />{b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{t("contact.title")}</h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 whitespace-pre-line">{t("contact.address")}</span>
              </li>
              <li>
                <a href="tel:+33186652210" className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />{t("contact.phone")}
                </a>
              </li>
              <li>
                <a href="mailto:contact@greentechcycle.fr" className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />{t("contact.email")}
                </a>
              </li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-400 text-white text-sm font-semibold shadow-[0_8px_30px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.8)] transition-all">
              {t("cta")}<ArrowUpRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{t("newsletter.title")}</h4>
            <p className="mt-3 text-sm text-gray-400">
              {isEn
                ? "Receive our latest ITAD news, guides and regulatory updates."
                : "Recevez nos dernières actualités ITAD, guides et réglementations."}
            </p>
            {success ? (
              <p className="mt-5 text-sm font-semibold text-[#10B981]">
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
                className="mt-5 flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-accent rounded-lg text-white hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label={t("newsletter.cta")}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            {error && (
              <p className="mt-2 text-xs text-red-400">
                {isEn
                  ? "Invalid address, please check your email."
                  : "Adresse invalide, vérifiez votre email."}
              </p>
            )}
          </div>
        </div>

        {/* 5-column links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group inline-flex items-start gap-1 text-sm text-gray-400 hover:text-accent transition-colors">
                      <span className="relative">
                        {link.name}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-gray-500">{t("copyright")}</p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="text-xs text-gray-500 hover:text-accent transition-colors">{t("bottomLinks.legal")}</Link>
            <Link href="/confidentialite" className="text-xs text-gray-500 hover:text-accent transition-colors">{t("bottomLinks.privacy")}</Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-accent transition-colors">{t("bottomLinks.cookies")}</Link>
            <div className="h-4 w-px bg-white/10" />
            <a href="https://linkedin.com/company/greentechcycle" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/greentechcycle" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
