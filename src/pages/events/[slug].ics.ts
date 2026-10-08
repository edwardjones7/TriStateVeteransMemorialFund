/**
 * /events/<id>.ics — a downloadable calendar file per event, for the
 * "Add to calendar" menus (Apple Calendar, Outlook, anything but Google).
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { icsFile } from '@/lib/eventTime';

export const getStaticPaths = (async () => {
  const events = await getCollection('events');
  return events.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as CollectionEntry<'events'>;
  return new Response(icsFile(entry), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${entry.id}.ics"`,
    },
  });
};
