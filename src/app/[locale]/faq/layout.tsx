import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "FAQ | Questions fréquentes sur l'ITAD et le recyclage IT",
  description:
    "Réponses aux questions fréquentes sur l'ITAD, l'effacement de données, le reconditionnement, la conformité CSRD et la gestion des DEEE en entreprise.",
  keywords: ["FAQ ITAD", "questions recyclage IT", "effacement données FAQ", "DEEE entreprise", "conformité CSRD FAQ"],
  openGraph: {
    title: "FAQ ITAD | GreenTechCycle",
    description: "Réponses aux questions fréquentes sur l'ITAD, l'effacement de données et la conformité.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ ITAD | GreenTechCycle",
    description: "Questions fréquentes sur l'ITAD et le recyclage IT.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'ITAD (IT Asset Disposition) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'ITAD désigne l'ensemble des processus de gestion des actifs IT en fin de vie : effacement sécurisé des données, reconditionnement, recyclage et valorisation des équipements informatiques, dans le respect des normes environnementales et de sécurité.",
      },
    },
    {
      "@type": "Question",
      name: "Comment GreenTechCycle garantit-il l'effacement sécurisé des données ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GreenTechCycle utilise des méthodes d'effacement certifiées conformes à la norme NIST 800-88. Chaque opération génère un certificat d'effacement individuel horodaté et traçable via blockchain, garantissant la conformité RGPD.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles certifications possède GreenTechCycle ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GreenTechCycle est certifié R2v3 (Responsible Recycling), ISO 14001 (management environnemental) et respecte les standards NIST 800-88 pour l'effacement des données. Nos processus sont conformes aux exigences RGPD et CSRD.",
      },
    },
    {
      "@type": "Question",
      name: "Comment GreenTechCycle aide-t-il au reporting CSRD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Notre plateforme génère automatiquement les indicateurs ESG liés à vos actifs IT : bilan carbone, taux de circularité, matières recyclées. Ces données sont directement exploitables pour votre reporting CSRD selon les normes ESRS.",
      },
    },
    {
      "@type": "Question",
      name: "Que deviennent les équipements après traitement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les équipements sont prioritairement reconditionnés pour le réemploi. Ceux qui ne peuvent être reconditionnés sont recyclés dans des filières certifiées pour récupérer les matières premières (métaux, plastiques). La destruction n'intervient qu'en dernier recours pour les supports ne pouvant être effacés.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour décommissionner 1 000 postes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "11 jours ouvrés en moyenne sur la cohorte 2025 (n=14 missions ≥ 800 actifs), inventaire compris. Engagement contractuel : remboursement au prorata si dépassement supérieur à 15 % sans cause client.",
      },
    },
    {
      "@type": "Question",
      name: "GreenTechCycle est-elle une entreprise de l'économie sociale et solidaire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. GreenTechCycle dispose du statut ESUS (Entreprise Solidaire d'Utilité Sociale) et de l'agrément clause d'insertion AGEC. 27 % de l'effectif technique est issu de l'insertion professionnelle, et l'entreprise travaille en partenariat avec des filières ESS comme Envie et les Ateliers du Bocage.",
      },
    },
    {
      "@type": "Question",
      name: "Comment intégrer GreenTechCycle avec notre CMDB existante ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GreenTechCycle propose des connecteurs natifs ServiceNow, Easyvista et Lansweeper (lecture/écriture), ainsi qu'une API REST OpenAPI 3.0 pour les autres CMDB. La réconciliation automatique est configurable par votre équipe DSI.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg data={faqSchema} />
      {children}
    </>
  );
}
