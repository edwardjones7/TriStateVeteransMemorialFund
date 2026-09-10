# Source images

Raw/original artwork for the site. **Nothing in this folder is read by the build.**

Astro only imports from `src/assets/` (optimized, hashed at build time) and serves
`public/` verbatim. This folder is the working archive the files in `src/assets/`
were produced from — keep it for re-crops, re-exports, and print use.

## Layout

Mirrors `src/assets/`, using the same filenames, so every original lines up with
the asset built from it:

| Here                   | Ships from                    |
| ---------------------- | ----------------------------- |
| `logo/`                | `src/assets/logo*.png`        |
| `photos/`              | `src/assets/photos/`          |
| `photos/event-flyers/` | `src/assets/photos/` (flyers) |
| `photos/team/`         | `src/assets/photos/team/`     |
| `sponsors/`            | `src/assets/sponsors/`        |
| `press/`               | `src/assets/press/`           |

`photos/event-flyers/` also keeps the print-resolution PDF each flyer image
was exported from, under the same basename.

`photos/STOCK-CREDITS.txt` records the license and source of the stock
photography in `photos/`.

## Adding an image

1. Drop the original in the matching subfolder here, named as a lowercase slug.
2. Export the web version into the same-named path under `src/assets/`.
3. Import it from a component — `src/assets/` is not served by URL.

## Notes

- 40 of these files are byte-identical to their `src/assets/` counterparts, so
  the repo carries them twice (~26 MB). They are kept deliberately as the
  archive; delete a pair member only if you no longer want the original.
- Files with no counterpart in `src/assets/`, i.e. not currently on the site:
  - `logo/logo.png`, `logo/logo-original-backup.png`, `logo/logo-upscaled-5x.png`
    — logo variants; the site ships its own `logo.png` / `logo-2x.png`.
  - `photos/team/paul-difranceisco.jpg` — 8 MB camera original.
  - `sponsors/pest-professionals.jpg`, `sponsors/ritas-italian-ice.png`
    — pre-processing versions of logos that do ship.
  - `sponsors/united-building-trades-council.png` — unused sponsor logo.
