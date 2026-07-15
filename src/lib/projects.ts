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

/** Mux still frame → poster image, no asset upload needed beyond the clip. */
export function muxPoster(playbackId: string, time = 0): string {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=1280`;
}

export function muxStill(id: string, time = 0, width = 480): string {
  return `https://image.mux.com/${id}/thumbnail.webp?time=${time}&width=${width}`;
}
