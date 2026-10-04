"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight, Mail, MessageCircle, FileText } from "lucide-react";
import { PREFILL, mailtoHref, whatsappHref, CONTACT_EMAIL } from "@/lib/contact";

/**
 * ContactChannels — voies directes « tech » (phase 3) : WhatsApp click-to-chat
 * (wa.me + message pré-rempli), email (mailto pré-rempli) et formulaire.
 * Les canaux non configurés (variables d'environnement absentes) ne sont pas
 * rendus : jamais de lien mort ni de numéro inventé.
 *
 * - `cards` : grille de cartes (page contact).
 * - `pills` : rangée de boutons compacts (hero contact, widget).
 */
export default function ContactChannels({
  variant = "cards",
  formHref = "#formulaire",
  className = "",
}: {
  variant?: "cards" | "pills";
  /** Lien vers le formulaire ; null pour ne pas afficher ce canal */
  formHref?: string | null;
  className?: string;
}) {
  const isEn = useLocale() === "en";
  const pre = isEn ? PREFILL.en : PREFILL.fr;
  const wa = whatsappHref(pre.whatsapp);
  const mail = mailtoHref(pre.subject);

  const channels = [
    wa && {
      key: "whatsapp",
      href: wa,
      external: true,
      icon: MessageCircle,
      label: "WhatsApp",
      meta: isEn ? "Instant chat · message pre-filled" : "Échange instantané · message pré-rempli",
    },
    mail && {
      key: "email",
      href: mail,
      external: false,
      icon: Mail,
      label: "Email",
      meta: CONTACT_EMAIL,
    },
    formHref && {
      key: "form",
      href: formHref,
      external: false,
      icon: FileText,
      label: isEn ? "Qualified form" : "Formulaire qualifié",
      meta: isEn ? "Reply within 24 business hours" : "Réponse sous 24 h ouvrées",
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    external: boolean;
    icon: typeof Mail;
    label: string;
    meta: string;
  }[];

  if (channels.length === 0) return null;

  if (variant === "pills") {
    return (
      <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={isEn ? "Contact channels" : "Canaux de contact"}>
        {channels.map((c) => (
          <li key={c.key}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-channel={c.key}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-track bg-bg-card px-4 text-body-sm font-medium text-fg transition-colors hover:border-emerald hover:text-emerald"
            >
              <c.icon className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              {c.label}
              {c.external && <span className="sr-only">{isEn ? "(opens WhatsApp)" : "(ouvre WhatsApp)"}</span>}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`reveal-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {channels.map((c) => (
        <li key={c.key} className="reveal">
          <a
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            data-channel={c.key}
            className="group relative flex h-full min-h-[132px] flex-col justify-between overflow-hidden rounded-xl border border-track bg-bg-card p-5 transition-colors hover:border-emerald"
          >
            <span className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-dim text-emerald transition-shadow group-hover:shadow-glow-dot">
                <c.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald"
                aria-hidden="true"
              />
            </span>
            <span className="mt-6 block">
              <span className="block text-heading-md text-fg">{c.label}</span>
              <span className="mt-1 block truncate font-mono text-caption text-fg-muted">{c.meta}</span>
            </span>
            {c.external && <span className="sr-only">{isEn ? "(opens WhatsApp)" : "(ouvre WhatsApp)"}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
