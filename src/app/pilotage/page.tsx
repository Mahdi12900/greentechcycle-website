import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * /pilotage — tableau de bord temps réel GreenTechCycle (2026-10-29, déplacé de /admin vers /pilotage le 2026-11-01).
 * Données LIVE lues à chaque requête (cache désactivé) + auto-refresh 30 s.
 *
 * Sécurité : cookie httpOnly « gtc_admin » comparé à la variable d'environnement
 * ADMIN_TOKEN (saisie par le fondateur dans l'onglet Variables CloudStation —
 * jamais dans le code). RLS : lecture via service-role côté serveur uniquement ;
 * aucune donnée personnelle affichée (emails = leads métier saisis par les
 * visiteurs eux-mêmes dans les formulaires).
 */

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = Record<string, unknown>;

async function rest(path: string): Promise<Row[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return [];
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
      cache: "no-store",
    });
    if (!r.ok) {
      console.error("[admin] REST", r.status, path);
      return [];
    }
    return (await r.json()) as Row[];
  } catch (err) {
    console.error("[admin] fetch", err);
    return [];
  }
}

const fmtTime = (iso: unknown) =>
  typeof iso === "string" ? new Date(iso).toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false }) : "—";

export default async function AdminPage() {
  const token = process.env.ADMIN_TOKEN;
  const cookie = (await cookies()).get("gtc_admin")?.value;
  if (!token || cookie !== token) redirect("/pilotage/login");

  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const [recentEvents, todayEvents, newsletterAll, reservations] = await Promise.all([
    rest(`site_events?select=session_id,page,created_at&created_at=gte.${fiveMinAgo}&order=created_at.desc&limit=500`),
    rest(`site_events?select=id,session_id,page,utm_source,created_at&created_at=gte.${todayStart}&order=created_at.desc&limit=2000`),
    rest(`newsletter_subscribers?select=email,subscribed_at&order=subscribed_at.desc&limit=50`),
    rest(`reservations?select=nom,entreprise,source,status,rendez_vous,created_at&order=created_at.desc&limit=10`),
  ]);

  const activeSessions = new Set(recentEvents.map((e) => e.session_id).filter(Boolean));
  const sessionsToday = new Set(todayEvents.map((e) => e.session_id).filter(Boolean));
  const newsletterToday = newsletterAll.filter((n) => typeof n.subscribed_at === "string" && (n.subscribed_at as string) >= todayStart);
  const reservationsToday = reservations.filter((r) => typeof r.created_at === "string" && (r.created_at as string) >= todayStart);

  const pageCounts = new Map<string, number>();
  for (const e of todayEvents) {
    const p = typeof e.page === "string" ? (e.page as string).split("?")[0] : "?";
    pageCounts.set(p, (pageCounts.get(p) ?? 0) + 1);
  }
  const topPages = Array.from(pageCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const utmCounts = new Map<string, number>();
  for (const e of todayEvents) {
    const u = e.utm_source;
    if (typeof u === "string" && u) utmCounts.set(u, (utmCounts.get(u) ?? 0) + 1);
  }
  const topUtm = Array.from(utmCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const convNews = sessionsToday.size > 0 ? ((newsletterToday.length / sessionsToday.size) * 100).toFixed(1) : "—";
  const convResa = sessionsToday.size > 0 ? ((reservationsToday.length / sessionsToday.size) * 100).toFixed(1) : "—";

  const card: React.CSSProperties = { background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 16 };
  const h2: React.CSSProperties = { fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "#9ca3af", margin: "0 0 10px" };
  const big: React.CSSProperties = { fontSize: 30, fontWeight: 700 };
  const table: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
  const td: React.CSSProperties = { padding: "5px 8px", borderBottom: "1px solid #1f2937", textAlign: "left" };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>
      <meta httpEquiv="refresh" content="30" />
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        <h1 style={{ fontSize: 20, margin: 0 }}>GreenTechCycle — Pilotage <span style={{ color: "#22c55e", fontSize: 13 }}>● LIVE</span></h1>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          Maj auto 30 s · {fmtTime(now.toISOString())} · <a href="/api/pilotage/logout" style={{ color: "#9ca3af" }}>Déconnexion</a>
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
        <div style={card}><h2 style={h2}>Visiteurs actifs (&lt;5 min)</h2><div style={{ ...big, color: "#22c55e" }}>{activeSessions.size}</div></div>
        <div style={card}><h2 style={h2}>Pages vues aujourd&apos;hui</h2><div style={big}>{todayEvents.length}</div></div>
        <div style={card}><h2 style={h2}>Sessions uniques aujourd&apos;hui</h2><div style={big}>{sessionsToday.size}</div></div>
        <div style={card}><h2 style={h2}>Inscrits newsletter (jour)</h2><div style={big}>{newsletterToday.length}</div></div>
        <div style={card}><h2 style={h2}>Réservations (jour)</h2><div style={big}>{reservationsToday.length}</div></div>
        <div style={card}><h2 style={h2}>Conv. newsletter / résa</h2><div style={big}>{convNews}% / {convResa}%</div><div style={{ fontSize: 11, color: "#6b7280" }}>par session unique du jour</div></div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        <div style={card}>
          <h2 style={h2}>Pages vues — top aujourd&apos;hui</h2>
          <table style={table}><tbody>
            {topPages.length === 0 && <tr><td style={td}>Aucune page vue aujourd&apos;hui.</td></tr>}
            {topPages.map(([p, n]) => <tr key={p}><td style={td}>{p}</td><td style={{ ...td, textAlign: "right" }}>{n}</td></tr>)}
          </tbody></table>
          <h2 style={{ ...h2, marginTop: 14 }}>UTM source (jour)</h2>
          <table style={table}><tbody>
            {topUtm.length === 0 && <tr><td style={td}>—</td></tr>}
            {topUtm.map(([u, n]) => <tr key={u}><td style={td}>{u}</td><td style={{ ...td, textAlign: "right" }}>{n}</td></tr>)}
          </tbody></table>
        </div>

        <div style={card}>
          <h2 style={h2}>Dernières inscriptions newsletter</h2>
          <table style={table}><tbody>
            {newsletterAll.length === 0 && <tr><td style={td}>Aucune inscription.</td></tr>}
            {newsletterAll.slice(0, 10).map((n) => (
              <tr key={String(n.email)}><td style={td}>{String(n.email)}</td><td style={{ ...td, textAlign: "right", color: "#9ca3af" }}>{fmtTime(n.subscribed_at)}</td></tr>
            ))}
          </tbody></table>
        </div>

        <div style={card}>
          <h2 style={h2}>Dernières réservations</h2>
          <table style={table}><tbody>
            {reservations.length === 0 && <tr><td style={td}>Aucune réservation.</td></tr>}
            {reservations.map((r, i) => (
              <tr key={i}>
                <td style={td}>{String(r.entreprise ?? r.nom ?? "?")}<br /><span style={{ color: "#9ca3af", fontSize: 11 }}>{String(r.source ?? "")} · {String(r.status ?? "")}{r.rendez_vous ? ` · RDV ${fmtTime(r.rendez_vous)}` : ""}</span></td>
                <td style={{ ...td, textAlign: "right", color: "#9ca3af" }}>{fmtTime(r.created_at)}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </section>
    </main>
  );
}
