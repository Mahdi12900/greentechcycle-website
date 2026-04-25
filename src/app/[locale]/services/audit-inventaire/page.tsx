"use client";

import { ClipboardList } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function AuditInventairePage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("01 -- Cartographie", "01 -- Mapping"),
    title: tx("Audit & Inventaire IT", "IT Audit & Inventory"),
    subtitle: tx(
      "Cartographie exhaustive de votre parc IT, OT et mobile. Scoring 3 axes (donnees, etat, valeur) et estimation de la valeur residuelle chiffree.",
      "Exhaustive mapping of your IT, OT and mobile fleet. 3-axis scoring (data, condition, value) and quantified residual value estimation."
    ),
    description: tx(
      "Nous auditons l'integralite de votre parc informatique -- serveurs, postes, equipements mobiles, IoT, licences -- pour produire un inventaire exhaustif verifie. Chaque asset est identifie, qualifie, photographie et score selon trois axes : criticite des donnees, etat physique et valeur marchande. Cette cartographie devient le referentiel unique de vos decisions ITAD. Elle alimente la plateforme en temps reel via nos connecteurs (CMDB, MDM, Active Directory, Intune, Jamf) pour eviter toute double saisie.",
      "We audit your entire IT fleet -- servers, workstations, mobile devices, IoT, licenses -- to produce an exhaustive, verified inventory. Each asset is identified, qualified, photographed and scored on three axes: data criticality, physical condition and market value. This mapping becomes the single source of truth for your ITAD decisions."
    ),
    icon: ClipboardList,
    badge: tx("Livrable sous 5 jours", "Delivered in 5 days"),
    image: "/photos/service-audit.jpg",
    imageAlt: tx("Technicien realisant l'audit d'un parc IT", "Technician performing IT fleet audit"),
    benefits: [
      tx("Inventaire exhaustif du parc IT, OT et mobile", "Full inventory across IT, OT and mobile"),
      tx("Scoring 3-axes : donnee -- etat -- valeur", "3-axis scoring: data -- condition -- value"),
      tx("Integration CMDB, MDM, AD, Intune, Jamf", "CMDB, MDM, AD, Intune, Jamf integrations"),
      tx("Estimation de la valeur residuelle chiffree", "Quantified residual value estimation"),
      tx("Photos, numeros de serie, hash de verification", "Photos, serials, verification hash"),
      tx("Rapport executif PDF pour COMEX / DSI", "Exec-ready PDF report for CIO / COMEX"),
    ],
    methodology: {
      title: tx("Methodologie d'audit", "Audit methodology"),
      steps: [
        { title: tx("Cadrage perimetre", "Scope definition"), desc: tx("Definition du perimetre (sites, categories d'assets, priorites), calendrier et acces necessaires.", "Define scope (sites, asset categories, priorities), timeline and required access.") },
        { title: tx("Scan automatise + verification terrain", "Automated scan + field verification"), desc: tx("Deploiement des agents de discovery + verification physique par nos techniciens sur site.", "Deploy discovery agents + physical verification by our on-site technicians.") },
        { title: tx("Scoring et cotation", "Scoring and valuation"), desc: tx("Attribution des scores criticite/etat/valeur et estimation de la valeur residuelle par le moteur Asset Intelligence.", "Assign criticality/condition/value scores and estimate residual value via Asset Intelligence engine.") },
        { title: tx("Rapport executif et plan d'action", "Executive report and action plan"), desc: tx("Livraison du rapport PDF signe, recommandations de traitement par lot, estimation ROI.", "Deliver signed PDF report, batch treatment recommendations, ROI estimation.") },
      ],
    },
    deliverables: [
      tx("Rapport inventaire PDF signe", "Signed PDF inventory report"),
      tx("Export CSV/Excel du parc complet", "Full fleet CSV/Excel export"),
      tx("Scoring par asset (3 axes)", "Per-asset scoring (3 axes)"),
      tx("Estimation valeur residuelle globale", "Global residual value estimation"),
      tx("Plan de decommissionnement recommande", "Recommended decommissioning plan"),
    ],
    sla: [
      { metric: tx("Delai de livraison inventaire", "Inventory delivery time"), value: "5 jours" },
      { metric: tx("Precision inventaire garantie", "Guaranteed inventory accuracy"), value: "99,2 %" },
      { metric: tx("Connecteurs deployes", "Connectors deployed"), value: "J+1" },
    ],
    certifications: ["R2v3", "ISO 27001", "NIST 800-88", "ITIL v4"],
    faq: [
      { q: tx("Quel est le perimetre couvert ?", "What is the scope covered?"), a: tx("IT classique (postes, serveurs, peripheriques), OT (automates, SCADA, HMI), mobile (smartphones, tablettes), licences logicielles. Nous couvrons tout ce qui a un numero de serie ou un identifiant reseau.", "Classic IT (workstations, servers, peripherals), OT (PLCs, SCADA, HMIs), mobile (smartphones, tablets), software licenses. We cover everything with a serial number or network identifier.") },
      { q: tx("L'audit necessite-t-il un arret de production ?", "Does the audit require production downtime?"), a: tx("Non. Les scans sont non intrusifs et les verifications physiques s'effectuent pendant les heures ouvrables sans interruption d'activite.", "No. Scans are non-intrusive and physical verifications are performed during business hours without activity interruption.") },
      { q: tx("Combien d'assets peuvent etre audites simultanement ?", "How many assets can be audited simultaneously?"), a: tx("Notre SLA couvre jusqu'a 500 assets en 48h. Au-dela, nous adaptons le calendrier avec des equipes supplementaires.", "Our SLA covers up to 500 assets in 48h. Beyond that, we adapt the timeline with additional teams.") },
    ],
    ctaPrimary: { label: tx("Demander un audit", "Request an audit"), href: "/contact?ref=service-audit" },
    ctaSecondary: { label: tx("Voir la plateforme", "See the platform"), href: "/plateforme" },
  };

  return <ServicePageTemplate data={data} />;
}
