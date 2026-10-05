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

/* An optional piece of motion for a project: a YouTube trailer or full
   film. Stills stay the default view; this plays inside the same frame. */
export type Video = {
  youtubeId: string;   // the v= id, e.g. "BfBN3K_Iu54"
  label: string;       // button text, e.g. "Trailer" / "Full film"
};

/* The film's own credits, as they appear on its IMDb page. One entry per
   job, so two editors share a single "Editors" line. */
export type CrewCredit = { role: string; names: string[] };
export type CastCredit = { name: string; as?: string };

export type Project = {
  slug: string;                 // URL: /work/<slug>
  title: string;
  kind: string;                 // "Feature", "Short", "Series", "Commercial"
  logline: string;              // one line under the title
  credits: Credit;              // your own credit on the film
  crew?: CrewCredit[];          // the rest of the crew
  cast?: CastCredit[];
  imdb?: string;                // canonical IMDb title URL
  muxPlaybackId?: string;       // Mux playback id for the reel clip
  posterTime?: number;          // seconds into the clip to freeze for the poster
  stills?: string[];            // Mux still ids OR /public paths for the contact strip
  video?: Video;                // optional YouTube trailer / full film
  tone: Tone;                   // procedural placeholder look (used until real assets land)
  published?: boolean;          // set true when it's cleared to show live
};

