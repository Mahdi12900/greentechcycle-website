"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { generateAvailableSlots } from "@/lib/slots";

/**
 * Sélecteur de créneau réel (date + heure, Europe/Paris, jours ouvrés, 30 minutes,
 * 9h-18h, au moins 24h à l'avance). Un seul <select> avec un <optgroup> par jour :
 * accessible, clavier, mobile, sans dépendance de calendrier custom.
 */
export default function SlotPicker({
  id,
  label,
  hint,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
}) {
  const locale = useLocale();
  // Générée une fois par montage : suffisant pour la durée d'un remplissage de formulaire.
  const slots = useMemo(() => generateAvailableSlots(), []);

  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeZone: "Europe/Paris", weekday: "short", day: "numeric", month: "short" }),
    [locale]
  );
  const timeFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }),
    [locale]
  );

  const groups = useMemo(() => {
    const byDay = new Map<string, typeof slots>();
    for (const s of slots) {
      const arr = byDay.get(s.parisDay);
      if (arr) arr.push(s);
      else byDay.set(s.parisDay, [s]);
    }
    return Array.from(byDay.entries()).map(([day, items]) => ({ day, items }));
  }, [slots]);

  const field =
    "mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body text-fg focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-fg">
        {label} <span aria-hidden="true">*</span>
      </label>
      {hint && <p className="mt-1 text-caption text-fg-muted">{hint}</p>}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`${field} ${error ? "border-danger bg-amber-dim" : ""}`}
      >
        <option value="">-</option>
        {groups.map((g) => (
          <optgroup key={g.day} label={dayFormatter.format(new Date(g.items[0].iso))}>
            {g.items.map((s) => (
              <option key={s.iso} value={s.iso}>
                {timeFormatter.format(new Date(s.iso))}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {error && <p className="mt-1.5 text-caption text-danger">{error}</p>}
    </div>
  );
}
