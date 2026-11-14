# Little Red's Learning Center - Prague, Oklahoma

A uniquely designed, responsive 5-page React + TypeScript website, using Vite 8, TanStack Router, Tailwind CSS 3, Lucide/Framer Motion-ready dependencies, and a **multi-page pre-renderer** for crawlable SEO content. This project is separate from Sunflower and Sunny Days designs.

**Website status:** The site is a complete *review draft*, not an authorized official website. Its visible design has no preview banners or unfinished placeholders. Search indexing is disabled until permission is received and the domain is configured. No actual Little Red's facility photographs have been licensed for inclusion.

## Pages

- `/` - Home
- `/programs/` - Child care age groups
- `/about/` - Our Center
- `/faq/` - Parent FAQs
- `/contact/` - Phone, email, directions, hours and Facebook

## Start in VS Code

Install Node.js 22 or a current release supported by Vite 8, then open the project folder:

```bash
npm install
npm run dev
```

To generate the production output:

```bash
npm run build
```

Upload **`dist/`** to Cloudflare Pages or Vercel, or connect the repository. Use framework **Vite**, build command **`npm run build`**, output directory **`dist`**, Node.js **22** (or newer supported).

## Change content

- Business contact details, program level, schedule: `src/lib/site.json`.
- All social links: `src/lib/social-links.json`. Facebook was taken from the visible Google Sheet; the account's ownership was **not independently verified**. Remove or replace it if necessary.
- All images: `src/lib/photos.json`. One JSON entry controls each image on every page.
- Page content: `src/lib/render-page.mjs`.
- Colors, shape styling and responsive design: `src/index.css`.
- Favicon: `public/favicon.svg`; share image: `public/og-card.png`.

Photo replacement example: put `/public/photos/my-classroom.webp` in the project and update the relevant entry in `src/lib/photos.json`:

```json
"hero": {
  "src": "/photos/my-classroom.webp",
  "alt": "Interior of Little Red's Learning Center classroom in Prague, Oklahoma",
  "position": "center center",
  "sourcePage": "Organization-provided photo, approved for publication"
}
```

Run `npm run generate` to update the five SEO HTML entries after editing data or text. `npm run dev` and `npm run build` also run the generator automatically.

## Publishing, indexing and domain setup

The source intentionally uses `noindex,nofollow` until authorized. Do **not** set a business domain until you have permission to represent the organization and publish its identity, photos and contact details.

Once approved:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_SITE_URL=https://YOUR-AUTHORIZED-DOMAIN.com` and `VITE_PUBLICATION_APPROVED=true`.
3. Run `npm run build`. The generator creates 5 canonical URLs, Open Graph URLs, an XML sitemap, and the public robots file.
4. Verify the deployed site on all devices, especially all images, active mobile menu, age routes and email/telephone links.
5. Submit the new domain in Google Search Console and its sitemap, and monitor indexing. Set up the Google Business Profile with authorized business ownership only.

SEO includes distinct page titles/descriptions, H1, headings, mobile navigation, pre-rendered HTML, internal linking, contextual alt text, local business structured data, FAQ structured data, Open Graph, sitemap after approval, and no-index controls.

## Source provenance

Publicly checked facts: Oklahoma Human Services license **K830058396** https://childcarefind.okdhs.org/providers/K830058396 . Name, director, location, phone, email, 3-star level, 30 capacity, accepted ages, year-round operation and Monday-Friday 7AM-6PM were verified there. The Google Sheet is the editable work queue; only the visible organization columns were used. Facebook page URL came from the sheet and is not independently authenticated.

Photo set: linked images are temporary licensed **Pexels** stock photographs illustrating childcare interiors, **not actual photographs of Little Red's Learning Center**. See `PHOTO-GUIDE.md` for the individual Pexels pages, terms, and replacement process. Do not use personal Facebook photos or street-view images unless the holder permits website reuse. Pexels license: https://www.pexels.com/license/ . Photos of identifiable children require special attention to consent and potential endorsement implications.

## Architectural and functional notes

- All five routes are pre-rendered to full HTML in the source and then compiled to Vite multi-page entries. Thus HTML is crawlable before JavaScript executes.
- TanStack Router powers navigation after React mounts. Browser refreshes work with the multi-page HTML generated for each route.
- Mobile menu JavaScript and FAQ native details work without React.
- Forms are **not** advertised as functional: phone, email and map links actually work. No unconnected contact form was invented.
- The `public/site.css` file is generated from `src/index.css`; edit the **src** file rather than the published copy.
- The `public/_headers` file contains safe security/cache headers for Cloudflare Pages.
- No `node_modules`, `.git`, `dist`, or static-preview directory is included in this ZIP.
