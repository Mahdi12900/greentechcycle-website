import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/* ─────────────────────────────────────────────────────────────────────────
   /api/reservation, qualified lead intake.
   - Persistence: Supabase (table `reservations`) when env vars are set.
   - Fallback: append a JSON line to `reservations.jsonl` at repo root.
   - Email: Resend transactional email when RESEND_API_KEY is set.
   - Always returns { success, reservation_id, mode } so the form can degrade
     gracefully on the client side.
───────────────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReservationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  size?: string;
  persona?: string;
  sites?: string;
  needs?: string;
  message?: string;
  slots?: string[];
  consent?: boolean;
  offerSlug?: string | null;
  source?: string;
};

type StoredReservation = {
  id: string;
  created_at: string;
  status: "nouveau";
  name: string;
  email: string;
  phone: string;
  company: string;
  size: string;
  persona: string;
  sites: string;
  needs: string;
  message: string;
  slots: string[];
  consent: boolean;
  offerSlug: string | null;
  source: string;
};

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(s: unknown, max = 2000): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function buildRecord(payload: ReservationPayload): StoredReservation {
  return {
    id: randomUUID(),
    created_at: new Date().toISOString(),
    status: "nouveau",
    name: sanitize(payload.name, 200),
    email: sanitize(payload.email, 200).toLowerCase(),
    phone: sanitize(payload.phone, 60),
    company: sanitize(payload.company, 200),
    size: sanitize(payload.size, 60),
    persona: sanitize(payload.persona, 60),
    sites: sanitize(payload.sites, 500),
    needs: sanitize(payload.needs, 4000),
    message: sanitize(payload.message, 4000),
    slots: Array.isArray(payload.slots)
      ? payload.slots.slice(0, 6).map((s) => sanitize(s, 60))
      : [],
    consent: !!payload.consent,
    offerSlug: payload.offerSlug ? sanitize(payload.offerSlug, 80) : null,
    source: sanitize(payload.source ?? "site-reserver", 80),
  };
}

async function persistInSupabase(record: StoredReservation): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/reservations`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: record.id,
        created_at: record.created_at,
        offre_slug: record.offerSlug,
        nom: record.name,
        email: record.email,
        telephone: record.phone,
        entreprise: record.company,
        taille: record.size,
        persona: record.persona,
        sites: record.sites,
        volumes_ou_besoins: record.needs,
        message: record.message,
        creneaux: record.slots,
        status: record.status,
        source: record.source,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[reservation] Supabase insert failed", res.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[reservation] Supabase exception", err);
    return false;
  }
}

async function persistInFile(record: StoredReservation): Promise<boolean> {
  try {
    const target = path.join(process.cwd(), "reservations.jsonl");
    await fs.appendFile(target, JSON.stringify(record) + "\n", "utf8");
    console.log(`[reservation] Stored locally id=${record.id} → ${target}`);
    return true;
  } catch (err) {
    // On serverless filesystems (Vercel prod) fs.appendFile may fail because
    // the filesystem is read-only, that is expected, we just log and skip.
    console.warn("[reservation] Filesystem fallback unavailable", err);
    return false;
  }
}

async function sendEmails(record: StoredReservation): Promise<{ internal: boolean; confirmation: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const internalRecipient = process.env.CONTACT_EMAIL ?? "mahdi@greentechcycle.fr";
  const fromAddress = process.env.RESEND_FROM ?? "GreenTechCycle <reservations@greentechcycle.fr>";

  if (!apiKey) return { internal: false, confirmation: false };

  const offerLabel = record.offerSlug ?? "demande générale";
  const internalSubject = `Nouvelle réservation · ${offerLabel} · ${record.company || record.name}`;
  const internalHtml = `
    <h2>Nouvelle réservation qualifiée</h2>
    <p><strong>Référence :</strong> ${record.id}</p>
    <p><strong>Offre :</strong> ${offerLabel}</p>
    <p><strong>Source :</strong> ${record.source}</p>
    <hr/>
    <p><strong>${record.name}</strong>, ${record.persona}</p>
    <p>${record.email} · ${record.phone}</p>
    <p>${record.company} · ${record.size}</p>
    <p><strong>Sites :</strong> ${record.sites || "-"}</p>
    <hr/>
    <p><strong>Volumes / besoins :</strong></p>
    <p>${record.needs.replace(/\n/g, "<br/>") || "-"}</p>
    <p><strong>Message :</strong></p>
    <p>${(record.message || "").replace(/\n/g, "<br/>") || "-"}</p>
    <p><strong>Créneaux préférés :</strong> ${record.slots.join(" · ") || "-"}</p>
  `;

  const confirmationHtml = `
    <p>Bonjour ${record.name.split(" ")[0] || ""},</p>
    <p>Merci pour votre demande concernant <strong>${offerLabel}</strong>.</p>
    <p>Un responsable GreenTechCycle vous recontacte sous 24 heures ouvrées
    avec une proposition personnalisée et la confirmation d'un créneau.</p>
    <p>Référence à conserver : <strong>${record.id}</strong></p>
    <p>L'équipe GreenTechCycle</p>
  `;

  const send = async (to: string, subject: string, html: string): Promise<boolean> => {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: fromAddress, to, subject, html }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[reservation] Resend failed", res.status, text);
        return false;
      }
      return true;
    } catch (err) {
      console.error("[reservation] Resend exception", err);
      return false;
    }
  };

  const [internal, confirmation] = await Promise.all([
    send(internalRecipient, internalSubject, internalHtml),
    record.email ? send(record.email, "Votre réservation GreenTechCycle", confirmationHtml) : Promise.resolve(false),
  ]);

  return { internal, confirmation };
}

export async function POST(req: Request) {
  let payload: ReservationPayload;
  try {
    payload = (await req.json()) as ReservationPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // Minimum required fields
  if (
    !sanitize(payload.name) ||
    !sanitize(payload.email) ||
    !emailIsValid(sanitize(payload.email)) ||
    !sanitize(payload.phone) ||
    !sanitize(payload.company) ||
    !payload.consent
  ) {
    return NextResponse.json(
      { success: false, error: "validation_failed" },
      { status: 422 }
    );
  }

  const record = buildRecord(payload);

  const supabaseOk = await persistInSupabase(record);
  if (!supabaseOk) {
    await persistInFile(record);
  }

  // Fire-and-don't-await emails so the user always gets a fast response.
  // We still surface email status in logs for observability.
  sendEmails(record)
    .then((res) =>
      console.log(
        `[reservation] email status internal=${res.internal} confirmation=${res.confirmation} id=${record.id}`
      )
    )
    .catch((err) => console.error("[reservation] email exception", err));

  return NextResponse.json({
    success: true,
    reservation_id: record.id,
    mode: supabaseOk ? "supabase" : "fallback",
  });
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "method_not_allowed" },
    { status: 405 }
  );
}
