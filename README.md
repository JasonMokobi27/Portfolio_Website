# Karabo Jason Mokobi · Remote DI Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind · Mux · deploys to Netlify.

A colourist's reel. Every page is the same two columns: a nav rail on the left,
the work on the right. The home page rotates through hand-picked stills with a
colour strip cut from each film as the scrubber, then lists the work with its
own strip per title. `/<category>` filters that list, and `/work/<slug>` gives
each film a frame you can play the trailer in, a stills strip, and its credits.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Build / typecheck:

```bash
npm run build
npm run typecheck
```

> Sandbox note: if your build environment can't reach Google Fonts, build with
> `SKIP_GOOGLE_FONTS=1 npm run build` to fall back to system fonts. On Netlify
> and normal local dev, leave it unset so the real typefaces load.

## Add or edit work: ONE file

Everything comes from **`src/content/projects.ts`**. Add an object to the
`PROJECTS` array and you automatically get: a reel card, a page at
`/work/<slug>`, a sitemap entry, and SEO/OG tags.

```ts
{
  slug: "your-film",              // → /work/your-film
  title: "Your Film",
  kind: "Feature",                // Feature | Series | Short | Music Video | Commercial
  logline: "One line under the title",
  credits: {
    role: "Colourist",            // YOUR credit, printed first in red
    format: "ARRI · ACES",        // optional; omit and the row disappears
    delivery: "DCP · Dolby Vision",
    year: "2026",
  },
  crew: [                         // the FILM's crew, one entry per job
    { role: "Director", names: ["…"] },
    { role: "Editors", names: ["…", "…"] },
  ],
  cast: [{ name: "…", as: "Character" }],
  imdb: "https://www.imdb.com/title/tt0000000/",  // omit if there's no page
  video: { youtubeId: "…", label: "Trailer" },    // plays inside the frame
  muxPlaybackId: "ABC123…",       // ← add when the clip is on Mux (see below)
  posterTime: 3,                  // seconds into the clip for the poster frame
  stills: ["MUXID1", "/stills/a.jpg"], // stills strip (Mux ids or /public paths)
  tone: { scene: "room", lift: [14,10,6], gain: [1.02,0.98,0.9], sat: 0.82, temp: 0.14 },
  published: true,                // false = hidden from the live index
}
```

`crew`, `cast`, `imdb`, `video` and `muxPlaybackId` are all optional and the
page simply drops the block when one is missing, so a film with nothing but a
colourist credit still renders cleanly. With no `stills` and no
`muxPlaybackId`, the project falls back to a **graded placeholder frame** drawn
procedurally from `tone`, so the site is complete with zero assets.

The colour strips are not hand-picked. `scripts/extract-palettes.mjs` samples
the real stills and writes `src/content/palettes.ts`; the strips are read on the
server so the palette table never ships to the browser.

### `published` flag

In production, only `published: true` projects appear in the index (if none are
marked yet, all show, so you're never staring at an empty reel). Locally, all
show. This lets you stage work-in-progress without exposing it.

## Video with Mux

1. Upload your reel clip in the [Mux dashboard](https://dashboard.mux.com) →
   create an asset.
2. Copy its **Playback ID** into the project's `muxPlaybackId`.
3. Posters are auto-generated from the clip (`image.mux.com`), so you don't
   upload a separate still.

Public playback IDs need no keys at build time. For signed playback, add
`MUX_TOKEN_ID` / `MUX_TOKEN_SECRET` (see `.env.example`) and switch the player
to signed mode.

## Deploy to Netlify

`netlify.toml` is included with the official Next runtime plugin.

- Push to a Git repo → "Add new site" → pick the repo. Build command and
  publish dir are read from `netlify.toml`.
- Or drag-and-drop won't work for SSR; use Git or the Netlify CLI:
  ```bash
  npm i -g netlify-cli
  netlify deploy --build --prod
  ```
- Point your domain (mokobi.digital) at the Netlify site in DNS settings.

## SEO / indexing

- `generateMetadata` per project → unique `<title>`, description, canonical, OG.
- `app/sitemap.ts` → `/sitemap.xml` listing every project.
- `app/robots.ts` → `/robots.txt` pointing at the sitemap.
- `layout.tsx` → JSON-LD `Person` structured data.

## Design system

Darkroom palette (ink / silver-halide / safelight red / densitometer cyan) and
type scale live in `tailwind.config.ts`. The film-grain veil and focus/selection
styles are in `src/app/globals.css`.

## Structure

```
src/
  app/
    layout.tsx            root: fonts, base SEO, JSON-LD, grain
    page.tsx              home: hero carousel + intro + work rows
    [category]/page.tsx   Shorts / Features & Series / Music & Commercials
    work/[slug]/page.tsx  project route: SSG + per-page metadata
    sitemap.ts robots.ts not-found.tsx
    fonts.ts globals.css
  components/
    Rail.tsx              left nav, shared by every page
    HeroReel.tsx          home carousel; the colour strip is the scrubber
    WorkRows.tsx          the work list, one colour strip per title
    ProjectView.tsx       per-project: frame + stills + credits
    FrameViewer.tsx       YouTube embed / Mux clip / still, with film perfs
    ColourStrip.tsx       a run of swatches cut from one film
  content/
    projects.ts           ← THE ONE FILE YOU EDIT
    palettes.ts           generated by scripts/extract-palettes.mjs
  lib/                    data access, palette lookup, placeholder engine
```
