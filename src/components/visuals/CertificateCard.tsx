"use client";

import { useLocale } from "next-intl";
import { Check } from "lucide-react";

/**
 * CertificateCard — « Certificat d'effacement » dessiné en code (DESIGN.md v2
 * §7.2) : n° de série, méthode NIST 800-88, horodatage, empreinte (hash
 * tronqué en mono), sceau émeraude qui « s'imprime » (.reveal-scale).
 * Données illustratives (exemple de format), pas un vrai certificat.
 */
export default function CertificateCard({
  serial = "GTC-ER-2026-04812",
  method = "NIST SP 800-88 r2 · Purge",
  className = "",
}: {
  serial?: string;
  method?: string;
  className?: string;
}) {
  const isEn = useLocale() === "en";
  const rows = [
    { k: isEn ? "Serial no." : "N° de série", v: serial },
    { k: isEn ? "Method" : "Méthode", v: method },
    { k: isEn ? "Timestamp" : "Horodatage", v: "2026-03-14 09:42:17 UTC" },
    { k: isEn ? "Fingerprint" : "Empreinte", v: "sha256 9f2c…e41a" },
  ];
  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-bg-card p-6 ${className}`}>
      <div className="fx-dots fx-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <p className="sr-only">
        {isEn
          ? "Example of an erasure certificate: serial number, NIST 800-88 method, timestamp, fingerprint and eIDAS seal."
          : "Exemple de certificat d'effacement : numéro de série, méthode NIST 800-88, horodatage, empreinte et sceau eIDAS."}
      </p>
      <div aria-hidden="true" className="relative w-full max-w-[360px] rounded-2xl border border-track bg-bg p-5 shadow-float">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{isEn ? "Certificate" : "Certificat"}</p>
            <p className="mt-1 text-heading-md text-fg">{isEn ? "Data erasure" : "Effacement de données"}</p>
          </div>
          <span className="reveal-scale flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald text-emerald shadow-glow-dot">
            <Check className="h-6 w-6" strokeWidth={2} />
          </span>
        </div>
        <dl className="mt-4 divide-y divide-track border-y border-track">
          {rows.map((r) => (
            <div key={r.k} className="flex items-center justify-between gap-4 py-2">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{r.k}</dt>
              <dd className="truncate font-mono text-[12px] text-fg">{r.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {isEn ? "Verified · eIDAS seal" : "Vérifié · sceau eIDAS"}
        </p>
      </div>
    </div>
  );
}
