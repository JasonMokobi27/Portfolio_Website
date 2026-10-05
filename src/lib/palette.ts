import { PALETTES } from "@/content/palettes";
import type { Project } from "@/content/projects";

/** Swatches sampled from a single frame (empty if the frame isn't indexed). */
export function swatchesForStill(still: string): string[] {
  return PALETTES[still] ?? [];
}

/** Thin an over-long strip down to `max` swatches, keeping it evenly spread
 *  across the film rather than lopping off the tail. */
function thin(swatches: string[], max: number): string[] {
  if (swatches.length <= max) return swatches;
  const out: string[] = [];
  for (let i = 0; i < max; i++) {
    out.push(swatches[Math.floor((i * swatches.length) / max)]);
  }
  return out;
}

/** The whole project read as one colour strip, in the order the stills are
 *  listed, so the strip tracks the film rather than a sorted palette. */
export function stripForProject(project: Project, max = 80): string[] {
  const swatches = (project.stills ?? []).flatMap(swatchesForStill);
  return thin(swatches, max);
}

/** One strip per still, used where the strip doubles as a scrubber. */
export function stripsForStills(stills: string[]): string[][] {
  return stills.map(swatchesForStill);
}
