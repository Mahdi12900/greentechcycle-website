import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  const textColor = dark ? "text-gray-300" : "text-gray-600";
  const activeColor = dark ? "text-white" : "text-[#0F172A]";
  const hoverColor = dark ? "hover:text-white" : "hover:text-[#0D503C]";
  const separatorColor = dark ? "text-gray-500" : "text-gray-400";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://greentechcycle.fr${item.href}`,
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {index === 0 && <Home className={`h-3.5 w-3.5 ${textColor}`} />}
              {index > 0 && (
                <ChevronRight className={`h-3.5 w-3.5 ${separatorColor}`} aria-hidden="true" />
              )}
              {isLast ? (
                <span className={`font-medium ${activeColor} line-clamp-1 max-w-[200px]`} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`${textColor} ${hoverColor} transition-colors`}
                >
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
