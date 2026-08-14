/* ────────────────────────────────────────────────────────────────
   THE ONLY FILE YOU EDIT TO ADD OR CHANGE WORK.

   Each Project becomes:
     • a card in the reel index
     • a deep-linkable page at /work/<slug>
     • an entry in sitemap.xml + JSON-LD structured data

   To publish a real reel:
     1. Upload the clip to Mux → copy its Playback ID into `muxPlaybackId`.
     2. (Optional) add still Playback IDs or /public image paths to `stills`.
     3. Fill the credits you're cleared to show. Leave "" to hide a row.
   Until a muxPlaybackId is present, the card renders a graded
   placeholder frame and is flagged { published:false } so you can keep
   it out of the live index by filtering (see lib/projects.ts).
──────────────────────────────────────────────────────────────── */

export type Credit = {
  director?: string;
  dp?: string;
  production?: string;
  role: string;        // your role, e.g. "Colourist" / "Colourist · Finishing"
  format?: string;     // "35mm 2-perf", "ARRI / ACES", …
  delivery?: string;   // "DCP · Dolby Vision", "IMF · 1000-nit", …
  year: string;
};

export type Project = {
  slug: string;                 // URL: /work/<slug>
  title: string;
  kind: string;                 // "Feature", "Short", "Series", "Commercial"
  logline: string;              // one line under the title
  look: string;                 // the grade note shown in the dossier
  credits: Credit;
  muxPlaybackId?: string;       // Mux playback id for the reel clip
  posterTime?: number;          // seconds into the clip to freeze for the poster
  stills?: string[];            // Mux still ids OR /public paths for the contact strip
  tone: Tone;                   // procedural placeholder look (used until real assets land)
  published?: boolean;          // set true when it's cleared to show live
};

/* Placeholder look engine — a colour transform applied to a drawn scene,
   so the site ships zero assets yet shows distinct, in-gamut grades.
   Delete a project's `tone` once it has real stills; nothing else changes. */
export type Tone = {
  scene: "room" | "window" | "portrait" | "coast";
  lift: [number, number, number];
  gain: [number, number, number];
  sat: number;
  temp: number;
};

