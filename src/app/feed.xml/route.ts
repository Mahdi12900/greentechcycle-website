import { blogArticles } from "@/lib/blog-data";

export async function GET() {
  const base = "https://greentechcycle.fr";

  const items = blogArticles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${base}/fr/blog/${article.slug}</link>
      <guid isPermaLink="true">${base}/fr/blog/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${article.category}</category>
      <author>contact@greentechcycle.fr (${article.author})</author>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GreenTechCycle Blog - ITAD &amp; Recyclage IT</title>
    <link>${base}/fr/blog</link>
    <description>Articles et guides sur l'ITAD, le recyclage IT, la conformité CSRD/NIS2 et l'économie circulaire pour les entreprises.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${base}/logo/logo-primary.svg</url>
      <title>GreenTechCycle</title>
      <link>${base}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
