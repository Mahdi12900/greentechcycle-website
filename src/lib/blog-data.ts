export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "csrd-et-itad-reporting-esg-actifs-it",
    title: "CSRD et ITAD : comment intégrer la gestion des actifs IT dans votre reporting ESG",
    description:
      "Découvrez comment la directive CSRD impacte la gestion de vos actifs IT en fin de vie et comment l'ITAD s'intègre dans votre stratégie de reporting ESG.",
    keywords: ["CSRD", "ITAD", "reporting ESG", "actifs IT", "durabilité", "ESRS", "bilan carbone IT"],
    author: "GreenTechCycle",
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-10",
    readingTime: "8 min",
    category: "Réglementation",
    image: "/photos/blog-csrd.jpg",
    imageAlt: "Tableau de bord de reporting ESG pour la gestion des actifs IT",
  },
  {
    slug: "securite-donnees-fin-de-vie-equipements-it",
    title: "Sécurité des données en fin de vie : protéger vos informations lors du décommissionnement IT",
    description:
      "Guide complet sur la sécurisation des données lors du retrait des équipements IT. Méthodes d'effacement NIST 800-88 et bonnes pratiques RGPD.",
    keywords: ["sécurité données", "effacement sécurisé", "NIST 800-88", "RGPD", "décommissionnement IT", "fin de vie"],
    author: "GreenTechCycle",
    publishedAt: "2026-03-22",
    updatedAt: "2026-04-08",
    readingTime: "10 min",
    category: "Sécurité",
    image: "/photos/blog-securite.jpg",
    imageAlt: "Processus d'effacement sécurisé des données sur équipements IT",
  },
  {
    slug: "nis2-compliance-it-infrastructure",
    title: "NIS2 et conformité IT : obligations pour la gestion de votre infrastructure informatique",
    description:
      "La directive NIS2 renforce les exigences de cybersécurité. Découvrez ses implications pour la gestion du cycle de vie de vos actifs IT et la conformité ITAD.",
    keywords: ["NIS2", "conformité IT", "cybersécurité", "infrastructure informatique", "ITAD", "directive européenne"],
    author: "GreenTechCycle",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-15",
    readingTime: "9 min",
    category: "Conformité",
    image: "/photos/blog-nis2.jpg",
    imageAlt: "Schéma de conformité NIS2 pour l'infrastructure IT",
  },
  {
    slug: "economie-circulaire-it-entreprise",
    title: "Économie circulaire IT en entreprise : du reconditionnement à la valorisation des actifs",
    description:
      "Comment mettre en place une stratégie d'économie circulaire pour vos équipements IT. Reconditionnement, réemploi et valorisation pour réduire votre empreinte carbone.",
    keywords: ["économie circulaire IT", "reconditionnement", "réemploi", "valorisation", "empreinte carbone", "RSE"],
    author: "GreenTechCycle",
    publishedAt: "2026-04-08",
    updatedAt: "2026-04-18",
    readingTime: "9 min",
    category: "Durabilité",
    image: "/photos/blog-economie-circulaire.jpg",
    imageAlt: "Cycle de vie circulaire des équipements IT en entreprise",
  },
  {
    slug: "guide-deee-reglementation-entreprise",
    title: "Guide DEEE : réglementation et obligations pour les entreprises en 2026",
    description:
      "Tout savoir sur la réglementation DEEE en France. Obligations des entreprises, filières de traitement, sanctions et bonnes pratiques pour la gestion des déchets électroniques.",
    keywords: ["DEEE", "réglementation", "déchets électroniques", "obligations entreprises", "recyclage IT", "eco-organismes"],
    author: "GreenTechCycle",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-20",
    readingTime: "11 min",
    category: "Réglementation",
    image: "/photos/blog-deee.jpg",
    imageAlt: "Infographie sur la réglementation DEEE pour les entreprises",
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogArticles.map((a) => a.slug);
}

/**
 * Résumés anglais des articles (audit final du 2026-10-04, B3) : utilisés sur les pages /en
 * (encarts « articles liés », index du blog). Le corps des articles reste en français ; les
 * cartes l'indiquent (« Article in French »).
 */
export const BLOG_EN: Record<string, Pick<BlogArticle, "title" | "description" | "category" | "imageAlt">> = {
  "csrd-et-itad-reporting-esg-actifs-it": {
    title: "CSRD and ITAD: bringing IT asset management into your ESG reporting",
    description: "How the CSRD directive affects the management of your end-of-life IT assets, and how ITAD fits into your ESG reporting strategy.",
    category: "Regulation",
    imageAlt: "ESG reporting dashboard for IT asset management",
  },
  "securite-donnees-fin-de-vie-equipements-it": {
    title: "End-of-life data security: protecting your information during IT decommissioning",
    description: "A complete guide to securing data when retiring IT equipment: NIST 800-88 erasure methods and GDPR best practices.",
    category: "Security",
    imageAlt: "Secure data erasure process on IT equipment",
  },
  "nis2-compliance-it-infrastructure": {
    title: "NIS2 and IT compliance: obligations for managing your IT infrastructure",
    description: "The NIS2 directive strengthens cybersecurity requirements. What it means for managing the lifecycle of your IT assets and for ITAD compliance.",
    category: "Compliance",
    imageAlt: "NIS2 compliance diagram for IT infrastructure",
  },
  "economie-circulaire-it-entreprise": {
    title: "The circular IT economy in business: from refurbishment to asset value recovery",
    description: "How to set up a circular-economy strategy for your IT equipment: refurbishment, reuse and value recovery to reduce your carbon footprint.",
    category: "Sustainability",
    imageAlt: "Circular lifecycle of business IT equipment",
  },
  "guide-deee-reglementation-entreprise": {
    title: "WEEE guide: regulation and obligations for businesses in 2026",
    description: "Everything about WEEE regulation in France: business obligations, treatment channels, penalties and best practices for managing electronic waste.",
    category: "Regulation",
    imageAlt: "Infographic on WEEE regulation for businesses",
  },
};

/** Article avec titre, description, catégorie et texte alternatif dans la langue de la page */
export function localizeArticle(article: BlogArticle, locale: string): BlogArticle {
  if (locale !== "en") return article;
  const en = BLOG_EN[article.slug];
  return en ? { ...article, ...en } : article;
}
