/**
 * Génération d'invitations calendaires .ics (RFC 5545), METHOD:REQUEST, pour que
 * le destinataire puisse l'ajouter à Outlook/Google Calendar/Apple Calendar en un clic.
 * Pas de dépendance externe (ics/ical-generator) : le format est simple et stable.
 */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Formate un instant UTC au format iCalendar `YYYYMMDDTHHMMSSZ`. */
function icsUtcStamp(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    pad2(date.getUTCMonth() + 1) +
    pad2(date.getUTCDate()) +
    "T" +
    pad2(date.getUTCHours()) +
    pad2(date.getUTCMinutes()) +
    pad2(date.getUTCSeconds()) +
    "Z"
  );
}

/** Échappe les caractères spéciaux iCalendar dans un champ texte (TEXT, RFC 5545 §3.3.11). */
function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Replie les lignes dépassant 75 octets, avec continuation par espace (RFC 5545 §3.1). */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  let first = true;
  while (rest.length > 0) {
    const width = first ? 75 : 74;
    chunks.push(rest.slice(0, width));
    rest = rest.slice(width);
    first = false;
  }
  return chunks.join("\r\n ");
}

export type IcsInvite = {
  uid: string;
  start: Date;
  durationMinutes: number;
  title: string;
  description: string;
  organizerEmail: string;
  organizerName?: string;
  attendeeEmail: string;
  attendeeName?: string;
  sequence?: number;
  /** "REQUEST" pour une invitation initiale, "CANCEL" pour une annulation. */
  method?: "REQUEST" | "CANCEL";
};

/** Construit le contenu texte d'une invitation .ics avec un seul VEVENT. */
export function buildIcsInvite(invite: IcsInvite): string {
  const method = invite.method ?? "REQUEST";
  const end = new Date(invite.start.getTime() + invite.durationMinutes * 60_000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GreenTechCycle//Reservation//FR",
    `METHOD:${method}`,
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${invite.uid}`,
    `SEQUENCE:${invite.sequence ?? 0}`,
    `DTSTAMP:${icsUtcStamp(new Date())}`,
    `DTSTART:${icsUtcStamp(invite.start)}`,
    `DTEND:${icsUtcStamp(end)}`,
    `SUMMARY:${icsEscape(invite.title)}`,
    `DESCRIPTION:${icsEscape(invite.description)}`,
    `ORGANIZER;CN=${icsEscape(invite.organizerName ?? "GreenTechCycle")}:mailto:${invite.organizerEmail}`,
    `ATTENDEE;CN=${icsEscape(invite.attendeeName ?? invite.attendeeEmail)};RSVP=TRUE:mailto:${invite.attendeeEmail}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
