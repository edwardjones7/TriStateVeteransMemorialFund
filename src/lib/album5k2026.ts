/**
 * The 3rd Annual 5K photo album — Washington Lake Park, August 8, 2026.
 *
 * Ordering is the morning itself. Every frame carries an EXIF capture time
 * between 7:18 and 8:51 AM, so the camera already recorded the true sequence;
 * the chapters below are just where that sequence naturally breaks. (The
 * original filenames disagree with the timestamps — "flag team" is numbered
 * with the ceremony shots but was actually taken at 8:44, after the race —
 * so the numbers on disk are not a reliable order.)
 *
 * `slug` matches a file in src/assets/gallery/5k-2026/, minus its NN- prefix
 * and extension. The page globs that folder and pairs the two up, so a photo
 * listed here without a matching file (or the reverse) fails the build rather
 * than silently vanishing.
 */

export type AlbumPhoto = { slug: string; caption: string };
export type AlbumChapter = {
  title: string;
  /** Clock time the chapter opens — shown as its eyebrow. */
  time: string;
  photos: AlbumPhoto[];
};

export const album5k2026 = {
  title: '3rd Annual 5K Run & Walk',
  /** ISO date — rendered by RaceBib, which formats it for display. */
  date: '2026-08-08',
  venue: 'Washington Lake Park · Sewell, NJ',
  intro:
    'From the first tent going up to the last finisher — race morning, in the order it happened.',
  chapters: [
    {
      title: 'Before the gun',
      time: '7:18 AM',
      photos: [
        { slug: 'dog-tags', caption: 'Commemorative dog tags on the merchandise table' },
        { slug: 'course-map', caption: 'The course map, posted and ready' },
        { slug: 'colors-raised', caption: 'The colors fly from the ladder truck at sunrise' },
        { slug: 'volunteers', caption: 'Volunteers and board members before the gates open' },
        { slug: 'check-in', caption: 'The first runners check in' },
        { slug: 'supporters', caption: 'Supporters gather under the pavilion' },
        { slug: 'registration-tent', caption: 'A steady line at the registration tent' },
        { slug: 'shirt-sale', caption: 'Race shirts on offer' },
        { slug: 'shirt-pickup', caption: 'Shirt pickup, minutes before the start' },
      ],
    },
    {
      title: 'Honoring the colors',
      time: '7:54 AM',
      photos: [
        { slug: 'national-anthem', caption: 'Hands over hearts for the national anthem' },
        { slug: 'welcome', caption: 'Welcoming runners to the third annual 5K' },
      ],
    },
    {
      title: 'The start',
      time: '8:02 AM',
      photos: [
        { slug: 'the-start', caption: 'Runners break from the line' },
        { slug: 'walkers-start', caption: 'Walkers head out under the arch' },
        { slug: 'every-age', caption: 'Every age on the course — strollers included' },
      ],
    },
    {
      title: 'On the course',
      time: '8:06 AM',
      photos: [
        { slug: 'park-loop', caption: 'Out along the park loop' },
        { slug: 'tree-lined-stretch', caption: 'The tree-lined stretch through the park' },
        { slug: 'lead-pack', caption: 'The lead pack pushes on' },
        { slug: 'carrying-the-colors', caption: 'Running with the colors' },
        { slug: 'colors-over-the-course', caption: 'The flag flying over the course' },
        { slug: 'walkers-course', caption: 'Walkers make their way around the lake' },
        { slug: 'beneath-the-flag', caption: 'Passing beneath the flag' },
      ],
    },
    {
      title: 'The finish',
      time: '8:29 AM',
      photos: [
        { slug: 'crossing-the-finish', caption: 'Crossing the finish line' },
        { slug: 'after-the-race', caption: 'Catching up after the race' },
        { slug: 'finish-arch', caption: 'The finish arch at Washington Lake Park' },
        { slug: 'last-finisher', caption: 'Every finisher gets a cheer' },
        { slug: 'flag-bearers', caption: 'Flag bearers at the finish' },
        { slug: 'the-team', caption: 'The team at the TriState tent' },
      ],
    },
  ] satisfies AlbumChapter[],
};
