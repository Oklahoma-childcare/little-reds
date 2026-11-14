# Photo setup - Little Red's Learning Center

All photos on the website are managed through `src/lib/photos.json`. These are **illustrative licensed photos, not photos of the named facility**. The website is a review draft until the center approves its content and supplies/clears facility photographs. A minor color change or crop does NOT remove copyright.

Current slots, corresponding Pexels source pages:

| JSON key | Use | Source / license page |
| --- | --- | --- |
| `hero` | Homepage hero | https://www.pexels.com/photo/kids-playroom-with-wooden-tables-and-bunk-bed-8535156/ |
| `detail` | Hero small inset and programs hero | https://www.pexels.com/photo/wooden-toys-on-the-corner-of-the-bedroom-6692939/ |
| `about` | About/Our Center photo | https://www.pexels.com/photo/wooden-toys-and-climbing-frame-in-cozy-playroom-32720305/ |
| `infants` | Infant age card | https://www.pexels.com/photo/a-baby-bed-with-toys-decoration-6849272/ |
| `toddlers` | Toddler age card | https://www.pexels.com/photo/kid-toys-inside-a-playroom-6692930/ |
| `preschool` | Preschool age card | https://www.pexels.com/photo/kids-playing-wooden-toys-8535240/ |
| `schoolAge` | School-age age card | https://www.pexels.com/photo/room-decorated-with-children-drawings-8535142/ |
| `feature` | Optional additional image | https://www.pexels.com/photo/wooden-toys-on-the-corner-of-the-bedroom-6692939/ |

Pexels license (commercial use permitted subject to its terms): https://www.pexels.com/license/ . Images may contain recognizable people or brands; do not imply they attended or endorse the center. No third-party location-specific photographs were copied.

For approved real photographs:

1. Obtain written permission from the rights holder; obtain suitable consent for any identifiable children.
2. Put your own `.webp` files in `public/photos/`. Suggested names: `hero.webp`, `classroom.webp`, `about.webp`, `infants.webp`, `toddlers.webp`, `preschool.webp`, `school-age.webp`.
3. Update `src/lib/photos.json`, for example `"src":"/photos/hero.webp"` and rewrite alt text to describe what is genuinely pictured.
4. Run `npm run generate` (or start `npm run dev`); all pre-rendered pages update.
5. Confirm local photos load on the production domain and are compressed properly.

For performance, a typical WebP size of 1600 pixels wide for a large hero, 1000 pixels for supporting images, and 750 pixels for age cards is sufficient; keep JPG fallback only when needed. The Pexels image CDN URL currently requests scaled/compressed renditions, but local assets eliminate third-party image dependency.
