/**
 * Site-wide constants. Single source of truth for contact details,
 * navigation, and external links — referenced everywhere so a change
 * here propagates across the whole site.
 */

export const site = {
  name: 'TriState Veterans Memorial Fund',
  shortName: 'TriState VMF',
  url: 'https://www.tristateveteransmemorialfund.org',
  description:
    'A 501(c)(3) nonprofit honoring and supporting U.S. military veterans across South Jersey, Southeastern Pennsylvania, and Northern Delaware — through mental-health aid, PTSD service dogs, and community.',
  founded: 2023, // Confirmed with client.

  // Confirmed with client: (856) 270-8440 is correct (Facebook's 370 listing is wrong).
  phone: '(856) 270-8440',
  phoneHref: 'tel:+18562708440',

  email: 'tristatevmf@gmail.com',

  address: {
    line1: '321 Theis Rd.',
    city: 'Sewell',
    state: 'NJ',
    zip: '08080',
    full: '321 Theis Rd., Sewell, NJ 08080',
    note: 'Co-located with VFW Post 6332 & American Legion Post 521 in the former Washington Township firehouse.',
  },
  mailing: 'P.O. Box 8662, Sewell, NJ 08080',

  hours: 'Always open',

  radio: '1210 AM',

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61553187641153',
    youtube: 'https://www.youtube.com/@TriStateVeteransMemorialFund',
  },

  /*
   * PayPal Giving Fund charity page for the Fund. Replaces the earlier
   * /donate/?business=… checkout link, which was broken. PayPal hosts the
   * page, so the donor picks the amount and PayPal passes on 100% of it —
   * nothing here to keep in sync but the charity id.
   */
  donateUrl: 'https://www.paypal.com/US/fundraiser/charity/5282334',
} as const;

/** Primary navigation (header). Donate is rendered separately as the CTA. */
export const primaryNav = [
  { label: 'Our Mission', href: '/mission' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: "Veterans Corner", href: '/veterans-corner' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Meet the Team', href: '/team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Shop', href: '/shop' },
] as const;

/** Secondary links surfaced in the footer + mobile menu. */
export const secondaryNav = [
  { label: 'Honor Roll', href: '/honor' },
  { label: 'Contact', href: '/contact' },
] as const;

export type NavItem = { label: string; href: string };
