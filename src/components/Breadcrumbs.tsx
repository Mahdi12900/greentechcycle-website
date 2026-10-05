import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  const textColor = dark ? "text-fg-muted" : "text-fg-strong";
  const activeColor = dark ? "text-fg" : "text-fg";
  const hoverColor = dark ? "hover:text-fg" : "hover:text-emerald";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-caption">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className={`h-3.5 w-3.5 ${textColor}`} aria-hidden="true" />}
              {isLast ? (
                <span className={`line-clamp-1 max-w-[240px] font-medium ${activeColor}`} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`${textColor} ${hoverColor} transition-colors`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