/* Placeholder look engine: a colour transform applied to a drawn scene,
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
  /* ── Migrated from the previous HTML portfolio build. Loglines are DRAFTS
     written for review, so edit freely before publishing. Crew and cast are
     taken from each film's own credits. Set published:true once cleared.
     Project order and each stills[] array are ranked strongest → weakest
     (lead/hero still first) per a visual-craft review. ── */
  {
    slug: "lars-mikael",
    title: "Lars & Mikael",
    kind: "Series",
    logline: "A Scandinavian two-hander, shot in cold northern light",
    credits: { role: "Colourist", year: "2026" },
    imdb: "https://www.imdb.com/title/tt39243558/",
    crew: [
      { role: "Director", names: ["Mads Erichsen"] },
      { role: "Writers", names: ["Mads Erichsen", "Morten Kjær", "Kristian Rossen"] },
      { role: "Producers", names: ["Mads Erichsen", "Morten Kjær", "Kristian Rossen"] },
      { role: "Cinematographer", names: ["Søren Peder"] },
      { role: "Editor", names: ["Lene Mondgård"] },
    ],
    cast: [
      { name: "Morten Kjær", as: "Mikael" },
      { name: "Kristian Rossen", as: "Lars" },
    ],
    stills: ["/work/lars-mikael/lars-mikael-03.jpg", "/work/lars-mikael/lars-mikael-06.jpg", "/work/lars-mikael/lars-mikael-05.jpg", "/work/lars-mikael/lars-mikael-01.jpg", "/work/lars-mikael/lars-mikael-07.jpg", "/work/lars-mikael/lars-mikael-08.jpg", "/work/lars-mikael/lars-mikael-02.jpg", "/work/lars-mikael/lars-mikael-04.jpg", "/work/lars-mikael/lars-mikael-16.jpg", "/work/lars-mikael/lars-mikael-19.jpg", "/work/lars-mikael/lars-mikael-11.jpg", "/work/lars-mikael/lars-mikael-12.jpg", "/work/lars-mikael/lars-mikael-13.jpg", "/work/lars-mikael/lars-mikael-18.jpg", "/work/lars-mikael/lars-mikael-15.jpg", "/work/lars-mikael/lars-mikael-10.jpg"],
    video: { youtubeId: "JkX97ebXzk0", label: "Trailer" },
    tone: { scene: "room", lift: [-2, 0, 6], gain: [0.96, 1, 1.04], sat: 0.85, temp: -0.06 },
    published: false,
  },
  {
    slug: "rockweed",
    title: "Rockweed",
    kind: "Feature",
    logline: "Feature",
    credits: { role: "Colourist", year: "2026" },
    imdb: "https://www.imdb.com/title/tt28652563/",
    crew: [
      { role: "Director", names: ["Kaye Tuckerman"] },
      { role: "Writers", names: ["Clare Olson", "Kaye Tuckerman"] },
      { role: "Producers", names: ["Jerry Aquino", "Clare Olson", "Kaye Tuckerman"] },
      { role: "Cinematographer", names: ["Jerry Aquino"] },
      { role: "Assistant DP", names: ["Luca Siletti"] },
      { role: "Composer", names: ["Tony King"] },
      { role: "First assistant directors", names: ["Peju Aliyu", "Samantha Winter"] },
      { role: "Second assistant director", names: ["Grace Morey"] },
      { role: "Sound", names: ["Jack Straton"] },
      { role: "Key costumer", names: ["Genesis Aquino"] },
      { role: "Tattoo fabricator", names: ["Ray Cintron"] },
    ],
    cast: [
      { name: "Zsolt Kormendy", as: "Thomas Coombs" },
      { name: "Michael John Improta", as: "Wyatt Leech" },
      { name: "Angela Strauman", as: "Debbie Anderson" },
      { name: "Clare Olson", as: "Marina 'Mar' Durkee" },
      { name: "Olivia Tibble", as: "Young Mar Durkee" },
      { name: "Ryan Bondy", as: "Rancid Ronnie" },
      { name: "John Reed", as: "Norm Durkee" },
      { name: "Courtney Hawkins", as: "Babygirl" },
    ],
    stills: ["/work/rockweed/rockweed-11.jpg", "/work/rockweed/rockweed-12.jpg", "/work/rockweed/rockweed-32.jpg", "/work/rockweed/rockweed-23.jpg", "/work/rockweed/rockweed-17.jpg", "/work/rockweed/rockweed-15.jpg", "/work/rockweed/rockweed-21.jpg", "/work/rockweed/rockweed-35.jpg", "/work/rockweed/rockweed-09.jpg", "/work/rockweed/rockweed-19.jpg", "/work/rockweed/rockweed-20.jpg", "/work/rockweed/rockweed-16.jpg", "/work/rockweed/rockweed-18.jpg", "/work/rockweed/rockweed-07.jpg", "/work/rockweed/rockweed-28.jpg", "/work/rockweed/rockweed-04.jpg", "/work/rockweed/rockweed-30.jpg", "/work/rockweed/rockweed-31.jpg"],
    video: { youtubeId: "BfBN3K_Iu54", label: "Trailer" },
    tone: { scene: "coast", lift: [-4, 0, 6], gain: [0.94, 0.98, 1.06], sat: 0.9, temp: -0.08 },
    published: false,
  },
  {
    slug: "illicit-affection",
    title: "Illicit Affection",
    kind: "Short",
    logline: "A secret romance, told in stolen hours",
    credits: { role: "Director, Editor & Colourist", format: "RED Komodo", year: "2024" },
    imdb: "https://www.imdb.com/title/tt41635054/",
    crew: [
      { role: "Written & directed by", names: ["Karabo Jason Mokobi"] },
      { role: "Producers", names: ["Karabo Jason Mokobi", "Christopher van Doorn"] },
      { role: "Cinematographer", names: ["Taryn Taylor"] },
      { role: "First assistant camera", names: ["Liam Hewitson", "Ethan Riedlinger"] },
      { role: "Gaffer", names: ["Talyah Buske"] },
      { role: "Digital imaging technician", names: ["Jodie Adams"] },
      { role: "Assistant director", names: ["Tian Gous"] },
      { role: "Set designer", names: ["Sedibelo Tlhaole"] },
    ],
    cast: [
      { name: "Laura Kelly" },
      { name: "Roche Killian" },
      { name: "Chioma Antoinette Umeala" },
    ],
    stills: ["/work/illicit-affection/illicit-affection-02.jpg", "/work/illicit-affection/illicit-affection-07.jpg", "/work/illicit-affection/illicit-affection-04.jpg", "/work/illicit-affection/illicit-affection-08.jpg", "/work/illicit-affection/illicit-affection-03.jpg", "/work/illicit-affection/illicit-affection-01.jpg", "/work/illicit-affection/illicit-affection-05.jpg", "/work/illicit-affection/illicit-affection-06.jpg"],
    tone: { scene: "portrait", lift: [10, 4, 0], gain: [1.02, 0.98, 0.92], sat: 0.88, temp: 0.1 },
    published: false,
  },
  {
    slug: "back-to-bedwin-farm",
    title: "Back to Bedwin Farm",
    kind: "Short",
    logline: "A homecoming, split between the farm and the recording booth",
    credits: { role: "Colourist", format: "Sony FX6", year: "2025" },
    crew: [
      { role: "Written & directed by", names: ["Tessa Joan Davies"] },
      { role: "Producer", names: ["Amelia Rose Thompson"] },
      { role: "Cinematographer", names: ["Keane Augousti"] },
      { role: "First assistant camera", names: ["Fabian Quan"] },
      { role: "Gaffer", names: ["Benjamin Martin"] },
      { role: "Grips", names: ["Arnu Saaiman", "Mohammed Imraan Vallie"] },
      { role: "First assistant directors", names: ["Emmanuel Stromvig", "Talyah Buske"] },
      { role: "Editor", names: ["Emmanuel Stromvig"] },
      { role: "Assistant editor", names: ["Amelia Rose Thompson"] },
      { role: "Digital imaging technician", names: ["Jodie Adams"] },
      { role: "Production designer", names: ["Chandre Doliveira"] },
      { role: "On-set sound", names: ["Matt Dickson"] },
      { role: "Sound mix, score & sound edit", names: ["Matt Thompson"] },
    ],
    stills: ["/work/back-to-bedwin-farm/back-to-bedwin-farm-07.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-03.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-02.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-09.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-05.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-06.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-13.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-10.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-12.jpg", "/work/back-to-bedwin-farm/back-to-bedwin-farm-14.jpg"],
    tone: { scene: "portrait", lift: [0, 0, 2], gain: [1, 1, 1.02], sat: 0.9, temp: -0.04 },
    published: false,
  },
  {
    slug: "love",
    title: "Love",
    kind: "Short",
    logline: "Short",
    credits: { role: "Producer & Colourist", format: "RED Komodo", year: "2023" },
    crew: [
      { role: "Director", names: ["Kyle Greyvenstein"] },
      { role: "Cinematographer", names: ["Ethan Riedlinger"] },
      { role: "Producer", names: ["Karabo Jason Mokobi"] },
    ],
    stills: ["/work/love/love-01.jpg", "/work/love/love-02.jpg", "/work/love/love-03.jpg", "/work/love/love-04.jpg", "/work/love/love-05.jpg", "/work/love/love-06.jpg", "/work/love/love-07.jpg", "/work/love/love-08.jpg", "/work/love/love-09.jpg", "/work/love/love-10.jpg", "/work/love/love-11.jpg", "/work/love/love-12.jpg"],
    tone: { scene: "portrait", lift: [0, 0, 0], gain: [1, 1, 1], sat: 0.2, temp: -0.02 },
    published: false,
  },
  {
    slug: "forgotten-city",
    title: "Forgotten City",
    kind: "Music Video",
    logline: "Nostalgia and urban decay, cut to the track",
    credits: { role: "Colourist", format: "Sony FX3", year: "2025" },
    crew: [
      { role: "Director", names: ["Kyle Greyvenstein"] },
      { role: "Cinematographer", names: ["Joshua Lopez"] },
      { role: "First assistant camera", names: ["Liam Stockigt"] },
      { role: "Editor", names: ["Katie Burr"] },
    ],
    stills: ["/work/forgotten-city/forgotten-city-01.jpg", "/work/forgotten-city/forgotten-city-16.jpg", "/work/forgotten-city/forgotten-city-07.jpg", "/work/forgotten-city/forgotten-city-10.jpg", "/work/forgotten-city/forgotten-city-04.jpg", "/work/forgotten-city/forgotten-city-05.jpg", "/work/forgotten-city/forgotten-city-02.jpg", "/work/forgotten-city/forgotten-city-06.jpg", "/work/forgotten-city/forgotten-city-11.jpg", "/work/forgotten-city/forgotten-city-14.jpg"],
    tone: { scene: "window", lift: [8, 4, -2], gain: [1.04, 1, 0.9], sat: 0.8, temp: 0.08 },
    published: false,
  },
  {
    slug: "where-the-stars-meet-the-sea",
    title: "Where the Stars Meet the Sea",
    kind: "Short",
    logline: "Two people and the tide, over one night on the coast",
    credits: { role: "Colourist", format: "Sony FX6", year: "2025" },
    imdb: "https://www.imdb.com/title/tt39372845/",
    crew: [
      { role: "Written & directed by", names: ["Benjamin Martin"] },
      { role: "Producer", names: ["Abubakr Da Costa"] },
      { role: "Cinematographer", names: ["Arnu Saaiman"] },
      { role: "Editor", names: ["Adrian Poate"] },
      { role: "Composer", names: ["Janco Mouton"] },
      { role: "Production designer", names: ["Joshua Peden"] },
      { role: "First assistant director", names: ["Mohammed Imraan Vallie"] },
      { role: "Second assistant director", names: ["Emmanuel Stromvig"] },
      { role: "Sound", names: ["Janco Mouton", "Angelique Murray", "Gert Theron"] },
      { role: "Gaffers", names: ["Emily Almagro", "Kganya Holomo"] },
      { role: "Lighting assistants", names: ["Hanu Botha", "Shakeel Smith"] },
      { role: "Visual effects", names: ["Flavio Ferreira"] },
      { role: "Makeup & special effects", names: ["Jessica Lombard", "Kiana Lopes"] },
      { role: "Wardrobe", names: ["Joshua Peden"] },
      { role: "Script supervisor", names: ["Cora Johns"] },
    ],
    cast: [
      { name: "Kareem Bouwer", as: "Grey Ackerman" },
      { name: "Julia Daniels", as: "Louise Ackerman" },
      { name: "Shakeel Smith", as: "Jeremy" },
      { name: "Wolff Zarin", as: "Blue" },
      { name: "Retief Loubser", as: "Mr. Dunn" },
      { name: "David Muller", as: "Mr. McRon" },
      { name: "Hanu Botha", as: "Employee" },
      { name: "Meaghan Bishop" },
    ],
    stills: ["/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-08.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-03.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-07.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-02.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-04.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-01.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-06.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-05.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-10.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-12.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-14.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-13.jpg", "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-09.jpg"],
    tone: { scene: "coast", lift: [-6, 0, 8], gain: [0.92, 0.98, 1.1], sat: 0.9, temp: -0.14 },
    published: false,
  },
  {
    slug: "paper-thin",
    title: "Paper Thin",
    kind: "Short",
    logline: "Short",
    credits: { role: "Colourist", format: "16mm film", year: "2026" },
    crew: [
      { role: "Written, directed, shot & edited by", names: ["Heather Wang"] },
      { role: "First assistant camera", names: ["Róisín Byrne"] },
      { role: "Second assistant camera", names: ["Benjamin Hovington"] },
      { role: "Gaffer", names: ["Matt Edge"] },
      { role: "Spark", names: ["James Edge"] },
      { role: "Sound recordist & sound design", names: ["Kyle MacLeod"] },
      { role: "Film processing", names: ["Andy The Film Lab Guy", "Kodak Motion Picture Film UK", "Digital Orchard"] },
    ],
    stills: ["/work/paper-thin/paper-thin-01.jpg", "/work/paper-thin/paper-thin-02.jpg", "/work/paper-thin/paper-thin-03.jpg", "/work/paper-thin/paper-thin-04.jpg"],
    tone: { scene: "room", lift: [-6, -2, 4], gain: [0.9, 0.96, 1.08], sat: 0.7, temp: -0.12 },
    published: false,
  },
  {
    slug: "alfa-romeo",
    title: "Alfa Romeo",
    kind: "Commercial",
    logline: "A spec car commercial: gloss, speed and reflection",
    credits: { role: "Colourist", format: "Sony FX3", year: "2025" },
    crew: [
      { role: "Director", names: ["Kyle Greyvenstein"] },
      { role: "Cinematographer", names: ["Ethan Riedlinger"] },
    ],
    stills: ["/work/alfa-romeo/alfa-romeo-01.jpg", "/work/alfa-romeo/alfa-romeo-04.jpg", "/work/alfa-romeo/alfa-romeo-02.jpg", "/work/alfa-romeo/alfa-romeo-03.jpg", "/work/alfa-romeo/alfa-romeo-05.jpg"],
    tone: { scene: "window", lift: [-4, -2, 2], gain: [0.98, 1, 1.06], sat: 1.05, temp: -0.1 },
    published: false,
  },
  {
    slug: "summer-clothing-spec",
    title: "Summer",
    kind: "Commercial",
    logline: "Spec commercial",
    credits: { role: "Colourist", year: "2026" },
    stills: ["/work/summer-clothing-spec/summer-clothing-spec-01.jpg", "/work/summer-clothing-spec/summer-clothing-spec-02.jpg", "/work/summer-clothing-spec/summer-clothing-spec-03.jpg", "/work/summer-clothing-spec/summer-clothing-spec-04.jpg", "/work/summer-clothing-spec/summer-clothing-spec-05.jpg", "/work/summer-clothing-spec/summer-clothing-spec-06.jpg"],
    tone: { scene: "portrait", lift: [4, 0, -2], gain: [1.04, 1, 0.98], sat: 1.05, temp: 0.08 },
    published: false,
  },
  {
    slug: "heatwave",
    title: "Heatwave",
    kind: "Short",
    logline: "A summer heat that won't break",
    credits: { role: "Colourist", format: "Panasonic Lumix", year: "2025" },
    imdb: "https://www.imdb.com/title/tt43753113/",
    crew: [
      { role: "Written & directed by", names: ["Ben Clery-Hall"] },
      { role: "Producers", names: ["Mhairi Brown", "Ben Clery-Hall", "Solo Wellspring"] },
      { role: "Cinematographer", names: ["Amelie Carolina Dougall"] },
      { role: "Editors", names: ["Douglas Crosthwaite", "Liv Hammerstein"] },
      { role: "Composer", names: ["Guadalupe Cobb"] },
    ],
    cast: [
      { name: "Daniel Mackin", as: "Marcelo" },
      { name: "Janette Foggo", as: "Gloria" },
      { name: "Lukah Bittakah", as: "Alan" },
      { name: "Barbara Raskin", as: "Betty" },
      { name: "Ivy Lee Barron", as: "Spirit" },
    ],
    stills: ["/work/heatwave/heatwave-01.jpg", "/work/heatwave/heatwave-04.jpg", "/work/heatwave/heatwave-08.jpg", "/work/heatwave/heatwave-03.jpg", "/work/heatwave/heatwave-07.jpg", "/work/heatwave/heatwave-06.jpg", "/work/heatwave/heatwave-05.jpg", "/work/heatwave/heatwave-02.jpg", "/work/heatwave/heatwave-17.jpg", "/work/heatwave/heatwave-12.jpg", "/work/heatwave/heatwave-16.jpg", "/work/heatwave/heatwave-15.jpg", "/work/heatwave/heatwave-14.jpg", "/work/heatwave/heatwave-11.jpg"],
    video: { youtubeId: "TnYCQjxwAW4", label: "Full film" },
    tone: { scene: "window", lift: [6, 2, -4], gain: [1.1, 1.02, 0.86], sat: 1.1, temp: 0.2 },
    published: false,
  },
  {
    slug: "kill-em-now",
    title: "Kill 'Em Now",
    kind: "Feature",
    logline: "A pulpy, high-contrast crime thriller",
    credits: { role: "Colourist", format: "Sony FX3", year: "2025" },
    imdb: "https://www.imdb.com/title/tt24774786/",
    crew: [
      { role: "Written & directed by", names: ["Ryan J Serrano"] },
      { role: "Executive producer", names: ["Alex Serrano"] },
      { role: "Associate producer", names: ["Anastasia Chernaya"] },
      { role: "Cinematographers", names: ["Zachary Franco", "Justin Cole Nguyen"] },
      { role: "Editors", names: ["Marc Hines", "Adam K. Tiller"] },
      { role: "'A' camera operator & gaffer", names: ["Justin Cole Nguyen"] },
      { role: "Assistant director", names: ["Jose Paulo De Paz"] },
    ],
    cast: [
      { name: "Joan James Muixi", as: "No Name" },
      { name: "Ryan J Serrano", as: "Skrill" },
      { name: "Philip Nathan Banuelos", as: "Ludwig Sanchez" },
      { name: "Ted Faye", as: "Marty Hudkins" },
      { name: "Kawika Aguilar", as: "Enrique Salazar" },
      { name: "Lulu Grey", as: "Vageena Hudkins" },
      { name: "Skye Lovelady", as: "Sabrina" },
    ],
    stills: ["/work/kill-em-now/kill-em-now-14.jpg", "/work/kill-em-now/kill-em-now-02.jpg", "/work/kill-em-now/kill-em-now-08.jpg", "/work/kill-em-now/kill-em-now-05.jpg", "/work/kill-em-now/kill-em-now-03.jpg", "/work/kill-em-now/kill-em-now-01.jpg", "/work/kill-em-now/kill-em-now-07.jpg", "/work/kill-em-now/kill-em-now-06.jpg", "/work/kill-em-now/kill-em-now-04.jpg", "/work/kill-em-now/kill-em-now-12.jpg", "/work/kill-em-now/kill-em-now-16.jpg", "/work/kill-em-now/kill-em-now-18.jpg", "/work/kill-em-now/kill-em-now-10.jpg", "/work/kill-em-now/kill-em-now-17.jpg", "/work/kill-em-now/kill-em-now-09.jpg", "/work/kill-em-now/kill-em-now-20.jpg", "/work/kill-em-now/kill-em-now-11.jpg", "/work/kill-em-now/kill-em-now-22.jpg"],
    video: { youtubeId: "65m6WkiCbfM", label: "Full film" },
    tone: { scene: "room", lift: [-6, -2, 4], gain: [1.05, 0.98, 1.02], sat: 0.95, temp: -0.05 },
    published: false,
  },
];

