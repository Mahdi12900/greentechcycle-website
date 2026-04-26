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
import type { ComponentType } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Slugs — FR canonical, same URL path for both locales
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
  icon: ComponentType<{ className?: string }>;
  image: string;
  color: string;
  accent: string;
  priority: 1 | 2 | 3; // 1=haute, 2=moyenne, 3=faible
  featured?: boolean;
}

export const SECTORS: SectorDef[] = [
  { slug: "finance", number: 1, icon: Building2, image: "/photos/case-banque.jpg", color: "bg-blue-500/10 text-blue-600", accent: "blue", priority: 1, featured: true },
  { slug: "sante", number: 2, icon: Heart, image: "/photos/case-hopital.jpg", color: "bg-red-500/10 text-red-600", accent: "red", priority: 2 },
  { slug: "industrie", number: 3, icon: Factory, image: "/photos/case-industrie.jpg", color: "bg-amber-500/10 text-amber-600", accent: "amber", priority: 1 },
  { slug: "retail", number: 4, icon: ShoppingCart, image: "/photos/sector-retail.jpg", color: "bg-teal-500/10 text-teal-600", accent: "teal", priority: 1 },
  { slug: "energie", number: 5, icon: Zap, image: "/photos/case-energie.jpg", color: "bg-emerald-500/10 text-emerald-600", accent: "emerald", priority: 2 },
  { slug: "transport-logistique", number: 6, icon: Truck, image: "/images/servers.jpg", color: "bg-sky-500/10 text-sky-600", accent: "sky", priority: 2 },
  { slug: "public", number: 7, icon: Landmark, image: "/photos/case-administration.jpg", color: "bg-purple-500/10 text-purple-600", accent: "purple", priority: 3 },
  { slug: "tech", number: 8, icon: Cpu, image: "/images/datacenter.jpg", color: "bg-indigo-500/10 text-indigo-600", accent: "indigo", priority: 1 },
  { slug: "medias-audiovisuel", number: 9, icon: Tv, image: "/photos/case-media-tf1.jpg", color: "bg-pink-500/10 text-pink-600", accent: "pink", priority: 1, featured: true },
  { slug: "conseil", number: 10, icon: Briefcase, image: "/photos/corporate-meeting.jpg", color: "bg-slate-500/10 text-slate-600", accent: "slate", priority: 1 },
  { slug: "pharma-biotech", number: 11, icon: FlaskConical, image: "/images/hospital.jpg", color: "bg-cyan-500/10 text-cyan-600", accent: "cyan", priority: 2 },
  { slug: "btp", number: 12, icon: HardHat, image: "/images/industry.jpg", color: "bg-orange-500/10 text-orange-600", accent: "orange", priority: 3 },
  { slug: "horeca", number: 13, icon: UtensilsCrossed, image: "/images/office.jpg", color: "bg-rose-500/10 text-rose-600", accent: "rose", priority: 2 },
  { slug: "education-recherche", number: 14, icon: GraduationCap, image: "/photos/case-universite.jpg", color: "bg-violet-500/10 text-violet-600", accent: "violet", priority: 3 },
  { slug: "agroalimentaire", number: 15, icon: Wheat, image: "/images/industry.jpg", color: "bg-lime-500/10 text-lime-600", accent: "lime", priority: 2 },
  { slug: "telecom", number: 16, icon: Radio, image: "/photos/case-telco.jpg", color: "bg-fuchsia-500/10 text-fuchsia-600", accent: "fuchsia", priority: 2 },
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
