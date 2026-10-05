/**
 * Grille de créneaux de rendez-vous — Europe/Paris, jours ouvrés, 30 minutes,
 * 9h00-18h00, au moins 24h à l'avance (assignation Charlie, 2026-10-05, suite
 * à reports/reservations-demo-gtc.md : il n'existait auparavant aucune date/heure
 * réelle de rendez-vous, seulement des préférences larges).
 *
 * Aucune dépendance de date externe (date-fns-tz, luxon…) : la conversion
 * heure murale Europe/Paris ↔ UTC se fait avec Intl.DateTimeFormat (API native),
 * avec une correction en deux passes pour les changements d'heure (DST).
 */

export const SLOT_DURATION_MINUTES = 30;
export const BUSINESS_START_HOUR = 9;
export const BUSINESS_END_HOUR = 18;
export const MIN_LEAD_HOURS = 24;
const SLOT_TIMEZONE = "Europe/Paris";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Décalage Europe/Paris − UTC (en minutes) pour l'instant UTC donné. */
function parisOffsetMinutes(utcInstant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SLOT_TIMEZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(utcInstant)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((asIfUtc - utcInstant.getTime()) / 60000);
}

/** Instant UTC correspondant à une heure murale Europe/Paris (correction DST à 2 passes). */
function parisWallTimeToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset1 = parisOffsetMinutes(new Date(naiveUtcMs));
  let instant = new Date(naiveUtcMs - offset1 * 60000);
  const offset2 = parisOffsetMinutes(instant);
  if (offset2 !== offset1) instant = new Date(naiveUtcMs - offset2 * 60000);
  return instant;
}

function parisDateParts(utcInstant: Date): { year: number; month: number; day: number; weekday: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SLOT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })
    .formatToParts(utcInstant)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: weekdayMap[parts.weekday ?? ""] ?? -1,
  };
}

function isBusinessWeekday(weekday: number): boolean {
  return weekday >= 1 && weekday <= 5;
}

export type SlotCandidate = {
  /** Instant exact du début du créneau, prêt pour `new Date(iso)`. */
  iso: string;
  /** Jour au format YYYY-MM-DD en heure de Paris, pour grouper l'affichage. */
  parisDay: string;
};

/**
 * Génère les créneaux disponibles pour les `businessDaysAhead` prochains jours ouvrés
 * (hors week-ends), de 9h00 à 17h30 (dernier départ pour un rendez-vous de 30 min se
 * terminant à 18h00), en excluant tout créneau à moins de `MIN_LEAD_HOURS` heures.
 */
export function generateAvailableSlots(
  businessDaysAhead = 10,
  now: Date = new Date()
): SlotCandidate[] {
  const minLeadInstant = now.getTime() + MIN_LEAD_HOURS * 3600_000;
  const out: SlotCandidate[] = [];
  let cursor = new Date(now.getTime());
  let foundDays = 0;
  let scannedDays = 0;
  // garde-fou : au plus 4 semaines calendaires scannées pour trouver les jours ouvrés demandés
  while (foundDays < businessDaysAhead && scannedDays < businessDaysAhead * 3) {
    const { year, month, day, weekday } = parisDateParts(cursor);
    if (isBusinessWeekday(weekday)) {
      const parisDay = `${year}-${pad2(month)}-${pad2(day)}`;
      for (
        let totalMin = BUSINESS_START_HOUR * 60;
        totalMin <= BUSINESS_END_HOUR * 60 - SLOT_DURATION_MINUTES;
        totalMin += SLOT_DURATION_MINUTES
      ) {
        const hour = Math.floor(totalMin / 60);
        const minute = totalMin % 60;
        const instant = parisWallTimeToUtc(year, month, day, hour, minute);
        if (instant.getTime() >= minLeadInstant) {
          out.push({ iso: instant.toISOString(), parisDay });
        }
      }
      foundDays += 1;
    }
    cursor = new Date(cursor.getTime() + 24 * 3600_000);
    scannedDays += 1;
  }
  return out;
}

/**
 * Valide côté serveur qu'une chaîne ISO correspond bien à un créneau réel de la grille :
 * jour ouvré Europe/Paris, aligné sur une demi-heure entre 9h00 et 17h30, à au moins
 * `MIN_LEAD_HOURS` heures de l'instant présent. Défend contre une charge utile manipulée.
 */
export function isValidFutureSlot(iso: string, now: Date = new Date()): boolean {
  const instant = new Date(iso);
  if (Number.isNaN(instant.getTime())) return false;
  if (instant.getTime() < now.getTime() + MIN_LEAD_HOURS * 3600_000) return false;

  const { weekday } = parisDateParts(instant);
  if (!isBusinessWeekday(weekday)) return false;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SLOT_TIMEZONE,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
    .formatToParts(instant)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  const hour = Number(parts.hour) === 24 ? 0 : Number(parts.hour);
  const minute = Number(parts.minute);
  if (minute !== 0 && minute !== 30) return false;
  const totalMinutes = hour * 60 + minute;
  if (totalMinutes < BUSINESS_START_HOUR * 60) return false;
  if (totalMinutes > BUSINESS_END_HOUR * 60 - SLOT_DURATION_MINUTES) return false;
  return true;
}
