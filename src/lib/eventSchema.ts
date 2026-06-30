/**
 * Structured-data helpers for events — schema.org `Event` and `FAQPage`
 * JSON-LD shared by the events index and the per-event landing pages.
 * Keeping the builders here means both routes emit identical, valid markup.
 */
import type { CollectionEntry } from 'astro:content';
import { site } from '@/config/site';
import { formatDate } from '@/lib/format';

/** Root-relative path of an event's landing page — use for internal links. */
export function eventPath(entry: CollectionEntry<'events'>): string {
  return `/events/${entry.id}/`;
}

/** Absolute URL of an event's landing page — use for canonical/JSON-LD. */
export function eventUrl(entry: CollectionEntry<'events'>): string {
  return new URL(eventPath(entry), site.url).href;
}

/** Clean a Markdown body into a single-line plain-text description. */
function bodyText(entry: CollectionEntry<'events'>): string {
  return (entry.body ?? '').replace(/\s+/g, ' ').trim();
}

/**
 * Parse "626 Hurffville–Cross Keys Rd, Sewell, NJ 08080" into a schema.org
 * PostalAddress. Falls back to a single `streetAddress` when the shape is
 * unexpected so we never emit a malformed address.
 */
function postalAddress(address: string | undefined, fallbackLocality: string) {
  const base = { '@type': 'PostalAddress', addressCountry: 'US' } as const;
  if (!address) return { ...base, addressLocality: fallbackLocality };

  const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  const stateZip = parts[parts.length - 1]?.match(/^([A-Z]{2})\s+(\d{5})$/);
  if (parts.length >= 3 && stateZip) {
    return {
      ...base,
      streetAddress: parts.slice(0, -2).join(', '),
      addressLocality: parts[parts.length - 2],
      addressRegion: stateZip[1],
      postalCode: stateZip[2],
    };
  }
  return { ...base, streetAddress: address };
}

/** "City, ST" for an event, parsed from its address (falls back to HQ city). */
export function eventLocale(entry: CollectionEntry<'events'>): string {
  const a = postalAddress(entry.data.address, site.address.city) as {
    addressLocality?: string;
    addressRegion?: string;
  };
  return `${a.addressLocality ?? site.address.city}, ${a.addressRegion ?? site.address.state}`;
}

/** Pull a numeric price from a fee string ("$30" → "30", "Free" → "0"). */
function priceFromFee(fee: string | undefined): string | null {
  if (!fee) return null;
  if (/free/i.test(fee)) return '0';
  return fee.match(/(\d+(?:\.\d{1,2})?)/)?.[1] ?? null;
}

/** schema.org `Event` JSON-LD for a single event entry. */
export function eventSchema(entry: CollectionEntry<'events'>): Record<string, unknown> {
  const d = entry.data;
  const image = d.image ? new URL(d.image.src, site.url).href : undefined;
  const price = priceFromFee(d.entryFee);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: d.title,
    description: bodyText(entry) || d.title,
    startDate: d.date.toISOString().slice(0, 10),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: eventUrl(entry),
    location: {
      '@type': 'Place',
      name: d.location,
      address: postalAddress(d.address, site.address.city),
    },
    organizer: { '@type': 'Organization', name: site.name, url: site.url },
  };

  if (image) schema.image = image;

  if (d.registrationUrl) {
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      url: d.registrationUrl,
      availability: 'https://schema.org/InStock',
      category: 'Registration',
    };
    if (price !== null) {
      offer.price = price;
      offer.priceCurrency = 'USD';
    }
    schema.offers = offer;
  }

  return schema;
}

export type Faq = { question: string; answer: string };

/**
 * Question/answer pairs runners actually search for. Generated only from
 * data we can state truthfully (when/where, how to register, proceeds) plus
 * the run/walk note for 5Ks — venue-specific details (parking, packet pickup)
 * are intentionally omitted until confirmed. Returns [] for non-registerable
 * events (e.g. past archive entries).
 */
export function eventFaqs(entry: CollectionEntry<'events'>): Faq[] {
  const d = entry.data;
  if (!d.registrationUrl) return [];

  const where = d.address ? `${d.location} (${d.address})` : d.location;
  const faqs: Faq[] = [
    {
      question: `When and where is the ${d.title}?`,
      answer:
        `${d.title} takes place on ${formatDate(d.date)} at ${where}.` +
        (d.startTime ? ` ${d.startTime}.` : ''),
    },
    {
      question: 'How do I register?',
      answer:
        `Register online through RunSignup at ${d.registrationUrl}.` +
        (d.entryFee ? ` Entry is ${d.entryFee}.` : ''),
    },
  ];

  if (/5k|run|walk/i.test(d.title)) {
    faqs.push({
      question: 'Can I walk instead of run?',
      answer:
        'Yes — this is a 5K run/walk. Runners and walkers of all ages and ' +
        'abilities are welcome, so bring the whole family.',
    });
  }

  faqs.push({
    question: 'Where do the proceeds go?',
    answer:
      `All proceeds support ${site.name}'s programs for U.S. military ` +
      'veterans, including mental-health aid and PTSD service dogs.',
  });

  return faqs;
}

/** schema.org `FAQPage` JSON-LD, or null when there are no FAQs. */
export function faqSchema(faqs: Faq[]): Record<string, unknown> | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
