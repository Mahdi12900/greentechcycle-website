import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import SchemaOrg from "@/components/SchemaOrg";

const META_COPY: PageCopy = {
  fr: {
    title: "FAQ | ITAD et recyclage IT",
    description:
      "Réponses aux questions fréquentes sur l'ITAD, l'effacement de données, le reconditionnement et la conformité CSRD.",
  },
  en: {
    title: "FAQ | ITAD & IT recycling",
    description:
      "Answers to frequently asked questions on ITAD, data erasure, refurbishment and CSRD compliance.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/faq", META_COPY);
}

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
        text: "GreenTechCycle applique des méthodes d'effacement conformes à la norme NIST SP 800-88. Chaque opération génère un certificat d'effacement individuel horodaté et traçable par son empreinte SHA-256, garantissant la conformité RGPD.",
      },
    },
    {
      "@type": "Question",
      name: "GreenTechCycle est-elle certifiée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GreenTechCycle ne détient pas encore de certification : la démarche ISO 27001 est en cours. Nous appliquons la méthode NIST SP 800-88 pour l'effacement des données, et nos processus sont alignés sur les exigences RGPD et CSRD.",
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
        text: "Les équipements sont prioritairement reconditionnés pour le réemploi. Ceux qui ne peuvent être reconditionnés sont recyclés dans des filières tracées pour récupérer les matières premières (métaux, plastiques). La destruction n'intervient qu'en dernier recours pour les supports ne pouvant être effacés.",
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
