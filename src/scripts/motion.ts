/**
 * Motion layer — scroll reveals, photo "develop", and the header
 * scroll state. Re-runs after every Astro view transition via the
 * `astro:page-load` event. All effects respect prefers-reduced-motion.
 */

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

function setupReveals(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  items.forEach((el) => observer.observe(el));
}

function setupDevelop(): void {
  const images = document.querySelectorAll<HTMLImageElement>('img.develop');
  images.forEach((img) => {
    const reveal = () => img.classList.add('is-developed');
    if (reduceMotion) {
      reveal();
      return;
    }
    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    }
  });
}

function setupHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  const onScroll = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupMobileNav(): void {
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;

  const open = () => {
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    menu.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) close();
  });
}

function setupVideos(): void {
  // Videos adopted during a ClientRouter swap run their resource selection
  // while the incoming document is still inert, fail with NETWORK_NO_SOURCE
  // (empty currentSrc), and stay blank until a hard refresh. load() re-runs
  // the selection now that the element is live.
  document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
    if (!video.currentSrc) video.load();
  });
}

function init(): void {
  document.documentElement.classList.add('has-js');
  document.body.style.overflow = '';
  setupReveals();
  setupDevelop();
  setupHeader();
  setupMobileNav();
  setupVideos();
}

// Fires on first load and after each view transition.
document.addEventListener('astro:page-load', init);
