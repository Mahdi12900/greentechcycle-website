/**
 * Layout de branche /pilotage (déplacée depuis /admin) — le layout racine (src/app/layout.tsx) ne rend que
 * `children`, donc chaque branche rend son propre <html>. Ici : coquille html
 * minimale, noindex, pour login + tableau de bord.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0b1220", color: "#e5e7eb" }}>
        {children}
      </body>
    </html>
  );
}
