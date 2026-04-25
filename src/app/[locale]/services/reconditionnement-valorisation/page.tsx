"use client";

import { RefreshCcw } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function ReconditionnementPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "reconditionnement-valorisation",
    eyebrow: tx("03 — Valorisation", "03 — Value recovery"),
    title: tx("Reconditionnement et valorisation", "Refurbishment and value recovery"),
    subtitle: tx(
      "Un poste de quatre ans n'est pas un déchet : c'est un budget mal lu. Notre atelier remet en état, classe, vend ou cède chaque actif éligible — et reverse une part contractuelle de la valeur récupérée.",
      "A four-year-old laptop is not waste: it is a misread budget. Our workshop refurbishes, grades, sells or donates every eligible asset — and returns a contractual share of the recovered value."
    ),
    description: tx(
      "Chaque actif éligible passe sur notre ligne de reconditionnement. Diagnostic matériel, remise en état cosmétique, remplacement des composants défaillants, mise à jour du micrologiciel, batterie de tests fonctionnels, attribution d'un grade qualité A, B ou C. Les équipements sont ensuite valorisés sur trois canaux selon votre politique : revente entre professionnels, boutique interne pour vos collaborateurs, ou cession solidaire à des associations agréées avec déduction fiscale. La part de valeur résiduelle reversée est fixée contractuellement avant la première mission — pas de mauvaise surprise au bilan.",
      "Every eligible asset goes through our refurbishment line. Hardware diagnostic, cosmetic restoration, replacement of failing components, firmware update, functional test battery, A/B/C quality grade. Equipment is then placed on three channels according to your policy: business resale, internal store for your employees, or charitable transfer to approved associations with tax deduction. The share of residual value returned is contractually fixed before the first mission — no surprise at year end."
    ),
    narrative: tx(
      "La valorisation ne se résume pas à un prix de revente. Elle exige une chaîne industrielle : diagnostic, pièces de rechange en stock, formation des techniciens, contrôle qualité, garantie. Voici comment nous obtenons un taux de réemploi moyen de 72 %.",
      "Value recovery isn't just a resale price. It requires an industrial chain: diagnostic, spare parts in stock, technician training, quality control, warranty. Here is how we sustain a 72% average reuse rate."
    ),
    deliveryNarrative: tx(
      "Le rapport trimestriel n'est pas un PowerPoint marketing : il détaille chaque actif, chaque grade, chaque prix de cession, chaque tonne de CO₂ évitée. Vos directions financière et RSE l'utilisent directement, sans retraitement.",
      "The quarterly report isn't a marketing slideshow: it details every asset, every grade, every transfer price, every tonne of avoided CO₂. Your finance and sustainability teams use it directly, with no reprocessing."
    ),
    icon: RefreshCcw,
    badge: tx("+40 % de valeur récupérée", "+40% recovered value"),
    image: "/photos/service-reconditionnement.jpg",
    imageAlt: tx(
      "Ingénieurs GreenTechCycle inspectant des ordinateurs avant reconditionnement",
      "GreenTechCycle engineers inspecting laptops before refurbishment"
    ),
    imageSecondary:
      "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?auto=format&fit=crop&w=1600&q=80",
    imageSecondaryAlt: tx(
      "Atelier de reconditionnement d'ordinateurs portables",
      "Laptop refurbishment workshop"
    ),
    benefits: [
      tx("Notation qualité standardisée A, B ou C", "Standardised A, B or C quality grading"),
      tx("Revente entre professionnels, boutique interne, dons", "Business resale, internal store, donations"),
      tx("Part de valeur résiduelle reversée au client", "Residual value share returned to the client"),
      tx("Garantie 12 mois sur les équipements reconditionnés", "12-month warranty on refurbished equipment"),
      tx("Rapport trimestriel des flux et des prix obtenus", "Quarterly flow and price report"),
      tx("Mesure du CO₂ évité par réemploi", "Avoided CO₂ measurement through reuse"),
    ],
    proof: [
      { value: "+40", unit: "%", label: tx("valeur récupérée moyenne", "average recovered value"), color: "#10B981" },
      { value: "72", unit: "%", label: tx("taux de réemploi mesuré", "measured reuse rate"), color: "#0EA5E9" },
      { value: "12", unit: tx("mois", "mo"), label: tx("garantie sur le matériel", "equipment warranty"), color: "#F59E0B" },
    ],
    methodology: {
      title: tx("De la palette qui arrive au chèque qui repart", "From incoming pallet to outgoing payment"),
      intro: "",
      steps: [
        {
          title: tx("Diagnostic complet", "Full diagnostic"),
          desc: tx(
            "Tests matériel à 360 degrés sur banc dédié, évaluation cosmétique notée par un opérateur formé, identification des composants à remplacer. Aucun équipement ne passe à l'étape suivante sans diagnostic signé.",
            "360-degree hardware tests on a dedicated bench, cosmetic evaluation graded by a trained operator, identification of components to replace. No equipment moves on without a signed diagnostic."
          ),
        },
        {
          title: tx("Remise en état", "Restoration"),
          desc: tx(
            "Remplacement des composants défaillants avec pièces d'origine constructeur, nettoyage professionnel, mise à jour du BIOS et du micrologiciel. Les batteries usagées partent en filière REP dédiée.",
            "Replacement of failing components with original manufacturer parts, professional cleaning, BIOS and firmware update. Used batteries are routed to a dedicated EPR channel."
          ),
        },
        {
          title: tx("Tests et notation", "Testing and grading"),
          desc: tx(
            "Suite de tests fonctionnels automatisés, attribution du grade A, B ou C selon une grille publique, préinstallation d'un système d'exploitation à votre demande. Le grade est gravé numériquement sur l'actif.",
            "Automated functional test suite, A, B or C grade assigned by a public scoring grid, operating system pre-install on request. The grade is digitally engraved on the asset."
          ),
        },
        {
          title: tx("Mise sur le marché", "Market placement"),
          desc: tx(
            "Cotation sur le marché reconditionné EMEA en temps réel, mise en vente sur nos canaux entre professionnels, transfert vers la boutique interne ou cession solidaire. Vous recevez un avoir ou une facture sous 30 jours.",
            "EMEA refurbished market real-time pricing, listing on our business channels, transfer to the internal store or charitable transfer. You receive a credit note or invoice within 30 days."
          ),
        },
      ],
    },
    deliverables: [
      tx("Rapport de notation par actif", "Per-asset grading report"),
      tx("Fiche produit reconditionné (caractéristiques, grade, photos)", "Refurbished product sheet (specs, grade, photos)"),
      tx("Avoir ou facture de valeur résiduelle", "Residual value credit note or invoice"),
      tx("Rapport d'impact CO₂ évité", "Avoided CO₂ impact report"),
      tx("Certificat de cession solidaire le cas échéant", "Charitable transfer certificate if applicable"),
    ],
    sla: [
      { metric: tx("Délai de reconditionnement", "Refurbishment turnaround"), value: tx("10 jours", "10 days") },
      { metric: tx("Taux de réemploi moyen", "Average reuse rate"), value: "72 %" },
      { metric: tx("Garantie équipements", "Equipment warranty"), value: tx("12 mois", "12 mo") },
    ],
    certifications: ["R2v3", "ISO 14001", "Boavizta member"],
    quote: {
      text: tx(
        "638 000 € reversés sur 4 200 postes en deux ans. Notre direction financière a découvert que la fin de vie IT pouvait devenir une ligne de produits.",
        "€638,000 returned on 4,200 laptops in two years. Our finance team discovered that IT end of life could become a revenue line."
      ),
      name: "Catherine M.",
      role: tx("DAF, distribution spécialisée", "CFO, specialty retail"),
    },
    faq: [
      {
        q: tx("Quel pourcentage de valeur puis-je espérer récupérer ?", "What share of value can I realistically recover?"),
        a: tx(
          "En moyenne, nos clients récupèrent 40 % de la valeur d'achat sur les équipements de moins de quatre ans. Le taux varie selon l'état, l'âge et la demande du marché. La part reversée est fixée contractuellement avant la mission.",
          "On average, our clients recover 40% of purchase value on equipment under four years old. The rate varies by condition, age and market demand. The returned share is contractually fixed before the mission."
        ),
      },
      {
        q: tx("Les dons ouvrent-ils droit à une déduction fiscale ?", "Are donations eligible for a tax deduction?"),
        a: tx(
          "Oui. Les dons à des associations reconnues d'utilité publique donnent droit à une réduction d'impôt de 60 % du montant, dans la limite de 0,5 % du chiffre d'affaires. Nous fournissons les certificats fiscaux.",
          "Yes. Donations to recognised public-benefit organisations entitle you to a 60% tax reduction on the amount, capped at 0.5% of revenue. We provide the tax certificates."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver une cession", "Book a transfer"),
    ctaSecondaryLabel: tx("Voir les cas d'usages", "See use cases"),
    ctaSecondaryHref: "/cas-usages",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
