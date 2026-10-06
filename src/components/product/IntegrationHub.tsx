"use client";

import { useLocale } from "next-intl";
import { ArrowRight, ShieldCheck, RefreshCcw, Leaf, GitBranch } from "lucide-react";

/**
 * Hub d'intégration : les systèmes existants (texte, pas de logos) alimentent GreenTechCycle,
 * qui ajoute la couche de valeur (preuve, cycle de vie, carbone, décisions de fin de vie)
 * sans remplacer l'ERP / ITSM / CMDB en place.
 */
export default function IntegrationHub({ className = "" }: { className?: string }) {
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const sources = [
    { name: "SAP", role: tx("ERP · immobilisations, achats", "ERP · fixed assets, purchasing") },
    { name: "Oracle", role: tx("ERP · finance, inventaire", "ERP · finance, inventory") },
    { name: "ServiceNow", role: tx("ITSM / CMDB · actifs, tickets", "ITSM / CMDB · assets, tickets") },
    { name: tx("Autres ITSM, ERP, CMDB", "Other ITSM, ERP, CMDB"), role: tx("ex. Workday, Octopus", "e.g. Workday, Octopus") },
  ];

  const outputs = [
    { icon: ShieldCheck, title: tx("Preuve", "Proof"), body: tx("Empreinte SHA-256, journal d'audit chaîné, certificat horodaté vérifiable par QR", "SHA-256 fingerprint, chained audit log, timestamped certificate verifiable by QR") },
    { icon: RefreshCcw, title: tx("Cycle de vie", "Lifecycle"), body: tx("Âge, statut de support, risque, planification du renouvellement", "Age, support status, risk, renewal planning") },
    { icon: Leaf, title: tx("Carbone & CSRD", "Carbon & CSRD"), body: tx("Empreinte par actif, reporting ESRS E5", "Per-asset footprint, ESRS E5 reporting") },
    { icon: GitBranch, title: tx("Décisions de fin de vie", "End-of-life decisions"), body: tx("Réemploi, reconditionnement, recyclage DEEE, effacement attesté", "Reuse, refurbishment, WEEE recycling, attested erasure") },
  ];

  return (
    <figure className={`rounded-2xl border border-track bg-bg-card p-4 sm:p-6 ${className}`}>
      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_0.9fr_auto_1.2fr] lg:gap-3">
        {/* Systèmes en place */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{tx("Vos systèmes en place", "Your existing systems")}</p>
          <ul className="mt-3 space-y-2">
            {sources.map((s) => (
              <li key={s.name} className="rounded-lg border border-track bg-bg px-3 py-2.5">
                <p className="text-body-sm font-semibold text-fg">{s.name}</p>
                <p className="text-caption text-fg-muted">{s.role}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center text-emerald" aria-hidden="true">
          <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
        </div>

        {/* Couche GTC */}
        <div className="flex flex-col justify-center rounded-xl border border-emerald-line bg-emerald-dim p-4 text-center lg:self-center lg:py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-emerald">GreenTechCycle</p>
          <p className="mt-2 font-display text-heading-lg text-fg">{tx("Couche de valeur ajoutée", "Value-added layer")}</p>
          <p className="mt-2 text-caption text-fg-strong">
            {tx("Se connecte à l'existant, ne le remplace pas. Un référentiel unique IT + OT.", "Connects to what you have, never replaces it. One IT + OT register.")}
          </p>
        </div>

        <div className="flex items-center justify-center text-emerald" aria-hidden="true">
          <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
        </div>

        {/* Ce que GTC ajoute */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{tx("Ce que GTC ajoute", "What GTC adds")}</p>
          <ul className="mt-3 space-y-2">
            {outputs.map((o) => (
              <li key={o.title} className="flex gap-3 rounded-lg border border-track bg-bg px-3 py-2.5">
                <o.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="text-body-sm font-semibold text-fg">{o.title}</p>
                  <p className="text-caption text-fg-muted">{o.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 border-t border-track pt-3 text-caption text-fg-muted">
        {tx(
          "Intégrations citées à titre d'exemple ; le périmètre exact des connecteurs est cadré avec vos équipes.",
          "Integrations listed as examples; the exact connector scope is agreed with your teams."
        )}
      </figcaption>
    </figure>
  );
}