export const PROJECTS: Project[] = [
  /* ── Migrated from the previous HTML portfolio build. Loglines & "look"
     copy below are DRAFTS written for review — edit freely before publishing.
     Set published:true once cleared to go live.
     Project order and each stills[] array are ranked strongest → weakest
     (lead/hero still first) per a visual-craft review. ── */
  {
    slug: "lars-mikael",
    title: "Lars & Mikael",
    kind: "Series",
    logline: "Series · a Scandinavian two-hander in cold northern light",
    look: "Cold Scandinavian light — desaturated blues and greys through the exteriors, skin protected and kept honest against the chill, contrast restrained to hold the show's slower, observational rhythm across episodes.",
    credits: { role: "Colourist", year: "2026" },
    stills: ["/work/lars-mikael/lars-mikael-06.jpg", "/work/lars-mikael/lars-mikael-05.jpg", "/work/lars-mikael/lars-mikael-01.jpg", "/work/lars-mikael/lars-mikael-03.jpg", "/work/lars-mikael/lars-mikael-07.jpg", "/work/lars-mikael/lars-mikael-08.jpg", "/work/lars-mikael/lars-mikael-02.jpg", "/work/lars-mikael/lars-mikael-04.jpg", "/work/lars-mikael/lars-mikael-16.jpg", "/work/lars-mikael/lars-mikael-19.jpg", "/work/lars-mikael/lars-mikael-11.jpg", "/work/lars-mikael/lars-mikael-12.jpg", "/work/lars-mikael/lars-mikael-13.jpg", "/work/lars-mikael/lars-mikael-18.jpg", "/work/lars-mikael/lars-mikael-15.jpg", "/work/lars-mikael/lars-mikael-10.jpg"],
    tone: { scene: "room", lift: [-2, 0, 6], gain: [0.96, 1, 1.04], sat: 0.85, temp: -0.06 },
    published: false,
  },
  {
    slug: "rockweed",
    title: "Rockweed",
    kind: "Feature",
    logline: "Feature",
    look: "",
    credits: { role: "Colourist", year: "2026" },
    stills: ["/work/rockweed/rockweed-12.jpg", "/work/rockweed/rockweed-32.jpg", "/work/rockweed/rockweed-11.jpg", "/work/rockweed/rockweed-23.jpg", "/work/rockweed/rockweed-17.jpg", "/work/rockweed/rockweed-15.jpg", "/work/rockweed/rockweed-21.jpg", "/work/rockweed/rockweed-35.jpg", "/work/rockweed/rockweed-09.jpg", "/work/rockweed/rockweed-19.jpg", "/work/rockweed/rockweed-20.jpg", "/work/rockweed/rockweed-16.jpg", "/work/rockweed/rockweed-18.jpg", "/work/rockweed/rockweed-07.jpg", "/work/rockweed/rockweed-28.jpg", "/work/rockweed/rockweed-04.jpg", "/work/rockweed/rockweed-30.jpg", "/work/rockweed/rockweed-31.jpg"],
    tone: { scene: "coast", lift: [-4, 0, 6], gain: [0.94, 0.98, 1.06], sat: 0.9, temp: -0.08 },
    published: false,
  },
  {
    slug: "illicit-affection",
    title: "Illicit Affection",
    kind: "Short",
    logline: "Short drama · a clandestine romance unravelling in stolen hours",
    look: "Intimate low-key drama — warm skin held against cool, shadowed interiors, contrast softened through the mid-tones so close-ups stay tender rather than clinical. Cut and graded together to keep the emotional rhythm intact from edit to colour.",
    credits: { role: "Editor & Colourist", year: "2024" },
    stills: ["/work/illicit-affection/illicit-affection-02.jpg", "/work/illicit-affection/illicit-affection-07.jpg", "/work/illicit-affection/illicit-affection-04.jpg", "/work/illicit-affection/illicit-affection-08.jpg", "/work/illicit-affection/illicit-affection-03.jpg", "/work/illicit-affection/illicit-affection-01.jpg", "/work/illicit-affection/illicit-affection-05.jpg", "/work/illicit-affection/illicit-affection-06.jpg"],
    tone: { scene: "portrait", lift: [10, 4, 0], gain: [1.02, 0.98, 0.92], sat: 0.88, temp: 0.1 },
    published: false,
  },
  {
    slug: "back-to-bedwin-farm",
    title: "Back to Bedwin Farm",
    kind: "Short",
    logline: "Short · a rural homecoming set between the farm and the recording booth",
    look: "",
    credits: { role: "Colourist", year: "2025" },
    stills: ["/work/back-to-bedwin-farm/back-to-bedwin-farm-03.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-02.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-09.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-05.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-06.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-13.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-10.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-12.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-07.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-14.jpg"],
    tone: { scene: "portrait", lift: [0, 0, 2], gain: [1, 1, 1.02], sat: 0.9, temp: -0.04 },
    published: false,
  },
  {
    slug: "forgotten-city",
    title: "Forgotten City",
    kind: "Music Video",
    logline: "Music video · nostalgia and urban decay set to rhythm",
    look: "Bleached-out nostalgia — highlights rolled soft and slightly warm, shadows kept a little muddy and desaturated to read as memory rather than document.",
    credits: { role: "Colourist", year: "2025" },
    stills: ["/work/forgotten-city/forgotten-city-01.jpg", "/work/forgotten-city/forgotten-city-07.jpg", "/work/forgotten-city/forgotten-city-04.jpg", "/work/forgotten-city/forgotten-city-02.jpg", "/work/forgotten-city/forgotten-city-03.jpg", "/work/forgotten-city/forgotten-city-06.jpg", "/work/forgotten-city/forgotten-city-05.jpg"],
    tone: { scene: "window", lift: [8, 4, -2], gain: [1.04, 1, 0.9], sat: 0.8, temp: 0.08 },
    published: false,
  },
  {
    slug: "where-the-stars-meet-the-sea",
    title: "Where the Stars Meet the Sea",
    kind: "Short",
    logline: "Short film · a coastal nocturne between two people and the tide",
    look: "A dreamlike coastal nocturne — deep blue-black skies and water graded close together so the horizon dissolves, with a single warm source (firelight, headlights, a window) kept as the only point of contrast.",
    credits: { role: "Colourist", year: "2025" },
    stills: ["/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-03.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-07.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-02.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-04.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-01.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-08.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-06.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-05.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-10.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-12.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-14.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-13.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-09.jpg"],
    tone: { scene: "coast", lift: [-6, 0, 8], gain: [0.92, 0.98, 1.1], sat: 0.9, temp: -0.14 },
    published: false,
  },
  {
    slug: "alfa-romeo",
    title: "Alfa Romeo",
    kind: "Commercial",
    logline: "Spec commercial · automotive gloss, speed, and reflection",
    look: "Glossy automotive grade — deep, controlled blacks on the paintwork, specular highlights kept crisp and cool, a touch of teal pulled into the environment to set the metal apart from the world around it.",
    credits: { role: "Colourist", year: "2025" },
    stills: ["/work/alfa-romeo/alfa-romeo-04.jpg", "/work/alfa-romeo/alfa-romeo-02.jpg", "/work/alfa-romeo/alfa-romeo-01.jpg", "/work/alfa-romeo/alfa-romeo-03.jpg", "/work/alfa-romeo/alfa-romeo-05.jpg"],
    tone: { scene: "window", lift: [-4, -2, 2], gain: [0.98, 1, 1.06], sat: 1.05, temp: -0.1 },
    published: false,
  },
  {
    slug: "heatwave",
    title: "Heatwave",
    kind: "Short",
    logline: "Short film · a sun-scorched summer heat that won't break",
    look: "Sun-scorched summer heat — highlights allowed to bloom and clip a little for a shimmering-air feel, saturation pushed in the greens with skin kept golden, contrast held high enough to feel the heat rather than just see it.",
    credits: { role: "Editor & Colourist", year: "2025" },
    stills: ["/work/heatwave/heatwave-01.jpg", "/work/heatwave/heatwave-04.jpg", "/work/heatwave/heatwave-08.jpg", "/work/heatwave/heatwave-03.jpg", "/work/heatwave/heatwave-07.jpg", "/work/heatwave/heatwave-06.jpg", "/work/heatwave/heatwave-05.jpg", "/work/heatwave/heatwave-02.jpg", "/work/heatwave/heatwave-17.jpg", "/work/heatwave/heatwave-12.jpg", "/work/heatwave/heatwave-16.jpg", "/work/heatwave/heatwave-15.jpg", "/work/heatwave/heatwave-14.jpg", "/work/heatwave/heatwave-11.jpg"],
    tone: { scene: "window", lift: [6, 2, -4], gain: [1.1, 1.02, 0.86], sat: 1.1, temp: 0.2 },
    published: false,
  },
  {
    slug: "kill-em-now",
    title: "Kill 'Em Now",
    kind: "Feature",
    logline: "Feature crime-thriller · pulpy, high-contrast noir",
    look: "High-contrast pulp noir — blacks crushed hard with a cold steel bias, hot practical neons left to bloom instead of tamed, skin held warm against a desaturated world so the violence reads in colour. Grain pushed up in the shadows for a grindhouse bite.",
    credits: { role: "Colourist", year: "2025" },
    stills: ["/work/kill-em-now/kill-em-now-02.jpg", "/work/kill-em-now/kill-em-now-08.jpg", "/work/kill-em-now/kill-em-now-05.jpg", "/work/kill-em-now/kill-em-now-03.jpg", "/work/kill-em-now/kill-em-now-01.jpg", "/work/kill-em-now/kill-em-now-07.jpg", "/work/kill-em-now/kill-em-now-06.jpg", "/work/kill-em-now/kill-em-now-04.jpg", "/work/kill-em-now/kill-em-now-12.jpg", "/work/kill-em-now/kill-em-now-14.jpg", "/work/kill-em-now/kill-em-now-16.jpg", "/work/kill-em-now/kill-em-now-18.jpg", "/work/kill-em-now/kill-em-now-10.jpg", "/work/kill-em-now/kill-em-now-17.jpg", "/work/kill-em-now/kill-em-now-09.jpg", "/work/kill-em-now/kill-em-now-20.jpg", "/work/kill-em-now/kill-em-now-11.jpg", "/work/kill-em-now/kill-em-now-22.jpg"],
    tone: { scene: "room", lift: [-6, -2, 4], gain: [1.05, 0.98, 1.02], sat: 0.95, temp: -0.05 },
    published: false,
  },
];

/* Site-wide constants pulled from mokobi.digital (all confirmed real). */
export const SITE = {
  name: "Karabo Jason Mokobi",
  role: "Film Colourist · Remote DI",
  domain: "https://mokobi.digital",
  email: "jason@mokobi.digital",
  headline: "Colour is the last rewrite.",
  intro:
    "Feature colour grading, HDR mastering, and DCP finishing — a remote DI suite for directors and DPs who care where the light lands.",
  facility: ["DaVinci Resolve", "Apple M4 Max", "Calibrated HDR reference", "SDR · HDR · DCP", "Remote"],
  regions: ["North America", "Europe", "Oceania"],
  links: {
    showreel: "https://youtu.be/TjcHpEVymWA",
    imdb: "https://www.imdb.com/name/nm14907582/",
    linkedin: "https://www.linkedin.com/in/jason-mokobi-714262255/",
    instagram: "https://www.instagram.com/colorunderjason/",
  },
} as const;
