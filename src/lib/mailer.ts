import nodemailer, { type Transporter } from "nodemailer";
import { EMAILS } from "@/lib/contact";

/**
 * Envoi des e-mails transactionnels (formulaires contact / réservation, newsletter).
 *
 * Transport choisi au moment de l'envoi, dans cet ordre :
 *  1. SMTP (nodemailer) si SMTP_HOST, SMTP_USER et SMTP_PASS sont définis
 *     — ex. Hostinger : SMTP_HOST=smtp.hostinger.com, SMTP_PORT=465, SMTP_SECURE=true,
 *       SMTP_USER=noreply@greentechcycle.fr, SMTP_PASS=<secret> ;
 *  2. Resend si RESEND_API_KEY est défini ;
 *  3. sinon aucun envoi (la demande reste enregistrée, l'échec est journalisé).
 *
 * Expéditeur : MAIL_FROM, sinon « GreenTechCycle <noreply@greentechcycle.fr> ». Avec SMTP,
 * l'adresse d'expédition doit être celle du compte SMTP_USER (sinon le serveur refuse ou
 * le message part en spam) : par défaut on l'aligne donc sur SMTP_USER.
 */

export type MailTransport = "smtp" | "resend" | "none";

export interface MailAttachment {
  filename: string;
  /** Contenu brut (texte), encodé en base64 automatiquement pour le transport qui l'exige (Resend). */
  content: string;
  contentType: string;
}

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  /** Réponse directe au demandeur depuis la boîte interne */
  replyTo?: string;
  attachments?: MailAttachment[];
}

let smtp: Transporter | null = null;

export function mailTransport(): MailTransport {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  if (process.env.RESEND_API_KEY) return "resend";
  return "none";
}

function fromAddress(transport: MailTransport): string {
  if (process.env.MAIL_FROM) return process.env.MAIL_FROM;
  if (process.env.RESEND_FROM && transport === "resend") return process.env.RESEND_FROM;
  const address = transport === "smtp" ? process.env.SMTP_USER || EMAILS.noreply : EMAILS.noreply;
  return `GreenTechCycle <${address}>`;
}

function smtpTransporter(): Transporter {
  if (smtp) return smtp;
  const port = Number(process.env.SMTP_PORT || 465);
  // SMTP_SECURE=true → TLS implicite (port 465) ; false → STARTTLS (port 587)
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  smtp = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return smtp;
}

/** Envoie un e-mail ; renvoie false (et journalise) en cas d'échec, sans lever d'exception. */
export async function sendMail(message: MailMessage): Promise<boolean> {
  const transport = mailTransport();
  if (transport === "none") return false;
  const from = fromAddress(transport);

  if (transport === "smtp") {
    try {
      await smtpTransporter().sendMail({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        replyTo: message.replyTo,
        attachments: message.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content,
          contentType: a.contentType,
        })),
      });
      return true;
    } catch (err) {
      console.error("[mailer] SMTP send failed", err instanceof Error ? err.message : err);
      return false;
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        ...(message.attachments?.length
          ? {
              attachments: message.attachments.map((a) => ({
                filename: a.filename,
                content: Buffer.from(a.content, "utf8").toString("base64"),
              })),
            }
          : {}),
      }),
    });
    if (!res.ok) {
      console.error("[mailer] Resend failed", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mailer] Resend exception", err instanceof Error ? err.message : err);
    return false;
  }
}
