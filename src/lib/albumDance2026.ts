/**
 * Dance, Buffet & More, Adelphia, Deptford NJ, November 10, 2026: the eve
 * of Veterans Day.
 *
 * Chosen from the 102-frame shared album. Like the 5K album, the order is
 * the camera's own: every frame carries a capture time between 6:55 and
 * 9:27 PM, and the chapters break where the night changed gears. The night
 * closed with Bob Pantano being named an honorary member of the TSVMF board.
 *
 * `slug` matches a file in src/assets/gallery/dance-2026/, minus its NN-
 * prefix and extension. A listed slug with no file (or the reverse) fails
 * the build.
 */
import type { AlbumChapter } from './album5k2026';

export const albumDance2026 = {
  id: 'dance-2026',
  title: 'Dance, Buffet & More',
  date: '2026-11-10',
  venue: 'Adelphia · Deptford, NJ',
  heading: 'One night at Adelphia.',
  intro:
    'The eve of Veterans Day: a full house, a buffet, a violinist, a singer in a gold jacket, and a dance floor that never went dark. In the order the night happened.',
  ticket: { price: '$25', note: 'donation · $40 per couple', dateLabel: 'Nov 10' },
  chapters: [
    {
      title: 'Doors open',
      time: '6:55 PM',
      photos: [
        { slug: 'adelphia-sign', caption: 'Adelphia lights up for the night' },
        { slug: 'welcome-table', caption: 'Our table greets guests at the door' },
        { slug: 'merch-table', caption: 'Shirts, hoodies, and buttons for the cause' },
        { slug: 'the-floor-waits', caption: 'The dance floor, waiting for its first song' },
        { slug: 'first-arrivals', caption: 'Friends gather before the crowd arrives' },
        { slug: 'early-table', caption: 'An early table, settled in' },
        { slug: 'old-friends', caption: 'Members from the board arrive' },
      ],
    },
    {
      title: 'Dinner & strings',
      time: '7:06 PM',
      photos: [
        { slug: 'full-house', caption: 'A full house in the dining room' },
        { slug: 'the-buffet', caption: 'The buffet opens' },
        { slug: 'legion-table', caption: 'Legion caps and good company' },
        { slug: 'veterans-table', caption: 'Legion members share a table' },
        { slug: 'long-table', caption: 'A long table of supporters' },
        { slug: 'three-friends', caption: 'Smiles between courses' },
        { slug: 'floor-and-room', caption: 'The lit floor and the room behind it' },
        { slug: 'violinist', caption: 'A violinist plays from the stage' },
        { slug: 'dinner-for-two', caption: 'Dinner for two' },
        { slug: 'family-table', caption: 'A family table' },
      ],
    },
    {
      title: 'The gold jacket',
      time: '8:30 PM',
      photos: [
        { slug: 'gold-jacket', caption: 'A singer in a gold jacket works the room' },
        { slug: 'table-to-table', caption: 'Table to table, mic in hand' },
        { slug: 'the-encore', caption: 'Bringing the Legion table into the song' },
        { slug: 'violinist-thanks', caption: 'Thanking the violinist after his set' },
        { slug: 'at-the-bar', caption: 'A wave from the bar' },
        { slug: 'on-their-feet', caption: 'The whole room on its feet' },
      ],
    },
    {
      title: 'On the floor',
      time: '8:49 PM',
      photos: [
        { slug: 'line-dance', caption: 'The first line dance of the night' },
        { slug: 'under-the-chandelier', caption: 'Dancing under the chandelier' },
        { slug: 'all-together', caption: 'Everyone in step' },
        { slug: 'floor-friends', caption: 'Two friends on the edge of the floor' },
        { slug: 'pink-floor', caption: 'The floor turns pink' },
        { slug: 'wide-floor', caption: 'The floor from the far corner' },
        { slug: 'one-more-song', caption: 'One more song' },
      ],
    },
    {
      title: 'An honorary board member',
      time: '9:10 PM',
      photos: [
        { slug: 'gathering', caption: 'The board gathers on the dance floor' },
        { slug: 'presentation', caption: 'A presentation on the dance floor' },
        { slug: 'the-board', caption: 'The board and friends, together on the floor' },
        { slug: 'the-plaque', caption: 'The plaque: Bob Pantano, welcomed as an honorary member of the TSVMF Board of Directors' },
        { slug: 'bob-pantano', caption: 'Bob Pantano, our newest honorary board member' },
        { slug: 'last-dance', caption: 'The last dance of the night' },
      ],
    },
  ] satisfies AlbumChapter[],
};
