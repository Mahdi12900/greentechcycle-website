import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { CONTACT_TOPICS, isContactTopic, type ContactTopic } from "@/lib/contact";
import { mailTransport, sendMail } from "@/lib/mailer";
import { buildIcsInvite } from "@/lib/ics";
import { isValidFutureSlot } from "@/lib/slots";

/* ─────────────────────────────────────────────────────────────────────────
   /api/reservation, qualified lead intake + démo booking.
   - Persistence : Supabase (table `reservations`) si les variables d'env sont
     définies (aucune ne l'est aujourd'hui, volontairement — voir
     reports/reservations-demo-gtc.md) ; sinon fichier local `reservations.jsonl`
     (éphémère, perdu à chaque redéploiement) ; dans tous les cas, une ligne de
     log structurée est émise (sans secret) pour servir de trace minimale.
   - Email : src/lib/mailer.ts — SMTP (nodemailer) si SMTP_HOST/SMTP_USER/SMTP_PASS
     sont définis, sinon Resend si RESEND_API_KEY, sinon aucun envoi.
     Routage par sujet (src/lib/contact.ts → CONTACT_TOPICS) : commercial → sales@,
     support → support@, lab → lab.rd@ ; expéditeur noreply@ (jamais affiché).
   - Durabilité (2026-10-05) : en l'absence de base de données, l'email interne
     à sales@ FAIT FOI de réservation. Il est envoyé en premier et de façon
     bloquante : si son envoi échoue, l'API renvoie une erreur explicite plutôt
     que de laisser croire que la demande est enregistrée (plus de succès
     silencieux — c'est exactement l'incident du jour qu'on corrige).
   - Rendez-vous réel (`appointmentStart`) : requis pour une démo (sources
     "site-reserver" et "demo"), optionnel pour les demandes génériques
     (contact, simulateurs). Quand il est présent, une invitation .ics
     (METHOD:REQUEST) est jointe aux deux emails.
   - Copies Outlook (2026-10-05, décision utilisateur) : toute demande déclenche
     aussi une copie vers LEADS_COPY_EMAIL (compte Outlook.com connecté), avec
     tous les champs et Reply-To le prospect, pour que l'utilisateur voie tout
     dans sa boîte ; une démo déclenche en plus une copie .ics séparée vers
     BOOKING_CALENDAR_EMAIL pour l'ajout automatique à l'agenda Outlook.com.
     Les deux copies sont non bloquantes (échec journalisé, jamais remonté).
───────────────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Sources qui représentent un vrai rendez-vous de démo (créneau obligatoire, téléphone requis). */
const APPOINTMENT_SOURCES = new Set(["site-reserver", "demo"]);
/** Sources de capture légère sans entreprise connue (ex. simulateur carbone, aucun champ société). */
const COMPANY_OPTIONAL_SOURCES = new Set(["carbon-calculator"]);

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
  appointmentStart?: string;
  consent?: boolean;
  offerSlug?: string | null;
  topic?: string;
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
  appointmentStart: string | null;
  consent: boolean;
  offerSlug: string | null;
  topic: ContactTopic;
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
  const appointmentStart = sanitize(payload.appointmentStart, 40);
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
    appointmentStart: appointmentStart || null,
    consent: !!payload.consent,
    offerSlug: payload.offerSlug ? sanitize(payload.offerSlug, 80) : null,
    // Réservations de démo / devis sans sujet explicite → commercial
    topic: isContactTopic(payload.topic) ? payload.topic : "commercial",
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
        rendez_vous: record.appointmentStart,
        status: record.status,
        // Le sujet voyage dans « source » (ex. contact:support) : pas de nouvelle colonne requise
        source: record.topic === "commercial" ? record.source : `${record.source}:${record.topic}`,
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
    return true;
  } catch (err) {
    // Système de fichiers éphémère/lecture seule selon la plateforme : attendu, on journalise et on continue.
    console.warn("[reservation] Filesystem fallback unavailable", err instanceof Error ? err.message : err);
    return false;
  }
}

