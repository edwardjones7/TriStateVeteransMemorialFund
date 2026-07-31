/**
 * Sponsor logo lookup, shared by SponsorGrid and the footer strip.
 * Logo files live in src/assets/sponsors/<id>.png where <id> matches
 * the sponsor's id in src/content/sponsors.json.
 */
const logos = import.meta.glob<ImageMetadata>('../assets/sponsors/*.png', {
  eager: true,
  import: 'default',
});

export const sponsorLogo = (id: string): ImageMetadata | undefined =>
  logos[`../assets/sponsors/${id}.png`];
