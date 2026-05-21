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