/** Ligne de log structurée, sans secret, servant de trace minimale de chaque réservation. */
function logBooking(record: StoredReservation, outcome: Record<string, unknown>) {
  console.log(
    "[reservation][booking]",
    JSON.stringify({
      id: record.id,
      created_at: record.created_at,
      topic: record.topic,
      source: record.source,
      company: record.company || null,
      email: record.email,
      appointmentStart: record.appointmentStart,
      ...outcome,
    })
  );
}

function escapeHtml(v: string): string {
  return v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

type EmailOutcome = {
  ok: boolean;
  stage?: "internal" | "confirmation";
  reason?: string;
  internal: boolean;
  confirmation: boolean;
  calendarCopy: boolean;
  leadsCopy: boolean;
};

/** outlook_495F440A0341820A@outlook.com : compte Outlook.com connecté par l'utilisateur (2026-10-05). */
const DEFAULT_BOOKING_CALENDAR_EMAIL = "outlook_495F440A0341820A@outlook.com";
/** Même compte, par défaut : copie de toute demande commerciale pour que l'utilisateur les voie dans Outlook. */
const DEFAULT_LEADS_COPY_EMAIL = "outlook_495F440A0341820A@outlook.com";

/** Catégorie lisible pour le préfixe de sujet de la copie Outlook (toujours l'une de ces 5 étiquettes). */
function leadCategory(record: StoredReservation): string {
  if (record.offerSlug === "waki-box-pilote") return "Pilote WakiBox";
  if (record.topic === "support") return "Support";
  if (record.topic === "lab") return "Lab";
  if (APPOINTMENT_SOURCES.has(record.source)) return "Démo";
  return "Contact commercial";
}

/**
 * Envoie l'email interne (sales@/support@/lab.rd@) puis, s'il réussit, l'email de
 * confirmation au prospect — tous deux avec une invitation .ics quand un rendez-vous
 * réel est fourni. Bloquant et strict : le premier échec arrête la séquence et fait
 * échouer la réservation (plus de succès silencieux, cf. incident SMTP du jour).
 */
async function sendBookingEmails(record: StoredReservation): Promise<EmailOutcome> {
  if (mailTransport() === "none") {
    console.error("[reservation] Aucun transport e-mail configuré (SMTP_* ou RESEND_API_KEY)");
    return { ok: false, stage: "internal", reason: "no_transport", internal: false, confirmation: false, calendarCopy: false, leadsCopy: false };
  }

  const internalRecipient = process.env.CONTACT_EMAIL || CONTACT_TOPICS[record.topic].recipient;
  const topicLabel = CONTACT_TOPICS[record.topic].label.fr;
  const e = escapeHtml;

  let ics: string | null = null;
  if (record.appointmentStart) {
    const start = new Date(record.appointmentStart);
    ics = buildIcsInvite({
      uid: `${record.id}@greentechcycle.fr`,
      start,
      durationMinutes: 30,
      title: `Démo GreenTechCycle — ${record.company || record.name}`,
      description: [
        `Démo GreenTechCycle pour ${record.company || record.name}.`,
        `Contact : ${record.name} (${record.email}${record.phone ? ", " + record.phone : ""}).`,
        record.needs ? `Besoins : ${record.needs}` : "",
        `Référence : ${record.id}`,
      ]
        .filter(Boolean)
        .join("\n"),
      organizerEmail: internalRecipient,
      organizerName: "GreenTechCycle",
      attendeeEmail: record.email,
      attendeeName: record.name || record.email,
    });
  }
  const icsAttachment = ics
    ? [{ filename: "demo-greentechcycle.ics", content: ics, contentType: 'text/calendar; charset=utf-8; method=REQUEST' }]
    : undefined;

  const offerLabel = e(record.offerSlug ?? "demande générale");
  const appointmentLine = record.appointmentStart
    ? new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Europe/Paris",
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(record.appointmentStart)) + " (heure de Paris)"
    : null;

  const internalSubject = `[${record.topic}] ${record.offerSlug ?? "demande"} · ${record.company || record.name}`;
  const internalHtml = `
    <h2>Nouvelle demande · ${e(topicLabel)}</h2>
    <p><strong>Référence :</strong> ${record.id}</p>
    <p><strong>Sujet :</strong> ${e(topicLabel)}</p>
    <p><strong>Offre :</strong> ${offerLabel}</p>
    <p><strong>Source :</strong> ${e(record.source)}</p>
    ${appointmentLine ? `<p><strong>Rendez-vous demandé :</strong> ${e(appointmentLine)}</p>` : ""}
    <hr/>
    <p><strong>${e(record.name)}</strong>, ${e(record.persona)}</p>
    <p>${e(record.email)} · ${e(record.phone)}</p>
    <p>${e(record.company)} · ${e(record.size)}</p>
    <p><strong>Sites :</strong> ${e(record.sites) || "-"}</p>
    <hr/>
    <p><strong>Volumes / besoins :</strong></p>
    <p>${e(record.needs).replace(/\n/g, "<br/>") || "-"}</p>
    <p><strong>Message :</strong></p>
    <p>${e(record.message || "").replace(/\n/g, "<br/>") || "-"}</p>
  `;

  const confirmationHtml = `
    <p>Bonjour ${e(record.name.split(" ")[0] || "")},</p>
    <p>Merci pour votre demande concernant <strong>${offerLabel}</strong>.</p>
    ${
      appointmentLine
        ? `<p>Votre démo est prévue le <strong>${e(appointmentLine)}</strong>. Une invitation calendaire est jointe à cet email (fichier .ics) : ouvrez-la pour l'ajouter directement à Outlook ou à votre calendrier.</p>`
        : `<p>Un responsable GreenTechCycle vous recontacte sous 24 heures ouvrées avec une proposition personnalisée et la confirmation d'un créneau.</p>`
    }
    <p>Référence à conserver : <strong>${record.id}</strong></p>
    <p>L'équipe GreenTechCycle</p>
  `;

  const internalOk = await sendMail({
    to: internalRecipient,
    subject: internalSubject,
    html: internalHtml,
    replyTo: record.email || undefined,
    attachments: icsAttachment,
  });
  if (!internalOk) {
    console.error(`[reservation] Échec envoi email interne id=${record.id} to=${internalRecipient}`);
    return { ok: false, stage: "internal", reason: "send_failed", internal: false, confirmation: false, calendarCopy: false, leadsCopy: false };
  }

  // Copie agenda (Outlook.com) : uniquement pour un vrai rendez-vous (ics présent). Ne doit jamais
  // faire échouer la réservation — sales@ reste la trace qui fait foi. Échec simplement journalisé.
  let calendarCopy = false;
  if (icsAttachment) {
    const calendarEmail = process.env.BOOKING_CALENDAR_EMAIL || DEFAULT_BOOKING_CALENDAR_EMAIL;
    const calendarDateLabel = new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(record.appointmentStart as string));
    calendarCopy = await sendMail({
      to: calendarEmail,
      subject: `Démo GreenTechCycle — ${record.company || record.name} — ${calendarDateLabel}`,
      html: `<p>Invitation calendaire pour la démo GreenTechCycle — ${e(record.company || record.name)}, le ${e(calendarDateLabel)} (heure de Paris). Référence : ${record.id}.</p>`,
      attachments: icsAttachment,
    });
    if (!calendarCopy) {
      console.error(`[reservation] Échec envoi copie agenda id=${record.id} to=${calendarEmail}`);
    }
  }

  // Copie Outlook de toute demande commerciale (démo, contact, lab, pilote WakiBox, devis…) pour que
  // l'utilisateur les voie toutes dans sa boîte connectée. Reply-To le prospect pour répondre direct
  // depuis Outlook. Ne doit jamais faire échouer la réservation — échec simplement journalisé.
  const leadsEmail = process.env.LEADS_COPY_EMAIL || DEFAULT_LEADS_COPY_EMAIL;
  const leadsCopy = await sendMail({
    to: leadsEmail,
    subject: `[Site GTC] ${leadCategory(record)} — ${record.company || record.name}`,
    html: internalHtml,
    replyTo: record.email || undefined,
    attachments: icsAttachment,
  });
  if (!leadsCopy) {
    console.error(`[reservation] Échec envoi copie Outlook (leads) id=${record.id} to=${leadsEmail}`);
  }

  if (!record.email) {
    return { ok: true, internal: true, confirmation: false, calendarCopy, leadsCopy };
  }

  const confirmationOk = await sendMail({
    to: record.email,
    subject: "Votre demande GreenTechCycle",
    html: confirmationHtml,
    replyTo: internalRecipient,
    attachments: icsAttachment,
  });
  if (!confirmationOk) {
    console.error(`[reservation] Échec envoi confirmation prospect id=${record.id} to=${record.email}`);
    return { ok: false, stage: "confirmation", reason: "send_failed", internal: true, confirmation: false, calendarCopy, leadsCopy };
  }

  return { ok: true, internal: true, confirmation: true, calendarCopy, leadsCopy };
}

export async function POST(req: Request) {
  let payload: ReservationPayload;
  try {
    payload = (await req.json()) as ReservationPayload;
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  const source = sanitize(payload.source, 40) || "site-reserver";
  const isAppointment = APPOINTMENT_SOURCES.has(source);
  const phoneRequired = isAppointment;
  const companyRequired = !COMPANY_OPTIONAL_SOURCES.has(source);

  if (
    !sanitize(payload.name) ||
    !sanitize(payload.email) ||
    !emailIsValid(sanitize(payload.email)) ||
    (phoneRequired && !sanitize(payload.phone)) ||
    (companyRequired && !sanitize(payload.company)) ||
    !payload.consent
  ) {
    return NextResponse.json({ success: false, error: "validation_failed" }, { status: 422 });
  }

  const appointmentStartRaw = sanitize(payload.appointmentStart, 40);
  if (isAppointment && !appointmentStartRaw) {
    return NextResponse.json({ success: false, error: "appointment_required" }, { status: 422 });
  }
  if (appointmentStartRaw && !isValidFutureSlot(appointmentStartRaw)) {
    return NextResponse.json({ success: false, error: "appointment_invalid" }, { status: 422 });
  }

  const record = buildRecord(payload);

  const supabaseOk = await persistInSupabase(record);
  const fileOk = supabaseOk ? false : await persistInFile(record);

  // L'email interne à sales@ fait foi de réservation (pas de base de données en place) :
  // on l'envoie de façon bloquante, et tout échec est remonté au client, pas de succès silencieux.
  const emailOutcome = await sendBookingEmails(record);
  logBooking(record, {
    persisted: supabaseOk ? "supabase" : fileOk ? "file" : "none",
    emailInternal: emailOutcome.internal,
    emailConfirmation: emailOutcome.confirmation,
    calendarCopy: emailOutcome.calendarCopy,
    leadsCopy: emailOutcome.leadsCopy,
    emailOk: emailOutcome.ok,
    ...(emailOutcome.ok ? {} : { emailFailureStage: emailOutcome.stage, emailFailureReason: emailOutcome.reason }),
  });

  if (!emailOutcome.ok) {
    return NextResponse.json(
      { success: false, error: "email_failed", stage: emailOutcome.stage ?? "internal" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    reservation_id: record.id,
    appointmentStart: record.appointmentStart,
  });
}

export async function GET() {
  return NextResponse.json({ success: false, error: "method_not_allowed" }, { status: 405 });
}
