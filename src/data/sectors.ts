import {
  Building2,
  Heart,
  Factory,
  ShoppingCart,
  Zap,
  Truck,
  Landmark,
  Cpu,
  Tv,
  Briefcase,
  FlaskConical,
  HardHat,
  UtensilsCrossed,
  GraduationCap,
  Wheat,
  Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Slugs, FR canonical, same URL path for both locales
───────────────────────────────────────────────────────────────────────────── */
export type SectorSlug =
  | "finance"
  | "sante"
  | "industrie"
  | "retail"
  | "energie"
  | "transport-logistique"
  | "public"
  | "tech"
  | "medias-audiovisuel"
  | "conseil"
  | "pharma-biotech"
  | "btp"
  | "horeca"
  | "education-recherche"
  | "agroalimentaire"
  | "telecom";

/* ─────────────────────────────────────────────────────────────────────────────
   Sector definition (visual / routing)
───────────────────────────────────────────────────────────────────────────── */
export interface SectorDef {
  slug: SectorSlug;
  number: number;
  icon: LucideIcon;
  /** Photo locale (/public). `null` = pas de photo dédiée → panneau d'identité (DESIGN.md §7). */
  image: string | null;
  priority: 1 | 2 | 3; // 1=haute, 2=moyenne, 3=faible
  featured?: boolean;
}

export const SECTORS: SectorDef[] = [
  { slug: "finance", number: 1, icon: Building2, image: "/photos/case-banque.jpg", priority: 1, featured: true },
  { slug: "sante", number: 2, icon: Heart, image: "/photos/case-hopital.jpg", priority: 2 },
  { slug: "industrie", number: 3, icon: Factory, image: "/photos/case-industrie.jpg", priority: 1 },
  { slug: "retail", number: 4, icon: ShoppingCart, image: "/photos/sector-retail.jpg", priority: 1 },
  { slug: "energie", number: 5, icon: Zap, image: "/photos/case-energie.jpg", priority: 2 },
  { slug: "transport-logistique", number: 6, icon: Truck, image: null, priority: 2 },
  { slug: "public", number: 7, icon: Landmark, image: "/photos/case-administration.jpg", priority: 3 },
  { slug: "tech", number: 8, icon: Cpu, image: "/images/datacenter.jpg", priority: 1 },
  { slug: "medias-audiovisuel", number: 9, icon: Tv, image: "/photos/case-media-tf1.jpg", priority: 1, featured: true },
  { slug: "conseil", number: 10, icon: Briefcase, image: "/photos/corporate-meeting.jpg", priority: 1 },
  { slug: "pharma-biotech", number: 11, icon: FlaskConical, image: "/images/hospital.jpg", priority: 2 },
  { slug: "btp", number: 12, icon: HardHat, image: "/images/industry.jpg", priority: 3 },
  { slug: "horeca", number: 13, icon: UtensilsCrossed, image: "/images/office.jpg", priority: 2 },
  { slug: "education-recherche", number: 14, icon: GraduationCap, image: "/photos/case-universite.jpg", priority: 3 },
  { slug: "agroalimentaire", number: 15, icon: Wheat, image: null, priority: 2 },
  { slug: "telecom", number: 16, icon: Radio, image: "/photos/case-telco.jpg", priority: 2 },
];

export const ALL_SECTOR_SLUGS: SectorSlug[] = SECTORS.map((s) => s.slug);

export function getSectorDef(slug: string): SectorDef | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Content types
───────────────────────────────────────────────────────────────────────────── */
export interface SectorContent {
  hero: { title: string; subtitle: string };
  profile: { description: string; regulations: string };
  painPoints: string[];
  useCases: { title: string; description: string }[];
  roi: { lever: string; gain: string }[];
  personas: { role: string; description: string }[];
  quote: string;
  objections: { question: string; answer: string }[];
  cta: { title: string; button: string };
  tf1Reference?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Priority matrix data
───────────────────────────────────────────────────────────────────────────── */
export interface MatrixRow {
  slug: SectorSlug;
  dealSize: string;
  velocity: string;
  priority: string;
  stars: number;
}