/* Hand-picked hero stills for the home-page background carousel: the
   strongest, most appealing frames across projects (composition, grade,
   variety), full-bleed friendly. One per film, so every project gets screen
   time, interleaved rather than appended so the newer entries aren't all stuck
   at the tail of the loop. Category pages build their own pools. */
export const HERO_STILLS: string[] = [
  "/work/lars-mikael/lars-mikael-06.jpg",
  "/work/love/love-01.jpg",
  "/work/where-the-stars-meet-the-sea/where-the-stars-meet-the-sea-08.jpg",
  "/work/rockweed/rockweed-12.jpg",
  "/work/illicit-affection/illicit-affection-02.jpg",
  "/work/kill-em-now/kill-em-now-02.jpg",
  "/work/back-to-bedwin-farm/back-to-bedwin-farm-07.jpg",
  "/work/summer-clothing-spec/summer-clothing-spec-01.jpg",
  "/work/alfa-romeo/alfa-romeo-01.jpg",
  "/work/forgotten-city/forgotten-city-01.jpg",
  "/work/paper-thin/paper-thin-01.jpg",
  "/work/heatwave/heatwave-01.jpg",
];

/* Site-wide constants pulled from mokobi.digital (all confirmed real). */
export const SITE = {
  name: "Karabo Jason Mokobi",
  role: "Colourist, remote DI",
  domain: "https://mokobi.digital",
  email: "jason@mokobi.digital",
  headline: "Colour grading for film, music video and commercial work.",
  intro:
    "I grade from a calibrated suite and work remotely with directors and DPs wherever they are, from early look tests through to the final delivery. Send me some footage and we'll work out the look together.",
  facility: ["DaVinci Resolve", "Apple M4 Max", "Calibrated HDR reference", "SDR · HDR · DCP", "Remote"],
  regions: ["North America", "Europe", "Oceania"],
  links: {
    showreel: "https://youtu.be/TjcHpEVymWA",
    imdb: "https://www.imdb.com/name/nm14907582/",
    linkedin: "https://www.linkedin.com/in/jason-mokobi-714262255/",
    instagram: "https://www.instagram.com/colorunderjason/",
  },
} as const;
