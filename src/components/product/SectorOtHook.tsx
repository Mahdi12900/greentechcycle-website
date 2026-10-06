"use client";

import { useLocale } from "next-intl";
import { Check } from "lucide-react";
import { TextLink } from "@/components/ui/Button";
import OtCityMap from "@/components/product/OtCityMap";
import LegacyHealthPanel from "@/components/product/LegacyHealthPanel";

/**
 * Accroche IT & OT sur les fiches secteur où le parc de terrain pèse le plus
 * (secteur public / collectivités, énergie, transport). Texte de capacité uniquement,
 * aucun client ni chiffre ; visuels = exemples étiquetés.
 */
const COPY = {
  public: {
    fr: {
      title: "Collectivités : les équipements de la ville dans le même référentiel que les postes des agents.",
      body: "Caméras de vidéoprotection, contrôleurs de feux tricolores, antennes, capteurs : anticipez leurs fins de support et leur renouvellement dans une vue de synthèse, à côté du parc bureautique et des serveurs.",
      bullets: ["Couches d'équipements par quartier et par famille", "Fins de support à 24 mois, renouvellements planifiés", "Décisions de réemploi et de recyclage tracées"],
    },
    en: {
      title: "Local authorities: city equipment in the same register as staff workstations.",
      body: "CCTV cameras, traffic-light controllers, antennas, sensors: anticipate their end of support and renewal in one summary view, next to office IT and servers.",
      bullets: ["Equipment layers by district and family", "End of support at 24 months, planned renewals", "Traced reuse and recycling decisions"],
    },
  },
  energie: {
    fr: {
      title: "Énergie : le parc OT de terrain suivi comme le parc IT.",
      body: "Capteurs, automates, équipements télécom de sites distants : âge, statut de support et risque de panne par famille, pour remplacer au bon moment plutôt que dans l'urgence.",
      bullets: ["Indicateurs legacy sur les équipements OT", "Planification du renouvellement par trimestre", "Branché sur SAP, Oracle ou ServiceNow"],
    },
    en: {
      title: "Energy: the field OT estate tracked like the IT estate.",
      body: "Sensors, PLCs, telecom equipment on remote sites: age, support status and failure risk by family, to replace at the right time instead of in a rush.",
      bullets: ["Legacy indicators on OT equipment", "Renewal planning by quarter", "Plugged into SAP, Oracle or ServiceNow"],
    },
  },
  "transport-logistique": {
    fr: {
      title: "Transport : terminaux, caméras et équipements de site dans une seule vue.",
      body: "Terminaux mobiles, caméras, équipements réseau et capteurs des sites : anticipez les fins de support et réduisez la maintenance curative en planifiant les renouvellements.",
      bullets: ["Référentiel unique IT + OT par site", "Indicateurs legacy : âge, fin de support, risque", "Fin de vie tracée : réemploi, recyclage, effacement attesté"],
    },
    en: {
      title: "Transport: terminals, cameras and site equipment in one view.",
      body: "Mobile terminals, cameras, network equipment and site sensors: anticipate end of support and cut break-fix maintenance by planning renewals.",
      bullets: ["One IT + OT register per site", "Legacy indicators: age, end of support, risk", "Traced end of life: reuse, recycling, attested erasure"],
    },
  },
} as const;

export type OtHookSector = keyof typeof COPY;
export const OT_HOOK_SECTORS = Object.keys(COPY) as OtHookSector[];

export default function SectorOtHook({ sector }: { sector: OtHookSector }) {
  const isEn = useLocale() === "en";
  const c = COPY[sector][isEn ? "en" : "fr"];
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="text-eyebrow uppercase text-emerald">{isEn ? "IT & OT asset management" : "Asset management IT & OT"}</p>
        <h2 className="mt-3 max-w-[26ch] font-display text-display-sm text-fg">{c.title}</h2>
        <p className="mt-4 max-w-[60ch] text-body text-fg-strong">{c.body}</p>
        <ul className="mt-6 space-y-3">
          {c.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-body-sm text-fg-strong">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <TextLink href="/plateforme#it-ot" className="mt-6">
          {isEn ? "See IT & OT in the platform" : "Voir l'IT & OT dans la plateforme"}
        </TextLink>
      </div>
      <div className="min-w-0 lg:col-span-7">{sector === "public" ? <OtCityMap /> : <LegacyHealthPanel />}</div>
    </div>
  );
}
