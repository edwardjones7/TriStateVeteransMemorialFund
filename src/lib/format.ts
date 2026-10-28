/** Date helpers — all formatting is done in UTC so a date-only value
 *  like "2026-08-08" never shifts across a timezone boundary. */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function dateParts(date: Date): {
  month: string;
  day: string;
  year: string;
} {
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { ...opts, timeZone: 'UTC' }).format(date);
  return {
    month: fmt({ month: 'short' }).toUpperCase(),
    day: fmt({ day: 'numeric' }),
    year: fmt({ year: 'numeric' }),
  };
}

/** "Friday, November 6 – Sunday, November 8, 2026" for a multi-day event;
 *  the single date otherwise. */
export function formatDateRange(start: Date, end?: Date): string {
  if (!end || end.getTime() === start.getTime()) return formatDate(start);
  const fmt = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return `${fmt.format(start)} – ${formatDate(end)}`;
}

/** An event is "upcoming" if it falls on or after today (UTC). */
export function isUpcoming(date: Date): boolean {
  const now = new Date();
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  return date.getTime() >= todayUTC;
}

/** The day an event finishes: its end date, or its only date. Pass this to
 *  `isUpcoming` so a multi-day event stays listed through its last day. */
export function lastDay(data: { date: Date; endDate?: Date }): Date {
  return data.endDate ?? data.date;
}
