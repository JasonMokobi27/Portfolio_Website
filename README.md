# Karabo Jason Mokobi — Remote DI Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind · Mux · deploys to Netlify.

A colourist's reel: a full-bleed landing, a server-rendered reel index, and a
deep-linkable, indexed page per project (`/work/<slug>`) with a motion hero,
contact strip, and a credits/look dossier.

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

## Add or edit work — ONE file

Everything comes from **`src/content/projects.ts`**. Add an object to the
`PROJECTS` array and you automatically get: a reel card, a page at
`/work/<slug>`, a sitemap entry, and SEO/OG tags.

```ts
{
  slug: "your-film",              // → /work/your-film
  title: "Your Film",
  kind: "Feature",
  logline: "One line under the title",
  look: "The grade note shown in the dossier.",
  credits: {
    role: "Colourist · HDR",      // your role
    director: "…", dp: "…",       // the FILM's crew (optional; "" hides the row)
    format: "ARRI · ACES",
    delivery: "DCP · Dolby Vision",
    year: "2026",
  },
  muxPlaybackId: "ABC123…",       // ← add when the clip is on Mux (see below)
  posterTime: 3,                  // seconds into the clip for the poster frame
  stills: ["MUXID1", "/stills/a.jpg"], // contact strip (Mux ids or /public paths)
  tone: { scene: "room", lift: [14,10,6], gain: [1.02,0.98,0.9], sat: 0.82, temp: 0.14 },
  published: true,                // false = hidden from the live index
}
```

Until `muxPlaybackId` is set, the project shows a **graded placeholder frame**
(procedurally drawn from `tone`) so the site is complete with zero assets.

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
    page.tsx              home: reel + landing
    work/[slug]/page.tsx  project route: SSG + per-page metadata
    sitemap.ts robots.ts not-found.tsx
    fonts.ts globals.css
  components/
    Reel.tsx              server-rendered index
    Landing.tsx           full-bleed hero
    Stage.tsx             per-project: viewer + strip + toolbar + dossier
    FrameViewer.tsx       Mux player / placeholder fallback
    Dossier.tsx           credits + look + contact
  content/projects.ts     ← THE ONE FILE YOU EDIT
  lib/                     data access + placeholder engine
```
