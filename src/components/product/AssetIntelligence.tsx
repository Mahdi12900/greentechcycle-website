"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Check } from "lucide-react";
import FilterTabs from "@/components/ui/FilterTabs";
import { TextLink } from "@/components/ui/Button";
import OtCityMap from "@/components/product/OtCityMap";
import IntegrationHub from "@/components/product/IntegrationHub";
import LegacyHealthPanel from "@/components/product/LegacyHealthPanel";

/**
 * Asset management IT & OT, intégrations, maintenance & legacy (refonte v4, demande
 * utilisateur du 2026-10-06). Aucun chiffre réel : les visuels sont des exemples étiquetés.
 * - `tabs` : accueil, trois onglets texte + visuel ;
 * - `full` : /plateforme, trois blocs alternés avec ancres #it-ot, #integrations, #maintenance.
 */

type CapId = "it-ot" | "integrations" | "maintenance";

function useCapabilities() {
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  return [
    {
      id: "it-ot" as CapId,
      tab: tx("Parc IT & OT", "IT & OT fleet"),
      eyebrow: tx("Asset management IT & OT", "IT & OT asset management"),
      title: tx("Tout le parc, pas seulement les PC.", "The whole fleet, not just the PCs."),
      body: tx(
        "Postes, serveurs et réseau, mais aussi le parc OT et IoT : caméras de vidéoprotection, contrôleurs de feux tricolores, antennes et équipements télécom, capteurs. Pour une ville comme Paris, c'est la capacité d'anticiper le renouvellement de milliers d'équipements de terrain, dans une seule vue de synthèse.",
        "Workstations, servers and network, but also the OT and IoT estate: CCTV cameras, traffic-light controllers, antennas and telecom equipment, sensors. For a city like Paris, it means anticipating the renewal of thousands of field devices from one simple summary view."
      ),
      bullets: [
        tx("Un référentiel unique IT + OT, par site et par famille", "One IT + OT register, by site and device family"),
        tx("Fins de support et renouvellements anticipés", "End-of-support and renewals anticipated"),
        tx("Une synthèse lisible par la DSI comme par la direction technique", "A summary readable by IT and operations alike"),
      ],
      visual: <OtCityMap />,
    },
    {
      id: "integrations" as CapId,
      tab: tx("Intégrations", "Integrations"),
      eyebrow: tx("SAP · Oracle · ServiceNow", "SAP · Oracle · ServiceNow"),
      title: tx("Branché sur vos outils. Sans rien remplacer.", "Plugged into your tools. Replacing nothing."),
      body: tx(
        "GreenTechCycle se connecte à vos ERP, ITSM et CMDB — SAP, Oracle, ServiceNow et les autres — et ajoute ce qu'ils ne font pas : la preuve d'effacement, le cycle de vie, le carbone et la décision de fin de vie.",
        "GreenTechCycle connects to your ERP, ITSM and CMDB — SAP, Oracle, ServiceNow and others — and adds what they don't do: erasure proof, lifecycle, carbon and the end-of-life decision."
      ),
      bullets: [
        tx("Lecture des données d'actifs déjà présentes dans vos outils", "Reads the asset data already in your tools"),
        tx("Couche de valeur : preuve, cycle de vie, carbone, fin de vie", "Value layer: proof, lifecycle, carbon, end of life"),
        tx("Vos équipes gardent leurs outils et leurs processus", "Your teams keep their tools and processes"),
      ],
      visual: <IntegrationHub />,
    },
    {
      id: "maintenance" as CapId,
      tab: tx("Maintenance & legacy", "Maintenance & legacy"),
      eyebrow: tx("Coût de maintenance", "Maintenance cost"),
      title: tx("Moins de curatif, plus de renouvellement planifié.", "Less break-fix, more planned renewal."),
      body: tx(
        "Âge, statut de support constructeur, risque de panne et planning de renouvellement pour chaque famille d'équipements. Repérer les produits legacy avant qu'ils ne coûtent : on réduit la maintenance en remplaçant au bon moment, pas dans l'urgence.",
        "Age, vendor support status, failure risk and renewal plan for every device family. Spot legacy products before they get expensive: maintenance costs fall when you replace at the right time, not in a rush."
      ),
      bullets: [
        tx("Indicateurs legacy : âge, fin de support, risque de panne", "Legacy indicators: age, end of support, failure risk"),
        tx("Planification du renouvellement par trimestre", "Renewal planning by quarter"),
        tx("Arbitrage réemploi ou remplacement documenté", "Documented reuse-or-replace decisions"),
      ],
      visual: <LegacyHealthPanel />,
    },
  ];
}

function CapText({ cap, headingLevel }: { cap: ReturnType<typeof useCapabilities>[number]; headingLevel: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div>
      <p className="text-eyebrow uppercase text-emerald">{cap.eyebrow}</p>
      <H className="mt-3 max-w-[22ch] font-display text-display-sm text-fg">{cap.title}</H>
      <p className="mt-4 max-w-[60ch] text-body text-fg-strong">{cap.body}</p>
      <ul className="mt-6 space-y-3">
        {cap.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-body-sm text-fg-strong">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AssetIntelligence({ variant = "tabs" }: { variant?: "tabs" | "full" }) {
  const isEn = useLocale() === "en";
  const caps = useCapabilities();
  const [active, setActive] = useState<CapId>("it-ot");
  const current = caps.find((c) => c.id === active) ?? caps[0];

  if (variant === "full") {
    return (
      <div className="space-y-16 lg:space-y-24">
        {caps.map((cap, i) => (
          <div key={cap.id} id={cap.id} className="scroll-mt-24 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <CapText cap={cap} headingLevel="h3" />
            </div>
            <div className={`min-w-0 lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>{cap.visual}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <FilterTabs
        items={caps.map((c) => ({ id: `cap-${c.id}`, label: c.tab }))}
        active={`cap-${active}`}
        onChange={(id) => setActive(id.replace("cap-", "") as CapId)}
        label={isEn ? "Platform capabilities" : "Capacités de la plateforme"}
      />
      <div
        id={`panel-cap-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-cap-${current.id}`}
        className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      >
        <div className="lg:col-span-5">
          <CapText cap={current} headingLevel="h3" />
          <TextLink href={`/plateforme#${current.id}`} className="mt-6">
            {isEn ? "See it in the platform" : "Voir dans la plateforme"}
          </TextLink>
        </div>
        <div className="min-w-0 lg:col-span-7">{current.visual}</div>
      </div>
    </div>
  );
}
