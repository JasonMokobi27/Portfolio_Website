import { PROJECTS, type Project } from "@/content/projects";

/** Show placeholders in dev, only cleared work in production.
 *  Flip a project's `published: true` in projects.ts to surface it live. */
export function getProjects(): Project[] {
  if (process.env.NODE_ENV === "production") {
    const live = PROJECTS.filter((p) => p.published);
    return live.length ? live : PROJECTS; // fail open if nothing's cleared yet
  }
  return PROJECTS;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

/** Reel is grouped into three browse categories on the landing page.
 *  Each `kind` maps into exactly one category (see getCategoryOf). */
export type Category = { slug: string; label: string; kinds: string[] };

export const CATEGORIES: Category[] = [
  { slug: "shorts", label: "Shorts", kinds: ["Short"] },
  { slug: "features", label: "Features & Series", kinds: ["Feature", "Series"] },
  { slug: "music-commercials", label: "Music & Commercials", kinds: ["Music Video", "Commercial"] },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryOf(project: Project): Category | undefined {
  return CATEGORIES.find((c) => c.kinds.includes(project.kind));
}

export function getProjectsByCategory(slug: string): Project[] {
  const cat = getCategory(slug);
  return cat ? getProjects().filter((p) => cat.kinds.includes(p.kind)) : [];
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}

/** Mux still frame → poster image, no asset upload needed beyond the clip. */
export function muxPoster(playbackId: string, time = 0): string {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=1280`;
}

export function muxStill(id: string, time = 0, width = 480): string {
  return `https://image.mux.com/${id}/thumbnail.webp?time=${time}&width=${width}`;
}
