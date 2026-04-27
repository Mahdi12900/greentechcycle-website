"use client";

import { ClipboardList } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function AuditInventairePage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "audit-inventaire",
    eyebrow: tx("01 (Cartographie", "01) Mapping"),
    title: tx("Audit & inventaire IT", "IT audit & inventory"),
    subtitle: tx(
      "Avant d'effacer, valoriser ou recycler, il faut savoir ce que l'on possède réellement. Notre audit pose le socle de toute décision : un inventaire physique, certifié et opposable, livré en cinq jours ouvrés.",
      "Before erasing, recovering or recycling, you have to know what you actually own. Our audit lays the foundation for every decision: a physical, certified and admissible inventory, delivered in five working days."
    ),
    description: tx(
      "La plupart des parcs informatiques d'ETI dérivent d'années d'acquisitions, de migrations et de projets gelés. Personne, en interne, ne sait précisément ce qui se trouve dans la baie 7 du datacenter B ni dans le placard du site de Lille. Nos techniciens passent sur site, scannent, photographient et qualifient chaque équipement, du serveur en production au smartphone oublié au fond d'un tiroir. Trois axes d'évaluation guident le travail : criticité des données, état physique et valeur résiduelle marchande.",
      "Most enterprise IT estates result from years of acquisitions, migrations and frozen projects. Internally, no one knows precisely what sits in rack 7 of datacentre B or in the cupboard of the Lille office. Our technicians come on site, scan, photograph and qualify every device, from the production server to the smartphone forgotten in a drawer. Three axes drive the assessment: data criticality, physical condition and residual market value."
    ),
    narrative: tx(
      "Notre méthodologie est passée au crible par les commissaires aux comptes des plus grands groupes français. Chaque étape est documentée, chaque décision tracée. L'audit n'est pas une formalité : c'est l'acte qui fonde la responsabilité juridique du donneur d'ordre.",
      "Our methodology has been scrutinised by the auditors of France's largest groups. Every step is documented, every decision logged. The audit is not a formality: it is the act on which the legal responsibility of the customer rests."
    ),
    deliveryNarrative: tx(
      "Vous repartez avec un dossier exécutif chiffré, exploitable par votre direction, vos commissaires aux comptes et vos auditeurs externes. Pas de tableur improvisé, pas de capture d'écran : un référentiel signé, daté et exportable.",
      "You leave with a quantified executive file, ready to be used by your leadership, your auditors and your external assessors. No improvised spreadsheet, no screenshot: a signed, dated, exportable reference document."
    ),
    icon: ClipboardList,
    badge: tx("Livré en 5 jours", "Delivered in 5 days"),
    image: "/photos/service-audit.jpg",
    imageAlt: tx(
      "Technicien GreenTechCycle qualifiant un serveur lors d'un audit IT",
      "GreenTechCycle technician qualifying a server during an IT audit"
    ),
    imageSecondary:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    imageSecondaryAlt: tx(
      "Inventaire physique d'un parc informatique en cours",
      "Physical inventory of an IT estate in progress"
    ),
    benefits: [
      tx("Inventaire exhaustif IT, OT et mobile", "Exhaustive IT, OT and mobile inventory"),
      tx("Notation trois axes : donnée, état, valeur", "Three-axis rating: data, condition, value"),
      tx("Connecteurs CMDB, MDM, AD, Intune, Jamf", "CMDB, MDM, AD, Intune, Jamf connectors"),
      tx("Estimation chiffrée de la valeur résiduelle", "Quantified residual value estimate"),
      tx("Photos, numéros de série, empreintes de vérification", "Photos, serial numbers, verification hashes"),
      tx("Rapport exécutif PDF prêt pour le COMEX", "Executive PDF report ready for the leadership"),
    ],
    proof: [
      { value: "5", unit: "jours", label: tx("livrable garanti", "guaranteed delivery"), color: "#10B981" },
      { value: "99,2", unit: "%", label: tx("précision moyenne mesurée", "measured average accuracy"), color: "#0EA5E9" },
      { value: "12", unit: "k+", label: tx("actifs cartographiés en 2025", "assets mapped in 2025"), color: "#F59E0B" },
    ],
    methodology: {
      title: tx("Quatre étapes, un seul référentiel", "Four steps, a single source of truth"),
      intro: "",
      steps: [
        {
          title: tx("Cadrage du périmètre", "Scope definition"),
          desc: tx(
            "Nous démarrons par un atelier de deux heures avec votre DSI : sites concernés, catégories d'actifs, priorités, calendrier, accès logiques et physiques. Vous recevez sous 48 heures le plan d'audit signé.",
            "We start with a two-hour workshop with your CIO: sites in scope, asset categories, priorities, schedule, logical and physical accesses. You receive the signed audit plan within 48 hours."
          ),
        },
        {
          title: tx("Découverte automatisée et vérification terrain", "Automated discovery and field verification"),
          desc: tx(
            "Nos sondes lisent vos consoles d'administration, vos AD et MDM. En parallèle, nos techniciens passent dans chaque local pour vérifier physiquement chaque actif : numéro de série, état visuel, photo horodatée. Aucun doublon, aucun oubli.",
            "Our probes read your administration consoles, your AD and MDM. In parallel, our technicians visit each premises to physically verify every asset: serial number, visual condition, timestamped photo. No duplicate, no omission."
          ),
        },
        {
          title: tx("Notation et cotation", "Scoring and valuation"),
          desc: tx(
            "Le moteur Asset Intelligence applique vos règles métier (RGPD, HDS, IGI 1300) pour scorer la criticité des données. L'état physique est noté visuellement, la valeur marchande issue de notre base prix temps réel sur 14 marchés EMEA.",
            "The Asset Intelligence engine applies your business rules (GDPR, healthcare, classified data) to score data criticality. Physical condition is rated visually, market value pulled from our real-time price database across 14 EMEA markets."
          ),
        },
        {
          title: tx("Rapport exécutif et plan d'action", "Executive report and action plan"),
          desc: tx(
            "Vous recevez un PDF signé eIDAS, un export tableur complet, un plan de décommissionnement par lots et une estimation de retour sur investissement. Tout est exploitable immédiatement, sans ressaisie.",
            "You receive an eIDAS-signed PDF, a full spreadsheet export, a batched decommissioning plan and a return-on-investment estimate. Everything is immediately usable, with no re-entry."
          ),
        },
      ],
    },
    deliverables: [
      tx("Rapport d'inventaire PDF signé eIDAS", "eIDAS-signed PDF inventory report"),
      tx("Export tableur du parc complet", "Full estate spreadsheet export"),
      tx("Notation par actif sur trois axes", "Per-asset three-axis rating"),
      tx("Estimation globale de la valeur résiduelle", "Global residual value estimate"),
      tx("Plan de décommissionnement recommandé", "Recommended decommissioning plan"),
    ],
    sla: [
      { metric: tx("Délai de livraison du rapport", "Report delivery time"), value: tx("5 jours", "5 days") },
      { metric: tx("Précision d'inventaire garantie", "Guaranteed inventory accuracy"), value: "99,2 %" },
      { metric: tx("Connecteurs déployés", "Connectors deployed"), value: tx("J+1", "Day 1") },
    ],
    certifications: ["R2v3", "ISO 27001", "NIST 800-88", "ITIL v4"],
    quote: {
      text: tx(
        "L'audit GreenTechCycle nous a remis 14 % d'actifs hors comptabilité, soit 412 000 € de valeur que nous croyions perdue. Le rapport est passé en COMEX sans une seule retouche.",
        "The GreenTechCycle audit recovered 14% of off-book assets, €412,000 of value we thought lost. The report went to the executive committee without a single edit."
      ),
      name: "Sophie L.",
      role: tx("DSI, groupe industriel coté", "CIO, listed industrial group"),
    },
    faq: [
      {
        q: tx("Quel périmètre est couvert par l'audit ?", "What is covered by the audit?"),
        a: tx(
          "IT classique (postes, serveurs, périphériques), informatique industrielle (automates, supervision, terminaux), mobile (smartphones, tablettes) et licences logicielles. En clair : tout ce qui possède un numéro de série ou un identifiant réseau.",
          "Standard IT (workstations, servers, peripherals), industrial computing (controllers, supervision, terminals), mobile (smartphones, tablets) and software licences. In short: anything with a serial number or a network identifier."
        ),
      },
      {
        q: tx("L'audit nécessite-t-il un arrêt de production ?", "Does the audit require a production stop?"),
        a: tx(
          "Non. Les sondes sont passives, les vérifications physiques se font en heures ouvrables, sans interruption. Pour les environnements critiques, nous intervenons sur fenêtres de maintenance déjà planifiées.",
          "No. Probes are passive, physical checks happen during business hours without interruption. For critical environments, we operate within already scheduled maintenance windows."
        ),
      },
      {
        q: tx("Combien d'actifs peuvent être audités simultanément ?", "How many assets can be audited at once?"),
        a: tx(
          "Notre engagement contractuel couvre jusqu'à 500 actifs en 48 heures. Au-delà, nous redimensionnons l'équipe et adaptons le calendrier sans surcoût caché.",
          "Our contractual commitment covers up to 500 assets in 48 hours. Beyond that, we resize the team and adapt the schedule with no hidden surcharge."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver un audit", "Book an audit"),
    ctaSecondaryLabel: tx("Voir la plateforme", "See the platform"),
    ctaSecondaryHref: "/plateforme",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
