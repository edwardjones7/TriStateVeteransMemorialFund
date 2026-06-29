/**
 * Lightweight GA4 event tracking for the conversions that matter:
 *   - register_click  → outbound clicks to RunSignup (5K registration)
 *   - donate_click    → clicks to the PayPal donation link
 *   - plus any element with an explicit `data-track="event_name"` attribute
 *     (e.g. newsletter_signup, the event banner CTA).
 *
 * A single document-level listener (attached once) survives View Transitions,
 * so it covers elements added by client-side navigation too. No-ops when
 * analytics is disabled (window.gtag undefined).
 */
function inferEvent(el: HTMLElement): string | null {
  if (el.dataset.track) return el.dataset.track;
  const href = el.getAttribute('href') ?? '';
  if (/runsignup\.com/i.test(href)) return 'register_click';
  if (/paypal\.com/i.test(href)) return 'donate_click';
  return null;
}

function handleTrack(event: Event): void {
  const target = event.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>('a, [data-track]');
  if (!el) return;

  const name = inferEvent(el);
  if (!name) return;

  window.gtag?.('event', name, {
    link_url: el.getAttribute('href') ?? undefined,
    link_text: el.textContent?.trim().slice(0, 100) || undefined,
  });
}

document.addEventListener('click', handleTrack, { capture: true });

// Newsletter signups — fire on submit of the MailerLite embedded form.
function handleSubmit(event: Event): void {
  const form = event.target;
  if (form instanceof HTMLFormElement && form.closest('.ml-embedded')) {
    window.gtag?.('event', 'newsletter_signup');
  }
}

document.addEventListener('submit', handleSubmit, { capture: true });
