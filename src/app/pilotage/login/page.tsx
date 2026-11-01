import { Suspense } from "react";

/** /pilotage/login — saisie du token fondateur (env ADMIN_TOKEN, jamais dans le code). */
export const dynamic = "force-dynamic";

export default function AdminLoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <Suspense fallback={null}>
      <LoginForm searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginForm({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const error = sp?.error === "1";
  return (
    <main style={{ maxWidth: 380, margin: "12vh auto", padding: 24 }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>GreenTechCycle — Pilotage</h1>
      <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>
        Tableau de bord réservé au fondateur. Saisissez le jeton d&apos;administration.
      </p>
      {error && (
        <p style={{ color: "#f87171", fontSize: 14 }}>Jeton invalide ou non configuré.</p>
      )}
      <form method="POST" action="/api/pilotage/login" style={{ display: "grid", gap: 12 }}>
        <input
          type="password"
          name="token"
          required
          autoComplete="off"
          placeholder="Jeton d'administration"
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #374151", background: "#111827", color: "#e5e7eb" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 12px", borderRadius: 8, border: 0, background: "#16a34a", color: "#fff", fontWeight: 600, cursor: "pointer" }}
        >
          Accéder au tableau de bord
        </button>
      </form>
    </main>
  );
}
