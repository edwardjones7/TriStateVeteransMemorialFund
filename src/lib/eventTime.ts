/**
 * Event clock helpers — turn an event's date + "11:00 AM" start time into a
 * real instant in Eastern time, and build calendar links from it. Everything
 * resolves to UTC epoch values at build time so the browser (and calendar
 * apps) never have to guess the timezone.
 */
import type { CollectionEntry } from 'astro:content';
import { site } from '@/config/site';
import { eventUrl } from '@/lib/eventSchema';

/** Calendar entries without a stated end run this long. */
const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

/** Milliseconds that America/New_York wall-clock is ahead of UTC at `at`. */
export function nyAheadMs(at: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const p = Object.fromEntries(
    dtf.formatToParts(at).map((part) => [part.type, part.value]),
  );
  const asUTC = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour),
    Number(p.minute),
    Number(p.second),
  );
  return asUTC - at.getTime();
}

/** Epoch ms of `hour:minute` Eastern on a date-only value. */
export function easternAt(date: Date, hour: number, minute = 0): number {
  const wall = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    hour,
    minute,
  );
  return wall - nyAheadMs(new Date(wall));
}

/** Parse "6:00 PM" / "11 AM" into 24h hour + minute; null if unreadable. */
export function parseClock(
  text: string | undefined,
): { hour: number; minute: number } | null {
  const m = text?.match(/(\d{1,2})(?::(\d{2}))?\s*([AP])\.?M/i);
  if (!m) return null;
  let hour = Number(m[1]) % 12;
  if (m[3].toUpperCase() === 'P') hour += 12;
  return { hour, minute: Number(m[2] ?? 0) };
}

/** Epoch ms the event starts, or null when it has no start time. */
export function eventStartMs(entry: CollectionEntry<'events'>): number | null {
  const t = parseClock(entry.data.startTime);
  return t ? easternAt(entry.data.date, t.hour, t.minute) : null;
}

/** 20261107T160000Z */
const utcStamp = (ms: number) =>
  new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
/** 20261107 */
const dayStamp = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');

function where(entry: CollectionEntry<'events'>): string {
  const d = entry.data;
  return d.address ? `${d.location}, ${d.address}` : d.location;
}

function details(entry: CollectionEntry<'events'>): string {
  const body = (entry.body ?? '').replace(/\s+/g, ' ').trim();
  return [body, `Details: ${eventUrl(entry)}`].filter(Boolean).join('\n\n');
}

/** Start/end pair in the formats calendars expect (all-day when untimed). */
function span(entry: CollectionEntry<'events'>) {
  const start = eventStartMs(entry);
  if (start !== null) {
    return {
      allDay: false,
      start: utcStamp(start),
      end: utcStamp(start + DEFAULT_DURATION_MS),
    };
  }
  const next = new Date(entry.data.date.getTime() + 86_400_000);
  return { allDay: true, start: dayStamp(entry.data.date), end: dayStamp(next) };
}

/** Prefilled "add event" link for Google Calendar. */
export function googleCalendarUrl(entry: CollectionEntry<'events'>): string {
  const s = span(entry);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: entry.data.title,
    dates: `${s.start}/${s.end}`,
    details: details(entry),
    location: where(entry),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Root-relative path of the event's downloadable .ics file. */
export function icsPath(entry: CollectionEntry<'events'>): string {
  return `/events/${entry.id}.ics`;
}

/** RFC 5545 text escaping. */
const esc = (v: string) =>
  v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Fold content lines at 75 octets, as RFC 5545 requires. */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let cur = '';
  let len = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (len + n > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = '';
      len = 0;
    }
    cur += ch;
    len += n;
  }
  out.push(cur);
  return out.join('\r\n ');
}

/** A single-event iCalendar file — opens in Apple Calendar and Outlook. */
export function icsFile(entry: CollectionEntry<'events'>): string {
  const s = span(entry);
  const host = new URL(site.url).hostname.replace(/^www\./, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${site.name}//Events//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${entry.id}@${host}`,
    `DTSTAMP:${utcStamp(Date.now())}`,
    s.allDay ? `DTSTART;VALUE=DATE:${s.start}` : `DTSTART:${s.start}`,
    s.allDay ? `DTEND;VALUE=DATE:${s.end}` : `DTEND:${s.end}`,
    `SUMMARY:${esc(entry.data.title)}`,
    `LOCATION:${esc(where(entry))}`,
    `DESCRIPTION:${esc(details(entry))}`,
    `URL:${eventUrl(entry)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}
